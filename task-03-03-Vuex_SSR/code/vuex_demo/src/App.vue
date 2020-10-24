<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->

    <h1>State</h1>
    <!-- <p>count: {{ $store.state.count }}</p>
    <p>msg: {{ $store.state.msg }}</p> -->

    <!-- <p>count: {{ count }}</p>
    <p>msg: {{ msg }}</p> -->

    <p>count: {{ num }}</p>
    <p>msg: {{ message }}</p>

    <h1>Getter</h1>
    <!-- <p>handleMsg: {{ $store.getters.handleMsg }}</p> -->
    <p>handleMsg: {{ handleMsg }}</p>

    <h1>Mutation</h1>
    <!-- <button @click="$store.commit('handleAdd', 2)">mutation</button> -->
    <!-- <button @click="handleAdd(2)">mutation</button> -->

    <h1>Action</h1>
    <!-- <button @click="$store.dispatch('handleAddAsync', 2)">mutation</button> -->
    <button @click="handleAddAsync(2)">action</button>

    <h1>Module</h1>
    <!-- <p>products: {{ $store.state.products.products }}</p>
    <button @click="$store.commit('products/setProducts', [])">mutation</button> -->
    <p>products: {{ products }}</p>
    <button @click="setProducts([])">mutation</button>

  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  // count: state => state.count
  computed: {
    // ...mapState(['count', 'msg'])
    ...mapState({ num: 'count', message: 'msg' }),
    ...mapGetters(['handleMsg']),
    ...mapState('products', ['products'])
  },
  methods: {
    ...mapMutations(['handleAdd']),
    ...mapActions(['handleAddAsync']),
    ...mapMutations('products', ['setProducts'])
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
