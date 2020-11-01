<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">

                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up' }}</h1>
                    <p class="text-xs-center">
                        <!-- <a href="">Have an account?</a> -->
                        <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
                        <nuxt-link v-else to="/login">Have an account?</nuxt-link>
                    </p>

                    <ul class="error-messages">
                        <template v-for="(messages, field) in errorMsg">
                            <li
                                v-for="(message, index) in messages"
                                :key="index"
                            >
                                {{ field }}{{ message }}
                            </li>
                        </template>
                    </ul>

                    <form @submit.prevent="handleSubmit">
                        <fieldset v-if="!isLogin" class="form-group">
                            <input
                                required
                                class="form-control form-control-lg"
                                type="text"
                                placeholder="Your Name"
                                v-model="user.username"
                            >
                        </fieldset>
                        <fieldset class="form-group">
                            <input
                                required
                                type="email"
                                class="form-control form-control-lg"
                                placeholder="Email"
                                v-model="user.email"
                            >
                        </fieldset>
                        <fieldset class="form-group">
                            <input
                                required
                                minlength="8"
                                class="form-control form-control-lg"
                                type="password"
                                placeholder="Password"
                                v-model="user.password"
                            >
                        </fieldset>
                        <button class="btn btn-lg btn-primary pull-xs-right">
                            {{ isLogin ? 'Sign in' : 'Sign up' }}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
// import request from '@/utils/request'
import { login, register } from '@/api/user'

// 仅在客户端加载 js-cookie
const Cookie = process.client ? require('js-cookie') : undefined

export default {
    middleware: 'notAuthenticated',
    name: 'LoginPage',
    computed: {
        isLogin () {
            return this.$route.name === 'login'
        }
    },
    data() {
        return {
            user: {
                email: '',
                password: '',
                username: ''
            },
            errorMsg: {}
        }
    },
    methods: {
        // 登录或注册请求接口
        async handleSubmit () { 
            try {
                const { data } = this.isLogin ?
                    await login({ // 登录
                        user: this.user
                    }) : 
                    await register({ // 注册
                        user: this.user
                    })
                console.log('data==', data)
                // 存储用户登录状态
                this.$store.commit('setUser', data.user)

                // 为了防止刷新页面数据丢失，需要将数据持久化
                Cookie.set('user', data.user)

                // 跳转到首页
                this.$router.push('/')
            } catch (error) {
                this.errorMsg = error.response.data.errors
            }
        }
    }
}
</script>

<style>
</style>