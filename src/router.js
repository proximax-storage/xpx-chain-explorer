import Vue from 'vue'
import Router from 'vue-router'
import explorerRouter from './components/explorer/router_explorer'
import transactionsRouter from './components/transactions/router_transactions'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    explorerRouter,
    transactionsRouter
  ]
})
