import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import NewForm from './components/NewForm/index.js';

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(NewForm);
new Vue({
  render: h => h(App),
}).$mount('#app')