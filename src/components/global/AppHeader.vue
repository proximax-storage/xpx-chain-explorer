<template>
  <!-- Header Component -->
  <div class="header animated faster fadeIn">
    <!-- Image Container -->
    <figure>
      <img :src="require('@/assets/logo-proximax-sirius-bc-explorer-white.svg')" alt="logo" class="logo">
    </figure>
    <!-- End Image Container -->

    <!-- Navigation Container -->
    <nav>

      <!-- Elements Of Navigation iterated -->
      <div class="nav-item" v-for="(item, index) in navItems" :key="index" :class="item.class" :route="item.route" @click="buttonAction">
        {{ item.name }}
      </div>
      <!-- End Element of Navigation Area -->

    </nav>
    <!-- End Navigation Container -->

  </div>
  <!-- End Header Component -->
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {
      navItems: [
        { name: 'transaction', route: '', class: 'active' },
        { name: 'network stats', route: 'networkStats', class: 'inactive' },
        { name: 'map', route: 'map', class: 'inactive' }
      ]
    }
  },
  methods: {
    /**
     * Redirect Action
     *
     * Depending on the Item, this method performs the redirection action in a
     * new tab to the search that is desired
     *
     * @param { String } itemRoute
     */
    redirectAction (itemRoute) {
      this.$router.push(itemRoute)
    },

    /**
     * Button Action
     *
     * This method performs a style change on the element when it is clicked,
     * and calls the redirectAction method
     *
     * @param { Object } event
     */
    buttonAction (e) {
      let objectRoute = e.target.getAttribute('route')

      this.navItems.forEach(el => {
        el.class = 'inactive'
        if (el.route === objectRoute) {
          el.class = 'active'
        }
      })

      this.redirectAction(`/${objectRoute}`)
      this.cleanError()
    },

    /**
     * Verify Route
     *
     * This method verifies the route and makes a change of styles in the element of the navigation,
     * depending on the route in which the user is, if it is available.
     *
     * this method call redirectAction method and changeClass Method
     */
    verifyRoute () {
      let currentPath = window.location.hash
      currentPath = currentPath.slice(2)
      this.redirectAction(currentPath)
      this.changeClass(currentPath)
    },

    /**
     * Change Class
     *
     * This method changes the style of one of the navigation elements
     * depending on the route that you receive by parameter.
     */
    changeClass (route) {
      for (let i = 0; i < this.navItems.length; i++) {
        // console.log(this.navItems[i])
        this.navItems[i].class = 'inactive'
        if (this.navItems[i].route === route) {
          this.navItems[i].class = 'active'
        }
      }
    },

    cleanError () {
      this.$store.dispatch('updateErrorInfo', {
        active: false,
        message: '',
        submessage: ''
      })
    }
  },

  /**
   * Mounted
   *
   * Call Verify Route
   */
  mounted () {
    this.verifyRoute()
  }
}
</script>

<style lang="sass" scoped>
.logo
  background: rgba(45, 142, 155, 0.3)
  border-radius: 5px

.inactive
  border-bottom: 2px solid #ddd

.active
  border-bottom: 2px solid #2d8e9b

.header
  width: 100%
  display: flex
  flex-flow: column nowrap
  align-items: center
  padding: 10px
  & > figure
    width: 300px
    padding: 20px
  & > nav
    width: 100%
    display: flex
    flex-flow: row nowrap
    & > .nav-item
      padding: 5px
      flex-grow: 1
      text-align: center
      text-transform: uppercase
      color: black
      font-weight: bold
      font-size: 15px
      cursor: pointer
      &:hover
        border-bottom: 2px solid #2d8e9b

@media screen and (max-width: 550px)
  .header > figure
    width: 100%
</style>
