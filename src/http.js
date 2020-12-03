import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
    baseURL: 'http://localhost:5500/api/web'
})


http.interceptors.response.use(res => {//捕获错误信息
    return res
}, err => {
    Vue.prototype.$message({
        type:'error',
        message: err.response.data.message
    })
    if(err.response.status === 401){
        router.push('/login')
    }
    return Promise.reject(err);
})

export default http