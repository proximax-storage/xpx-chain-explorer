<template>
  <div class="list">
    <node-admin/>
    <search-bar/>

    <div>
      <div class="selectedList" v-if="typeList === 'mosaics'">
        Mosaic List
      </div>
      <div class="selectedList" v-if="typeList === 'namespaces'">
        Namespace List
      </div>
      <div class="selectedList" v-if="typeList === undefined">
        No List Selected
      </div>
    </div>

    <div>
      <div v-if="typeList === 'mosaics'">
        <mosaics-list/>
      </div>
      <div v-if="typeList === 'namespaces'">
        <namespaces-list/>
      </div>
    </div>
  </div>
</template>

<script>
import NodeAdmin from '@/components/home/NodeAdmin.vue'
import SearchBar from '@/components/global/SearchBar.vue'
import NamespacesList from '@/components/List/NamespacesList.vue'
import MosaicsList from '@/components/List/MosaicsList.vue'

export default {
  name: 'List',
  components: {
    NodeAdmin,
    SearchBar,
    NamespacesList,
    MosaicsList
  },
  data () {
    return {
      typeList: undefined
    }
  },
  mounted () {
    this.typeList = this.$route.params.category
    /* http://localhost:8080/#/list/mosaics */

  }
}
</script>

<style lang="sass" scoped>
.selectedList
  text-align: center
  color: #2BA1B9
  font-weight: bold
  font-size: 25px
</style>
