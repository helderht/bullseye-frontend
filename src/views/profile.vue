<template>
  <div>
    <!-- tool bar -->
    <div class="d-flex justify-content-between align-items-center sticky-top bg-nav p-1">
      <p class="address">Perfil</p>
      <div class="btn-group">
        <button class="btn btn-outline-light btn-sm" data-toggle="modal" data-target="#cover">
          <i class="fas fa-camera"></i>
        </button>
      </div>
    </div>
    <!-- content -->
    <div class="container-fluid pt-4">
      <div class="row">
        <div class="col-md-4 mb-3">
          <div class="card">
            <img
              :src="`${link_api}assets/avatars/${$store.state.user.img}`"
              class="img-fluid m-4"
              alt=""
            />
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-header">
              <h6 class="card-menu-title">Información</h6>
            </div>
            <div class="card-body">
              <form
                id="formUpdateAccount"
                class="needs-validation"
                @submit.prevent="updateAccount"
                novalidate
              >
                <div class="mb-3">
                  <label for="accname">Nombre</label>
                  <input
                    id="accname"
                    class="form-control"
                    v-model="me.name"
                    type="text"
                    pattern="(?=.{3,15}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="accemail">Email</label>
                  <input
                    id="accemail"
                    class="form-control"
                    v-model="me.email"
                    type="email"
                    pattern="[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+"
                  />
                </div>
                <div class="mb-3">
                  <label for="accpass">Contraseña</label
                  ><input
                    id="accpass"
                    class="form-control"
                    v-model="editpassword"
                    type="password"
                  />
                </div>
                <button class="btn btn-primary btn-block">Aceptar</button>
              </form>
              <button
                class="btn btn-outline-danger btn-block mt-3"
                data-toggle="modal"
                data-target="#closeAccount"
              >
                Cerrar cuenta
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-header">
              <h6 class="card-menu-title">Actividad</h6>
            </div>
            <div class="card-body">
              <div class="list-group">
                <div class="d-flex justify-content-between align-items-center px-4 py-2">
                  <span class="badge badge-dark">{{ all_projects.length }}</span>
                  <span>Projectos</span>
                  <i class="fas fa-folder text-dark"></i>
                </div>
                <div class="d-flex justify-content-between align-items-center px-4 py-2">
                  <span class="badge badge-dark">{{ all_collaborations.length }}</span>
                  <span>Colaboraciones</span>
                  <i class="fas fa-share-alt text-dark"></i>
                </div>
                <div class="d-flex justify-content-between align-items-center px-4 py-2">
                  <span class="badge badge-dark">{{ all_categories.length }}</span>
                  <span>Categorias</span>
                  <i class="fas fa-tags text-dark"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- modal img -->
    <div id="cover" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title">Cambiar Imagen</h6>
            <button class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img class="img-fluid mb-3" :src="`${file_url}`" v-if="preview" alt="preview" />
            <form
              id="formCover"
              class="needs-validation"
              @submit.prevent="uploadImg"
              enctype="multipart/form-data"
              novalidate
            >
              <div class="input-group mb-3">
                <div class="custom-file">
                  <input
                    class="custom-file-input"
                    @change="handleImg"
                    type="file"
                    ref="file"
                    required
                  />
                  <label class="custom-file-label">Seleccionar imagen</label>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <button class="btn btn-primary">Aceptar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- modal close account -->
    <div id="closeAccount" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title">Cerrar cuenta</h6>
            <button class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form
              id="formCloseAccount"
              class="needs-validation"
              @submit.prevent="removeUser"
              novalidate
            >
              <div class="mb-3">
                <label for="confpass">Contraseña</label>
                <input
                  id="confpass"
                  class="form-control"
                  v-model="confirm_password"
                  type="password"
                  required
                />
                <small class="invalid-feedback"
                  >Escriba su contraseña actual para confirmar la acción</small
                >
              </div>
              <div class="d-flex justify-content-center">
                <button class="btn btn-danger">Cerrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {LINK_API} from '../utilities/links'
import {msg_error, opt_toast} from '../utilities/options'
export default {
  name: 'profile',
  components: {},
  data() {
    return {
      link_api: LINK_API,
      tkn_api: {headers: {token: this.$store.state.token}},
      all_projects: [],
      all_collaborations: [],
      all_categories: [],
      file_img: null,
      file_url: '',
      preview: false,
      me: {...this.$store.state.user},
      editpassword: '',
      confirm_password: ''
    }
  },
  created() {
    this.getProjects()
    this.getCollaborations()
    this.getCategories()
  },
  methods: {
    getProjects: function() {
      axios
        .get('proall', this.tkn_api)
        .then(res => (this.all_projects = res.data))
        .catch(e => {
          if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
        })
    },
    getCollaborations: function() {
      axios
        .get('colall', this.tkn_api)
        .then(res => (this.all_collaborations = res.data))
        .catch(e => {
          if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
        })
    },
    getCategories: function() {
      axios
        .get('catall', this.tkn_api)
        .then(res => (this.all_categories = res.data))
        .catch(e => {
          if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
        })
    },
    updateAccount: function() {
      const form = document.querySelector('#formUpdateAccount')
      if (form.checkValidity()) {
        console.log('ok')
        form.classList.remove('was-validated')
      } else {
        form.classList.add('was-validated')
      }
    },
    handleImg: function(event) {
      if (!/\.(jpg|jpeg|png)$/.test(event.target.files[0].name.toLowerCase())) {
        alert('Formato de archivo invalido. Selecciona un archivo de imagen .jpg o npg')
      } else {
        this.file_img = this.$refs.file.files[0]
        this.file_url = URL.createObjectURL(this.file_img)
        this.preview = true
      }
    },
    uploadImg: function() {
      const form = document.querySelector('#formCover')
      if (form.checkValidity()) {
        let formData = new FormData()
        formData.append('file', this.file_img)
        axios
          .post('usercover', formData, this.tkn_api)
          .then(res => {
            $('#cover').modal('hide')
            if (res.data.tag === 'suc') toastr.success(res.data.msg, null, opt_toast)
          })
          .catch(e => {
            if (e.response.status === 403) toastr.error('Archivo invalido', null, opt_toast)
            else toastr.error(msg_error, null, opt_toast)
          })
        this.file_img = null
        this.file_url = null
        this.preview = null
        form.classList.remove('was-validated')
      } else {
        form.classList.add('was-validated')
      }
    },
    updateAccount: function() {
      const form = document.querySelector('#formUpdateAccount')
      if (form.checkValidity()) {
        let data = {}
        if (this.editpassword === '') {
          data = {name: this.me.name, email: this.me.email}
        } else {
          data = {name: this.me.name, email: this.me.email, password: this.editpassword}
        }
        axios
          .post('userupdate', data, this.tkn_api)
          .then(res => {
            if (res.data.tag === 'suc') toastr.success(res.data.msg, null, opt_toast)
          })
          .catch(e => {
            if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
          })
        form.classList.remove('was-validated')
      } else {
        form.classList.add('was-validated')
      }
    },
    removeUser: function() {
      const form = document.querySelector('#formCloseAccount')
      if (form.checkValidity()) {
        axios
          .delete('userremove/' + this.confirm_password, this.tkn_api)
          .then(res => {
            $('#closeAccount').modal('hide')
            this.$store.state.socket.disconnect()
            this.$store.dispatch('signout')
            toastr.success(res.data.msg, null, opt_toast)
          })
          .catch(e => {
            if (e.response.status === 403) toastr.error('Contraseña incorrecta', null, opt_toast)
            else toastr.error(msg_error, null, opt_toast)
          })
        this.confirm_password = ''
        form.classList.remove('was-validated')
      } else {
        form.classList.add('was-validated')
      }
    }
  }
}
</script>
