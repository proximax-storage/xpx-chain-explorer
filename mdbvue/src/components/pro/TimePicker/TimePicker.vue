<template>
  <div class="md-form">
    <input 
      type="text" 
      :placeholder="placeholder" 
      :id="id" 
      :class="`form-control timepicker ${pickerDialogOpen ? 'picker__input picker__input--active' : ''}`"
      :value="value" 
      @click="handlePickerDialogOpen"
    />
    <label :for="id" class="active">{{ label }}</label>
    <div :class="`clockpicker picker ${pickerDialogOpen ? 'picker--opened' : ''}`" :style="pickerDialogOpen ? {} : {display: 'none'}">
      <div class="picker__holder">
        <div class="picker__frame">
          <div class="picker__wrap">
            <div class="picker__box">
              <time-display :hours="computedHours" :color="color" :minutes="computedMinutes" :dayTime="dayTime" :unitsMode="unitsMode" @unitsMode="handleModeChange" :hoursFormat="hoursFormat" />
              <clockpicker-plate 
                @minutes="handleMinutesChange" 
                @hours="handleHoursChange" 
                @change="handleModeChange" 
                :hours="hours"
                :minutes="minutes"
                :unitsMode="unitsMode" 
                :color="color" 
                :hoursFormat="hoursFormat" 
              />
              <clockpicker-am-pm-block v-if="hoursFormat === 12" @dayTime="handleDayTimeChange" />
              <clockpicker-footer @doneClicked="handleDoneClicked"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeDisplay from './TimeDisplay';
import ClockpickerPlate from './ClockpickerPlate';
import ClockpickerAmPmBlock from './ClockpickerAmPmBlock';
import ClockpickerFooter from './ClockpickerFooter';

const TimePicker = {
  props: {
    color: {
      type: String,
      default: 'primary-color'
    },
    placeholder: {
      type: String,
      default: 'Select time'
    },
    id: {
      type: String,
      default: 'timePickerInput'
    },
    label: {
      type: String
    },
    hoursFormat: {
      type: Number,
      default: 12
    },
    getValue: {
      type: Function
    }
  },
  components: {
    TimeDisplay,
    ClockpickerPlate,
    ClockpickerAmPmBlock,
    ClockpickerFooter
  },
  data() {
    return {
      value: null,
      pickerDialogOpen: false ,
      unitsMode: 'h',
      dayTime: 'am',
      minutes: 0,
      hours: 12
    };
  },
  computed: {
    computedMinutes () {
      return this.minutes < 10 ? `0${this.minutes.toString()}` : `${this.minutes.toString()}`;
    },
    computedHours () {
      return this.hours < 10 ? `0${this.hours.toString()}` : this.hours === 24 ? `00` : `${this.hours.toString()}`;
    }
  },
  methods: {
    handlePickerDialogOpen () {
      this.pickerDialogOpen = !this.pickerDialogOpen;
    },
    handleModeChange (mode) {
      this.unitsMode = mode;
    },
    handleDayTimeChange (dayTime) {
      this.dayTime = dayTime;
    },
    handleMinutesChange (minutes) {
      this.minutes = minutes;
    },
    handleHoursChange (hours) {
      this.hours = hours;
    },
    handleDoneClicked() {
      this.value = this.hoursFormat === 12 ? `${this.computedHours}:${this.computedMinutes}${this.dayTime}` : `${this.computedHours}:${this.computedMinutes}`;
      this.unitsMode = 'h';
      this.handlePickerDialogOpen();
      this.emitValue(this.value);
    },
    emitValue(value) {
      this.$emit('getValue', value);
    },
  }
};

export default TimePicker;
export { TimePicker as mdbTimePicker };
</script>