<template>
  <div class="paginator">
    <figure class="hover-effect">
      <mdb-icon icon="angle-double-left"/>
    </figure>
    <figure class="hover-effect">
      <mdb-icon icon="angle-left"/>
    </figure>
    <div class="buttons">
      <div class="hover-effect">1</div>
      <div class="hover-effect">2</div>
    </div>
    <figure class="hover-effect">
      <mdb-icon icon="angle-right"/>
    </figure>
    <figure class="hover-effect">
      <mdb-icon icon="angle-double-right"/>
    </figure>
  </div>
</template>

<script>
import { mdbIcon } from 'mdbvue'

export default {
  name: 'Paginator',
  components: {
    mdbIcon
  },
  props: {
    limit: {
      type: Number,
      default: 10
    },
    arrayLength: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      testArr: [],
      counter: 0
    }
  },
  computed: {

  }
}
</script>

<style lang="sass" scoped>
.hover-effect
  background: transparent
  &:hover
    background: #00000070

.paginator
  background: transparent
  border: 1px solid #7ab5e2
  padding: 20px 50px
  margin: 10px 0px
  display: flex
  align-items: center
  border-radius: 5px
  & > figure
    margin: 0px
    display: flex
    justify-content: center
    align-items: center
    padding: 10px
    border-radius: 50%
  & > .buttons
    display: flex
    flex-flow: row nowrap
    align-items: center
    & > div
      width: 30px
      height: 30px
      display: flex
      justify-content: center
      align-items: center
      border-radius: 50%
      font-weight: bold
</style>
