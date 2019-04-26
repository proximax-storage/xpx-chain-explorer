<template>
  <component :is="tag" :class="liClass">
    <a v-if="href" :href="href" v-bind="$attrs" :class="className" @click="wave">
      <i v-if="icon" :class="iconClass" />
      <slot></slot>
    </a>
    <router-link v-if="to" :to="to" v-bind="$attrs" :class="className" @click="wave">
      <i v-if="icon" :class="iconClass" />
      <slot></slot>
    </router-link>
  </component>
</template>

<script>
import classNames from 'classnames';
import waves from '../../mixins/waves';

const SideNavItem = {
  name: 'SideNavItem',
  props: {
    tag: {
      type: String,
      default: "li"
    },
    wrapperClass: {
      type: String
    },
    href: {
      type: String
    },
    to: {
      type: String
    },
    header: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    }
  },
  data() {
    return {
      waves: true
    };
  },
  computed: {
    className() {
      return classNames(
        'ripple-parent',
        this.header && 'collapsible-header'
      );
    },
    iconClass() {
      return classNames(
        'fa',
        'fa-' + this.icon
      );
    },
    liClass() {
      return classNames(
        'menu-item',
        this.wrapperClass
      );
    }
  },
  mixins: [waves]
};

export default SideNavItem;
export { SideNavItem as mdbSideNavItem };
</script>

<style scoped>
</style>
