import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home')
  },
  {
    path: '/design',
    name: 'Design',
    component: () => import('@/views/Design')
  }
]

const router = new VueRouter({
  routes
})

export default router
