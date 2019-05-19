<template>
  <div class="recent">
    <h1 class="supertitle">Recent Transaction</h1>
    <div class="element" v-for="(item, index) in array" :key="item.name + index" :style="(index % 2 === 0) ? 'background: #DDD' : 'background: #f4f4f4'" v-show="index > 0 && index < limit + 1">
      <div class="el-left">
        <h1 class="title alternate">Recipient / Sender</h1>
        <div>
          <figure>
            <img :src="require('@/assets/arrow-transaction-recipient-green.svg')" width="15">
          </figure>
          <div class="value">hy46s5y2jdjsuusbajje7</div>
        </div>
        <div>
          <figure>
            <img :src="require('@/assets/arrow-transaction-sender-orange.svg')" width="15">
          </figure>
          <div class="value">hy46s5y2jdjsuusbajje7</div>
        </div>
      </div>
      <div class="el-middle">
        <div class="title">Timestamp</div>
        <div class="value">2019-05-17</div>
      </div>
      <div class="el-right">
        <div class="title">Fee</div>
        <div class="value">0.00</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecentTrans',
  props: {
    limit: {
      required: false,
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      array: [
        { name: 'hola1' },
        { name: 'hola2' },
        { name: 'hola1' },
        { name: 'hola2' },
        { name: 'hola2' },
        { name: 'hola1' },
        { name: 'hola2' }
      ]
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
    border-radius: $radius
    background: #f4f4f4
    margin: 5px 0px
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
