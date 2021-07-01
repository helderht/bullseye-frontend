import vue from 'vue'
import vuex from 'vuex'
import jwtDecode from 'jwt-decode'
import moment from 'moment'
import axios from 'axios'
import router from './router'

vue.use(vuex)

export default new vuex.Store({
  state: {
    token: null,
    user: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    saveToken({commit}, token) {
      commit('setToken', token)
      commit('setUser', jwtDecode(token))
      localStorage.setItem('token', token)
    },
    signout({commit}) {
      commit('setToken', null)
      commit('setUser', null)
      localStorage.removeItem('token')
      router.push({name: 'signin'})
    },
    autoSignin({commit}) {
      let token = localStorage.getItem('token')
      if (token) {
        const {exp} = jwtDecode(token)
        if (exp <= moment().unix()) {
          localStorage.removeItem('token')
        } else {
          commit('setToken', token)
          commit('setUser', jwtDecode(token))
          router.push({name: 'board'})
        }
      }
    }
  }
})
