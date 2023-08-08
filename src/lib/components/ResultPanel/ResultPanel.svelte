<script lang="ts">
  import type { NNOut } from "$lib/util/nn/nn";
  import DigitGrid from "../DigitGrid/DigitGrid.svelte";
  import Collapsable from "./Collapsable.svelte";

  export let output: NNOut;
</script>

<div class="overflow-y-auto h-[85vh] flex flex-col gap-3 pt-4 pb-4">
  <!-- TODO scrollbar & fade-->
  <Collapsable heading="Normalized Image"
    ><div class="w-full h-[50vh]">
      <DigitGrid image={output.layers[0]} />
    </div></Collapsable
  >
  <Collapsable heading="Normalized Image"
    ><div class="w-full h-[50vh]">
      <DigitGrid image={output.layers[0]} />
    </div></Collapsable
  >
  <Collapsable heading="Normalized Image"
    ><div class="w-full h-[50vh]">
      <DigitGrid image={output.layers[0]} />
    </div></Collapsable
  >
  <div class="h-[1px]" />
</div>

<style>
</style>
