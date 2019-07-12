<template>

  <!-- Graphic Component -->
  <div class="graphics animated fast fadeIn">

    <!-- Name Of Graphic -->
    <h1>{{ title }}</h1>

    <!-- Graphic -->
    <div>
      <canvas id="graphic-1" class="standard-canvas" height="250"></canvas>
    </div>
    <!-- End Graphic -->

  </div>
  <!-- End Graphic Component -->
</template>

<script>
// Library chart to show the graphics
import Chart from 'chart.js'
import axios from 'axios'

export default {
  props: {
    title: {
      type: String,
      required: false,
      default: 'Graphic'
    },
    numGraphic: {
      type: Number,
      requires: false,
      default: 0
    },
    params: {
      type: Array,
      requires: false,
      default () {
        return []
      }
    },
  },

  data () {
    return {
      labels: [],
      arrData: [],
      color: 'rgba(0, 0, 255, 1)',
      backgroundColor: 'rgba(0, 0, 255, .1)',
      labelName: ''
    }
  },

  /**
   * Mounted
   *
   * Analyze and manage the data received from the parent component to
   * display the appropriate graphics
   */
  mounted () {
    // axios.get(`http://${this.$store.state.currentNode}/diagnostic/storage`)
    //   .then(response => {
    //     console.log(response.data)
    //   })

    // axios.get(`http://${this.$store.state.currentNode}/network`)
    //   .then(response => {
    //     console.log(response.data)
    //   })

    // axios.get(`http://${this.$store.state.currentNode}/node/info`)
    //   .then(response => {
    //     console.log(response.data)
    //   })

    setInterval(() => {
      this.setLocalData()
      this.showGraphic()
    }, 7000);
    this.setLocalData()
    this.showGraphic()
  },
  methods: {
    showGraphic () {
      const ctx = this.$el.querySelector('#graphic-1')
      // console.log(ctx)
      // console.log(this.graphicData)
      // eslint-disable-next-line
      const graphic = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: [
            {
              label: this.labelName,
              data: this.arrData,
              backgroundColor: [
                this.backgroundColor
              ],
              borderColor: [
                this.color
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
    },

    /**
     *
     */
    setLocalData () {
      switch (this.numGraphic) {
        case 0:
          this.arrData = Array.from(this.$store.getters.getAverageList)
          let tmp1 = Array.from(this.$store.getters.getBlockList)
          tmp1.forEach(el => {
            el.toString()
          })
          this.labels = tmp1
          this.labelName = 'Closing time of the current block'
          break;

        case 1:
          this.labels = Array.from([])
          this.arrData = Array.from([])
          this.params.forEach(el => {
            let exist = this.labels.filter(item => {
              return el.signer.publicKey === item
            })
            if (exist.length === 0) {
              this.labels.push(el.signer.publicKey)
            }
          })
          this.labels.forEach(el => {
            let exist = this.params.filter(item => {
              return el === item.signer.publicKey
            })
            this.arrData.push(exist.length)
          })
          for (let index = 0; index < this.labels.length; index++) {
            this.labels[index] = this.labels[index].substring(50)
          }
          this.labelName = 'Last closed blocks',
          this.color = 'rgba(255, 0, 0, 1)'
          this.backgroundColor = 'rgba(255, 0, 0, .1)'
          break;

        case 2:
          this.labels = Array.from([])
          this.arrData = Array.from([])
          this.params.forEach(el => {
            this.labels.push(el.height.compact())
            this.arrData.push(el.numTransactions)
          })
          this.labelName = 'Last closed blocks',
          this.color = 'rgba(255, 165, 0, 1)'
          this.backgroundColor = 'rgba(255, 165, 0, .1)'
          break;

        case 3:
          this.arrData = Array.from(this.$store.getters.getAverageList)
          let tmp4 = Array.from(this.$store.getters.getBlockList)
          tmp4.forEach(el => {
            el.toString()
          })
          this.labels = tmp4
          this.labelName = 'Closing time of the current block',
          this.color = 'rgba(0, 255, 0, 1)'
          this.backgroundColor = 'rgba(0, 255, 0, .1)'
          break;

        case 4:
          this.labels = Array.from([])
          this.arrData = Array.from([])
          this.params.forEach(el => {
            this.labels.push(el.height.compact())
            this.arrData.push(el.difficulty.compact())
          })
          this.labelName = 'Last closed blocks',
          this.color = 'rgba(128, 0, 128, 1)'
          this.backgroundColor = 'rgba(128, 0, 128, .1)'
          break;

        default:
          this.arrData = [0,0]
          this.labels = ["Loading", "Loading"]
          break;
      }
    }
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
    color: #2d8e9b
    font-size: 15px
    font-weight: bold
    text-transform: uppercase
</style>
