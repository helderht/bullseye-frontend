<template>
  <div>
    <div class="nav align-items-center sticky-top bg-dark">
      <a class="ml-2" href="/">
        <img src="../assets/logo-icon.svg" alt="logo" width="32px" height="32px" />
      </a>
      <router-link class="nav-link text-primary" to="/docs/app">Aplicación</router-link>
      <router-link class="nav-link text-primary" to="/docs/fp">P. Función</router-link>
      <router-link class="nav-link text-primary" to="/docs/sp">P. Historia</router-link>
      <router-link class="nav-link text-primary" to="/docs/ucp">P. Casos de uso</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
