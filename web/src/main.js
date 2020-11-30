import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
//阿里图标文件
import './style/common.scss';
import './assets/iconfont/iconfont';
import './assets/iconfont/iconfont.css'

//element ui 组件
import 'element-ui/lib/theme-chalk/index.css';
import { InputNumber, Message, Pagination, Select, Option} from 'element-ui';
Vue.prototype.$message = Message;
Vue.component('el-input-number', InputNumber);
Vue.component('el-pagination', Pagination);
Vue.component('el-select', Select);
Vue.component('el-option', Option);
//图片懒加载
import VueLazyload from 'vue-lazyload';
var userAgent = window.navigator.userAgent;
if(userAgent.indexOf('NET') != -1) {
  //ie浏览器不兼容懒加载组件处理
  Vue.directive('lazy', function(el, binding) {
      el.src = binding.value
  })
} else {    
  //实现图片懒加载
  Vue.use(VueLazyload, { preLoad: 1.3 })
}

// axios 实例
import http from './plugin/axios';
Vue.prototype.$http = http;
// import style
document.title = '小米';
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
