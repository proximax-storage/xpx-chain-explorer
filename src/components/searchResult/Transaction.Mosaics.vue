<template>
  <div class="mosaics animated faster fadeIn" v-if="mosaicList.length > 0">
    <h1 class="supertitle center-text">
      Mosaics In Transfer
    </h1>

    <div>
      <div class="element" v-for="(item, index) in mosaicList" :key="index">

        <div class="sub animated faster fadeInDown">
          <div class="title">Mosaic Id</div>
          <div class="value link" @click="goToMosaic(item.id)">
            {{ item.id }}
          </div>
        </div>

        <div v-if="item.name !== null" class="sub animated faster fadeIn">
          <div class="title">Mosaic Alias Name</div>
          <div class="valueLower link" @click="goToMosaic(item.name)">{{ item.name }}</div>
        </div>

        <div class="sub animated faster fadeInDown">
          <div class="title" >Mosaic {{ amountQuantity }}</div>
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
  name: 'MosaicsInTransfer',
  props: {
    params: Array,
  },
  data () {
    return {
      xpx: this.$store.state.xpx,
      namespaceXpx: this.$store.state.namespaceXpx,
      finalData: [],
      titleMosaic: 'Mosaic Id',
      mosaicAliasName: [],
      arrayAmount: [],
      amountQuantity: 'Amount',
      mosaicList: []
    }
  },
  mounted () {
  },
  methods: {
    goToNamespace (namespaceId) {
      let routeData = this.$router.resolve({ path: `/result/namespaceInfo/${namespaceId}` })
      window.open(routeData.href, '_blank')
    },

    goToMosaic (mosaicId) {
      let routeData = this.$router.resolve({ path: `/result/mosaicInfo/${mosaicId}` })
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
              let mosaicResponse = await this.$proxProvider.getMosaic(id).toPromise()
              tmpObj.divisibility = mosaicResponse.divisibility
              let mosaicExist = this.mosaicList.find(el => el.id === tmpObj.id)

              if ([undefined, null].includes(mosaicExist) === false) {
                this.mosaicList.forEach(el => {
                  if (el.id === tmpObj.id) {
                    el.amount += tmpObj.amount
                  }
                })
              } else {
                this.mosaicList.push(tmpObj)
              }
            } catch (error) {
              if (error && error.statusCode === 404) {
                this.titleMosaic = 'Mosaic Alias ID'
                try {
                  let namespaceResponse = await this.$proxProvider.getNamespacesInfo(id).toPromise()
                  let namespaceName = await this.$proxProvider.getNamespacesName([id]).toPromise()
                  let mosaicAliasId = new Id(namespaceResponse.alias.mosaicId)
                  let mosaicAliasInfo = await this.$proxProvider.getMosaic(mosaicAliasId).toPromise()

                  tmpObj.name = this.sortName(namespaceName)
                  tmpObj.id = mosaicAliasInfo.mosaicId.id.toHex()
                  tmpObj.divisibility = mosaicAliasInfo.divisibility

                  let mosaicExist = this.mosaicList.find(el => el.id === tmpObj.id)

                  if ([undefined, null].includes(mosaicExist) === false) {
                    this.mosaicList.forEach(el => {
                      if (el.id === tmpObj.id) {
                        el.name = tmpObj.name
                        el.amount += tmpObj.amount
                      }
                    })
                  } else {
                    this.mosaicList.push(tmpObj)
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

.mosaics
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
