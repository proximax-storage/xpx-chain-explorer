<template>
  <ul :class="className" ref="options">
    <mdb-input v-if="search"
      class="search mx-2"
      :placeholder="searchPlaceholder"
      @input="searchValue"
    />
    <slot></slot>
  </ul>
</template>

<script>
import classNames from 'classnames';
import mdbInput from '../Input';

const SelectOptions = {
  name: 'SelectOptions',
  data() {
    return {
      options: []
    };
  },
  components: {
    mdbInput
  },
  props: {
    search: {
      type: Boolean,
      default: false
    },
    searchPlaceholder: {
      type: String
    }
  },
  computed: {
    className() {
      return classNames(
        'dropdown-content',
        'select-dropdown'
      );
    }
  },
  mounted() {
    if (this.search) {
      this.options = this.$refs.options.querySelectorAll('li');
    }
  },
  updated() {
    if (this.search) {
      this.options = this.$refs.options.querySelectorAll('li');
    }
  },
  methods: {
    searchValue(value) {
      this.options.forEach(function(option) {
        let optionValue = option.getElementsByTagName('span')[0].innerText.toLowerCase();
        if (optionValue.includes(value.toLowerCase())) {
          option.style.display = "block";
        } else {
          option.style.display = "none";
        }
      });
      this.$refs.options.style.height = 'auto';
    }
  }
};

export default SelectOptions;
export { SelectOptions as mdbSelectDropdown };
</script>

<style scoped>
ul {
  top: 0;
  width: 100%;
}
.dropdown-content {
  display: block;
  opacity: 1;
}
</style>
