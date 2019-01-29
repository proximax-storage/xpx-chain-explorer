<template>
  <component :is="tag" :class="className" :style="style">
    <Btn tag="a" floating :size="size" :color="color">
      <fa :icon="icon"/>
    </Btn>
    <ul :class="ulClass">
      <slot></slot>
    </ul>
  </component>
</template>

<script>
import classNames from 'classnames';
import Btn from '../Button';
import Fa from '../Fa';

const BtnFixed =  {
  components: {
    Btn,
    Fa
  },
  props: {
    tag: {
      type: String,
      default: "div"
    },
    color: {
      type: String,
      default: "red"
    },
    size: {
      type: String
    },
    icon: {
      type: String,
      default: "pencil"
    },
    right: {
      type: Number
    },
    bottom: {
      type: Number
    }
  },

  computed: {
    className() {
      return classNames(
        'fixed-action-btn'
      );
    },
    ulClass() {
      return classNames(
        'list-unstyled'
      );
    },
    style() {
      return {'bottom' : this.bottom + 'px','right' : this.right + 'px'};
    }
  }
};

export default BtnFixed;
export { BtnFixed as mdbBtnFixed };
</script>

<style scoped>
</style>
