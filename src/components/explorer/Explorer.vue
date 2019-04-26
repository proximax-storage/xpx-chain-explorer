<template>
  <div>
  <!-- Material input -->
    <router-view/>
  </div>
</template>
<script>
import { mdbContainer, mdbRow } from 'mdbvue'

export default {
  name: 'Explorer',
  components: {
    mdbContainer,
    mdbRow
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
