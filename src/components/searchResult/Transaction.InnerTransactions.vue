<template>
  <!-- Inner Transaction Component -->
  <div class="inner animated fast fadeIn">
    <!-- name -->
    <h1 class="supertitle" v-if="params">Inner Transactions</h1>

    <!-- Iterated Element -->
    <div>
      <div class="element" v-for="(item, index) in params" :key="index" style="border-radius: 20px" @click="redirecToDetail(index)">

        <div>
          <div class="title centerAlign">#</div>
          <div class="value centerAlign">{{ index + 1 }}</div>
        </div>

        <div>
          <div class="title centerAlign">Type</div>
          <div class="valueLower transacTitle centerAlign">{{ verifyType(item.type) }}</div>
        </div>

        <div>
          <div class="title centerAlign">Height</div>
          <div class="value centerAlign">{{ item.transactionInfo.height.compact() }}</div>
        </div>

        <div>
          <div class="title centerAlign">Version</div>
          <div class="value centerAlign">{{ item.version }}</div>
        </div>

      </div>
    </div>
    <!-- End Iterated Element -->
  </div>
  <!-- End Inner Transaction Component -->
</template>

<script>
import proximaxProvider from '@/services/proximaxProviders'

export default {
  name: 'InnerTransaction',
  props: {
    params: Array
  },
  methods: {
    redirecToDetail (index) {
      let typeName
      let objectOfTypes = Object.values(proximaxProvider.typeTransactions())
      objectOfTypes.forEach(element => {
        if (this.params[index].type === element.id) {
          typeName = element.name
        }
      })

      let info = {
        senderAddress: {
          value: this.params[index].signer.address.pretty(),
          class: 'link',
          run: this.goToAddress
        },

        senderPublicKey: {
          value: this.params[index].signer.publicKey,
          class: 'link',
          run: this.goToAddress
        },

        signature: {
          value: this.params[index].signature
        },

        deadline: {
          value: this.$utils.fmtTime(this.params[index].deadline.value)
        },

        aggregateId: {
          value: this.params[index].transactionInfo.aggregateId
        },

        height: {
          value: this.params[index].transactionInfo.height.compact(),
          class: 'link',
          run: this.goToBlock
        },

        type: {
          value: (this.params[index].type === undefined) ? 'No Available' : this.params[index].type
        },

        fee: {
          valueHtml: (this.params[index].mosaicProperties !== undefined) ? this.$utils.fmtDivisibility(this.params[index].maxFee.compact(), this.params[index].mosaicProperties.divisibility) : this.$utils.fmtAmountValue(this.params[index].maxFee.compact())
        }
      }

      if (this.params[index].recipient) {
        info.recipient = {
          value: this.params[index].recipient.pretty(),
          class: 'link',
          run: this.goToAddress
        }
      }



      info.details = []

      switch (typeName) {
        case 'Transfer Transaction':
          if (this.params[index].message !== undefined && this.params[index].message.payload !== '') {
            info.details.push({ key: 'Message', value: this.params[index].message.payload })
          }

          break;

        case 'Mosaic definition':
          info.details.push({ key: 'Mosaic Id', value: this.params[index].mosaicId.id.toHex(), class: 'link', run: this.goToMosaic })
          info.details.push({ key: 'Divisibility', value: this.params[index].mosaicProperties.divisibility })
          info.details.push({ key: 'Levy Mutable', value: this.params[index].mosaicProperties.levyMutable, class: (this.params[index].mosaicProperties.levyMutable) ? 'true' : 'false' })
          info.details.push({ key: 'Supply Mutable', value: this.params[index].mosaicProperties.supplyMutable, class: (this.params[index].mosaicProperties.supplyMutable) ? 'true' : 'false' })
          info.details.push({ key: 'Transferable', value: this.params[index].mosaicProperties.transferable, class: (this.params[index].mosaicProperties.transferable) ? 'true' : 'false' })
          info.details.push({ key: 'Duration', value: this.$utils.calculateDuration(this.params[index].mosaicProperties.duration.compact()) })
          break;

        case 'Modify multisig account':
          info.details.push({ key: 'Min Approval Delta', value: this.params[index].minApprovalDelta })
          info.details.push({ key: 'Min Removal Delta', value: this.params[index].minRemovalDelta })
          info.modifications = []
          let tmpModifications = []
          console.log(this.params[index].modifications !== undefined, this.params[index].modifications.length > 0, true === false)
          if (this.params[index].modifications !== undefined && typeof this.params[index].modifications.length > 0) {
            console.log('Aqui 1')
            this.params[index].modifications.forEach(el => {
              let tmpObj = {
                address: el.cosignatoryPublicAccount.address.pretty(),
                publicKey: el.cosignatoryPublicAccount.publicKey,
                type: el.type
              }

              info.modifications.push(tmpObj)
            })
          } else {
            console.log('Aqui 2')
            info.modifications === undefined
          }
          break;

        default:
          break;
      }
      console.log(info)
      this.$emit('runModal', info, `Inner Transaction - ${ typeName }`)
    },

    verifyType (itemType) {
      let objectOfTypes = Object.values(proximaxProvider.typeTransactions())
      let type = undefined
      objectOfTypes.forEach(element => {
        // console.log(element.name)
        if (itemType === element.id) {
          type = element.name
        }
      })
      return type
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
$radius: 20px

.supertitle
  margin: 10px 0px 0px 0px
  font-size: 17px
  color: #2BA1B9
  padding: 0px 0px 5px 0px
  width: 100%
  text-align: center

.inner
  padding: 10px

.transacTitle
  font-weight: bold
  color: #2BA1B9 !important

.element
  padding: 10px
  margin-bottom: 10px
  font-size: 10px
  cursor: pointer
  display: flex
  justify-content: space-between
  border: 1px solid #f4f4f4
  &:nth-child(odd)
    background: #f4f4f4
  &:nth-child(even)
    background: white
  &:last-child
    margin: 0px
  & > div
    width: 25%
    padding: 2px

.title
  font-size: 10px
  font-weight: bold
  text-transform: uppercase
  color: grey

.value
  font-size: 14px
  text-transform: uppercase
  word-break: break-all
  color: black

.valueLower
  font-size: 14px
  text-transform: uppercase
  word-break: break-all
  color: black

.link:hover
  color: #2BA1B9
  text-decoration: underline
  cursor: pointer

.centerAlign
  text-align: center

@media screen and (max-width: 700px)
  .value,
  .valueLower
    font-size: 13px

  .link
    color: #2BA1B9
    text-decoration: underline
    cursor: pointer

  .element
    padding: 10px
    margin-bottom: 10px
    font-size: 10px
    cursor: pointer
    display: block
    justify-content: space-between
    border: 1px solid #f4f4f4
    &:nth-child(odd)
      background: #f4f4f4
    &:nth-child(even)
      background: white
    &:last-child
      margin: 0px
    & > div
      width: 100%
      padding: 2px
      border-bottom: 1px solid #ddd
      &:last-child
        border-bottom: 0px solid transparent
</style>
