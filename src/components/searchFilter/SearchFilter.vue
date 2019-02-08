<template>
  <mdb-container>
    <br>
    <mdb-row class="align-items-center">
      <mdb-col sm="12" md="4">
        <mdb-select id="select" @getValue="getSelectValue" :options="optionSelect"/>
        <label for="select">Type searh</label>
      </mdb-col>
      <mdb-col sm="12" md="7">
        <mdb-input label="Enter"/>
      </mdb-col>
      <mdb-col sm="12" md="1">
        <div style="text-align: center">
          <mdb-btn tag="a" class="background-explorer" floating size="sm"><mdb-icon icon="search" /></mdb-btn>
        </div>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>
<script>
import { mdbSelect, mdbContainer, mdbInput, mdbRow, mdbCol, mdbIcon, mdbBtn } from 'mdbvue';
import requestService from '@/services/RequestService'
import Service from '@/services/Service'

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
    const service = new Service()
    return {
      optionSelect: [
        { text: 'Address', value: 'address', selected: true },
        { text: 'Public Key', value: 'publickey' },
        { text: 'Hast transaction', value: 'hash' },
        { text: 'Block', value: 'block' },
        { text: 'Mosaic name', value: 'mosaic' },
        { text: 'Namespace name', value: 'namespace' }
      ],
      service: service
    }
  },
  methods: {
    getSelectValue(value, text) {      
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
