<template>
  <div class="mosaics animated faster fadeIn" v-if="params !== null && params.length > 0">
    <h1 class="supertitle center-text">Mosaics In Transfer</h1>

    <div>
      <div class="element" v-for="(item, index) in params" :key="index">

        <div class="animated faster fadeIn">
          <div class="title">{{ (item.category === 'mosaic') ? 'Mosaic ID' : 'Mosaic Alias ID' }}</div>
          <div class="value link" @click="(item.category === 'mosaic') ? goToMosaic(item.id) : goToNamespace(item.id)">{{ item.id }}</div>
        </div>

        <div v-if="item.category !== 'mosaic'" class="animated faster fadeInDown">
          <div class="title">Mosaic Alias Name</div>
          <div class="valueLower">{{ item.name }}</div>
        </div>

        <div class="animated faster fadeInDown">
          <div class="title" >Mosaic Quantity</div>
          <div class="value" v-html="item.amount"></div>
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
          if (el.id.toHex().toUpperCase() === this.xpx) {
            this.$emit('returnAmount', this.$utils.fmtAmountValue(el.amount.compact()))
          } else {
            this.amountQuantity = 'Quantity'
            tmpObj.name = el.id.toHex()
            this.$proxProvider.getMosaic(el.id).subscribe(
              response => {
                if (response.properties.divisibility !== 0) {
                  this.arrayAmount.push(this.$utils.fmtDivisibility(el.amount.compact(),  response2.properties.divisibility))
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
