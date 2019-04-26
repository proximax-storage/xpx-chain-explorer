// import dashboard from '@/Dashboard.vue'
const transactionsRouter = {
  path: '/transactions',
  component: () => import('./Transactions.vue'),
  redirect: 'noredirect',
  name: 'Transactions',
  children: [
    {
      path: 'hast/:hast',
      component: () => import('./views/TransactionHast.vue'),
      name: 'Transaction Hast',
      meta: { title: 'Transaction Hast', noCache: true }
    }
  ]
}

export default transactionsRouter
