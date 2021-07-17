<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-sm-6 col-lg-4">
        <div class="w-50 m-auto">
          <router-link to="/">
            <img class="img-fluid py-4" src="../assets/logo-app.svg" alt="logo-app" />
          </router-link>
        </div>
        <div class="card">
          <div class="card-body">
            <h5 class="text-center">Bienvenido</h5>
            <div class="w-25 m-auto py-4">
              <img class="img-fluid" src="../assets/user.svg" alt="user" />
            </div>
            <form id="formSignin" class="needs-validation" @submit.prevent="signin" novalidate>
              <div class="mb-3">
                <label for="emailUsr">Email</label>
                <input
                  id="emailUsr"
                  class="form-control"
                  v-model="email"
                  type="email"
                  pattern="[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+"
                  required
                />
                <small class="invalid-feedback">Email invalido</small>
              </div>
              <div class="mb-3">
                <label for="passUsr">Contraseña</label>
                <input
                  id="passUsr"
                  class="form-control"
                  v-model="password"
                  type="password"
                  required
                />
                <small class="invalid-feedback">Campo requerido</small>
              </div>
              <load v-if="loader" />
              <button class="btn btn-primary btn-block">Iniciar</button>
            </form>
            <router-link to="/recovery"><small>Recuperar contraseña</small></router-link>
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
  name: 'signin',
  components: {load},
  data() {
    return {
      email: '',
      password: '',
      loader: false
    }
  },
  methods: {
    signin: function() {
      const form = document.querySelector('#formSignin')
      if (form.checkValidity()) {
        this.loader = true
        axios
          .post('signin', {
            email: this.email,
            password: this.password
          })
          .then(res => {
            this.$store.dispatch('saveToken', res.data)
            this.$router.push({name: 'board'})
          })
          .catch(e => {
            if (e.response.status === 403) {
              toastr.error('Datos incorrectos', null, opt_toast)
            } else {
              toastr.error(msg_error, null, opt_toast)
            }
          })
        this.loader = false
      } else {
        form.classList.add('was-validated')
      }
    }
  }
}
</script>
