<template>
  <div>
    <div class="blue lighten-5">
      <v-row class="ma-0 mt-4 pa-4 d-flex justify-center" style="border-radius: 5px">
        <v-col lg="10" md="10" sm="10" class="pa-0">
          <v-text-field
          :label="`${label} ${sublabel}`"
          v-model="searchValue"
          :error-messages="errormsg"
          autocomplete="off"
          />
        </v-col>

        <v-col lg="2" md="2" sm="2" class="pa-0 d-flex justify-center align-center">
          <v-btn class="blue white--text" :disabled="searchData === null" rounded @click="$goToCustomRoute(preparedRoute)">Details</v-btn>
        </v-col>
      </v-row>
      <v-progress-linear v-if="activeLoader" indeterminate/>
    </div>

    <!-- <v-row v-if="searchData !== null">
      <v-col class="pa-5">
        <p style="word-break: break-all">{{ searchData }}</p>
      </v-col>
    </v-row> -->

    <v-row>
      <v-col>
        <v-snackbar v-model="activeSnack">
          <div>Press enter for details</div>
          <v-btn @click="activeSnack = false">Close</v-btn>
        </v-snackbar>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { PublicAccount, Address, Id, NamespaceId } from 'tsjs-xpx-chain-sdk'

export default {
  name: 'Search',

  data: () => ({
    label: 'Search ',
    sublabel: '',
    searchValue: '',
    errormsg: '',
    activeLoader: false,
    activeSnack: false,
    searchData: null,
    forbiddenPubKey: '0000000000000000000000000000000000000000000000000000000000000000',
    preparedRoute: null
  }),

  methods: {
    analize (value) {
      this.errormsg = ''
      this.activeSnack = false
      this.searchData = null

      const tmpObj = {
        value: value,
        isHex: this.$utils.isHex(value),
        isNumber: this.$utils.isOnlyNumber(value),
        length: value.length
      }

      if (tmpObj.value === '') {
        this.sublabel = ''
        this.searchData = null
        this.errormsg = ''
      } else if (tmpObj.length === 64 && tmpObj.isHex === true) {
        this.pbkOrHash(tmpObj)
      } else if (tmpObj.length === 40 || tmpObj.length === 46) {
        this.address(tmpObj)
      } else if (tmpObj.isNumber) {
        this.block(tmpObj)
      } else if (tmpObj.isHex && tmpObj.length <= 40) {
        this.assetId(tmpObj)
      } else if (tmpObj.isHex === false && tmpObj.length <= 40) {
        this.assetName(tmpObj)
      }
    },

    async pbkOrHash (obj) {
      this.activeLoader = true
      this.sublabel = 'Public Key / TxID'
      console.log('Public Key Or TxID')

      console.log(this.$nodeInfo)
      const publicAccount = PublicAccount.createFromPublicKey(obj.value, this.$nodeInfo.networkIdentifier)
      console.log(publicAccount)

      try {
        console.log('PUBLIC KEY')
        const address = Address.createFromRawAddress(publicAccount.address.address)
        const accountInfo = await this.$provider.accountHttp.getAccountInfo(address).toPromise()
        console.log(accountInfo.publicKey)
        this.searchData = accountInfo
        this.sublabel = 'Public Key'
        this.activeSnack = true
        this.preparedRoute = `/publicKey/${obj.value}`
      } catch (error) {
        try {
          console.log('HASH')
          const transaction = await this.$provider.transactionHttp.getTransaction(obj.value).toPromise()
          console.log(transaction.transactionInfo.hash)
          this.searchData = transaction
          this.sublabel = 'TxID'
          this.activeSnack = true
          this.preparedRoute = `/publicKey/${obj.value}`
        } catch (error2) {
          console.warn('Public Key / TxID not found')
          this.sublabel = ''
          this.errormsg = 'Public Key / TxID not found'
        }
      }
      this.activeLoader = false
    },

    async address (obj) {
      console.log('Address')
      this.sublabel = 'Address'
      this.activeLoader = true

      obj.value = (obj.length === 46) ? obj.value.split('-').join('').toLowerCase() : obj.value.toLowerCase()

      console.log(obj.value)

      try {
        const address = Address.createFromRawAddress(obj.value)
        const account = await this.$provider.accountHttp.getAccountInfo(address).toPromise()
        console.log(account)
        console.log(account.publicKey === this.forbiddenPubKey)

        if (account.publicKey === this.forbiddenPubKey) {
          throw String('Address does not have a valid public key')
        }

        this.searchData = account
        this.activeSnack = true
      } catch (error) {
        console.log(error)

        if (typeof error === 'string') {
          this.errormsg = 'Address does not have a valid Public Key'
        } else {
          console.warn('Address info not found')
          this.errormsg = 'Address info not found'
        }
      }

      this.activeLoader = false
    },

    async block (obj) {
      console.log('Block')
      this.sublabel = 'Block'
      this.activeLoader = true

      try {
        const block = await this.$provider.blockHttp.getBlockByHeight(parseInt(obj.value)).toPromise()
        console.log(block)
        this.searchData = block
        this.activeSnack = true
        this.preparedRoute = `/block/${obj.value}`
      } catch (error) {
        console.warn('Block not Found')
        this.errormsg = 'Block not Found'
      }

      this.activeLoader = false
    },

    async assetId (obj) {
      console.log('AssetID')
      this.sublabel = 'AssetID'
      this.activeLoader = true

      const id = Id.fromHex(obj.value.toLowerCase())
      console.log(id)
      try {
        const mosaicResult = await this.$provider.mosaicHttp.getMosaic(id).toPromise()
        console.log(mosaicResult)
        this.activeLoader = false
      } catch (error) {
        const namespaceResult = await this.$provider.namespaceHttp.getNamespace(id).toPromise()
        console.log(namespaceResult)
        this.activeLoader = false
      }
    },

    async assetName (obj) {
      this.sublabel = 'AssetName'
      this.activeLoader = true
      console.log(obj)
      if (obj.value.includes(' ') === false && obj.value[obj.value.length - 1] !== '.') {
        const tmpId = new NamespaceId(obj.value)
        try {
          const namespaceResult = await this.$provider.namespaceHttp.getNamespace(tmpId).toPromise()
          console.log(namespaceResult)
          this.errormsg = null
          this.activeLoader = false
        } catch (error) {
          console.warn('Not Found')
          this.errormsg = 'Namespace / Mosaic not found'
          this.activeLoader = false
        }
      } else {
        this.activeLoader = false
      }
    }
  },

  watch: {
    searchValue (nv, ov) {
      this.analize(nv)
    }
  }
}
</script>

<style scoped>
.logo {
  width: 150px;
}
</style>
