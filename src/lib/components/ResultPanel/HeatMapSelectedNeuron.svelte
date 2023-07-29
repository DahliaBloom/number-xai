<script lang="ts">
  import DigitGrid from "../DigitGrid/DigitGrid.svelte";
  import nn from "$lib/util/nn/nn.json";
  import {
    weightToColor,
    weightToColorNegative,
    weightToColorPositive,
    type NNResult,
  } from "$lib/util/nn/nn";

  export let output: NNResult;
  export let selectedNeuron: number[];
</script>

<div class="grid grid-cols-3">
  <div class="con">
    <DigitGrid
      image={nn.weights[selectedNeuron[0]][selectedNeuron[1]]}
      toColor={(p) =>
        weightToColor(
          p,
          Math.min(...nn.weights[selectedNeuron[0]][selectedNeuron[1]]),
          Math.max(...nn.weights[selectedNeuron[0]][selectedNeuron[1]])
        )}
    />
  </div>
  <div class="con">
    <DigitGrid
      image={nn.weights[selectedNeuron[0]][selectedNeuron[1]]}
      toColor={(p) =>
        weightToColorPositive(
          p,
          Math.min(...nn.weights[selectedNeuron[0]][selectedNeuron[1]]),
          Math.max(...nn.weights[selectedNeuron[0]][selectedNeuron[1]])
        )}
    />
  </div>
  <div class="con">
    <DigitGrid
      image={nn.weights[selectedNeuron[0]][selectedNeuron[1]]}
      toColor={(p) =>
        weightToColorNegative(
          p,
          Math.min(...nn.weights[selectedNeuron[0]][selectedNeuron[1]]),
          Math.max(...nn.weights[selectedNeuron[0]][selectedNeuron[1]])
        )}
    />
  </div>
  <div class="con">
    <!-- TODO change for other layers -->
    <DigitGrid
      image={output.weightsRes[selectedNeuron[0]][selectedNeuron[1]]}
      toColor={(p) =>
        weightToColor(
          p,
          Math.min(...output.weightsRes[selectedNeuron[0]][selectedNeuron[1]]),
          Math.max(...output.weightsRes[selectedNeuron[0]][selectedNeuron[1]])
        )}
    />
  </div>
  <div class="con">
    <!-- TODO change for other layers -->
    <DigitGrid
      image={output.weightsRes[selectedNeuron[0]][selectedNeuron[1]]}
      toColor={(p) =>
        weightToColorPositive(
          p,
          Math.min(...output.weightsRes[selectedNeuron[0]][selectedNeuron[1]]),
          Math.max(...output.weightsRes[selectedNeuron[0]][selectedNeuron[1]])
        )}
    />
  </div>
  <div class="con">
    <!-- TODO change for other layers -->
    <DigitGrid
      image={output.weightsRes[selectedNeuron[0]][selectedNeuron[1]]}
      toColor={(p) =>
        weightToColorNegative(
          p,
          Math.min(...output.weightsRes[selectedNeuron[0]][selectedNeuron[1]]),
          Math.max(...output.weightsRes[selectedNeuron[0]][selectedNeuron[1]])
        )}
    />
  </div>
</div>

<style>
    .con {
        width: 100%;
        aspect-ratio: 1;
        max-height: 50vh;
        padding: 0.3rem;
    }
</style>