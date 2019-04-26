// import dashboard from '@/Dashboard.vue'
const explorerRouter = {
  path: '/explorer',
  component: () => import('./Explorer.vue'),
  redirect: 'noredirect',
  name: 'Explorer',
  children: [
    {
      path: '/block-info/:block',
      component: () => import('./views/BlockInfo.vue'),
      name: 'BlockInfo',
      meta: { title: 'Block Info', noCache: true }
    },
    {
      path: '/account-info/:address',
      component: () => import('./views/Account.vue'),
      name: 'Account',
      meta: { title: 'Account Info', noCache: true }
    }
  ]
}

export default explorerRouter
