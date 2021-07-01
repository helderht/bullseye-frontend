import axios from 'axios'
import vue from 'vue'
import app from './app.vue'
import router from './router'
import store from './store'
import {LINK_API} from './utilities/links'

axios.defaults.baseURL = LINK_API

new vue({
  router,
  store,
  render: function(h) {
    return h(app)
  }
}).$mount('#app')
