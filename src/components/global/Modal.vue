<template>
  <div class="modal animated fast" :class="{ fadeIn: active, fadeOut: !active }" v-if="active">
    <div class="modal-back" @click="run"></div>
    <div class="cont">
      <h1 class="supertitle">{{ title || 'Info' }}</h1>
      <div v-if="param.length !== 0">
        <div class="element" v-for="(item, index) in param" :key="index" :style="(index % 2 === 0) ? 'background: #DDD' : 'background: #f4f4f4'">
          <div class="title">{{ item.key }}</div>
          <div class="value" :style="item.style" v-if="item.value !== ''" :class="item.class" @click="(item.class === 'link') ? goToAddress(item.value) : null">
            {{ item.value }}
          </div>
          <div class="value" :style="item.style" v-html="item.valueHtml"></div>
        </div>
      </div>
      <div class="loader" v-else>
        <mdb-spinner crazy multicolor/>
      </div>
      <div class="loader">
        <button class="red button" @click="run"><mdb-icon icon="times"/> Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mdbSpinner,
  mdbBtn,
  mdbIcon
} from 'mdbvue'

export default {
  name: 'Modal',
  components: {
    mdbSpinner,
    mdbBtn,
    mdbIcon
  },
  props: {
    active: Boolean,
    run: Function,
    param: Array,
    title: String
  },
  methods: {
    goToAddress (address) {
      let routeData = this.$router.resolve({ path: `/searchResult/address/${address}` })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style lang="sass" scoped>
.supertitle
  margin: 0px
  font-size: 17px
  font-weigth: bold
  color: white
  border-radius: 5px
  padding: 0px 0px 10px 0px
  margin: 0px

.loader
  text-align: center
  padding: 10px 0px 5px 0px

.element
  padding: 10px
  &:first-child
    border-radius: 5px 5px 0px 0px
  &:last-child
    border-radius: 0px 0px 5px 5px

.title
  font-size: 10px
  font-weight: bold
  text-transform: uppercase
  margin: 0px

.link:hover
  color: dodgerblue
  text-decoration: underline
  cursor: pointer

.value
  font-size: 10px
  font-weight: normal
  text-transform: uppercase
  word-break: break-all

.button
  border: 0px
  border-radius: 5px
  padding: 5px 15px
  color: white
  margin: 0px

.modal
  display: flex
  flex-flow: row nowrap
  justify-content: center
  align-items: center
  position: fixed
  z-index: 5000
  width: 100%
  height: 100%
  & > .modal-back
    width: 100%
    height: 100%
    background: rgba(0, 0, 0, .9)
  & > .cont
    position: absolute
    z-index: 6000
    border: 1px solid white
    color: black
    max-width: 80%
    max-height: 90%
    padding: 10px
    border-radius: 5px
    overflow-y: auto
    &::-webkit-scrollbar
      background: transparent
      width: 5px
    &::-webkit-scrollbar-thumb
      background: #2d8e9b
      border-radius: 10px

@media screen and (max-width: 960px)
  .element
    padding: 5px

  .modal > .cont
    max-width: inherit
    width: 95%
</style>
