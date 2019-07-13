<template>
  <!-- Inner Transaction Component -->
  <div class="animated fast fadeIn">
    <!-- name -->
    <h1 class="supertitle" v-if="params">Inner Transactions</h1>

    <!-- Iterated Element -->
    <div>
      <div class="element" v-for="(item, index) in params" :key="index" style="border-radius: 5px" :style="(index % 2 === 0) ? 'background: #DDDDDD' : 'background: #F4F4F4'" @click="redirecToDetail(index)">

        <div style="padding: 2px">
          <div class="title">Address</div>
          <div class="value">{{ item.signer.address.pretty() }}</div>
        </div>

        <div style="padding: 2px">
          <div class="title">Public Key</div>
          <div class="value">{{ item.signer.publicKey }}</div>
        </div>

        <div style="padding: 2px">
          <div class="title">Signature</div>
          <div class="value">{{ item.signature }}</div>
        </div>

        <div style="padding: 2px" v-if="item.mosaics">
          <div class="title">Mosaics</div>
          <div class="value">{{ item.mosaics.length }}</div>
        </div>

        <div style="padding: 2px" v-if="item.message">
          <div class="title">Message</div>
          <div class="value">{{ (item.message.payload !== '') ? item.message.payload : 'No Available' }}</div>
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
  mounted () {
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
        { key: 'Sender Address', value: this.params[index].signer.address.pretty(), class: 'link' },
        { key: 'Sender Public Key', value: this.params[index].signer.publicKey, class: 'link' },
        { key: 'Signature', value: this.params[index].signature },
        { key: 'Timestamp', value: this.$utils.fmtTime(this.params[index].deadline.value) },
        { key: 'Aggregate Hash', value: this.params[index].transactionInfo.aggregateHash },
        { key: 'Aggregate Id', value: this.params[index].transactionInfo.aggregateId },
        { key: 'Height', value: this.params[index].transactionInfo.height.compact() },
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
          class: 'link'
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
          info.unshift({ key: 'Mosaic Id', value: this.params[index].mosaicId.id.toHex() })
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
    }
  }
}
</script>

<style lang="sass" scoped>
$radius: 5px

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
  cursor: pointer
  &:last-child
    margin: 0px

.title
  font-size: 10px
  font-weight: bold
  text-transform: uppercase
  color: black

.value
  font-size: 14px
  text-transform: uppercase
  word-break: break-all
  color: black
</style>
