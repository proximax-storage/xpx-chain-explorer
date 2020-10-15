<template>
  <!-- Search Bar Component -->
  <div class="searchBar animated fast fadeIn">
    <div class="search-cont">

      <div class="selector">

        <div class="sel-item" :class="item.class" v-for="(item, index) in searchList" :key="index" @click="changeSearch(item)">
          {{ item.name }}
        </div>

      </div>

      <!-- Search Input -->
      <form class="input-cont">

        <!-- MDB Input -->
        <input type="search" id="searchBarInput" class="place-white black-text optional-in" v-model="valueSearch" :placeholder="label" autocomplete="off" @keyup="isValid" @focusout="isValid">
        <!-- <mdb-input :label="label" type="text" class="place-white black-text" v-model="valueSearch"/> -->
        <!-- End MDB Input -->

        <!-- Input Icon -->
        <button @click.prevent="performSearch">
          <img :src="require('@/assets/search-white.svg')" alt="search" width="15">
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
      typeSearch: 'basic',
      pathSearch: '',
      label: 'Address / Public Key / Block Height',
      searchList: [
        { name: 'Basic', class: 'active-s' },
        { name: 'Hash', class: '' },
        { name: 'Namespace', class: '' },
        { name: 'Asset', class: '' }
      ],
      valueSearch: '',
      validSearch: false,
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

      if (item.name === 'Basic') {
        this.typeSearch = 'basic'
        this.label = 'Address / Public Key / Block Height'
      } else if (item.name === 'Hash') {
        this.typeSearch = 'hash'
        this.label = 'Hash / Tx ID'
      } else if (item.name === 'Namespace') {
        this.typeSearch = 'namespaceInfo'
        this.label = 'Namespace / Sub-namespace'
      } else if (item.name === 'Asset') {
        this.typeSearch = 'assetInfo'
        this.label = 'Asset ID / Alias (e.g. prx.xpx)'
      }

      this.isValid()
      this.searchList.forEach(el => {
        el.class = ''
        if (el.name == item.name) {
          el.class = 'active-s'
        }
      })
    },

    cleanSearchBar() {
      this.searchList.forEach(el => { el.class = '' })
      this.searchList[0].class = 'active-s'
      this.typeSearch = 'basic'
      this.valueSearch = ''
      this.label = 'Address / Public Key / Block Height'
    },

    isHex (value) {
      let regex =  /^[0-9A-Fa-f]+$/
      return regex.test(value)
    },

    isOnlyNumber(value) {
      let regex =  /^[0-9]+$/
      return regex.test(value)
    },

    isValid() {
      let valid = false
      let path = ''

      switch (this.typeSearch) {
        case 'basic':
          if (this.valueSearch.length === 64 && this.isHex(this.valueSearch) === true) {
            path = 'publicKey'
            valid = true
          } else if (this.valueSearch.length === 40 || this.valueSearch.length === 46) {
            path = 'address'
            valid = true
          } else if (this.isOnlyNumber(this.valueSearch) === true) {
            path = 'blockHeight'
            valid = true
          } else {
            valid = false
          }
          break;

        case 'hash':
          if (this.valueSearch.length === 64 && this.isHex(this.valueSearch) === true) {
            path = 'hash'
            valid = true
          } else {
            valid = false
          }
          break;

        case 'namespaceInfo':
          path = 'namespaceInfo'
          valid = true
          break;

        case 'assetInfo':
          path = 'assetInfo'
          valid = true
          break;
      }

      if (valid === false) {
        if (this.valueSearch !== '') {
          this.bannerActive = true
          this.bannerMessage = 'Invalid search value'
        } else {
          this.bannerActive = false
          this.bannerMessage = ''
        }
      } else {
        this.bannerActive = false
        this.bannerMessage = ''
      }
      this.pathSearch = path
      this.validSearch = valid
    },

    /**
     * Perform Search
     *
     * This method executes the search action,
     * taking the type of search and the value entered by the user
     */
    performSearch () {
      this.bannerActive = false
      let routeData
      let lowerValue = this.valueSearch.toLowerCase()
      try {
        switch (this.validSearch) {
          case true:
            if (['basic', 'hash'].includes(this.typeSearch)) {
              if (this.validSearch !== '') {
                routeData = this.$router.resolve({ path: `/result/${this.pathSearch}/${lowerValue}` })
              } else {
                throw 'The search field cannot be empty'
              }
            } else if (['namespaceInfo', 'assetInfo'].includes(this.typeSearch)) {
              if (lowerValue === '') {
                routeData = this.$router.resolve({
                  path: `/list/${(this.pathSearch === 'assetInfo') ? 'assets' : 'namespaces'}`
                })
              } else {
                routeData = this.$router.resolve({
                  path: `/result/${this.pathSearch}/${lowerValue}`
                })
              }

            }

            window.open(routeData.href, '_blank')
            this.cleanSearchBar()
            break;

          case false:
            throw 'Invalid search value'
            break;
        }
      } catch (error) {
        this.bannerActive = true
        this.bannerMessage = error
      }
    }
  }
}
</script>

<style lang="sass">
.md-form input[type=search]:focus:not([readonly])
    box-shadow: 0 1px 0 0 #2BA1B9 !important
    border-bottom: 1px solid #2BA1B9 !important

.place-white
  color: black !important
  margin: 0px !important
  & > input
    color: black !important
    border-bottom: #2BA1B9
    margin: 0px
  & > label
    color: grey !important
    &::after
      background: red !important

.searchLink
  display: block
  transition: all linear 0s
  padding: 5px
  &:hover
    color: white !important
    background: #2BA1B9 !important

.banner
  width: 100%
  background: rgba(255, 0, 0, 0.7)
  border-radius: 25px
  padding: 3px
  font-weight: bold
  font-size: 12px
  display: flex
  justify-content: center

.active-s
  color: white !important
  background: #2BA1B9 !important

.optional-in
  background: transparent
  border: 0px
  border-bottom: 1px solid grey
  outline: none
  width: 100%
  padding: 5px 0px
  margin: 5px 0px !important
  &:focus
    border-bottom: 1px solid #2BA1B9


.searchBar
  border-radius: 20px
  padding: 10px 20px
  margin: 10px
  position: relative
  z-index: 2000
  background: #f4f4f4
  & > .search-cont
    background: transparent
    & > .selector
      display: flex
      flex-flow: row
      justify-content: center
      margin: 0px 0px 10px 0px
      & > .sel-item
        background: white
        color: #2BA1B9
        padding: 2px 15px
        cursor: pointer
        &:first-child
          border-radius: 20px 0px 0px 20px
        &:last-child
          border-radius: 0px 20px 20px 0px
    & > form
      width: 100%
      display: flex
      flex-flow: row nowrap
      justify-content: space-between
      align-items: center
      & > div
        flex-grow: 20
      & > button
        flex-grow: 1
        display: flex
        flex-flow: row nowrap
        justify-content: center
        align-items: center
        margin: 0px 0px 0px 10px
        padding: 13px 34px
        border-radius: 30px
        color: white
        text-transform: uppercase
        font-size: 12px
        font-weight: bold
        background: #2BA1B9
        border: none
@media screen and (max-width: 450px)
    .searchBar > .search-cont > form
      flex-flow: column
      & > div
        width: 100%
      & > button
        width: 100%
        margin: 0px 0px 3px 0px



    // width: 100%
    // display: flex
    // flex-flow: row wrap
    // align-items: center
    // justify-content: space-between
    // & > .search-button
    //   margin: 0px 10px
    //   display: flex
    //   flex-flow: row wrap
    //   justify-content: center
    // & > .search-input
    //   margin: 0px 10px
    //   display: flex
    //   flex-flow: row nowrap
    //   align-items: center
    //   flex-grow: 3
    //   & > div
    //     margin: 0px
    //   & > button
    //     display: flex
    //     flex-flow: row nowrap
    //     justify-content: center
    //     align-items: center
    //     margin: 0px 0px 0px 10px
    //     padding: 13px 34px
    //     border-radius: 30px
    //     color: white
    //     text-transform: uppercase
    //     font-size: 12px
    //     font-weight: bold
    //     background: #2BA1B9
    //     border: none
    //     & > img
    //       margin: 0px
    //       width: 15px

@media screen and (max-width: 620px)
  // .dropdown
  //   width: 100% !important

  // .searchBar
  //   & > .search-cont
  //     flex-flow: column
  //     & > .search-button
  //       margin: 5px
  //       flex-grow: 0
  //       width: 100%
  //     & > .search-input
  //       display: flex
  //       flex-flow: column
  //       margin: 5px
  //       flex-grow: 0
  //       width: 100%
  //       & > button
  //         width: 100%
  //         margin: 0px

</style>
