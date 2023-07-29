import nn from "./nn.json";

let weightsRes: number[][][] = [];

function dotProduct(vec1: number[], vec2: number[]): number {
  let result = 0;
  let l = weightsRes[weightsRes.length - 1];
  for (let i = 0; i < vec1.length; i++) {
    const p = vec1[i] * vec2[i];
    l[l.length - 1].push(p);
    result += p;
  }
  return result;
}

function matrixVectorMult(matrix: number[][], vector: number[]): number[] {
  let result = [];
  for (let row = 0; row < matrix.length; row++) {
    weightsRes[weightsRes.length - 1].push([]);
    result.push(dotProduct(matrix[row], vector));
  }
  return result;
}

function vectorAdd(vec1: number[], vec2: number[]): number[] {
  let result = [];
  for (let i = 0; i < vec1.length; i++) {
    result.push(vec1[i] + vec2[i]);
  }
  return result;
}

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

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
    layers: layers,
    digit: layers[3].indexOf(Math.max(...layers[3])),
  };
}

export type NNResult = {
  weightsRes: number[][][];
  layers: number[][];
  digit: number;
};

export function weightToColor(p: number, min: number, max: number): string {
  if (p === 0) return "rgba(0, 0, 0, 0)";

  const startColor = { r: 88, g: 199, b: 243 };
  const endColor = { r: 231, g: 121, b: 193 };

  const fade = (p - min) / (max - min);

  let diffRed = endColor.r - startColor.r;
  let diffGreen = endColor.g - startColor.g;
  let diffBlue = endColor.b - startColor.b;

  diffRed = diffRed * fade + startColor.r;
  diffGreen = diffGreen * fade + startColor.g;
  diffBlue = diffBlue * fade + startColor.b;

  return `rgb(${diffRed}, ${diffGreen}, ${diffBlue})`;
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
