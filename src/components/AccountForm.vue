<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { accountService } from "../services/AccountService.js";
import { logger } from "../utils/Logger.js";

//  this.id = data.id
//     this.email = data.email
//     this.name = data.name
//     this.picture = data.picture
//     this.coverImg = data.coverImg
//     this.graduated = data.graduated
//     this.github = data.github
//     this.linkedin = data.linkedin
//     this.resume = data.resume

const account = computed(()=> AppState.account)

const accountData = ref({
  name: `${account.value.name}`,
  picture: `${account.value.picture}`,
  coverImg: `${account.value.coverImg}`,
  class: `${account.value.class}`,
  graduated: account.value.graduated,
  github: `${account.value.github}`,
  linkedin: `${account.value.linkedin}`,
  resume: `${account.value.resume}`,
  bio: `${account.value.bio}`

})

async function saveAccount(){
try {
  await accountService.saveAccount(accountData.value)
  console.log('Updated account', AppState.account)
  Pop.success('Your account has been updated')
} catch (error) {
  Pop.toast("Couldn't Save Account", 'error')
  console.error(error)
}

}

</script>


<template>


<form @submit.prevent="saveAccount()" class="row">
    <div class="mb-3 col-2">
      <label for="account-name">Name</label>
      <input v-model="accountData.name" class="form-control" type="text" id="account-name"  minlength="3" required maxlength="25"/>
    </div>
    <div class="mb-3 col-2">
      <label for="account-name">Class</label>
      <input v-model="accountData.class" class="form-control" type="text" id="account-class"  minlength="3" required maxlength="25"/>
    </div>
    <div class="mb-3 col-4">
      <label for="account-picture">Picture</label>
      <input v-model="accountData.picture" class="form-control" type="url" id="account-picture" required maxlength="500">
    </div>
    <div class="mb-3 col-4">
      <label for="account-cover-image">Cover Image</label>
      <input v-model="accountData.coverImg" class="form-control" type="url" id="account-cover-image" required maxlength="500">
    </div>
    <div class="mb-3 col-3">
      <label for="account-gihthub">Github</label>
      <input v-model="accountData.github" class="form-control" type="url" id="account-github" required maxlength="50">
    </div>
    <div class="mb-3 col-3">
      <label for="account-linkedin">LinkedIn</label>
      <input v-model="accountData.linkedin" class="form-control" type="url" id="account-linkedin" required maxlength="500">
    </div>
    <div class="mb-3 col-3">
      <label for="account-resume">Resume</label>
      <input v-model="accountData.resume" class="form-control" type="url" id="account-resume" required maxlength="500">
    </div>
    <div class="mb-3 pt-4 col-3">
      <label class="mx-3" for="account-graduated">Graduated:</label>
      <input v-model="accountData.graduated" type="checkbox" id="account-graduated">
    </div>
    <div class="mb-3 col-12">
      <label for="account-bio">Bio</label>
      <textarea v-model="accountData.bio" required class="w-100 rounded form-control" name="account-bio" id="account-bio" cols="" rows="10"></textarea>

    </div>

    <div class="mb-3 col-6">
      <button class="btn btn-success w-50">Save <i class="mdi mdi-floppy"></i></button>
    </div>

  </form>
</template>


<style lang="scss" scoped>

</style>