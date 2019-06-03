<template>
  <div class="network">
    <div>
      <graphics :title="'Node Monitor'"/>
    </div>
    <div class="mini-two">
      <graphics :title="'Nem unique harvesters daily chart'"/>
      <graphics :title="'Nem transaction per day chart'"/>
    </div>
    <div class="mini-two">
      <graphics :title="'Nem account over time'"/>
      <graphics :title="'Nem average block dificulty per day'"/>
    </div>
  </div>
</template>

<script>
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
