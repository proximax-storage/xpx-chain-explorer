<template>
  <div>
    <v-alert outlined color="grey lighten-2" border="top" xs="12" sm="12" md="8" lg="8">
      <v-row>
        <v-col>
          <div>
            <p class="text-center mb-2">
              <v-icon class="blue pa-3" dark style="border-radius: 50%">mdi-account-circle</v-icon>
            </p>
          </div>
          <p class="text-center ma-0 font-weight-bold primary--text">Address</p>
          <p class="text-center ma-0 font-weight-bold primary--text text-break">{{ address }}</p>
          <p class="ma-0"><v-progress-linear v-if="load" class="mb-4" indeterminate/></p>
        </v-col>
      </v-row>

      <div v-if="addressInfo !== null">
        <div class="pb-2">
          <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Address</p>
          <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ addressInfo.address.pretty() }}</p>
        </div>

        <div class="pb-2">
          <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">PublicKey</p>
          <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ addressInfo.publicKey }}</p>
        </div>

        <div class="pb-2">
          <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Address Height</p>
          <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ addressInfo.addressHeight.compact() }}</p>
        </div>

        <div class="pb-2">
          <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">PublicKey Height</p>
          <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ addressInfo.publicKeyHeight.compact() }}</p>
        </div>
      </div>

      <account-assets v-if="mosaics !== null" :mosaics="mosaics"/>
      <multisig-info :multisigInfo="multisigInfo"/>
    </v-alert>
  </div>
</template>

<script>
import { Address } from 'tsjs-xpx-chain-sdk'

export default {
  name: 'PublicKey',

  components: {
    'multisig-info': () => import('@/components/Account/MultisigInfo'),
    'account-assets': () => import('@/components/Account/AccountAssets')
  },

  data: () => ({
    address: null,
    addressInfo: null,
    multisigInfo: null,
    mosaics: null,
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
        console.log(accountInfo.mosaics)
        this.addressInfo = accountInfo
        this.mosaics = accountInfo.mosaics
        this.load = false
      } catch (error) {
        console.log(error)
        this.load = false
      }

      try {
        const multisigInfo = await this.$provider.accountHttp.getMultisigAccountInfo(address).toPromise()
        console.log(multisigInfo)
        this.multisigInfo = multisigInfo
      } catch (error) {
        console.warn('No Multisig Info')
      }
    }
  }
}
</script>
