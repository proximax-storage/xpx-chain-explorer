<template>
  <!-- Search Bar Component -->
  <div class="searchBar animated fast fadeIn">
    <div class="search-cont">

      <!-- Type Search Button -->
      <div class="search-button">

        <!-- MDB Dropdown -->
        <mdb-dropdown style="text-align: center">
          <mdb-dropdown-toggle slot="toggle" class="white-text cyan darken-3"
          style="padding: 10px; box-shadow: none; border-radius: 30px; font-weight: bold; width: 100%"
          >{{ label }}</mdb-dropdown-toggle>
          <mdb-dropdown-menu style="height: auto">
            <mdb-dropdown-item class="searchLink" v-for="(item, index) in searchList" :key="index" style="padding: 0px">
              <a @click.prevent="changeSearch(item)">{{ item.name }}</a>
            </mdb-dropdown-item>
          </mdb-dropdown-menu>
        </mdb-dropdown>
        <!-- End MDB Dropdown -->


      </div>
      <!-- End Type Search Buttton -->

      <!-- Search Input -->
      <div class="search-input">

        <!-- MDB Input -->
        <mdb-input :label="label" bg type="search" class="place-white black-text" style="width: 100%" v-model="valueSearch" @keydown.enter="performSearch"/>
        <!-- End MDB Input -->

        <!-- Input Icon -->
        <figure @click="performSearch">
          <img :src="require('@/assets/search-details-white.svg')" alt="">
        </figure>
        <!-- Input Icon -->

      </div>
      <!-- End Search Input -->

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
      valueSearch: ''
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
        let routeData = this.$router.resolve({ path: `/searchResult/${this.typeSearch}/${this.valueSearch}` })
        window.open(routeData.href, '_blank')
      }
    }
  }
}
</script>

<style lang="sass">
.place-white
  color: black !important
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

.searchBar
  padding: 10px
  margin: 10px 0px
  position: relative
  z-index: 2000
  & > .search-cont
    width: 100%
    display: flex
    flex-flow: row nowrap
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
      & > figure
        display: flex
        flex-flow: row nowrap
        justify-content: center
        align-items: center
        width: 30px
        height: 30px
        margin: 0px 0px 0px 10px
        padding: 5px
        border-radius: 50%
        background: rgba(45, 142, 155, .5)
        &:hover
          background: rgba(45, 142, 155, 1)
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
