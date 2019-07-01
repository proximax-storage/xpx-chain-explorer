<template>
  <!-- Network Statistics View -->
  <div class="network">

    <!-- Big Graphic Container -->
    <div>
      <graphics :title="'Node Monitor'" :numGraphic="0"/>
    </div>
    <!-- End Big Graphic Container -->

    <!-- Divided Graphic Container -->
    <div class="mini-two">
      <graphics :title="'Sirius unique harvesters daily chart'" :numGraphic="1"/>
      <graphics :title="'Sirius transaction per day chart'" :numGraphic="2"/>
    </div>

    <!-- Divided Graphic Container -->
    <div class="mini-two">
      <graphics :title="'Sirius account over time'" :numGraphic="3"/>
      <graphics :title="'Sirius average block dificulty per day'" :numGraphic="4"/>
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
