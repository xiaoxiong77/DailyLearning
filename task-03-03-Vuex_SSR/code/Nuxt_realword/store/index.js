// 仅在服务端加载 cookieparser
const cookieparser = process.server ? require('cookieparser') : undefined

// 在服务端渲染期间运行的都是同一个实例，为了防止数据冲突，务必要把 state 定义成一个函数
export const state = () => {
    return {
        // 当前登录用户的相关信息
        user: null
    }
}

export const mutations = {
    setUser (state, data) {
        state.user = data
    }
}

export const actions = {
    // nuxtServerInit 是一个特殊的 action 方法，会在服务端渲染期间自动调用
    // 作用：初始化容器数据；传递数据给客户端使用
    nuxtServerInit ({ commit }, { req }) {
        console.log('nuxtServerInit===')
        let user = null
        // 如果请求头里有 Cookie
        if (req.headers.cookie) {
            // 使用 cookieparser 把 cookie 字符串转换成对象
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
                user = JSON.parse(parsed.user)
            } catch (err) {
                // No valid cookie found
            }
        }
        console.log('nuxtServerInit--user---', user)
        commit('setUser', user)
      }
}