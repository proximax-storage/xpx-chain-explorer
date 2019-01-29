<template>
  <component :is="tag" :class="wrapperClasses" :style="wrapperStyles" v-on-clickaway="away">
    <span :class="caretClasses">▼</span>
    <mdb-select-input @click.native="toggle = !toggle" :text="inputText" :value="inputValue" :disabled="disabled" />
    <transition @enter="enter" @afterEnter="afterEnter" @before-leave="beforeLeave">
      <keep-alive>
        <mdb-select-options v-if="toggle" :search="search" :searchPlaceholder="searchPlaceholder" @select="getSelectedOption" @allSelect="allSelect" class="collapse-item">
          <mdb-select-option v-if="multiple && selectAll" :multiple="multiple" selectAll :active="selectAllState">{{selectAllPlaceholder}}</mdb-select-option>
          <mdb-select-option v-for="option in options" :multiple="multiple" :value="option.value" :disabled="option.disabled" :active="option.selected" :icon="option.icon" :optgroup="option.optgroup" :key="option.value">{{option.text}}</mdb-select-option>
          <slot></slot>
          <mdb-btn v-if="multiple" save color="primary" size="sm" @click.native="toggle = !toggle">{{btnSavePlaceholder}}</mdb-btn>
        </mdb-select-options>
      </keep-alive>
    </transition>
  </component>
</template>

<script>
import classNames from 'classnames';
import mdbSelectInput from './SelectInput';
import mdbSelectOptions from './SelectOptions';
import mdbSelectOption from './SelectOption';
import mdbBtn from '../Button';
import { mixin as clickaway } from 'vue-clickaway';

const Select = {
  name: 'Select',
  components: {
    mdbSelectInput,
    mdbSelectOptions,
    mdbSelectOption,
    mdbBtn
  },
  props: {
    tag: {
      type: String,
      default: "div"
    },
    options: {
      type: Array
    },
    selectAll: {
      type: Boolean,
      default: false
    },
    selectAllPlaceholder: {
      type: String,
      default: 'Select all'
    },
    color: {
      type: String
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    search: {
      type: Boolean,
      default: false
    },
    searchPlaceholder: {
      type: String,
      default: 'Search here...'
    },
    wrapperClass: {
      type: String
    },
    wrapperStyle: {
      type: String
    },
    caretClass: {
      type: String
    },
    caretStyle: {
      type: String
    },
    getValue: {
      type: Function
    },
    limitPlaceholder: {
      type: String,
      default: 'options selected'
    },
    btnSavePlaceholder: {
      type: String,
      default: 'Save'
    }
  },
  mixins: [clickaway],
  data() {
    return {
      toggle: false,
      inputValue: null,
      inputText: null,
      selectAllState: false,
      preselectedIndex: 0,
      multiValues: [],
      multiTexts: []
    };
  },
  created() {
    this.preselect();
    this.renderInput();
  },
  methods: {
    preselect() {
      let checkPreselected = false;
      this.options.map((option, index) => {
        if (option.selected === true) {
          checkPreselected = true;
          this.preselectedIndex = index;
        }
      });
      if (checkPreselected === false) {
        for (let index in this.options) {
          if (this.options[index].disabled !== true) {
            this.preselectedIndex = index;
            break;
          }
        }
        this.options[this.preselectedIndex].selected = true;
        this.$set(this.options, this.preselectedIndex, this.options[this.preselectedIndex]);
      }
    },
    multiOptionsUpdate() {
      this.multiValues = [];
      this.multiTexts = [];
      this.options.map(option => {
        if (option.selected === true) {
          if (option.disabled) return;
          this.multiValues.push(option.value);
          this.multiTexts.push(option.text);
        }
      });
    },
    renderInput() {
      if (this.multiple) {
        this.multiOptionsUpdate();
        if (this.multiValues.length === 0) {
          this.selectFirstAvailableOption();
        }
        this.checkAllSelected();
        this.checkNumberOfSelected();
        this.inputValue = this.multiValues;
        this.$emit('getValue', this.multiValues, this.multiTexts);
      } else {
        this.selectFirstAvailableOption();
        this.inputValue = this.options.find(x => x.selected === true).value;
        this.inputText = this.options.find(x => x.selected === true).text;
        this.$emit('getValue', this.inputValue, this.inputText);
      }
    },
    selectFirstAvailableOption() {
      if (this.multiple) {
        this.multiValues = [];
        this.mulitTexts = [];
        if (typeof this.options.find(x => x.selected === true) == 'undefined') {
          this.options[this.preselectedIndex].selected = true;
          this.multiValues.push(this.options[this.preselectedIndex].value);
          this.multiTexts.push(this.options[this.preselectedIndex].text);
        } else {
          this.multiValues.push(this.options.find(x => x.selected === true).value);
          this.multiTexts.push(this.options.find(x => x.selected === true).text);
        }
      } else {
        let checkPreselected = false;
        this.options.map((option, index) => {
          if (option.selected === true) {
            checkPreselected = true;
            this.preselectedIndex = index;
          }
        });
        if (checkPreselected === false) {
          this.preselectedIndex = 0;
          this.options[this.preselectedIndex].selected = true;
          this.$set(this.options, this.preselectedIndex, this.options[this.preselectedIndex]);
        }
      }
    },
    checkAllSelected() {
      let checkAllSelected = true;
      this.options.forEach(option => {
        if (option.disabled) return;
        if (option.selected !== true) {
          checkAllSelected = false;
        }
      });
      if (checkAllSelected === true) {
        this.selectAllState = true;
      } else {
        this.selectAllState = false;
      }
    },
    checkNumberOfSelected() {
      if (this.multiValues.length > 4) {
        this.inputText = this.multiValues.length + ' ' + this.limitPlaceholder;
      } else {
        this.inputText = this.multiTexts;
      }
    },
    getSelectedOption(value, text) {
      if (this.multiple) {
        let currentOption = this.options.find(x => x.value === value);
        let currentOptionIndex = this.options.findIndex(x => x.value === value);
        let currentOptionObject = this.options[currentOptionIndex];

        if (currentOption.selected === true) {
          currentOptionObject.selected = false;
        } else {
          currentOptionObject.selected = true;
        }

        this.renderInput();

      } else {

        this.options.map(function(option) {
          option.selected = false;
        });
        this.options.find(x => x.value === value).selected = true;
        this.inputValue = value;
        this.inputText = text;
        this.$emit('getValue', value, text);
        this.away();
      }
    },
    allSelect() {
      this.multiValues = [];
      this.multiTexts = [];

      if (this.selectAllState) {
        this.options.map(option => {
          if (option.disabled) return;
          option.selected = false;
        });
        this.options[this.preselectedIndex].selected = true;
        this.multiValues.push(this.options[this.preselectedIndex].value);
        this.multiTexts.push(this.options[this.preselectedIndex].text);
        this.selectAllState = false;
      } else {
        this.options.map(option => {
          if (option.disabled) return;
          option.selected = true;
          this.multiValues.push(option.value);
          this.multiTexts.push(option.text);
        });
        this.selectAllState = true;
      }

      this.checkNumberOfSelected();
      this.inputValue = this.multiValues;
      this.$emit('getValue', this.multiValues, this.multiTexts);
    },
    away() {
      this.toggle = false;
    },
    enter(el) {
      el.style.opacity = '0';
    },
    afterEnter(el) {
      el.style.opacity = '1';
    },
    beforeLeave(el) {
      el.style.opacity = '0';
    }
  },
  computed: {
    wrapperClasses() {
      return classNames(
        'select-wrapper md-form',
        this.color ? 'colorful-select dropdown-' + this.color : '',
        this.wrapperClass
      );
    },
    wrapperStyles() {
      return this.wrapperStyle;
    },
    caretClasses() {
      return classNames(
        'caret',
        this.disabled ? 'disabled' : '',
        this.caretClass
      );
    },
    caretStyles() {
      return this.caretStyle;
    },
  },
  watch: {
    options() {
      this.renderInput();
    }
  }
};

export default Select;
export { Select as mdbSelect };
</script>

<style scoped>
.collapse-item {
  position: absolute;
  top: 0;
  z-index: 9999;
  width: 100%;
  transition: .2s;
}
</style>
