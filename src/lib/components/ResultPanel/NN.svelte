<script lang="ts">
  import {
    accent,
    base100,
    gradient,
    neutral,
    primary,
    toCSS,
    weightToColor,
  } from "$lib/util/color";
  import { Alignment, type Vec } from "$lib/util/math";
  import type { NNOut } from "$lib/util/nn/nn";
  import nnMeta from "$lib/util/nn/nnMeta.json";
  import Tooltip from "../Tooltip.svelte";
  import Collapsable from "./Collapsable.svelte";

  export let output: NNOut;
  export let selectedNeuron: Vec | undefined = undefined;

  const fillNeuron = (l: number, n: number, _: NNOut) =>
    toCSS(gradient(base100, primary, output.layers[l][n]));
  const isSelectedNeuron = (l: number, n: number, s: Vec | undefined) => {
    return s !== undefined && s.x === l && s.y === n;
  };

  const nnData = [
    { neurons: 11, pos: { x: 3, y: 14.75 } },
    { neurons: 16, pos: { x: 100 / 3, y: 2.5 } },
    { neurons: 16, pos: { x: 200 / 3, y: 2.5 } },
    { neurons: 10, pos: { x: 97, y: 17 } },
  ];

  let tooltip: { data: any; boundingRect: DOMRect | undefined } = {
    data: undefined,
    boundingRect: undefined,
  };
</script>

<Tooltip {...tooltip} alignment={Alignment.Left} />
<Collapsable heading="Neuronal Network">
  <div class="grid place-items-center">
    <svg height="50vh" viewBox="0 0 106 72.5">
      {#each nnData as layer, i}
        {#each [...Array(layer.neurons).keys()] as n}
          {@const pos = { x: layer.pos.x, y: layer.pos.y + 4.5 * n }}
          {@const isSN = isSelectedNeuron(i, n, selectedNeuron)}
          {#if i === 0 && n === 5}
            <circle class="collapse-circle" cx={pos.x} cy={pos.y - 1} />
            <circle class="collapse-circle" cx={pos.x} cy={pos.y} />
            <circle class="collapse-circle" cx={pos.x} cy={pos.y + 1} />
          {:else}
            {#if i !== 3}
              {@const nextLayer = nnData[i + 1]}
              {#each [...Array(nextLayer.neurons).keys()] as nextN}
                {#if selectedNeuron === undefined || selectedNeuron.x !== i + 1 || selectedNeuron.y === nextN}
                  <line
                    x1={pos.x}
                    y1={pos.y}
                    x2={nextLayer.pos.x}
                    y2={nextLayer.pos.y + 4.5 * nextN}
                    stroke={toCSS(
                      weightToColor(
                        output.weightProducts[i][nextN][i === 0 ? 376 + n : n],
                        nnMeta.weightsBoundaries[i][nextN],
                        accent,
                        { r: neutral.r, g: neutral.g, b: neutral.b, a: 0.3 },
                        primary
                      )
                    )}
                    stroke-width="0.25"
                  />
                {/if}
              {/each}
            {/if}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <circle
              class={isSN ? "stroke-accent" : "stroke-primary"}
              class:cursor-pointer={i !== 0}
              r="2"
              stroke-width={isSN ? "0.2" : "0.1"}
              cx={pos.x}
              cy={pos.y}
              fill={fillNeuron(i, i === 0 ? 376 + n : n, output)}
              on:click={() => {
                if (i !== 0) selectedNeuron = isSN ? undefined : { x: i, y: n };
              }}
              on:mouseenter={(e) => {
                if (e.target instanceof SVGCircleElement) {
                  tooltip = {
                    data: output.layers[i][i === 0 ? 376 + n : n].toFixed(3),
                    boundingRect: e.target.getBoundingClientRect(),
                  };
                }
              }}
              on:mouseleave={() => (tooltip.boundingRect = undefined)}
            />
            {#if i === 3}
              <text x={pos.x + 3} y={pos.y} class="fill-base-content" dominant-baseline="middle" fill-opacity={output.layers[3][n]} style="font-size: 20%; font-family: monospace;">⇢ {n}</text>
            {/if}
          {/if}
        {/each}
      {/each}
    </svg>
  </div>
</Collapsable>

<style lang="postcss">
  .collapse-circle {
    fill: theme(colors.primary);
    r: 0.333;
  }
</style>
