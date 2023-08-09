import { matrixVecProduct, sigmoid, vecAdd } from "../math";
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
