<template>
 <component :is="tag"
      @click="handleClick"
      @keydown.delete="handleDeletePress"
      :class="classes"
      >
      <div v-for="chip of chipsList"
        :key="chip.id"
        :class="chipClasses"
        >
        {{chip}}
        <i class="fa fa-times close" @click="handleCloseClick(chip)"/>
      </div>
      <input
        class = "input"
        type = "text"
        :value="inputValue"
        @input = "handleChange"
        @change = "handleChange"
        @blur = "onBlur"
        :placeholder ="calculatePlaceholder"
        @keyup="handleKeyEvents"
      />
 </component>
</template>

<script>
import classNames from 'classnames';

const ChipInput = {
  props: {
    tag: {
      type: String,
      default: "div"
    },
    chips: {
      type: [String, Array],
      default: () =>  []
    },
    placeholder: {
      type: String
    },
    secondaryPlaceholder: {
      type: String
    },
    chipColor: {
      type: String
    },
    chipText: {
      type: String
    },
    chipGradient: {
      type: String
    },
    chipSize: {
      type: String,
    }
  },
  data() {
    return {
      chipsList: this.chips,
      inputValue: '',
      isTouched: false
    };
  },
  methods: {
    // focus behavior
    handleClick() {
      this.isTouched = true;
      this.$el.querySelector("input").focus();
    },
    onBlur() {
      this.isTouched = false;
    },
    // update inputValue on change
    handleChange(e) {
      this.inputValue = e.target.value;
    },
    // handle adding new Chips:
    handleKeyEvents(e) {
      if (e.which == 13) {
        if (/^ *$/.test(this.inputValue)) {
          this.inputValue = '';
          return;
        }
        if (this.chipsList.includes(this.inputValue)) {
          this.inputValue = '';
          return;
        }
        this.chipsList.push(this.inputValue);
        this.inputValue = '';
      }
    },
    // handle removal - by pressing "Backspace" or "Delete":
    handleDeletePress(e) {
      if (this.isReadyToDelete) {
        const array = this.chipsList;
        array.pop();
        this.chipList = array;
      }
    },
    // ... and by pressing the "close" button:
    handleCloseClick(chipName) {
      const array = this.chipsList;
      const index = array.indexOf(chipName);
      array.splice(index, 1);
      this.chipsList = array;
    }
  },
  computed: {
    classes() {
      return classNames(
        'chips',
        this.isTouched && 'focus'
      );
    },
    chipClasses() {
      return classNames(
        'chip',
        this.chipSize && 'chip-' + this.chipSize,
        this.chipColor && this.chipColor,
        this.chipText && this.chipText + '-text',
        this.chipGradient && this.chipGradient + '-gradient'
      );
    },
    isReadyToDelete() {
      if (this.inputValue == '') {
        return true;
      } return false;
    },
    calculatePlaceholder() {
      let calculatedPlaceholder = (!this.secondaryPlaceholder && this.placeholder) ? this.placeholder : this.secondaryPlaceholder;
      let calculatedSecondaryPlaceholder = (!this.placeholder && this.secondaryPlaceholder) ?  this.secondaryPlaceholder : this.placeholder;
      if (this.chipsList.length > 0) {
        return calculatedSecondaryPlaceholder;
      }
      return calculatedPlaceholder;

    },
  },
};

export default ChipInput;
export { ChipInput as mdbChipInput };
</script>

<style>
</style>
