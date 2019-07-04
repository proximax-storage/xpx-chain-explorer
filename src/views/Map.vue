<template>
  <!-- Map View -->
  <div class="map">

    <!-- Map Container -->
    <div class="cont animated fast fadeIn">
      <div id="first" class="imap"></div>
      <div v-if="false" class="imap" v-for="(item, index) in mapList" v-show="item.active === true" :key="index" v-html="item.template"></div>
    </div>
    <!-- End Map Container -->

    <!-- Input Filter Container -->
    <div class="animated fast fadeIn">
      <div class="filter-input">
        <div>
          <mdb-dropdown style="width: 100%; margin-top:10px">
            <mdb-dropdown-toggle slot="toggle" color="teal darken-1" style="width: 100%; font-weight:bold">{{ buttonName || 'Select search' }}</mdb-dropdown-toggle>
            <mdb-dropdown-menu>
              <mdb-dropdown-item v-for="(item, index) in listOfOptions" :key="index" class="searchLink">
                <a  @click="changeSearch(item)">{{ item }}</a>
              </mdb-dropdown-item>
            </mdb-dropdown-menu>
          </mdb-dropdown>
        </div>
        <div>
          <mdb-input label="Filter Server" v-model="filter"/>
        </div>
      </div>
    </div>
    <!-- End Input Filter Container -->

    <!-- Map Options Container -->
    <div class="control">
      <div class="cardServe" v-for="(item, index) in mapList" :key="index" @click="activate(item)" :style="(item.visible) ? 'display: flex' : 'display: none'">
        <div>
          <div class="title">Name</div>
          <div class="value">{{ item.name }}</div>
        </div>
        <div>
          <div class="title">Ip</div>
          <div class="value">{{ item.ip }}</div>
        </div>
        <div>
          <div class="title">Version</div>
          <div class="value">{{ item.version }}</div>
        </div>
        <div>
          <div class="title">Location</div>
          <div class="value">{{ item.location }}</div>
        </div>
        <div>
          <div class="title">Height</div>
          <div class="value">{{ item.height }}</div>
        </div>
        <div>
          <div class="title">Status</div>
          <div class="value">{{ item.status }}</div>
        </div>
      </div>
    </div>
    <!-- End Map Options Container -->

  </div>
  <!-- End Map View -->
</template>

<script>
import { mdbIcon, mdbInput, mdbDropdown, mdbDropdownItem, mdbDropdownMenu, mdbDropdownToggle } from 'mdbvue'
import axios from 'axios'

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
      ],
      mapList: [
        {
          name: 'bctestnet1.xpxsirius.io:3000',
          ip: '54.255.178.204',
          template: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2812.3311413209963!2d103.8531170829637!3d1.2929284703464528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMzQuNCJOIDEwM8KwNTEnMTYuOSJF!5e0!3m2!1ses-419!2sve!4v1562199616164!5m2!1ses-419!2sve" width="100%" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>',
          version: 0,
          location: 'Malasia',
          height: null,
          status: 'Online',
          active: true,
          visible: true
        }
      ]
    }
  },

  mounted () {
    this.loadMap()
    this.mapList.forEach(el => {
      axios.get(`http://${el.name}/chain/height`).then(
        response => {
          console.log(response.data)
          el.height = response.data.height[0]
        }
      )
    })

    // let resp
    // axios.get('./config/nodesInformation.json')
    //   .then(response => {
    //     resp = Array.from(response.data.nodesInfo)

    //     resp.forEach(el => {
    //       axios.get(`http://${el.name}/node/info`).then(
    //         response2 => {
    //           console.log(response)
    //           axios.get(`http://${el.name}/chain/height`).then(
    //             response3 => {
    //               console.log(response2)

    //               let tmpObj = {
    //                 name: response.data.name,
    //                 ip: response.data.host,
    //                 version: response.data.version,
    //                 location: response.data.location,
    //                 height: response3.data.height[0]
    //               }

    //               this.mapList.push(tmpObj)
    //               console.log(this.mapList)
    //             }
    //           )
    //         }
    //       )
    //     })
    //   })
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
      }

      if (item === 'By countrie') {
        this.filterExe = 'countrie'
      }

      this.buttonName = item
    },
    loadMap () {
      map = new google.maps.Map(document.getElementById('first'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      })
    }
  },
  watch: {
    filter (n, o) {
      this.mapList.forEach(el => {
        if (this.filterExe !== '') {
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

.title
  font-size: 9px
  font-weight: bold
  text-transform: uppercase
  margin: 0px
  text-align: center
  color: grey

.value
  font-size: 14px
  font-weight: normal
  text-transform: uppercase
  text-align: center
.searchLink
  font-weight: bold
  &:hover
    background: #2d8e9b !important

.md-form > input
  color: black !important

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
      height: 450px
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
