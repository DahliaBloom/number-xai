<script lang="ts">
  import type { Vec } from "$lib/util/math";
  import type { NNOut } from "$lib/util/nn/nn";
  import HeatMapSelectedNeuron from "./HeatMapSelectedNeuron.svelte";
  import NN from "./NN.svelte";
  import NeuronInfo from "./NeuronInfo.svelte";
  import NormalizedImage from "./NormalizedImage.svelte";

  export let output: NNOut;
  export let points: Vec[];

  let selectedNeuron: Vec | undefined = undefined;
</script>

<div class="overflow-y-auto h-[85vh] flex flex-col gap-3">
  <NormalizedImage {output} {points} />
  <NN {output} bind:selectedNeuron />
  {#if selectedNeuron !== undefined}
    <NeuronInfo {output} {selectedNeuron} />
    <HeatMapSelectedNeuron {output} {selectedNeuron} />
  {/if}
  <div class="h-[1px]" />
</div>
