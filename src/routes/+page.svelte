<script lang="ts">
  import DigitGridEditable from "$lib/components/DigitGrid/DigitGridEditable.svelte";
  import ResultPanel from "$lib/components/ResultPanel/ResultPanel.svelte";
  import type { Vec } from "$lib/util/math";
  import { run } from "$lib/util/nn/nn";

  let image: number[] = Array(784).fill(0);
  let points: Vec[] = [];
  $: output = run(image);
</script>

<h1>Data maze, thoughts blaze, choices amaze ✨</h1>
<div class="grid place-items-center h-[85vh]">
  <div class="flex gap-12 w-[93%]">
    <div class="flex-shrink-0 basis-[70vh] flex flex-col">
      <DigitGridEditable bind:image {output} bind:points />
    </div>
    <div class="flex-grow">
      <ResultPanel {output} {points} />
    </div>
  </div>
</div>

<style lang="postcss">
  h1 {
    text-align: center;
    padding-top: 1vh;
    padding-bottom: 2vh;
    font-size: 7vh;
    font-family: Anton;
    background: -webkit-linear-gradient(
      0deg,
      theme(colors.primary) 50%,
      theme(colors.secondary) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
