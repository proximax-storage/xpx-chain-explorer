import Vue from 'vue'
import Router from 'vue-router'
import Blocks from '@/components/explorer/views/Blocks.vue'
import explorerRouter from './components/explorer/router_explorer'
import transactionsRouter from './components/transactions/router_transactions'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Blocks,
      name: 'Blocks'
    },
    explorerRouter,
    transactionsRouter
  ]
})
