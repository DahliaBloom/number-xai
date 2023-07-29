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

// TODO colors global norm
export function weightToColor(p: number, min: number, max: number): string {
  if (p === 0) return "rgba(0,0,0,0)";

  let c = { r: 88, g: 199, b: 243 };
  let u = max;
  const neagtiveC = { r: 231, g: 121, b: 193 };

  if (p < 0) {
    c = neagtiveC;
    u = Math.abs(min);
  }

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
