<template>
  <div>
    <v-progress-linear v-if="load" class="mb-4" indeterminate/>

    <div class="blue lighten-5">
      <v-row>
        <v-col>
          <div>
            <p class="text-center mb-2">
              <v-icon class="blue pa-3" dark style="border-radius: 50%">mdi-pound-box</v-icon>
            </p>
          </div>
          <p class="text-center ma-0">TxID / Hash</p>
          <p class="text-center ma-0">{{ this.hash }}</p>
        </v-col>
      </v-row>

      <v-row v-if="hashInfo !== null">
        <v-col>
          <p class="text-break">{{ this.hashInfo }}</p>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hash',

  data: () => ({
    hash: null,
    hashInfo: null,
    load: false
  }),

  mounted () {
    this.hash = this.$route.params.hash
    this.transactionInfo(this.hash)
  },

  methods: {
    async transactionInfo (hash) {
      this.load = true
      try {
        const transaction = await this.$provider.transactionHttp.getTransaction(hash).toPromise()
        console.log(transaction)
        this.hashInfo = transaction
        this.load = false
      } catch (error) {
        console.log(error)
        this.load = false
      }
    }
  }
}
</script>
