<template>
  <v-container fluid transition="scale-transition">
    <info/>
    <search/>
    <router-view/>
  </v-container>
</template>

<script>
export default {
  name: 'Home',

  components: {
    info: () => import('@/components/global/Info'),
    search: () => import('@/components/global/Search')
  }
}
</script>
