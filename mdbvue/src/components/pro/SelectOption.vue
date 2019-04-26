<template>
  <li :class="className" @click="select">
    <input v-if="multiple && !optgroup" type="checkbox" class="form-check-input" :checked="active && !disabled" :disabled="disabled"/>
    <label v-if="multiple" :data-value="value" class="form-check-label"></label>
    <img v-if="icon" :src="icon" :data-value="value" :alt="alt" class="rounded-circle" />
    <span class="filtrable" :data-value="value">
      <slot></slot>
    </span>
  </li>
</template>

<script>
import classNames from 'classnames';

const SelectOption = {
  name: 'SelectOption',
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number]
    },
    icon: {
      type: String
    },
    alt: {
      type: String,
      default: "Option icon"
    },
    active: {
      type: Boolean,
      default: false
    },
    selectAll: {
      type: Boolean,
      default: false
    },
    optgroup: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    className() {
      return classNames(
        this.disabled && 'disabled',
        this.active && !this.disabled && !this.selectAll && 'active',
        this.optgroup && 'optgroup'
      );
    }
  },
  methods: {
    select() {
      if (this.selectAll) {
        this.$parent.$emit('allSelect');
      } else {
        this.$parent.$emit('select', this.value, this.$slots.default[0].text);
      }
    }
  }
};

export default SelectOption;
export { SelectOption as mdbSelectOption };
</script>

<style scoped>
label {
  float: left;
  margin-left: 10px;
  margin-top: 6px;
  margin-bottom: 0;
}
</style>
