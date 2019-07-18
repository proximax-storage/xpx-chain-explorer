<template>
  <div class="mosaics animated faster fadeIn" v-if="showFinalData !== null && showFinalData.length > 0">
    <h1 class="supertitle">Mosaics In Transfer</h1>

    <div>
      <div class="element" v-for="(item, index) in showFinalData" :key="index" style="border-radius: 5px" :style="(index % 2 === 0) ? 'background: #DDDDDD' : 'background: #F4F4F4'">

        <div style="padding: 5px 0px 5px 2px " class="animated faster fadeInDown">
          <div class="title">{{ titleMosaic }}</div>
          <div class="value link" @click="(titleMosaic === 'Mosaic Id') ? goToMosaic(item.name) : goToNamespace(item.name)">{{ item.name }}</div>
        </div>

        <div style="padding: 5px 0px 5px 2px " v-if="titleMosaic == 'Mosaic Alias ID'" class="animated faster fadeInDown">
          <div class="title">Mosaic Alias Name</div>
          <div class="value">{{ mosaicAliasName[index] }}</div>
        </div>

        <div style="padding: 5px 0px 5px 2px " class="animated faster fadeInDown">
          <div class="title" >Mosaic {{ amountQuantity }}</div>
          <div class="value" v-html="arrayAmount[index]"></div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MosaicsInTransfer',
  props: {
    params: Array,
  },
  data () {
    return {
      xpx: '0DC67FBE1CAD29E3',
      finalData: [],
      titleMosaic: 'Mosaic Id',
      mosaicAliasName: [],
      arrayAmount: [],
      amountQuantity: 'Amount'
    }
  },
  mounted () {
    console.log(this.params)
    //this.organizeData()
  },
  methods: {
    goToNamespace (namespaceId) {
      let routeData = this.$router.resolve({ path: `/searchResult/namespaceInfo/${namespaceId}` })
      window.open(routeData.href, '_blank')
    },

    goToMosaic (mosaicId) {
      let routeData = this.$router.resolve({ path: `/searchResult/mosaicInfo/${mosaicId}` })
      window.open(routeData.href, '_blank')
    },

    organizeData () {
      // console.log('Mounted')
      if (this.params !== null) {
        this.params.forEach(el => {
          let tmpObj = {}
          if (el.id.toHex().toUpperCase() === this.xpx) {
            this.$emit('returnAmount', this.$utils.fmtAmountValue(el.amount.compact()))
          } else {
            this.amountQuantity = 'Quantity'
            tmpObj.name = el.id.toHex()
            this.$proxProvider.getMosaic(el.id).subscribe(
              response => {
                if (response.properties.divisibility !== 0) {
                  tmpObj.amount = this.$utils.fmtDivisibility(el.amount.compact(),  response.properties.divisibility)
                  this.finalData.push(tmpObj)
                } else {
                  tmpObj.amount = `${el.amount.compact()}`
                  this.finalData.push(tmpObj)
                }
              },
              error => {
                this.$proxProvider.getNamespacesInfo(el.id).subscribe(
                  response => {
                    this.$proxProvider.getNamespacesName([el.id]).subscribe(
                      nameResponse => {
                        nameResponse = nameResponse.reverse()
                        console.log("Name Response", nameResponse)
                        if (nameResponse.length === 1) {
                          console.log()
                          this.mosaicAliasName.push(nameResponse[0].name)
                        } else if (nameResponse.length === 2) {
                          this.mosaicAliasName.push(`${nameResponse[0].name}.${nameResponse[1].name}`)
                        } else if (nameResponse.length === 3) {
                          this.mosaicAliasName.push(`${nameResponse[0].name}.${nameResponse[1].name}.${nameResponse[2].name}`)
                        }
                      }
                    )
                    console.log(response)
                    this.titleMosaic = 'Mosaic Alias ID'
                    let tmpId = this.$proxProvider.createMosaicId(response.alias.mosaicId)
                    this.$proxProvider.getMosaic(tmpId).subscribe(
                      response2 => {
                        if (response2.properties.divisibility !== 0) {
                          // tmpObj.amount = this.$utils.fmtDivisibility(el.amount.compact(),  response2.properties.divisibility)
                          this.arrayAmount.push(this.$utils.fmtDivisibility(el.amount.compact(),  response2.properties.divisibility))
                          this.finalData.push(tmpObj)
                        } else {
                          // tmpObj.amount = `${el.amount.compact()}`
                          this.arrayAmount.push(`${el.amount.compact()}`)
                          this.finalData.push(tmpObj)
                        }
                      }
                    )
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
  margin: 10px 0px 0px 0px
  font-size: 17px
  color: white
  padding: 0px 0px 5px 0px
  width: 100%

.element
  padding: 10px
  margin-bottom: 10px
  font-size: 10px
  &:last-child
    margin: 0px

.title
  font-size: 10px
  font-weight: bold
  text-transform: uppercase
  color: black

.value
  font-size: 13px
  text-transform: uppercase
  word-break: break-all
  color: black

.link:hover
  color: #2d8e9b
  text-decoration: underline
  cursor: pointer
</style>
