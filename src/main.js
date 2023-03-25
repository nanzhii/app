import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import { Upload,Dialog,Button } from 'element-ui';

Vue.prototype.$axios = axios.create({
  baseURL: 'http://localhost:8888/'
})
Vue.config.productionTip = false
// 按需引入
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(Button)



new Vue({
  render: h => h(App),
}).$mount('#app')
