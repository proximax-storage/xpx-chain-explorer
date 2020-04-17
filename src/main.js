import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import ProximaxProvider from './services/proximaxProvider'
import axios from 'axios'
import utils from './services/utils'
import routerMixin from './mixins/router-mixin'
import NodesManagement from './services/NodesManagement'

Vue.config.productionTip = false
Vue.prototype.$utils = utils
Vue.mixin(routerMixin)

const RunApp = async () => {
  if (localStorage.getItem('history') === null) {
    localStorage.setItem('history', JSON.stringify([]))
  }

  const config = await axios.get(`${window.location.origin}/config/config.json`)

  const nodeman = new NodesManagement(config.data.nodes)
  nodeman.validateNodes()
  const node = nodeman.formatted.http
  Vue.prototype.$nodeman = nodeman
  Vue.prototype.$config = config.data

  try {
    const info = (await axios.get(`${node}/node/info`)).data
    console.log(info)
    info.currentNode = node
    Vue.prototype.$nodeInfo = info
    Vue.prototype.$provider = new ProximaxProvider(node)
  } catch (error) {
    console.log('Not node info')
  }

  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
}

RunApp()
