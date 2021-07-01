<template>
  <div id="wrapper">
    <div id="sidebar">
      <div class="text-center m-4">
        <img src="../assets/logoapp.svg" alt="logoapp" height="32px" />
      </div>
      <div class="d-flex justify-content-center align-items-center m-4">
        <img
          class="rounded-circle"
          :src="`${link_api}assets/avatars/${$store.state.user.img}`"
          alt="cover"
          width="64px"
        />
      </div>
      <div class="sidebar-nav">
        <router-link
          class="d-flex justify-content-between align-items-center"
          to="/board"
        >
          <span>Tablero</span>
          <i class="fas fa-chart-line mr-2"></i>
        </router-link>
        <router-link
          class="d-flex justify-content-between align-items-center"
          to="/projects"
        >
          <span>Proyectos</span>
          <i class="fas fa-folder-open mr-2"></i>
        </router-link>
        <router-link
          class="d-flex justify-content-between align-items-center"
          to="/board"
        >
          <span>Colaboraciones</span>
          <i class="fas fa-project-diagram mr-2"></i>
        </router-link>
        <router-link
          class="d-flex justify-content-between align-items-center"
          to="/board"
        >
          <span>Ayuda</span>
          <i class="fas fa-life-ring mr-2"></i>
        </router-link>
      </div>
    </div>
    <!-- main -->
    <div id="page-body">
      <nav class="nav topbar justify-content-between align-items-center">
        <button class="btn-icon btn-bar" @click="menu">
          <i class="fas fa-bars"></i>
        </button>
        <div class="d-flex">
          <div class="dropdown">
            <button
              class="btn-icon btn-bar"
              data-toggle="dropdown"
              title="Notificaciones"
            >
              <i class="fas fa-bell"></i>
              <span class="badge badge-danger">2</span>
            </button>
            <div class="dropdown-menu dropdown-menu-right">
              <h6 class="dropdown-header">Notificaciones</h6>
              <div class="responsive-v">
                <a class="dropdown-item" href="#">
                  <span class="d-block">Mensage</span>
                  <span class="d-block text-right">
                    <small class="text-muted">fecha</small>
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div class="dropdown">
            <button
              class="btn-icon btn-bar"
              data-toggle="dropdown"
              title="Usuario"
            >
              <i class="fas fa-user"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-right">
              <h6 class="dropdown-header">Cuenta</h6>
              <router-link class="dropdown-item" to="#">Perfil</router-link>
              <a class="dropdown-item" href="#" @click="signout">Salir</a>
            </div>
          </div>
        </div>
      </nav>
      <!-- main -->
      <router-view />
    </div>
  </div>
</template>

<script>
import {LINK_API} from '../utilities/links'
export default {
  name: 'main_frame',
  data() {
    return {
      link_api: LINK_API
    }
  },
  created() {},
  methods: {
    menu: () => {
      $('#wrapper').toggleClass('toggled')
    },
    signout: function() {
      this.$store.dispatch('signout')
    }
  }
}
</script>
