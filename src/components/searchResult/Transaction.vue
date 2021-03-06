<template>
  <!-- Transaction Component -->
  <div class="transaction animated fast fadeIn">
    <!-- Center -->
    <div class="tran-layout-middle">
      <h1
        class="supertitle"
        style="font-size: 20px; text-align: center"
      >{{ transactionType || 'Transaction'}}</h1>
      <p class="amount" v-if="calculatedAmount !== null">
        Amount:
        <span v-html="$utils.fmtAmountValue(calculatedAmount)"></span> XPX
      </p>
      <p class="fee">
        Fee:
        <span v-html="this.effectiveFee"></span>
      </p>
    </div>
    <!-- End Center -->

    <!-- Up -->
    <div class="tran-layout-up">
      <!-- left -->
      <div>
        <div class="up">
          <div class="title">Sender</div>
          <div
            class="value link"
            style="cursor: pointer"
            @click="goToAddress(detail.signer.address.pretty())"
          >{{ detail.signer.address.pretty() }}</div>
        </div>
        <div class="down">
          <div
            class="title"
            v-if="transactionType === 'Register Namespace Transaction'"
          >Recipient - Namespace Rental Fee Sink</div>
          <div
            class="title"
            v-else-if="transactionType === 'Asset definition'"
          >Recipient - Asset Rental Fee Sink</div>
          <div
            class="title"
            v-else-if="transactionType !== 'Register Namespace Transaction' || transactionType !== 'Asset definition'"
          >Recipient</div>
          <div
            class="value link"
            v-if="transactionType === 'Register Namespace Transaction'"
            @click="goToAddress($store.state.rentalFeeInfo.namespaceRentalFee.address)"
          >{{ $store.state.rentalFeeInfo.namespaceRentalFee.address }}</div>
          <div
            class="value link"
            v-else-if="transactionType === 'Asset definition'"
            @click="goToAddress($store.state.rentalFeeInfo.namespaceRentalFee.address)"
          >{{ $store.state.rentalFeeInfo.namespaceRentalFee.address }}</div>
          <div
            class="value"
            :class="(detail.recipient === undefined) ? '' : 'link'"
            v-else-if="transactionType !== 'Register Namespace Transaction' || transactionType !== 'Asset definition'"
            :style="(detail.recipient === undefined) ? '' : 'cursor: pointer'"
            @click="(detail.recipient === undefined) ? '' : goToAddress(detail.recipient.pretty())"
          >{{ (detail.recipient === undefined) ? 'No Available' : detail.recipient.pretty() }}</div>
        </div>
      </div>
      <!-- End Left -->

      <!-- Right -->
      <div>
        <div class="up">
          <div class="title">Timestamp</div>
          <div class="value">{{ $utils.fmtTime(timestamp) }}</div>
        </div>
        <div class="down">
          <div class="title">Block Height</div>
          <div
            class="value link"
            @click="goToBlock(detail.transactionInfo.height.compact())"
          >{{ detail.transactionInfo.height.compact() }}</div>
        </div>
      </div>
      <!-- End Right -->
    </div>
    <!-- End Up -->

    <!-- Down -->
    <div class="tran-layout-down">
      <!-- Up Element -->
      <div class="layout-down-children">
        <div class="down-radius">
          <div class="title center-text">Signature</div>
          <div class="value center-text">{{ detail.signature }}</div>
        </div>
      </div>
      <!-- End Up Element -->

      <!-- Down Element-->
      <div class="layout-down-children">
        <div class="down-radius">
          <div class="title center-text">Hash</div>
          <div
            class="value link center-text"
            @click="goToHash(detail.transactionInfo.hash)"
          >{{ detail.transactionInfo.hash }}</div>
        </div>
      </div>
      <!-- End Down Element-->
    </div>
    <!-- End Down -->

    <!-- Plus Area -->
    <div class="tran-layout-plus" v-if="plusInfo.length > 0">
      <!-- Name -->
      <h1 class="supertitle center-text">Details</h1>

      <!-- Plus Container -->
      <div class="plus-cont">
        <!-- Amount / Delta -->
        <div class="layout-plus-children" v-if="detail.delta">
          <div class="title">Amount (Delta)</div>
          <div class="value" :style="(detail.direction === 1) ? 'color: green' : 'color: red'">
            {{ (detail.direction === 1) ? 'Increase: +' : 'Decrease: -' }}
            <span
              v-html="$utils.fmtAmountValue(this.detail.delta.compact())"
            ></span>
          </div>
        </div>
        <!-- End Amount / Delta -->

        <!-- Iterated Element -->
        <div class="layout-plus-children" v-for="(item, index) in plusInfo" :key="index">
          <div class="title">{{ item.key }}</div>
          <div
            @click="(item.run === undefined) ? '' : item.run(item.value)"
            :class="(item.class === undefined) ? 'value' : item.class"
            v-if="item.value !== ''"
          >{{ item.value }}</div>
          <div
            @click="(item.run === undefined) ? '' : item.run(item.value)"
            :class="(item.class === undefined) ? 'value' : item.class"
            v-else
            v-html="item.valueHtml"
          ></div>
        </div>
        <!-- End Iterated Element -->

        <!-- Asset Properties Area -->
        <div
          class="layout-plus-children"
          style="background: #f4f4f4; box-shadow: 0px 0px 0px 1px #2BA1B9"
          v-if="detail.mosaicProperties"
        >
          <!-- Name -->
          <div class="title">Asset Properties</div>

          <!-- Properties Container -->
          <div class="value asset-properties">
            <span>
              Divisibility:
              <b>{{ detail.mosaicProperties.divisibility }}</b>
            </span>

            <span v-if="detail.mosaicProperties.supplyMutable">
              Supply Mutable:
              <b style="color: green">
                {{ detail.mosaicProperties.supplyMutable }}
                <mdb-icon icon="check" />
              </b>
            </span>

            <span v-if="!detail.mosaicProperties.supplyMutable">
              Supply Mutable:
              <b style="color: red">
                {{ detail.mosaicProperties.supplyMutable }}
                <mdb-icon icon="times" />
              </b>
            </span>

            <span v-if="detail.mosaicProperties.transferable">
              Transferable:
              <b style="color: green">
                {{ detail.mosaicProperties.transferable }}
                <mdb-icon icon="check" />
              </b>
            </span>

            <span v-if="!detail.mosaicProperties.transferable">
              Transferable:
              <b style="color: red">
                {{ detail.mosaicProperties.transferable }}
                <mdb-icon icon="times" />
              </b>
            </span>
          </div>
          <!-- Properties Container -->
        </div>
        <!-- Asset Properties Area -->
      </div>
    </div>
    <!-- End Plus Area -->

    <!-- Assets In Transfer Component -->
    <assets-in-transfer :params="assetsOfTransfer" @returnAmount="returnAmount" />
    <!-- End Assets In Transfer Component -->

    <!-- Modifications Component -->
    <modifications :params="detail.modifications" :type="transactionType" />
    <!-- End Modifications Component -->

    <!-- Cosignatures Component -->
    <cosignatures :params="detail.cosignatures" />
    <!-- End Consignature Component -->

    <!-- Inner Transactions Component -->
    <inner-transactions :params="detail.innerTransactions" @runModal="infoReceiver" />
    <!-- End Inner Transactions Component -->

    <!-- Exchange Offer Transaction Component -->
    <exchange-offer-transaction :params="detail.offers" :type="transactionType" />
    <!-- End Inner Exchange Offer TransactionComponent -->
  </div>
  <!-- End Transaction Component -->
</template>

<script>
import proximaxProvider from "@/services/proximaxProviders";
import { mdbIcon } from "mdbvue";
import InnerTransactions from "@/components/searchResult/Transaction.InnerTransactions";
import ExchangeOfferTransaction from "@/components/searchResult/Transaction.ExchangeOfferTransaction";
import Cosignatures from "@/components/searchResult/Transaction.Cosignatures";
import Modifications from "@/components/searchResult/Transaction.Modifications.vue";
import AssetsInTransfer from "@/components/searchResult/Transaction.Assets.vue";
import { Deadline } from "tsjs-xpx-chain-sdk";

export default {
  name: "Transaction",
  props: {
    detail: Object
  },
  components: {
    mdbIcon,
    InnerTransactions,
    ExchangeOfferTransaction,
    Cosignatures,
    Modifications,
    AssetsInTransfer
  },
  data() {
    return {
      plusInfo: [],
      transactionType: "Transaction",
      assetsOfTransfer: null,
      xpx: this.$store.state.xpx,
      calculatedAmount: null,
      effectiveFee: null,
      timestamp: null
    };
  },

  /**
   * Mounted
   *
   * Call Verify Type and Verify Transaction Details
   */
  mounted() {
    this.verifyType();
    this.verifyTransactionDetails();
    this.getEffectiveFee();
    this.getTimestamp();
    console.log(this.detail);
  },

  methods: {
    /**
     * Iterator
     *
     * This method iterates over the object received by parameter that
     * shows all the data it brings and pushes them in a local array
     */
    iterator(obj) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const element = obj[key];
          this.plusInfo.push({ key: key, value: element });
        }
      }
    },

    /**
     * Verify Type
     *
     * Verify the type of a transaction and change the name accordingly
     */
    verifyType() {
      let objectOfTypes = Object.values(proximaxProvider.typeTransactions());
      objectOfTypes.forEach(element => {
        if (this.detail.type === element.id) {
          this.transactionType = element.name;
        }
      });
    },

    analyzeMessage(message) {
      let result = null;
      if (message.type === 0) {
        if (message.payload === "") {
          result = {
            key: "Message",
            value: "Empty Message",
            class: "valueLower"
          };
        } else {
          result = {
            key: "Message",
            value: message.payload,
            class: "valueLower"
          };
        }
      } else {
        result = {
          key: "Message",
          value: "Encrypted Message",
          class: "valueLower"
        };
      }
      return result;
    },

    getEffectiveFee() {
      this.$proxProvider.blockHttp
        .getBlockByHeight(this.detail.transactionInfo.height.compact())
        .subscribe(response => {
          this.effectiveFee = this.$utils.fmtAmountValue(
            response.feeMultiplier * this.detail.size
          );
        });
    },

    /**
     * Verify Transaction Details
     *
     * This method verifies the type of transaction and builds
     * an appropriate object for the component
     */
    verifyTransactionDetails() {
      console.log("this.transactionType", this.transactionType);
      switch (this.transactionType) {
        case "Transfer Transaction":
          this.plusInfo = [
            {
              key: "Network Type",
              value: this.$proxProvider.getNetworkById(this.detail.networkType)
                .name
            },
            { key: "Version", value: this.detail.version }
          ];

          if (this.detail.message !== undefined) {
            this.plusInfo.push(this.analyzeMessage(this.detail.message));
          }

          if (this.detail.mosaics && this.detail.mosaics.length > 0) {
            this.assetsOfTransfer = this.detail.mosaics;
          }
          break;
        case "Register Namespace Transaction":
          let findParent = async () => {
            let level = this.detail.namespaceType;
            if (level !== 0) {
              let parentId = this.detail.parentId;
              let name;
              this.$proxProvider
                .getNamespacesName([this.detail.parentId])
                .subscribe(response => {
                  if (response.length === 2) {
                    response.reverse();
                    name = `${response[0].name}.${response[1].name}.${this.detail.namespaceName}`;
                    let parentNamespace = {
                      key: "Namespace Level",
                      value: name,
                      class: "valueLower"
                    };
                    this.plusInfo.unshift(parentNamespace);
                  } else if (response.length === 1) {
                    name = `${response[0].name} . ${this.detail.namespaceName}`;
                    let parentNamespace = {
                      key: "Namespace Level",
                      value: name,
                      class: "valueLower"
                    };
                    this.plusInfo.unshift(parentNamespace);
                  }
                });
            }
          };

          this.plusInfo = [
            {
              key: "Namespace Name",
              value: this.detail.namespaceName,
              class: "valueLower"
            },
            {
              key: "Namespace Type",
              value: this.detail.namespaceType === 0 ? "Root" : "Sub"
            },
            {
              key: "Namespace Id",
              value: this.detail.namespaceId.id.toHex(),
              class: "value link",
              run: this.goToNamespace
            },
            {
              key: "Network Type",
              value: this.$proxProvider.getNetworkById(this.detail.networkType)
                .name
            },
            {
              key: "Parent Id",
              value:
                this.detail.parentId !== undefined
                  ? this.detail.parentId.id.toHex()
                  : "No Available"
            },
            { key: "Version", value: this.detail.version }
          ];

          if (this.detail.namespaceType === 0) {
            this.plusInfo.push({
              key: "Duration",
              value:
                this.detail.duration !== undefined
                  ? `(Blocks: ${this.detail.duration.compact()}) ${this.$utils.calculateDuration(
                      this.detail.duration.compact()
                    )}`
                  : `(${this.detail.transactionInfo.height.compact()}) No Duration`
            });
          }

          findParent();
          break;
        case "Asset definition":
          this.plusInfo = [
            {
              key: "Asset Id",
              value: this.detail.mosaicId.id.toHex(),
              class: "value link",
              run: this.goToAsset
            },
            {
              key: "Nonce",
              value:
                this.detail.nonce !== undefined
                  ? this.detail.nonce
                  : "No Available"
            },
            {
              key: "Network Type",
              value: this.$proxProvider.getNetworkById(this.detail.networkType)
                .name
            },
            { key: "Version", value: this.detail.version }
          ];

          if (this.detail.duration !== undefined) {
            this.plusInfo.push({
              key: "Duration",
              value:
                this.detail.duration !== undefined
                  ? `(Blocks: ${this.detail.duration.compact()}) ${this.$utils.calculateDuration(
                      this.detail.duration.compact()
                    )}`
                  : `(Blocks: 0) No Duration`
            });
          }
          break;
        case "Asset supply change":
          this.plusInfo = [
            {
              key: "Network Type",
              value: this.$proxProvider.getNetworkById(this.detail.networkType)
                .name
            },
            { key: "Version", value: this.detail.version }
          ];

          this.$proxProvider.getMosaic(this.detail.mosaicId.id).subscribe(
            response => {
              this.plusInfo.unshift({
                key: "Asset Id",
                value: this.detail.mosaicId.id.toHex(),
                class: "value link",
                run: this.goToAsset
              });
            },
            error => {
              this.plusInfo.unshift({
                key: "Asset Id",
                value: this.detail.mosaicId.id.toHex(),
                class: "value link",
                run: this.goToNamespace
              });
            }
          );
          break;
        case "Modify multisig account":
          this.plusInfo = [
            {
              key: "Minimal Removal Delta",
              value: this.detail.minRemovalDelta
            },
            {
              key: "Minimal Approval Delta",
              value: this.detail.minApprovalDelta
            },
            {
              key: "Network Type",
              value: this.$proxProvider.getNetworkById(this.detail.networkType)
                .name
            },
            { key: "Version", value: this.detail.version }
          ];
          break;
        case "Aggregate complete":
          this.plusInfo = [
            {
              key: "Network Type",
              value: this.$proxProvider.getNetworkById(this.detail.networkType)
                .name
            },
            { key: "Version", value: this.detail.version }
          ];
          break;
        case "Aggregate bonded":
          this.plusInfo = [
            {
              key: "Network Type",
              value: this.$proxProvider.getNetworkById(this.detail.networkType)
                .name
            },
            { key: "Version", value: this.detail.version }
          ];
          break;
        case "Lock":
          this.plusInfo = [
            {
              key: "Asset Id",
              value: this.detail.mosaic.id.toHex(),
              class: "value link",
              run: this.goToAsset
            },
            {
              key: "Asset Amount",
              value: "",
              valueHtml: this.$utils.fmtAmountValue(
                this.detail.mosaic.amount.compact()
              )
            },
            {
              key: "Network Type",
              value: this.$proxProvider.getNetworkById(this.detail.networkType)
                .name
            },
            {
              key: "Lock Transaction Hash",
              value: this.detail.hash,
              class: "value link",
              run: this.goToHash
            },
            { key: "Version", value: this.detail.version },
            {
              key: "Duration",
              value:
                this.detail.duration !== undefined
                  ? this.$utils.calculateDuration(
                      this.detail.duration.compact()
                    )
                  : "No Duration"
            }
          ];
          break;
        case "Secret lock":
          this.iterator(this.detail);
          break;
        case "Secret proof":
          this.iterator(this.detail);
          break;
        case "Asset Alias":
          this.plusInfo = [
            {
              key: "Namespace Id",
              value: this.detail.namespaceId.id.toHex(),
              class: "value link",
              run: this.goToNamespace
            },
            {
              key: "Asset Id",
              value: this.detail.mosaicId.id.toHex(),
              class: "value link",
              run: this.goToAsset
            },
            {
              key: "Network Type",
              value: this.$proxProvider.getNetworkById(this.detail.networkType)
                .name
            }
          ];

          if (this.detail.actionType === undefined) {
            this.plusInfo.push({ key: "Action Type", value: "Link" });
          } else if (this.detail.actionType === 0) {
            this.plusInfo.push({ key: "Action Type", value: "Link" });
          } else if (this.detail.actionType === 1) {
            this.plusInfo.push({ key: "Action Type", value: "Unlink" });
          }

          this.plusInfo.push({ key: "Version", value: this.detail.version });

          this.$proxProvider
            .getNamespacesName([this.detail.namespaceId.id])
            .subscribe(response => {
              this.plusInfo.unshift({
                key: "Namespace Name",
                value: response[0].name,
                class: "valueLower"
              });
            });
          break;
        case "Address Alias":
          this.plusInfo = [
            {
              key: "Namespace Id",
              value: this.detail.namespaceId.id.toHex(),
              class: "value link",
              run: this.goToNamespace
            },
            {
              key: "Network Type",
              value: this.$proxProvider.getNetworkById(this.detail.networkType)
                .name
            },
            { key: "Version", value: this.detail.version }
          ];

          if (this.detail.actionType === undefined) {
            this.plusInfo.push({ key: "Action Type", value: "Link" });
          } else if (this.detail.actionType === 0) {
            this.plusInfo.push({ key: "Action Type", value: "Link" });
          } else if (this.detail.actionType === 1) {
            this.plusInfo.push({ key: "Action Type", value: "Unlink" });
          }
          break;
        case "Modify Account Property Address":
          this.plusInfo = [{ key: "Info", value: "Not supported yet" }];
          break;
        case "Modify Account Property Asset":
          this.plusInfo = [{ key: "Info", value: "Not supported yet" }];
          break;
        case "Modify Account Entity Type":
          this.plusInfo = [{ key: "Info", value: "Not supported yet" }];
          break;
        case "Link Account":
          this.plusInfo = [
            {
              key: "Link Action",
              value: this.detail.linkAction === 0 ? "Link" : "Unlink"
            },
            {
              key: "Network Type",
              value: this.$proxProvider.getNetworkById(this.detail.networkType)
                .name
            },
            { key: "Version", value: this.detail.version }
          ];
          break;
        case "Modify Account Metadata":
          this.plusInfo = [{ key: "Info", value: "Not supported yet" }];
          break;
        case "Modify Asset Metadata":
          this.plusInfo = [
            {
              key: "Metadata Id",
              value:
                this.detail.metadataId !== undefined
                  ? this.detail.metadataId
                  : "No Available"
            },
            {
              key: "Metadata Type",
              value:
                this.detail.metadataType !== undefined
                  ? this.detail.metadataType
                  : "No Available"
            },
            {
              key: "Network Type",
              value: this.$proxProvider.getNetworkById(this.detail.networkType)
                .name
            },
            { key: "Version", value: this.detail.version }
          ];
          break;
        case "Modify Namespace Metadata":
          this.plusInfo = [{ key: "Info", value: "Not supported yet" }];
          break;
        case "Exchange Offer":
          this.plusInfo = [
            {
              key: "Network Type",
              value: this.$proxProvider.getNetworkById(this.detail.networkType)
                .name
            },
            { key: "Version", value: this.detail.version }
          ];
          break;
        case "Add Exchange Offer":
          this.plusInfo = [
            {
              key: "Network Type",
              value: this.$proxProvider.getNetworkById(this.detail.networkType)
                .name
            },
            { key: "Version", value: this.detail.version }
          ];
          break;
        case "Remove Exchange Offer":
          this.plusInfo = [
            {
              key: "Network Type",
              value: this.$proxProvider.getNetworkById(this.detail.networkType)
                .name
            },
            { key: "Version", value: this.detail.version }
          ];
          break;

        default:
          this.plusInfo = [{ key: "Info", value: "Not supported yet" }];
          break;
      }
    },

    async getTimestamp() {
      let height = this.detail.transactionInfo.height.compact();
      try {
        let response = await this.$proxProvider.blockHttp
          .getBlockByHeight(height)
          .toPromise();
        this.timestamp =
          response.timestamp.compact() + Deadline.timestampNemesisBlock * 1000;
        let datatime = new Date(
          response.timestamp.compact() + Deadline.timestampNemesisBlock * 1000
        );
      } catch (error) {
        console.warn(error);
      }
    },

    /**
     * Pretty Convert
     *
     * Convert the element received by parameter to pretty format
     */
    goToAddress(address) {
      let routeData = this.$router.resolve({
        path: `/result/address/${address}`
      });
      window.open(routeData.href, "_blank");
    },

    goToBlock(height) {
      let routeData = this.$router.resolve({
        path: `/result/blockHeight/${height}`
      });
      window.open(routeData.href, "_blank");
    },

    goToHash(hash) {
      let routeData = this.$router.resolve({ path: `/result/hash/${hash}` });
      window.open(routeData.href, "_blank");
    },

    goToNamespace(namespaceId) {
      let routeData = this.$router.resolve({
        path: `/result/namespaceInfo/${namespaceId}`
      });
      window.open(routeData.href, "_blank");
    },

    goToAsset(assetId) {
      let routeData = this.$router.resolve({
        path: `/result/assetInfo/${assetId}`
      });
      window.open(routeData.href, "_blank");
    },

    infoReceiver(data, title) {
      this.$emit("runOpen", title);
      this.$emit("runPush", data);
    },

    returnAmount(data) {
      console.log(data, this.calculatedAmount);
      if (this.calculatedAmount !== null) {
        this.calculatedAmount += data;
      } else {
        this.calculatedAmount = data;
      }
    }
  }
};
</script>

<style lang="sass" scoped>
$radius: 20px

.link:hover
  color: #2BA1B9
  text-decoration: underline
  cursor: pointer

.center-text
  text-align: center

.title
  font-size: 10px
  font-weight: bold
  text-transform: uppercase
  color: grey

.value
  font-size: 13px
  font-weight: normal
  text-transform: uppercase
  word-wrap: break-word
  &.asset-properties
    display: flex
    flex-flow: row wrap
    justify-content: space-around

.valueLower
  font-size: 13px
  font-weight: normal
  word-wrap: break-word

.amount
  color: black
  margin: 0px
  font-weight: bold
  font-size: 30px
  text-transform: uppercase
  & > span
    font-weight: normal

.fee
  font-size: 15px
  margin: 0px
  font-weight: bold
  text-transform: uppercase
  & > span
    font-weight: normal

.supertitle
  margin: 0px
  font-size: 17px
  padding: 0px 0px 5px 0px
  width: 100%
  color: #2BA1B9

.up
  background: #f4f4f4
  border-radius: $radius
  padding: 10px
  margin-bottom: 10px

.down
  background: #F4F4F4
  border-radius: $radius
  padding: 10px

.down-radius
  background: #F4F4F4
  border-radius: $radius
  padding: 10px

.radius
  border-radius: $radius

.transaction
  color: black
  & > .tran-layout-up
    padding: 10px
    background: transparent
    display: flex
    flex-flow: row wrap
    justify-content: space-evenly
    & > div:first-child
      flex-grow: 4
      margin-right: 5px
      border-radius: $radius
    & > div:last-child
      flex-grow: 1
      background: transparent
      margin-left: 5px
      border-radius: $radius
  & > .tran-layout-middle
    background: white
    display: flex
    flex-flow: column wrap
    justify-content: center
    align-items: center
    padding: 20px 10px
    margin-bottom: 10px
    border-bottom: 1px solid silver
  & > .tran-layout-down
    padding: 10px
    display: flex
    flex-flow: column wrap
    justify-content: space-between
    align-items: center
    & > div:first-child
      margin-bottom: 10px
      width: 100%
      flex-grow: 1
    & > div:last-child
      margin-bottom: 0px
      width: 100%
      flex-grow: 1
  & > .tran-layout-plus
    padding: 10px
    display: flex
    flex-flow: column wrap
    box-sizing: border-box
    & > .plus-cont
      width: 100%
      background: white
      border-radius: $radius
      padding: 0px
      display: flex
      flex-flow: column wrap
      & > .layout-plus-children
        background: #f4f4f4
        width: 100%
        padding: 10px
        box-sizing: border-box
        margin-bottom: 10px
        border-radius: $radius

@media screen and (max-width: 550px)
  .value,
  .valueLower
    font-size: 13px
    &.asset-properties
      flex-flow: column wrap

  .link
    color: #2BA1B9
    text-decoration: underline
    cursor: pointer

  .transaction
    & > .tran-layout-up
      background: transparent
      margin: 0px
      display: flex
      flex-flow: column wrap
      justify-content: space-evenly
      & > div:first-child
        flex-grow: 4
        margin: 0px 0px 10px 0px
        border-radius: $radius
      & > div:last-child
        flex-grow: 1
        background: transparent
        margin: 0px 0px 10px 0px
        border-radius: $radius
        & > .supertitle
          display: none
    & > .tran-layout-middle
      display: flex
      flex-flow: column wrap
      justify-content: center
      align-items: center
      margin: 0px 0px 10px 0px
    & > .tran-layout-down
      display: flex
      flex-flow: column wrap
      justify-content: space-between
      align-items: center
      margin: 0px
      & > div:first-child
        width: 100%
        margin: 0px 0px 10px 0px
      & > div:last-child
        width: 100%
        margin: 0px 0px 0px 0px
</style>
