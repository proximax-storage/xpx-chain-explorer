<template>
  <Btn 
    download="export.csv" 
    :tag="'a'" 
    :href="href"
    :color="color"
    :outline="outline"
    :size="size"
    :block="block"
    :active="active"
    :disabled="disabled"
    :icon="icon"
    :iconLeft="iconLeft"
    :iconRight="iconRight"
    :waves="waves"
    :darkWaves="darkWaves"
    :gradient="gradient"
    :rounded="rounded"
    :floating="floating"
    :flat="flat"
    :action="action"
    :transparent="transparent"
    :save="save"
  >
    Export to CSV
  </Btn>
</template>

<script>
import Btn from '../Button';

const CsvDownloader = {
  components: {
    Btn
  },
  props: {
    data: {
      type: [Object, Array],
      required: true
    },
    fields: {
      type: [Object, Array],
      required: true
    },
    color: {
      type: String,
      default: "default"
    },
    outline: {
      type: String,
    },
    size: {
      type: String
    },
    block: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    },
    iconLeft: {
      type: Boolean,
      default: false
    },
    iconRight: {
      type: Boolean,
      default: false
    },
    waves: {
      type: Boolean,
      default: true
    },
    darkWaves: {
      type: Boolean,
      default: false
    },
    gradient: {
      type: String
    },
    rounded: {
      type: Boolean,
      default: false
    },
    floating: {
      type: Boolean,
      default: false
    },
    flat: {
      type: Boolean,
      default: false
    },
    action: {
      type: Boolean,
      default: false
    },
    transparent: {
      type: Boolean,
      default: false
    },
    save: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      href: ''
    };
  },
  watch: {
    data () {
      let csvContent = 
      "data:text/csv;charset=utf-8," +
      [
        this.fields.map(col => col.field).join(","),
        [].concat.apply([], this.data).map(row => Object.values(row).join(","))
          .join("\n")
      ].join("\n");
      const csvData = encodeURI(csvContent);
      this.href = csvData;
    }
  }
};

export default CsvDownloader;
export { CsvDownloader as mdbCsvDownloader };
</script>