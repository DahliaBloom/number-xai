<script lang="ts">
  import nnMeta from "$lib/util/nn/nnMeta.json";
  import nn from "$lib/util/nn/nn.json";
  import type { Vec } from "$lib/util/math";
  import { heatmap, type NNOut } from "$lib/util/nn/nn";
  import {
    accent,
    base100,
    primary,
    toCSS,
    weightToColor,
  } from "$lib/util/color";
  import DigitGrid from "../DigitGrid/DigitGrid.svelte";
  import Collapsable from "./Collapsable.svelte";

  export let output: NNOut;
  export let selectedNeuron: Vec;

  $: image = heatmap(output, selectedNeuron);

  // weightsBoundaries only abs(max) also in NNSvg
  $: boundaries =
    selectedNeuron.x === 1
      ? nnMeta.weightsBoundaries[0][selectedNeuron.y]
      : { min: -10, max: 10 };
</script>

<Collapsable
  heading="Heatmap Layer {selectedNeuron.x} Neuron {selectedNeuron.y}"
>
  <div class="grid grid-cols-3">
    <div class="w-full aspect-square max-h-[50vh] p-1">
      <!-- TODO change for other layers -->
      <DigitGrid
        {image}
        toColor={(p) =>
          toCSS(weightToColor(p, boundaries, accent, base100, primary))}
        hasTooltip={true}
      />
    </div>
    <div class="w-full aspect-square max-h-[50vh] p-1">
      <!-- TODO change for other layers -->
      <DigitGrid
        {image}
        toColor={(p) =>
          toCSS(weightToColor(p, boundaries, base100, base100, primary))}
        hasTooltip={true}
      />
    </div>
    <div class="w-full aspect-square max-h-[50vh] p-1">
      <!-- TODO change for other layers -->
      <DigitGrid
        {image}
        toColor={(p) =>
          toCSS(weightToColor(p, boundaries, accent, base100, base100))}
        hasTooltip={true}
      />
    </div>
  </div></Collapsable
>
