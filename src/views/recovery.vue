<template>
  <div class="container-fluid p-4">
    <div class="row justify-content-center">
      <div class="col-sm-4">
        <div class="d-flex justify-content-center py-4">
          <router-link to="/">
            <img class="m-auto" src="../assets/logo-app.svg" alt="logo" height="64px" />
          </router-link>
        </div>
        <div class="card">
          <div class="card-body">
            <h6 class="text-center mt-3">¿Has olvidado tu contraseña?.</h6>
            <p class="text-center text-muted">
              No te preocupes, enviaremos un código de recuperación a tu email para establecer una
              nueva. El código de recuperación es valido por 5 min.
            </p>
            <form
              id="formEmail"
              class="needs-validation"
              @submit.prevent="requestCode"
              v-if="emailOK"
              novalidate
            >
              <div class="mb-3">
                <label for="emailrecovery">Email</label>
                <input
                  id="emailrecovery"
                  class="form-control"
                  v-model="email_recovery"
                  type="email"
                  pattern="[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+"
                  required
                />
                <small class="invalid-feedback">Email invalido</small>
              </div>
              <button class="btn btn-primary btn-block">Enviar</button>
            </form>
            <div class="d-flex justify-content-center" v-else>
              <i class="fas fa-check text-success"></i>
            </div>
            <form
              id="formPass"
              class="needs-validation"
              @submit.prevent="recoveryPass"
              v-if="!emailOK"
              novalidate
            >
              <div class="mb-3">
                <label for="coderecovery">Código</label>
                <input
                  id="coderecovery"
                  class="text-center form-control"
                  v-model="code_recovery"
                  type="text"
                  pattern="^[0-9]{4,5}$"
                  required
                />
                <small class="invalid-feedback">Código invalido</small>
              </div>
              <div class="mb-3">
                <label for="passrecovery">Nueva Contraseña</label>
                <input
                  id="passrecovery"
                  class="text-center form-control"
                  v-model="password_recovery"
                  type="password"
                  required
                />
                <small class="invalid-feedback">Contraseña invalida</small>
              </div>
              <button class="btn btn-primary btn-block">Recuperar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {msg_error, opt_toast} from '../utilities/options'
export default {
  name: 'recovery',
  data() {
    return {
      email_recovery: '',
      code_recovery: '',
      password_recovery: '',
      timethen: null,
      emailOK: true
    }
  },
  methods: {
    requestCode: function() {
      const form = document.querySelector('#formEmail')
      if (form.checkValidity()) {
        axios
          .post('code', {email: this.email_recovery})
          .then(res => {
            this.timethen = res.data.timethen
            fetch('https://formsubmit.co/ajax/' + res.data.email, {
              method: 'POST',
              body: JSON.stringify({message: 'Sucódigo de recuperación es', code: res.data.code}),
              headers: {'Content-Type': 'application/json'}
            })
              .then(res => res.json())
              .then(data => {
                if (data.success === 'true') this.emailOK = false
                else {
                  toastr.info(
                    'Su correo no tiene activado los formularios. Actívelo en el enlace que le enviamos y recibira el codigo',
                    null,
                    opt_toast
                  )
                  this.emailOK = false
                }
              })
              .catch(e => {
                toastr.error('Algo ha ocurrido intentalo de nuevo', null, opt_toast)
              })
          })
          .catch(e => {
            if (e.response.status === 404) toastr.error('Email no registrado', null, opt_toast)
            else toastr.error(msg_error, null, opt_toast)
          })
        this.email_recovery = ''
        form.classList.remove('was-validated')
      } else {
        form.classList.add('was-validated')
      }
    },
    recoveryPass: function() {
      const form = document.querySelector('#formPass')
      if (form.checkValidity()) {
        axios
          .post('restore', {
            code: this.code_recovery,
            password: this.password_recovery,
            timethen: this.timethen
          })
          .then(res => {
            if (res.data.tag === 'suc') {
              toastr.success(res.data.msg, null, opt_toast)
              this.$router.push({name: 'signin'})
            } else {
              toastr.info(res.data.msg, null, opt_toast)
            }
          })
          .catch(e => {
            if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
          })
        this.code_recovery = ''
        this.password_recovery = ''
        form.classList.remove('was-validated')
      } else {
        form.classList.add('was-validated')
      }
    }
  }
}
</script>
