<script>
import {Pie} from 'vue-chartjs'
export default {
  name: 'chartcat',
  extends: Pie,
  props: ['info'],
  computed: {
    updateInfo: function() {
      return this.info
    }
  },
  watch: {
    info: function() {
      this.draw()
    }
  },
  mounted() {
    this.draw()
  },
  methods: {
    draw: function() {
      this.renderChart(
        {
          labels: this.updateInfo.map(elm => {
            return elm.name
          }),
          datasets: [
            {
              data: this.updateInfo.map(elm => {
                return elm.pro.length
              }),
              backgroundColor: [
                'rgba(244, 67, 54, 0.2)',
                'rgba(233, 30, 99, 0.2)',
                'rgba(156, 39, 176, 0.2)',
                'rgba(103, 58, 183, 0.2)',
                'rgba(63, 81, 181, 0.2)',
                'rgba(33, 150, 243, 0.2)',
                'rgba(3, 169, 244, 0.2)',
                'rgba(0, 188, 212, 0.2)',
                'rgba(0, 137, 123, 0.2)',
                'rgba(67, 160, 71, 0.2)',
                'rgba(139, 195, 74, 0.2)',
                'rgba(205, 220, 57, 0.2)',
                'rgba(255, 235, 59, 0.2)',
                'rgba(255, 193, 7, 0.2)',
                'rgba(255, 152, 0, 0.2)',
                'rgba(255, 87, 34, 0.2)',
                'rgba(121, 85, 72, 0.2)',
                'rgba(158, 158, 158, 0.2)'
              ]
            }
          ]
        },
        {
          responsive: true,
          maintainAspectRatio: false
        }
      )
    }
  }
}
</script>
