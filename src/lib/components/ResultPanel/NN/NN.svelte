<script lang="ts">
  import type { NNResult } from "$lib/util/nn/nn";

  export let output: NNResult;
</script>

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
        <circle class="neuron fill-bg" cx={x} cy={y} />
      {/if}
    {/each}
    {#each [...Array(10).keys()] as i}
      {@const c = 255 - output.layers[1][i] * 255}
      <circle
        class="neuron"
        cx={97}
        cy={17 + 4.5 * i}
        fill="rgb({c}, {c}, {c})"
      />
    {/each}
  </svg>
</div>

<style lang="postcss">
  .neuron {
    r: 2;
    stroke-width: 0.1;
    stroke: theme(colors.primary);
  }

  .collapse-circle {
    fill: theme(colors.neutral);
    r: 0.333;
  }

  .line {
    stroke-width: 0.05;
    stroke: theme(colors.neutral);
  }

  .fill-bg {
    fill: theme(colors.base-100);
  }
</style>
