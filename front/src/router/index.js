import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Article from '../views/Article.vue'
import Infos from '../views/Infos.vue'
import ListMedia from '../views/ListMedia.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/article',
    name: 'Article',
    component: Article
  },
  {
    path: '/infos',
    name: 'Infos',
    component: Infos
  },
  {
    path: '/media',
    name: 'Media',
    component: ListMedia
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
