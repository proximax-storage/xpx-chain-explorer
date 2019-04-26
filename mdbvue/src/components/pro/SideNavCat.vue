<template>
  <component :is="tag" :class="liClass">
    <a :class="className" @click.prevent="toggleCat">
      <i v-if="icon" :class="iconClass" />
      {{name}}
      <i class="fa fa-rotate-icon" :class="rotateIconClass"/>
    </a>
    <transition @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave">
      <div class="collapsible-body" v-show="toggle">
        <ul class="sub-menu">
          <slot></slot>
        </ul>
      </div>
    </transition>
  </component>
</template>

<script>
import classNames from 'classnames';
import waves from '../../mixins/waves';

const SideNavCat = {
  name: 'SideNavCat',
  props: {
    tag: {
      type: String,
      default: "li"
    },
    name: {
      type: String
    },
    icon: {
      type: String
    },
    wrapperClass: {
      type: String
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      toggle: this.show,
      waves: true,
      height: 0
    };
  },
  computed: {
    className() {
      return classNames(
        'collapsible-header ripple-parent arrow-r'
      );
    },
    liClass() {
      return classNames(
        'menu-item',
        this.wrapperClass,
        this.toggle && 'active'
      );
    },
    iconClass() {
      return classNames(
        'fa',
        'fa-' + this.icon
      );
    },
    rotateIconClass() {
      return classNames(
        'fa fa-angle-down rotate-icon'
      );
    }
  },
  created() {
    this.$parent.$on('toggleCat', catId => {
      if (catId === this._uid) {
        this.toggle = !this.toggle;
      } else {
        this.toggle = false;
      }
    });
  },
  methods: {
    toggleCat(e) {
      this.wave(e);
      this.$parent.$emit('toggleCat', this._uid);
    },
    beforeEnter(el) {
      el.style.height = '0';
    },
    enter(el) {
      el.style.height = el.scrollHeight + 'px';
    },
    beforeLeave(el) {
      el.style.height = el.scrollHeight + 'px';
    },
    leave(el) {
      el.style.height = '0';
    }
  },
  mixins: [waves]
};

export default SideNavCat;
export { SideNavCat as mdbSideNavCat };
</script>

<style scoped>
.collapsible-body {
  display: block;
  overflow: hidden;
  transition: height .3s;
}
</style>
