import { vectorAdd, matrixVectorMult, sigmoid } from "../math";
import nn from "./nn.json";

export const weightsBoundaries = nn.weights.map((n) => {
  const f = n.flat();
  return {
    min: Math.min(...f),
    max: Math.max(...f),
  };
});

export let weightsRes: number[][][] = [];

export function run(image: number[]): NNResult {
  weightsRes = [];
  let layers = [image];

  while (layers.length <= nn.weights.length) {
    const previousLayer = layers[layers.length - 1];
    const weightMatrix = nn.weights[layers.length - 1];
    const biasVector = nn.biases[layers.length - 1];
    weightsRes.push([]);
    layers.push(
      vectorAdd(matrixVectorMult(weightMatrix, previousLayer), biasVector).map(
        sigmoid
      )
    );
  }

  return {
    weightsRes: weightsRes,
    weightsResBoundaries: weightsRes.map((l) => {
      const f = l.flat();
      return {
        min: Math.min(...f),
        max: Math.max(...f),
      };
    }),
    layers: layers,
    digit: layers[3].indexOf(Math.max(...layers[3])),
  };
}

export type NNResult = {
  weightsRes: number[][][];
  weightsResBoundaries: { min: number; max: number }[];
  layers: number[][];
  digit: number;
};

// TODO colors global norm
// TODO move color functions to color.ts
export function weightToColor(
  p: number,
  min: number,
  max: number,
  neutralForZero = false
): string {
  if (p === 0) return neutralForZero ? "rgb(34,21,81)" : "rgba(0,0,0,0)";

  let c = { r: 231, g: 121, b: 193 };
  if (p < 0) c = { r: 88, g: 199, b: 243 };

  let u = max > Math.abs(min) ? max : Math.abs(min);

  return `rgba(${c.r}, ${c.g}, ${c.b}, ${Math.abs(p) / u})`;
}

export function weightToColorPositive(
  p: number,
  min: number,
  max: number
): string {
  if (p < 0) return "rgba(0, 0, 0, 0)";
  return weightToColor(p, min, max);
}

export function weightToColorNegative(
  p: number,
  min: number,
  max: number
): string {
  if (p > 0) return "rgba(0, 0, 0, 0)";
  return weightToColor(p, min, max);
}
