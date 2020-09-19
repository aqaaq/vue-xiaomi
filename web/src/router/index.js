import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('../views/Home.vue')
const Display = () => import('../views/Display.vue')
const Details = () => import('../views/Details.vue')
const Cart = () => import('../components/Cart.vue')
const Login = () => import('../views/Login.vue')
const NoFound = () => import('../views/NoFound.vue')
const Order = () => import('@/views/Order.vue')
const CheckOrder = () => import('@/components/CheckOrder.vue')
const Mi = () => import('@/views/Mi.vue')
const Pay = () => import('@/components/Pay.vue')
const OrderInfo = () => import('@/views/OrderInfo.vue')
const Register = () => import('@/views/Register.vue')
Vue.use(VueRouter)

import Vuex from '../store/index';
const routes = [
  {
    path: '/',
    redirect: '/home/display'
  }
  ,
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'display',
        component: Display
      },
      {
        path: 'details/:id',
        component: Details,
        props: true,
      },
      {
        path: 'order',
        component: Order,
        meta: { noPublic: true }
      },
      {
        path: 'order/info/:id',
        component: OrderInfo,
        meta: { noPublic: true },
        props: true
      }
    ]
  },
  {
    path: '/mi',
    component: Mi,
    children: [{ path: 'cart', component: Cart, meta: { title: '购物车' } },
    { path: 'check-order', component: CheckOrder, meta: { title: '确认订单', noPublic: true } },
    { path: 'pay/:id', component: Pay, meta: { title: '支付订单', noPublic: true }, props: true },
    ]
  },
  {
    path: '/login',
    component: Login
  }
  ,
  {
    path: '/register',
    component: Register,
    beforeEnter:(to,from,next)=>{
      next()
    },
    
  },
  {
    path: '*',
    component: NoFound
  }
]
const router = new VueRouter({
  routes
})
router.beforeEach((to, form, next) => {
  if (to.meta.noPublic && !Vuex.state.token) {
  return  next(false)
  }
  next()
})
export default router
