<template>
  <!-- Home View -->
  <div class="home">

    <!-- Node Admin Component -->
    <node-admin/>
    <!-- End Node Admin Componment -->

    <!-- Search Bar Component -->
    <search-bar/>
    <!-- End Search Bar Component -->

    <!-- Error Component -->
    <error/>
    <!-- End Error Component -->

    <!-- Blocks Component -->
    <blocks/>
    <!-- End Blocks Component -->

  </div>
  <!-- End Home View -->
</template>

<script>
import NodeAdmin from '@/components/home/NodeAdmin.vue'
import SearchBar from '@/components/global/SearchBar.vue'
import Blocks from '@/components/home/Blocks.vue'
import Error from '@/components/global/Error.vue'

export default {
  name: 'home',
  components: {
    NodeAdmin,
    SearchBar,
    Blocks,
    Error
  }
}
</script>
