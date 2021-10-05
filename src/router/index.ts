import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    //首页
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    //登录界面
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../prodigal/Register.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
