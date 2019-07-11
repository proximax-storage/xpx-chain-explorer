<template>
  <!-- Search Bar Component -->
  <div class="searchBar animated fast fadeIn">
    <div class="search-cont">

      <!-- Type Search Button -->
      <div class="search-button">

        <!-- MDB Dropdown -->
        <mdb-dropdown style="text-align: center">
          <mdb-dropdown-toggle slot="toggle" class="white-text cyan darken-3"
          style="box-shadow: none; border-radius: 30px; font-weight: bold; width: 100%"
          >{{ label }}</mdb-dropdown-toggle>
          <mdb-dropdown-menu style="height: auto">
            <mdb-dropdown-item class="searchLink" v-for="(item, index) in searchList" :key="index" style="padding: 0px">
              <a style="display: block; padding: 10px" @click.prevent="changeSearch(item)">{{ item.name }}</a>
            </mdb-dropdown-item>
          </mdb-dropdown-menu>
        </mdb-dropdown>
        <!-- End MDB Dropdown -->


      </div>
      <!-- End Type Search Buttton -->

      <!-- Search Input -->
      <form class="search-input">

        <!-- MDB Input -->
        <mdb-input :label="label" type="search" class="place-white black-text" style="width: 100%" v-model="valueSearch"/>
        <!-- End MDB Input -->

        <!-- Input Icon -->
        <button @click.prevent="performSearch">
          <img :src="require('@/assets/search-details-white.svg')" alt="">
        </button>
        <!-- Input Icon -->

      </form>
      <!-- End Search Input -->

      <!-- Banner Section -->
      <div class="banner animated fast" v-if="bannerActive" :class="{ fadeIn: bannerActive, fadeOut: !bannerActive }">
        {{ bannerMessage }}
      </div>
      <!-- End Banner Section -->
    </div>
  </div>
  <!-- End Search Bar Component -->
</template>

<script>
import { mdbDropdown, mdbDropdownMenu, mdbDropdownToggle, mdbDropdownItem, mdbInput } from 'mdbvue'

export default {
  name: 'SearchBar',
  components: {
    mdbDropdown,
    mdbDropdownMenu,
    mdbDropdownToggle,
    mdbDropdownItem,
    mdbInput
  },
  data () {
    return {
      typeSearch: '',
      label: 'Select search',
      searchList: [
        { name: 'Public Key' },
        { name: 'Block Height' },
        { name: 'Transaction Hash' },
        { name: 'Address' }
      ],
      valueSearch: '',
      // Banner
      bannerActive: false,
      bannerMessage: ''
    }
  },
  methods: {
    /**
     * Change Search
     *
     * This method changes the type of search you want to perform
     *
     * @param { Object } item
     */
    changeSearch (item) {
      this.label = item.name
      if (item.name === 'Public Key') {
        this.typeSearch = 'publicKey'
      } else if (item.name === 'Block Height') {
        this.typeSearch = 'blockHeight'
      } else if (item.name === 'Transaction Hash') {
        this.typeSearch = 'transactionHash'
      } else if (item.name === 'Address') {
        this.typeSearch = 'address'
      }
    },

    /**
     * Perform Search
     *
     * This method executes the search action,
     * taking the type of search and the value entered by the user
     */
    performSearch () {
      if (this.typeSearch !== '') {
        if (this.valueSearch !== '') {
          if (this.bannerActive) {
            this.bannerActive = false
            this.bannerMessage = ''
          }

          let routeData = this.$router.resolve({ path: `/searchResult/${this.typeSearch}/${this.valueSearch}` })
          window.open(routeData.href, '_blank')
        } else {
          this.bannerActive = true
          this.bannerMessage = 'The value of the search can not be empty'
        }
      } else {
        this.bannerActive = true
        this.bannerMessage = 'Please select a search type'
      }
    }
  }
}
</script>

<style lang="sass">
.md-form input[type=search]:focus:not([readonly])
    box-shadow: 0 1px 0 0 #2d8e9b !important
    border-bottom: 1px solid #2d8e9b !important

.place-white
  color: black !important
  margin: 0px !important
  & > input
    color: black !important
    border-bottom: #2d8e9b
    margin: 0px
  & > label
    color: #2d8e9b !important
    &::after
      background: red !important

.searchLink
  display: block
  transition: all linear 0s
  padding: 5px
  &:hover
    color: white !important
    background: #2d8e9b !important

.banner
  width: 100%
  background: rgba(255, 0, 0, 0.7)
  border-radius: 25px
  padding: 3px
  font-weight: bold
  font-size: 12px
  display: flex
  justify-content: center

.searchBar
  padding: 10px
  margin: 10px 0px
  position: relative
  z-index: 2000
  & > .search-cont
    width: 100%
    display: flex
    flex-flow: row wrap
    align-items: center
    justify-content: space-between
    & > .search-button
      margin: 0px 10px
      display: flex
      flex-flow: row wrap
      justify-content: center
    & > .search-input
      margin: 0px 10px
      display: flex
      flex-flow: row nowrap
      align-items: center
      flex-grow: 3
      & > div
        margin: 0px
      & > button
        display: flex
        flex-flow: row nowrap
        justify-content: center
        align-items: center
        width: 40px
        height: 40px
        margin: 0px 0px 0px 10px
        padding: 0px
        border-radius: 50%
        background: rgb(45, 142, 155)
        border: none
        & > img
          margin: 0px
          width: 15px

@media screen and (max-width: 550px)
  .searchBar
    & > .search-cont
      flex-flow: column
      & > .search-button
        margin: 5px
        flex-grow: 0
        width: 100%
      & > .search-input
        margin: 5px
        flex-grow: 0
        width: 100%
</style>
