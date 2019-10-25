import Vue from 'vue'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/build/css/mdb.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import { Persistence } from '@/services/persistence.js'
import proximaxProvider from '@/services/proximaxProviders.js'
import Utils from '@/services/Utils.js'
import axios from 'axios'
import { Config } from '@/services/configService.js'

let currentNode = localStorage.getItem('currentNode')

Vue.prototype.$storage = new Persistence(localStorage)
Vue.prototype.$sessionStorage = new Persistence(sessionStorage)
Vue.prototype.$utils = Utils
Vue.config.productionTip = false

const configIntegration = async (currentNodeExist = false) => {
  try {
    let configInfo = await axios.get('../config/config.json')
    Vue.prototype.$config = new Config(configInfo.data)
    if (currentNodeExist === false) {
      localStorage.setItem('currentNode', configInfo.data.Nodes[0])
      Vue.prototype.$proxProvider = new proximaxProvider(configInfo.data.Nodes[0])
    } else {
      Vue.prototype.$proxProvider = new proximaxProvider(currentNode)
    }
  } catch (e) {
    console.error(e);
  }

  new Vue({
    router,
    store,
    render: function (h) { return h(App) }
  }).$mount('#app')
}

if (currentNode === null) {
  console.log('No Current Node')
  configIntegration(false)
} else {
  console.log('Current Node is', currentNode)
  configIntegration(true)
}