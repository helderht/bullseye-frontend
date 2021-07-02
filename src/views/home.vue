<template>
  <div class="container-fluid">
    <div class="jumbotron text-center mb-0">
      <img src="../assets/logoapp.svg" alt="logo" height="64px" />
      <h1 class="display3">Estimando costos en equipo</h1>
      <p class="lead">
        bullseye te ayuda a estimar los costos de tus projectos de software con diferentes metodos,
        para ti y tu equipo
      </p>
      <router-link class="btn btn-secondary mr-1" to="/signup">Registrate</router-link>
      <router-link class="btn btn-primary" to="/signin">Iniciar</router-link>
    </div>
    <div class="row">
      <div class="col-md-4 text-center">
        <img class="img-fluid w-25" src="../assets/fast.svg" alt="fast" />
        <h2>Rápido</h2>
        <p>
          Es rapido, gracias a su programación, bullseye reacciona a los cambios inmediatamente.
        </p>
      </div>
      <div class="col-md-4 text-center">
        <img class="img-fluid w-25" src="../assets/snap.svg" alt="fast" />
        <h2>Fácil</h2>
        <p>
          Enfocate en lo que es importante, evita los cálculos, bullseye proporciona un flujo de
          trabajo intuitivo.
          <router-link to="/help">Ver tutorial</router-link>
        </p>
      </div>
      <div class="col-md-4 text-center">
        <img class="img-fluid w-25" src="../assets/team.svg" alt="fast" />
        <h2>Equipo</h2>
        <p>
          Promueve el trabajo en equipo, porque dos cabezas piensan mejor que una.
        </p>
      </div>
    </div>
  </div>
</template>
