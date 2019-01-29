<template>
  <li>
    <Btn tag="a" floating :size="size" :color="color" :style="style">
      <fa v-if="icon" :icon="icon"/>
      <slot></slot>
    </Btn>
  </li>
</template>

<script>
import Btn from '../Button';
import Fa from '../Fa';

const BtnFixedItem = {
  components: {
    Btn,
    Fa
  },
  props: {
    color: {
      type: String
    },
    icon: {
      type: String
    },
    size: {
      type: String
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    style() {
      return this.show ? {'opacity' : 1, 'transform' : 'scaleY(1) scaleX(1) translateY(0) translateX(0)'} : {'opacity' : 0, 'transform' : 'scaleY(0.4) scaleX(0.4) translateY(40px) translateX(0)'};
    }
  }
};

export default BtnFixedItem;
export { BtnFixedItem as mdbBtnFixedItem };
</script>

<style scoped>
</style>
