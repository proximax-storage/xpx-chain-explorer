<template>
  <div class="searchBar">
    <div class="search-cont">
      <div class="search-button">
        <mdb-dropdown style="text-align: center">
          <mdb-dropdown-toggle slot="toggle" class="white-text blue"
          style="padding: 10px; box-shadow: none; border-radius: 30px; font-weight: bold; width: 100%"
          >{{ typeSearch }}</mdb-dropdown-toggle>
          <mdb-dropdown-menu>
            <a class="searchLink" v-for="(item, index) in searchList" :key="index" @click="changeSearch(item)">{{ item.name }}</a>
          </mdb-dropdown-menu>
        </mdb-dropdown>
      </div>
      <div class="search-input">
        <mdb-input :label="typeSearch" style="width: 100%"></mdb-input>
        <figure>
          <img :src="require('@/assets/search-details-white.svg')" alt="">
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
import { mdbDropdown, mdbDropdownMenu, mdbDropdownToggle, mdbInput } from 'mdbvue'

export default {
  name: 'SearchBar',
  components: {
    mdbDropdown,
    mdbDropdownMenu,
    mdbDropdownToggle,
    mdbInput
  },
  data () {
    return {
      typeSearch: 'Search',
      searchList: [
        { name: 'Public Key' },
        { name: 'Block Height' }
      ]
    }
  },
  methods: {
    changeSearch (item) {
      this.typeSearch = item.name
    }
  }
}
</script>

<style lang="sass" scoped>
.searchLink
  display: block
  margin: 5px
  &:hover
    background: dodgerblue
    color: white !important

.searchBar
  display: flex
  flex-flow: row nowrap
  justify-content: center
  align-items: center
  & > .search-cont
    width: 100%
    display: flex
    flex-flow: row nowrap
    align-items: center
    & > .search-button
      padding: 10px
      width: 30%
      display: flex
      flex-flow: row nowrap
      justify-content: center
    & > .search-input
      display: flex
      flex-flow: row nowrap
      width: 60%
      &> div
        margin: 0px
      & > figure
        display: flex
        flex-flow: row nowrap
        justify-content: center
        align-items: center
        margin: 0px
        padding: 5px
        & > img
          margin: 0px
          width: 15px

</style>
