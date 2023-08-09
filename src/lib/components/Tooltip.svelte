<script lang="ts">
  import { Alignment, type Vec } from "$lib/util/math";

  export let data: any;
  export let alignment: Alignment;
  export let boundingRect: DOMRect | undefined;
  export let offset: Vec = { x: 0, y: 0 };

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

{#if boundingRect != undefined}
  <div
    class="fixed pointer-events-none z-50"
    style="left: {boundingRect.left + offset.x}px; top: {boundingRect.top + offset.y}px;"
  >
    <div class="tooltip tooltip-open {getAlignment(alignment)}" data-tip={data}>
      <div style="width: {boundingRect.width}px; height: {boundingRect.height}px;" />
    </div>
  </div>
{/if}
