import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import TestPage from '@/pages/TestPage.vue';
import CreateItemPage from '@/pages/CreateItemPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'test',
    component: TestPage
  },
  {
    path: '/createItem',
    name: 'createItem',
    component: CreateItemPage
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   //component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
