<script setup>

</script>

<template>
    <h1>Home Page</h1>
<div class="container-fluid">
  <section class="row">

    <div class="col-1">

      <ProfileDisplay/>

    </div>

    <div class="col-9">
      
      <Posts/>

    </div>
    
    <div class="col-2">
      Ads go here
    </div>

  </section>
</div>
  <!-- <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="home-card p-5 card align-items-center shadow rounded elevation-3">
      <img src="https://bcw.blob.core.windows.net/public/img/8600856373152463" alt="CodeWorks Logo"
        class="rounded-circle">
      <h1 class="my-5 bg-dark text-white p-3 rounded text-center">
        Vue 3 Starter
      </h1>
    </div>
  </div> -->
  </template>

<style scoped lang="scss">
// .pfp{
//   height: 100px;
//   width: 100px;
//   object-fit: contain;
//   object-position: center;  
// }

.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
