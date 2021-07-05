<template>
  <div>
    <!-- tool bar -->
    <div class="d-flex justify-content-between align-items-center bg-nav p-1">
      <p class="address">Historial</p>
      <div class="d-flex">
        <input
          class="form-control form-control-sm"
          v-model="activity_wanted"
          type="search"
          placeholder="Buscar"
        />
      </div>
    </div>
    <!-- content -->
    <div class="container-fluid">
      <load v-if="loader" />
      <div class="row justify-content-center mt-4" v-else>
        <div class="col-lg-10">
          <h4 class="text-dark font-weight-bold">{{ project.name }}</h4>
          <div class="timeline">
            <div class="timeline-item" v-for="activity in searchActivity" :key="activity._id">
              <div class="card-timeline">
                <div class="card-timeline-date">{{ formatDate(activity.registeredIn) }}</div>
                <div class="card-timeline-event">
                  <img
                    class="card-timeline-event-img"
                    :src="`${link_api}assets/avatars/${activity.id_user.img}`"
                    alt="cover"
                  />
                  <div class="card-timeline-event-text">
                    <h6 class="text-black-50">
                      {{ activity.id_user.name }}
                      <span class="text-primary">{{ activity.operation }}</span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
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
import {LINK_API} from '../utilities/links'
import {msg_error, opt_toast} from '../utilities/options'
export default {
  name: 'history',
  components: {load},
  data() {
    return {
      link_api: LINK_API,
      tkn_api: {headers: {token: this.$store.state.token}},
      project: {},
      all_activities: [],
      loader: true,
      activity_wanted: ''
    }
  },
  created() {
    this.getActivities()
    this.getProject()
  },
  computed: {
    searchActivity: function() {
      return this.all_activities.filter(elm =>
        elm.operation.toLowerCase().includes(this.activity_wanted.toLowerCase())
      )
    }
  },
  methods: {
    getProject: function() {
      axios
        .get('proonly/' + this.$route.params.idp, this.tkn_api)
        .then(res => {
          this.project = res.data
        })
        .catch(e => {
          if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
        })
    },
    getActivities: function() {
      axios
        .get('actall/' + this.$route.params.idp, this.tkn_api)
        .then(res => {
          this.all_activities = res.data
          this.loader = false
        })
        .catch(e => {
          if (e.response.status === 500) toastr.error(msg_error, null, opt_toast)
        })
    },
    formatDate: function(date) {
      moment.locale('es')
      return moment(date).format('DD MMM YYYY - hh:mm')
    }
  }
}
</script>
