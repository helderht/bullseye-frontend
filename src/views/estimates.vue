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
        <router-link
          class="btn btn-outline-light btn-sm"
          :to="{name: 'history', params: {idp: this.$route.params.idp}}"
          title="Historial"
        >
          <i class="fas fa-history"></i>
        </router-link>
        <button
          class="btn btn-outline-light btn-sm"
          @click="getTeam"
          data-toggle="modal"
          data-target="#team"
          title="Equipo"
        >
          <i class="fas fa-users"></i>
        </button>
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
                    @click="getSnapshots(estimate, estimate.way)"
                    href="#"
                  >
                    {{ estimate.name }}
                  </a>
                  <div class="d-flex btn-hide d-none">
                    <button
                      class="btn-icon text-white"
                      @click="catchEstimate(estimate)"
                      data-toggle="modal"
                      data-target="#editEstimate"
                    >
                      <i class="fas fa-pen fa-xs"></i>
                    </button>
                    <button class="btn-icon text-white" @click="removeEstimate(estimate)">
                      <i class="fas fa-trash fa-xs"></i>
                    </button>
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
                  <a class="list-item text-truncate" @click="showSnapshot(snapshot)" href="#">
                    <small class="badge">{{ snapshot.branch }}</small> @{{ snapshot._id }}
                  </a>
                  <div class="d-flex btn-hide d-none">
                    <router-link
                      class="btn-icon text-white"
                      :to="{name: `${way}`, params: {ide: snapshot.id_estimate, ids: snapshot._id}}"
                    >
                      <i class="fas fa-calculator"></i>
                    </router-link>
                    <button class="btn-icon text-white" @click="snapshotRemove(snapshot)">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <div class="card">
            <div class="card-header"><h6 class="card-menu-title text-center">Detalles</h6></div>
            <div class="responsive-v">
              <div class="card-body">
                <div v-if="Object.keys(snapshot_selected).length > 0">
                  <div class="mb-3">
                    <h6>Resultados</h6>
                    <ul class="list-group">
                      <div
                        class="d-flex justify-content-between align-items-center border-bottom py-2"
                      >
                        <span class="text-danger">Meses</span>
                        <span>{{ parseFloat(snapshot_selected.aprox.time).toFixed(2) }}</span>
                      </div>
                      <div
                        class="d-flex justify-content-between align-items-center border-bottom py-2"
                      >
                        <span class="text-success">Dólares</span>
                        <span>{{ parseFloat(snapshot_selected.aprox.cost).toFixed(2) }}</span>
                      </div>
                      <div
                        class="d-flex justify-content-between align-items-center border-bottom py-2"
                      >
                        <span class="text-warning">Equipo</span>
                        <span> {{ snapshot_selected.aprox.team }} </span>
                      </div>
                      <div
                        class="d-flex justify-content-between align-items-center border-bottom py-2"
                        v-if="estimate_selected.way === 'sp'"
                      >
                        <span class="text-info">Velocidad</span>
                        <span> {{ parseFloat(snapshot_selected.aprox.velocity).toFixed(2) }} </span>
                      </div>
                      <div
                        class="d-flex justify-content-between align-items-center border-bottom py-2"
                        v-else
                      >
                        <span class="text-info">Productividad</span>
                        <span>
                          {{ parseFloat(snapshot_selected.aprox.productivity).toFixed(2) }}
                        </span>
                      </div>
                    </ul>
                  </div>
                  <div class="mb-3">
                    <h6>Parámetros</h6>
                    <ul class="list-group">
                      <li class="d-flex justify-content-between border-bottom py-1">
                        <span>Horas al dia</span>
                        <span>{{ snapshot_selected.params.hours }}</span>
                      </li>
                      <li class="d-flex justify-content-between border-bottom py-1">
                        <span>Dias al mes</span>
                        <span>{{ snapshot_selected.params.days }}</span>
                      </li>
                      <li class="d-flex justify-content-between border-bottom py-1">
                        <span>Sueldo promedio por integrante</span>
                        <span>{{ snapshot_selected.params.pays }}</span>
                      </li>
                    </ul>
                  </div>
                  <div class="mb-3">
                    <h6>Información</h6>
                    <ul class="list-group">
                      <li class="d-flex justify-content-between border-bottom py-1">
                        <span>Proyecto</span>
                        <span>{{ project.name }}</span>
                      </li>
                      <li class="d-flex justify-content-between border-bottom py-1">
                        <span>Estimación</span>
                        <span>{{ estimate_selected.name }}</span>
                      </li>
                      <li class="d-flex justify-content-between border-bottom py-1">
                        <span>Método</span>
                        <span>{{ way }}</span>
                      </li>
                      <li class="d-flex justify-content-between border-bottom py-1">
                        <span>Snapshot</span>
                        <span>{{ snapshot_selected._id }}</span>
                      </li>
                      <li class="d-flex justify-content-between border-bottom py-1">
                        <span>Rama</span>
                        <span>{{ snapshot_selected.branch }}</span>
                      </li>
                      <li class="d-flex justify-content-between border-bottom py-1">
                        <span>Nota</span>
                      </li>
                      <small>{{ snapshot_selected.commit }}</small>
                    </ul>
                  </div>
                </div>
                <empty v-else message="Sin estimaciones" />
              </div>
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
                <select id="estWay" class="custom-select" v-model="est_way" required>
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
    <!-- modal estimate edit -->
    <div id="editEstimate" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title">Renombrar estimación</h6>
            <button class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form
              id="formEditEst"
              class="needs-validation"
              @submit.prevent="updateEstimate"
              novalidate
            >
              <div class="mb-3">
                <label for="editname">Nombre</label>
                <input
                  id="editname"
                  class="form-control"
                  v-model="edit_estimate.name"
                  type="text"
                  pattern="^[a-záéíóúÁÉÍÓÚA-Z0-9\s]{3,30}$"
                  required
                />
              </div>
              <div class="d-flex justify-content-end">
                <button class="btn btn-primary">Aceptar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- modal team -->
    <div id="team" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title">Equipo</h6>
            <button class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <ul class="list-group">
              <div
                class="d-flex justify-content-between align-items-center border-bottom py-2"
                v-for="elm in team"
                :key="elm.id"
              >
                <img
                  :src="`${link_api}/assets/avatars/${elm.id_user.img}`"
                  alt="user"
                  width="32px"
                  height="32px"
                />
                <span>{{ elm.id_user.name }}</span>
                <button class="btn-icon text-danger" @click="removeCol(elm)">
                  <i class="fas fa-user-minus"></i>
                </button>
              </div>
            </ul>
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
import {LINK_API} from '../utilities/links'
export default {
  name: 'estimates',
  components: {load, empty},
  data() {
    return {
      link_api: LINK_API,
      tkn_app: {headers: {token: this.$store.state.token}},
      loader: true,
      est_name: '',
      est_way: '',
      project: {},
      all_estimates: [],
      all_snapshots: [],
      estimate_wanted: '',
      estimate_selected: {},
      snapshot_selected: {},
      way: '',
      edit_estimate: {},
      team: []
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
            this.estimate_selected = res.data[0]
            // obtener snapshots de la ultima estimación
            this.getSnapshots(this.estimate_selected, this.estimate_selected.way)
          }
          this.loader = false
        })
        .catch(e => {
          if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
          this.loader = false
        })
    },
    getSnapshots: function(estimate, way) {
      this.estimate_selected = {...estimate}
      switch (way) {
        case 'fp':
          axios
            .get('fpall/' + estimate._id, this.tkn_app)
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
            .get('spall/' + estimate._id, this.tkn_app)
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
            .get('ucpall/' + estimate._id, this.tkn_app)
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
    getTeam: function() {
      axios
        .get('colteam/' + this.$route.params.idp, this.tkn_app)
        .then(res => {
          this.team = res.data
        })
        .catch(e => {
          if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
        })
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
        this.est_name = ''
        this.est_way = ''
        form.classList.remove('was-validated')
      } else {
        form.classList.add('was-validated')
      }
    },
    catchEstimate: function(estimate) {
      this.edit_estimate = {...estimate}
    },
    updateEstimate: function() {
      const form = document.querySelector('#formEditEst')
      if (form.checkValidity()) {
        axios
          .post('estupdate', this.edit_estimate, this.tkn_app)
          .then(res => {
            this.$store.state.socket.emit('estimate-update', {room: this.$route.params.idp})
            $('#editEstimate').modal('hide')
            this.getEstimates()
          })
          .catch(e => {
            if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
          })
        form.classList.remove('was-validated')
      } else {
        form.classList.add('was-validated')
      }
    },
    showSnapshot: function(snapshot) {
      this.snapshot_selected = {...snapshot}
    },
    snapshotRemove: function(snapshot) {
      if (snapshot.id_user === this.$store.state.user._id && snapshot.commit !== 'Raiz') {
        const res = confirm('¿Esta seguro de eliminar el snapshot?')
        if (res) {
          // verificar el método
          switch (this.way) {
            case 'fp':
              axios
                .delete('fpremove/' + snapshot._id, this.tkn_app)
                .then(res => {
                  this.$store.state.socket.emit('snapshot-remove', {room: this.$route.params.idp})
                  this.getSnapshots(this.estimate_selected, this.estimate_selected.way)
                })
                .catch(e => {
                  if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
                })
              break
            case 'sp':
              axios
                .delete('spremove/' + snapshot._id, this.tkn_app)
                .then(res => {
                  this.$store.state.socket.emit('snapshot-remove', {room: this.$route.params.idp})
                  this.getSnapshots(this.estimate_selected, this.estimate_selected.way)
                })
                .catch(e => {
                  if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
                })
              break
            case 'ucp':
              axios
                .delete('ucpremove/' + snapshot._id, this.tkn_app)
                .then(res => {
                  this.$store.state.socket.emit('snapshot-remove', {room: this.$route.params.idp})
                  this.getSnapshots(this.estimate_selected, this.estimate_selected.way)
                })
                .catch(e => {
                  if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
                })
              break
            default:
              toastr.error('opción invalida', null, opt_toast)
              break
          }
        }
      } else {
        alert(
          'El snapshot no se puede eliminar porque es el nodo raiz o no eres el creador del snapshot'
        )
      }
    },
    removeCol: function(colaboration) {
      const conf = confirm('¿Esta seguro de eliminar al colaborador del proyecto?')
      if (conf) {
        axios
          .delete('colremove/' + colaboration._id, this.tkn_app)
          .then(res => {
            this.$store.state.socket.emit('collaboration-leave', {room: this.$route.params.idp})
            this.getTeam()
          })
          .catch(e => {
            if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
          })
      }
    },
    removeEstimate: function(estimate) {
      const conf = confirm('¿Esta seguro de eliminar la estimación?')
      if (conf) {
        axios
          .delete('estremove/' + estimate._id, this.tkn_app)
          .then(res => {
            this.$store.state.socket.emit('estimate-remove', {room: this.$route.params.idp})
            this.getEstimates()
          })
          .catch(e => {
            if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
          })
      }
    }
  }
}
</script>
