<template>
  <div class="dataTables_length d-flex flex-row">
    <label class="mt-2 mr-2">Show entries</label>
    <mdb-select @getValue="getOptionValue" :wrapperClass="'mdb-select m-0'" :options="options"></mdb-select>
  </div>
</template>

<script>
import mdbSelect from './Select';

const DatatableSelect = {
  name: "DatatabMaterialeSelect",
  components: {
    mdbSelect
  },
  props: {
    entries: {
      type: Number,
      default: 10
    },
    options: {
      type: Array
    }
  },
  methods: {
    getOptionValue(value) {
      this.$emit('getValue', value);
    }
  }
};

export default DatatableSelect;
</script>