<script lang="ts">
  import { primary } from "$lib/util/color";
  import { Alignment, pixelToVec, type Vec } from "$lib/util/math";
  import type { NNOut } from "$lib/util/nn/nn";
  import Tooltip from "../Tooltip.svelte";

  const spacingSum = 20;
  const r = (100 - spacingSum) / 56;
  const spacing = 20 / 29;

  export let image: number[];
  export let toColor = (p: number) =>
    `rgba(${primary.r}, ${primary.g}, ${primary.b}, ${p})`;
  export let editable = false;
  export let points: Vec[] = [];
  export let focusedPixel: number | undefined = undefined;

  export let output: NNOut | undefined = undefined;

  let penDown = false;

  export let hasTooltip = false;
  let tooltip: { data: any; boundingRect: DOMRect | undefined } = {
    data: undefined,
    boundingRect: undefined,
  };

  function openTooltip(e: MouseEvent, val: any) {
    if (hasTooltip) {
      tooltip = {
        data: val,
        boundingRect: (e.target as HTMLElement).getBoundingClientRect(),
      };
    }
  }

  let height: number;
  let width: number;

  $: if (points.length === 0) focusedPixel = undefined;
</script>

{#if hasTooltip}
  <Tooltip {...tooltip} alignment={Alignment.Top} offset={{ x: 0, y: -10 }} />
{/if}
<div class="flex items-center w-full h-full flex-col" id="container">
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="border-primary border bg-base-100 rounded-lg aspect-square select-none"
    bind:clientHeight={height}
    bind:clientWidth={width}
    class:cursor-crosshair={editable}
    id="inner"
    on:mouseup={() => {
      penDown = false;
    }}
  >
    {#if editable && points.length === 0}
      <div
        class="absolute w-full h-full grid place-content-center pointer-events-none"
      >
        <p class="text-primary font-light text-xl italic">
          Double click to clear the canvas
        </p>
      </div>
    {/if}
    <!-- TODO grow circle on hover -->
    <svg width="100%" height="100%">
      {#each image as val, i}
        {@const vec = pixelToVec(i)}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <circle
          cx={spacing * (vec.x + 1) + (vec.x * 2 + 1) * r + "%"}
          cy={spacing * (vec.y + 1) + (vec.y * 2 + 1) * r + "%"}
          class={(hasTooltip ? "tooltip-circle" : "circle") +
            (focusedPixel === i ? " stroke-accent" : "")}
          fill={toColor(val)}
          on:click={() => {
            if (editable) {
              if (focusedPixel === i) {
                focusedPixel = undefined;
              } else {
                focusedPixel = i;
              }
            }
          }}
          on:mousemove={(e) => {
            if (editable && e.buttons === 1) {
              if (penDown) {
                const prevPoint = points[points.length - 1];
                for (let d = 1; d <= 2; d++) {
                  points.push({
                    x: prevPoint.x + (vec.x - prevPoint.x) * (d / 3),
                    y: prevPoint.y + (vec.y - prevPoint.y) * (d / 3),
                  });
                }
                points = points;
              } else {
                points = [...points, vec];
              }
              penDown = true;
            }
          }}
          on:mouseenter={(e) => {
            if (val !== 0) openTooltip(e, val.toFixed(3));
          }}
          on:mouseleave={() => (tooltip.boundingRect = undefined)}
        />
      {/each}
    </svg>
  </div>
  {#if output !== undefined}
    <div
      class="absolute w-full flex justify-end pr-2"
      style="top: {height - 64}px;"
    >
      <div class="alert border border-primary bg-base-100 w-fit space-x-4">
        <svg
          height="90%"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          ><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          /><g id="SVGRepo_iconCarrier">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.9 0.499976C13.9 0.279062 13.7209 0.0999756 13.5 0.0999756C13.2791 0.0999756 13.1 0.279062 13.1 0.499976V1.09998H12.5C12.2791 1.09998 12.1 1.27906 12.1 1.49998C12.1 1.72089 12.2791 1.89998 12.5 1.89998H13.1V2.49998C13.1 2.72089 13.2791 2.89998 13.5 2.89998C13.7209 2.89998 13.9 2.72089 13.9 2.49998V1.89998H14.5C14.7209 1.89998 14.9 1.72089 14.9 1.49998C14.9 1.27906 14.7209 1.09998 14.5 1.09998H13.9V0.499976ZM11.8536 3.14642C12.0488 3.34168 12.0488 3.65826 11.8536 3.85353L10.8536 4.85353C10.6583 5.04879 10.3417 5.04879 10.1465 4.85353C9.9512 4.65827 9.9512 4.34169 10.1465 4.14642L11.1464 3.14643C11.3417 2.95116 11.6583 2.95116 11.8536 3.14642ZM9.85357 5.14642C10.0488 5.34168 10.0488 5.65827 9.85357 5.85353L2.85355 12.8535C2.65829 13.0488 2.34171 13.0488 2.14645 12.8535C1.95118 12.6583 1.95118 12.3417 2.14645 12.1464L9.14646 5.14642C9.34172 4.95116 9.65831 4.95116 9.85357 5.14642ZM13.5 5.09998C13.7209 5.09998 13.9 5.27906 13.9 5.49998V6.09998H14.5C14.7209 6.09998 14.9 6.27906 14.9 6.49998C14.9 6.72089 14.7209 6.89998 14.5 6.89998H13.9V7.49998C13.9 7.72089 13.7209 7.89998 13.5 7.89998C13.2791 7.89998 13.1 7.72089 13.1 7.49998V6.89998H12.5C12.2791 6.89998 12.1 6.72089 12.1 6.49998C12.1 6.27906 12.2791 6.09998 12.5 6.09998H13.1V5.49998C13.1 5.27906 13.2791 5.09998 13.5 5.09998ZM8.90002 0.499976C8.90002 0.279062 8.72093 0.0999756 8.50002 0.0999756C8.2791 0.0999756 8.10002 0.279062 8.10002 0.499976V1.09998H7.50002C7.2791 1.09998 7.10002 1.27906 7.10002 1.49998C7.10002 1.72089 7.2791 1.89998 7.50002 1.89998H8.10002V2.49998C8.10002 2.72089 8.2791 2.89998 8.50002 2.89998C8.72093 2.89998 8.90002 2.72089 8.90002 2.49998V1.89998H9.50002C9.72093 1.89998 9.90002 1.72089 9.90002 1.49998C9.90002 1.27906 9.72093 1.09998 9.50002 1.09998H8.90002V0.499976Z"
              class="fill-primary"
            />
          </g></svg
        >
        <span class="font-light"
          >Circuit oracle whispers <b>{output.digit}</b></span
        >
      </div>
    </div>
  {/if}
</div>

<style lang="postcss">
  #container {
    container-name: container;
    container-type: size;
  }

  #inner {
    width: 100%;
  }

  @container container (aspect-ratio > 1) {
    #inner {
      width: auto;
      height: 100%;
    }
  }

  b {
    background: -webkit-linear-gradient(
      40deg,
      theme(colors.primary) 0%,
      theme(colors.secondary) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .circle {
    r: 1.43%;
  }

  .tooltip-circle {
    r: 1.43%;
  }

  .tooltip-circle:hover {
    r: 1.6%;
  }
</style>
