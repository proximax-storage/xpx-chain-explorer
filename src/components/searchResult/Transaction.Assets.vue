<template>
  <div class="assets animated faster fadeIn" v-if="assetList.length > 0">
    <h1 class="supertitle center-text">
      Assets In Transfer
    </h1>

    <div>
      <div class="element" v-for="(item, index) in assetList" :key="index">

        <div class="sub animated faster fadeInDown">
          <div class="title">Asset Id</div>
          <div class="value link" @click="goToAsset(item.id)">
            {{ item.id }}
          </div>
        </div>

        <div v-if="item.name !== null" class="sub animated faster fadeIn">
          <div class="title">Asset Alias Name</div>
          <div class="valueLower link" @click="goToAsset(item.name)">{{ item.name }}</div>
        </div>

        <div class="sub animated faster fadeInDown">
          <div class="title" >Asset {{ amountQuantity }}</div>
          <div class="value" v-if="item.divisibility === 0" v-html="item.amount"></div>
          <div class="value" v-if="item.divisibility !== 0" v-html="$utils.fmtDivisibility(item.amount, item.divisibility)">
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { Id } from 'tsjs-xpx-chain-sdk'

export default {
  name: 'AssetsInTransfer',
  props: {
    params: Array,
  },
  data () {
    return {
      xpx: this.$store.state.xpx,
      namespaceXpx: this.$store.state.namespaceXpx,
      finalData: [],
      titleAsset: 'Asset Id',
      assetAliasName: [],
      arrayAmount: [],
      amountQuantity: 'Amount',
      assetList: []
    }
  },
  mounted () {
  },
  methods: {
    goToNamespace (namespaceId) {
      let routeData = this.$router.resolve({ path: `/result/namespaceInfo/${namespaceId}` })
      window.open(routeData.href, '_blank')
    },

    goToAsset (assetId) {
      let routeData = this.$router.resolve({ path: `/result/assetInfo/${assetId}` })
      window.open(routeData.href, '_blank')
    },

    organizeData () {
      if (this.params !== null) {
        let params = this.params
        params.forEach(el => {
          if (el && el.id && el.amount) {
            el.amount = el.amount.compact()
            el.id = el.id.toHex()
          }
        })

        params.forEach(async item => {
          let tmpObj = {}
          let id = Id.fromHex(item.id)
          if (item.id === this.xpx || item.id === this.namespaceXpx) {
            this.$emit('returnAmount', item.amount)
          } else {
            this.amountQuantity = 'Quantity'
            tmpObj.id = item.id
            tmpObj.amount = item.amount
            tmpObj.name = null
            try {
              let assetResponse = await this.$proxProvider.getAsset(id).toPromise()
              tmpObj.divisibility = assetResponse.divisibility
              let assetExist = this.assetList.find(el => el.id === tmpObj.id)

              if ([undefined, null].includes(assetExist) === false) {
                this.assetList.forEach(el => {
                  if (el.id === tmpObj.id) {
                    el.amount += tmpObj.amount
                  }
                })
              } else {
                this.assetList.push(tmpObj)
              }
            } catch (error) {
              if (error && error.statusCode === 404) {
                this.titleAsset = 'Asset Alias ID'
                try {
                  let namespaceResponse = await this.$proxProvider.getNamespacesInfo(id).toPromise()
                  let namespaceName = await this.$proxProvider.getNamespacesName([id]).toPromise()
                  let assetAliasId = new Id(namespaceResponse.alias.mosaicId)
                  let assetAliasInfo = await this.$proxProvider.getAsset(assetAliasId).toPromise()

                  tmpObj.name = this.sortName(namespaceName)
                  tmpObj.id = assetAliasInfo.mosaicId.id.toHex()
                  tmpObj.divisibility = assetAliasInfo.divisibility

                  let assetExist = this.assetList.find(el => el.id === tmpObj.id)

                  if ([undefined, null].includes(assetExist) === false) {
                    this.assetList.forEach(el => {
                      if (el.id === tmpObj.id) {
                        el.name = tmpObj.name
                        el.amount += tmpObj.amount
                      }
                    })
                  } else {
                    this.assetList.push(tmpObj)
                  }
                } catch (error) {
                  console.warn('Namespace Error')
                }
              }
            }
          }
        })
      }
    },

    sortName (arrayNames) {
      let name = ''
      arrayNames = arrayNames.reverse()
      if (arrayNames.length === 1) {
        name = arrayNames[0].name
      } else if (arrayNames.length === 2) {
        name = `${arrayNames[0].name}.${arrayNames[1].name}`
      } else if (arrayNames.length === 3) {
        name = `${arrayNames[0].name}.${arrayNames[1].name}.${arrayNames[2].name}`
      }
      return name
    }
  },

  computed: {
    showFinalData () {
      return this.finalData
    }
  },
  watch: {
    params (nv, ov) {
      this.organizeData()
    }
  }
}
</script>

<style lang="sass" scoped>
.supertitle
  font-size: 17px
  color: #2BA1B9
  padding: 0px 0px 5px 0px
  width: 100%

.center-text
  text-align: center

.assets
  padding: 10px

.element
  padding: 10px
  margin-bottom: 10px
  border-radius: 20px
  font-size: 10px
  display: flex
  flex-flow: row
  justify-content: space-around
  background: #f4f4f4
  & > div
    text-align: center
  &:last-child
    margin: 0px

.title
  font-size: 10px
  font-weight: bold
  text-transform: uppercase
  color: grey

.value
  font-size: 13px
  text-transform: uppercase
  word-break: break-all
  font-weight: normal
  color: black

.valueLower
  font-size: 13px
  word-break: break-all
  font-weight: normal
  color: black

.link:hover
  color: #2BA1B9
  text-decoration: underline
  cursor: pointer

.sub
  min-width: 200px

@media screen and (max-width: 700px)
  .value,
  .valueLower
    font-size: 13px

  .link
    color: #2BA1B9
    text-decoration: underline
    cursor: pointer

  .element
    flex-flow: column

  .sub
    padding: 5px
</style>
