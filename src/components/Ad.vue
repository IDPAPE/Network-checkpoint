<script setup>
import { Ad } from '../models/Ad.js';


defineProps({ad: Ad})

</script>


<template>
    <img class="mb-3" :src="ad.tall" alt="">
</template>


<style lang="scss" scoped>

</style>