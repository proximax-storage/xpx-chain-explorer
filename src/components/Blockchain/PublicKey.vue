<template>
  <div>
    <div class="blue lighten-5">
      <v-row>
        <v-col>
          <div>
            <p class="text-center mb-2">
              <v-icon class="blue pa-3" dark style="border-radius: 50%">mdi-shield-key</v-icon>
            </p>
          </div>
          <p class="text-center ma-0">PublicKey</p>
          <p class="text-center ma-0">{{ this.publicKey }}</p>
          <p class="ma-0"><v-progress-linear v-if="load" class="mb-4" indeterminate/></p>
        </v-col>
      </v-row>

      <v-row v-if="publicKeyInfo !== null">
        <v-col>
          <p class="text-break">{{ this.publicKeyInfo }}</p>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { PublicAccount } from 'tsjs-xpx-chain-sdk'

export default {
  name: 'PublicKey',

  data: () => ({
    publicKey: null,
    publicKeyInfo: null,
    load: false
  }),

  mounted () {
    this.publicKey = this.$route.params.publicKey
    this.getPubKeyInfo(this.publicKey)
  },

  methods: {
    async getPubKeyInfo (publicKey) {
      this.load = true
      const publicAccount = PublicAccount.createFromPublicKey(publicKey, this.$nodeInfo.networkIdentifier)
      try {
        const accountInfo = await this.$provider.accountHttp.getAccountInfo(publicAccount.address).toPromise()
        console.log(accountInfo)
        this.publicKeyInfo = accountInfo
        this.load = false
      } catch (error) {
        console.log(error)
        this.load = false
      }
    }
  }
}
</script>
