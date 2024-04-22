import { AppState } from "../AppState.js"
import { Account } from "../models/Account.js"
import { Profile } from "../models/Profile.js"
import { api } from "./AxiosService.js"

class ProfilesService {

    async getProfileById(profileId) {
        const response = await api.get(`api/profiles/${profileId}`)
        console.log('getting profile', response.data)
        AppState.activeProfile = new Account(response.data)
        console.log(AppState.activeProfile)
    }

    async getProfilesBySearch(searchData) {
        console.log('searching for users using:', searchData)
        const response = await api.get(`api/profiles?query=${searchData}`)
        console.log('searching for profiles using', response.data)
        AppState.searchedProfiles = response.data.map(profile => new Profile(profile))
        console.log(AppState.searchedProfiles)
    }
}

export const profilesService = new ProfilesService()