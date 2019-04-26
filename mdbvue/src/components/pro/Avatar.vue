<template>
  <component :is="tag" :class="className" v-bind="$attrs">
    <slot></slot>
  </component>
</template>

<script>
import classNames from 'classnames';

const Avatar = {
  props: {
    tag: {
      type: String,
      default: "div"
    },
    wrapperClass: {
      type: String
    },
    round: {
      type: Boolean
    },
    circle: {
      type: Boolean
    }
  },
  computed: {
    className() {
      return classNames(
        'avatar',
        this.round && 'rounded',
        this.circle && 'rounded-circle',
        this.wrapperClass
      );
    }
  }
};

export default Avatar;
export { Avatar as mdbAvatar };
</script>

<style scoped>
</style>
