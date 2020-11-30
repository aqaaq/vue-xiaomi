import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../components/Main.vue'
const CategoriesList = () => import('../components/CategoriesList.vue');
const CategoriesEdit = () => import('../components/CategoriesEdit.vue');
const GoodsEdit = () => import('../components/GoodsEdit.vue');
const GoodsList = () => import('../components/GoodsList.vue');
const AdEdit = () => import('../components/AdEdit.vue');
const AdList = () => import('../components/AdList.vue');
const UserEdit = () => import('../components/UserEdit.vue');
const UserList = () => import('../components/UserList.vue');
const Login = () => import('../components/Login.vue');
const OrderList = ()=>import('../components/OrderList.vue');
const OrderEdit = ()=>import('../components/OrderEdit.vue');
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: 'categories/create',
        component: CategoriesEdit
      },
      {
        path: 'categories/list',
        component: CategoriesList
      },
      {
        path: 'categories/edit/:id',
        component: CategoriesEdit,
        props: true
      },
      {
        path: 'goods/create',
        component: GoodsEdit,
      },
      {
        path: 'goods/edit/:id',
        component: GoodsEdit,
        props: true
      },
      {
        path: 'goods/list',
        component: GoodsList,
      },
      {
        path: 'ads/create',
        component: AdEdit
      },
      {
        path: 'ads/edit/:id',
        component: AdEdit,
        props: true
      },
      {
        path: 'ads/list',
        component: AdList,
      },
      {
        path: 'users/create',
        component: UserEdit
      },
      {
        path: 'users/edit/:id',
        component: UserEdit,
        props: true
      },
      {
        path: 'users/list',
        component: UserList,
      },
      {
        path:"orders/list",
        component:OrderList
      },
      {
        path:"orders/edit",
        component:OrderEdit
      }
    ]
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
