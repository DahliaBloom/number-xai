<script lang="ts">
  import type { Position } from "$lib/util/geometry";
  import type { NNResult } from "$lib/util/nn/nn";

  export let output: NNResult;
  export let selectedNeuron: number[] | undefined = undefined;

  const openTooltip = (e: MouseEvent, n: number[]) => {
    const p = e.target.getBoundingClientRect();
    tooltip = {
      pos: { x: p.left, y: p.top },
      dim: { x: p.width, y: p.height },
      n: n,
    };
  };

  let tooltip: { pos: Position; dim: Position; n: number[] } | undefined =
    undefined;
</script>

{#if tooltip !== undefined}
  <div
    class="fixed pointer-events-none"
    style="left: {tooltip.pos.x - 5}px; top: {tooltip.pos.y}px;"
  >
    <div
      class="tooltip tooltip-open tooltip-left"
      data-tip={output.layers[tooltip.n[0] + 1][tooltip.n[1]].toFixed(3)}
    >
      <div style="width: {tooltip.dim.x}px; height: {tooltip.dim.y}px;" />
    </div>
  </div>
{/if}
<div class="grid place-items-center">
  <svg height="50vh" viewBox="0 0 100 72.5">
    {#each [...Array(11).keys()] as i}
      {@const x = 3}
      {@const y = 14.75 + 4.5 * i}
      {#if i === 5}
        <circle class="collapse-circle" cx={x} cy={y - 1} />
        <circle class="collapse-circle" cx={x} cy={y} />
        <circle class="collapse-circle" cx={x} cy={y + 1} />
      {:else}
        {#each [...Array(16).keys()] as ii}
          <line x1={x} y1={y} x2={100 / 3} y2={2.5 + 4.5 * ii} class="line" />
        {/each}
        <circle class="neuron" cx={x} cy={y} fill="rgba(0,0,0,0)" />
      {/if}
    {/each}
    {#each [...Array(16).keys()] as i}
      {@const x = 100 / 3}
      {@const y = 2.5 + 4.5 * i}
      {#each [...Array(16).keys()] as ii}
        <line x1={x} y1={y} x2={200 / 3} y2={2.5 + 4.5 * ii} class="line" />
      {/each}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- TODO unselect neuron-->
      <!-- TODO lines with transparent visible-->
      <circle
        class="cursor-pointer {selectedNeuron !== undefined &&
        selectedNeuron[0] === 0 &&
        selectedNeuron[1] === i
          ? 'neuron-selected'
          : 'neuron'}"
        cx={x}
        cy={y}
        fill="rgba(231,121,193,{output.layers[1][i]})"
        on:click={() => (selectedNeuron = [0, i])}
        on:mouseenter={(e) => {
          openTooltip(e, [0, i]);
        }}
        on:mouseleave={() => {
          tooltip = undefined;
        }}
      />
    {/each}
    {#each [...Array(16).keys()] as i}
      {@const x = 200 / 3}
      {@const y = 2.5 + 4.5 * i}
      {#each [...Array(10).keys()] as ii}
        <line x1={x} y1={y} x2={97} y2={17 + 4.5 * ii} class="line" />
      {/each}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <circle
        class="cursor-pointer {selectedNeuron !== undefined &&
        selectedNeuron[0] === 1 &&
        selectedNeuron[1] === i
          ? 'neuron-selected'
          : 'neuron'}"
        cx={x}
        cy={y}
        fill="rgba(231,121,193,{output.layers[2][i]})"
        on:click={() => (selectedNeuron = [1, i])}
        on:mouseenter={(e) => {
          openTooltip(e, [1, i]);
        }}
        on:mouseleave={() => {
          tooltip = undefined;
        }}
      />
    {/each}
    {#each [...Array(10).keys()] as i}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <circle
        class="cursor-pointer {selectedNeuron !== undefined &&
        selectedNeuron[0] === 2 &&
        selectedNeuron[1] === i
          ? 'neuron-selected'
          : 'neuron'}"
        cx={97}
        cy={17 + 4.5 * i}
        fill="rgba(231,121,193,{output.layers[3][i]})"
        on:click={() => (selectedNeuron = [2, i])}
        on:mouseenter={(e) => {
          openTooltip(e, [2, i]);
        }}
        on:mouseleave={() => {
          tooltip = undefined;
        }}
      />
    {/each}
  </svg>
</div>

<style lang="postcss">
  .neuron {
    r: 2;
    stroke: theme(colors.primary);
    stroke-width: 0.1;
  }

  .neuron-selected {
    r: 2;
    stroke: theme(colors.secondary);
    stroke-width: 0.3;
  }

  .collapse-circle {
    fill: theme(colors.neutral);
    r: 0.333;
  }

  .line {
    stroke-width: 0.05;
    stroke: theme(colors.neutral);
  }
</style>
