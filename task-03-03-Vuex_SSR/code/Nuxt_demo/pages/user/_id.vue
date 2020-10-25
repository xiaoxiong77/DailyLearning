<template>
    <div>
        <h1>user page</h1>
        <div>{{ $route.params.id }}</div>
    </div>
</template>

<script>
export default {
    name: 'UserPage',
    async asyncData (context) {
        // asyncData 的参数为上下文对象，我们无法在这个方法里使用 this
        // 所以无法通过 this.$router.params.id 拿到路由参数，但是可以通过 context.params.id 获取参数
        console.log(context, context.params.id) 
    }
}
</script>

<style>

</style>