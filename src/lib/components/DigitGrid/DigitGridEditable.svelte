<script lang="ts">
  import { primary } from "$lib/util/color";
  import { getImageValues, center } from "$lib/util/image";
  import type { Vec } from "$lib/util/math";

  import type { NNOut } from "$lib/util/nn/nn";
  import DigitGrid from "./DigitGrid.svelte";

  export let points: Vec[] = [];

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
