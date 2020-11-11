import axios from 'axios'

export const request =  axios.create({
    baseURL: 'https://conduit.productionready.io'
    // baseURL: 'http://realworld.api.fed.lagounews.com'
})

// 通过插件机制获取上下文对象（query/params/req/res/app/store）
// 插件导出函数必须作为 default 成员
export default ({ store }) => {
    // 请求拦截器
    request.interceptors.request.use(function (config) {
        const { user } = store.state

        if (user && user.token) {
            config.headers.Authorization = `Token ${user.token}`
        }
        return config
    }, function (error) {
        // 请求失败（请求还没发出）
        return Promise.reject(error)
    })
}