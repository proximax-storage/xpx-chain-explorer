<template>
  <mdb-container>
    <br>
    <mdb-row class="align-items-center">
      <mdb-col sm="12" md="4">
        <mdb-select id="select" @getValue="getSelectValue" :options="options"/>
        <label for="select">Type searh</label>
      </mdb-col>
      <mdb-col sm="12" md="7">
        <mdb-input label="Enter" :disabled="disabledInput" v-model="input"/>
      </mdb-col>
      <mdb-col sm="12" md="1">
        <div style="text-align: center">
          <mdb-btn tag="a" class="background-explorer" floating size="sm" :disabled="disabledView" @click="search()"><mdb-icon icon="search" /></mdb-btn>
        </div>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>
<script>
import { mdbSelect, mdbContainer, mdbInput, mdbRow, mdbCol, mdbIcon, mdbBtn } from 'mdbvue'
import { Address, NetworkType } from 'proximax-nem2-sdk'
import proximaxProvider from '@/services/proximaxProvider'

var _proximaxProvider

export default {
  name: 'SearchFilter',
  components: {
    mdbSelect,
    mdbContainer,
    mdbInput,
    mdbRow,
    mdbCol,
    mdbIcon,
    mdbBtn
  },
  data() {
    _proximaxProvider = new proximaxProvider()
    return {
      options: [
        { text: 'Select type search', value: ''},
        { text: 'Account Address', value: 'address' },
        { text: 'Account Public Key', value: 'publickey' },
        { text: 'Block Height', value: 'block' },
        { text: 'Transaction Hash', value: 'hash' }
      ],
      host: location.origin,
      disabledInput: true,
      disabledView: true,
      typeSearch: '',
      input: ''
    }
  },
  watch: {
    input: function (val) {
      this.disabledView = (val !== '') ? false : true ;
    }
  },
  methods: {
    getSelectValue: function(value, text) {     
      this.optionSelect = value
      this.input = ''
      this.disabledInput = (value !== '') ? false : true 
    },

    search: function () {
      let routeData
      switch (this.optionSelect) {
        case 'address':
          routeData = this.$router.resolve({path: `/account-info/${this.input}`})
          window.open(routeData.href, '_blank')
          break

        case 'publickey':
          const publicAccount = _proximaxProvider.createPublicAccount(this.input, NetworkType.TEST_NET)
          routeData = this.$router.resolve({path: `/account-info/${publicAccount.address.address}`})
          window.open(routeData.href, '_blank')
          break

        case 'block':
          routeData = this.$router.resolve({path: `/block-info/${this.input}`})
          window.open(routeData.href, '_blank')
          break
        
        case 'hash':
          routeData = this.$router.resolve({path: `/transactions/hast/${this.input}`})
          window.open(routeData.href, '_blank')
          break
      }
    }
  }
};
</script>

<style lang="scss">
  .label-search-by-filter {
    color: white !important;
    font-weight: 400;
    font-size: 0.9rem !important;
  }
</style>
