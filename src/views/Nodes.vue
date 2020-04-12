<template>
  <v-container fluid>
    <info/>
  </v-container>
</template>

<script>
export default {
  name: 'Nodes',

  components: {
    info: () => import('@/components/global/Info')
  }
}
</script>
