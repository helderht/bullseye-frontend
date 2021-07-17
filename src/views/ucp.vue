<template>
  <div>
    <!-- tool bar -->
    <div class="d-flex justify-content-between align-items-center sticky-top bg-nav p-1">
      <p class="address">Puntos casos de uso</p>
      <div class="d-flex btn-group">
        <button class="btn btn-outline-light btn-sm" data-toggle="modal" data-target="#save">
          <i class="fas fa-save"></i>
        </button>
        <button class="btn btn-outline-light btn-sm" @click="showChart">
          <i class="fas fa-chart-line"></i>
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
                <small class="text-muted">Meses</small>
                <i class="fas fa-money-bill text-success"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-lg-3 mb-4">
          <div class="card">
            <div class="card-body">
              <h6 class="text-center font-weight-normal text-warning">Equipo</h6>
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
              <h3 class="text-muted">{{ productivity }}</h3>
              <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">Horas/CU</small>
                <i class="fas fa-tachometer-alt text-info"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- charts -->
      <div class="row mb-4" v-if="chart">
        <div class="col">
          <div class="card">
            <div class="card-header">
              <h6 class="card-menu-title">Reportes</h6>
            </div>
            <div class="card-body">
              <div>
                <h6 class="text-center">Tiempo estimado</h6>
                <chartucp :cases="cases" :aprox="time" tag="Meses" color="#dc3545" />
              </div>
              <empty message="Sin casos de uso" />
              <div>
                <h6 class="text-center">Costo estimado</h6>
                <chartucp :cases="cases" :aprox="cost" tag="Costo" color="#198754" />
              </div>
              <empty message="Sin costos" />
            </div>
          </div>
        </div>
      </div>
      <!-- params -->
      <div class="row mb-4">
        <div class="col">
          <div class="card">
            <div class="card-header">
              <h6 class="card-menu-title">Parámetros</h6>
            </div>
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
                      min="1"
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
                      min="1"
                      max="31"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-lg-4 mb-3">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="fas fa-users"></i></span>
                      <span class="input-group-text">Personas</span>
                    </div>
                    <input
                      class="form-control text-center"
                      v-model.number="aprox.team"
                      type="number"
                      min="1"
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
                      v-model.number="productivity"
                      type="number"
                      readonly
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
                      v-model.number="params.pays"
                      type="number"
                      min="0"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-lg-4 mb-3">
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
      <!-- actors & use cases -->
      <div class="row mb-4">
        <div class="col-sm-6">
          <div class="card">
            <div class="card-header">
              <h6 class="card-menu-title">Actores</h6>
            </div>
            <div class="card-body">
              <div class="d-flex no-gutters">
                <div class="col"><types /></div>
                <div class="col">
                  <div class="input-group mb-3" v-for="(actor, index) in actors" :key="index">
                    <input
                      class="form-control text-center"
                      v-model.number="actor.amount"
                      type="number"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card">
            <div class="card-header">
              <h6 class="card-menu-title">Casos de uso</h6>
            </div>
            <div class="card-body">
              <div class="d-flex no-gutters">
                <div class="col"><types /></div>
                <div class="col">
                  <div class="input-group mb-3" v-for="(usecase, index) in cases" :key="index">
                    <input
                      class="form-control text-center"
                      v-model.number="usecase.amount"
                      type="number"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- technical -->
      <div class="row mb-4">
        <div class="col">
          <div class="card">
            <div class="card-header d-flex justify-content-between aling-item-center">
              <h6 class="card-menu-title">Factores técnicos</h6>
              <button class="btn-icon" data-toggle="collapse" data-target="#technical">
                <i class="fas fa-sort"></i>
              </button>
            </div>
            <div id="technical" class="collapse">
              <div class="card-body">
                <div class="d-flex no-gutters">
                  <div class="col-md-9">
                    <technical />
                  </div>
                  <div class="col-md-3">
                    <div class="input-group mb-3" v-for="(factor, index) in technical" :key="index">
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
      <!-- enviroment -->
      <div class="row mb-4">
        <div class="col">
          <div class="card">
            <div class="card-header d-flex justify-content-between aling-item-center">
              <h6 class="card-menu-title">Factores de entorno</h6>
              <button class="btn-icon" data-toggle="collapse" data-target="#enviroment">
                <i class="fas fa-sort"></i>
              </button>
            </div>
            <div id="enviroment" class="collapse">
              <div class="card-body">
                <div class="d-flex no-gutters">
                  <div class="col-md-9">
                    <enviroment />
                  </div>
                  <div class="col-md-3">
                    <div
                      class="input-group mb-3"
                      v-for="(factor, index) in enviroment"
                      :key="index"
                    >
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
      <!-- cost add -->
      <div class="row mb-4">
        <div class="col">
          <div class="card">
            <div class="card-header d-flex justify-content-between aling-items-center">
              <h6 class="card-menu-title">Costos adicionales</h6>
              <button class="btn-icon" data-toggle="collapse" data-target="#costAdd">
                <i class="fas fa-sort"></i>
              </button>
            </div>
            <div id="costAdd" class="collapse">
              <div class="card-body">
                <draggable v-model="others" animation="300" handle=".move">
                  <div class="input-group mb-3" v-for="(elm, index) in others" :key="index">
                    <div class="input-group-prepend">
                      <label class="input-group-text move">{{ index + 1 }}</label>
                    </div>
                    <input class="form-control w-50" v-model="elm.detail" type="text" />
                    <input class="form-control" v-model.number="elm.value" type="number" min="0" />
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
                </draggable>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- modal save -->
    <div id="save" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title">Guardar</h6>
            <button class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="formSave" class="needs-validation" @submit.prevent="snapshotAdd" novalidate>
              <div class="mb-3">
                <label for="ucpbranch">Rama</label>
                <input id="ucpbranch" class="form-control" v-model="branch" type="text" required />
                <small class="invalid-feedback">Escribe el nombre de la rama</small>
              </div>
              <div class="mb-3">
                <label for="ucpnote">Nota</label>
                <textarea
                  id="ucpnote"
                  class="form-control"
                  v-model="note"
                  cols="30"
                  rows="3"
                  required
                ></textarea>
                <small class="invalid-feedback">Escribe los cambios que hiciste</small>
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
import load from '../components/load'
import empty from '../components/empty'
import types from '../components/types.vue'
import technical from '../components/technical.vue'
import enviroment from '../components/enviroment.vue'
import draggable from 'vuedraggable'
import chartucp from '../components/chart_ucp.vue'
import {msg_error, opt_toast} from '../utilities/options'
export default {
  nam: 'ucp',
  components: {load, empty, types, technical, enviroment, enviroment, draggable, chartucp},
  data() {
    return {
      tkn_api: {headers: {token: this.$store.state.token}},
      loader: true,
      chart: false,
      id_owner: null,
      id_project: null,
      actors: [],
      cases: [],
      technical: [],
      enviroment: [],
      params: {},
      aprox: {},
      others: [],
      branch: '',
      note: ''
    }
  },
  created() {
    this.getSnapshot()
  },
  computed: {
    productivity: function() {
      let count = 0
      for (let i = 0; i < this.enviroment.length; i++) {
        if (this.enviroment[i].pts <= 3 && i < 6) {
          count = count + 1
        } else if (this.enviroment[i].pts > 3 && i > 5) {
          count = count + 1
        }
      }
      if (count <= 2) {
        return (this.aprox.productivity = 20)
      } else if (count > 2 && count <= 4) {
        return (this.aprox.productivity = 28)
      } else {
        return (this.aprox.productivity = 36)
      }
    },
    effort: function() {
      // actors
      let ac = 0
      this.actors.forEach(elm => {
        ac = ac + elm.weight * elm.amount
      })
      // cases
      let uc = 0
      this.cases.forEach(elm => {
        uc = uc + elm.weight * elm.amount
      })
      // tech
      let te = 0
      this.technical.forEach(elm => {
        te = te + elm.weight * elm.pts
      })
      let tf = 0.6 + 0.01 * te
      // env
      let en = 0
      this.enviroment.forEach(elm => {
        en = en + elm.weight * elm.pts
      })
      let ef = 1.4 - 0.03 * en
      // effort
      let eff = (ac + uc) * tf * ef * this.aprox.productivity
      return (this.aprox.effort = eff)
    },
    time: function() {
      let res = this.aprox.effort / (this.params.hours * this.params.days * this.aprox.team)
      return (this.aprox.time = res)
    },
    cost: function() {
      let res = this.aprox.team * this.aprox.time * this.params.pays
      let resOt = 0
      this.others.forEach(elm => {
        resOt = resOt + elm.value
      })
      return (this.aprox.cost = res + resOt)
    }
  },
  methods: {
    showChart: function() {
      this.chart = !this.chart
    },
    getSnapshot: function() {
      axios
        .get('ucponly/' + this.$route.params.ids, this.tkn_api)
        .then(res => {
          this.id_owner = res.data.id_estimate.id_owner
          this.id_project = res.data.id_estimate.id_project
          this.actors = res.data.actors
          this.cases = res.data.cases
          this.technical = res.data.technical
          this.enviroment = res.data.enviroment
          this.params = res.data.params
          this.aprox = res.data.aprox
          this.others = res.data.others
          this.branch = res.data.branch
        })
        .catch(e => {
          if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
        })
      this.loader = false
    },
    snapshotAdd: function() {
      const form = document.querySelector('#formSave')
      if (form.checkValidity()) {
        if (this.id_owner !== this.$store.state.user._id && this.branch === 'main') {
          alert(
            'Solo el propietario puede escribir en la rama "main" escoge otro nombre para la rama'
          )
        } else {
          let data = {
            actors: this.actors,
            cases: this.cases,
            technical: this.technical,
            enviroment: this.enviroment,
            params: this.params,
            aprox: this.aprox,
            others: this.others,
            branch: this.branch,
            commit: this.note,
            id_estimate: this.$route.params.ide
          }
          axios
            .post('ucpadd', data, this.tkn_api)
            .then(res => {
              $('#save').modal('hide')
              //socket
              this.$store.state.socket.emit('snapshot-add', {room: this.id_project})
              // redirect
              this.$router.push({name: 'estimates', params: {idp: this.id_project}})
            })
            .catch(e => {
              if (e.response.status === 404) {
                toastr.error('La estimación no existe', null, opt_toast)
              } else {
                toastr.error(msg_error, null, opt_toast)
              }
            })
        }
      } else {
        form.classList.add('was-validated')
      }
    },
    otherAdd: function() {
      this.others.push({detail: '', value: 0})
    },
    otherRemove: function(index) {
      if (index > -1) this.others.splice(index, 1)
    }
  }
}
</script>
