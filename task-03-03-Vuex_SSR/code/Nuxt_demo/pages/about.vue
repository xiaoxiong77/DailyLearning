<template>
    <div>
        <h1> about 页面</h1>

        <!-- a链接：刷新导航，走服务端渲染 -->
        <h2>a链接</h2>
        <a href="/">去首页</a>

        <!-- router-link 导航链接组件 -->
        <h2>router-link</h2>
        <router-link to="/">去首页</router-link>

        <!-- 编程式导航 -->
        <h2>编程式导航</h2>
        <button @click="onClick">去首页</button>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    methods: {
        onClick () {
            this.$router.push('/')
        }
    },
}
</script>

<style>

</style>