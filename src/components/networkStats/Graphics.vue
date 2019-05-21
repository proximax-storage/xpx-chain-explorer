<template>
  <div class="graphics">
    <canvas id="graphic-1" class="standard-canvas" height="250"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  name: 'Graphics',
  mounted () {
    const ctx = this.$el.children[0].getContext('2d')

    // eslint-disable-next-line
    const graphic1 = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 30, 3, 5, 2, 20],
            backgroundColor: [
              'red',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
            ],
            borderWidth: 3
          },
          {
            label: '# of Votes',
            data: [12, 10, 3, 5, 2, 5, 7],
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 3
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
  }
}
</script>

<style lang="sass" scoped>
.standard-canvas
  box-sizing: border-box
  padding: 10px
  width: 100% !important
  height: 250px !important
  background: white
  border-radius: 15px

.graphics
  padding: 10px
</style>
