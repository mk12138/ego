import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout'
import Goods from '../views/Goods.vue'
import Login from '../views/Login/index.vue'

const Params=()=>import('../views/Params')
const Advert=()=>import('../views/Advert')
const User=()=>import('../views/User')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    meta:{
      isLogin:true
    },
    children:[
      {
        path:'/',
        name:'Goods',
        component:Goods
      },
      {
        path:'/params',
        name:'Params',
        component:Params
      },
      {
        path:'/advert',
        name:'Advert',
        component:Advert
      },
      {
        path:'/user',
        name:'User',
        component:User
      },
    ]
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

//全局守卫导航
router.beforeEach((to,from,next)=>{
  //判断是否需要登录
  if(to.matched.some(ele=>ele.meta.isLogin)){//需要登录
    //判断当前是否登录
    let token=true; 
    if(token){
      next()
    }else{
      next('/login')
    }
  }else{
    //不需要登录
    next()
  }
})



export default router
