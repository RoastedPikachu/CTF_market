import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/pages/HomePage.vue';
import AdminPage from '@/pages/AdminPage.vue';
import ShopItemsPage from '@/pages/ShopItemsPage.vue';
import SignInPage from '@/pages/SignInPage.vue';
import RegistrationPage from '@/pages/RegistrationPage.vue';
import TokenPage from '@/pages/TokenPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:token?',
    name: 'home',
    component: HomePage
  },
  {
    path: '/admin/createShopItem/:token?',
    name: 'admin',
    component: AdminPage
  },
  {
    path: '/shopItems/:token?',
    name: 'shopItems',
    component: ShopItemsPage
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: SignInPage
  },
  {
    path: '/registration/:id',
    name: 'registration',
    component: RegistrationPage
  },
  {
    path: '/token',
    name: 'token',
    component: TokenPage
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
