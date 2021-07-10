<script>
import {Bar} from 'vue-chartjs'
export default {
  name: 'chartsp',
  extends: Bar,
  props: ['stories', 'aprox', 'tag', 'color'],
  data() {
    return {
      total: 0
    }
  },
  mounted() {
    this.draw()
  },
  computed: {
    updateStories: function() {
      return this.stories
    },
    updateAprox: function() {
      return this.aprox
    },
    calcSP: function() {
      this.updateStories.forEach(elm => {
        this.total = this.total + elm.pts
      })
      return this.total
    }
  },
  watch: {
    stories: function() {
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
          labels: this.updateStories.map(function(elm, index) {
            return `hist. ${index + 1}`
          }),
          datasets: [
            {
              label: this.tag,
              backgroundColor: this.color,
              data: this.updateStories.map(elm => {
                return parseFloat((elm.pts / this.calcSP) * this.updateAprox).toFixed(2)
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
