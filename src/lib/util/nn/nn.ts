import { matrixVecProduct, sigmoid, vecAdd } from "../math";
import nn from "./nn.json";

export function run(image: number[]): NNOut {
  let layers = [image];

  for (let i = 0; i < 3; i++) {
    layers.push(
      vecAdd(matrixVecProduct(nn.weights[i], layers[i]), nn.biases[i]).map(
        sigmoid
      )
    );
  }

  return {
    layers: layers,
    digit: layers[3].indexOf(Math.max(...layers[3])),
  };
}

export type NNOut = {
  layers: number[][];
  digit: number;
};
