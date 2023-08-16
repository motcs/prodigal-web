import {api} from '../api'

// 登录
export const userLogin = params => {
    return api.get('/api/login', {params: params}).then(response => response)
};

// 用户注册
export const userRegister = params => {
    return api.post('/api/register', params).then(response => response.data)
};

export const userSelectMe = params => {
    return api.get('/api/user/me', {params: params}).then(response => response)
};

export const refreshToken = () => {
    return api.get('/api/refresh/token').then(response => response)
};
