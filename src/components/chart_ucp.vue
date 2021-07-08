<script>
import {Bar} from 'vue-chartjs'
export default {
  name: 'chartucp',
  extends: Bar,
  props: ['cases', 'aprox', 'tag', 'color'],
  data() {
    return {
      total: 0
    }
  },
  mounted() {
    this.draw()
  },
  computed: {
    updateCases: function() {
      return this.cases
    },
    updateAprox: function() {
      return this.aprox
    },
    calcTotal: function() {
      this.updateCases.forEach(elm => {
        this.total = this.total + elm.weight * elm.amount
      })
      return this.total
    }
  },
  watch: {
    cases: function() {
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
          labels: ['Simples', 'Medio', 'Complejo'],
          datasets: [
            {
              label: this.tag,
              backgroundColor: this.color,
              data: this.updateCases.map(elm => {
                return parseFloat(
                  ((elm.weight * elm.amount) / this.calcTotal) * this.updateAprox
                ).toFixed(2)
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
