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
            <h6 class="card-menu-title">Proyecto</h6>
          </div>
          <div class="responsive-v">
            <load v-if="loader" />
            <div class="list-group rounded-0" v-else>
              <button
                type="button"
                class="d-flex list-group-item list-group-item-action justify-content-between border-0 pl-2 pr-0"
                v-for="estimate in searchEstimate"
                :key="estimate._id"
              >
                <div class="text-truncate">{{ estimate.name }}</div>
                <div class="d-flex btn-hide d-none">
                  <button class="btn-icon text-white"><i class="fas fa-pen fa-xs"></i></button>
                  <button class="btn-icon text-white"><i class="fas fa-trash fa-xs"></i></button>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-3 order-md-3 mb-3">
          <div class="head-list border-bottom">
            <h6 class="card-menu-title">Snapshots</h6>
          </div>
        </div>
        <div class="col-md-6 border-left border-right mb-3">
          <div class="head-list justify-content-center border-bottom">
            <h6 class="card-menu-title">Información</h6>
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
      all_estimates: [],
      estimate_wanted: ''
    }
  },
  created() {
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
    getEstimates: function() {
      axios
        .get('estall/' + this.$route.params.idp, this.tkn_app)
        .then(res => {
          this.all_estimates = res.data
          this.loader = false
        })
        .catch(e => {
          if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
          this.loader = false
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
            console.log(res.data)
            $('#estimateAdd').modal('hide')
            this.getEstimates()
          })
          .catch(e => {
            if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
            this.loader = false
          })
        form.classList.remove('was-validated')
      } else {
        form.classList.add('was-validated')
      }
    }
  }
}
</script>
