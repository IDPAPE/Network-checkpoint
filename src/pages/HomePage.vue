<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import PostCard from '../components/PostCard.vue';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import { adsService } from '../services/AdsService.js';

const currentPage = computed (()=> AppState.currentPage)
const posts = computed(()=> AppState.posts)
const ads = computed (()=> AppState.ads)

async function changePage(pageNumber){
  try {
    await postsService.getPostsByPageNumber(pageNumber)
  }
  catch (error){
    Pop.toast('Could not change page number','error')
    console.error(error)
  }
}

async function getAllPosts(){
  try {
    await postsService.getAllPosts()
  }
  catch (error){
    Pop.toast('could not get all posts', 'error')
    console.error(error)
  }
}

async function getAllAds(){
  try {
    await adsService.getAllAds()
  } 
  catch (error) {
    Pop.toast('could not get ads', 'error')
    console.error(error)
  }
}

onMounted(()=>{
  getAllPosts()
  getAllAds()
})
</script>

<template>
    <h1>Home Page</h1>
<div class="container-fluid">
  <section class="row">

    <div class="col-2">

      <ProfileDisplay/>

    </div>

    <div class="col-8">

    <div class="row bg-primary p-4">
      <form class="text-light">
        <div class="col-12">
          <h4>Post Body</h4>
          <textarea class="w-100 rounded" name="post-body" id="post-body" cols="" rows="10"></textarea>
        </div>
        <div class="container-fluid">
          <div class="row w-100">
            <div class="col-4">
              <input class="w-100 h-100 rounded" type="text" placeholder="insert image URL">
            </div>
            <div class="col-2">
              <button class="btn btn-light w-100">post</button>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="row p-2">
      <div class="col">
        <h5 @click="changePage(AppState.currentPage - 1)" class="selectable"><i class="mdi mdi-arrow-left"></i>Previous Page</h5>
      </div>
      <div class="col-4 text-center">
        <h5>Page: {{ currentPage }}</h5>
      </div>
      <div class="col text-end">
        <h5 @click="changePage(AppState.currentPage + 1)" class="selectable">Next Page<i class="mdi mdi-arrow-right"></i></h5>
      </div>
    </div>
    <div v-for="post in posts" :key="post.id" class="row my-2">
      <PostCard :post="post"/>
    </div>
    <div class="row p-2">
      <div class="col">
        <h5 @click="changePage(AppState.currentPage - 1)" class="selectable"><i class="mdi mdi-arrow-left"></i>Previous Page</h5>
      </div>
      <div class="col-4 text-center">
        <h5>Page: {{ currentPage }}</h5>
      </div>
      <div class="col text-end">
        <h5 @click="changePage(AppState.currentPage + 1)" class="selectable">Next Page<i class="mdi mdi-arrow-right"></i></h5>
      </div>
    </div>

  </div>
    
    <div class="col-2">
      <div v-for="ad in ads" :key="ad.title" class="row">
        <Ad :ad="ad"/>
      </div>
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
.post-img{
  max-width: 100%;
  object-fit: contain;
  object-position: center;
}
.pfp{
  height: 100px;
  width: 100px;
  max-width: 100%;
  object-fit: contain;
  object-position: center;  
}

.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);
  }
}
</style>
