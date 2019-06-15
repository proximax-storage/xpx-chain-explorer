<template>
  <div class="mosaicInfo">
    <h1 class="supertitle">Mosaic Info</h1>
  </div>
</template>

<script>
export default {
  name: 'MosaicInfo',
  // props: {
  //   param: Object
  // }
  data () {
    return {
      nombre: 'MOSAICINFO'
    }
  }
}
</script>

<style lang="sass" scoped>
$radius: 5px

.supertitle
  display: flex
  flex-flow: row nowrap
  justify-content: space-between
  margin: 0px
  font-size: 17px
  color: #7AB5E2
  padding: 0px 0px 5px 0px

.mosaicInfo
  margin: 15px 10px
  padding: 10px
  border: 1px solid #7ab5e280
  border-radius: $radius

</style>
