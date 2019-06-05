<template>
  <!-- Search Bar Component -->
  <div class="searchBar">
    <div class="search-cont">

      <!-- Type Search Button -->
      <div class="search-button">

        <!-- MDB Dropdown -->
        <mdb-dropdown style="text-align: center">
          <mdb-dropdown-toggle slot="toggle" class="white-text blue"
          style="padding: 10px; box-shadow: none; border-radius: 30px; font-weight: bold; width: 100%"
          >{{ label }}</mdb-dropdown-toggle>
          <mdb-dropdown-menu style="height: auto">
            <mdb-dropdown-item v-for="(item, index) in searchList" :key="index" style="padding: 0px">
              <a class="searchLink" @click.prevent="changeSearch(item)">{{ item.name }}</a>
            </mdb-dropdown-item>
          </mdb-dropdown-menu>
        </mdb-dropdown>
        <!-- End MDB Dropdown -->

      </div>
      <!-- End Type Search Buttton -->

      <!-- Search Input -->
      <div class="search-input">

        <!-- MDB Input -->
        <mdb-input :label="label" class="place-white" style="width: 100%" v-model="valueSearch" @key.enter="performSearch"/>
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
      let routeData = this.$router.resolve({ path: `/searchResult/${this.typeSearch}/${this.valueSearch}` })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style lang="sass">
.place-white
  color: white !important
  & > input
    color: white !important

.searchLink
  display: block
  padding: 10px
  &:hover
    color: white !important

.searchBar
  padding: 10px
  display: flex
  flex-flow: row nowrap
  justify-content: center
  align-items: center
  margin: 10px 0px
  & > .search-cont
    width: 100%
    display: flex
    flex-flow: row nowrap
    align-items: center
    justify-content: space-between
    & > .search-button
      width: 30%
      display: flex
      flex-flow: row wrap
      justify-content: center
    & > .search-input
      display: flex
      flex-flow: row nowrap
      align-items: center
      width: 65%
      & > div
        margin: 0px
      & > figure
        display: flex
        flex-flow: row nowrap
        justify-content: center
        align-items: center
        width: 30px
        height: 30px
        margin: 0px
        padding: 5px
        border-radius: 50%
        &:hover
          background: #ffffff80
        & > img
          margin: 0px
          width: 15px
</style>
