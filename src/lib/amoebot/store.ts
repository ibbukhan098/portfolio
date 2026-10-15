// Shared state between the figures: the shape drawn in Figure 1 drives the tours in
// Figure 2, whose strings drive the fingerprints in Figure 4.

import type { Cell } from './hex';

type Listener<T> = (value: T) => void;

function channel<T>(initial: T) {
  let value = initial;
  const listeners = new Set<Listener<T>>();
  return {
    get: () => value,
    set(next: T) {
      value = next;
      listeners.forEach((l) => l(value));
    },
    /** Calls the listener now and on every change. */
    subscribe(l: Listener<T>) {
      listeners.add(l);
      l(value);
      return () => listeners.delete(l);
    },
  };
}

export const shape = channel<Cell[] | null>(null);
export const strings = channel<{ a: string; b: string; turn: number } | null>(null);
