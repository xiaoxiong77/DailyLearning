import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products'
import car from './modules/car'

Vue.use(Vuex)

export default new Vuex.Store({
  // 严格模式-必须通过mution修改state中的数据，否则会报错
  strict: process.env.NODE_ENV !== 'production', 
  state: {
    count: 0,
    msg: 'test'
  },
  getters: {
    handleMsg (state) {
      return 'hello'
    }
  },
  mutations: {
    handleAdd (state, payload) {
      state.count += payload
    }
  },
  actions: {
    handleAddAsync (context, payload) {
      setTimeout(() => {
        context.state.count += payload
      }, 2000)
    }
  },
  modules: {
    products,
    car
  }
})
