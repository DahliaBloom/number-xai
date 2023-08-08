export type Vec = {
  x: number;
  y: number;
};

export type Boundary<T> = {
  min: T;
  max: T;
};

export enum Alignment {
  Left,
  Right,
  Bottom,
  Top,
}

export const pixelToVec = (p: number): Vec => ({
  x: p % 28,
  y: Math.floor(p / 28),
});

export const dotProduct = (vec1: number[], vec2: number[]): number =>
  vec1.reduce((acc, c, i) => c * vec2[i] + acc, 0);

export const matrixVecProduct = (matrix: number[][], vec: number[]): number[] =>
  matrix.map((row) => dotProduct(row, vec));

export const vecAdd = (vec1: number[], vec2: number[]): number[] =>
  vec1.map((n, i) => n + vec2[i]);

export const sigmoid = (x: number): number => 1 / (1 + Math.exp(-x));
