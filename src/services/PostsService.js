import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { api } from "./AxiosService.js"

class PostsService {
    async getPostsByPageNumber(pageNumber) {
        if (pageNumber < 1) return
        const response = await api.get(`api/posts?page=${pageNumber}`)
        console.log(`page ${pageNumber} posts ${response.data}`)
        AppState.posts = response.data.posts.map(post => new Post(post))
        AppState.currentPage = pageNumber
    }

    async getAllPosts() {
        const response = await api.get('api/posts')
        console.log('all posts:', response.data)
        AppState.posts = response.data.posts.map(post => new Post(post))
        console.log('appstate posts', AppState.posts)
    }

    async getPostsByProfile(profileId) {
        const response = await api.get(`api/posts?creatorId=${profileId}`)
        console.log("this profile's posts:", response.data)
        AppState.profilePosts = response.data.posts.map(post => new Post(post))
    }
}

export const postsService = new PostsService()