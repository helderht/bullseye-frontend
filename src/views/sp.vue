<template>
  <div>
    <!-- tool bar -->
    <div class="d-flex justify-content-between align-items-center sticky-top bg-nav p-1">
      <p class="address">Puntos historia</p>
      <div class="d-flex btn-group">
        <button
          class="btn btn-outline-light btn-sm"
          data-toggle="modal"
          data-target="#save"
          title="Guardar"
        >
          <i class="fas fa-save"></i>
        </button>
        <button class="btn btn-outline-light btn-sm" @click="chart = !chart" title="Reporte">
          <i class="fas fa-chart-area"></i>
        </button>
        <button class="btn btn-outline-light btn-sm" @click="leavePoker" title="Salir poker">
          <i class="fas fa-phone-slash"></i>
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
              <h3 class="text-muted">{{ parseFloat(productivity).toFixed(2) }}</h3>
              <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">Horas/PH</small>
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
              <h6 class="card-menu-title">Reporte</h6>
            </div>
            <div class="card-body">
              <div v-if="stories.length > 0">
                <h6 class="text-center">Tiempo estimado</h6>
                <chartsp :stories="stories" :aprox="time" tag="Meses" color="#dc3545" />
              </div>
              <empty v-else message="Sin historias" />
              <div v-if="cost > 0">
                <h6 class="text-center">Costo estimado</h6>
                <chartsp :stories="stories" :aprox="cost" tag="Dólares" color="#198754" />
              </div>
              <empty v-else message="Sin costos" />
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
                      <span class="input-group-text"><i class="fas fa-sync"></i></span>
                      <span class="input-group-text">Sprint</span>
                    </div>
                    <input
                      class="form-control text-center"
                      v-model.number="params.sprint"
                      type="number"
                      min="1"
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
                      min="1"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-lg-4 mb-3">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="fas fa-stopwatch"></i></span>
                      <span class="input-group-text">Velocidad</span>
                    </div>
                    <input
                      class="form-control text-center"
                      v-model="aprox.velocity"
                      type="number"
                      min="1"
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
                      max="23"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- stories -->
      <div class="row mb-4">
        <div class="col">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h6 class="card-menu-title">Historias</h6>
              <span class="text-info">{{ ph_total }} PH</span>
              <button class="btn-icon" data-toggle="collapse" data-target="#stories">
                <i class="fas fa-sort"></i>
              </button>
            </div>
            <div id="stories" class="collapse">
              <div class="card-body">
                <draggable v-model="stories" @change="onChange" animation="300" handle=".move">
                  <div class="input-group mb-3" v-for="(story, index) in stories" :key="index">
                    <div class="input-group-prepend">
                      <span class="move input-group-text">{{ index + 1 }}</span>
                    </div>
                    <input class="form-control" v-model="story.detail" type="text" readonly />
                    <div class="input-group-append">
                      <span class="input-group-text">{{ story.pts }}</span>
                      <button class="btn btn-outline-danger" @click="storyRemove(index)">
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                </draggable>
                <div class="d-flex input-group">
                  <input class="form-control" v-model="story_detail" type="text" />
                  <div class="input-group-append">
                    <button class="btn btn-outline-success" @click="storyAdd">
                      <i class="fas fa-plus"></i>
                    </button>
                    <button
                      class="btn btn-outline-success"
                      data-toggle="modal"
                      data-target="#importFile"
                      title="Importar"
                    >
                      <i class="fas fa-file-import"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- pivot & story -->
      <div class="row">
        <div class="col-md-6 mb-4">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h6 class="card-menu-title">Pivote</h6>
              <div class="dropdown">
                <button class="btn-icon" data-toggle="dropdown">
                  <i class="fas fa-ellipsis-v"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-right">
                  <h6 class="dropdown-header" href="#">Opciones</h6>
                  <a
                    class="dropdown-item"
                    @click="copyPivot"
                    data-toggle="modal"
                    href="#pivotUpdate"
                    ><i class="fas fa-pen"></i> Editar</a
                  >
                </div>
              </div>
            </div>
            <div class="card-body">
              <p class="card-text">{{ pivot.detail }}</p>
              <div class="d-flex justify-content-center">
                <small class="text-info">{{ pivot.pts }} Puntos Historia</small>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-4">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h6 class="card-menu-title">Historia # {{ temp_index + 1 }}</h6>
              <div class="dropdown">
                <button class="btn-icon" data-toggle="dropdown">
                  <i class="fas fa-ellipsis-v"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-right">
                  <h6 class="dropdown-header" href="#">Opciones</h6>
                  <a class="dropdown-item" href="#">Item</a>
                </div>
              </div>
            </div>
            <div class="card-body">
              <p class="card-text">{{ temp_story.detail }}</p>
              <div class="d-flex justify-content-center">
                <small class="text-info">{{ temp_story.pts }} puntos historia</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- board -->
      <div class="row mb-4">
        <div class="col">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h6 class="card-menu-title">Tablero Poker</h6>
              <div class="d-flex align items-center">
                <button class="btn-icon" @click="undo" title="Reanudar">
                  <i class="fas fa-undo"></i>
                </button>
                <button class="btn-icon" @click="back" title="Anterior">
                  <i class="fas fa-arrow-left"></i>
                </button>
                <button class="btn-icon" @click="forward" title="Siguiente">
                  <i class="fas fa-arrow-right"></i>
                </button>
                <button class="btn-icon" @click="confirm" title="Confirmar">
                  <i class="fas fa-check"></i>
                </button>
              </div>
            </div>
            <div class="card-body">
              <div class="board">
                <div class="d-flex justify-content-center align-items-center mb-3">
                  <draggable
                    class="d-flex justify-content-center area-drag bg-light"
                    v-model="board"
                    animation="300"
                    group="poker"
                    @change="release"
                    :sort="false"
                  >
                    <div class="text-center" v-for="(elm, index) in board" :key="index">
                      <div class="card-only-select">
                        <img :src="`/img/${elm.img}`" v-if="show_board" alt="" width="20px" />
                        <img src="../assets/circle.svg" v-else alt="" width="20px" />
                      </div>
                      <small class="text-dark">{{ elm.user }}</small>
                    </div>
                  </draggable>
                </div>
              </div>
              <div class="responsive-h">
                <draggable
                  class="d-flex"
                  v-model="deck"
                  animation="300"
                  :group="{name: 'poker', pull: 'clone', put: false}"
                  :sort="false"
                >
                  <div class="card-only" v-for="(elm, index) in deck" :key="index">
                    <img :src="`/img/${elm.img}`" alt="card" width="20px" />
                  </div>
                </draggable>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- chat -->
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h6 class="card-menu-title">Chat</h6>
              <button class="btn-icon" data-toggle="collapse" data-target="#chat">
                <i class="fas fa-sort"></i>
              </button>
            </div>
            <div id="chat" class="collapse">
              <div class="card-body">
                <div class="row">
                  <div class="col-8">
                    <div class="responsive-chat">
                      <div class="d-flex justify-content-end">
                        <div class="d-flex pt-3">
                          <img
                            class="order-2 mx-2"
                            src="../assets/user.svg"
                            alt="user"
                            width="32px"
                          />
                          <div class="border border-primary px-3 pt-2">
                            <small class="text-muted">Fecha - User</small>
                            <p>
                              Lorem ipsum dolor sit amet consectetur.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex justify-content-start">
                        <div class="d-flex pt-3">
                          <img class="mx-2" src="../assets/user.svg" alt="user" width="32px" />
                          <div class="border border-dark px-3 pt-2">
                            <small class="text-muted">Fecha - User</small>
                            <p class="">
                              Lorem ipsum dolor sit amet consectetur.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form">
                      <div class="input-group">
                        <input class="form-control" type="text" placeholder="Mensaje" />
                        <div class="input-group-append">
                          <button class="btn btn-outline-primary">
                            <i class="fas fa-paper-plane"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-4 responsive-chat">
                    <ul class="list-group rounded-0">
                      <li
                        class="list-group-item"
                        v-for="member in users_connected"
                        :key="member.id"
                      >
                        {{ member.name }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- modal import -->
    <div id="importFile" class="modal fade">
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
              Para una importación correcta es necesario que el encabezado titule "Historia".
            </p>
            <form
              id="formImportFile"
              class="needs-validation"
              @submit.prevent="importFile"
              novalidate
            >
              <div class="input-group mb-3">
                <input
                  class="custom-file-input"
                  @change="handleFile"
                  type="file"
                  ref="file"
                  required
                />
                <label class="custom-file-label" data-browse="Archivo">Seleccionar</label>
              </div>
              <div class="d-flex justify-content-center">
                <button class="btn btn-primary">Aceptar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- modal pivot update -->
    <div id="pivotUpdate" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title">Editar pivote</h6>
            <button class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form
              id="formPivotUpdate"
              class="needs-validation"
              @submit.prevent="pivotUpdate"
              novalidate
            >
              <div class="mb-3">
                <label for="pivot">Pivote</label>
                <textarea
                  id="pivot"
                  class="form-control"
                  v-model="copy_pivot.detail"
                  cols="30"
                  rows="3"
                  required
                ></textarea>
                <small class="invalid-feedback">La historia no puede estar vacia</small>
              </div>
              <div class="mb-3">
                <label for="puntosh">Puntos historia</label>
                <input
                  class="form-control"
                  v-model="copy_pivot.pts"
                  type="number"
                  min="0"
                  required
                />
                <small class="invalid-feedback">Definir valor para el pivote</small>
              </div>
              <div class="d-flex justify-content-end">
                <button class="btn btn-primary">Aceptar</button>
              </div>
            </form>
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
            <form id="formSaveSP" class="needs-validation" @submit.prevent="snapshotAdd" novalidate>
              <div class="mb-3">
                <label for="branchsp">Rama</label>
                <input id="branchsp" class="form-control" v-model="branch" type="text" required />
                <small class="invalid-feedback">Escribe el nombre de la rama</small>
              </div>
              <div class="mb-3">
                <label for="notesp">Nota</label>
                <textarea
                  id="notesp"
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
import load from '../components/load.vue'
import empty from '../components/empty.vue'
import chartsp from '../components/chart_sp.vue'
import draggable from 'vuedraggable'
import {msg_error, opt_toast} from '../utilities/options'
import xlsx from 'xlsx'
export default {
  name: 'sp',
  components: {load, draggable, empty, chartsp},
  data() {
    return {
      loader: true,
      deck: [
        {img: 'dibujo0.svg', value: 0},
        {img: 'dibujo1_2.svg', value: 0.5},
        {img: 'dibujo1.svg', value: 1},
        {img: 'dibujo2.svg', value: 2},
        {img: 'dibujo3.svg', value: 3},
        {img: 'dibujo5.svg', value: 5},
        {img: 'dibujo8.svg', value: 8},
        {img: 'dibujo13.svg', value: 13},
        {img: 'dibujo20.svg', value: 20},
        {img: 'dibujo40.svg', value: 40},
        {img: 'dibujo100.svg', value: 100},
        {img: 'dibujo101.svg', value: '?'},
        {img: 'dibujo102.svg', value: '@'}
      ],
      tkn_api: {headers: {token: this.$store.state.token}},
      id_project: '',
      id_owner: '',
      users_connected: [],
      temp_index: 0,
      temp_story: {},
      story_detail: '',
      board: [],
      show_board: false,
      copy_pivot: {},
      note: '',
      file: null,
      file_data: null,
      chart: false,
      // data save
      stories: [],
      pivot: {},
      params: {},
      aprox: {},
      others: {},
      branch: ''
    }
  },
  created() {
    this.getSnapshot()
    this.joinPoker()
    this.onEventsPoker()
  },
  computed: {
    ph_total: function() {
      let total = 0
      this.stories.forEach(elm => {
        total = total + elm.pts
      })
      return total
    },
    productivity: function() {
      return (this.params.sprint * this.params.hours) / this.aprox.velocity
    },
    time: function() {
      let total = 0
      this.stories.forEach(elm => {
        total = total + elm.pts
      })
      return (this.aprox.time =
        (this.params.sprint * this.params.hours * total) /
        (this.aprox.velocity * this.params.hours * this.params.days * this.aprox.team))
    },
    cost: function() {
      return (this.aprox.cost = this.params.pays * this.aprox.team * this.aprox.time)
    }
  },
  methods: {
    getSnapshot: function() {
      axios
        .get('sponly/' + this.$route.params.ids, this.tkn_api)
        .then(res => {
          this.id_project = res.data.id_estimate.id_project
          this.id_owner = res.data.id_estimate.id_owner
          this.stories = res.data.stories
          this.pivot = res.data.pivot
          this.params = res.data.params
          this.aprox = res.data.aprox
          this.branch = res.data.branch
          this.temp_story = {...res.data.stories[0]}
        })
        .catch(e => {
          if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
        })
      this.loader = false
    },
    snapshotAdd: function() {
      const form = document.querySelector('#formSaveSP')
      if (form.checkValidity()) {
        if (this.id_owner !== this.$store.state.user._id && this.branch === 'main') {
          alert(
            'Solo el propietario puede escribir en la rama "main" escoge otro nombre para la rama'
          )
        } else {
          let data = {
            stories: this.stories,
            pivot: this.pivot,
            params: this.params,
            aprox: this.aprox,
            branch: this.branch,
            commit: this.note,
            id_estimate: this.$route.params.ide
          }
          axios
            .post('spadd', data, this.tkn_api)
            .then(res => {
              $('#save').modal('hide')
              // socket
              this.$store.state.socket.emit('snapshot-add', {room: this.id_project})
              // redirect
              this.$router.push({name: 'estimates', params: {idp: this.id_project}})
            })
            .catch(e => {
              if (e.response.status === 404)
                toastr.error('La estimación no existe', null, opt_toast)
              else toastr.error(msg_error, null, opt_toast)
            })
        }
      } else {
        form.classList.add('was-validated')
      }
    },
    onEventsPoker: function() {
      /* this.$store.state.socket.on('joined-poker', data => {
        console.log(data)
      }) */
      this.$store.state.socket.on('info-poker', ({members}) => {
        this.users_connected = []
        this.users_connected = members
      })
      this.$store.state.socket.on('refreshed', ({stories, pivot, temp_index}) => {
        this.stories = stories
        this.pivot = pivot
        this.temp_index = temp_index
        this.temp_story = {...this.stories[temp_index]}
        this.board = []
        this.show_board = false
      })
      this.$store.state.socket.on('update-board', ({board}) => {
        this.board = board
        this.show_board = false
        if (this.board.length === this.users_connected.length) this.show_board = true
      })
    },
    joinPoker: function() {
      this.$store.state.socket.emit('join-poker', {
        room: this.$route.params.ids,
        client: this.$store.state.user
      })
    },
    leavePoker: function() {
      this.$store.state.socket.emit('leave-room', {
        room: this.$route.params.ids,
        cliente: this.$store.state.user
      })
      this.$router.push({name: 'board'})
    },
    pivotUpdate: function() {
      const form = document.querySelector('#formPivotUpdate')
      if (form.checkValidity()) {
        this.$store.state.socket.emit('refresh', {
          room: this.$route.params.ids,
          stories: this.stories,
          pivot: this.copy_pivot,
          temp_index: this.temp_index
        })
        $('#pivotUpdate').modal('hide')
      } else {
        form.classList.add('was-validated')
      }
    },
    storyAdd: function() {
      this.stories.push({detail: this.story_detail, pts: 0})
      // this.temp_story = {...this.stories[0]}
      this.$store.state.socket.emit('refresh', {
        room: this.$route.params.ids,
        stories: this.stories,
        pivot: this.pivot,
        temp_index: this.temp_index
      })
      this.story_detail = ''
    },
    storyRemove: function(index) {
      if (index > -1) {
        this.stories.splice(index, 1)
        this.$store.state.socket.emit('refresh', {
          room: this.$route.params.ids,
          stories: this.stories,
          pivot: this.pivot,
          temp_index: this.temp_index
        })
      }
    },
    onChange: function(event) {
      this.$store.state.socket.emit('refresh', {
        room: this.$route.params.ids,
        stories: this.stories,
        pivot: this.pivot,
        temp_index: this.temp_index
      })
    },
    release: function(event) {
      this.board[event.added.newIndex].user = this.$store.state.user.name
      let cards = this.board.filter(elm => elm.user === this.$store.state.user.name)
      if (cards.length > 1) {
        toastr.info('No puedes lanzar más de una carta', null, opt_toast)
        this.board.splice(event.added.newIndex, 1)
      } else {
        this.$store.state.socket.emit('refresh-board', {
          room: this.$route.params.ids,
          board: this.board
        })
      }
    },
    undo: function() {
      this.$store.state.socket.emit('refresh-board', {
        room: this.$route.params.ids,
        board: []
      })
    },
    back: function() {
      if (this.temp_index > 0) {
        this.$store.state.socket.emit('refresh', {
          room: this.$route.params.ids,
          stories: this.stories,
          pivot: this.pivot,
          temp_index: this.temp_index - 1
        })
      }
    },
    forward: function() {
      if (this.temp_index < this.stories.length - 1) {
        this.$store.state.socket.emit('refresh', {
          room: this.$route.params.ids,
          stories: this.stories,
          pivot: this.pivot,
          temp_index: this.temp_index + 1
        })
      }
    },
    confirm: function() {
      if (this.board.length === this.users_connected.length) {
        if (this.stories.length > 0) {
          if (this.board.some(elm => elm.value === '@' || elm.value === '?')) {
            toastr.error('Necesitan debatir', null, opt_toast)
          } else {
            let max = 0
            for (const elm of this.board) {
              if (elm.value > max) max = elm.value
            }
            if (this.temp_index < this.stories.length - 1) {
              this.stories[this.temp_index].pts = max
              this.$store.state.socket.emit('refresh', {
                room: this.$route.params.ids,
                stories: this.stories,
                pivot: this.pivot,
                temp_index: this.temp_index + 1
              })
            } else {
              this.stories[this.temp_index].pts = max
              this.$store.state.socket.emit('refresh', {
                room: this.$route.params.ids,
                stories: this.stories,
                pivot: this.pivot,
                temp_index: this.temp_index
              })
              toastr.success('Fin', null, opt_toast)
            }
          }
        } else {
          toastr.error('Sin historias', null, opt_toast)
        }
      } else {
        toastr.error('Faltan cartas', null, opt_toast)
      }
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
      const form = document.querySelector('#formImportFile')
      if (form.checkValidity()) {
        if (this.file_data.some(elm => elm.hasOwnProperty('Historia'))) {
          this.file_data.forEach(elm => {
            this.stories.push({
              detail: elm.Historia,
              pts: 0
            })
          })
          this.$store.state.socket.emit('refresh', {
            room: this.$route.params.ids,
            stories: this.stories,
            pivot: this.pivot,
            temp_index: this.temp_index
          })
        } else {
          alert('Error en el encabezado')
        }
        form.classList.remove('was-validated')
      } else {
        form.classList.add('was-validated')
      }
      $('#importFile').modal('hide')
      this.file = null
      this.file_data = null
    },
    copyPivot: function() {
      this.copy_pivot = {...this.pivot}
    }
  }
}
</script>
