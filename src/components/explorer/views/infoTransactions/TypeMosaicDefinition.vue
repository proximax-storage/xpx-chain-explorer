<template>
  <div>
    <!-- FROM & TO INFO -->
    <mdb-row>
      <mdb-col md="3">
        <span class="fs-08rem fw-bolder"><b>Mosaic: </b></span>
      </mdb-col>
      <mdb-col md="9">
        <span class="fs-08rem fw-bolder">{{nameMosaic}}</span>
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
        <span class="fs-08rem fw-bolder">{{transactionSelected.mosaicProperties.divisibility}}</span>
      </mdb-col>
    </mdb-row>
    <mdb-row  class="justify-content-center">
      <mdb-col md="4">
        <span class="fs-08rem fw-bolder"><b>Duration:</b></span>
      </mdb-col>
      <mdb-col md="4">
        <span class="fs-08rem fw-bolder">{{transactionSelected.mosaicProperties.duration.compact()}}</span>
      </mdb-col>
    </mdb-row>
    <mdb-row class="justify-content-center">
      <mdb-col md="4">
        <span class="fs-08rem fw-bolder"><b>Supply Mutable?</b></span>
      </mdb-col>
      <mdb-col md="4">
        <i v-if="transactionSelected.mosaicProperties.supplyMutable" class="fa fa-check-square prefix text-success"></i>
        <i v-if="!transactionSelected.mosaicProperties.supplyMutable" class="fa fa-minus-square prefix text-danger"></i>
      </mdb-col>
    </mdb-row>
    <mdb-row class="justify-content-center">
      <mdb-col md="4">
        <span class="fs-08rem fw-bolder"><b>Levy Mutable?</b></span>
      </mdb-col>
      <mdb-col md="4">
        <i v-if="transactionSelected.mosaicProperties.levyMutable" class="fa fa-check-square prefix text-success"></i>
        <i v-if="!transactionSelected.mosaicProperties.levyMutable" class="fa fa-minus-square prefix text-danger"></i>
      </mdb-col>
    </mdb-row>
    <mdb-row  class="justify-content-center">
      <mdb-col md="4">
        <span class="fs-08rem fw-bolder"><b>Transferable? </b></span>
      </mdb-col>
      <mdb-col md="4">
        <i v-if="transactionSelected.mosaicProperties.transferable" class="fa fa-check-square prefix text-success"></i>
        <i v-if="!transactionSelected.mosaicProperties.transferable" class="fa fa-minus-square prefix text-danger"></i>
      </mdb-col>
    </mdb-row>
    <hr>
    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Signer: </b></span>
      </mdb-col>
      <mdb-col md="10">
        <span class="fs-08rem fw-bolder">{{transactionSelected.signer.publicKey}}</span>
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
    <hr>
    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Timestamp:</b></span>
      </mdb-col>
      <mdb-col md="10">
        <span class="fs-08rem fw-bolder">{{transactionSelected.deadline.value.toString()}}</span>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Height:</b></span>
      </mdb-col>
      <mdb-col md="10">
        <span class="fs-08rem fw-bolder">{{transactionSelected.transactionInfo.height.lower}}</span>
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
  </div>
</template>

<script>
import { mdbRow, mdbCol } from 'mdbvue'
import proximaxProvider from '@/services/proximaxProvider'
const _proximaxProvider = new proximaxProvider()

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
    this.getNameMosaic()
    
    return {
      nameMosaic: ''
    }
  },
  methods: {
    /**
     * Get Name Mosaic
     *
     * @param {any} resp
     * @memberof TransferTypeComponent
     */
    getNameMosaic: function() {
      if (this.transactionSelected.mosaics !== undefined && this.transactionSelected.mosaics.length > 0) {
        _proximaxProvider.mosaicHttp.getMosaicsName([this.transactionSelected.mosaics[0].id]).subscribe(
          name => {
            return (name.length > 0) ? name[0].name : ''
          }
        );
      } else if (this.transactionSelected.mosaicId !== undefined) {
        _proximaxProvider.mosaicHttp.getMosaicsName([this.transactionSelected.mosaicId.id]).subscribe(
          name => {
            _proximaxProvider.namespaceHttp.getNamespacesName([name[0].namespaceId]).subscribe(
              namespaceName => {
                this.nameMosaic = `${namespaceName[0].name}.${this.transactionSelected.mosaicName}`
            })
          }
        )
      }
    }
  }
}
</script>

