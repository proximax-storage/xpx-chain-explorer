<template>
  <div class="mosaics animated faster fadeIn" v-if="showFinalData !== null && showFinalData.length > 0">
    <h1 class="supertitle center-text" v-show="mosaicAliasName.length !== 1 && mosaicAliasName[0] !== 'prx.xpx'">
      Mosaics In Transfer
    </h1>

    <div>
      <div class="element" v-for="(item, index) in showFinalData" :key="index" v-show="mosaicAliasName[index] !== 'prx.xpx'">

        <div class="animated faster fadeInDown">
          <div class="title">{{ titleMosaic }}</div>
          <div class="value link" @click="(titleMosaic === 'Mosaic Id') ? goToMosaic(item.name) : goToNamespace(item.name)">{{ item.name }}</div>
        </div>

        <div v-if="titleMosaic == 'Mosaic Alias ID'" class="animated faster fadeInDown">
          <div class="title">Mosaic Alias Name</div>
          <div class="valueLower">{{ mosaicAliasName[index] }}</div>
        </div>

        <div class="animated faster fadeInDown">
          <div class="title" >Mosaic {{ amountQuantity }}</div>
          <div class="value" v-html="arrayAmount[index]"></div>
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
      finalData: [],
      titleMosaic: 'Mosaic Id',
      mosaicAliasName: [],
      arrayAmount: [],
      amountQuantity: 'Amount'
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
        this.params.forEach(el => {
          let tmpObj = {}
          if (el.id.toHex() === this.xpx) {
            this.$emit('returnAmount', el.amount.compact())
          } else {
            this.amountQuantity = 'Quantity'
            tmpObj.name = el.id.toHex()
            this.$proxProvider.getMosaic(el.id).subscribe(
              response => {
                if (response.properties.divisibility !== 0) {
                  this.arrayAmount.push(this.$utils.fmtDivisibility(el.amount.compact(),  response.properties.divisibility))
                  // tmpObj.amount = this.$utils.fmtDivisibility(el.amount.compact(),  response.properties.divisibility)
                  this.finalData.push(tmpObj)
                } else {
                  this.arrayAmount.push(`${el.amount.compact()}`)
                  // tmpObj.amount = `${el.amount.compact()}`
                  this.finalData.push(tmpObj)
                }
              },
              error => {
                this.$proxProvider.getNamespacesInfo(el.id).subscribe(
                  response => {
                    this.$proxProvider.getNamespacesName([el.id]).subscribe(
                      nameResponse => {
                        nameResponse = nameResponse.reverse()
                        if (nameResponse.length === 1) {
                          this.mosaicAliasName.push(nameResponse[0].name)
                        } else if (nameResponse.length === 2) {
                          this.mosaicAliasName.push(`${nameResponse[0].name}.${nameResponse[1].name}`)
                        } else if (nameResponse.length === 3) {
                          this.mosaicAliasName.push(`${nameResponse[0].name}.${nameResponse[1].name}.${nameResponse[2].name}`)
                        }
                      }
                    )
                    this.titleMosaic = 'Mosaic Alias ID'
                    let tmpId = new Id(response.alias.mosaicId).toHex()
                    if (tmpId === this.xpx) {
                      this.$emit('returnAmount', el.amount.compact())
                    } else {
                      this.$proxProvider.getMosaic(tmpId).subscribe(
                        response2 => {
                          if (response2.properties.divisibility !== 0) {
                            this.arrayAmount.push(this.$utils.fmtDivisibility(el.amount.compact(),  response2.properties.divisibility))
                            this.finalData.push(tmpObj)
                          } else {
                            this.arrayAmount.push(`${el.amount.compact()}`)
                            this.finalData.push(tmpObj)
                          }
                        }
                      )
                    }
                  }
                )
              }
            )
          }
        })
      }
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

@media screen and (max-width: 700px)
  .value,
  .valueLower
    font-size: 13px

  .link
    color: #2BA1B9
    text-decoration: underline
    cursor: pointer

  .elemenr
    flex-flow: column

</style>
