<template>
  <div class="map">
    <div class="cont">
      <iframe v-if="model" class="imap" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d452.1581727691727!2d-66.91056292338106!3d10.512061010895078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses-419!2sve!4v1558369609967!5m2!1ses-419!2sve" frameborder="0" style="border:0" allowfullscreen></iframe>
      <iframe v-if="!model" class="imap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3393.5424418258367!2d-66.86576883259643!3d10.490284297456643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2a58fcd2327d39%3A0x62054f6dadd2b037!2zQ2hhY2HDrXRv!5e0!3m2!1ses-419!2sve!4v1558561726671!5m2!1ses-419!2sve" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
    </div>
    <div class="control">
      <input type="button" value="Presiona" @click.stop="model = !model">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Map',
  data () {
    return {
      model: true
    }
  }
}
</script>

<style lang="sass" scoped>
.map
  display: block
  margin: 0px
  padding: 0px
  & > .cont
    display: flex
    flex-flow: row nowrap
    margin: 0px
    padding: 10px 0px
    & > .imap
      width: 100%
      height: 400px
      padding: 10px
      background: white
      border-radius: 5px
  & > .control
    display: flex
    flex-flow: row nowrap
    justify-content: center
    align-items: center
    padding: 10px
</style>
