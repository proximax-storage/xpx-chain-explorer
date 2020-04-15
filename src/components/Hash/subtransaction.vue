<template>
  <div>
    <div class="blue lighten-5">
      <v-row>
        <v-col>
          <div>
            <p class="text-center mb-2">
              <v-icon class="blue pa-3" dark style="border-radius: 50%">mdi-cube</v-icon>
            </p>
          </div>
          <p class="text-center ma-0">Inner Transaction</p>
          <p class="text-center ma-0">{{ block }}</p>
          <p class="ma-0"><v-progress-linear v-if="load" class="mb-4" indeterminate/></p>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <p class="text-break">{{ this.blockInfo }}</p>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Subtransaction',

  props: {
    transaction: {
      type: Object,
      defautl: () => {
        return {
          type: null
        }
      }
    }
  }

  data: () => ({

  }),

  mounted () {

  },

  methods: { }
}
</script>
