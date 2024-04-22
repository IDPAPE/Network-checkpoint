<script setup>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState.js';
import PostCard from '../components/PostCard.vue';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import { adsService } from '../services/AdsService.js';
import { profilesService } from '../services/ProfilesService.js';

const currentPage = computed (()=> AppState.currentPage)
const posts = computed(()=> AppState.posts)
const ads = computed (()=> AppState.ads)
const account = computed(()=> AppState.account)
const profiles = computed(()=>AppState.searchedProfiles)

const searchData = ref({
  searchInput: ''
})

const postData = ref({
  body: '',
  imgUrl: '',
})

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

async function search(){
  try {
    console.log('searching posts using data:', searchData.value.searchInput
    )
    await postsService.search(searchData.value.searchInput)
    await profilesService.getProfilesBySearch(searchData.value.searchInput)
    searchData.value.searchInput = ''
  } catch (error) {
    Pop.toast('could not search posts','error')
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

async function postPost(){
  try {
    console.log('this is the posts function working', postData.value)
    await postsService.postPost(postData.value)
  } catch (error) {
    Pop.toast('could not post post post post post', 'error')
    console.error(error)
  }
}

onMounted(()=>{
  getAllPosts()
  getAllAds()
})
</script>

<template>
<div class="container-fluid">
  <section class="row">

    <div class="col-2 bg-secondary text-light p-3">

      <ProfileDisplay/>

    </div>

    <div class="col-8 p-5">

    <div class="row mb-3">
      <div class="col">
      <form @submit.prevent="search()">
        <div class="row">
          <div class="col-11">
        <input v-model="searchData.searchInput" type="text" name="search-bar" id="search-bar" class="w-100 p-0 m-0" placeholder="Search Posts">
          </div>
          <div class="col-1">
            <button class="btn btn-secondary m-0"><i class="mdi mdi-magnify"></i></button>
          </div>
        </div>
      </form>
    </div>
  </div>

    <div v-if="account" class="row bg-primary p-4 rounded mb-5">
      <form @submit.prevent="postPost()" class="text-secondary">
        <div class="col-12">
          <h4>Post Body</h4>
          <textarea v-model="postData.body" required class="w-100 rounded form-control" name="post-body" id="post-body" cols="" rows="10"></textarea>
        </div>
        <div class="container-fluid">
          <div class="row w-100 pt-3">
            <div class="col-4">
              <input v-model="postData.imgUrl" class="w-100 h-100 rounded text-center form-control" type="text" placeholder="insert image URL">
            </div>
            <div class="col-2">
              <button class="btn btn-light w-100 border-dark bg-page">post</button>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div v-if="!posts == null" class="row p-2">
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
    <div class="row">
      <h5 v-if="!posts == null" >Posts <hr /></h5>
    </div>
    <div v-for="post in posts" :key="post.id" class="row mb-5">
      <PostCard :post="post"/>
    </div>
    <div v-if="!posts == null" class="row p-2">
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
    <div class="row"><h4>Users <hr/></h4></div>
    <div v-if="profiles" class="row">
      <div v-for="profile in profiles" :key="profile.id" class="row mb-5">
      <ProfileCard :profile="profile"/>
    </div>
    </div>

  </div>
    
    <div class="col-2 bg-secondary p-3">
      <div v-for="ad in ads" :key="ad.title" class="row rounded">
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
