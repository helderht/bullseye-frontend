<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <div class="w-50 m-auto">
          <router-link to="/">
            <img
              class="img-fluid py-4"
              src="../assets/logoapp.svg"
              alt="logo"
            />
          </router-link>
        </div>
        <div class="card">
          <div class="card-body pt-3">
            <h5 class="text-center">Registro</h5>
            <form
              id="formSignup"
              class="needs-validation"
              @submit.prevent="signup"
              novalidate
            >
              <div class="mb-3">
                <label for="nameUser">Nombre</label>
                <input
                  id="nameUser"
                  class="form-control"
                  v-model="name"
                  type="text"
                  pattern="(?=.{3,15}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$"
                  required
                />
                <small class="invalid-feedback"
                  >Por ejemplo: Jose, David Luiz</small
                >
              </div>
              <div class="mb-3">
                <label for="emailUser">Email</label>
                <input
                  id="emailUser"
                  class="form-control"
                  v-model="email"
                  type="email"
                  pattern="[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+"
                  required
                />
                <small class="invalid-feedback">Email invalido</small>
              </div>
              <div class="mb-3">
                <label for="passUser">Contraseña</label>
                <input
                  id="passUser"
                  class="form-control"
                  v-model="password"
                  type="password"
                  required
                />
                <small class="invalid-feedback">Usa más de 8 caracteres</small>
              </div>
              <div
                class="spinner-border text-primary"
                v-if="loader"
                role="status"
              >
                <span class="sr-only">Loading...</span>
              </div>
              <button class="btn btn-block btn-primary" v-else>Enviar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {opt_toast} from '../utilities/options'
export default {
  name: 'signup',
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
            if (res.data.tag === 'inf')
              toastr.info(res.data.msg, null, opt_toast)
            else {
              toastr.success(res.data.msg, null, opt_toast)
              this.$router.push({name: 'signin'})
            }
            this.loader = false
          })
          .catch(e => console.log(e))
      } else {
        form.classList.add('was-validated')
      }
    }
  }
}
</script>
