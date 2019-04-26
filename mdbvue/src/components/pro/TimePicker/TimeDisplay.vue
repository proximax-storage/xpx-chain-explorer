<template>
  <div :class="'picker__date-display ' + color">
    <div class="clockpicker-display">
      <div class="clockpicker-display-column">
        <span 
          :class="`clockpicker-span-hours ${unitsMode === 'h' ? 'text-primary' : ''}`"
          @click="changeMode('h')"
        >{{ hours }}</span>:<span 
          :class="`clockpicker-span-minutes ${unitsMode === 'm' ? 'text-primary' : ''}`"
          @click="changeMode('m')"  
        >{{ minutes }}</span>
      </div>
      <div v-if="hoursFormat === 12" class="clockpicker-display-column clockpicker-display-am-pm">
        <div class="clockpicker-span-am-pm">{{ computedDayTime }}</div>
      </div>
    </div>
  </div>
</template>

<script>
const TimeDisplay = {
  props: {
    hours: {
      type: String,
      required: true
    },
    minutes: {
      type: String,
      required: true
    },
    dayTime: {
      type: String,
      default: 'am'
    },
    hoursFormat: {
      type: Number,
      required: true
    },
    unitsMode: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'primary-color'
    }
  },
  computed: {
    computedDayTime() {
      return this.dayTime.toUpperCase();
    }
  },
  methods: {
    changeMode(mode) {
      this.$emit('unitsMode', mode);
    }
  }
};

export default TimeDisplay;
</script>