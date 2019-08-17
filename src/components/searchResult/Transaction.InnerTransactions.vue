<template>
  <!-- Inner Transaction Component -->
  <div class="inner animated fast fadeIn">
    <!-- name -->
    <h1 class="supertitle" v-if="params">Inner Transactions</h1>

    <!-- Iterated Element -->
    <div>
      <div class="element" v-for="(item, index) in params" :key="index" style="border-radius: 20px" @click="redirecToDetail(index)">

        <div>
          <div class="title centerAlign">Address</div>
          <div class="value centerAlign">{{ item.signer.address.pretty() }}</div>
        </div>

        <div>
          <div class="title centerAlign">Public Key</div>
          <div class="value centerAlign">{{ item.signer.publicKey }}</div>
        </div>

        <div>
          <div class="title centerAlign">Signature</div>
          <div class="value centerAlign">{{ item.signature }}</div>
        </div>

        <div v-if="item.mosaics">
          <div class="title centerAlign">Mosaics</div>
          <div class="value centerAlign">{{ item.mosaics.length }}</div>
        </div>

        <div>
          <div class="title centerAlign" style="color: orange">Click anywhere on this card to show the detail</div>
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

      let info = [
        { key: 'Sender Address', value: this.params[index].signer.address.pretty(), class: 'link', run: this.goToAddress },
        { key: 'Sender Public Key', value: this.params[index].signer.publicKey, class: 'link', run: this.goToAddress },
        { key: 'Signature', value: this.params[index].signature },
        { key: 'Timestamp', value: this.$utils.fmtTime(this.params[index].deadline.value) },
        { key: 'Aggregate Hash', value: this.params[index].transactionInfo.aggregateHash },
        { key: 'Aggregate Id', value: this.params[index].transactionInfo.aggregateId },
        { key: 'Height', value: this.params[index].transactionInfo.height.compact(), class: 'link',  run: this.goToBlock },
        { key: 'Type', value: (this.params[index].type === undefined) ? 'No Available' : this.params[index].type },
        { key: 'Version', value: this.params[index].version },
        {
          key: 'Fee', value: '',
          valueHtml: (this.params[index].mosaicProperties !== undefined) ? this.$utils.fmtDivisibility(this.params[index].maxFee.compact(), this.params[index].mosaicProperties.divisibility) : this.$utils.fmtAmountValue(this.params[index].maxFee.compact())
        }
      ]

      if (this.params[index].recipient) {
        info.push({
          key: 'Recipient Address',
          value: this.params[index].recipient.pretty(),
          class: 'link',
          run: this.goToAddress
        })
      }

      if (this.params[index].message) {
        info.push({
          key: 'Message',
          value: this.params[index].message.payload
        })
      }

      switch (typeName) {
        case 'Mosaic definition':
          info.unshift({ key: 'Mosaic Id', value: this.params[index].mosaicId.id.toHex(), class: 'link', run: this.goToMosaic })
          info.push({ key: 'Divisibility', value: this.params[index].mosaicProperties.divisibility })
          info.push({ key: 'Levy Mutable', value: this.params[index].mosaicProperties.levyMutable, class: (this.params[index].mosaicProperties.levyMutable) ? 'true' : 'false' })
          info.push({ key: 'Supply Mutable', value: this.params[index].mosaicProperties.supplyMutable, class: (this.params[index].mosaicProperties.supplyMutable) ? 'true' : 'false' })
          info.push({ key: 'Transferable', value: this.params[index].mosaicProperties.transferable, class: (this.params[index].mosaicProperties.transferable) ? 'true' : 'false' })
          info.push({ key: 'Duration', value: this.$utils.calculateDuration(this.params[index].mosaicProperties.duration.compact()) })
          break;

        default:
          break;
      }

      this.$emit('runModal', info, `Inner Transaction Detail - ${ typeName }`)
    },

    goToAddress (address) {
      let routeData = (address.length === 64) ?
      this.$router.resolve({ path: `/searchResult/publicKey/${ address }` }) :
      this.$router.resolve({ path: `/searchResult/address/${ address }` })
      window.open(routeData.href, '_blank')
    },

    goToBlock (height) {
      let routeData = this.$router.resolve({ path: `/searchResult/blockHeight/${height}` })
      window.open(routeData.href, '_blank')
    },

    goToHash (hash) {
      let routeData = this.$router.resolve({ path: `/searchResult/transactionHash/${hash}` })
      window.open(routeData.href, '_blank')
    },

    goToNamespace (namespaceId) {
      let routeData = this.$router.resolve({ path: `/searchResult/namespaceInfo/${namespaceId}` })
      window.open(routeData.href, '_blank')
    },

    goToMosaic (mosaicId) {
      let routeData = this.$router.resolve({ path: `/searchResult/mosaicInfo/${mosaicId}` })
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

.element
  padding: 10px
  margin-bottom: 10px
  font-size: 10px
  cursor: pointer
  border: 1px solid #f4f4f4
  &:nth-child(odd)
    background: #f4f4f4
  &:nth-child(even)
    background: white
  &:last-child
    margin: 0px
  & > div
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
</style>
