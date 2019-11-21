<template>
  <!-- Footer Commponent -->
  <div class="footer animated fadeIn">
    <p>Copyright 2019. ProximaX. All rights reserved. <b>Sirius Explorer {{ softwareVersion }}</b></p>
  </div>
  <!-- End Footer Component -->
</template>

<script>
export default {
  name: 'AppFooter',
  data () {
    return {
      softwareVersion: `v${this.$config.version}`,
    }
  }
}
</script>

<style lang="sass" scoped>
.footer
  margin: 20px 0px 0px 0px
  color: black
  & > p
    font-size: 10px
    text-align: center
    margin: 0px
    padding: 10px
    font-weight: bold
    & > b
      color: #2d819b
</style>
