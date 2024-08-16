import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'FlowHome',
    component: () => import('@/views/Home')
  },
  {
    path: '/design',
    name: 'FlowDesign',
    component: () => import('@/views/Design')
  }
]

const router = new VueRouter({
  routes
})

export default router
