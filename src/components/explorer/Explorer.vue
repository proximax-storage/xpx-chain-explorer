<template>
  <div>
  <!-- Material input -->
    <search-filter/>
    <router-view/>
  </div>
</template>
<script>
import { mdbContainer, mdbRow } from 'mdbvue'
import SearchFilter from '@/components/searchFilter/SearchFilter'

export default {
  name: 'Explorer',
  components: {
    mdbContainer,
    mdbRow,
    SearchFilter
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
