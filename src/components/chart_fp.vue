<script>
import {Bar} from 'vue-chartjs'

export default {
  extends: Bar,
  props: ['info', 'aprox', 'tag', 'color'],
  data() {
    return {
      total: 0
    }
  },
  mounted() {
    this.draw()
  },
  computed: {
    updateInfo: function() {
      return this.info
    },
    updateAprox: function() {
      return this.aprox
    },
    calcTotal: function() {
      this.updateInfo.forEach(element => {
        this.total = this.total + element.pts
      })
      return this.total
    }
  },
  watch: {
    info: function() {
      this.draw()
    },
    aprox: function() {
      this.draw()
    }
  },
  methods: {
    draw: function() {
      this.renderChart(
        {
          labels: this.updateInfo.map(function(elm, index) {
            return `Req. ${index + 1} ${elm.type}`
          }),
          datasets: [
            {
              label: this.tag,
              backgroundColor: this.color,
              data: this.updateInfo.map(elm => {
                return parseFloat((elm.pts / this.calcTotal) * this.updateAprox).toFixed(2)
              })
            }
          ]
        },
        {
          responsive: true,
          maintainAspectRatio: false,
          scales: {yAxes: [{ticks: {beginAtZero: true}}]}
        }
      )
    }
  }
}
</script>
