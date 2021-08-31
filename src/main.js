import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// 引入初始化
import './assets/css/base.css'
import './assets/css/ionfont.css'
import i18n from './lang';

//引入api  绑定到实列中
import api from './api'
Vue.prototype.$api = api;

Vue.config.productionTip = false

//刷新获取本地的存储
// let userinfo = localStorage.getItem('userinfo')
// if(userinfo){
//   let obj = JSON.parse(userinfo);
//   store.commit('loginModule/setUser',obj);
// }



new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
