<template>
  <!-- Map View -->
  <div class="map">

    <!-- Map Container -->
    <div class="cont animated fast fadeIn">
      <div id="first" class="imap">
        <div class="map-layer">
          <img :src="require('@/assets/icon-proximax-nodes.svg')" alt="Proximax Node" width="120">
        </div>
      </div>
      <!-- <div v-if="true" class="imap" v-for="(item, index) in mapList" v-show="item.active === true" :key="index" v-html="item.template"></div> -->
    </div>
    <!-- End Map Container -->

    <!-- Input Filter Container -->
    <div class="animated fast fadeIn">
      <div class="filter-input">
        <!-- <div>
          <mdb-dropdown style="width: 100%; margin-top:10px">
            <mdb-dropdown-toggle slot="toggle" color="black-text" style="width: 100%; font-weight:bold; border: 2px solid #2BA1B9; color: black; border-radius: 20px">{{ buttonName || 'Select search' }}</mdb-dropdown-toggle>
            <mdb-dropdown-menu>
              <mdb-dropdown-item v-for="(item, index) in listOfOptions" :key="index" class="searchLink">
                <a  @click="changeSearch(item)">{{ item }}</a>
              </mdb-dropdown-item>
            </mdb-dropdown-menu>
          </mdb-dropdown>
        </div> -->
        <div>
          <!-- <mdb-input type="search" label="Filter Server" v-model="filter"/> -->
          <input type="search" class="optional-in" v-model="filter" placeholder="Filter">
        </div>
      </div>
    </div>
    <!-- End Input Filter Container -->

    <!-- Map Options Container -->
    <div class="control">
      <div class="cardServe" v-for="(item, index) in mapList" :key="index" @click="activate(item)" :style="(item.visible) ? 'display: flex' : 'display: none'" v-show="item.active">
        <div>
          <div class="title">Owner</div>
          <div class="icon-cont"><img :src="require(`@/assets/${item.icon}`)" alt="icon" width="21"></div>
        </div>
        <div>
          <div class="title">Name</div>
          <div class="valueLower">{{ item.name }}</div>
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
          <div class="value" :style="(item.status == 'Online') ? 'color: #2BA1B9; font-weight: bold' : 'color: red; font-weight: bold'">{{ item.status }}</div>
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
import { filter } from 'minimatch';
import { Id } from 'tsjs-xpx-chain-sdk'

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
      map: undefined,
      listOfOptions: [
        'By name',
        'By location',
        'By status'
      ],
      mapList: [],
      showFirstMap: false
    }
  },

  mounted () {
    this.getInfoNodes()
  },

  methods: {
    async getInfoNodes () {
      let maps = this.$config.mapsInfo
      let formatMaps = []

      maps.forEach(map => {
        let tmpObj = {
          name: map.name,
          ip: map.ip,
          version: 0,
          location: "",
          lat: 0,
          lon: 0,
          height: null,
          status: "Online",
          active: false,
          visible: false,
          urlNode: map.urlNode,
          icon: "proximax.svg"
        }

        formatMaps.push(tmpObj)
      })

      formatMaps[0].active = true
      formatMaps[0].visible = true
      this.mapList = formatMaps
      this.analyzeMaps()
    },

    analyzeMaps () {
      this.mapList.forEach(async map => {
        try {
          let location = await axios.get(`https://geoip-db.com/json/${map.ip}`)
          let nodeInfo = await axios.get(`${map.urlNode}/node/info`)
          let height = await axios.get(`${map.urlNode}/chain/height`)

          map.lat = location.data.latitude
          map.lon = location.data.longitude
          map.location = location.data.country_name
          map.version = nodeInfo.data.version
          map.height = (new Id(height.data.height)).compact()
          map.status = 'Online'

        } catch (e) {
          map.lat = ''
          map.lon = ''
          map.location = 'Unknown'
          map.version = 0
          map.height = 0
          map.status = 'Offline'
        }

        this.verifyMapList()
      })
    },

    loadFirstMap () {
      this.loadMap(this.mapList[0].lat, this.mapList[0].lon, this.mapList[0])
    },

    activate (item) {
      this.loadMap(item.lat, item.lon, item)
    },

    changeSearch (item) {
      if (item === 'By name') {
        this.filterExe = 'name'
      }

      if (item === 'By location') {
        this.filterExe = 'location'
      }

      if (item === 'By status') {
        this.filterExe = 'status'
      }

      this.buttonName = item
    },

    // Load An Map
    loadMap (lat, lon, item) {
      mapboxgl.accessToken = 'pk.eyJ1Ijoiai1tb3JhMTUiLCJhIjoiY2p5MGY4a2RhMDJqZjNucXh0anl0ZDd2eCJ9.Lsq-ETN03fbVIctkd9lV3Q';
      let map = new mapboxgl.Map({
        container: 'first',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [lon, lat],
        zoom: 10
      })


      // map.addControl(new mapboxgl.NavigationControl())

      let popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(
          `<div>
            <div><b>Name: </b>${item.name}</div>
            <div><b>IP: </b>${item.ip}</div>
            <div><b>Location: </b>${item.location}</div>
          </div>`
        )

      let image = require('../assets/map-pointer.svg')
      let el = document.createElement('div')
      el.style.width = '40px'
      el.style.height = '52px'
      el.style.backgroundImage = `url(${image})`
      el.style.backgroundRepeat = 'no-repeat'

      var marker = new mapboxgl.Marker(el)
        .setLngLat([lon, lat])
        .setPopup(popup)
        .addTo(map)
    },

    verifyMapList () {
      if (this.mapList.some(el => el.lat > 0) === true) {
        this.loadFirstMap()
        this.mapList.forEach(el => {
          el.active = true
        })
      }
    }
  },

  // WATCHERS
  watch: {
    filter (n, o) {
      if (n !== '') {
        let filter = n.toLowerCase()
        this.mapList.forEach((el, index) => {
          let activesArr = [false, false, false, false, false]

          activesArr[0] = (el.name.toLowerCase().search(filter) === 0) ? true : false
          activesArr[1] = (el.height.toString().toLowerCase().search(filter) === 0) ? true : false
          activesArr[2] = (el.ip.toString().toLowerCase().search(filter) === 0) ? true : false
          activesArr[3] = (el.location.toString().toLowerCase().search(filter) === 0) ? true : false
          activesArr[4] = (el.version.toString().toLowerCase().search(filter) === 0) ? true : false

          el.active = activesArr.some(el => el == true)
        })
      } else {
        this.mapList.forEach(el => {
          el.active = true
        })
      }
    }
  }
}
</script>

<style lang="sass">
$radius: 20px

.map-layer
  width: 100%
  height: 40px
  position: absolute
  bottom: 0
  left: 0
  border-radius: 0px 0px $radius $radius
  background: #2BA1B9
  z-index: 10000
  display: flex
  justify-content: center
  align-items: center
  border: 2px solid #2BA1B9
  color: white
  font-weight: bold
  font-size: 17px

.mapboxgl-popup
  color: black

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

.icon-cont
  display: flex
  justify-content: center

.searchLink
  font-weight: bold
  &:hover
    background: #2BA1B9 !important

.valueLower
  font-size: 14px
  font-weight: normal
  text-transform: lowercase
  text-align: center

.md-form > input
  color: black !important

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
      position: relative
      width: 100%
      height: 450px
      border-radius: 20px
      background: #f4f4f4
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
      background: white
      color: black
      padding: 10px
      margin: 10px 0px
      border: 1px solid silver
      border-radius: $radius
      cursor: pointer
      &:hover
        background: #2ba1b914
      & > div
        width: 200px

@media screen and (max-width: 700px)
  .map > .control > .cardServe
    flex-flow: column
    & > div
      width: 100%
      border-bottom: 1px solid #f4f4f4
      padding: 2px
      &:last-child
        border-bottom: 0px solid white
</style>
