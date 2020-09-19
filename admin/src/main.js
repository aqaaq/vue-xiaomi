import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index';
Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './style/common.css';
Vue.use(ElementUI);
import http from './plugin/axios.js';
Vue.prototype.$http = http;
// Vue.prototype.$store = store,

//混入 图片上传头
  Vue.mixin({
    data() {
      return {
        //backend: '/admin/upload',                     //生产环境
         backend:'http://localhost:3000/admin/upload',  //开发环境
      }

    }
  })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
