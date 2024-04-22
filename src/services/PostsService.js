import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { api } from "./AxiosService.js"

class PostsService {
    async getPostsByPageNumber(pageNumber) {
        if (pageNumber < 1) return
        if (pageNumber > AppState.posts.length) return
        const response = await api.get(`api/posts?page=${pageNumber}`)
        console.log(`page ${pageNumber} posts ${response.data}`)
        AppState.posts = response.data.posts.map(post => new Post(post))
        AppState.currentPage = pageNumber
    }

    async getProfilePostsByPageNumber(pageNumber) {
        const profileId = AppState.activeProfile.id
        if (pageNumber < 1) return
        if (pageNumber >= AppState.profilePosts.length) return
        const response = await api.get(`api/posts?page=${pageNumber}&creatorId=${profileId}`)
        console.log(`page ${pageNumber} posts ${response.data}`)
        AppState.profilePosts = response.data.posts.map(post => new Post(post))
        AppState.profilePage = pageNumber
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

    async postPost(postData) {
        const response = await api.post('api/posts', postData)
        // console.log('im so close', response.data)
        AppState.posts.unshift(new Post(response.data))
    }

    async deletePost(postId) {
        console.log('deleteing post with id:', postId)
        const indexToDelete = AppState.posts.findIndex(post => post.id == postId)
        await api.delete(`api/posts/${postId}`)
        AppState.posts.splice(indexToDelete, 1)
    }

    async likePost(postId) {
        console.log('liking post with id', postId)
        const response = await api.post(`api/posts/${postId}/like`)
    }
}

export const postsService = new PostsService()