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
      path: '/result/:type/:id',
      name: 'searchResult',
      component: load('SearchResult')
    },
    {
      path: '/list/:category',
      name: 'list',
      component: load('List')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

// component: function () {
//   return import(/* webpackChunkName: "about" */ './views/About.vue')
// }
