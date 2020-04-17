<template>
  <v-app>
    <v-app-bar app color="grey lighten-5" dense flat>
      <div class="d-flex align-center" @click="$goToHome">
        <v-img
          alt="ProximaX Logo"
          class="shrink mr-2"
          contain
          :src="require('@/assets/images/proximax.svg')"
          transition="scale-transition"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn text small elevation="false" class="mr-4" @click="$goToHistory">
        <span>History</span>
      </v-btn>

      <v-btn text small elevation="false" @click="$goToNodes">
        <span>Nodes</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>

    <v-btn fixed dark fab bottom right color="grey" @click="goTop">
      <v-icon>mdi-arrow-up</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({}),

  mounted () {
    console.log(this.$nodeman)
  },

  methods: {
    goTop () {
      window.scrollBy({
        top: -10000000,
        left: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>
