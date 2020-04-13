<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead class="grey lighten-3">
          <tr>
            <th>HEIGHT</th>
            <th>VALIDATOR</th>
            <th>FEE</th>
            <th>TXS</th>
            <th>TIMESTAMP</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in blocks" :key="index">
            <td @click="$goToBlock(item.height.compact())">{{ item.height.compact() }}</td>
            <td @click="$goToPublicKey(item.signer.publicKey)">{{ item.signer.publicKey }}</td>
            <td>{{ item.totalFee.compact() }}</td>
            <td>{{ ([undefined, null].includes(item.numTransactions)) ? 0 : item.numTransactions }}</td>
            <td>{{ timedate(item.timestamp.compact()) }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: 'BlockList',

  data: () => ({
    blocks: []
  }),

  methods: {
    timedate (date) {
      const date2 = new Date(date)
      return date2.toLocaleString()
    }
  },

  watch: {
    getCurrentBlock (nv, ov) {
      // console.log('currentttt', nv)
      const some = this.blocks.some(elem => elem.height.compact() === nv.height.compact())
      // console.log(some)
      if (some === false) {
        this.blocks.unshift(nv)
      }
    }
  },

  computed: {
    getCurrentBlock () {
      return this.$store.getters.getCurrentBlock
    }
  }
}
</script>
