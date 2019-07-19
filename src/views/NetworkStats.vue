<template>
  <!-- Network Statistics View -->
  <div class="network">
    <!-- Big Graphic Container -->
    <div>
      <graphics :title="'Node Monitor'" :numGraphic="0"/>
    </div>
    <!-- End Big Graphic Container -->
    <mdb-progress v-if="blocks.length === 0" bgColor="cyan darken-3" style="width: 100%" indeterminate/>
    <div v-if="blocks.length > 0">
      <div class="mini-two">
        <graphics :title="'Sirius unique validators daily chart'" :numGraphic="1" :params="blocks"/>
        <graphics :title="'Sirius transaction per day chart'" :numGraphic="2" :params="blocks"/>
      </div>

      <!-- Divided Graphic Container -->
      <div class="mini-two">
        <graphics :title="'Sirius account over time'" :numGraphic="3"/>
        <graphics :title="'Sirius average block dificulty per day'" :numGraphic="4" :params="blocks"/>
      </div>
      <!-- Divided Graphic Container -->
    </div>
    <!-- Divided Graphic Container -->

  </div>
  <!-- End Network Statistics View -->
</template>

<script>
/**
 * Graphic Component
 *
 * The graphic component is the only one that is currently displayed in this view
 */
import Graphics from '@/components/networkStats/Graphics.vue'
import { mdbProgress } from 'mdbvue'

export default {
  name: 'NetworkStats',
  components: {
    Graphics,
    mdbProgress
  },
  data() {
    return {
      blocks: []
    }
  },
  mounted () {
    this.getLastBlocks()
  },
  methods: {
    /**
     * View All Blocks
     *
     * Method to see recently closed blocks
     */
    getLastBlocks () {
      this.$proxProvider.blockchainHttp.getBlockchainHeight().subscribe(
        next => {
          this.$proxProvider.blockchainHttp.getBlocksByHeightWithLimit(next.compact()).subscribe(
            blockInfo => {
              // console.log(blockInfo)
              // // console.log(blockInfo.length, blockInfo.length < 100)
                // console.log(blockInfo[blockInfo.length - 1].height.compact())
              if (blockInfo.length < 10) {
                this.$proxProvider.blockchainHttp.getBlocksByHeightWithLimit(blockInfo[blockInfo.length - 1].height.compact() - 1).subscribe(
                  response => {
                    console.log(response)
                    blockInfo.concat(response)
                    this.blocks = blockInfo.slice(0, 9)
                  }
                )
              } else {
                this.blocks = blockInfo.slice(0, 10)
              }
            },
            error => {
              // console.log('\n\n\n\nValue of Error', error, '\n\n\n\nEnd value\n\n')
            }
          )
        },
        error => {
          // console.log('\n\n\n\nValue of Error2', error, '\n\n\n\nEnd value\n\n')
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped>
div
  text-align: center

.mini-two
  display: flex
  flex-flow: row nowrap
  justify-content: space-evenly
  align-item: center

@media screen and (max-width: 741px)
  .mini-two
    flex-flow: column
</style>
