<script>
  import { _ } from "$lib/utils/locale"
  import { ODD_HREF } from "$lib/utils/constants";

  
</script>


<div class="w-full h-full overflow-auto no-scrollbar flex flex-col gap-6 py-12">
  <h1 class="font-black text-5xl">{_('home.title')}</h1>

  {#each _('home.p') as p}
    <p class="my-0 font-light text-lg">{p}</p>
  {/each}

  <p class="font-light">{_('shared.createBy')}&nbsp;<a href={ODD_HREF} target="_blank" class="italic font-semibol underline underline-offset-2">{_('shared.odd')}</a></p>
</div>



