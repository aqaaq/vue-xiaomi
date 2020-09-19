import axios from 'axios';
import Vue from 'vue';
import router from '../router/index';
import store from '../store/index';
const http = axios.create({
    baseURL: 'http://localhost:3000/admin/',
    //baseURL:'/admin',
    timeout: 5000,
});
http.interceptors.request.use((config) => {
    // console.log(store.state.token)
    var token = store.state.token || localStorage.getItem('token') || ''
    if (token) {
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
}, (err) => {
    return Promise.reject(err)
})
http.interceptors.response.use(function (res) {
    console.log(res)
    res.data.status = res.status;
    return res.data
}, function (err) {
    //console.log(err.response.status)
    //后端是否发送错误消息
   
    if(!err.response){return console.log(err)}
    var message = err.response.data.message
    message = message ?
        message : 'server err'
    Vue.prototype.$message.error(
        message
    )
    //当服务器返回401 时页面跳转到登录页
    if (err.response.status === 401) {
        return router.push('/login');
    }
})
export default http;