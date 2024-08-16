import axios from "axios"
import get from "lodash/get"

// 接口Endpoint
let baseURL = location.hostname === 'localhost' ? '/prod-api' : process.env.VUE_APP_API_ENDPOINT

baseURL = 'http://wxapp.51yunmai.com:8099/prod-api'

let ajax = axios.create({
    baseURL,
})

/**
 * 设置请求Token
 * @param {String} token 请求Token
 */
let setToken = (token) => {
    console.log(`Set Token: >>${token}<<`)
    localStorage.setItem('token', token)
}

/**
 * 请求拦截器
 */
ajax.interceptors.request.use(
    (config) => {
        let token = localStorage.getItem("token")
        // ASP.NET接口
        // - 品易智联小程序授权验证请求头用的是auth字段
        // config.headers.auth = token;
        config.headers.Authorization = `Bearer ` + token
        return config
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error)
    }
)

/**
 * 响应拦截器
 */
ajax.interceptors.response.use(
    (response) => {
        if (!window.__MICRO_APP_ENVIRONMENT__) {
            return response.data
        }

        let code = get(response, "data.code", 200)

        if (code === 401) {
            localStorage.removeItem("token")
            debugger
            window.microApp.setGlobalData({ type: "authFailed", data: response })
            return
        }

        return (response && response.data) || {}
    },
    function (error) {
        // Do something with response error
        return Promise.reject(error)
    }
)

export { ajax, setToken }

