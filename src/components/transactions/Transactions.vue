<template>
  <div>
  <!-- Material input -->
    <router-view/>
  </div>
</template>
<script>
import { mdbContainer } from 'mdbvue'

export default {
  name: 'Transactions',
  components: {
    mdbContainer
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
