import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL || '/api/web'
    // baseURL: 'http://localhost:5300/api/web'
})

http.interceptors.request.use(config => {
    if (sessionStorage.token) {
        config.headers.Authoriztion = 'Bearer ' + (sessionStorage.token || ' ')
    }
    return config
}, err => Promise.reject(err))

http.interceptors.response.use(res => {//捕获错误信息
    return res
}, err => {
    Vue.prototype.$message({
        type: 'error',
        message: err.response.data.message
    })
    if (err.response.status === 401) {
        this.$confirm("你不是登录状态，是否转到登录页面?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            center: true
        })
            .then(() => {
                router.push('/login')
            })
            .catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消操作"
                });
            });
    }
    return Promise.reject(err);
})

export default http