import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/pages/HomePage.vue';
import AdminCreateItemPage from '@/pages/AdminCreateItemPage.vue';
import AdminWatchForOrdersPage from '@/pages/AdminWatchForOrdersPage.vue';
import ShopItemsPage from '@/pages/ShopItemsPage.vue';
import ShopItemPage from '@/pages/ShopItemPage.vue';
import SignInPage from '@/pages/SignInPage.vue';
import RegistrationPage from '@/pages/RegistrationPage.vue';
import FAQPage from '@/pages/FAQPage.vue';
import Error404Page from '@/pages/Error404Page.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/createShopItem',
    name: 'adminCreate',
    component: AdminCreateItemPage
  },
  {
    path: '/watchForOrders',
    name: 'adminWatch',
    component: AdminWatchForOrdersPage
  },
  {
    path: '/shopItems/:category?',
    name: 'shopItems',
    component: ShopItemsPage
  },
  {
    path: '/shopItem/:id',
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
  {
    path: '/FAQ',
    name: 'FAQ',
    component: FAQPage
  },
  {
    path: '/404',
    name: 'error404',
    component: Error404Page
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
