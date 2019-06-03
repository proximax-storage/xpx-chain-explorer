<template>
  <div class="graphics">
    <h1>{{ title }}</h1>
    <div>
      <canvas id="graphic-1" class="standard-canvas" height="250"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  name: 'Graphics',
  props: {
    title: {
      type: String,
      required: false,
      default: 'Graphic'
    }
  },
  mounted () {
    const ctx = this.$el.querySelector('#graphic-1')
    console.log(ctx)

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
              'rgba(255, 0, 0, 0.2)'
            ],
            borderColor: [
              'rgba(255, 0, 0, 1)'
            ],
            borderWidth: 3
          },
          {
            label: '# of Votes',
            data: [12, 10, 3, 10, 7, 5, 7],
            backgroundColor: [
              'rgba(0, 0, 255, 0.2)'
            ],
            borderColor: [
              'rgba(0, 0, 235, 1)'
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
  // padding: 10px
  width: 100% !important
  height: 250px !important
  background: white
  border-radius: 5px
  flex-grow: 1

.graphics
  display: block
  padding: 10px
  border-radius: 5px
  width: 100%
  & > h1
    color: #7ab5e2
    font-size: 15px
    font-weight: bold
    text-transform: uppercase
</style>
