import Vue from 'vue'
import createGoods from './createGoods.vue'
import axios from 'axios'

Vue.prototype.$axios = axios.create({
  baseURL: 'http://localhost:8888/'
})
Vue.config.productionTip = false

new Vue({
  render: h => h(createGoods),
}).$mount('#createGoods')
