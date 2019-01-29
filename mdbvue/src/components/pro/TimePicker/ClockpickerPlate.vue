<template>
  <div class="picker__calendar-container">
    <div class="clockpicker-plate">
      <time-picker-clock 
        v-if="unitsMode === 'h'" 
        :min="1" 
        :max="hoursFormat" 
        :step="1"
        :rotate="30" 
        :color="color"
        :scrollable="true"
        :value="hours"
        :ref="'clock'"
        :double="hoursFormat === 24"
        @input="onHoursChange"
        @change="$emit('change', 'm')"
      />
      <time-picker-clock 
        v-if="unitsMode === 'm'"
        :min="0" 
        :max="59" 
        :step="5"
        :rotate="0" 
        :color="color"
        :scrollable="true"
        :value="minutes"
        :ref="'clock'"
        @input="onMinutesChange"
      />
    </div>
  </div>
</template>

<script>
import TimePickerClock from './TimePickerClock';

const ClockpickerPlate = {
  components: {
    TimePickerClock
  },
  props: {
    unitsMode: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    hoursFormat: {
      type: Number,
      required: true
    },
    hours: {
      type: Number,
      required: true
    },
    minutes: {
      type: Number,
      required: true
    }
  },
  methods: {
    onMinutesChange (val) {
      this.$emit('minutes', val);
    },
    onHoursChange (val) {
      this.$emit('hours', val);
    }
  }
};

export default ClockpickerPlate;
</script>