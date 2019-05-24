<template>
  <div class="searchBar">
    <div class="search-cont">
      <div class="search-button">
        <mdb-dropdown style="text-align: center">
          <mdb-dropdown-toggle slot="toggle" class="white-text blue"
          style="padding: 10px; box-shadow: none; border-radius: 30px; font-weight: bold; width: 100%"
          >{{ label }}</mdb-dropdown-toggle>
          <mdb-dropdown-menu style="height: auto">
            <mdb-dropdown-item v-for="(item, index) in searchList" :key="index">
              <a class="searchLink" @click.prevent="changeSearch(item)">{{ item.name }}</a>
            </mdb-dropdown-item>
          </mdb-dropdown-menu>
        </mdb-dropdown>
      </div>
      <div class="search-input">
        <mdb-input :label="label" class="place-white" style="width: 100%" v-model="valueSearch" @keyup.enter="performSearch"></mdb-input>
        <figure @click="performSearch">
          <img :src="require('@/assets/search-details-white.svg')" alt="">
        </figure>
      </div>
    </div>
  </div>
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
      label: 'Search',
      searchList: [
        { name: 'Public Key' },
        { name: 'Block Height' },
        { name: 'Transaction Hash' }
      ],
      valueSearch: ''
    }
  },
  methods: {
    changeSearch (item) {
      console.log(this.typeSearch)
      console.log(this.valueSearch)
      this.label = item.name
      if (item.name === 'Public Key') {
        this.typeSearch = 'publicKey'
      } else if (item.name === 'Block Height') {
        this.typeSearch = 'blockHeight'
      } else if (item.name === 'Transaction Hash') {
        this.typeSearch = 'transactionHash'
      }
    },
    performSearch () {
      console.log(this.$router)
      console.log(`/searchResult/${this.typeSearch}/${this.valueSearch}`)
      this.$router.go({ path: `searchResult/${this.typeSearch}/${this.valueSearch}` })
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
  &:hover
    background: dodgerblue
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
