import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/pages/HomePage.vue';
import AdminCreateItemPage from '@/pages/AdminCreateItemPage.vue';
import AdminWatchForOrdersPage from '@/pages/AdminWatchForOrdersPage.vue';
import ShopItemsPage from '@/pages/ShopItemsPage.vue';
import ShopItemPage from '@/pages/ShopItemPage.vue';
import SignInPage from '@/pages/SignInPage.vue';
import RegistrationPage from '@/pages/RegistrationPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:token?',
    name: 'home',
    component: HomePage
  },
  {
    path: '/admin/createShopItem/:token?',
    name: 'adminCreate',
    component: AdminCreateItemPage
  },
  {
    path: '/admin/watchForOrders',
    name: 'adminWatch',
    component: AdminWatchForOrdersPage
  },
  {
    path: '/shopItems/:token?',
    name: 'shopItems',
    component: ShopItemsPage
  },
  {
    path: '/shopItem/:token?',
    name: 'shopItem',
    component: ShopItemPage
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: SignInPage
  },
  {
    path: '/registration',
    name: 'registration',
    component: RegistrationPage
  },
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
