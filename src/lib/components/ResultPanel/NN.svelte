<script lang="ts">
  import { gradient, toCSS } from "$lib/util/color";
  import type { Position } from "$lib/util/math";
  import { weightToColor, type NNResult } from "$lib/util/nn/nn";

  export let output: NNResult;
  export let selectedNeuron: number[] | undefined = undefined;

  const fillNeuron = (l: number, n: number, _: NNResult) =>
    toCSS(
      gradient(
        { r: 26, g: 16, b: 60, a: 1 },
        { r: 231, g: 121, b: 193, a: 1 },
        output.layers[l][n]
      )
    );
  const isSelectedNeuron = (l: number, n: number, s: number[] | undefined) => {
    return s !== undefined && s[0] === l && s[1] === n;
  };

  const openTooltip = (e: MouseEvent, n: number[]) => {
    const p = (e.target as HTMLElement).getBoundingClientRect();
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
          {#if selectedNeuron === undefined || selectedNeuron[0] !== 0 || selectedNeuron[1] === ii}
            <line
              x1={x}
              y1={y}
              x2={100 / 3}
              y2={2.5 + 4.5 * ii}
              class="line"
              stroke={weightToColor(
                output.weightsRes[0][ii][376 + i],
                output.weightsResBoundaries[0].min,
                output.weightsResBoundaries[0].max
              )}
              stroke-width="0.25"
            />
          {/if}
        {/each}
        <circle
          class="neuron"
          cx={x}
          cy={y}
          fill={fillNeuron(0, 376 + i, output)}
        />
      {/if}
    {/each}
    {#each [...Array(16).keys()] as i}
      {@const x = 100 / 3}
      {@const y = 2.5 + 4.5 * i}
      {#each [...Array(16).keys()] as ii}
        {#if selectedNeuron === undefined || selectedNeuron[0] !== 1 || selectedNeuron[1] === ii}
          <line
            x1={x}
            y1={y}
            x2={200 / 3}
            y2={2.5 + 4.5 * ii}
            class="line"
            stroke={weightToColor(
              output.weightsRes[1][ii][i],
              output.weightsResBoundaries[1].min,
              output.weightsResBoundaries[1].max
            )}
            stroke-width="0.25"
          />
        {/if}
      {/each}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <circle
        class="cursor-pointer {isSelectedNeuron(0, i, selectedNeuron)
          ? 'neuron-selected'
          : 'neuron'}"
        cx={x}
        cy={y}
        fill={fillNeuron(1, i, output)}
        on:click={() =>
          (selectedNeuron = isSelectedNeuron(0, i, selectedNeuron)
            ? undefined
            : [0, i])}
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
        {#if selectedNeuron === undefined || selectedNeuron[0] !== 2 || selectedNeuron[1] === ii}
          <line
            x1={x}
            y1={y}
            x2={97}
            y2={17 + 4.5 * ii}
            class="line"
            stroke={weightToColor(
              output.weightsRes[2][ii][i],
              output.weightsResBoundaries[2].min,
              output.weightsResBoundaries[2].max
            )}
            stroke-width="0.25"
          />
        {/if}
      {/each}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <circle
        class="cursor-pointer {isSelectedNeuron(1, i, selectedNeuron)
          ? 'neuron-selected'
          : 'neuron'}"
        cx={x}
        cy={y}
        fill={fillNeuron(2, i, output)}
        on:click={() =>
          (selectedNeuron = isSelectedNeuron(1, i, selectedNeuron)
            ? undefined
            : [1, i])}
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
        class="cursor-pointer {isSelectedNeuron(2, i, selectedNeuron)
          ? 'neuron-selected'
          : 'neuron'}"
        cx={97}
        cy={17 + 4.5 * i}
        fill={fillNeuron(3, i, output)}
        on:click={() =>
          (selectedNeuron = isSelectedNeuron(2, i, selectedNeuron)
            ? undefined
            : [2, i])}
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
    fill: theme(colors.primary);
    r: 0.333;
  }
</style>
