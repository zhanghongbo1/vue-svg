import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'lib-flexible/flexible'
import './icons'
import Vant from 'vant';
import 'vant/lib/index.css';
import '@/assets/reset.css'
Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
