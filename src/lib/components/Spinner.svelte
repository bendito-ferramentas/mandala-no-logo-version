<div class="w-full h-full flex flex-col justify-center">


    <span class="loader aspect-square mx-auto w-12 rounded-full inline-block border-t-2 border-t-primary border-r-2 border-r-transparent"></span>

</div>


<style>
  .loader {
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
  
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  } 
</style>
