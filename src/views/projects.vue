<template>
  <div>
    <!-- tool bar -->
    <div class="d-flex justify-content-between align-items-center sticky-top bg-nav p-1">
      <p class="address">Proyectos</p>
      <div>
        <input
          class="form-control form-control-sm"
          v-model="project_wanted"
          type="search"
          placeholder="Buscar"
        />
      </div>
      <div class="d-flex btn-group">
        <button
          class="btn btn-outline-light btn-sm"
          data-toggle="modal"
          data-target="#projectAdd"
          title="Nuevo"
        >
          <i class="fas fa-folder"></i>
        </button>
      </div>
    </div>
    <!-- content -->
    <div class="container-fluid">
      <load v-if="this.loader" />
      <div class="row mt-4" v-else>
        <div class="col-sm-6 col-md-4 mb-4" v-for="project in searchProject" :key="project._id">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h6 class="card-menu-title">{{ project.name }}</h6>
              <div class="dropdown">
                <button class="btn-icon" data-toggle="dropdown">
                  <i class="fas fa-ellipsis-v"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-right">
                  <h6 class="dropdown-header">Opciones</h6>
                  <a
                    class="dropdown-item"
                    @click="catchProject(project)"
                    data-toggle="modal"
                    href="#projectUpdate"
                  >
                    <i class="fas fa-pen text-muted"></i> Editar
                  </a>
                  <a class="dropdown-item" @click="getKey(project._id)" href="#">
                    <i class="fas fa-key text-muted"></i> LLave
                  </a>
                  <a class="dropdown-item" href="#">
                    <i class="fas fa-trash text-muted"></i> Eliminar
                  </a>
                </div>
              </div>
            </div>
            <div class="card-body">
              <p class="card-text">{{ project.description }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">{{
                  project.createdIn | formatDate('DD MMM YYYY')
                }}</small>
                <router-link
                  class="btn btn-outline-primary"
                  :to="{name: 'estimates', params: {idp: project._id}}"
                >
                  Abrir
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- modal project add-->
    <div id="projectAdd" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title">Nuevo proyecto</h6>
            <button class="close">
              <span aria-hidden="true" data-dismiss="modal">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form
              id="formProjectAdd"
              class="needs-validation"
              @submit.prevent="projectAdd"
              novalidate
            >
              <div class="mb-3">
                <label for="proTitle">Título</label>
                <input
                  id="proTitle"
                  class="form-control"
                  v-model="project_add.name"
                  type="text"
                  pattern="^[a-záéíóúÁÉÍÓÚA-Z0-9\s]{3,30}$"
                  required
                />
                <small class="invalid-feedback">No se admiten caracteres</small>
              </div>
              <div class="mb-3">
                <label for="proCategory">Categoría</label>
                <select
                  id="proCategory"
                  class="form-control"
                  v-model="project_add.category"
                  required
                >
                  <option
                    v-for="category in all_categories"
                    :key="category._id"
                    :value="category._id"
                  >
                    {{ category.name }}
                  </option>
                </select>
                <small class="invalid-feedback">Selecciona un ítem</small>
              </div>
              <div class="mb-3">
                <label for="proDescription">Descripción</label>
                <textarea
                  id="proDescription"
                  class="form-control"
                  v-model="project_add.description"
                  cols="30"
                  rows="3"
                  required
                />
                <small class="invalid-feedback">Escribe acerca de tu projecto</small>
              </div>
              <div class="d-flex justify-content-end">
                <button class="btn btn-primary">Crear</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- modal project update -->
    <div id="projectUpdate" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title">Editar proyecto</h6>
            <button class="close">
              <span aria-hidden="true" data-dismiss="modal">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form
              id="formProjectUpdate"
              class="needs-validation"
              @submit.prevent="projectUpdate"
              novalidate
            >
              <div class="mb-3">
                <label for="editTitle">Título</label>
                <input
                  id="editTitle"
                  class="form-control"
                  v-model="tmp_project.name"
                  type="text"
                  pattern="^[a-záéíóúÁÉÍÓÚA-Z0-9\s]{3,30}$"
                  required
                />
                <small class="invalid-feedback">No se admiten caracteres</small>
              </div>
              <div class="mb-3">
                <label for="editCategory">Categoría</label>
                <select
                  id="editCategory"
                  class="form-control"
                  v-model="tmp_project.id_category"
                  required
                >
                  <option
                    v-for="category in all_categories"
                    :key="category._id"
                    :value="category._id"
                  >
                    {{ category.name }}
                  </option>
                </select>
                <small class="invalid-feedback">Selecciona un ítem</small>
              </div>
              <div class="mb-3">
                <label for="editDescription">Descripción</label>
                <textarea
                  id="editDescription"
                  class="form-control"
                  v-model="tmp_project.description"
                  cols="30"
                  rows="3"
                  required
                />
                <small class="invalid-feedback">Escribe acerca de tu proyecto</small>
              </div>
              <div class="d-flex justify-content-end">
                <button class="btn btn-primary">Aceptar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- modal project key -->
    <div id="projectKey" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title">Código de acesso</h6>
            <button class="close">
              <span aria-hidden="true" data-dismiss="modal">&times;</span>
            </button>
          </div>
          <div class="modal-body text-center">
            <p>{{ project_key }}</p>
            <small class="text-muted">Comparte este código con tu equipo de trabajo</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import load from '../components/load'
import {msg_error, opt_toast} from '../utilities/options'
export default {
  name: 'projects',
  components: {load},
  data() {
    return {
      tkn_app: {headers: {token: this.$store.state.token}},
      loader: true,
      project_add: {name: '', category: '', description: ''},
      project_key: null,
      project_wanted: '',
      all_categories: [],
      all_projects: [],
      tmp_project: {}
    }
  },
  created() {
    this.getCategories()
    this.getProjects()
  },
  filters: {
    formatDate: date => {
      moment.locale('es')
      return moment(date).format('DD MMM YYYY - hh:mm')
    }
  },
  computed: {
    searchProject: function() {
      return this.all_projects.filter(elm =>
        elm.name.toLowerCase().includes(this.project_wanted.toLowerCase())
      )
    }
  },
  methods: {
    getCategories: function() {
      axios
        .get('catall', this.tkn_app)
        .then(res => {
          this.all_categories = res.data
        })
        .catch(e => {
          if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
        })
    },
    getProjects: function() {
      axios
        .get('proall', this.tkn_app)
        .then(res => {
          this.all_projects = res.data
        })
        .catch(e => {
          if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
        })
      this.loader = false
    },
    getKey: function(idpro) {
      axios
        .get('prokey/' + idpro, this.tkn_app)
        .then(res => {
          this.project_key = res.data
          $('#projectKey').modal('show')
        })
        .catch(e => {
          if (e.response.status === 404) toastr.error('Proyecto no encontrado', null, opt_toast)
          else toastr.error(msg_error, null, opt_toast)
        })
      this.project_key = null
    },
    projectAdd: function() {
      const form = document.querySelector('#formProjectAdd')
      if (form.checkValidity()) {
        this.loader = true
        axios
          .post('proadd', this.project_add, this.tkn_app)
          .then(res => {
            // TODO: joinRoom
            this.project_key = res.data.key_access
            $('#projectAdd').modal('hide')
            this.getProjects()
            $('#projectKey').modal('show')
          })
          .catch(e => {
            if (e.response.status === 500) {
              toastr.error(msg_error, null, opt_toast)
              this.loader = false
            }
          })
        this.project_add.name = ''
        this.project_add.category = ''
        this.project_add.description = ''
        this.project_key = null
        form.classList.remove('was-validated')
      } else {
        form.classList.add('was-validated')
      }
    },
    projectUpdate: function() {
      const form = document.querySelector('#formProjectUpdate')
      if (form.checkValidity()) {
        this.loader = true
        axios
          .post('proupdate', this.tmp_project, this.tkn_app)
          .then(res => {
            // TODO: registrar actividad
            $('#projectUpdate').modal('hide')
            this.getProjects()
          })
          .catch(e => {
            if (e.response.status === 500) {
              toastr.error(msg_error, null, opt_toast)
              this.loader = false
            }
          })
        form.classList.remove('was-validated')
      } else {
        form.classList.add('was-validated')
      }
    },
    catchProject: function(project) {
      this.tmp_project = {...project}
    }
  }
}
</script>
