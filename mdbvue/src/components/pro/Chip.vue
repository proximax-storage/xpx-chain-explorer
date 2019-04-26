<template>
 <component v-if="seen" :is="tag" :class="classes" @click="wave">
   <img v-if="src" :src="src" :alt="alt"/>
   <slot></slot>
   <i v-show="close" class="fa fa-times close" @click="handleCloseClick"/>
 </component>
</template>

<script>
import classNames from 'classnames';
import waves from '../../mixins/waves';

const Chip = {
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    src: {
      type: String
    },
    alt: {
      type: String
    },
    color: {
      type: String
    },
    text: {
      type: String
    },
    gradient: {
      type: String
    },
    size: {
      type: String,
    },
    waves: {
      type: Boolean
    },
    close: {
      type: Boolean
    },
    handleClose: {
      type: Function
    }
  },
  data() {
    return {
      seen: true
    };
  },
  methods: {
    handleCloseClick() {
      if (this.handleClose) {
        this.handleClose();
      }
      this.$emit('closeChip', this.$el.innerText);
      this.seen = false;
    }
  },
  computed: {
    classes() {
      return classNames(
        'chip',
        this.size && 'chip-' + this.size,
        this.color && this.color,
        this.text && this.text + '-text',
        this.gradient && this.gradient + '-gradient',
        this.waves && 'ripple-parent',
        this.className
      );
    }
  },
  mixins: [waves]
};

export default Chip;
export { Chip as mdbChip };
</script>

<style>
  .chip.chip-md {
      height: 42px;
      line-height: 42px;
      border-radius: 21px;
  }
  .chip.chip-md img {
      height: 42px;
      width: 42px;
  }

  .chip.chip-lg {
      height: 52px;
      line-height: 52px;
      border-radius: 26px;
  }
  .chip.chip-lg img {
      height: 52px;
      width: 52px;
  }
  .chip.chip-md {
      height: 42px;
      line-height: 42px;
      border-radius: 21px;
  }
  .chip.chip-md img {
      height: 42px;
      width: 42px;
  }
  .chip.chip-md .close {
      height: 42px;
      line-height: 42px;
      border-radius: 21px;
  }
  .chip.chip-lg {
      height: 52px;
      line-height: 52px;
      border-radius: 26px;
  }
  .chip.chip-lg img {
      height: 52px;
      width: 52px;
  }
  .chip.chip-lg .close {
      height: 52px;
      line-height: 52px;
      border-radius: 26px;
  }
</style>
