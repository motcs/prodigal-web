import axios from 'axios' //引入 axios库
import $router from '@/router'
import {ElMessageBox} from 'element-plus'
import {refreshToken} from "@/api/user/user";
import jwt_decode from "jwt-decode";
/* 2.全局默认配置 */
/*你也可以创建一个实例，然后在实例中配置相关属性，此方法和上面的方法一样，写法不同，怎么用随个人
*喜好，我比较喜欢用这种方法，如下：
*/
const api = axios.create({
    // 后台服务地址
    baseURL: '/api',
    responseType: "json",
    // 是否允许带cookie这些
    withCredentials: false,
});
/*是否有请求正在刷新token*/
window.isRefreshing = false
// 挂起的请求数组
let refreshSubscribers = []

/*push所有请求到数组中*/
function subscribeTokenRefresh(cb) {
    refreshSubscribers.push(cb)
}

/*刷新请求（refreshSubscribers数组中的请求得到新的token之后会自执行，用新的token去请求数据）*/
function onRrefreshed(token) {
    refreshSubscribers.map(cb => cb(token))
}

api.interceptors.request.use(
    config => {
        let token = localStorage.getItem('token');
        let refresh_token_user = localStorage.getItem('refresh_token');
        if (token && token !== '') {
            config.headers['X-Auth-Token'] = token;
        }
        // 判断是否需要更新token
        let refresh_token = localStorage.getItem('token_expire_time')
        const currentTimestamp = Math.floor(Date.now() / 1000);
        // token过期，同时不是刷新token 的请求,提前20分钟请求
        if (refresh_token && refresh_token < currentTimestamp - 60 * 20
            && config.url.indexOf('api/user/refresh/token') !== -1 && refresh_token_user) {
            if (!window.isRefreshing) {
                /*将刷新token的标志置为true*/
                window.isRefreshing = true
                config.headers['X-Auth-Token'] = refresh_token_user;
                /*发起刷新token的请求*/
                refreshToken().then(res => {
                    /*将标志置为false*/
                    window.isRefreshing = false
                    /*成功刷新token*/
                    config.headers['Authorization'] = res.token;
                    let token_json = jwt_decode(res.token);
                    /*更新auth*/
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('refresh_token', res.refresh_token);
                    localStorage.setItem('token_expire_time', token_json.exp)
                    /*执行数组里的函数,重新发起被挂起的请求*/
                    onRrefreshed(res.result)
                    /*执行onRefreshed函数后清空数组中保存的请求*/
                    refreshSubscribers = []
                }).catch(err => {
                    console.log(err.response.data.message)
                    /*清除本地保存的auth*/
                    // localStorage.removeItem('auth')
                    window.location.href = '/'
                })
            }
            return new Promise((resolve) => {
                /*(token) => {...}这个函数就是回调函数*/
                subscribeTokenRefresh((token) => {
                    config.headers['token'] = token
                    /*将请求挂起*/
                    resolve(config)
                })
            })
        }
        return config;
    },
    error => Promise.reject(error)
);
api.interceptors.response.use(res => {
        if (res.status === 200 || res.status === 201) {
            // 对响应数据做些事
            //alert("提交成功")
            return Promise.resolve(res)
        }
        return res;
    },
    error => {
        if (error.response.status === 401 || error.response.status === 403) {
            //登录过期
            if (sessionStorage.getItem('isLoginOut') !== 'true') {
                //防止出现多次弹框
                sessionStorage.setItem('isLoginOut', 'true');//登出标记
                ElMessageBox.confirm('登录已过期，请重新登录！', '提示', {
                    confirmButtonText: '确定',
                    showClose: false,
                    showCancelButton: false,
                    closeOnClickModal: false,
                    type: 'warning'
                }).then(() => {
                    sessionStorage.clear();//清除缓存
                    $router.push({path: '/'}).then(r => console.log(r));//返回登录页
                })
            }
        }
        return Promise.reject(error)
    });

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        api({
            url: url,
            method: `get`,
            params: params
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export {api};