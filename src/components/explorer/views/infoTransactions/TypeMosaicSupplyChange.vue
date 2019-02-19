<template>
  <div>
    <!-- FROM & TO INFO -->
    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Mosaic: </b></span>
      </mdb-col>
      <mdb-col md="10">
        <span class="fs-08rem fw-bolder">{{transactionSelected.name}}</span>
      </mdb-col>
    </mdb-row>
    <mdb-row v-if="showDelta">
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder" v-if="transactionSelected.direction === 1"><b>Increase: </b></span>
        <span class="fs-08rem fw-bolder" v-else><b>Decrease: </b></span>
      </mdb-col>
      <mdb-col md="10">
        <span class="fs-08rem fw-bolder"   :style="{'color': transactionSelected.direction === 1 ? 'green' : 'red' }" v-html="transactionSelected.delta"></span>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Fee:</b></span>
      </mdb-col>
      <mdb-col md="10">
        <span class="fs-08rem fw-bolder" v-html="transactionSelected.fee"></span>
      </mdb-col>
    </mdb-row>
    <hr>
    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Signer: </b></span>
      </mdb-col>
      <mdb-col md="10">
        <router-link target="_blank" :to="`/account-info/${transactionSelected.signer.address.pretty()}`" class="text-link mouse-pointer">{{transactionSelected.signer.address.pretty()}}</router-link>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Deadline:</b></span>
      </mdb-col>
      <mdb-col md="10">
        <span class="fs-08rem fw-bolder">{{transactionSelected.deadline}}</span>
      </mdb-col>
    </mdb-row>
    <hr>
    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Block Height:</b></span>
      </mdb-col>
      <mdb-col md="10">
        <router-link target="_blank" :to="`/block-info/${transactionSelected.transactionInfo.height.compact()}`" class="text-link mouse-pointer">{{transactionSelected.transactionInfo.height.compact()}}</router-link>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Hash:</b></span>
      </mdb-col>
      <mdb-col md="10">
        <span class="fs-08rem fw-bolder">{{transactionSelected.transactionInfo.hash}}</span>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Signature:</b></span>
      </mdb-col>
      <mdb-col md="10">
        <span class="fs-08rem fw-bolder">{{transactionSelected.signature}}</span>
      </mdb-col>
    </mdb-row>
  </div>
</template>

<script>
import { mdbRow, mdbCol } from 'mdbvue'
import proximaxProvider from '@/services/proximaxProvider'
import localService from "@/services/localService"
import Utils from '@/services/Utils'

var _localService
var _proximaxProvider

export default {
  name: 'TypeMosaicSupplyChange',
  components: {
    mdbRow,
    mdbCol
  },
  props: {
    transactionSelected: Object
  },
  created: function () {
    _localService = new localService()
    _proximaxProvider = new proximaxProvider()
    console.log(this.transactionSelected);
    this.getNameMosaic()
    this.getInfo(this.transactionSelected.mosaicId)
  },
  data () {
    return {
      nameSource: null,
      showDelta: false
    }
  },
  methods: {
    getInfo: function (mosaic) {
      console.log(mosaic);
      
      _proximaxProvider.getMosaic(mosaic).subscribe(
        resp => {
          console.log(resp);
          let delta = this.transactionSelected.delta.compact()          
          this.showDelta = true
          this.transactionSelected.delta = Utils.fmtDivisibility(delta, resp.properties.divisibility)
        },
        err => {
          console.log('Errroooooooooooooooooor', err);
        }
      )
    },
    /**
     * Get Name Mosaic
     *
     * @param {any} resp
     * @memberof TransferTypeComponent
     */
    getNameMosaic: function() {
      const mosaicXpx = proximaxProvider.mosaicFullXpx()
      if (this.transactionSelected.mosaicId.toHex() === mosaicXpx.id) {
        this.transactionSelected.name = mosaicXpx.name
      } else {
        console.log("toHex", this.transactionSelected.mosaicId.toHex());
        
        console.log("CUMPLEEEEEEE", _localService.mosaicsName !== null);
        
        if (_localService.mosaicsName !== null) {
          console.log("LLEEEEEEEEEEEEEGAAAAAAAAAA", _localService.mosaicsName);
          
          if (_localService.mosaicsName.hasOwnProperty(this.transactionSelected.mosaicId.toHex())) {
            this.transactionSelected.name = _localService.mosaicsName[this.transactionSelected.mosaicId.toHex()]
          } else {
            this.nameSource = this.transactionSelected.mosaicId.toHex()
            this.sourceMosaic(this.transactionSelected.mosaicId)
          }
        } else {
          this.nameSource = this.transactionSelected.mosaicId.toHex()
          this.sourceMosaic(this.transactionSelected.mosaicId)
        }
      }
    },
    sourceMosaic: function (mosaic) {
      _proximaxProvider.getMosaicsName([mosaic]).subscribe(
          resp => {
            console.log('Respuestaaaaa', resp);
            
            this.transactionSelected.name = resp[0].name
            this.sourceNamespace(resp.namespaceId)
          },
          err => {
            console.log('Errroooooooooooooooooor', err);
          }
        )
    },
    sourceNamespace: function (namespace) {
      console.log(namespace);
      
      _proximaxProvider.namespaceHttp.getNamespacesName([namespace]).subscribe(
        namespaceName => {
          this.transactionSelected = `${namespaceName[0].name}:${this.transactionSelected}`
          _localService.setNamespaceName(namespaceName[0].namespaceId.toHex(), namespaceName[0].name)
          _localService.setMosaicName(this.transactionSelected.mosaicId, this.transactionSelected)
        })
    }
  }
}
</script>

