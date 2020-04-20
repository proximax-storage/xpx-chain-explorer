<template>
  <v-container fluid>
    <div>
      <div class="d-flex justify-space-between align-center pb-4">
        <h1 class="title">Nodes</h1>
        <v-btn small text class="red--text">Clear Custom Nodes</v-btn>
      </div>

      <info/>

      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Index</th>
              <th class="text-left">Nodes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in nodes" :key="index" @click="(item !== currentNode) ? changeNode(index) : errInSelection()">
              <td class="text-left">{{ index + 1 }}</td>
              <td class="text-left">{{ item }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>

    <v-snackbar v-model="snack" color="red">
      <p class="ma-0 text-center">The selected node is the current node</p>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: 'Nodes',

  components: {
    info: () => import('@/components/global/Info')
  },

  data: () => ({
    nodes: null,
    currentNode: null,
    snack: false
  }),

  mounted () {
    this.nodes = this.$nodeman.nodes
    this.currentNode = this.$nodeman.currentNode
    console.log(this.nodes)
  },

  methods: {
    changeNode (index) {
      console.log(this.$nodeman)
      this.$nodeman.selectNode(index)
      this.$reloadApp()
    },

    errInSelection () {
      this.snack = true
    }
  }
}
</script>
