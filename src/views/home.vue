<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4 mb-3">
        <div class="card mt-4">
          <div class="card-body">
            <h5 class="text-center">Registrate</h5>
            <form id="formSignup" class="needs-validations" @submit.prevent="signup" novalidate>
              <div class="mb-3">
                <label for="usrname">Nombre</label>
                <input
                  id="usrname"
                  class="form-control"
                  v-model="name"
                  type="text"
                  pattern="(?=.{3,15}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$"
                  required
                />
                <small class="invalid-feedback">Por ejemplo: Jose, David Luiz</small>
              </div>
              <div class="mb-3">
                <label for="usremail">Email</label>
                <input
                  id="usremail"
                  class="form-control"
                  v-model="email"
                  type="email"
                  pattern="[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+"
                  required
                />
                <small class="invalid-feedback">Email invalido</small>
              </div>
              <div class="mb-3">
                <label for="usrpassword">Contraseña</label>
                <input
                  id="usrpassword"
                  class="form-control"
                  v-model="password"
                  type="password"
                  required
                />
                <small class="invalid-feedback">Usa más de 8 caracteres</small>
              </div>
              <load v-if="loader" />
              <button class="btn btn-outline-secondary mr-1" v-else>Registrar</button>
              <router-link class="btn btn-primary" to="/signin">Iniciar</router-link>
            </form>
          </div>
        </div>
      </div>
      <div class="col mb-3">
        <div class="jumbotron">
          <div class="d-flex justify-content-center mb-4">
            <img src="../assets/logo-app.svg" alt="logo-app" height="64px" />
          </div>
          <h1 class="display3">Estimando costos en equipo</h1>
          <p class="lead">
            bullseye te ayuda a estimar los costos de tus projectos de software con diferentes
            metodos, para ti y tu equipo
          </p>
        </div>
        <div class="row">
          <div class="col-md-4 text-center">
            <h2>Rápido</h2>
            <img class="img-fluid w-25" src="../assets/fast.svg" alt="fast" />
            <p>
              Es rapido, gracias a su programación, bullseye reacciona a los cambios inmediatamente.
            </p>
          </div>
          <div class="col-md-4 text-center">
            <h2>Fácil</h2>
            <img class="img-fluid w-25" src="../assets/snap.svg" alt="fast" />
            <p>
              Enfocate en lo que es importante, evita los cálculos, bullseye proporciona un flujo de
              trabajo intuitivo.
              <router-link to="/help">Ver tutorial</router-link>
            </p>
          </div>
          <div class="col-md-4 text-center">
            <h2>Equipo</h2>
            <img class="img-fluid w-25" src="../assets/team.svg" alt="fast" />
            <p>
              Promueve el trabajo en equipo, porque dos cabezas piensan mejor que una.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import load from '../components/load.vue'
import {msg_error, opt_toast} from '../utilities/options'
export default {
  name: 'signup',
  components: {load},
  data() {
    return {
      name: '',
      email: '',
      password: '',
      loader: false
    }
  },
  methods: {
    signup: function() {
      const form = document.querySelector('#formSignup')
      if (form.checkValidity()) {
        this.loader = true
        axios
          .post('signup', {
            name: this.name,
            email: this.email,
            password: this.password
          })
          .then(res => {
            if (res.data.tag === 'inf') toastr.info(res.data.msg, null, opt_toast)
            else {
              toastr.success(res.data.msg, null, opt_toast)
              this.$router.push({name: 'signin'})
            }
            this.loader = false
          })
          .catch(e => {
            if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
          })
      } else {
        form.classList.add('was-validated')
      }
    }
  }
}
</script>
