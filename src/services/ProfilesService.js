import { AppState } from "../AppState.js"
import { Account } from "../models/Account.js"
import { api } from "./AxiosService.js"

class ProfilesService {

    async getProfileById(profileId) {
        const response = await api.get(`api/profiles/${profileId}`)
        console.log('getting profile', response.data)
        AppState.activeProfile = new Account(response.data)
        console.log(AppState.activeProfile)
    }
}

export const profilesService = new ProfilesService()