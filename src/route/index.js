import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/page/Home.vue'
import BuySale from '../components/page/BuySale.vue'
import IndicationPlus from '../components/page/IndicationPlus.vue'
import News from '../components/page/News.vue'
import DetailPage from '../components/page/DetailPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/buy-sale',
    name: 'BuySale',
    component: BuySale
  },
  {
    path: '/buy-sale/:id/show',
    name: 'BuySaleShow',
    component: DetailPage
  },
  {
    path: '/indication-plus',
    name: 'IndicationPlus',
    component: IndicationPlus
  },
  {
    path: '/news',
    name: 'News',
    component: News
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "bg-gray-900",
  linkExactActiveClass: "bg-gray-900"
})

export default router