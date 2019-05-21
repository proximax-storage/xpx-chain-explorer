<template>
  <div class="network">
    <div>
      <graphics/>
    </div>
    <div class="mini-two">
      <graphics/>
      <graphics/>
    </div>
    <div class="mini-two">
      <graphics/>
      <graphics/>
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
