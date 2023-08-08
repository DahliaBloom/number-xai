<script lang="ts" context="module">
  function getImageValues(points: Vec[]): number[] {
    let values = new Array(28 ** 2).fill(0);

    for (const point of points) {
      const { x, y } = point;

      values = values.map((value, n) => {
        const tile = pixelToVec(n);

        const dist = Math.hypot(tile.x - x, tile.y - y);

        let penValue = 0.8 - (dist / 2) ** 2;
        penValue = Math.min(Math.max(0, penValue), 1);
        return value + (1 - value) * penValue;
      });
    }

    return values;
  }

  function center(image: number[], points: Vec[]): Vec[] {
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
  import { primary } from "$lib/util/color";

  import { pixelToVec, type Vec } from "$lib/util/math";
  import type { NNOut } from "$lib/util/nn/nn";
  import DigitGrid from "./DigitGrid.svelte";

  let points: Vec[] = [];

  let imageRaw: number[] = Array(784).fill(0);
  $: imageRaw = getImageValues(points);

  export let image: number[];
  $: image = getImageValues(center(imageRaw, points));

  export let toColor = (p: number) =>
    `rgba(${primary.r}, ${primary.g}, ${primary.b}, ${p})`;

  export let output: NNOut | undefined = undefined;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="h-full" on:dblclick={() => (points = [])}>
  <DigitGrid
    bind:image={imageRaw}
    bind:points
    {toColor}
    editable={true}
    {output}
  />
</div>
