<template>
  <div id="app">
    <app-header/>
    <div class="view-container">
      <router-view class="view"/>
    </div>
    <app-footer/>
  </div>
</template>

<script>
import AppHeader from '@/components/global/AppHeader.vue'
import AppFooter from '@/components/global/AppFooter.vue'
// import {
//   Account,
//   NetworkType
// } from 'tsjs-xpx-catapult-sdk'

export default {
  components: {
    AppHeader,
    AppFooter
  }
  // mounted () {
  //   const account = Account.generateNewAccount(NetworkType.MIJIN_TEST);
  //   console.log('Your new account address is:', account.address.pretty(), 'and its private key', account.privateKey)
  // }
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css?family=Roboto')

*
  margin: 0px
  padding: 0px
  transition: .3s
  box-sizing: border-box

html
  background-image: url('./assets/background-proximax-explorer.jpg')
  background-position: top center
  background-size: 100%
  background-repeat: no-repeat
  background-color: #004562

body
  background: transparent

#app
  font-family: 'Roboto', sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: white
  background: transparent

@media screen and (max-width: 1920px)
  .view-container
    display: flex
    width: 100%
    justify-content: center
    align-items: center
    & > .view
      width: 70%

@media screen and (max-width: 1366px)
  .view-container
    display: flex
    width: 100%
    justify-content: center
    align-items: center
    & > .view
      width: 80%

@media screen and (max-width: 1024px)
  .view-container
    justify-content: center
    align-items: center
    & > .view
      width: 90%

@media screen and (max-width: 960px)
  .view-container > .view
      width: 100%
</style>
