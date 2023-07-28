import nn from "./nn.json";

function dotProduct(vec1: number[], vec2: number[]): number {
  let result = 0;
  for (let i = 0; i < vec1.length; i++) {
    result += vec1[i] * vec2[i];
  }
  return result;
}

function matrixVectorMult(matrix: number[][], vector: number[]): number[] {
  let result = [];
  for (let row = 0; row < matrix.length; row++) {
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
  let layers = [image];

  while (layers.length <= nn.weights.length) {
    const previousLayer = layers[layers.length - 1];
    const weightMatrix = nn.weights[layers.length - 1];
    const biasVector = nn.biases[layers.length - 1];
    layers.push(
      vectorAdd(matrixVectorMult(weightMatrix, previousLayer), biasVector).map(
        sigmoid
      )
    );
  }

  return {
    layers: layers,
    digit: layers[3].indexOf(Math.max(...layers[3])),
  };
}

export type NNResult = {
  layers: number[][];
  digit: number;
};
