import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import  './assets/scss/index.scss';
import  './components';
import VueRouter from "vue-router"

Vue.prototype.$eventBus = new Vue()
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')