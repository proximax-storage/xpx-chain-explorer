<template>
  <div class="recent">
    <h1 class="supertitle">
      <div>Recent Transaction</div>
      <div>Timestamp</div>
      <div>Fee</div>
      <div>View</div>
    </h1>
    <div class="element">
      <div class="el-left">
        <figure>
          <img :src="require('@/assets/arrow-transaction-recipient-green.svg')" width="20" alt="">
        </figure>
        <span>hy46s5y2jdjsuusbajje7</span>
      </div>
      <div class="el-middle">
        hola
      </div>
      <div class="el-right">
        hola
      </div>
      <div class="el-icon">
        hola
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecentTrans'
}
</script>

<style lang="sass" scoped>
$radius: 5px

.title
  font-size: 10px
  font-weight: bold
  text-transform: uppercase

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
  & > div:first-child
    flex-grow: 3
  & > div:nth-child(2)
    flex-grow: 2
  & > div:nth-child(3)
    flex-grow: 2
  & > div:last-child
    flex-grow: 1

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
    padding: 5px
    display: flex
    flex-flow: row nowrap
    justify-content: space-between
    & > .el-left
      flex-grow: 3
      display: flex
      flex-flow: row nowrap
      align-items: center
      padding: 5px
      background: #f4f4f4
      border-radius: $radius 0px 0px $radius
      & > figure
        margin: 0px
        padding: 5px
    & > .el-middle
      background: blue
      flex-grow: 2
      display: flex
      align-items: center
      justify-content: flex-start
      //background: #f4f4f4
    & > .el-right
      background: red
      flex-grow: 2
      display: flex
      align-items: center
      justify-content: flex-start
      //background: #f4f4f4
    & > .el-icon
      flex-grow: 1
      display: flex
      align-items: center
      justify-content: flex-start
      background: #7AB5E2
      border-radius: 0px $radius $radius 0px
</style>
