<script lang="ts">
  import DigitGrid from "$lib/components/DigitGrid/DigitGrid.svelte";
  import ResultPanel from "$lib/components/ResultPanel/ResultPanel.svelte";
  import { run } from "$lib/util/nn/nn";

  let image: number[] = Array(784).fill(0);
  $: output = run(image);

  let fullscreen = false;
</script>

<div class="flex flex-col h-screen">
  <h1 class="text-center" id="eye-catcher">
    Data maze, thoughts blaze, choices amaze ✨
  </h1>
  <div class="flex flex-grow overflow-hidden p-7" class:space-x-4={!fullscreen}>
    {#if !fullscreen}
      <div class="basis-1/2 flex-shrink-0">
        <DigitGrid
          editable={true}
          on:center={(e) => {
            image = e.detail;
          }}
        />
      </div>
    {/if}
    <div class="flex-grow">
      <ResultPanel {output} bind:fullscreen />
    </div>
  </div>
</div>

<style lang="postcss">
  #eye-catcher {
    padding-top: 5vh;
    font-size: 4vw;
    font-family: Anton;
    background: -webkit-linear-gradient(
      0deg,
      theme(colors.primary) 30%,
      theme(colors.secondary) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
