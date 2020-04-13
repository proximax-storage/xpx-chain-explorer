<template>
  <div>
    <div class="blue lighten-5">
      <v-row>
        <v-col>
          <div>
            <p class="text-center mb-2">
              <v-icon class="blue pa-3" dark style="border-radius: 50%">mdi-account-circle</v-icon>
            </p>
          </div>
          <p class="text-center ma-0">Address</p>
          <p class="text-center ma-0">{{ address }}</p>
          <p class="ma-0"><v-progress-linear v-if="load" class="mb-4" indeterminate/></p>
        </v-col>
      </v-row>

      <v-row v-if="addressInfo !== null">
        <v-col>
          <p class="text-break">{{ addressInfo }}</p>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { Address } from 'tsjs-xpx-chain-sdk'

export default {
  name: 'PublicKey',

  data: () => ({
    address: null,
    addressInfo: null,
    load: false
  }),

  mounted () {
    const fmtAddress = Address.createFromRawAddress(this.$route.params.address)
    this.address = fmtAddress.pretty()
    this.getAddressInfo(fmtAddress)
  },

  methods: {
    async getAddressInfo (address) {
      this.load = true
      try {
        const accountInfo = await this.$provider.accountHttp.getAccountInfo(address).toPromise()
        console.log(accountInfo)
        this.addressInfo = accountInfo
        this.load = false
      } catch (error) {
        console.log(error)
        this.load = false
      }
    }
  }
}
</script>
