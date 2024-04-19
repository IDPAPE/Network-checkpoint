<script setup>
import { Post } from '../models/Post.js';


defineProps({post: Post})

</script>


<template>
    <div class="col-12">
        <div class="card text-start">
            <RouterLink :to="{name: 'ProfilePage', params:{profileId: post.creatorId}}">
            <div class="container-fluid">
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
                <button class="btn btn-danger m-0 my-2"><i class="mdi mdi-heart"></i> {{ post.likeIds.length }}</button>
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
</style>