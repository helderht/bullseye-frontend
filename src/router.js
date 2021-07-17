import vue from 'vue'
import vueRouter from 'vue-router'
import store from './store'

import warning from './views/warning'
import home from './views/home'
import signin from './views/signin'
import main_frame from './views/main_frame'
import board from './views/board'
import projects from './views/projects'
import collaborations from './views/collaborations'
import estimates from './views/estimates'
import contributions from './views/contributions'
import fp from './views/fp'
import sp from './views/sp'
import ucp from './views/ucp'
import history from './views/history'
import profile from './views/profile'
import recovery from './views/recovery'

vue.use(vueRouter)

const router = new vueRouter({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'warning',
      component: warning,
      meta: {open_access: true}
    },
    {
      path: '/',
      name: 'home',
      component: home,
      meta: {open_access: true}
    },
    {
      path: '/signin',
      name: 'signin',
      component: signin,
      meta: {open_access: true}
    },
    {
      path: '/recovery',
      name: 'recovery',
      component: recovery,
      meta: {open_access: true}
    },
    {
      path: '/board',
      component: main_frame,
      meta: {close_access: true},
      children: [
        {
          path: '',
          name: 'board',
          component: board
        },
        {
          path: '/projects',
          name: 'projects',
          component: projects
        },
        {
          path: '/collaborations',
          name: 'callaborations',
          component: collaborations
        },
        {
          path: '/:idp/estimates',
          name: 'estimates',
          component: estimates
        },
        {
          path: '/:idc/:idp/contributions',
          name: 'contributions',
          component: contributions
        },
        {
          path: '/:ide/:ids/shot',
          name: 'fp',
          component: fp
        },
        {
          path: '/:ide/:ids/shot',
          name: 'sp',
          component: sp
        },
        {
          path: '/:ide/:ids/shot',
          name: 'ucp',
          component: ucp
        },
        {
          path: '/:idp/history',
          name: 'history',
          component: history
        },
        {
          path: '/profile',
          name: 'profile',
          component: profile
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.open_access)) {
    next()
  } else if (store.state.user) {
    if (to.matched.some(record => record.meta.close_access)) {
      next()
    }
  } else {
    next({name: 'signin'})
  }
})

export default router
