<template>
  <div>
    <!-- nav bar -->
    <div class="nav justify-content-between align-items-center bg-nav">
      <div class="d-flex">
        <button class="btn-nav d-inline d-sm-none" data-toggle="offcanvas">
          <i class="fas fa-bars"></i>
        </button>
        <img
          class="ml-2 d-none d-sm-inline"
          src="../assets/logo-icon.svg"
          alt="logo-icon"
          width="32px"
        />
        <router-link class="link d-none d-sm-inline" to="/board">
          <i class="fas fa-chart-area"></i> Tablero
        </router-link>
        <router-link class="link d-none d-sm-inline" to="/projects">
          <i class="fas fa-folder-open"></i> Proyectos
        </router-link>
        <router-link class="link d-none d-sm-inline" to="/collaborations">
          <i class="fas fa-share-alt"></i> Colaboraciones
        </router-link>
        <router-link class="link d-none d-sm-inline" to="help">
          <i class="fas fa-life-ring"></i> Ayuda
        </router-link>
      </div>
      <div class="d-flex">
        <div class="dropdown">
          <button class="btn-nav" data-toggle="dropdown" title="Notificaciones">
            <i class="fas fa-bell"></i>
            <span class="badge badge-ligth" v-if="all_notifications.length > 0">{{
              all_notifications.length
            }}</span>
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <h6 class="dropdown-header">Notificationes</h6>
            <div class="responsive-n">
              <a
                class="dropdown-item"
                v-for="notification in all_notifications"
                :key="notification._id"
                href="#"
              >
                <span class="d-block">{{ notification.message }}</span>
                <small class="d-block text-right">{{
                  notification.notifiedIn | formatDate()
                }}</small>
              </a>
            </div>
          </div>
        </div>
        <div class="dropdown">
          <button class="btn-nav" data-toggle="dropdown" title="Usuario">
            <i class="fas fa-user"></i>
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <h6 class="dropdown-header">Usuario</h6>
            <router-link class="dropdown-item" to="/profile">
              <i class="fas fa-cog text-muted"></i> Perfil
            </router-link>
            <a class="dropdown-item" @click="signout" href="#"
              ><i class="fas fa-sign-out-alt text-muted"></i> Salir</a
            >
          </div>
        </div>
      </div>
    </div>
    <!-- offcanvas -->
    <div class="offcanvas-collapse">
      <div class="d-flex justify-content-end">
        <button class="close" data-toggle="offcanvas">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="d-flex justify-content-center">
        <img
          class="rounded-circle"
          :src="`${link_api}assets/avatars/${$store.state.user.img}`"
          alt="img-user"
          height="64px"
        />
      </div>
      <ul class="list-group list-group-flush text-center">
        <router-link class="list-group-item" to="/board">
          <i class="fas fa-chart-area"></i> Tablero
        </router-link>
        <router-link class="list-group-item" to="/projects">
          <i class="fas fa-folder-open"></i> Proyectos
        </router-link>
        <router-link class="list-group-item" to="/collaborations">
          <i class="fas fa-share-alt"></i> Colaboraciones
        </router-link>
        <router-link class="list-group-item" to="/help">
          <i class="fas fa-life-ring"></i> Ayuda
        </router-link>
      </ul>
    </div>
    <!-- router view -->
    <router-view />
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import {LINK_API} from '../utilities/links'
import {msg_error, opt_toast} from '../utilities/options'
export default {
  name: 'main_frame',
  data() {
    return {
      link_api: LINK_API,
      tkn_api: {headers: {token: this.$store.state.token}},
      all_notifications: []
    }
  },
  filters: {
    formatDate: function(date) {
      moment.locale('es')
      return moment(date)
        .startOf('minutes')
        .fromNow()
    }
  },
  created() {
    this.$store.dispatch('connectSocket')
    this.joinProAndCol()
    this.onEventsIO()
    this.getNotifications()
  },
  methods: {
    joinProAndCol: async function() {
      let pro = [],
        col = []

      await axios
        .get('proall', this.tkn_api)
        .then(res => {
          pro = res.data.map(elm => elm._id)
        })
        .catch(e => {
          if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
        })
      await axios
        .get('colall', this.tkn_api)
        .then(res => {
          col = res.data.map(elm => elm.id_project._id)
        })
        .catch(e => {
          if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
        })
      let rooms = [...pro, ...col]
      // join to rooms
      this.$store.state.socket.emit('join-rooms', {client: this.$store.state.user, rooms: rooms})
    },
    onEventsIO: function() {
      /* this.$store.state.socket.on('joined-rooms', data => {
        console.log(data)
      }) */
      this.$store.state.socket.on('update-notifications', data => {
        this.getNotifications()
        console.log(data)
      })
    },
    getNotifications: function() {
      axios
        .get('notall', this.tkn_api)
        .then(res => {
          this.all_notifications = res.data
        })
        .catch(e => {
          if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
        })
    },
    signout: function() {
      this.$store.dispatch('signout')
      this.$store.state.socket.disconnect()
    }
  }
}
</script>
