<template>
  <!-- Header Component -->
  <div class="header animated faster fadeIn">
    <!-- Image Container -->
    <div class="cont">
      <div class="imgver">
        <img :src="require('@/assets/logo-proximax-sirius-explorer.svg')" alt="logo" class="logo">
        <div class="vers">{{ explorerVersion }}</div>
      </div>
      <div class="date">
        <div class="day">
          <div>{{ date.month }}</div>
          <div>{{ date.day }},</div>
          <div>{{ date.year }}</div>
        </div>
        <div class="hours">
          <div>{{ date.dayName }}</div>
          <div>|</div>
          <div>{{ date.militarHour }}</div>
        </div>
      </div>
    </div>
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
        { name: 'Blocks', route: '', class: 'active-h' },
        { name: 'Network stats', route: 'networkStats', class: 'inactive-h' },
        { name: 'Map', route: 'map', class: 'inactive-h' }
      ],
      date: {
        dayName: 'Mon.',
        day: '01',
        month: 'Jan',
        year: 2019,
        militarHour: '12:00'
      },
      explorerVersion: 'v0.3.7'
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
        el.class = 'inactive-h'
        if (el.route === objectRoute) {
          el.class = 'active-h'
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

        this.navItems[i].class = 'inactive-h'
        if (this.navItems[i].route === route) {
          this.navItems[i].class = 'active-h'
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
      let allMonths = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
      let allDays = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.']
      this.date.day = time.getDate()
      this.date.month = allMonths[time.getMonth()]
      let year = time.getFullYear()
      this.date.year = year
      this.date.militarHour = `${time.getHours()}:${(time.getMinutes() < 10) ? `0${time.getMinutes()}` : time.getMinutes()}`
      this.date.dayName = allDays[time.getDay()]
    }
  },

  /**
   * Mounted
   *
   * Call Verify Route
   */
  mounted () {
    this.verifyRoute()
    setInterval(() => {
      this.defineDate()
    }, 1000)
  }
}
</script>

<style lang="sass" scoped>
.logo
  width: 200px

.imgver
  display: flex
  width: auto
  & > .vers
    padding: 0px 3px
    display: flex
    flex-flow: row nowrap
    justify-content: center
    align-items: flex-end
    color: black
    font-size: 10px

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

.inactive-h
  box-shadow: inset 0px 0px 0px 0px

.active-h
  box-shadow: inset 0px -4px 0px 0px

.header
  width: 100%
  display: flex
  flex-flow: column nowrap
  align-items: center
  & > .cont
    display: flex
    justify-content: space-between
    width: 100%
    padding: 10px
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
          padding: 0px 3px
      & > .hours
        display: flex
        justify-content: flex-end
        font-size: 13px
        font-weight: bold
        & > div
          padding: 0px 3px

  & > nav
    width: 100%
    display: flex
    flex-flow: row nowrap
    justify-content: center
    background: -webkit-linear-gradient(top, #33b7d2, #0f7084)
    & > .nav-item
      padding: 5px 30px
      text-align: center
      text-transform: uppercase
      color: white
      font-weight: bold
      font-size: 15px
      cursor: pointer
      // &:hover
      //   box-shadow: inset 0px -2px 0px 0px #5bcde4

@media screen and (max-width: 400px)
  .header
    & > .cont
      width: 100%
      flex-flow: column
      & > .imgver
        display: flex
        justify-content: column
        width: 150px
      & > .date
        display: flex
        flex-flow: row
        & > .day
          justify-content: flex-end
          & > div
            font-size: 13px
            font-weight: bold
            text-align: left

    & > nav
      justify-content: flex-start
      flex-flow: row nowrap
      & > .nav-item
        flex-grow: 1
        padding: 5px 0px


</style>
