<template>
  <div>
    <graphics/>
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
</style>
