<script setup>
import { useRoute } from 'vue-router';
import { profilesService } from '../services/ProfilesService.js';
import Pop from '../utils/Pop.js';
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import { adsService } from '../services/AdsService.js';

const profilePage = computed (()=> AppState.profilePage)
const ads = computed (()=> AppState.ads)
const profile = computed(()=>AppState.activeProfile)
const posts = computed(()=> AppState.profilePosts)

const route = useRoute()

async function getProfileById(){
    try {
        await profilesService.getProfileById(route.params.profileId)
    } catch (error) {
        Pop.toast('can not get profile by id','error')
        console.error(error)
    }
}

async function getPostsByProfile(){
    try {
        await postsService.getPostsByProfile(route.params.profileId)
    } catch (error) {
        Pop.toast('can not get this profiles post','error')
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

async function changePage(pageNumber){
  try {
    await postsService.getProfilePostsByPageNumber(pageNumber)
  }
  catch (error){
    Pop.toast('Could not change page number','error')
    console.error(error)
  }
}

onMounted(()=>{
    getProfileById()
    getPostsByProfile()
    getAllAds()
})
</script>


<!-- this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    this.coverImg = data.coverImg
    this.graduated = data.graduated
    this.github = data.github
    this.linkedin = data.linkedin
    this.resume = data.resume -->


<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-10">
                <div v-if="profile" class="row">
                    <div class="col-12">
                        <img class="cover-img" :src="profile.coverImg" alt="">
                    </div>
                </div>
                <div v-if="profile" class="row">
                    <div class="col text-center">
                        <img class="pfp" :src="profile.picture" alt="">
                        <hr />
                    </div>
                </div>
                
                <div v-if="profile" class="row justify-content-center text-center">
                    <div class="col-lg-4 col-12 d-flex flex-direction: row">
                        <h1>{{ profile.name }}</h1>
                        <h1>
                            <i class="mdi mdi-school"></i>
                            <i v-if="profile.graduated" class="mdi mdi-check"></i>
                            <i v-if="!profile.graduated" class="mdi mdi-cancel"></i>
                        </h1>
                        <h5>{{ profile.class }}</h5>
                        <h5>{{ profile.email }}</h5>
                    </div>
                    <div class="col-lg-4 col-12">
                        <h5>Links
                            <hr />
                        </h5>
                        <h5 v-if="profile.github"><i class="fs-4 mdi mdi-github"></i>{{ profile.github }}</h5>
                        <h5 v-if="profile.linkedin"><i class="fs-4 mdi mdi-linkedin"></i>{{ profile.linkedin }}</h5>
                        <h5 v-if="profile.resume"><i class="mdi mdi-file-account"></i>{{ profile.resume }}</h5>
                    </div>
                    <div class="col-8 mb-4 border-top border-dark">
                        <p>{{ profile.bio }}</p>
                    </div>
                </div>
                <div class="row p-2">
      <div class="col">
        <h5 @click="changePage(AppState.profilePage - 1)" class="selectable"><i class="mdi mdi-arrow-left"></i>Previous Page</h5>
      </div>
      <div class="col-4 text-center">
        <h5>Page: {{ profilePage }}</h5>
      </div>
      <div class="col text-end">
        <h5 @click="changePage(AppState.profilePage + 1)" class="selectable">Next Page<i class="mdi mdi-arrow-right"></i></h5>
      </div>
    </div>
                <div v-for="post in posts" :key="post.creatorId" class="row my-3">
                    <PostCard :post="post" />
                </div>
                <div class="row p-2">
      <div class="col">
        <h5 @click="changePage(AppState.profilePage - 1)" class="selectable"><i class="mdi mdi-arrow-left"></i>Previous Page</h5>
      </div>
      <div class="col-4 text-center">
        <h5>Page: {{ profilePage }}</h5>
      </div>
      <div class="col text-end">
        <h5 @click="changePage(AppState.profilePage + 1)" class="selectable">Next Page<i class="mdi mdi-arrow-right"></i></h5>
      </div>
    </div>
            </div>
            <div class="col-2 p-3">
                <div v-for="ad in ads" :key="ad.title" class="row rounded">
                    <Ad :ad="ad" />
                </div>
            </div>
        </div>

    </div>
</template>


<style lang="scss" scoped>
    .cover-img{
        object-fit: cover;
        object-position: center;
        width: 100%;
        height: 20dvh;
    }

    .pfp{
  height: 200px;
  width: 200px;
  max-width: 100%;
  object-fit: contain;
  object-position: center;
}
</style>