<template>
  <div class="namespaceInfo animated fast fadeIn">
    <h1 class="supertitle">Namespace Info</h1>

    <div class="nam-layout-up">
      <div>
        <div class="up">
          <div class="title">Owner Address</div>
          <div class="value link" @click="goToAddress(detail.owner.address.pretty())">{{ detail.owner.address.pretty() }}</div>
        </div>
        <div class="down">
          <div class="title">Owner Public Key</div>
          <div class="value link" @click="goToAddress(detail.owner.publicKey)">{{ detail.owner.publicKey }}</div>
        </div>
      </div>
      <div>
        <div class="up">
          <div class="title">Name</div>
          <div class="valueLower">{{ detail.name || 'No Available' }}</div>
        </div>
        <div class="down">
          <div class="title">Namespace Id</div>
          <div class="value">{{ detail.id.toHex() }}</div>
        </div>
      </div>
    </div>

    <div class="nam-layout-down">
      <div>
        <div class="up">
          <div class="title">Start Height</div>
          <div class="value link" @click="goToBlock(detail.startHeight.compact())">{{ detail.startHeight.compact() }}</div>
        </div>
        <div class="down">
          <div class="title">End Height</div>
          <div class="value">
            {{ (typeof detail.endHeight.compact() === 'number') ? detail.endHeight.compact() : preciseBigInt(detail.endHeight.toHex()) }}
          </div>
        </div>
      </div>
      <div>
        <div class="up">
          <div class="title">Parent Id</div>
          <div class="value">{{ detail.parentId.toHex() }}</div>
        </div>
        <div class="down">
          <div class="title">Depth</div>
          <div class="value">{{ detail.depth }}</div>
        </div>
      </div>
      <div v-if="detail.levels.lenght !== 0">
        <div class="up">
          <div class="title">Levels</div>
          <div class="value">{{ detail.levels.length }}</div>
        </div>
        <div class="down">
          <div class="title">Type</div>
          <div class="value">{{ (detail.type === 0) ? 'Root' : 'Sub' }}</div>
        </div>
      </div>
    </div>

    <h1 class="supertitle center-text" v-if="detail.alias.mosaicId !== undefined">Alias</h1>
    <div class="nam-layout-plus" v-if="detail.alias.mosaicId !== undefined">
      <div>
        <div class="up">
          <div class="title">Mosaic Id</div>
          <div class="value link" @click="goToMosaic(getId(detail.alias.mosaicId).toHex())">
            {{ getId(detail.alias.mosaicId).toHex() }}
          </div>
        </div>
        <div class="down">
          <div class="title">Type</div>
          <div class="value">{{ detail.alias.type }}</div>
        </div>
      </div>
    </div>

    <h1 class="supertitle center-text" v-if="arrayLevels.lenght !== 0">Levels</h1>
    <div class="nam-layout-plus" v-if="arrayLevels.lenght !== 0">
      <div v-for="(item, index) in arrayLevels" :key="index">
        <div class="up">
          <div class="title">Namespace Id</div>
          <div class="value link" @click="goToNamespace(item.id.toHex())">{{ item.id.toHex() }}</div>
        </div>
        <div class="down">
          <div class="title">Name</div>
          <div class="valueLower">{{ item.name }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { Id } from 'tsjs-xpx-catapult-sdk'

export default {
  name: 'NamespaceInfo',
  props: {
    detail: Object
  },
  data () {
    return {
      arrayLevels: []
    }
  },
  mounted () {
    this.getMosaicName()
  },
  methods: {
    getId (id) {
      let idfull = new Id(id)
      return idfull
    },
    getMosaicName () {
      let tmpArr = Array.from(this.detail.levels)
      tmpArr.forEach(el => el.name = 'No Available')
      tmpArr.forEach((el, index) => {
        this.$proxProvider.getNamespacesName([el.id]).subscribe(
          nameResponse => {
            if (nameResponse.length === 1) {
              el.name = nameResponse[0].name
              nameResponse = nameResponse.reverse()
              console.log("Name Response", nameResponse)
              el.name = nameResponse[0].name
            } else if (nameResponse.length === 2) {
              nameResponse = nameResponse.reverse()
              console.log("Name Response", nameResponse)
              el.name = `${nameResponse[0].name}.${nameResponse[1].name}`
            } else if (nameResponse.length === 3) {
              nameResponse = nameResponse.reverse()
              console.log("Name Response", nameResponse)
              el.name = `${nameResponse[0].name}.${nameResponse[1].name}.${nameResponse[2].name}`
            }

            if (tmpArr.length === index + 1) {
              this.arrayLevels = tmpArr
            }
          }
        )
      })
    },
    preciseBigInt (hexNum) {
      /**
       * http://www.danvk.org/hex2dec.html
       */
      function add(x, y, base) {
          var z = [];
          var n = Math.max(x.length, y.length);
          var carry = 0;
          var i = 0;
          while (i < n || carry) {
              var xi = i < x.length ? x[i] : 0;
              var yi = i < y.length ? y[i] : 0;
              var zi = carry + xi + yi;
              z.push(zi % base);
              carry = Math.floor(zi / base);
              i++;
          }
          return z;
      }
      function multiplyByNumber(num, x, base) {
          if (num < 0) return null;
          if (num == 0) return [];

          var result = [];
          var power = x;
          while (true) {
              if (num & 1) {
                  result = add(result, power, base);
              }
              num = num >> 1;
              if (num === 0) break;
              power = add(power, power, base);
          }
          return result;
      }

      function parseToDigitsArray(str, base) {
          var digits = str.split('');
          var ary = [];
          for (var i = digits.length - 1; i >= 0; i--) {
              var n = parseInt(digits[i], base);
              if (isNaN(n)) return null;
              ary.push(n);
          }
          return ary;
      }
      function convertBase(str, fromBase, toBase) {
          var digits = parseToDigitsArray(str, fromBase);
          if (digits === null) return null;

          var outArray = [];
          var power = [1];
          for (var i = 0; i < digits.length; i++) {
              // invariant: at this point, fromBase^i = power
              if (digits[i]) {
                  outArray = add(outArray, multiplyByNumber(digits[i], power, toBase), toBase);
              }
              power = multiplyByNumber(fromBase, power, toBase);
          }

          var out = '';
          for (var i = outArray.length - 1; i >= 0; i--) {
              out += outArray[i].toString(toBase);
          }
          return out;
      }
      function decToHex(decStr) {
          var hex = convertBase(decStr, 10, 16);
          return hex ? '0x' + hex : null;
      }
      function hexToDec(hexStr) {
          if (hexStr.substring(0, 2) === '0x') hexStr = hexStr.substring(2);
          hexStr = hexStr.toLowerCase();
          return convertBase(hexStr, 16, 10);
      }

      let result = hexToDec(hexNum)
      return result
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
  margin: 0px
  font-size: 17px
  color: #2BA1B9
  padding: 0px 0px 5px 0px

.center-text
  text-align: center

.link:hover
  color: #2BA1B9
  text-decoration: underline
  cursor: pointer

.up
  background: #f4f4f4
  border-radius: $radius
  padding: 10px
  margin-bottom: 10px

.down
  background: #F4F4F4
  border-radius: $radius
  padding: 10px
  margin: 0px 0px 10px 0px

.down-radius
  background: #F4F4F4
  border-radius: $radius
  padding: 10px

.title
  font-size: 10px
  font-weight: bold
  text-transform: uppercase
  color: grey

.value
  font-size: 13px
  font-weight: normal
  text-transform: uppercase
  word-break: break-all

.valueLower
  font-size: 13px
  font-weight: normal
  word-break: break-all

.namespaceInfo
  padding: 10px
  color: black
  & > .nam-layout-up
    display: flex
    flex-flow: row
    justify-content: space-between
    align-items: center
    & > div
      flex-grow: 1
      &:first-child
        margin-right: 5px
      &:last-child
        margin-left: 5px
  & > .nam-layout-down
    display: flex
    justify-content: space-between
    align-items: center
    padding-top: 10px
    & > div
      margin: 0px 5px
      flex-grow: 1
      &:first-child
        margin: 0px
        margin-right: 5px
      &:last-child
        margin: 0px
        margin-left: 5px
  & > .nam-layout-plus
    display: block
    width: 100%
    margin-bottom: 10px
    & > div
      display: flex
      flex-flow: row
      width: 100%
      margin-bottom: 10px
      background: #f4f4f4
      border-radius: 20px
      & > div
        &.up
          flex-grow: 1
          background: transparent
          width: 300px
          text-align: center
          margin: 0px 5px 0px 0px
        &.down
          flex-grow: 1
          background: transparent
          width: 300px
          text-align: center
          margin: 0px 0px 0px 5px

@media screen and (max-width: 700px)
  .value,
  .valueLower
    font-size: 13px

  .link
    color: #2BA1B9
    text-decoration: underline
    cursor: pointer

  .namespaceInfo
    & > .nam-layout-up
      flex-flow: column
      & > div
        width: 100%
        &:first-child
          margin: 0px
        &:last-child
          margin: 0px
    & >.nam-layout-down
      flex-flow: column
      & > div
        width: 100%
        &:first-child
          margin: 0px
        &:nth-child(2)
          margin: 0px
        &:last-child
          margin: 0px
</style>
