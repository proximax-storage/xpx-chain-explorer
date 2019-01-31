import Vue from 'vue'
import Vuex from 'vuex'
import requestService from './services'

Vue.use(Vuex)

const state = {
  requestService
}

export default new Vuex.Store({
  state
})
