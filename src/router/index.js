import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'GetStarted', component: () => import('../views/GetStarted.vue') },
  { path: '/home', name: 'Home', component: () => import('../views/Home.vue') },
  { path: '/profile', name: 'Profile', component: () => import('../views/Profile.vue') }
]

export default createRouter({
  history: createWebHistory(),
  routes
})