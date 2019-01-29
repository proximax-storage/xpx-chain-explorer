<template>
  <component :is="tag" :class="className" :style="style">
    <span @click="handleToggle" v-on-clickaway="away">
      <slot name="toggle"></slot>
    </span>
    <transition @enter="enter" @after-enter="afterEnter" @before-leave="beforeLeave">
      <div v-if="toggle" :class="collapseClass">
        <slot></slot>
      </div>
    </transition>
  </component>
</template>

<script>
import classNames from 'classnames';
import { mixin as clickaway } from 'vue-clickaway';

const Dropdown = {
  props: {
    tag: {
      type: String,
      default: "div"
    },
    show: {
      type: Boolean
    },
    btnGroup: {
      type: Boolean
    },
    dropup: {
      type: Boolean,
      default: false
    },
    dropright: {
      type: Boolean,
      default: false
    },
    dropleft: {
      type: Boolean,
      default: false
    },
    split: {
      type: Boolean,
      default: false
    },
    megaMenu: {
      type: Boolean
    }
  },
  data() {
    return {
      toggle: false
    };
  },
  mixins: [clickaway],
  methods: {
    away() {
      this.toggle = false;
    },
    enter(el) {
      el.style.opacity = 0;
    },
    afterEnter(el) {
      el.style.opacity = 1;
    },
    beforeLeave(el) {
      el.style.opacity = 0;
    },
    handleToggle(e) {
      this.toggle=!this.toggle;
      e.preventDefault();
    }
  },
  computed: {
    className() {
      return classNames(
        this.btnGroup ? 'btn-group' : 'dropdown',
        this.show && 'show',
        this.dropup && 'dropup',
        this.dropright && 'dropright',
        this.dropleft && 'dropleft',
        this.megaMenu && 'mega-dropdown'
      );
    },
    style() {
      return {
        'margin-left' : this.split && '-0.3rem'
      };
    },
    collapseClass() {
      return classNames(
        this.megaMenu ? 'mega-menu-collapse-item' : 'collapse-item'
      );
    }
  }
};

export default Dropdown;
export { Dropdown as mdbDropdown };
</script>

<style scoped>
.dropdown {
  display: inline-block;
}
.collapse-item {
  position: relative;
  z-index: 1000;
  transition: opacity .2s;
}
.dropup .collapse-item {
  position: absolute;
  bottom: 100%;
}
.mega-menu-collapse-item {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 1000;
  transition: opacity .2s;
}
</style>

<style>
.navbar .dropdown-menu a:hover {
  color: inherit !important;
}
.navbar .mega-dropdown .dropdown-menu.mega-menu .sub-menu ul li a {
  display: inline-block;
}
</style>
