<template>
  <div class="home">
    <node-admin/>
    <search-bar/>
    <blocks/>
  </div>
</template>

<script>
import NodeAdmin from '@/components/home/NodeAdmin.vue'
import SearchBar from '@/components/global/SearchBar.vue'
import Blocks from '@/components/home/Blocks.vue'

export default {
  name: 'home',
  components: {
    NodeAdmin,
    SearchBar,
    Blocks
  }
}
</script>
