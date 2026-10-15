// Polynomial identity testing, as used to compare the two strings on the chain:
// read a bit string x as f_x(t) = Σ x_e · t^e (mod p) and evaluate it at a random r.

export function modpow(base: number, exp: number, mod: number): number {
  let result = 1 % mod;
  let b = base % mod;
  let e = exp;
  while (e > 0) {
    if (e & 1) result = (result * b) % mod;
    b = (b * b) % mod;
    e >>= 1;
  }
  return result;
}

export function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let t = 2; t * t <= n; t++) if (n % t === 0) return false;
  return true;
}

/** Smallest divisor ≥ 2, or n itself when n is prime. */
export function smallestDivisor(n: number): number {
  for (let t = 2; t * t <= n; t++) if (n % t === 0) return t;
  return n;
}

/** Parameters from the report: ℓ = ⌈log₂ m⌉ + 2 bits for p and r, blocks of k = 2^⌈log₂ ℓ⌉ ≥ ℓ. */
export function parameters(m: number) {
  const ell = Math.ceil(Math.log2(m)) + 2;
  const k = 2 ** Math.ceil(Math.log2(ell));
  const trials = Math.max(1, Math.ceil(Math.log2(m)));
  return { ell, k, trials };
}

/** Odd ℓ-bit candidates with the top bit set, until one is prime. */
export function primeSearch(ell: number, rand = Math.random): { candidates: { n: number; divisor: number }[]; p: number } {
  const lo = 2 ** (ell - 1);
  const candidates: { n: number; divisor: number }[] = [];
  for (let i = 0; i < 64; i++) {
    const n = lo + 1 + 2 * Math.floor(rand() * (lo / 2));
    const divisor = smallestDivisor(n);
    candidates.push({ n, divisor });
    if (divisor === n) return { candidates, p: n };
  }
  // Fall back to a deterministic scan; practically unreachable.
  let n = lo + 1;
  while (!isPrime(n)) n += 2;
  candidates.push({ n, divisor: n });
  return { candidates, p: n };
}

/** Per-block contributions s_i = Σ_{e in block i} x_e · r^e (mod p). */
export function blockTerms(bits: string, r: number, p: number, k: number): number[] {
  const terms: number[] = [];
  for (let start = 0; start < bits.length; start += k) {
    let s = 0;
    for (let e = start; e < Math.min(start + k, bits.length); e++) {
      if (bits[e] === '1') s = (s + modpow(r, e, p)) % p;
    }
    terms.push(s);
  }
  return terms;
}

/** Pairwise (tree) summation mod p; returns every level, ending with [total]. */
export function treeSum(terms: number[], p: number): number[][] {
  const levels = [terms];
  let cur = terms;
  while (cur.length > 1) {
    const next: number[] = [];
    for (let i = 0; i < cur.length; i += 2) next.push(i + 1 < cur.length ? (cur[i] + cur[i + 1]) % p : cur[i]);
    levels.push(next);
    cur = next;
  }
  return levels;
}

export function fingerprint(bits: string, r: number, p: number): number {
  let s = 0;
  for (let e = 0; e < bits.length; e++) if (bits[e] === '1') s = (s + modpow(r, e, p)) % p;
  return s;
}
