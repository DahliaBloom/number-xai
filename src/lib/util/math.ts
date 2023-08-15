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

export const dotProduct = (
  vec1: number[],
  vec2: number[]
): { res: number; prods: number[] } =>
  vec1.reduce(
    (acc, c, i) => {
      const prod = c * vec2[i];
      acc.res += prod;
      acc.prods.push(prod);
      return acc;
    },
    { res: 0, prods: [] as number[] }
  );

export const matrixVecProduct = (
  matrix: number[][],
  vec: number[]
): { res: number[]; prods: number[][] } =>
  matrix.reduce(
    (acc, row) => {
      const { res, prods } = dotProduct(row, vec);
      acc.res.push(res);
      acc.prods.push(prods);
      return acc;
    },
    { res: [] as number[], prods: [] as number[][] }
  );

export const vecAdd = (vec1: number[], vec2: number[]): number[] =>
  vec1.map((n, i) => n + vec2[i]);

export const sigmoid = (x: number): number => 1 / (1 + Math.exp(-x));
export const logit = (x: number): number => Math.log(x / (1 - x));
