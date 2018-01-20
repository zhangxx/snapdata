import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'

import store from '../store/store'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
      requireAuth: false
    },
    children: [
      {
        path: 'home',
        component: Home,
        meta: {
          requireAuth: false
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.isLogined) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    if (to.path === '/login') {
      // next({
        // path: to.query.redirect
      // })
      next()
    } else {
      next()
    }
  }
})

export default router