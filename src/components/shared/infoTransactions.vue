<template>
  <div>
    <mdb-row v-for="(item, i) in transactionSelected" :key="i" :class="[{'green-back': i % classGreen == 0},{'info': classInfo}]">
      <mdb-col sm="12" :class="item.classLabel">
        <span class="fs-08rem fw-bolder"><b>{{item.label}}: </b></span>
      </mdb-col>
      <mdb-col sm="12" :class="item.classValue">
        <router-link v-if="item.label == 'From' || item.label == 'To'" :to="`/account-info/${item.value}`" class="text-link mouse-pointer">{{item.value}}</router-link>
        <router-link v-else-if="item.label == 'Block Height'" :to="`/block-info/${item.value}`" class="text-link mouse-pointer">{{item.value}}</router-link>
        <span v-else class="fs-08rem fw-bolder">{{item.value}}</span>
      </mdb-col>
    </mdb-row>
  </div>
</template>

<script>
import { mdbRow, mdbCol } from 'mdbvue'
import proximaxProvider from '@/services/proximaxProvider'

const _proximaxProvider = new proximaxProvider()

export default {
  name: 'infoTransactions',
  components: {
    mdbRow,
    mdbCol
  },
  props: {
    transactionSelected: Array,
    classGreen: Number,
    classInfo: Boolean
  }
}
</script>

