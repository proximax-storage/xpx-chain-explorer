import Vue from 'vue'
import Router from 'vue-router'
import SearchFilter from './components/searchFilter/SearchFilter'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'searchFilter',
      component: SearchFilter
    }
  ]
})
