<template>
  <div class="mosaicsList">
    <div class="guide" style="background: black">
      <div>
        <div class="title">Mosaic Id</div>
      </div>

      <div>
        <div class="title">Owner Address</div>
      </div>

      <div>
        <div class="title">Supply</div>
      </div>

      <div>
        <div class="title">Divisibility</div>
      </div>

      <div>
        <div class="title">Height</div>
      </div>
    </div>

    <dir class="empty" v-show="mosaicArr.length === 0">
      <div>
        {{ loaderMessage }}
      </div>

      <div>
        <mdb-progress bgColor="cyan darken-3" style="width: 100%" indeterminate v-if="loaderProgress"/>
      </div>
    </dir>

    <div class="list" v-show="mosaicArr.length > 0">
      <div class="element animated fadeIn" v-for="(item, index) in mosaicArr" :key="index">
        <div>
          <div class="title">Mosaic Id</div>
          <div class="value link" @click="goToMosaic(item.id)">{{ item.id }}</div>
        </div>

        <div>
          <div class="title">Owner Address</div>
          <div class="value link" @click="goToAddress(item.owner.address.pretty())">{{ item.owner.address.pretty() }}</div>
        </div>

        <div>
          <div class="title">Supply</div>
          <div class="value" v-if="item.divisibility !== 0" v-html="$utils.fmtDivisibility(item.supply.compact(), item.divisibility)"></div>
          <div class="value" v-if="item.divisibility === 0" style="font-weight: bold" v-html="item.supply.compact()"></div>
        </div>

        <div>
          <div class="title">Mosaic Id</div>
          <div class="value">{{ item.divisibility }}</div>
        </div>

        <div>
          <div class="title">Height</div>
          <div class="value">{{ item.height.compact() }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Address, QueryParams } from 'tsjs-xpx-chain-sdk'
import { mdbProgress } from 'mdbvue'
import axios from 'axios'

export default {
  name: 'MosaicsList',
  components: {
    mdbProgress
  },
  data () {
    return {
      resp: undefined,
      mosaicArr: [],
      idList: [],
      // LOADER
      loaderMessage: 'Loading mosaics please wait a few moments',
      loaderProgress: true
    }
  },
  mounted () {
    this.checkInfo()
  },
  methods: {
    async checkInfo () {
      if (this.$store.state.rentalFeeInfo === undefined) {
        try {
          let response = await axios.get('./config/config.json')
          let publicKey = response.data.RentalFeeInfo.mosaicRentalFee.publicKey
          let netType = response.data.NetworkType.number
          this.searchList(publicKey, netType)
        } catch (e) {
          this.loaderMessage = 'System error'
          this.loaderProgress = false
        }
      } else {
        this.searchList(this.$store.state.rentalFeeInfo.mosaicRentalFee.publicKey, this.$store.state.netType.number)
      }
    },

    searchList (publicKey, netType) {
      let account = this.$proxProvider.createPublicAccount(publicKey, netType)
      let net = this.$store.state.netType.number
      this.$proxProvider.getAllTransactionsFromAccount(account, new QueryParams(100)).subscribe(
        transactions => {
          if (transactions.length > 0) {
            this.resp = transactions
            this.resp.forEach((el, index) => {
              if (el.type === 16717) {
                this.$proxProvider.getMosaic(el.mosaicId.id).subscribe(
                  response => {
                    response.id = el.mosaicId.id.toHex()
                    this.mosaicArr.push(response)
                  },
                  err => {
                    console.error('Mosaic not found')
                  }
                )
              } else if (el.type === 16705) {
                this.$proxProvider.getMosaic(el.innerTransactions[0].mosaicId.id).subscribe(
                  response => {
                    response.id = response.mosaicId.id.toHex()
                    this.mosaicArr.push(response)
                  },
                  err => {
                    console.error('Mosaic not found')
                  }
                )
              }
            })
          }
        },
        error => {
          console.error('ACCOUNT ERROR....', error)
          this.loaderMessage = 'System error'
          this.loaderProgress = false
        }
      )
    },

    goToAddress (address) {
      let routeData = (address.length === 64) ?
      this.$router.resolve({ path: `/result/publicKey/${ address }` }) :
      this.$router.resolve({ path: `/result/address/${ address }` })
      window.open(routeData.href, '_blank')
    },

    goToBlock (height) {
      let routeData = this.$router.resolve({ path: `/result/blockHeight/${height}` })
      window.open(routeData.href, '_blank')
    },

    goToHash (hash) {
      let routeData = this.$router.resolve({ path: `/result/hash/${hash}` })
      window.open(routeData.href, '_blank')
    },

    goToNamespace (namespaceId) {
      let routeData = this.$router.resolve({ path: `/result/namespaceInfo/${namespaceId}` })
      window.open(routeData.href, '_blank')
    },

    goToMosaic (mosaicId) {
      let routeData = this.$router.resolve({ path: `/result/mosaicInfo/${mosaicId}` })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style lang="sass" scoped>
.mosaicsList
  padding: 10px

.guide
  margin: 0px 0px 5px 0px
  border-radius: 5px
  display: flex
  flex-flow: row
  padding: 10px
  & > div
    flex-grow: 1
    text-align: center
    color: white !important
    & > .title
      display: block
      color: white
  & > div:first-child
    width: 200px
  & > div:nth-child(2n)
    width: 360px
  & > div:nth-child(3n)
    width: 150px
  & > div:nth-child(4n)
    width: 50px
  & > div:last-child
    width: 100px

.empty
  width: 100%
  text-align: center
  background: #f4f4f4
  border-radius: 5px
  margin: 0px 0px 5px 0px
  & > div:first-child
    padding: 10px 5px
    color: orange
    font-weight: bold


.list
  background: transparent

.element
  display: flex
  flex-flow: row
  padding: 10px
  margin: 0px 0px 5px 0px
  border-radius: 5px
  border: 1px solid #f4f4f4
  &:nth-child(odd)
    background: #f4f4f4
  &:nth-child(even)
    background: white
  & > div
    flex-grow: 1
    text-align: center
  & > div:first-child
    width: 200px
  & > div:nth-child(2n)
    width: 360px
  & > div:nth-child(3n)
    width: 150px
  & > div:nth-child(4n)
    width: 50px
  & > div:last-child
    width: 100px

.title
  display: none
  font-size: 10px
  font-weight: bold
  text-transform: uppercase
  color: grey

.value
  font-size: 13px
  font-weight: normal
  text-transform: uppercase
  word-break: break-all
  color: black

.valueLower
  font-size: 13px
  font-weight: normal
  word-break: break-all
  color: black

.link:hover
  color: #2BA1B9
  text-decoration: underline
  cursor: pointer

@media screen and (max-width: 700px)
  .guide
    display: none

  .element
    flex-flow: column
    border-radius: 20px
    & > div
      width: 100% !important
      padding: 5px
      border-bottom: 1px solid silver
    & > div:last-child
      border-bottom: 0px solid silver

  .title
    display: block

  .link
    color: #2BA1B9
    text-decoration: underline
    cursor: pointer
</style>
