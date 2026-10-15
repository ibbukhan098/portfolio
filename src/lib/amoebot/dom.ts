// Small browser helpers shared by the amoebot figures.

const NS = 'http://www.w3.org/2000/svg';

export function el<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attrs: Record<string, string | number> = {},
  parent?: Element,
): SVGElementTagNameMap[K] {
  const node = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
  parent?.appendChild(node);
  return node;
}

export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Fill {name} placeholders. */
export function fmt(template: string, vars: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));
}

export const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, reducedMotion() ? 0 : ms));

export const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/** Run `frame(progress)` from 0 to 1 over `ms`, eased. Instant when motion is reduced. */
export function animate(ms: number, frame: (p: number) => void): Promise<void> {
  if (reducedMotion() || ms <= 0) {
    frame(1);
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    const start = performance.now();
    const tick = (now: number) => {
      // Frame timestamps can precede `start`; clamp so the easing never overshoots.
      const t = Math.max(0, Math.min(1, (now - start) / ms));
      frame(ease(t));
      if (t < 1) requestAnimationFrame(tick);
      else resolve();
    };
    requestAnimationFrame(tick);
  });
}

/** Call `fn` once, the first time `node` scrolls into view. */
export function onFirstView(node: Element, fn: () => void) {
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        fn();
      }
    },
    { threshold: 0.35 },
  );
  io.observe(node);
}

/** Track whether `node` is on screen. */
export function visibility(node: Element) {
  const state = { visible: false };
  new IntersectionObserver((entries) => {
    state.visible = entries.some((e) => e.isIntersecting);
  }).observe(node);
  return state;
}

export function strings<T>(root: HTMLElement): T {
  return JSON.parse(root.dataset.strings ?? '{}') as T;
}
