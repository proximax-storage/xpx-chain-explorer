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
import nodesConfig from '@/../public/config/nodes.json'

let currentNode = localStorage.getItem('currentNode')

if (currentNode === null) {
  currentNode = nodesConfig.nodes[0]
}

Vue.prototype.$storage = new Persistence()
Vue.prototype.$utils = Utils
Vue.prototype.$proxProvider = new proximaxProvider(currentNode)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
