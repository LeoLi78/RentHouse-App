import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
const Home = () => import('@/views/Home')
const FindHouse = () => import('@/views/FindHouse')
const Infomation = () => import('@/views/Infomation')
const My = () => import('@/views/My')
const Login = () => import('@/views/Login')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: 'home', component: Home, name: 'Home' },
      { path: 'infomation', component: Infomation, name: 'Infomation' },
      { path: 'my', component: My, anme: 'My' },
      { path: 'findhouse', component: FindHouse, name: 'FindHouse' },
    ]
  },
  { path: '/login', component: Login, name: 'Login' }
]

const router = new VueRouter({
  routes
})

export default router
