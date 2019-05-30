<template>
  <div class="recent" v-if="finalArray.length > 0">
    <h1 class="supertitle">{{ nameLabel }}</h1>
    <div class="element" v-for="(item, index) in finalArray" :key="index" :style="(index % 2 === 0) ? 'background: #DDD' : 'background: #f4f4f4'" v-show="index >= 0 && index < limit + 1" @click="redirectToDetail(item)">
      <div class="el-left">
        <div class="title">Id</div>
        <div class="value">{{ item.id }}</div>
      </div>
      <div class="el-middle" v-if="item.name">
        <div class="title">Name</div>
        <div class="value">{{ item.name }}</div>
      </div>
      <div class="el-right">
        <div class="title">Quantity</div>
        <div class="value" v-html="$utils.fmtAmountValue(item.amount)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import proximaxProvider from '@/services/proximaxProviders.js'

export default {
  name: 'RecentTrans',
  props: {
    limit: {
      required: false,
      type: Number,
      default: 50
    },
    arrayTransactions: Array,
    nameLabel: {
      type: String,
      default: 'Recent Transaction'
    }
  },
  data () {
    return {
      arrayData: []
    }
  },
  mounted () {
    // this.mosaicName(id)
    this.constructorObj()
  },
  methods: {
    constructorObj () {
      // TODO: Falta almacenar en LocalStorage
      let itemComplete
      let mosaicNames = this.$storage.get('mosaicNames')
      if (mosaicNames === null) {
        this.arrayTransactions.forEach(item => {
          this.mosaicName(item)
        })
      } else {
        mosaicNames = JSON.parse(mosaicNames)
        //console.log(mosaicNames)
        this.arrayTransactions.forEach(item => {
          // this.mosaicName(item)
          let tmpitem = mosaicNames.filter(el => item.id.toHex() === el.id)
          // console.log("TEMPORAL ITEM", tmpitem)
          if (tmpitem.length > 0) {
            itemComplete = {
              id: tmpitem[0].id,
              name: tmpitem[0].name,
              amount: item.amount.compact()
            }
            this.arrayData.push(itemComplete)
          }
        })
      }
    },
    mosaicName (item) {
      let id = item.id
      let idExact = item.id.toHex()
      // console.log(item, id)
      let mosaics = [id]
      this.$proxProvider.getMosaicsName(mosaics).subscribe(
        resp => {
          // console.log("NOMBRE", resp[0])
          let itemComplete = {
            id: idExact,
            name: resp[0].names[0],
            amount: item.amount.compact()
          }

          this.arrayData.push(itemComplete)

          let mosaicNames = this.$storage.get('mosaicNames')
          if (mosaicNames === null) {
            mosaicNames = [{
              id: idExact,
              name: resp[0].names[0]
            }]
            this.$storage.set('mosaicNames', mosaicNames)
          } else {
            mosaicNames = JSON.parse(mosaicNames)
            mosaicNames.push({ id: idExact, name: resp[0].names[0] })
            this.$storage.set('mosaicNames', JSON.stringify(mosaicNames))
          }
        },
        err => {
          this.arrayData.push({
            id: 'Communication error with the node!',
            name: 'Communication error with the node!',
            amount: 'Communication error with the node!'
          })
        }
      )
    },
    getItemId (item) {
      return item.id.toHex()
    }
  },
  computed: {
    finalArray () {
      // console.log(this.arrayData)
      return this.arrayData
    }
  }
}
</script>

<style lang="sass" scoped>
$radius: 5px

.title
  font-size: 10px
  font-weight: bold
  text-transform: uppercase
  margin: 0px

.value
  font-size: 10px
  font-weight: normal
  text-transform: uppercase

.balance
  color: black
  margin: 0px
  font-weight: bold
  font-size: 30px

.supertitle
  display: flex
  flex-flow: row nowrap
  justify-content: space-between
  margin: 0px
  font-size: 17px
  color: #7AB5E2
  padding: 0px 0px 5px 0px

.alternate
  display: none

.up
  background: #DDDDDD
  border-radius: $radius $radius 0px 0px
  padding: 10px

.down
  background: #F4F4F4
  border-radius: 0px 0px $radius $radius
  padding: 10px

.recent
  margin: 15px 10px
  border: 1px solid #7ab5e280
  border-radius: $radius
  padding: 10px
  color: black
  & > .element
    display: flex
    flex-flow: row nowrap
    justify-content: space-between
    aling-items: center
    border-radius: $radius
    background: #f4f4f4
    margin: 5px 0px
    padding: 5px
    & > .el-left
      flex-grow: 1
      display: flex
      flex-flow: column nowrap
      align-items: center
      padding: 5px
      border-radius: $radius 0px 0px $radius
      & > div
        display: flex
        flex-flow: row nowrap
        align-items: center
        & > figure
          margin: 0px
          padding: 5px
        & > span
          font-size: 15px
    & > .el-middle
      flex-grow: 2
      display: flex
      flex-flow: column wrap
      align-items: center
      justify-content: center
    & > .el-right
      flex-grow: 2
      display: flex
      flex-flow: column wrap
      align-items: center
      justify-content: center
      border-radius: 0px $radius $radius 0px

@media screen and (max-width: 741px)
  .alternate
    display: block

  .recent > .element
    flex-flow: column
    & > .el-left
      border-radius: $radius $radius 0px 0px
      padding: 5px
      // background: #00000020
      border-bottom: 1px solid #c0c0c090
    & > .el-middle
      border-radius: 0px
      padding: 5px
    & > .el-right
      // background: #00000020
      border-top: 1px solid #c0c0c090
      border-radius: 0px
      padding: 5px
      border-radius: 0px 0px $radius $radius
</style>
