<script setup>
import { computed } from 'vue';
import { Post } from '../models/Post.js';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';


defineProps({post: Post})

const loggedInAccount = computed(()=> AppState.account)


async function deletePost(postId){
    try {
        const confirmation = await Pop.confirm('are you sure you want to delete this post')
        if (confirmation == false) return
        await postsService.deletePost(postId)
    } catch (error) {
        Pop.toast('could not delete post', 'error')
        console.error(error)
    }
}

async function likePost(postId){
    try {
        await postsService.likePost(postId)
        await postsService.getAllPosts()
    } catch (error) {
        Pop.toast('could not like post', 'error')
        console.error(error)
    }
   
}

</script>


<template>
    <div class="col-12">
        <div class="card text-start ">
            <RouterLink :to="{name: 'ProfilePage', params:{profileId: post.creatorId}}">
            <div class="container-fluid text-primary">
                <div class="row">
                    <div class="col-1">
                        <img class="pfp"
                            :src="post.creator.picture"
                            alt="">
                    </div>
                    <div class="col">
                        <h5 class="mt-3">{{ post.creator.name }}</h5>
                        <p class="">{{post.updatedAt.toDateString()}}</p>
                    </div>
                </div>
            </div>
        </RouterLink>
            <div class="card-body container-fluid">
                <div class="row">
                    <div class="col">
                        <h5>{{ post.body }}</h5>
                    </div>
                    <div class="col-4 text-center">
                        <img class="post-img"
                            :src="post.imgUrl"
                            alt="">
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col">
                        <button @click="likePost(post.id)" class="btn btn-danger m-0 my-2"><i class="mdi mdi-heart"></i> {{ post.likeIds.length }}</button>
                    </div>
                    <div v-if="post.creatorId == loggedInAccount?.id" class="col text-end">
                        <button v-if="post.creatorId == loggedInAccount?.id" @click="deletePost(post.id)" class="btn btn-danger m-0 my-2"><i class="mdi mdi-delete"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
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

.link{
    text-decoration: none;
}
</style>