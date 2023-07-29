<script lang="ts">
  import type { NNResult } from "$lib/util/nn/nn";
  import NN from "$lib/components/ResultPanel/NN.svelte";
  import Collapsable from "./Collapsable.svelte";
  import DigitGrid from "../DigitGrid/DigitGrid.svelte";
  import HeatMapSelectedNeuron from "./HeatMapSelectedNeuron.svelte";

  export let output: NNResult;
  export let fullscreen: boolean;
  export let selectedNeuron: number[] | undefined;
</script>

<div class="overflow-auto w-full h-full space-y-3">
  <div class="pl-3 flex justify-between">
    <div class="grid place-items-center basis-10">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="transition hover:scale-105"
        on:click={() => {
          fullscreen = !fullscreen;
        }}
      >
        <g id="Arrow / Expand">
          <path
            id="Vector"
            d={fullscreen
              ? "m 14,5 v 5 h 5 M 5,14 h 5 v 5"
              : "M10 19H5V14M14 5H19V10"}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="stroke-primary"
          />
        </g>
      </svg>
    </div>
    <div class="alert border border-primary bg-base-100 w-fit">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="stroke-info shrink-0 w-6 h-6"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        /></svg
      >
      <span>AI prediction: {output.digit}</span>
    </div>
  </div>
  <!-- TODO scrollbar & fade-->
  <Collapsable heading="Normalized Image"
    ><div class="w-full h-[50vh]">
      <DigitGrid image={output.layers[0]} />
    </div></Collapsable
  >
  <Collapsable heading="Neuronal Network"
    ><NN {output} bind:selectedNeuron /></Collapsable
  >
  {#if selectedNeuron !== undefined}
    <Collapsable heading="Heatmap Selected Neuron">
      <HeatMapSelectedNeuron {output} {selectedNeuron} />
    </Collapsable>
  {/if}
</div>
