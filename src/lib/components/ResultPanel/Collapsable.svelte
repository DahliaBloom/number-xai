<script lang="ts">
  export let heading: string;
</script>

<div class="collapse border border-primary collapse-arrow">
  <input type="checkbox" />
  <div class="collapse-title text-xl font-medium">{heading}</div>
  <div class="collapse-content">
    <slot />
  </div>
</div>
