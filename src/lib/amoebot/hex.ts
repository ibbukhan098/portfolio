// Geometry for the amoebot explorables: a triangular lattice in axial coordinates.
// Axes: E = (1, 0) and NE = (0, 1). Directions are numbered counter-clockwise from E.

export type Cell = readonly [number, number];
export type Pt = readonly [number, number];

export const DIRS: readonly Cell[] = [
  [1, 0],   // 0 E
  [0, 1],   // 1 NE
  [-1, 1],  // 2 NW
  [-1, 0],  // 3 W
  [0, -1],  // 4 SW
  [1, -1],  // 5 SE
];

const SQRT3_2 = Math.sqrt(3) / 2;

export const key = (c: Cell) => `${c[0]},${c[1]}`;
export const add = (a: Cell, b: Cell): Cell => [a[0] + b[0], a[1] + b[1]];

/** Lattice cell → math coordinates (y up), unit spacing. */
export function toMath([x, y]: Cell): Pt {
  return [x + y / 2, y * SQRT3_2];
}

/** Hex distance from the origin. */
export const radius = ([x, y]: Cell) => Math.max(Math.abs(x), Math.abs(y), Math.abs(x + y));

/** All cells within `r` steps of the origin. */
export function region(r: number): Cell[] {
  const out: Cell[] = [];
  for (let y = r; y >= -r; y--) {
    for (let x = -r; x <= r; x++) {
      if (radius([x, y]) <= r) out.push([x, y]);
    }
  }
  return out;
}

/** Rotate by 60° · k counter-clockwise about the origin. */
export function rotate(c: Cell, k: number): Cell {
  let [x, y] = c;
  for (let i = 0; i < ((k % 6) + 6) % 6; i++) [x, y] = [-y, x + y];
  return [x, y];
}

/** Mirror across the horizontal (E–W) axis through the origin. */
export const reflect = ([x, y]: Cell): Cell => [x + y, -y];

/** Translation-invariant signature of a set of cells. */
function signature(cells: Cell[]): string {
  let min = cells[0];
  for (const c of cells) if (c[1] < min[1] || (c[1] === min[1] && c[0] < min[0])) min = c;
  return cells
    .map((c) => key([c[0] - min[0], c[1] - min[1]]))
    .sort()
    .join(';');
}

export interface Symmetry {
  /** Rotation steps k (60° · k, 1–5) that map the shape onto itself. */
  rotations: number[];
  /** Order of the rotation group: 1, 2, 3 or 6. */
  order: number;
  /** Mirror axes as angles in degrees (math convention), in [0, 180). */
  axes: number[];
}

export function symmetries(cells: Cell[]): Symmetry {
  if (cells.length === 0) return { rotations: [], order: 1, axes: [] };
  const sig = signature(cells);
  const rotations: number[] = [];
  const axes: number[] = [];
  for (let k = 0; k < 6; k++) {
    const rotated = cells.map((c) => rotate(c, k));
    if (k > 0 && signature(rotated) === sig) rotations.push(k);
    // Mirror across E–W after rotating by 60°·k is a reflection across the line at −30°·k.
    if (signature(rotated.map(reflect)) === sig) axes.push((((-30 * k) % 180) + 180) % 180);
  }
  return { rotations, order: rotations.length + 1, axes: axes.sort((a, b) => a - b) };
}

export function centroid(cells: Cell[]): Pt {
  let sx = 0;
  let sy = 0;
  for (const c of cells) {
    const [x, y] = toMath(c);
    sx += x;
    sy += y;
  }
  return [sx / cells.length, sy / cells.length];
}

export function isConnected(cells: Cell[]): boolean {
  if (cells.length <= 1) return true;
  const set = new Set(cells.map(key));
  const seen = new Set([key(cells[0])]);
  const stack: Cell[] = [cells[0]];
  while (stack.length) {
    const c = stack.pop()!;
    for (const d of DIRS) {
      const n = add(c, d);
      const k = key(n);
      if (set.has(k) && !seen.has(k)) {
        seen.add(k);
        stack.push(n);
      }
    }
  }
  return seen.size === set.size;
}

// ---- Canonical tree and Euler tour (as in the report's canonical-tree tooling) ----

export interface TourStep {
  from: Cell;
  to: Cell;
  kind: 'forward' | 'back';
  /** Bits this step adds to the string. */
  bits: string;
}

export interface Tour {
  root: Cell;
  steps: TourStep[];
  bits: string;
}

/**
 * Elect a root by maximising the projection onto direction `d` (ties broken by the
 * projection onto d rotated 90°), then run a DFS that tries neighbours clockwise starting
 * at `d`. Each forward move is written as 1 + its direction relative to `d` (3 bits),
 * each return as 0. Everything is relative to `d`, so a shape that maps onto itself under
 * a rotation taking d to d′ produces the same string for both directions.
 */
export function canonicalTour(cells: Cell[], d: number): Tour {
  const set = new Set(cells.map(key));
  const [dx, dy] = toMath(DIRS[d]);
  const proj = (c: Cell) => {
    const [x, y] = toMath(c);
    return x * dx + y * dy;
  };
  const tie = (c: Cell) => {
    const [x, y] = toMath(c);
    return -x * dy + y * dx;
  };
  const EPS = 1e-9;
  let root = cells[0];
  for (const c of cells) {
    const a = proj(c) - proj(root);
    if (a > EPS || (Math.abs(a) <= EPS && tie(c) - tie(root) > EPS)) root = c;
  }

  const seen = new Set([key(root)]);
  const steps: TourStep[] = [];
  const visit = (u: Cell) => {
    for (let i = 0; i < 6; i++) {
      const dir = (d - i + 6) % 6;
      const v = add(u, DIRS[dir]);
      const kv = key(v);
      if (!set.has(kv) || seen.has(kv)) continue;
      seen.add(kv);
      const rel = (dir - d + 6) % 6;
      steps.push({ from: u, to: v, kind: 'forward', bits: '1' + rel.toString(2).padStart(3, '0') });
      visit(v);
      steps.push({ from: v, to: u, kind: 'back', bits: '0' });
    }
  };
  visit(root);
  return { root, steps, bits: steps.map((s) => s.bits).join('') };
}

// ---- Shapes ----

const rotations = (cells: Cell[], ks: number[]) => ks.flatMap((k) => cells.map((c) => rotate(c, k)));

function unique(cells: Cell[]): Cell[] {
  const m = new Map(cells.map((c) => [key(c), c] as const));
  return [...m.values()];
}

export const presets: Record<string, Cell[]> = {
  snowflake: unique([[0, 0], ...rotations([[1, 0], [2, 0], [3, 0]], [0, 1, 2, 3, 4, 5])]),
  triangle: unique(region(3).filter(([x, y]) => x >= 0 && y >= 0 && x + y <= 3).map(([x, y]) => [x - 1, y - 1] as Cell)),
  propeller: unique([[0, 0], ...rotations([[1, 0], [2, 0], [2, 1]], [0, 2, 4])]),
  zigzag: [[-2, -1], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [2, 1]],
  arrow: [[-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [1, 1], [2, -1]],
  blob: [[-1, -1], [-1, 0], [0, 0], [1, 0], [1, 1], [0, 2], [2, 0], [-2, 1]],
};

/** A random connected shape with a chosen symmetry, built like the report's generators. */
export function randomSymmetric(maxR = 4, rand = Math.random): Cell[] {
  const kinds = [[0, 3], [0, 2, 4], [0, 1, 2, 3, 4, 5], 'mirror'] as const;
  const kind = kinds[Math.floor(rand() * kinds.length)];
  const seed: Cell[] = [[0, 0]];
  const size = 3 + Math.floor(rand() * 4);
  let tries = 0;
  while (seed.length < size && tries++ < 200) {
    const from = seed[Math.floor(rand() * seed.length)];
    const next = add(from, DIRS[Math.floor(rand() * 6)]);
    if (radius(next) <= maxR && !seed.some((c) => key(c) === key(next))) seed.push(next);
  }
  const cells = kind === 'mirror' ? [...seed, ...seed.map(reflect)] : rotations(seed, [...kind]);
  return unique(cells);
}
