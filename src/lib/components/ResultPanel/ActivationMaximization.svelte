<script lang="ts">
    import nnMeta from "$lib/util/nn/nnMeta.json";
    import nn from "$lib/util/nn/nn.json";
    import type { Vec } from "$lib/util/math";
    import { heatmap, run, type NNOut } from "$lib/util/nn/nn";
    import {
      accent,
      base100,
      primary,
      toCSS,
      weightToColor,
    } from "$lib/util/color";
    import DigitGrid from "../DigitGrid/DigitGrid.svelte";
    import Collapsable from "./Collapsable.svelte";
  
    const output = run(Array(784).fill(1));
    export let selectedNeuron: Vec;
  
    $: image = heatmap(output, selectedNeuron);
  
    // weightsBoundaries only abs(max) also in NNSvg
    $: m = Math.max(Math.abs(Math.min(...image)), Math.max(...image));
    $: boundaries = { min: -1, max: 1 };
  
    $: imgNorm = image.map((v) => v / m);
  </script>
  
  <Collapsable
    heading="Activation Maximization {selectedNeuron.x} Neuron {selectedNeuron.y}"
  >
    <div class="grid grid-cols-3">
      <div class="w-full aspect-square max-h-[50vh] p-1">
        <DigitGrid
          image={imgNorm}
          toColor={(p) =>
            toCSS(weightToColor(p, boundaries, accent, base100, primary))}
          hasTooltip={true}
        />
      </div>
      <div class="w-full aspect-square max-h-[50vh] p-1">
        <DigitGrid
          image={imgNorm}
          toColor={(p) =>
            toCSS(weightToColor(p, boundaries, base100, base100, primary))}
          hasTooltip={true}
        />
      </div>
      <div class="w-full aspect-square max-h-[50vh] p-1">
        <DigitGrid
          image={imgNorm}
          toColor={(p) =>
            toCSS(weightToColor(p, boundaries, accent, base100, base100))}
          hasTooltip={true}
        />
      </div>
    </div></Collapsable
  >
  