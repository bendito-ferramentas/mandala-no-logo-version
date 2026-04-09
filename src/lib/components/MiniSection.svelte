<script>
  export let title
  export let gap = 0
</script>

<div class="flex flex-col" style:gap="{gap/4}rem">
  <p class="font-extralight text-sm">{title}</p>
  <slot/>
</div>