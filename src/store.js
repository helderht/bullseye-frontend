import vue from 'vue'
import vuex from 'vuex'
import jwtDecode from 'jwt-decode'
import moment from 'moment'
import io from 'socket.io-client'
import router from './router'
import {LINK_API} from './utilities/links'

vue.use(vuex)

export default new vuex.Store({
  state: {
    token: null,
    user: null,
    socket: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUser(state, user) {
      state.user = user
    },
    setSocket(state, socket) {
      state.socket = socket
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
    },
    connectSocket({commit}) {
      let socket = io(LINK_API)
      commit('setSocket', socket)
    }
  }
})
