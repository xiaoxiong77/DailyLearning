import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4323cc74 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _48f30a7b = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _54b2e566 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _414182e6 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _c46eb882 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _5ac17fee = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _73acfc4c = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

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
    component: _4323cc74,
    children: [{
      path: "",
      component: _48f30a7b,
      name: "home"
    }, {
      path: "/login",
      component: _54b2e566,
      name: "login"
    }, {
      path: "/register",
      component: _54b2e566,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _414182e6,
      name: "profile"
    }, {
      path: "/settings",
      component: _c46eb882,
      name: "settings"
    }, {
      path: "/editor",
      component: _5ac17fee,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _73acfc4c,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
