<template>
  <!-- Inner Transaction Component -->
  <div class="inner animated fast fadeIn">
    <!-- name -->
    <h1 class="supertitle" v-if="params">Exchange Offer Transactions</h1>
    <!-- Iterated Element -->
    <div>
      <div
        class="element"
        v-for="(item, index) in params"
        :key="index"
        style="border-radius: 20px"
        @click="redirecToDetail(index)"
      >
        <div>
          <div class="title centerAlign">#</div>
          <div class="value centerAlign">{{ index + 1 }}</div>
        </div>

        <div>
          <div class="title centerAlign">Type</div>
          <div class="valueLower transacTitle centerAlign">{{ verifyType(item.type) }}</div>
        </div>
        <div>
          <div class="title centerAlign">Owner</div>
          <div
            class="value centerAlign link"
            style="cursor: pointer,  width: none"
            @click="goToAddress(item.owner.address.pretty())"
          >{{ item.owner.address.pretty() }}</div>
        </div>

        <div>
          <div class="title centerAlign">Cost</div>
          <div class="value centerAlign">{{ item.cost.compact() }}</div>
        </div>

        <div>
          <div class="title centerAlign">Mosaic Amount</div>
          <div class="value centerAlign">{{ item.mosaicAmount.compact() }}</div>
        </div>
        <div>
          <div class="title centerAlign">Mosaic Id</div>
            <div
            class="value centerAlign link"
            style="cursor: pointer,  width: none"
            @click="goToMosaic(item.mosaicId.toHex())"
          >{{ item.mosaicId.toHex()}}</div>
        </div>
        </div>

        <!-- mosaic -->
      </div>
    </div>
  </div>
</template>
<script>
import proximaxProvider from "@/services/proximaxProviders";
import { ExchangeOfferType } from "tsjs-xpx-chain-sdk/dist/src/model/transaction/ExchangeOfferType";
export default {
  name: "ExchangeOfferTransaction",
  props: {
    params: Array
  },
  methods: {
    verifyType(itemType) {
      const type = [
        {
          type: ExchangeOfferType.SELL_OFFER,
          name: "SELL"
        },
        {
          type: ExchangeOfferType.BUY_OFFER,
          name: "BUY"
        }
      ];
      const nameType = type.find(x => x.type === itemType).name;
      return nameType;
    },
    goToAddress(address) {
      let routeData =
        address.length === 64
          ? this.$router.resolve({ path: `/result/publicKey/${address}` })
          : this.$router.resolve({ path: `/result/address/${address}` });
      window.open(routeData.href, "_blank");
    },
    goToMosaic(mosaicId) {
      let routeData = this.$router.resolve({
        path: `/result/mosaicInfo/${mosaicId}`
      });
      window.open(routeData.href, "_blank");
    }
  },
  beforeMount() {
    console.log("params", this.params);
  }
};
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