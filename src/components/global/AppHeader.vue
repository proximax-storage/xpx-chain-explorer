<template>
  <div class="header">
    <figure>
      <img :src="require('@/assets/logo-proximax-sirius-bc-explorer-white.svg')" alt="logo">
    </figure>
    <nav>
      <div class="nav-item" v-for="(item, index) in navItems" :key="index" :class="item.class" :route="item.route" @click="buttonAction(item)">
        {{ item.name }}
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {
      navItems: [
        { name: 'transaction', route: 'transaction', class: 'active' },
        { name: 'network stats', route: 'network', class: 'unactive' },
        { name: 'map', route: 'map', class: 'unactive' }
      ]
    }
  },
  methods: {
    buttonAction (item) {
      this.navItems.forEach(el => {
        el.class = 'unactive'
      })
      item.class = 'active'
      // this.router.push(`/${item.route}`)
    }
  }
}
</script>

<style lang="sass" scoped>
.unactive
  border-bottom: 2px solid #7ab5e1

.active
  border-bottom: 2px solid #7ab5e160

.header
  width: 100%
  display: flex
  flex-flow: column nowrap
  align-items: center
  padding: 10px
  & > figure
    width: 400px
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
      color: orange
      font-weight: bold
      font-size: 15px
      cursor: pointer
      &:hover
        border-bottom: 2px solid #7ab5e160

@media screen and (max-width: 550px)
  .header > figure
    width: 100%
</style>