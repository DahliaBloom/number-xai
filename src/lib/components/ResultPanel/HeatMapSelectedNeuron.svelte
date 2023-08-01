<script lang="ts">
  import { weightsBoundaries } from "$lib/util/nn/nn";
  import nn from "$lib/util/nn/nn.json";
  import DigitGrid from "../DigitGrid/DigitGrid.svelte";
  import {
    weightToColor,
    weightToColorNegative,
    weightToColorPositive,
    type NNResult,
  } from "$lib/util/nn/nn";

  export let output: NNResult;
  export let selectedNeuron: number[];

  const grids = [
    {
      image: nn.weights[selectedNeuron[0]][selectedNeuron[1]],
      boundaries: weightsBoundaries[selectedNeuron[0]],
    },
    {
      image: output.weightsRes[selectedNeuron[0]][selectedNeuron[1]],
      boundaries: {
        min: Math.min(
          ...output.weightsRes[selectedNeuron[0]][selectedNeuron[1]]
        ),
        max: Math.max(
          ...output.weightsRes[selectedNeuron[0]][selectedNeuron[1]]
        ),
      },
    },
  ];
</script>

<div class="grid grid-cols-3">
  {#each grids as grid}
    {#each [weightToColor, weightToColorPositive, weightToColorNegative] as toColor}
      <div class="con">
        <!-- TODO change for other layers -->
        <DigitGrid
          image={grid.image}
          toColor={(p) => toColor(p, grid.boundaries.min, grid.boundaries.max)}
        />
      </div>
    {/each}
  {/each}
</div>

<style>
  .con {
    width: 100%;
    aspect-ratio: 1;
    max-height: 50vh;
    padding: 0.3rem;
  }
</style>
