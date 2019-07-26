<template>
  <!-- Header Component -->
  <div class="header animated faster fadeIn">
    <!-- Image Container -->
    <figure>
      <img :src="require('@/assets/logo-proximax-sirius-explorer.svg')" alt="logo">
      <div class="date">
        <div class="day">
          <div>{{ date.month }}</div>
          <div>{{ date.day }}</div>
        </div>
        <div class="year">
          <p>{{ date.year[0] }}</p>
          <p>{{ date.year[1] }}</p>
          <p>{{ date.year[2] }}</p>
          <p>{{ date.year[3] }}</p>
        </div>
      </div>
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
        { name: 'Blocks', route: '', class: 'active' },
        { name: 'Network stats', route: 'networkStats', class: 'inactive' },
        { name: 'Map', route: 'map', class: 'inactive' }
      ],
      date: {
        day: '01',
        month: 'Jan',
        year: ['2', '0', '1', '9']
      }
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
    },

    defineDate () {
      let time = new Date()
      let allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      this.date.day = time.getDate()
      this.date.month = allMonths[time.getMonth()]
      let year = Array.from(time.getFullYear().toString())
      console.log(year)
      this.date.year = year
    }
  },

  /**
   * Mounted
   *
   * Call Verify Route
   */
  mounted () {
    this.verifyRoute()
    this.defineDate()
  }
}
</script>

<style lang="sass" scoped>
.date
  color: black

.version
  color: black
  position: absolute
  text-align: center
  right: 0
  left: 0
  top: 10px
  width: 100px
  margin: auto
  padding: 3px 20px
  border-radius: 30px
  font-size: 12px
  font-weight: bold

.inactive
  box-shadow: inset 0px 0px 0px 0px

.active
  box-shadow: inset 0px -3px 0px 0px

.header
  width: 100%
  display: flex
  flex-flow: column nowrap
  align-items: center
  & > figure
    display: flex
    justify-content: space-between
    width: 100%
    padding: 15px
    margin: 0px
    & > img
      width: 200px
    & > .date
      display: flex
      flex-flow: column
      & > .day
        flex-grow: 1
        display: flex
        justify-content: center
        & > div
          font-size: 25px
        & > div:first-child
          padding-right: 2px
        & > div:last-child
          padding-left: 2px
      & > .year
        display: flex
        justify-content: space-between
        font-size: 13px
        & > p
          margin: 0px

  & > nav
    width: 100%
    display: flex
    flex-flow: row nowrap
    background: -webkit-linear-gradient(top, #2d819b 50%, #0000009e)
    & > .nav-item
      padding: 5px
      flex-grow: 1
      text-align: center
      text-transform: uppercase
      color: white
      font-weight: bold
      font-size: 15px
      cursor: pointer
      &:hover
        box-shadow: inset 0px -3px 0px 0px

@media screen and (max-width: 550px)
  .header
    & > figure
      width: 100%
    & > nav
      flex-flow: row nowrap
</style>
