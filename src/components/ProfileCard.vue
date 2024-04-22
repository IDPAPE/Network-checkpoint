<script setup>
import { Profile } from '../models/Profile.js';



defineProps({profile: Profile})
</script>


<template>
<RouterLink :to="{name: 'ProfilePage', params:{profileId: profile.id}}">
<div class="card text-start">
    <div class="card-body">
        <div class="row">
            <div class="col-2">
                <img class="pfp" :src="profile.picture" alt="Avatar">
            </div>
            <div class="col-10">
                <h4 class="card-title">{{profile.name}}</h4>
            </div>
        </div>
    </div>
</div>
</RouterLink>

</template>


<style lang="scss" scoped>
.pfp{
  height: 100px;
  width: 100px;
  max-width: 100%;
  object-fit: contain;
  object-position: center;  
}
</style>