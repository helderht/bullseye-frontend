<template>
  <div>
    <!-- tool bar -->
    <div class="d-flex justify-content-between align-items-center sticky-top bg-nav p-1">
      <p class="address">Tablero</p>
      <div class="d-flex btn-group">
        <button class="btn btn-outline-light btn-sm" data-toggle="modal" data-target="#categoryAdd">
          <i class="fas fa-tags"></i>
        </button>
      </div>
    </div>
    <!-- content -->
    <load v-if="loader" />
    <div class="container-fluid pt-4" v-else>
      <div class="row mb-4">
        <div class="col-sm-4" v-if="all_projects.length > 0">
          <div class="card">
            <div class="card-header">
              <h6 class="card-menu-title">Proyectos</h6>
            </div>
            <div class="card-body">
              <chartcat :info="chartCat" />
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card mb-3">
            <div class="card-header">
              <h6 class="card-menu-title">Actividad</h6>
            </div>
            <ul class="list-group list-group-flush rounded-0">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>Proyectos</span>
                <span class="badge badge-primary">{{ all_projects.length }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>Collaboraciones</span>
                <span class="badge badge-primary">{{ all_projects.length }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>Categorias</span>
                <span class="badge badge-primary">{{ all_categories.length }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>Estimaciones</span>
                <span class="badge badge-primary">{{ all_est_user.length }}</span>
              </li>
            </ul>
          </div>
          <div class="card">
            <div class="card-header">
              <h6 class="card-menu-title">Categories</h6>
            </div>
            <ul class="list-group list-group-flush rounded-0">
              <div
                class="list-group-item d-flex justify-content-between align-items-center"
                v-for="category in all_categories"
                :key="category._id"
              >
                <span>{{ category.name }}</span>
                <div class="d-flex btn-hide d-none">
                  <button
                    class="btn-icon"
                    data-toggle="modal"
                    data-target="#categoryRename"
                    @click="catchCat(category)"
                  >
                    <i class="fas fa-pen text-white"></i>
                  </button>
                  <button class="btn-icon" @click="categoryRemove(category)">
                    <i class="fas fa-trash text-white"></i>
                  </button>
                </div>
              </div>
            </ul>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card">
            <div class="card-header">
              <div class="card-menu-title">Recientemente</div>
            </div>
            <div class="card-body">
              <div class="border-bottom pb-3" v-if="Object.keys(last_fp).length > 0">
                <span class="d-block text-muted text-center mb-1">P. de función</span>
                <h6 class="text-center">{{ last_fp._id }}</h6>
                <div class="d-flex justify-content-between mb-3">
                  <small class="text-info">{{ last_fp.branch }}</small>
                  <small class="text-muted">{{ longTime(last_fp.createdIn) }}</small>
                </div>
                <button class="btn btn-outline-primary btn-block" @click="goFP">Abrir</button>
              </div>
              <empty v-else message="No tiene estimaciones por P. Función" />
              <div class="border-bottom pb-3" v-if="Object.keys(last_sp).length > 0">
                <span class="d-block text-muted text-center mb-1">P. Historia</span>
                <h6 class="text-center">{{ last_sp._id }}</h6>
                <div class="d-flex justify-content-between mb-3">
                  <small class="text-info">{{ last_sp.branch }}</small>
                  <small class="text-muted">{{ longTime(last_sp.createdIn) }}</small>
                </div>
                <button class="btn btn-outline-primary btn-block" @click="goSP">Abrir</button>
              </div>
              <empty v-else message="No tiene estimaciones por P. Historia" />
              <div class="border-bottom pb-3" v-if="Object.keys(last_ucp).length > 0">
                <span class="d-block text-muted text-center mb-1">P. Casos de Uso</span>
                <h6 class="text-center">{{ last_ucp._id }}</h6>
                <div class="d-flex justify-content-between mb-3">
                  <small class="text-info">{{ last_ucp.branch }}</small>
                  <small class="text-muted">{{ longTime(last_ucp.createdIn) }}</small>
                </div>
                <button class="btn btn-outline-primary btn-block" @click="goUCP">Abrir</button>
              </div>
              <empty v-else message="No tiene estimaciones por P. Casos de Uso" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- modal category add -->
    <div id="categoryAdd" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title">Nueva Categoría</h6>
            <button class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form
              id="formCategoryAdd"
              class="needs-validation"
              @submit.prevent="categoryAdd"
              novalidate
            >
              <div class="mb-3">
                <label for="namecat">Nombre</label>
                <input
                  id="namecat"
                  class="form-control"
                  v-model="category_name"
                  type="text"
                  pattern="^[A-Za-z0-9_-]{3,16}$"
                  required
                />
                <small class="invalid-feedback">Por ejemplo: Blockchain, ASP</small>
              </div>
              <div class="d-flex justify-content-end">
                <button class="btn btn-primary">Crear</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- modal category rename -->
    <div id="categoryRename" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title">Renombrar</h6>
            <button class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form
              id="formCategoryRename"
              class="needs-validation"
              @submit.prevent="categoryRename"
              novalidate
            >
              <div class="mb-3">
                <label for="renamecat">Nombre</label>
                <input
                  id="renamecat"
                  class="form-control"
                  v-model="category_edit.name"
                  type="text"
                  pattern="^[A-Za-z0-9_-]{3,16}$"
                  required
                />
                <small class="invalid-feedback">Por ejemplo: Blockchain, ASP</small>
              </div>
              <div class="d-flex justify-content-end">
                <button class="btn btn-primary">Aceptar</button>
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
import moment from 'moment'
import load from '../components/load.vue'
import chartcat from '../components/chart_cat.vue'
import {msg_error, opt_toast} from '../utilities/options'
import empty from '../components/empty.vue'
export default {
  name: 'board',
  components: {load, chartcat, empty},
  data() {
    return {
      loader: true,
      tkn_api: {headers: {token: this.$store.state.token}},
      chartCat: [],
      all_categories: [],
      all_projects: [],
      all_est_user: [],
      all_collaborations: [],
      category_name: '',
      category_edit: {},
      last_fp: {},
      last_sp: {},
      last_ucp: {}
    }
  },
  created() {
    this.getCatChart()
    this.getCategories()
    this.getProjects()
    this.getEstUser()
    this.getCollaborations()
    this.getSnapshotFP()
    this.getSnapshotSP()
    this.getSnapshotUCP()
  },
  methods: {
    getCatChart: function() {
      axios
        .get('catchart', this.tkn_api)
        .then(res => {
          this.chartCat = res.data
        })
        .catch(e => {
          if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
        })
      this.loader = false
    },
    getCategories: function() {
      axios
        .get('catall', this.tkn_api)
        .then(res => {
          this.all_categories = res.data
        })
        .catch(e => {
          if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
        })
    },
    getProjects: function() {
      axios
        .get('proall', this.tkn_api)
        .then(res => {
          this.all_projects = res.data
        })
        .catch(e => {
          if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
        })
    },
    getEstUser: function() {
      axios
        .get('estuser', this.tkn_api)
        .then(res => {
          this.all_est_user = res.data
          this.last_estimate = {...res.data[0]}
        })
        .catch(e => {
          if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
        })
    },
    getCollaborations: function() {
      axios
        .get('colall', this.tkn_api)
        .then(res => {
          this.all_collaborations = res.data
        })
        .catch(e => {
          if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
        })
    },
    getSnapshotFP: function() {
      axios
        .get('fplast', this.tkn_api)
        .then(res => {
          this.last_fp = {...res.data[0]}
        })
        .catch(e => {
          if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
        })
    },
    getSnapshotSP: function() {
      axios
        .get('splast', this.tkn_api)
        .then(res => {
          this.last_sp = {...res.data[0]}
        })
        .catch(e => {
          if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
        })
    },
    getSnapshotUCP: function() {
      axios
        .get('ucplast', this.tkn_api)
        .then(res => {
          this.last_ucp = {...res.data[0]}
        })
        .catch(e => {
          if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
        })
    },
    categoryAdd: function() {
      const form = document.querySelector('#formCategoryAdd')
      if (form.checkValidity()) {
        axios
          .post('catadd', {name: this.category_name}, this.tkn_api)
          .then(res => {
            $('#categoryAdd').modal('hide')
            this.getCategories()
            this.getCatChart()
          })
          .catch(e => {
            if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
          })
        this.category_name = ''
        form.classList.remove('was-validated')
      } else {
        form.classList.add('was-validated')
      }
    },
    categoryRemove: function(category) {
      const conf = confirm(
        'A los proyectos que pertenecen a esta categoria debes reasignarles otra, De lo contrario quedaran huerfanos. Esta seguro de esta acción?'
      )
      if (conf) {
        axios
          .delete('catremove/' + category._id, this.tkn_api)
          .then(res => {
            this.getCategories()
            this.getCatChart()
          })
          .catch(e => {
            if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
          })
      }
    },
    categoryRename: function() {
      const form = document.querySelector('#formCategoryRename')
      if (form.checkValidity()) {
        axios
          .post('catupdate', this.category_edit, this.tkn_api)
          .then(res => {
            $('#categoryRename').modal('hide')
            this.getCategories()
            this.getCatChart()
          })
          .catch(e => {
            if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
          })
        this.category_edit = {}
        form.classList.remove('was-validated')
      } else {
        form.classList.add('was-validated')
      }
    },
    catchCat: function(category) {
      this.category_edit = {...category}
    },
    longTime: function(date) {
      moment.locale('es')
      return moment(date).format('DD MMM YYYY')
    },
    goFP: function() {
      this.$router.push({
        name: 'fp',
        params: {ide: this.last_fp.id_estimate._id, ids: this.last_fp._id}
      })
    },
    goSP: function() {
      this.$router.push({
        name: 'sp',
        params: {ide: this.last_sp.id_estimate._id, ids: this.last_sp._id}
      })
    },
    goUCP: function() {
      this.$router.push({
        name: 'ucp',
        params: {ide: this.last_ucp.id_estimate._id, ids: this.last_ucp._id}
      })
    }
  }
}
</script>
