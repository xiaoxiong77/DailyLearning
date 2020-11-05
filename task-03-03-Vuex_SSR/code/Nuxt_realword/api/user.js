import { request } from '@/plugins/request'

// 登录接口
export const login = (data) => {
    return request({
        method: 'POST',
        url: '/api/users/login',
        data
    })
}

// 注册接口
export const register = (data) => {
    return request({
        method: 'POST',
        url: '/api/users',
        data
    })
}