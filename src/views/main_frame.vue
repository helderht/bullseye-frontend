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
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <h6 class="dropdown-header">Notificationes</h6>
            <a class="dropdown-item" href="#">item</a>
          </div>
        </div>
        <div class="dropdown">
          <button class="btn-nav" data-toggle="dropdown" title="Usuario">
            <i class="fas fa-user"></i>
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <h6 class="dropdown-header">Usuario</h6>
            <a class="dropdown-item" href="#"><i class="fas fa-cog text-muted"></i> Perfil</a>
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
