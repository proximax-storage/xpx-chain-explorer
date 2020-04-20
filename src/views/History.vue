<template>
  <v-container fluid>
    <div>
      <div class="d-flex justify-space-between align-center pb-4">
        <h1 class="title">History</h1>
        <v-btn small text class="red--text" @click="cleanHistory">Clear History</v-btn>
      </div>

      <v-alert border="top" color="orange lighten-2" dark text>
        <p class="ma-0 caption">Some routes may not work, if you recently changed node</p>
        <p class="ma-0 caption">Because the selected node may not have the same type of network or not belong to the same blockchain</p>
      </v-alert>

      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Index</th>
              <th class="text-left">Route</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in history" :key="index" @click="$goToCustomRoute(item)">
              <td class="text-left">{{ index + 1 }}</td>
              <td class="text-left">{{ item }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'History',

  data: () => ({
    history: JSON.parse(localStorage.getItem('history'))
  }),

  methods: {
    cleanHistory () {
      localStorage.setItem('history', JSON.stringify([]))
      this.$goToHome()
    }
  }
}
</script>
