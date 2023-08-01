import { weightsRes } from "./nn/nn";

export type Position = {
  x: number;
  y: number;
};

export function getAbsolutePosition(element: HTMLElement): Position {
  let clientRect = element.getBoundingClientRect();
  return {
    x: clientRect.left + document.body.scrollLeft,
    y: clientRect.top + document.body.scrollTop,
  };
}

export const getX = (p: number) => p % 28;
export const getY = (p: number) => Math.floor(p / 28);

export const toPosition = (p: number): Position => {
  return {
    x: getX(p),
    y: getY(p),
  };
};

export function dotProduct(vec1: number[], vec2: number[]): number {
  let result = 0;
  let l = weightsRes[weightsRes.length - 1];
  for (let i = 0; i < vec1.length; i++) {
    const p = vec1[i] * vec2[i];
    l[l.length - 1].push(p);
    result += p;
  }
  return result;
}

export function matrixVectorMult(
  matrix: number[][],
  vector: number[]
): number[] {
  let result = [];
  for (let row = 0; row < matrix.length; row++) {
    weightsRes[weightsRes.length - 1].push([]);
    result.push(dotProduct(matrix[row], vector));
  }
  return result;
}

export function vectorAdd(vec1: number[], vec2: number[]): number[] {
  let result = [];
  for (let i = 0; i < vec1.length; i++) {
    result.push(vec1[i] + vec2[i]);
  }
  return result;
}

export function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}
