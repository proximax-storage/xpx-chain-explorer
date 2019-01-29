<template>
  <mdb-container>
    <br>
    <mdb-row class="align-items-center">
      <mdb-col sm="12" md="4">
        <mdb-select id="select" @getValue="getSelectValue" :options="basicOptions"/>
        <label for="select">Type searh</label>
      </mdb-col>
      <mdb-col sm="12" md="7">
        <mdb-input label="Material input"/>
      </mdb-col>
      <mdb-col sm="12" md="1">
        <mdb-btn tag="a" class="background-explorer" floating size="sm"><mdb-icon icon="search" /></mdb-btn>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>
<script>
import { mdbSelect, mdbContainer, mdbInput, mdbRow, mdbCol, mdbIcon, mdbBtn } from 'mdbvue';

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
    return {
      basicOptions: [
        { text: 'Choose your option', value: null, disabled: true, selected: true },
        { text: 'Option nr 1', value: 'Option 1' },
        { text: 'Option nr 2', value: 'Option 2' },
        { text: 'Option nr 3', value: 'Option 3' }
      ]
    };
  },
  methods: {
    getSelectValue(value, text) {
      console.log(value);
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
