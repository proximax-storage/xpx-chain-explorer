<template>
  <div>
    <v-divider></v-divider>
    <div v-if="title !== ''">
      <p class="ma-0 primary--text text-center caption font-weight-bold" xs="12" sm="12" md="4">{{ title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Divider',

  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
