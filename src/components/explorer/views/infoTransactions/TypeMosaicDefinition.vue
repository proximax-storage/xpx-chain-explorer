<template>
  <div>
    <!-- FROM & TO INFO -->
    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Mosaic: </b></span>
      </mdb-col>
      <mdb-col md="10">
        <span class="fs-08rem fw-bolder">{{mosaicName}}</span>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Fee: </b></span>
      </mdb-col>
      <mdb-col md="10">
        <span class="fs-08rem fw-bolder" v-html="transaction.fee"></span>
      </mdb-col>
    </mdb-row>
    <hr>
    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Signer: </b></span>
      </mdb-col>
      <mdb-col md="10">
        <router-link target="_blank" :to="`/account-info/${transaction.signer.address.pretty()}`" class="text-link mouse-pointer">{{transaction.signer.address.pretty()}}</router-link>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Deadline:</b></span>
      </mdb-col>
      <mdb-col md="10">
        <span class="fs-08rem fw-bolder">{{transaction.deadline}}</span>
      </mdb-col>
    </mdb-row>
    <hr>
    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Block Height:</b></span>
      </mdb-col>
      <mdb-col md="10">
        <router-link target="_blank" :to="`/block-info/${transaction.transactionInfo.height.compact()}`" class="text-link mouse-pointer">{{transaction.transactionInfo.height.compact()}}</router-link>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Hash:</b></span>
      </mdb-col>
      <mdb-col md="10">
        <span class="fs-08rem fw-bolder">{{transaction.transactionInfo.hash}}</span>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Signature:</b></span>
      </mdb-col>
      <mdb-col md="10">
        <span class="fs-08rem fw-bolder">{{transaction.signature}}</span>
      </mdb-col>
    </mdb-row>
    <hr>
    <mdb-row>
      <mdb-col md="12">
        <span class="fs-08rem fw-bolder"><b>Mosaic properties: </b></span>
      </mdb-col>
    </mdb-row>
    <mdb-row  class="justify-content-center">
      <mdb-col md="4">
        <span class="fs-08rem fw-bolder"><b>Divisibility:</b></span>
      </mdb-col>
      <mdb-col md="4">
        <span class="fs-08rem fw-bolder">{{transaction.mosaicProperties.divisibility}}</span>
      </mdb-col>
    </mdb-row>
    <mdb-row  class="justify-content-center">
      <mdb-col md="4">
        <span class="fs-08rem fw-bolder"><b>Duration:</b></span>
      </mdb-col>
      <mdb-col md="4">
        <span class="fs-08rem fw-bolder">{{transaction.mosaicProperties.duration.compact()}}</span>
      </mdb-col>
    </mdb-row>
    <mdb-row class="justify-content-center">
      <mdb-col md="4">
        <span class="fs-08rem fw-bolder"><b>Supply Mutable?</b></span>
      </mdb-col>
      <mdb-col md="4">
        <i v-if="transaction.mosaicProperties.supplyMutable" class="fa fa-check-square prefix text-success"></i>
        <i v-if="!transaction.mosaicProperties.supplyMutable" class="fa fa-minus-square prefix text-danger"></i>
      </mdb-col>
    </mdb-row>
    <mdb-row class="justify-content-center">
      <mdb-col md="4">
        <span class="fs-08rem fw-bolder"><b>Levy Mutable?</b></span>
      </mdb-col>
      <mdb-col md="4">
        <i v-if="transaction.mosaicProperties.levyMutable" class="fa fa-check-square prefix text-success"></i>
        <i v-if="!transaction.mosaicProperties.levyMutable" class="fa fa-minus-square prefix text-danger"></i>
      </mdb-col>
    </mdb-row>
    <mdb-row  class="justify-content-center">
      <mdb-col md="4">
        <span class="fs-08rem fw-bolder"><b>Transferable? </b></span>
      </mdb-col>
      <mdb-col md="4">
        <i v-if="transaction.mosaicProperties.transferable" class="fa fa-check-square prefix text-success"></i>
        <i v-if="!transaction.mosaicProperties.transferable" class="fa fa-minus-square prefix text-danger"></i>
      </mdb-col>
    </mdb-row>
  </div>
</template>

<script>
import { mdbRow, mdbCol } from 'mdbvue'
import localService from "@/services/localService"
import proximaxProvider from '@/services/proximaxProvider'
var _proximaxProvider
var _localService

export default {
  name: 'TypeMosaicDefinition',
  components: {
    mdbRow,
    mdbCol
  },
  props: {
    transactionSelected: Object
  },
  data () {
    console.log(this.transactionSelected);
    
    return {
      mosaicName: null,
      transaction: this.transactionSelected
    }
  },
  created: function () {
    _proximaxProvider = new proximaxProvider()
    _localService = new localService()
    this.getNameMosaic()
  },
  methods: {
    /**
     * Get Name Mosaic
     *
     * @param {any} resp
     * @memberof TransferTypeComponent
     */
    getNameMosaic: function() {
      const namespaceXpx = proximaxProvider.namespaceXpx()
      
      if (this.transactionSelected.parentId.toHex() === namespaceXpx.id) {
        this.mosaicName = `${namespaceXpx.name}:${this.transaction.mosaicName}`
        
      } else {
        if (_localService.namespaceName !== null) {
          if (_localService.namespaceName.hasOwnProperty(this.transaction.parentId.toHex())) {            
            this.mosaicName = `${_localService.namespaceName[this.transaction.parentId.toHex()]}:${this.transaction.mosaicName}`
          } else {
            this.mosaicName = this.transactionSelected.mosaicName
            this.sourceNamespace(this.transactionSelected.parentId)
          }
        } else {
          this.mosaicName = this.transaction.mosaicName
          this.sourceNamespace(this.transaction.parentId)
        }
      }
    },
    sourceNamespace: function (namespace) {
      console.log(namespace);
      
      _proximaxProvider.namespaceHttp.getNamespacesName([namespace]).subscribe(
        namespaceName => {
          this.mosaicName = `${namespaceName[0].name}:${this.transaction}`
          _localService.setNamespaceName(namespaceName[0].namespaceId.toHex(), namespaceName[0].name)
          _localService.setMosaicName(this.transaction.mosaicId, this.transaction)
        })
    }
  }
}
</script>

