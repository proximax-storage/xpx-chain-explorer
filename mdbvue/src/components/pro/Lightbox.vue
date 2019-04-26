<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="img-swiper box"
      @click.self="closeDialog"
    >
      <div
        class="img-wrapper"
        :class="{transition: imgTransitionStatus}"
        :style="imgStyle">
        <!-- START: Imgs -->
        <img
          class="img"
          v-if="imgIndex === index"
          v-for="(img, index) in imgList"
          :key="index"
          :src="img"
          alt=""
          draggable="false"
          @mousedown="handleMouseDown($event)"
          @mouseup="handleMouseUp($event)"
          @mousemove="handleMouseMove($event)"
        >
        <!-- END: Imgs -->
      </div>
      <!-- START: btns -->
        <div class="btns">
          <div
            v-if="imgList.length !== 1"
            class="btn__prev"
            :class="{disable: imgIndex === 0}"
            @click="prev"
          >
            <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
              <use xlink:href="#icon-prev"></use>
            </button>
          </div>

          <div
            v-if="imgList.length !== 1"
            class="btn__next"
            :class="{disable: imgIndex === imgList.length - 1}"
            @click="next"
          >
            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
              <use xlink:href="#icon-next"></use>
            </button>
          </div>

          <div
            class="btn__close"
            @click="closeDialog"
          >
            <button class="pswp__button pswp__button--close" title="Close (Esc)">
              <use xlink:href="#icon-close"></use>
            </button>
          </div>

          <div class="toolbar-btns">
            <div
              class="toolbar-btn toolbar-btn__zoomin"
              @click="zoomIn()"
            >
              <button class="pswp__button pswp__button--zoom" title="Zoom in">
                <use xlink:href="#icon-zoomin"></use>
              </button>
            </div>
            <div
              class="toolbar-btn toolbar-btn__zoomout"
              @click="zoomOut()"
            >
              <button class="pswp__button pswp__button--zoom lb-zoom-out" title="Zoom out">
                <use xlink:href="#icon-zoomout"></use>
              </button>
            </div>
          </div>
        </div>
        <!-- END: btns -->

        <!-- START: total -->
        <div
          v-if="imgList.length !== 1"
          class="pagination-total">{{ imgIndex + 1 }}/{{ imgTotal }}</div>
        <!-- END: total -->
    </div>
  </transition>
</template>

<script>
import Fa from '../Fa.vue';
const Lightbox = {
  name: 'Lightbox',
  props: {
    imgs: {
      type: [Array, String]
    },
    visible: {
      type: Boolean
    },
    index: {
      type: Number,
      default: 0
    }
  },
  components: {
    Fa
  },
  data() {
    return {
      scale: 1,
      rotateDeg: 0,
      imgIndex: 0,
      imgTransitionStatus: true,
      top: 0,
      left: 0,
      lastX: 0,
      lastY: 0,
      isDraging: false
    };
  },
  methods: {
    checkBtn(btn) {
      if (btn === 0) return true;
      return false;
    },
    handleMouseDown(e) {
      if (!this.checkBtn(e.button)) return;
      this.lastX = e.clientX;
      this.lastY = e.clientY;
      this.isDraging = true;
      e.stopPropagation();
    },
    handleMouseUp(e) {
      if (!this.checkBtn(e.button)) return;
      this.isDraging = false;
      this.lastX = 0;
      this.lastY = 0;
    },
    handleMouseMove(e) {
      if (!this.checkBtn(e.button)) return;
      if (this.isDraging) {
        this.top = this.top - this.lastY + e.clientY;
        this.left = this.left - this.lastX + e.clientX;
        this.lastX = e.clientX;
        this.lastY = e.clientY;
      }
      e.stopPropagation();
    },
    zoomIn(e) {
      this.scale += 0.25;
    },
    zoomOut() {
      this.scale -= 0.25;
    },
    rotate() {
      this.rotateDeg += 90;
    },
    next() {
      if (this.imgIndex === this.imgList.length - 1) return;
      this.reset();
      this.imgIndex += 1;
      setTimeout(() => {
        this.imgTransitionStatus = !this.imgTransitionStatus;
      }, 0);
    },
    prev() {
      if (this.imgIndex === 0) return;
      this.reset();
      this.imgIndex -= 1;
      setTimeout(() => {
        this.imgTransitionStatus = !this.imgTransitionStatus;
      }, 0);
    },
    reset() {
      this.imgTransitionStatus = !this.imgTransitionStatus;
      this.scale = 1;
      this.rotateDeg = 0;
    },
    closeDialog() {
      this.$emit('hide');
    },
    init() {
      this.imgIndex = this.index;
      this.imgTransitionStatus = true;
      this.scale = 1;
      this.rotateDeg = 0;
      this.top = 0;
      this.left = 0;
    }
  },
  computed: {
    imgList() {
      if (Object.prototype.toString.call(this.imgs) === '[object Array]') {
        return this.imgs;
      }
      return [this.imgs];
    },
    imgTotal() {
      return this.imgList.length || 0;
    },
    imgStyle: {
      get() {
        return {
          transform: `translate(-50%, -50%)
            scale(${this.scale})
            rotate(-${this.rotateDeg}deg)`,
          top: `calc(50% + ${this.top}px)`,
          left: `calc(50% + ${this.left}px)`
        };
      }
    },
  },
  watch: {
    visible(visible) {
      if (visible === true) {
        this.init();
      }
    }
  },
  mounted() {
    let self = this;
    window.onkeyup = function(e) {
      let key = e.keyCode ? e.keyCode : e.which;
      switch (key) {
        case 37:
          self.prev();
          break;
        case 39:
          self.next();
          break;
        case 38:
          self.zoomIn();
          break;
        case 40:
          self.zoomOut();
          break;
        case 27:
          self.closeDialog();
      }
    };
  }
};

export default Lightbox;
export { Lightbox as mdbLightbox };
</script>

<style scoped>
.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.img-swiper {
  position: relative;
}
.box {
  z-index: 9998;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: black;
}
.img-wrapper {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50% -50%);
  cursor: move;
}
.img-wrapper.transition {
  transition: transform 0.3s ease-in-out;
}
.img {
  max-width: 80vw;
  max-height: 80vh;
  vertical-align: middle;
  position: relative;
}

.btn__prev,
.btn__next,
.btn__close {
  cursor: pointer;
  position: absolute;
  font-size: 60px;
  color: #fff;
  opacity: 0.6;
  transition: 0.15s linear;
}
.btn__prev:hover,
.btn__next:hover,
.btn__close:hover {
  opacity: 1;
}
.btn__prev.disable:hover,
.btn__next.disable:hover,
.btn__prev.disable,
.btn__next.disable {
  cursor: default;
  opacity: 0.2;
}
.btn__next {
  top: 50%;
  right: 20px;
  font-size: 40px;
}
.btn__prev {
  top: 50%;
  left: 20px;
  font-size: 40px;
}
.btn__close {
  top: 10px;
  right: 10px;
  font-size: 40px;
}
.pagination-total {
  position: absolute;
  font-size: 16px;
  top: 16px;
  left: 16px;
  color: white;
  opacity: .75;
}
.toolbar-btns {
  user-select: none;
  position: absolute;
  top: 0;
  right: 50px;
  border-radius: 4px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  padding: 6px;
}
.toolbar-btn{
  cursor: pointer;
  display: inline-block;
  padding: 3px;
}
.toolbar-btn .icon{
  width: 32px;
  height: 32px;
  fill: #fff;
}
.toolbar-btn:hover .icon{
  fill: #54b4ee;
}
.pswp__button--zoom {
  display: block;
}
.lb-zoom-out {
  background-position: -132px 0;
}
.lb-rotate-button {
  background: none;
}
</style>
