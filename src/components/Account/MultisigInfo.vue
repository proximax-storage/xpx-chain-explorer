<template>
  <div>
    <div v-if="multisigInfo !== null">
      <v-divider></v-divider>
      <div class="pb-2">
        <p class="ma-0 primary--text text-center caption font-weight-bold" xs="12" sm="12" md="4">Multisig Info</p>
      </div>

      <!-- <div class="pb-2">
        <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Account Address</p>
        <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ multisigInfo.account.address.pretty() }}</p>
      </div>

      <div class="pb-2">
        <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Account PublicKey</p>
        <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ multisigInfo.account.publicKey }}</p>
      </div> -->

      <div class="pb-2">
        <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Minimal Removal</p>
        <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ multisigInfo.minRemoval }}</p>
      </div>

      <div class="pb-2">
        <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Minimal Approval</p>
        <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ multisigInfo.minApproval }}</p>
      </div>

      <div v-if="multisigInfo !== null && [undefined, null].includes(multisigInfo.cosignatories) === false && multisigInfo.cosignatories.length !== 0">
        <v-divider></v-divider>
        <div class="pb-2">
          <p class="ma-0 primary--text text-center caption font-weight-bold" xs="12" sm="12" md="4">Multisig Cosignatories</p>
        </div>

        <v-simple-table >
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Index</th>
                <!-- <th class="text-left">Address</th> -->
                <th class="text-left">PublicKey</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in multisigInfo.cosignatories" :key="index">
                <td class="caption text-break">{{ index + 1 }}</td>
                <!-- <td class="caption text-break">{{ item.address.pretty() }}</td> -->
                <td class="caption text-break">{{ item.publicKey }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultisigInfo',

  props: {
    multisigInfo: {
      type: Object,
      default: null
    }
  }
}
</script>
