<template>
  <div :class="className">
    <label>
      {{offLabel}}
      <input :disabled="disabled" type="checkbox" v-model="toggle" />
      <span class="lever"></span>
      {{onLabel}}
    </label>
  </div>
</template>

<script>
import classNames from 'classnames';

const MdSwitch = {
  props: {
    offLabel: {
      type: String,
      default: "Off"
    },
    checked: {
      type: Boolean
    },
    onLabel: {
      type: String,
      default: "On"
    },
    disabled: {
      type: Boolean
    },
    classes: {
      type: String
    }
  },
  data() {
    return {
      toggle: this.checked
    };
  },
  mounted() {
    this.$emit('getValue', this.toggle);
  },
  computed: {
    className() {
      return classNames(
        'switch',
        this.classes
      );
    }
  },
  watch: {
    toggle(value) {
      this.$emit('getValue', value);
    }
  }
};

export default MdSwitch;
export { MdSwitch as mdbSwitch };
</script>

<style scoped>

</style>
