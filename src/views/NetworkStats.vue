<template>
  <!-- Network Statistics View -->
  <div class="network">

    <!-- Big Graphic Container -->
    <div>
      <graphics :title="'Node Monitor'"/>
    </div>
    <!-- End Big Graphic Container -->

    <!-- Divided Graphic Container -->
    <div class="mini-two">
      <graphics :title="'Nem unique harvesters daily chart'"/>
      <graphics :title="'Nem transaction per day chart'"/>
    </div>

    <!-- Divided Graphic Container -->
    <div class="mini-two">
      <graphics :title="'Nem account over time'"/>
      <graphics :title="'Nem average block dificulty per day'"/>
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

export default {
  name: 'NetworkStats',
  components: {
    Graphics
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
