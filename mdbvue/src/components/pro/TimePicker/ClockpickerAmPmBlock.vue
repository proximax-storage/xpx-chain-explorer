<template>
  <div class="clockpicker-am-pm-block">
    <button type="button" :class="`btn-floating btn-flat clockpicker-button am-button ${dayTime === 'am' ? 'active' : ''}`" @click="changeDayTime('am')">AM</button>
    <button type="button" :class="`btn-floating btn-flat clockpicker-button pm-button ${dayTime === 'pm' ? 'active' : ''}`" @click="changeDayTime('pm')">PM</button>
  </div>
</template>

<script>

const ClockpickerAmPmBlock = {
  data() {
    return {
      dayTime: 'am'
    };
  },
  methods: {
    changeDayTime(time) {
      this.dayTime = time;
      this.$emit('dayTime', this.dayTime);
    }
  }
};

export default ClockpickerAmPmBlock;
</script>