import { matrixVecProduct, sigmoid, vecAdd, type Vec } from "../math";
import nn from "./nn.json";

export function run(image: number[]): NNOut {
  let layers = [image];
  let weightProducts = [];

  for (let i = 0; i < 3; i++) {
    const { res, prods } = matrixVecProduct(nn.weights[i], layers[i]);
    weightProducts.push(prods);
    layers.push(vecAdd(res, nn.biases[i]).map(sigmoid));
  }

  return {
    layers,
    weightProducts,
    digit: layers[3].indexOf(Math.max(...layers[3])),
  };
}

export type NNOut = {
  layers: number[][];
  weightProducts: number[][][];
  digit: number;
};

function layerOneHeatmap(output: NNOut, neuron: number) {
  return output.weightProducts[0][neuron];
}

export function heatmap(output: NNOut, selectedNeuron: Vec): number[] {
  switch (selectedNeuron.x) {
    case 1:
      return layerOneHeatmap(output, selectedNeuron.y);
    case 2:
      return Array(16)
        .fill(0)
        .map((_, i) =>
          layerOneHeatmap(output, i).map(
            (x) => x * output.weightProducts[1][selectedNeuron.y][i]
          )
        )
        .reduce((a, b) => a.map((x, i) => x + b[i]));
    default:
      return [1, 2, 3]
  }
}
