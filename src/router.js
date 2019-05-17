import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

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
      component: Home
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
