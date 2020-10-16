<template>
  <div class="list">
    <node-admin/>
    <search-bar/>

    <div>
      <div class="selectedList" v-if="typeList === 'assets'">
        Asset List
      </div>
      <div class="selectedList" v-if="typeList === 'namespaces'">
        Namespace List
      </div>
      <div class="selectedList" v-if="typeList === undefined">
        No List Selected
      </div>
    </div>

    <div>
      <div v-if="typeList === 'assets'">
        <assets-list/>
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
import AssetsList from '@/components/List/AssetsList.vue'

export default {
  name: 'List',
  components: {
    NodeAdmin,
    SearchBar,
    NamespacesList,
    AssetsList
  },
  data () {
    return {
      typeList: undefined
    }
  },
  mounted () {
    this.typeList = this.$route.params.category
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
