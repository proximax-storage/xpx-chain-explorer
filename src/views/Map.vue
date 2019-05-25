<template>
  <div class="map">
    <div class="cont">
      <div class="imap" v-for="(item, index) in mapList" v-show="item.active === true" :key="index" v-html="item.template"></div>
    </div>
    <div>
    <div class="filter-input">
      <div>
        <mdb-dropdown style="width: 100%; margin-top:10px">
          <mdb-dropdown-toggle slot="toggle" color="primary" style="width: 100%; font-weight:bold">{{ buttonName || 'Select search' }}</mdb-dropdown-toggle>
          <mdb-dropdown-menu>
            <mdb-dropdown-item v-for="(item, index) in listOfOptions" :key="index">
              <a class="searchLink" @click="changeSearch(item)">{{ item }}</a>
            </mdb-dropdown-item>
          </mdb-dropdown-menu>
        </mdb-dropdown>
      </div>
      <div>
        <mdb-input icon="search white-text" label="Filter Server" v-model="filter"/>
      </div>
    </div>
    </div>
    <div class="control">
      <div class="cardServe" v-for="(item, index) in mapList" :key="index" @click="activate(item)" :style="(item.visible) ? 'display: flex' : 'display: none'">
        <div>{{ item.name }}</div>
        <div>{{ item.countrie }}</div>
        <div :style="(item.active) ? 'color: green' : 'color: red'">{{ item.active }}</div>
        <mdb-icon v-if="item.active" icon="check green-text"/>
        <mdb-icon v-if="!item.active" icon="times red-text"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mdbIcon, mdbInput, mdbDropdown, mdbDropdownItem, mdbDropdownMenu, mdbDropdownToggle } from 'mdbvue'

export default {
  name: 'Map',
  components: {
    mdbIcon,
    mdbInput,
    mdbDropdown,
    mdbDropdownItem,
    mdbDropdownMenu,
    mdbDropdownToggle
  },
  data () {
    return {
      filter: '',
      filterExe: 'name',
      buttonName: undefined,
      listOfOptions: [
        'By name',
        'By countrie'
      ],
      mapList: [
        {
          name: 'Louvre Museum',
          countrie: 'France',
          template: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.8741023651414!2d2.335455315275216!3d48.86061107928766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e267a32d441%3A0xb0088e1f7c07f451!2sPir%C3%A1mide+del+Museo+del+Louvre!5e0!3m2!1ses-419!2sve!4v1558762417387!5m2!1ses-419!2sve" width="100%" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>',
          active: true,
          visible: true
        },
        {
          name: 'Salto Angel',
          countrie: 'Venezuela',
          template: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3968.187368910313!2d-62.53761318583581!3d5.968913545676438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8dc6be717030a879%3A0x73210e8bf60fdfe7!2sSalto+Angel!5e0!3m2!1ses-419!2sve!4v1558762489623!5m2!1ses-419!2sve" width="100%" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>',
          active: false,
          visible: true
        },
        {
          name: 'Statue of Liberty',
          countrie: 'USA',
          template: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.306387423316!2d-74.04668908505585!3d40.68924937933436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25090129c363d%3A0x40c6a5770d25022b!2sEstatua+de+la+Libertad!5e0!3m2!1ses-419!2sve!4v1558772995244!5m2!1ses-419!2sve" width="100%" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>',
          active: false,
          visible: true
        }
      ]
    }
  },
  
  methods: {
    activate (item) {
      this.mapList.forEach(el => {
        el.active = false
      })

      item.active = true
    },
    changeSearch (item) {
      console.log(this.filterExe)
      if (item === 'By name') {
        this.filterExe = 'name'
        console.log('Entro npmbre')
      } 
      
      if (item === 'By countrie') {
        this.filterExe = 'countrie'
        console.log('Entro pais')
      }

      this.buttonName = item
    }
  },
  watch: {
    filter (n, o) {
      this.mapList.forEach(el => {
        if (this.filterExe !== '') {
          console.log(this.filterExe)
          el.visible = false
          let tmp = el[this.filterExe].toLowerCase()
          if (tmp.indexOf(this.filter.toLowerCase()) !== -1) {
            el.visible = true
          }
        }
        
      })
      
      if (this.filterExe === '') {
        this.mapList.forEach(el => {
          el.visible = true
        });
      }
    }
  }
}
</script>

<style lang="sass">
$radius: 5px

.searchLink
  font-weight: bold

.md-form > input
  color: white !important

.map
  display: block
  margin: 0px
  padding: 10px
  & > .cont
    display: flex
    flex-flow: column nowrap
    align-items: center
    margin: 0px
    width: 100%
    & > .imap
      width: 100%
      padding: 10px
      background: #dddddd
      border-radius: 5px
  & > .filter-input
    display: flex
    flex-flow: column nowrap
    justify-content: space-between
    align-items: center
  & > .control
    display: flex
    flex-flow: column nowrap
    justify-content: center
    align-items: center
    margin: 10px 0px
    padding: 10px 0px
    & > .cardServe
      width: 100%
      display: flex
      flex-flow: row nowrap
      justify-content: space-between
      align-items: center
      text-transform: uppercase
      font-size: 12px
      font-weight: bold
      background: #DDD
      color: black
      padding: 10px
      margin: 10px 0px
      border-radius: $radius
      cursor: pointer
      &:hover
        background: #f4f4f4
</style>
