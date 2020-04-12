import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const view = view => () => import(`@/views/${view}.vue`)
const child = (folder, comp) => () => import(`@/components/${folder}/${comp}.vue`)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: view('Home'),
    children: [
      {
        path: '',
        component: child('global', 'BlocksList')
      },
      {
        path: 'publicKey/:publicKey',
        component: child('Blockchain', 'PublicKey')
      },
      {
        path: 'block/:block',
        component: child('Blockchain', 'Block')
      },
      {
        path: 'hash/:hash',
        component: child('Blockchain', 'Hash')
      }
    ]
  },
  {
    path: '/nodes',
    name: 'Nodes',
    component: view('Nodes')
  },
  {
    path: '/history',
    name: 'History',
    component: view('History')
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
