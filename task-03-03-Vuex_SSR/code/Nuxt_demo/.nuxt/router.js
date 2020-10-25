import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _88865a42 = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _6409e669 = () => interopDefault(import('../pages/user.vue' /* webpackChunkName: "pages/user" */))
const _18c03a2c = () => interopDefault(import('../pages/user/index.vue' /* webpackChunkName: "pages/user/index" */))
const _792ed794 = () => interopDefault(import('../pages/user/_id.vue' /* webpackChunkName: "pages/user/_id" */))
const _4916a4b8 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _88865a42,
    name: "about"
  }, {
    path: "/user",
    component: _6409e669,
    children: [{
      path: "",
      component: _18c03a2c,
      name: "user"
    }, {
      path: ":id",
      component: _792ed794,
      name: "user-id"
    }]
  }, {
    path: "/",
    component: _4916a4b8,
    name: "index"
  }, {
    path: "/hello",
    component: _88865a42,
    name: "hello"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
