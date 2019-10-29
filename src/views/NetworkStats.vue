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
        <graphics :title="'unique block generators daily chart'" :numGraphic="1" :params="blocks"/>
        <graphics :title="'transactions per day chart'" :numGraphic="2" :params="blocks"/>
      </div>

      <!-- Divided Graphic Container -->
      <div class="mini-two">
        <graphics :title="'accounts over time'" :numGraphic="3"/>
        <graphics :title="'average block dificulty per day'" :numGraphic="4" :params="blocks"/>
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
      this.$proxProvider.chainHttp.getBlockchainHeight().subscribe(
        next => {
          this.$proxProvider.blockHttp.getBlocksByHeightWithLimit(next.compact()).subscribe(
            blockInfo => {
              if (blockInfo.length < 10) {
                this.$proxProvider.blockHttp.getBlocksByHeightWithLimit(blockInfo[blockInfo.length - 1].height.compact() - 1).subscribe(
                  response => {
                    blockInfo.concat(response)
                    this.blocks = blockInfo.slice(0, 9)
                  }
                )
              } else {
                this.blocks = blockInfo.slice(0, 10)
              }
            },
            error => {
            }
          )
        },
        error => {
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
