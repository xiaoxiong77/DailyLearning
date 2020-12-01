<template>
    <div id="app">
        <h1>{{ message }}</h1>
        <h3>客户端动态交互</h3>
        <div>
            <input v-model="message">
        </div>
        <div>
            <button @click="onClick">点击测试</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    data () {
        return {
            message: '哈哈哈哈'
        }
    },
    methods: {
        onClick () {
            console.log('click')
        }
    }
}
</script>