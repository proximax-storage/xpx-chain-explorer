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
import { Id } from 'tsjs-xpx-chain-sdk'

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

          let amountXpx
          let others
          if (this.params[index].mosaics && this.params[index].mosaics.length > 0) {
            others = this.params[index].mosaics.filter(el => el.id.toHex() !== this.$store.state.xpx)
            amountXpx = this.params[index].mosaics.filter(el => el.id.toHex() === this.$store.state.xpx)
            if (amountXpx.length > 0) {
              amountXpx = this.$utils.fmtDivisibility(amountXpx[0].amount.compact(), 6)
              info.details.push({ key: 'Amount', valueHtml: amountXpx })
            }

            if (others.length > 0) {
              let tmpArr = []
              let tmpObj
              others.forEach(async asset => {
                try {
                  let response = await this.$proxProvider.assetHttp.getMosaic(asset.id).toPromise()
                  let responseName = await this.$proxProvider.assetHttp.getMosaicsNames([asset.id]).toPromise()

                  tmpObj = {
                    key: `Quantity Asset: ${(responseName.length > 0) ? responseName[0].names[0].name : asset.id.toHex()}`,
                    valueHtml: this.$utils.fmtDivisibility(asset.amount.compact(), response.divisibility)
                  }
                  info.details.push(tmpObj)
                } catch (e) {
                  if (e.statusCode === 404) {
                    if (asset.id.toHex() === this.$store.state.namespaceXpx) {
                      tmpObj = {
                        key: `Amount`,
                        valueHtml: this.$utils.fmtDivisibility(asset.amount.compact(), 6)
                      }

                      info.details.push(tmpObj)
                    } else if (asset.id.toHex() !== this.$store.state.namespaceXpx) {
                      let assetData = await this.getNamespaceInfo(asset)
                      let assetName = await this.$proxProvider.assetHttp.getMosaicsNames([asset.id]).toPromise()

                      if (assetName.length === 0) {
                        assetData.key = `Quantity Asset: ${(responseName.length > 0) ? responseName[0].names[0].name : asset.id.toHex()}`
                        info.details.push(assetData)
                      } else {
                        info.details.push(assetData)
                      }
                    }
                  }
                }
              })
            }
          }
          break;

        case 'Asset definition':
          info.details.push({ key: 'Asset Id', value: this.params[index].mosaicId.id.toHex(), class: 'link', run: this.goToAsset })
          info.details.push({ key: 'Divisibility', value: this.params[index].mosaicProperties.divisibility })
          info.details.push({ key: 'Supply Mutable', value: this.params[index].mosaicProperties.supplyMutable, class: (this.params[index].mosaicProperties.supplyMutable) ? 'true' : 'false' })
          info.details.push({ key: 'Transferable', value: this.params[index].mosaicProperties.transferable, class: (this.params[index].mosaicProperties.transferable) ? 'true' : 'false' })
          break;

        case 'Modify multisig account':
          info.details.push({ key: 'Min Approval Delta', value: this.params[index].minApprovalDelta })
          info.details.push({ key: 'Min Removal Delta', value: this.params[index].minRemovalDelta })
          info.modifications = []
          let tmpModifications = []
          if (this.params[index].modifications !== undefined && typeof this.params[index].modifications.length > 0) {
            this.params[index].modifications.forEach(el => {
              let tmpObj = {
                address: el.cosignatoryPublicAccount.address.pretty(),
                publicKey: el.cosignatoryPublicAccount.publicKey,
                type: el.type
              }

              info.modifications.push(tmpObj)
            })
          } else {
            info.modifications === undefined
          }
          break;

        default:
          break;
      }
      this.$emit('runModal', info, `Inner Transaction - ${ typeName }`)
    },

    verifyType (itemType) {
      let objectOfTypes = Object.values(proximaxProvider.typeTransactions())
      let type = undefined
      objectOfTypes.forEach(element => {
        if (itemType === element.id) {
          type = element.name
        }
      })
      return type
    },

    async getNamespaceInfo (asset) {
      let tmpObj
      try {
        let namespace = await this.$proxProvider.namespaceHttp.getNamespace(asset.id).toPromise()
        let assetId = new Id(namespace.alias.assetId)
        let assetInfo = await this.$proxProvider.assetHttp.getMosaic(assetId).toPromise()
        tmpObj = {
          key: `Quantity Asset: ${asset.id.toHex()}`,
          valueHtml: this.$utils.fmtDivisibility(asset.amount.compact(), assetInfo.divisibility)
        }
      } catch (error) {
        console.log(error)
      }

      return tmpObj
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

    goToAsset (assetId) {
      let routeData = this.$router.resolve({ path: `/result/assetInfo/${assetId}` })
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
