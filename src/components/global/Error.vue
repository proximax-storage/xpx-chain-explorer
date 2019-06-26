<template>
  <div class="error animated faste fadeIn" v-if="obj.active">
    <div class="red-elem">
      <p>{{ obj.message }}</p>
      <p>{{ obj.submessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
  computed: {
    obj () {
      return this.$store.getters.getErrorInfo
    }
  }
}
</script>

<style lang="sass" scoped>
.error
  width: 100%
  padding: 10px
  & > .red-elem
    display: flex
    flex-flow: column nowrap
    justify-content: center
    align-items: center
    border-radius: 5px
    padding: 20px
    background: #f34a46
    color: white
    & > p:first-child
      font-weight: bold
      font-size: 15px
      margin: 0px
    & > p:last-child
      font-weight: bold
      font-size: 10px
      margin: 0px
      color: rgba(255, 255, 255, 0.8)

</style>

