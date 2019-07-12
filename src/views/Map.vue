<template>
  <!-- Map View -->
  <div class="map">

    <!-- Map Container -->
    <div class="cont animated fast fadeIn">
      <div id="first" class="imap"></div>
      <!-- <div v-if="true" class="imap" v-for="(item, index) in mapList" v-show="item.active === true" :key="index" v-html="item.template"></div> -->
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
    getInfoNodes () {
      axios.get('./config/nodesInfoMaps.json').then(
        response => {
          this.mapList = response.data
          this.analyzeMaps()
        }
      )
    },

    analyzeMaps () {
      // console.log(this.mapList)
      this.mapList.forEach((el, index) => {
        // console.log(el)
        // Get LatLon
        axios.get(`https://geoip-db.com/json/${el.ip}`).then(
          resp => {
            el.lat = resp.data.latitude
            el.lon = resp.data.longitude

            if (el.urlNode !== undefined) {
              axios.get(`http://${el.urlNode}/chain/height`).then(
                response => {
                  el.height = response.data.height[0]
                }
              )
            }

            this.verifyMapList()
          }
        )
      })
    },

    loadFirstMap () {
      // console.log('Loading First Map')
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

      // console.log(this.filterExe)
      this.buttonName = item
    },

    // Load An Map
    loadMap (lat, lon, item) {
      // console.log(lat, lon)
      mapboxgl.accessToken = 'pk.eyJ1Ijoiai1tb3JhMTUiLCJhIjoiY2p5MGY4a2RhMDJqZjNucXh0anl0ZDd2eCJ9.Lsq-ETN03fbVIctkd9lV3Q';
      let map = new mapboxgl.Map({
        container: 'first',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [lon, lat],
        zoom: 10
      })


      map.addControl(new mapboxgl.NavigationControl())

      let popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(
          `<div>
            <div><b>Name: </b> ${item.name}</div>
            <div><b>IP: </b> ${item.ip}</div>
            <div><b>Location: </b> ${item.location}</div>
          </div>`
        )

      let image = require('../assets/map-pointer-green-15x20.png')
      let el = document.createElement('div')
      el.style.width = '33px'
      el.style.height = '43px'
      el.style.backgroundImage = `url(${image})`

      var marker = new mapboxgl.Marker(el)
        .setLngLat([lon, lat])
        .setPopup(popup)
        .addTo(map)
    },

    verifyMapList () {
      if (this.mapList.some(el => el.lat > 0) === true) {
        this.loadFirstMap()
      }
    }
  },

  // WATCHERS
  watch: {
    filter (n, o) {
      this.mapList.forEach(el => {
        if (this.filterExe !== '') {
          el.visible = false
          let tmp = el[this.filterExe].toLowerCase().toString()
          // console.log(tmp, el[this.filterExe].toLowerCase().toString())
          // console.log(tmp.indexOf(this.filter.toLowerCase()) !== -1)
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
      border-radius: 5px
      background: #dddddd
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
