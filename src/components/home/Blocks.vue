<template>
  <div class="block">
    <table>
      <tr class="header-row">
        <th>Block Height</th>
        <th>Harvester/Forger</th>
        <th>Fee</th>
        <th>Txes</th>
      </tr>
      <tr v-for="(item, index) in dataTable" :key="index" :style="(index % 2 === 0) ? 'background: #DDDDDD' : 'background: #F4F4F4'">
        <td class="link-data" @click="analyzeItem">{{ item.block }}</td>
        <td class="link-data" @click="analyzeItem">{{ item.harFor }}</td>
        <td>{{ item.fee }}</td>
        <td>{{ item.txes }}</td>
      </tr>
    </table>
    <div class="pagination">
      <paginator :arrayLength="dataTable.length"/>
    </div>
  </div>
</template>

<script>
import Paginator from '@/components/global/Paginator.vue'

export default {
  name: 'Blocks',
  components: {
    Paginator
  },
  data () {
    return {
      dataTable: [
        { block: '11111', harFor: 'DYEHW76328949373JKDJSHSIOWSJFYYR7362524436819LDIJRNLKSU35627W', fee: '0.00', txes: 0 },
        { block: '11111', harFor: 'DYEHW76328949373JKDJSHSIOWSJFYYR7362524436819LDIJRNLKSU35627W', fee: '0.00', txes: 0 },
        { block: '11111', harFor: 'DYEHW76328949373JKDJSHSIOWSJFYYR7362524436819LDIJRNLKSU35627W', fee: '0.00', txes: 0 },
        { block: '11111', harFor: 'DYEHW76328949373JKDJSHSIOWSJFYYR7362524436819LDIJRNLKSU35627W', fee: '0.00', txes: 0 }
      ]
    }
  },
  methods: {
    analyzeItem (e) {
      console.log(e.target.textContent)
    }
  }
}
</script>

<style lang="sass">
td
  text-align: center
  padding: 10px
  color: black
  font-size: 15px

.grey-back
  background: silver

.link-data
  font-weight: normal
  &:hover
    font-weight: bold

.block
  width: 100%
  display: flex
  flex-flow: row wrap
  justify-content: center
  align-items: center
  &::-webkit-scrollbar
    background: transparent
  &::-webkit-scrollbar-thumb
    background: dodgerblue
    height: 10px
  & > table
    width: 100%
    background: transparent
    padding: 10px
    margin: 20px 0px 0px 0px
    & > tr.header-row
      background: transparent !important
      & > th
        text-align: center
        text-transform: uppercase
        font-weight: bold
        padding: 5px
    & > tr
      background: white
    & > .pagination
      background: red
      width: 100%
      text-align: center

@media screen and (max-width: 750px)
  .block
    display: block
    overflow-x: auto
    & > table
      width: 700px
</style>
