import axios from 'axios';
import Vue from 'vue';
const http = axios.create({
    //baseURL: '/admin/test/',
    //baseURL: 'http://47.93.127.194:3005/admin/test',
    baseURL: 'http://localhost:3000/admin/test',
    timeou: 10000
});
http.interceptors.response.use(response => {
    return response.data;
}, err => {
    if (!err.response.data.message) {
        err.response.data.message = 'server err';
    }
    Vue.prototype.$message.error(err.response.data.message);
})
export default http;