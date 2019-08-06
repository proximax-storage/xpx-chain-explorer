<template>
  <div class="topButton" @click="goTop">
    <mdb-icon icon="angle-up" />
  </div>
</template>

<script>
import { mdbIcon } from 'mdbvue'

export default {
  name: 'TopButton',
  components: {
    mdbIcon
  },
  methods: {
    goTop () {
      window.scrollBy({
        top: -10000000,
        left: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.topButton
  background: #ffffffd1
  width: 50px
  height: 50px
  display: flex
  justify-content: center
  align-items: center
  position: fixed
  z-index: 1000000
  bottom: 20px
  right: 20px
  border-radius: 50%
  color: #2BA1B9
  box-shadow: 0px 0px 10px grey
  &:hover
    background: #2BA1B9
    color: white
    transition: all ease .2s

@media screen and (max-width: 550px)
  .topButton
    bottom: 20px
    right: 10px
    background: #2BA1B9
    color: white
</style>

