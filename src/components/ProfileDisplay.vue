<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';


const account = computed(()=>AppState.account)

</script>


<template>
        <div class="row">
            <div class="col">
                <div class="row justify-content-center">
                    <!-- <img class="pfp"
                        src="https://imgs.search.brave.com/BXqOJuF_RVacrwxjODkF2cNrHuZKn8-Ofy593M31LmM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMubmlnaHRjYWZl/LnN0dWRpby8vYXNz/ZXRzL21hbi1pbi1z/dWl0LmpwZz90cj13/LTE2MDAsYy1hdF9t/YXg"
                        alt="PFP"> -->
                        <Login/>
                </div>
                <div v-if="account">
                    <p class="m-0"></p>
                    <h4>
                        {{ account.name }} 
                        <i class="mdi mdi-school"></i>
                        <i v-if="account.graduated" class="mdi mdi-check"></i>
                        <i v-if="!account.graduated" class="mdi mdi-cancel"></i>
                    </h4>
                    <h5 v-if="account.github"><i class="fs-4 mdi mdi-github"></i>{{ account.github }}</h5>
                    <h5 v-if="account.linkedin"><i class="fs-4 mdi mdi-linkedin"></i>{{ account.linkedin }}</h5>
                </div>
            </div>
        </div>
</template>


<style lang="scss" scoped>
    .pfp{
  height: 100px;
  width: 100px;
  object-fit: contain;
  object-position: center;
}
</style>