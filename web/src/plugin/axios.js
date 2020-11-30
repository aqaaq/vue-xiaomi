import axios from 'axios';
import Vue from 'vue';

// loading
import { showLoading, closeLoading } from './loading.js';

const http = axios.create({
    baseURL: '/admin/web',
    //baseURL: 'http://47.93.127.194:3005/admin/web',
    // baseURL: 'http://localhost:3000/admin/web',
    timeou: 10000
});


http.interceptors.request.use(config => {
    if (!config.headers.noLoading) {
        showLoading();
    }
    return config
})



http.interceptors.response.use(response => {
    closeLoading()
    return response.data;
}, err => {
    closeLoading()
    if (!err.response.data.message) {
        err.response.data.message = 'server err';
    }
    Vue.prototype.$message.error(err.response.data.message);
})
export default http;