<template>
  <div>
    <!-- tool bar -->
    <div class="d-flex justify-content-between align-items-center sticky-top bg-nav p-1">
      <p class="address">Puntos de función</p>
      <div class="btn-group">
        <button
          class="btn btn-outline-light btn-sm"
          data-toggle="modal"
          data-target="#snapshotAdd"
          title="Guardar"
        >
          <i class="fas fa-save"></i>
        </button>
        <button class="btn btn-outline-light btn-sm" @click="showChart">
          <i class="fas fa-chart-bar"></i>
        </button>
      </div>
    </div>
    <!-- content -->
    <load v-if="loader" />
    <div class="container-fluid pt-4" v-else>
      <!-- widgets -->
      <div class="row">
        <div class="col-sm-6 col-lg-3 mb-4">
          <div class="card">
            <div class="card-body">
              <h6 class="text-center font-weight-normal text-danger">Tiempo</h6>
              <h3 class="text-muted">{{ parseFloat(time).toFixed(2) }}</h3>
              <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">Meses</small>
                <i class="fas fa-calendar text-danger"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-lg-3 mb-4">
          <div class="card">
            <div class="card-body">
              <h6 class="text-center font-weight-normal text-success">Costo</h6>
              <h3 class="text-muted">{{ parseFloat(cost).toFixed(2) }}</h3>
              <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">Dólares</small>
                <i class="fas fa-money-bill text-success"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-lg-3 mb-4">
          <div class="card">
            <div class="card-body">
              <h6 class="text-center font-weight-normal text-primary">Equipo</h6>
              <h3 class="text-muted">{{ aprox.team }}</h3>
              <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">Personas</small>
                <i class="fas fa-users text-warning"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-lg-3 mb-4">
          <div class="card">
            <div class="card-body">
              <h6 class="text-center font-weight-normal text-info">Productividad</h6>
              <h3 class="text-muted">{{ aprox.productivity }}</h3>
              <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">Horas/PF</small>
                <i class="fas fa-tachometer-alt text-info"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- chart -->
      <div class="row mb-4" v-if="chart">
        <div class="col">
          <div class="card">
            <div class="card-header">
              <h6 class="card-menu-title">Reportes</h6>
            </div>
            <div class="card-body">
              <div v-if="requirements.length > 0">
                <h6 class="text-center">Tiempo estimado</h6>
                <chartfp :info="requirements" :aprox="time" tag="Meses" color="#dc3545" />
              </div>
              <empty message="Sin requrimientos" v-else />
              <div v-if="cost > 0">
                <h6 class="text-center">Costos estimado</h6>
                <chartfp :info="requirements" :aprox="cost" tag="Dólares" color="#198754" />
              </div>
              <empty message="Sin costos" v-else />
            </div>
          </div>
        </div>
      </div>
      <!-- params -->
      <div class="row mb-4">
        <div class="col">
          <div class="card">
            <div class="card-header"><h6 class="card-menu-title">Parámetros</h6></div>
            <div class="card-body pb-0">
              <div class="row">
                <div class="col-sm-6 col-lg-4 mb-3">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="fas fa-clock"></i></span>
                      <span class="input-group-text">Horas</span>
                    </div>
                    <input
                      class="form-control text-center"
                      v-model.number="params.hours"
                      type="number"
                      min="0"
                      max="23"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-lg-4 mb-3">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="fas fa-calendar-day"></i></span>
                      <span class="input-group-text">Dias</span>
                    </div>
                    <input
                      class="form-control text-center"
                      v-model.number="params.days"
                      type="number"
                      min="0"
                      max="31"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-lg-4 mb-3">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="fas fa-users"></i></span>
                      <span class="input-group-text">Equipo</span>
                    </div>
                    <input
                      class="form-control text-center"
                      v-model.number="aprox.team"
                      type="number"
                      min="0"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-lg-4 mb-3">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="fas fa-tachometer-alt"></i></span>
                      <span class="input-group-text">Productividad</span>
                    </div>
                    <input
                      class="form-control text-center"
                      v-model.number="aprox.productivity"
                      type="number"
                      min="0"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-lg-4 mb-3">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="fas fa-dollar-sign"></i></span>
                      <span class="input-group-text">Sueldos</span>
                    </div>
                    <input
                      class="form-control text-center"
                      v-model="params.pays"
                      type="number"
                      min="0"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-lg-4 mb-4">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="fas fa-heartbeat"></i></span>
                      <span class="input-group-text">Esfuerzo</span>
                    </div>
                    <input
                      class="form-control text-center"
                      :placeholder="parseFloat(effort).toFixed(2)"
                      type="number"
                      readonly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- requirements -->
      <div class="row mb-4">
        <div class="col">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h6 class="card-menu-title">Requerimientos funcionales</h6>
              <button class="btn-icon" data-toggle="collapse" data-target="#requirements">
                <i class="fas fa-sort"></i>
              </button>
            </div>
            <div id="requirements" class="collapse show">
              <div class="card-body">
                <draggable v-model="requirements" animation="300" handle=".move">
                  <div
                    class="input-group mb-3"
                    v-for="(request, index) in requirements"
                    :key="index"
                  >
                    <div class="input-group-prepend">
                      <label class="input-group-text move">{{ index + 1 }}</label>
                    </div>
                    <input
                      class="form-control w-50"
                      v-model="request.req"
                      type="text"
                      placeholder="Requerimiento"
                    />
                    <select class="custom-select" v-model="request.type">
                      <option>EI</option>
                      <option>EO</option>
                      <option>EQ</option>
                      <option>ILF</option>
                      <option>EIF</option>
                    </select>
                    <select class="custom-select" v-model.number="request.pts">
                      <template v-if="request.type === 'EO'">
                        <option>4</option>
                        <option>5</option>
                        <option>7</option>
                      </template>
                      <template v-else-if="request.type === 'ILF'">
                        <option>7</option>
                        <option>10</option>
                        <option>15</option>
                      </template>
                      <template v-else-if="request.type === 'EIF'">
                        <option>5</option>
                        <option>7</option>
                        <option>10</option>
                      </template>
                      <template v-else>
                        <option>3</option>
                        <option>4</option>
                        <option>6</option>
                      </template>
                    </select>
                    <div class="input-group-append">
                      <button
                        class="btn btn-outline-danger"
                        @click="requirementRemove(index)"
                        title="Quitar"
                      >
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                  <div class="d-flex justify-content-center">
                    <div class="btn-group">
                      <button
                        class="btn btn-outline-success"
                        @click="requirementAdd"
                        title="Agregar"
                      >
                        <i class="fas fa-plus"></i>
                      </button>
                      <button
                        class="btn btn-outline-success"
                        data-toggle="modal"
                        data-target="#import"
                        title="Importar"
                      >
                        <i class="fas fa-file-import"></i>
                      </button>
                    </div>
                  </div>
                </draggable>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- factors -->
      <div class="row mb-4">
        <div class="col">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h6 class="card-menu-title">Factores de ajuste</h6>
              <button class="btn-icon" data-toggle="collapse" data-target="#adjustment">
                <i class="fas fa-sort"></i>
              </button>
            </div>
            <div id="adjustment" class="collapse">
              <div class="card-body">
                <div class="d-flex no-gutters">
                  <div class="col-10">
                    <factors />
                  </div>
                  <div class="col-2">
                    <div class="input-group mb-3" v-for="(factor, index) in factors" :key="index">
                      <input
                        class="form-control text-center"
                        v-model.number="factor.pts"
                        type="number"
                        min="0"
                        max="5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- otros -->
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-header d-flex justify-content-between alilgn-items-center">
              <h6 class="card-menu-title">Costos adicionales</h6>
              <button class="btn-icon">
                <i class="fas fa-sort" data-toggle="collapse" data-target="#others"></i>
              </button>
            </div>
            <div id="others" class="collapse">
              <div class="card-body">
                <draggable v-model="others" animation="300" handle=".move">
                  <div class="input-group mb-3" v-for="(elm, index) in others" :key="index">
                    <div class="input-group-prepend">
                      <label class="input-group-text move">{{ index + 1 }}</label>
                    </div>
                    <input class="form-control w-50" v-model="elm.detail" type="text" />
                    <input
                      class="form-control text-center"
                      v-model.number="elm.value"
                      type="number"
                      min="0"
                    />
                    <div class="input-group-append">
                      <button
                        class="btn btn-outline-danger"
                        @click="otherRemove(index)"
                        title="Quitar"
                      >
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                  <div class="d-flex justify-content-center">
                    <div class="btn-group">
                      <button
                        class="btn btn-outline-success btn-sm"
                        @click="otherAdd"
                        title="Agregar"
                      >
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </draggable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- modal import -->
    <div id="import" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title">Importar Excel</h6>
            <button class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p class="text-center">
              Para una importación correcta es necesario que los encabezados titulen "Requerimiento"
              y "Tipo" respectivamente.
            </p>
            <form id="formExcel" @submit.prevent="importFile" class="needs-validation" novalidate>
              <div class="input-group has-validation mb-3">
                <div class="custom-file">
                  <input
                    class="custom-file-input"
                    type="file"
                    ref="file"
                    @change="handleFile"
                    required
                  />
                  <label class="custom-file-label" data-browse="Archivo">Seleccionar</label>
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
    <!-- modal save -->
    <div id="snapshotAdd" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title">Guardar</h6>
            <button class="close" data-dismiss="modal">
              <span aria-hiden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form
              id="formSnapshotAdd"
              @submit.prevent="snapshotAdd"
              class="needs-validation"
              novalidate
            >
              <div class="mb-3">
                <label for="branch">Rama</label>
                <input id="branch" class="form-control" v-model="branch" type="text" required />
              </div>
              <div class="mb-3">
                <label for="note">Nota</label>
                <textarea
                  id="note"
                  class="form-control"
                  v-model="note"
                  cols="30"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div class="d-flex justify-content-end">
                <button class="btn btn-primary">Guardar</button>
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
import draggable from 'vuedraggable'
import chartfp from '../components/chart_fp.vue'
import empty from '../components/empty.vue'
import load from '../components/load.vue'
import xlsx from 'xlsx'
import factors from '../components/factors.vue'
import {msg_error, opt_toast} from '../utilities/options'
export default {
  name: 'fp',
  components: {draggable, factors, chartfp, empty, load},
  data() {
    return {
      tkn_api: {headers: {token: this.$store.state.token}},
      chart: false,
      loader: true,
      id_owner: '',
      id_project: '',
      requirements: [],
      factors: [],
      params: {},
      aprox: {},
      others: [],
      branch: [],
      file: null,
      file_data: null,
      note: ''
    }
  },
  created() {
    this.getSnapshot()
  },
  computed: {
    time: function() {
      let res = 0
      res = this.aprox.effort / (this.params.hours * this.params.days * this.aprox.team)
      return (this.aprox.time = res)
    },
    cost: function() {
      let oth = 0,
        res = 0
      for (const elm of this.others) {
        oth = oth + elm.value
      }
      res = this.params.pays * this.aprox.team * this.aprox.time + oth
      return (this.aprox.cost = res)
    },
    effort: function() {
      let af = 0,
        afp = 0
      for (const elm of this.factors) {
        af = af + elm.pts
      }
      for (const elm of this.requirements) {
        afp = afp + elm.pts
      }
      return (this.aprox.effort = afp * (0.65 + 0.01 * af) * this.aprox.productivity)
    }
  },
  methods: {
    getSnapshot: function() {
      axios
        .get('fponly/' + this.$route.params.ids, this.tkn_api)
        .then(res => {
          this.id_owner = res.data.id_estimate.id_owner
          this.id_project = res.data.id_estimate.id_project
          this.requirements = res.data.requirements
          this.factors = res.data.factors
          this.params = res.data.params
          this.aprox = res.data.aprox
          this.others = res.data.others
          this.branch = res.data.branch
        })
        .catch(e => {
          if (e.response.status(500)) toastr.error(msg_error, null, opt_toast)
        })
      this.loader = false
    },
    snapshotAdd: function() {
      const form = document.querySelector('#formSnapshotAdd')
      if (form.checkValidity()) {
        let data = {}
        if (this.id_owner !== this.$store.state.user._id && this.branch === 'main') {
          alert(
            'Solo el propietario puede escribir en la rama "main" escoge otro nombre para la rama'
          )
        } else {
          data = {
            requirements: this.requirements,
            factors: this.factors,
            params: this.params,
            aprox: this.aprox,
            others: this.others,
            branch: this.branch,
            commit: this.note,
            id_estimate: this.$route.params.ide
          }
          axios
            .post('fpadd', data, this.tkn_api)
            .then(res => {
              $('#snapshotAdd').modal('hide')
              // enviar evento socket
              this.$store.state.socket.emit('snapshot-add', {room: this.id_project})
              // saltar a la rama creada o permancer
              this.$router.push({
                name: 'estimates',
                params: {idp: this.id_project}
              })
            })
            .catch(e => {
              if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
            })
        }
        form.classList.remove('was-validated')
      } else {
        form.classList.add('was-validated')
      }
    },
    requirementAdd: function() {
      this.requirements.push({req: '', type: '', pts: 0})
    },
    requirementRemove: function(index) {
      if (index > -1) this.requirements.splice(index, 1)
    },
    otherAdd: function() {
      this.others.push({detail: '', value: 0})
    },
    otherRemove: function(index) {
      if (index > -1) this.others.splice(index, 1)
    },
    handleFile: function(event) {
      if (!/\.(xls|xlsx)$/.test(event.target.files[0].name.toLowerCase())) {
        alert('El archivo seleccionado no es un archivo excel valido')
      } else {
        let f = event.target.files[0],
          reader = new FileReader()
        reader.onload = e => {
          let data = e.target.result
          this.file = xlsx.read(data, {type: 'array'})
          let sheetNames = this.file.SheetNames[0]
          let worksheet = this.file.Sheets[sheetNames]
          let json = xlsx.utils.sheet_to_json(worksheet)
          this.file_data = json
        }
        reader.readAsArrayBuffer(f)
      }
    },
    importFile: function() {
      const form = document.querySelector('#formExcel')
      if (form.checkValidity()) {
        if (this.file_data.some(elm => elm.hasOwnProperty('Requerimiento'))) {
          for (const elm of this.file_data) {
            this.requirements.push({
              req: elm.Requerimiento,
              type: elm.Tipo,
              pts: 0
            })
          }
        } else {
          alert('Error en el encabezado')
        }
      } else {
        form.classList.add('was-validated')
      }
      $('#import').modal('hide')
      this.file = null
      this.file_data = null
    },
    showChart: function() {
      this.chart = !this.chart
    }
  }
}
</script>
