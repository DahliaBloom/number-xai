<script lang="ts">
  import { Alignment, type Vec } from "$lib/util/math";

  export let data: any;
  export let alignment: Alignment;
  export let element: HTMLElement | undefined;

  $: rect = element?.getBoundingClientRect();

  function getAlignment(alignment: Alignment) {
    switch (alignment) {
      case Alignment.Left:
        return "tooltip-left";
      case Alignment.Right:
        return "tooltip-right";
      case Alignment.Bottom:
        return "tooltip-bottom";
      case Alignment.Top:
        return "tooltip-top";
    }
  }
</script>

{#if element != undefined && rect != undefined}
  <div
    class="fixed pointer-events-none z-50"
    style="left: {rect.left}px; top: {rect.top}px;"
  >
    <div class="tooltip tooltip-open {getAlignment(alignment)}" data-tip={data}>
      <div style="width: {rect.width}px; height: {rect.height}px;" />
    </div>
  </div>
{/if}
