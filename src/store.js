import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentBlock: { height: 'Loading' }
  },
  mutations: {
    UPDATE_CURRENT_BLOCK: (state, data) => {
      state.currentBlock = data
    }
  },
  actions: {
    changeCurrentBlock ({ commit }, data) {
      commit('UPDATE_CURRENT_BLOCK', data)
    }
  },
  getters: {
    getCurrentBlock: state => {
      return state.currentBlock.height
    }
  }
})
