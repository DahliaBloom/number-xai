<script lang="ts">
  import type { Vec } from "$lib/util/math";
  import type { NNOut } from "$lib/util/nn/nn";
  import DigitGrid from "../DigitGrid/DigitGrid.svelte";
  import Collapsable from "./Collapsable.svelte";
  import NormalizedImage from "./NormalizedImage.svelte";

  export let output: NNOut;
  export let points: Vec[];
</script>

<div class="overflow-y-auto h-[85vh] flex flex-col gap-3">
  <NormalizedImage {output} {points} />
  <div class="h-[1px]" />
</div>
