import type { Boundary } from "./math";

export const toCSS = (c: Color) => `rgba(${c.r},${c.g},${c.b},${c.a})`;

export const primary = { r: 230, g: 44, b: 132, a: 1 };

export const gradient = (start: Color, end: Color, pos: number): Color => {
  return {
    r: (end.r - start.r) * pos + start.r,
    g: (end.g - start.g) * pos + start.g,
    b: (end.b - start.b) * pos + start.b,
    a: (end.a - start.a) * pos + start.a,
  };
};

export type Color = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export function weightToColor(
  weight: number,
  weights: Boundary<number>,
  negative: Color,
  zero: Color,
  positive: Color
): Color {
  if (weight === 0) return zero;
  const pos = Math.abs(
    weight / Math.max(Math.abs(weights.min), Math.abs(weights.max))
  );
  if (weight < 0) return gradient(zero, negative, pos);
  return gradient(zero, positive, pos);
}
