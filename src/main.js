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

Vue.config.productionTip = false
Vue.prototype.$utils = utils
Vue.mixin(routerMixin)

const RunApp = async () => {
  const config = await axios.get(`${window.location.origin}/config/config.json`)

  const node = `http://${config.data.nodes[0]}:3000`

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
