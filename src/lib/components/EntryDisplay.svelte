<script>
  export let selected
</script>

<h4 class="w-3/5 mx-auto text-center text-3xl text-{selected.fullId} uppercase">
  {@html selected.name}
</h4>