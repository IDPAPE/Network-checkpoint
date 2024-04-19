import { AppState } from "../AppState.js";
import { Ad } from "../models/Ad.js";
import { api } from "./AxiosService.js"

class AdsService {

    async getAllAds() {
        const response = await api('api/ads')
        console.log('getting all ads', response.data)
        AppState.ads = response.data.map(ad => new Ad(ad))
        console.log(AppState.ads)
    }
}

export const adsService = new AdsService()