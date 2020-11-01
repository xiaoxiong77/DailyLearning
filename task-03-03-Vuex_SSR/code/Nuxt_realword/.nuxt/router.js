import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _462f81ea = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _e8608600 = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _233fa930 = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _9fac7c30 = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _3362e878 = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _5dcd3564 = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _d217f596 = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _462f81ea,
    children: [{
      path: "",
      component: _e8608600,
      name: "home"
    }, {
      path: "/login",
      component: _233fa930,
      name: "login"
    }, {
      path: "/register",
      component: _233fa930,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _9fac7c30,
      name: "profile"
    }, {
      path: "/settings",
      component: _3362e878,
      name: "settings"
    }, {
      path: "/editor",
      component: _5dcd3564,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _d217f596,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
