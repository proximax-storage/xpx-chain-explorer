<template>
  <input type="text" readOnly :data-value="value" :value="text" :class="className" />
</template>

<script>
import classNames from 'classnames';

const SelectInput = {
  name: 'SelectInput',
  props: {
    value: {
      type: [String, Number, Array]
    },
    text: {
      type: [String, Number, Array]
    },
    classes: {
      type: String
    }
  },
  computed: {
    className() {
      return classNames(
        'select-dropdown',
        this.classes
      );
    }
  }
};

export default SelectInput;
export { SelectInput as mdbSelectInput };
</script>

<style scoped>
</style>
