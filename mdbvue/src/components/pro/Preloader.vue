<template>
  <div :is="tag" :class="wrapperClass">
    <div v-if="!multicolor" :class="spinnerClass">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div>
      <div class="gap-patch">
        <div class="circle"></div>
      </div>
      <div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
    <div v-if="multicolor">
      <div :class="[spinnerClass, 'spinner-blue']">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
      <div :class="[spinnerClass, 'spinner-red']">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
      <div :class="[spinnerClass, 'spinner-yellow']">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
      <div :class="[spinnerClass, 'spinner-green']">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import classNames from 'classnames';

const Preloader = {
  props: {
    tag: {
      type: String,
      default: "div"
    },
    big: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    crazy: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "blue"
    },
    multicolor: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    wrapperClass() {
      return classNames(
        'preloader-wrapper active',
        this.big ? 'big' : '',
        this.small ? 'small' : '',
        this.crazy ? 'crazy' : ''
      );
    },
    spinnerClass() {
      return classNames(
        'spinner-layer',
        this.multicolor ? '' : this.color ? 'spinner-' + this.color + '-only' : ''
      );
    }
  }
};

export default Preloader;
export { Preloader as mdbSpinner };
</script>

<style scoped>
</style>
