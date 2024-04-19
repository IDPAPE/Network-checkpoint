import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { api } from "./AxiosService.js"

class PostsService {

    async getAllPosts() {
        const response = await api.get('api/posts')
        console.log('all posts:', response.data)
        AppState.posts = response.data.posts.map(post => new Post(post))
        console.log('appstate posts', AppState.posts)
    }
}

export const postsService = new PostsService()