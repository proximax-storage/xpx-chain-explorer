<template>
  <component :is="tag" :class="className">
    <slot></slot>
  </component>
</template>

<script>
import classNames from 'classnames';

const SideNavNav = {
  name: 'SideNavNav',
  props: {
    tag: {
      type: String,
      default: "ul"
    }
  },
  computed: {
    className() {
      return classNames(
        'collapsible collapsible-accordion'
      );
    }
  }
};

export default SideNavNav;
export { SideNavNav as mdbSideNavNav };
</script>

<style scoped>
</style>
