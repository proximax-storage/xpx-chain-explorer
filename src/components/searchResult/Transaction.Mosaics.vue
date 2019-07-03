<template>
  <div class="mosaics" v-if="params !== null && params.length > 0">
    <h1 class="supertitle">Mosaics In Transfer</h1>

    <div>
      <div class="element" v-for="(item, index) in params" :key="index" style="border-radius: 5px" :style="(index % 2 === 0) ? 'background: #DDDDDD' : 'background: #F4F4F4'">

        <div style="padding: 2px">
          <div class="title">{{ titleMosaic }}</div>
          <div class="value">{{ verifyXPX(index) }}</div>
        </div>

        <div style="padding: 2px" v-if="verifyXPX(index) === 'XPX'">
          <div class="title" >Mosaic Amount</div>
          <div class="value" v-html="$utils.fmtAmountValue(item.amount.compact())"></div>
        </div>

        <div style="padding: 2px" v-else>
          <div class="title" >Mosaic Quantity</div>
          <div class="value" v-html="optionalQuantity"></div>
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
    xpx: String
  },
  data () {
    return {
      optionalQuantity: null,
      titleMosaic: 'Mosaic Id'
    }
  },
  methods: {
    verifyXPX (index) {
      let fullId = Array.from(this.params)[index].id.toHex().toUpperCase()
      if (fullId === this.xpx) {
        fullId = 'XPX'
      } else {
        this.$proxProvider.getMosaic(Array.from(this.params)[index].id)
          .subscribe(response => {
            if (response.properties.divisibility !== 0) {
              this.optionalQuantity = this.$utils.fmtDivisibility(Array.from(this.params)[index].amount.compact(), response.properties.divisibility)
            } else {
              this.optionalQuantity = `${Array.from(this.params)[index].amount.compact()}`
              console.log(this.optionalQuantity)
            }
          },
          error => {
            this.$proxProvider.getNamespacesInfo(Array.from(this.params)[index].id)
              .subscribe(response => {
                this.titleMosaic = 'Namespace Id Alias'
                let tmpId = this.$proxProvider.createMosaicId(response.alias.mosaicId)
                fullId = tmpId.toHex()
                this.$proxProvider.getMosaic(tmpId).subscribe(
                  response2 => {
                    if (response2.properties.divisibility !== 0) {
                      this.optionalQuantity = this.$utils.fmtDivisibility(Array.from(this.params)[index].amount.compact(), response2.properties.divisibility)
                    } else {
                      this.optionalQuantity = `${Array.from(this.params)[index].amount.compact()}`
                    }
                  }
                )
              })
          })
      }
      return fullId
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
</style>
