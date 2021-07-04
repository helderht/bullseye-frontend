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
      </div>
    </div>
    <!-- content -->
    <div class="container-full">
      <div class="row h-100">
        <div class="col-md-3 mb-3">
          <div class="head-list border-bottom">
            <h6 class="card-menu-title">{{ project.name }}</h6>
          </div>
          <div class="responsive-v">
            <load v-if="loader" />
            <div class="list-group rounded-0" v-else>
              <li
                class="d-flex list-group-item justify-content-between align-item-center border-0 pl-2 pr-0"
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
            </div>
          </div>
        </div>
        <div class="col-md-3 order-md-3 mb-3">
          <div class="head-list border-bottom">
            <h6 class="card-menu-title">Snapshots</h6>
          </div>
          <div class="responsive-v">
            <div class="list-group rounded-0">
              <li
                class="list-group-item d-flex justify-content-between align-items-center border-0 pl-2 pr-0"
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
            </div>
          </div>
        </div>
        <div class="col-md-6 border-left border-right mb-3">
          <div class="head-list justify-content-center border-bottom">
            <h6 class="card-menu-title">Información</h6>
          </div>
          <p>{{ estimate_last }}</p>
          <p>{{ snapshot_selected }}</p>
          <p>{{ way }}</p>
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
                <select id="estWay" class="form-control" v-model="est_way">
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
import {msg_error, opt_toast} from '../utilities/options'
export default {
  name: 'estimates',
  components: {load},
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
          this.estimate_last = res.data[0]
          // obtener snapshots de la ultima estimación
          this.getSnapshots(this.estimate_last._id, this.estimate_last.way)
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
          console.log('metodo de estimación invalido')
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
            console.log(res.data)
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
