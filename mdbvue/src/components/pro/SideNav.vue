<template>
  <div>
    <transition :name="slideSide">
      <component :is="tag" :class="className" v-if="isThere || OpenedFromOutside">
        <mdb-scrollbar>
          <ul class="custom-scrollbar list-unstyled">
            <li v-if="logo" :class="logoLi" @click="wave">
              <div :class="logoWrapperClasses">
                <router-link v-if="to" :to="to" class="pl-0">
                  <img :src="logo" :class="logoClasses"/>
                </router-link>
                <a v-else :href="href" class="pl-0">
                  <img :src="logo" :class="logoClasses"/>
                </a>
              </div>
            </li>
            <slot></slot>
          </ul>
        </mdb-scrollbar>
        <div v-if="mask" :class="maskClasses" />
      </component>
    </transition>
    <div v-if="!isThere && OpenedFromOutside" @click="handleOverlayClick" id="sidenav-overlay"></div>
  </div>
</template>

<script>
import classNames from 'classnames';
import mdbScrollbar from './Scrollbar';
import waves from '../../mixins/waves';

const SideNav = {
  props: {
    tag: {
      type: String,
      default: "div"
    },
    fixed: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    },
    hidden: {
      type: Boolean
    },
    logo: {
      type: String
    },
    logoClass: {
      type: String
    },
    href: {
      type: String,
      default: '#'
    },
    to: {
      type: String
    },
    breakWidth: {
      type: Number,
      default: 1440
    },
    OpenedFromOutside: {
      type: Boolean,
      default: false
    },
    color: {
      type: String
    },
    darkWaves: {
      type: Boolean,
      default: false
    },
    sideNavClass: {
      type: String
    },
    mask: {
      type: String
    },
    logoSn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isThere: false,
      waves: true
    };
  },
  computed: {
    slideSide() {
      if (this.right) {
        return "slideRight";
      }
      return "slideLeft";
    },
    className() {
      return classNames(
        'side-nav',
        this.fixed && 'fixed',
        this.right && 'right-aligned',
        this.color,
        this.sideNavClass
      );
    },
    logoClasses() {
      return classNames(
        this.logoSn ? '' : 'img-fluid',
        this.logoClass
      );
    },
    logoLi() {
      return classNames(
        this.logoSn && 'logo-sn',
        'ripple-parent'
      );
    },
    logoWrapperClasses() {
      return classNames(
        this.logoSn ? '' : 'logo-wrapper',
        'text-center'
      );
    },
    maskClasses() {
      return classNames(
        'sidenav-bg',
        'mask-' + this.mask
      );
    }
  },
  methods: {
    updatePredicate() {
      if (!this.hidden) {
        this.isThere = window.innerWidth > this.breakWidth;
      }
    },
    handleOverlayClick() {
      this.$emit("update:OpenedFromOutside", !this.OpenedFromOutside);
    }
  },
  mounted() {
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updatePredicate);
  },
  components: {
    mdbScrollbar
  },
  mixins: [waves]
};

export default SideNav;
export { SideNav as mdbSideNav };
</script>

<style scoped>
.side-nav {
  transform: translate(0);
}
.slideLeft-enter, .slideLeft-leave-to {
  transform: translate(-100%);
  opacity: 0;
}
.slideLeft-enter-to, .slideLeft-leave {
  opacity: 1;
}
.slideLeft-leave-active, .slideLeft-enter-active {
  transition: 300ms;
}

.slideRight-enter, .slideRight-leave-to {
  transform: translate(100%);
  opacity: 0;
}
.slideRight-enter-to, .slideRight-leave {
  opacity: 1;
}
.slideRight-leave-active, .slideRight-enter-active {
  transition: 300ms;
}

.ps {
  height: 100%;
}
</style>
