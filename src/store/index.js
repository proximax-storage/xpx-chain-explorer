import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentBlock: null
  },
  mutations: {
    UPDATE_CURREN_BLOCK (state, data) {
      state.currentBlock = data
    }
  },
  actions: {
    updateCurrentBlock ({ commit }, data) {
      commit('UPDATE_CURREN_BLOCK', data)
    }
  },
  getters: {
    getCurrentBlock: state => state.currentBlock
  },
  modules: {
  }
})
