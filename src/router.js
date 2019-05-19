import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const load = view => {
  return () => import(`@/views/${view}.vue`)
}

// const loadChildren = view => {
//   return () => import(`@/views//${view}.vue`)
// }

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: load('Home')
    },
    {
      path: '/networkStats',
      name: 'networkStats',
      component: load('NetworkStats')
    },
    {
      path: '/map',
      name: 'map',
      component: load('Map')
    },
    {
      path: '/searchResult',
      name: 'searchResult',
      component: load('SearchResult')
    }
  ]
})

// component: function () {
//   return import(/* webpackChunkName: "about" */ './views/About.vue')
// }
