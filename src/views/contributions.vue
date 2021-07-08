<template>
  <div>
    <!-- tool bar -->
    <div class="d-flex justify-content-between align-items-center sticky-top bg-nav p-1">
      <p class="address">Contribuciones</p>
      <div class="d-flex btn-group">
        <button class="btn btn-outline-light btn-sm" title="Nuevo">
          <i class="fas fa-file"></i>
        </button>
        <router-link
          class="btn btn-outline-light btn-sm"
          :to="{name: 'history', params: {idp: this.$route.params.idp}}"
          title="Historial"
        >
          <i class="fas fa-history"></i>
        </router-link>
      </div>
    </div>
    <!-- content -->
    <div class="container-fluid pt-4">
      <load v-if="loader" />
      <div class="row">
        <div class="col-md-3 mb-3">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h6 class="card-menu-title">Estimaciones</h6>
              <div class="badge badge-info">{{ all_estimates.length }}</div>
            </div>
            <div class="responsive-v">
              <div class="list-group rounded-0">
                <button
                  class="list-group-item list-group-item-action border-0"
                  v-for="estimate in all_estimates"
                  :key="estimate._id"
                  @click="getSnapshots(estimate._id, estimate.way)"
                >
                  {{ estimate.name }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 order-md-3 mb-3">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h6 class="card-menu-title">Snapshots</h6>
              <div class="badge badge-info">{{ all_snapshots.length }}</div>
            </div>
            <div class="responsive-v">
              <ul class="list-group rounded-0">
                <li
                  class="list-group-item d-flex justify-content-between align-items-center border-0 pr-2"
                  v-for="snapshot in all_snapshots"
                  :key="snapshot._id"
                >
                  <a class="list-item text-truncate" href="#">
                    <small class="badge">{{ snapshot.branch }}</small> @{{ snapshot._id }}
                  </a>
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
            <div class="card-header"><h6 class="card-menu-title text-center">Información</h6></div>
            <div class="card-body">
              <p>proyecto: {{ project.name }}</p>
              <p>estimación: {{ estimate_last.name }}</p>
              <p>metodo: {{ way }}</p>
              <p>snapshot: {{ snapshot_selected }}</p>
            </div>
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
  name: 'contributions',
  components: {load},
  data() {
    return {
      tkn_api: {headers: {token: this.$store.state.token}},
      loader: true,
      project: {},
      all_estimates: [],
      all_snapshots: [],
      estimate_last: {},
      snapshot_selected: {},
      way: ''
    }
  },
  created() {
    this.getProject()
    this.getEstimates()
  },
  methods: {
    getProject: function() {
      axios
        .get('proonly/' + this.$route.params.idp, this.tkn_api)
        .then(res => {
          this.project = res.data
        })
        .catch(e => {
          if (e.response.status === 500) tosatr.error(msg_error, null, opt_toast)
        })
    },
    getEstimates: function() {
      axios
        .get('estall/' + this.$route.params.idp, this.tkn_api)
        .then(res => {
          this.all_estimates = res.data
          if (res.data.length > 0) {
            this.estimate_last = res.data[0]
            this.getSnapshots(this.estimate_last._id, this.estimate_last.way)
          }
        })
        .catch(e => {
          if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
        })
      this.loader = false
    },
    getSnapshots: function(idest, way) {
      switch (way) {
        case 'fp':
          axios
            .get('fpall/' + idest, this.tkn_api)
            .then(res => {
              this.way = way
              this.all_snapshots = res.data
              this.snapshot_selected = res.data[0]
            })
            .catch(e => {
              if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
            })
          break
        case 'sp':
          axios
            .get('spall/' + idest, this.tkn_api)
            .then(res => {
              this.way = way
              this.all_snapshots = res.data
              this.snapshot_selected = res.data[0]
            })
            .catch(e => {
              if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
            })
          break
        case 'ucp':
          axios
            .get('ucpall/' + idest, this.tkn_api)
            .then(res => {
              this.way = way
              this.all_snapshots = res.data
              this.snapshot_selected = res.data[0]
            })
            .catch(e => {
              if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
            })
          break
        default:
          toastr.warning('Método seleccionado invalido', null, opt_toast)
          break
      }
    }
  }
}
</script>
