<template>
  <div class="picker__footer">
    <button type="button" class="btn btn-flat clockpicker-button" tabindex="23" @click="handleDoneClick">Done</button>
  </div>
</template>

<script>
const ClockpickerFooter = {
  methods: {
    handleDoneClick() {
      this.$emit('doneClicked', true);
    }
  }
}; 

export default ClockpickerFooter;
</script>