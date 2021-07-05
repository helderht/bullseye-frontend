<template>
  <div>
    <!-- tool bar -->
    <div class="d-flex justify-content-between align-items-center sticky-top bg-nav p-1">
      <p class="address">Estimaciones</p>
      <div class="d-flex">
        <input
          class="form-control form-control-sm"
          v-model="estimate_wanted"
          type="search"
          placeholder="Buscar"
        />
      </div>
      <div class="d-flex btn-group">
        <button
          class="btn btn-outline-light btn-sm"
          data-toggle="modal"
          data-target="#estimateAdd"
          title="Nuevo"
        >
          <i class="fas fa-file"></i>
        </button>
        <button class="btn btn-outline-light btn-sm" title="Equipo">
          <i class="fas fa-users"></i>
        </button>
        <router-link
          class="btn btn-outline-light btn-sm"
          :to="{name: 'history', params: {idp: this.$route.params.idp}}"
          title="History"
        >
          <i class="fas fa-history"></i>
        </router-link>
      </div>
    </div>
    <!-- content -->
    <div class="container-fluid">
      <load v-if="loader" />
      <div class="row mt-4" v-else>
        <div class="col-md-3 mb-3">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h6 class="card-menu-title">Estimaciones</h6>
              <div class="badge badge-info">{{ all_estimates.length }}</div>
            </div>
            <div class="responsive-v">
              <ul class="list-group rounded-0">
                <li
                  class="d-flex list-group-item justify-content-between align-item-center border-0 pr-2"
                  v-for="estimate in searchEstimate"
                  :key="estimate._id"
                >
                  <a
                    class="list-item text-truncate"
                    @click="getSnapshots(estimate._id, estimate.way)"
                    href="#"
                  >
                    {{ estimate.name }}
                  </a>
                  <div class="d-flex btn-hide d-none">
                    <button class="btn-icon text-white"><i class="fas fa-pen fa-xs"></i></button>
                    <button class="btn-icon text-white"><i class="fas fa-trash fa-xs"></i></button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-3 order-md-3 mb-3">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h6 class="card-menu-title">Snapshot</h6>
              <div class="badge badge-info">{{ all_snapshots.length }}</div>
            </div>
            <div class="responsive-v">
              <ul class="list-group rounded-0">
                <li
                  class="list-group-item d-flex justify-content-between align-items-center border-0 pr-2"
                  v-for="snapshot in all_snapshots"
                  :key="snapshot._id"
                >
                  <a class="list-item text-truncate" @click="showSnapshot(snapshot)" href="#">{{
                    snapshot._id
                  }}</a>
                  <div class="d-flex btn-hide d-none">
                    <router-link
                      class="btn-icon text-white"
                      :to="{name: `${way}`, params: {ide: snapshot.id_estimate, ids: snapshot._id}}"
                    >
                      <i class="fas fa-calculator"></i>
                    </router-link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <div class="card">
            <div class="card-header"><h6 class="card-menu-title">Detalles</h6></div>
            <div class="card-body">
              <div v-if="Object.keys(snapshot_selected).length > 0">
                <p>proyecto: {{ project.name }}</p>
                <p>estimación: {{ estimate_last.name }}</p>
                <p>método: {{ way }}</p>
                <p>snapshot: {{ snapshot_selected._id }}</p>
              </div>
              <empty v-else message="Sin estimaciones" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- modal estimate add -->
    <div id="estimateAdd" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title">Nueva estimación</h6>
            <button class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form
              id="formEstimateAdd"
              class="needs-validation"
              @submit.prevent="estimateAdd"
              novalidate
            >
              <div class="mb-3">
                <label for="estName">Name</label>
                <input
                  id="estName"
                  class="form-control"
                  v-model="est_name"
                  type="text"
                  pattern="^[a-záéíóúÁÉÍÓÚA-Z0-9\s]{3,30}$"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="estWay">Método</label>
                <select id="estWay" class="form-control" v-model="est_way" required>
                  <option value="fp">P. Función</option>
                  <option value="sp">P. Historia</option>
                  <option value="ucp">P. Casos de uso</option>
                </select>
              </div>
              <div class="d-flex justify-content-end">
                <button class="btn btn-primary">Crear</button>
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
import load from '../components/load.vue'
import empty from '../components/empty.vue'
import {msg_error, opt_toast} from '../utilities/options'
export default {
  name: 'estimates',
  components: {load, empty},
  data() {
    return {
      tkn_app: {headers: {token: this.$store.state.token}},
      loader: true,
      est_name: '',
      est_way: '',
      project: {},
      all_estimates: [],
      all_snapshots: [],
      estimate_wanted: '',
      estimate_last: {},
      snapshot_selected: {},
      way: ''
    }
  },
  created() {
    this.getProject()
    this.getEstimates()
  },
  computed: {
    searchEstimate: function() {
      return this.all_estimates.filter(elm =>
        elm.name.toLowerCase().includes(this.estimate_wanted.toLowerCase())
      )
    }
  },
  methods: {
    getProject: function() {
      this.loader = true
      axios
        .get('proonly/' + this.$route.params.idp, this.tkn_app)
        .then(res => {
          this.project = res.data
        })
        .catch(e => {
          if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
        })
    },
    getEstimates: function() {
      axios
        .get('estall/' + this.$route.params.idp, this.tkn_app)
        .then(res => {
          this.all_estimates = res.data
          if (res.data.length > 0) {
            this.estimate_last = res.data[0]
            // obtener snapshots de la ultima estimación
            this.getSnapshots(this.estimate_last._id, this.estimate_last.way)
          }
          this.loader = false
        })
        .catch(e => {
          if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
          this.loader = false
        })
    },
    getSnapshots: function(idest, way) {
      switch (way) {
        case 'fp':
          axios
            .get('fpall/' + idest, this.tkn_app)
            .then(res => {
              this.way = way
              this.all_snapshots = res.data
              // auto selecionar ultimo snapshot
              this.snapshot_selected = res.data[0]
            })
            .catch(e => {
              if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
            })
          break
        case 'sp':
          axios
            .get('spall/' + idest, this.tkn_app)
            .then(res => {
              this.way = way
              this.all_snapshots = res.data
              // auto selecionar ultimo snapshot
              this.snapshot_selected = res.data[0]
            })
            .catch(e => {
              if (e.response === 500) toastr.error(msg_error, null, opt_toast)
            })
          break
        case 'ucp':
          axios
            .get('ucpall/' + idest, this.tkn_app)
            .then(res => {
              this.way = way
              this.all_snapshots = res.data
              // auto selecionar ultimo snapshot
              this.snapshot_selected = res.data[0]
            })
            .catch(e => {
              if (e.response === 500) toastr.error(msg_error, null, opt_toast)
            })
          break
        default:
          toastr.warning('Método seleccionado invalido', null, opt_toast)
          break
      }
    },
    estimateAdd: function() {
      const form = document.querySelector('#formEstimateAdd')
      if (form.checkValidity()) {
        this.loader = true
        axios
          .post(
            'estadd',
            {
              name: this.est_name,
              way: this.est_way,
              id_project: this.$route.params.idp
            },
            this.tkn_app
          )
          .then(res => {
            this.$store.state.socket.emit('estimate-add', {room: res.data.estimate.id_project})
            $('#estimateAdd').modal('hide')
            this.getEstimates()
          })
          .catch(e => {
            if (e.response.status === 404) toastr.error('Método de estimación invalido')
            else toastr.error(msg_error, null, opt_toast)
            this.loader = false
          })
        form.classList.remove('was-validated')
      } else {
        form.classList.add('was-validated')
      }
    },
    showSnapshot: function(snapshot) {
      this.snapshot_selected = {...snapshot}
    }
  }
}
</script>
