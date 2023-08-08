<script lang="ts">
  import {
    getImageValues,
    normalizeParams,
    normalizeTransformation,
  } from "$lib/util/image";
  import type { Vec } from "$lib/util/math";
  import type { NNOut } from "$lib/util/nn/nn";
  import DigitGrid from "../DigitGrid/DigitGrid.svelte";
  import Collapsable from "./Collapsable.svelte";

  export let output: NNOut;
  export let points: Vec[];

  let steps = 0;

  $: image = getImageValues(points);
  $: normalizeParam = normalizeParams(image);
  $: ((_) => (steps = 0))(normalizeParam);
  $: imageNorm = getImageValues(
    normalizeTransformation(
      points,
      normalizeParam.scale,
      normalizeParam.center,
      steps < 0.5 ? 4 * steps ** 3 : 1 - (-2 * steps + 2) ** 3 / 2
    )
  );

  setInterval(() => {
    steps += 1 / 60;
    steps %= 1;
  }, 1000 / 60);
</script>

<Collapsable heading="Normalizing Image"
  ><div class="w-full h-[20vh] flex items-center">
    <DigitGrid {image} />
    <p class="text-4xl">⇢</p>
    <DigitGrid image={imageNorm} />
    <p class="text-4xl">⇢</p>
    <DigitGrid image={output.layers[0]} />
  </div></Collapsable
>
