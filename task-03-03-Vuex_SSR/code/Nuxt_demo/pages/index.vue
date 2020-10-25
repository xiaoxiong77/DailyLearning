<template>
    <div>
        <h1>首页</h1>
        <h1>{{ title }}</h1>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'HomePage',
    async asyncData() {
        const res = await axios({
            method: 'GET',
            // 这里的请求地址要写完整，因为在服务端渲染期间，也要来请求数据，不写完整的话服务端渲染就会走到80端口
            // 如果只是客户端渲染，就会以3000端口为基准来请求根目录下的data.json，服务端渲染就默认走到80了
            url: 'http://localhost:3000/data.json'
        })
        // 返回的数据会与data中的数据混合
        return res.data
    },
}
</script>

<style>

</style>