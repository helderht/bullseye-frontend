<template>
  <div>
    <!-- tool bar -->
    <div class="d-flex justify-content-between align-items-center sticky-top bg-nav p-1">
      <p class="address">Colaboraciones</p>
      <div class="d-flex">
        <input
          class="form-control form-control-sm"
          v-model="collaboration_wanted"
          type="search"
          placeholder="Buscar"
        />
      </div>
      <div class="d-flex btn-group">
        <button
          class="btn btn-outline-light btn-sm"
          data-toggle="modal"
          data-target="#join"
          title="Unirse"
        >
          <i class="fas fa-user-plus"></i>
        </button>
      </div>
    </div>
    <!-- content -->
    <div class="container-fluid">
      <load v-if="loader" />
      <div class="row mt-4" v-else>
        <div
          class="col-md-6 col-lg-4 mb-4"
          v-for="collaboration in searchCollaboration"
          :key="collaboration._id"
        >
          <div class="card">
            <div class="card-header justify-content-between align-items-center">
              <h6 class="card-menu-title">{{ collaboration.id_project.name }}</h6>
            </div>
            <div class="card-body">
              <p class="card-text">{{ collaboration.id_project.description }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">{{
                  collaboration.id_project.createdIn | formatDate('DD MMM YYY')
                }}</small>
                <router-link
                  class="btn btn-outline-primary"
                  :to="{
                    name: 'contributions',
                    params: {idc: collaboration._id, idp: collaboration.id_project._id}
                  }"
                  >Abrir</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- modal join -->
    <div id="join" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title">Unirse</h6>
            <button class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="formJoin" class="needs-valitadion" @submit.prevent="join" novalidate>
              <div class="mb-3">
                <label for="key_access">Código de acceso</label>
                <input
                  id="key_access"
                  class="form-control text-center"
                  v-model="access_key"
                  type="text"
                  pattern="^[0-9]{13}$"
                  required
                />
                <small class="invalid-feedback">Código de acceso invalido</small>
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
import {msg_error, opt_toast} from '../utilities/options'
export default {
  name: 'collaborations',
  components: {load},
  data() {
    return {
      loader: true,
      access_key: '',
      tkn_app: {headers: {token: this.$store.state.token}},
      all_collaborations: [],
      collaboration_wanted: ''
    }
  },
  created() {
    this.getCollaborations()
  },
  filters: {
    formatDate: function(date) {
      moment.locale('es')
      return moment(date).format('DD MMM YYYY - hh:mm')
    }
  },
  computed: {
    searchCollaboration: function() {
      return this.all_collaborations.filter(elm =>
        elm.id_project.name.toLowerCase().includes(this.collaboration_wanted.toLowerCase())
      )
    }
  },
  methods: {
    getCollaborations: function() {
      axios
        .get('colall', this.tkn_app)
        .then(res => {
          this.all_collaborations = res.data
          this.loader = false
        })
        .catch(e => {
          if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
        })
    },
    join: function() {
      const form = document.querySelector('#formJoin')
      if (form.checkValidity()) {
        axios
          .post('coladd', {key: this.access_key}, this.tkn_app)
          .then(res => {
            $('#join').modal('hide')
            if (res.data.tag === 'war') toastr.warning(res.data.msg, null, opt_toast)
            else {
              // TODO: crear sala
              this.getCollaborations()
            }
          })
          .catch(e => {
            if (e.response.status === 403) toastr.error('Código invalido', null, opt_toast)
            else toastr.error(msg_error, null, opt_toast)
            this.loader = false
          })
        this.access_key = null
        form.classList.remove('was-validated')
      } else {
        form.classList.add('was-validated')
      }
    }
  }
}
</script>
