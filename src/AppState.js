import { reactive } from 'vue'
import { Post } from './models/Post.js'
import { Ad } from './models/Ad.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  currentPage: 1,

  /** @type {{name, picture, id}} user info from Auth0*/
  user: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,

  /**@type {Post[]} */
  posts: [],

  /**@type {Ad[]} */
  ads: []
})
