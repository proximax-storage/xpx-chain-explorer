<template>
  <v-container fluid>
    <info/>
  </v-container>
</template>

<script>
export default {
  name: 'History',

  components: {
    info: () => import('@/components/global/Info')
  }
}
</script>
