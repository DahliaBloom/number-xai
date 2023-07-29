<script lang="ts" context="module">
  import { createEventDispatcher } from "svelte";
  import { getX, getY, toPosition, type Position } from "$lib/util/geometry";
  const spacingSum = 20;
  const r = (100 - spacingSum) / 56;
  const spacing = 20 / 29;

  function getImageValues(points: Position[]): number[] {
    let values = new Array(28 ** 2).fill(0);

    for (const point of points) {
      const { x, y } = point;

      values = values.map((value, n) => {
        const tileX = getX(n);
        const tileY = getY(n);

        const dist = Math.hypot(tileX - x, tileY - y);

        let penValue = 0.8 - (dist / 2) ** 2;
        penValue = Math.min(Math.max(0, penValue), 1);
        return value + (1 - value) * penValue;
      });
    }

    return values;
  }

  function center(image: number[], points: Position[]): Position[] {
    let left = Infinity;
    let right = -Infinity;
    let top = Infinity;
    let bottom = -Infinity;

    let centerX = 0;
    let centerY = 0;
    let totalValue = 0;

    for (let n = 0; n < image.length; n++) {
      const x = n % 28;
      const y = Math.floor(n / 28);
      const value = image[n];

      centerX += x * value;
      centerY += y * value;
      totalValue += value;

      if (value > 0.05) {
        left = Math.min(left, x);
        right = Math.max(right, x);
        top = Math.min(top, y);
        bottom = Math.max(bottom, y);
      }
    }

    centerX /= totalValue;
    centerY /= totalValue;

    const width = right - left;
    const height = bottom - top;

    const scale = 20 / Math.max(width, height);

    return points.map((point) => {
      let { x, y } = point;

      x -= centerX;
      y -= centerY;

      x *= scale;
      y *= scale;

      x += 14;
      y += 14;

      return {
        ...point,
        x: point.x + (x - point.x),
        y: point.y + (y - point.y),
      };
    });
  }
</script>

<script lang="ts">
  import ToolBar from "./ToolBar.svelte";

  const dispatch = createEventDispatcher();

  let points: Position[] = [];
  let penDown = false;

  export let editable = false;

  export let image: number[] = Array(784).fill(0);
  $: image = editable ? getImageValues(points) : image;

  $: if (editable) dispatch("center", getImageValues(center(image, points)));

  export let toColor = (p: number) => `rgba(231, 121, 193, ${p})`;
</script>

<div
  class="flex justify-center items-center w-full h-full flex-col"
  id="container"
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="border-primary border rounded-lg aspect-square"
    class:cursor-crosshair={editable}
    id="inner"
    on:mouseup={() => {
      penDown = false;
    }}
  >
    <svg width="100%" height="100%">
      {#each image as val, i}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <circle
          cx={spacing * (getX(i) + 1) + (getX(i) * 2 + 1) * r + "%"}
          cy={spacing * (getY(i) + 1) + (getY(i) * 2 + 1) * r + "%"}
          r={r + "%"}
          fill={toColor(val)}
          on:mousemove={(e) => {
            if (editable && e.buttons === 1) {
              if (penDown) {
                const prevPoint = points[points.length - 1];
                for (let d = 1; d <= 2; d++) {
                  points.push({
                    x: prevPoint.x + (getX(i) - prevPoint.x) * (d / 3),
                    y: prevPoint.y + (getY(i) - prevPoint.y) * (d / 3),
                  });
                }
                points = points;
              } else {
                points = [...points, toPosition(i)];
              }
              penDown = true;
            }
          }}
        />
      {/each}
    </svg>
  </div>
  {#if editable}
    <!-- TODO use active pen -->
    <ToolBar
      on:clear={() => {
        points = [];
      }}
    />
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
</style>
