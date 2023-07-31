export const gradient = (start: Color, end: Color, pos: number): Color => {
  return {
    r: (end.r - start.r) * pos + start.r,
    g: (end.g - start.g) * pos + start.g,
    b: (end.b - start.b) * pos + start.b,
    a: (end.a - start.a) * pos + start.a,
  };
};

export const toCSS = (c: Color) => `rgba(${c.r},${c.g},${c.b},${c.a})`;

export type Color = {
  r: number;
  g: number;
  b: number;
  a: number;
};
