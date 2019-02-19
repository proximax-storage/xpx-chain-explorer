<template>
  <div>
    <!-- FROM & TO INFO -->
    <mdb-row>
      <mdb-col md="3">
        <span class="fs-08rem fw-bolder"><b>From: </b></span>
      </mdb-col>
      <mdb-col md="9">
        <span class="fs-08rem fw-bolder">{{transactionSelected.signer.address.pretty()}}</span>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="3">
        <span class="fs-08rem fw-bolder"><b>To:</b></span>
      </mdb-col>
      <mdb-col md="9">
        <span class="fs-08rem fw-bolder">{{transactionSelected.recipient.pretty()}}</span>
      </mdb-col>
    </mdb-row>
    <hr>
    <mdb-row v-if="showAmount">
      <mdb-col md="3">
        <span class="fs-08rem fw-bolder"><b>Amount: </b></span>
      </mdb-col>
      <mdb-col md="9">
        <span class="fs-08rem fw-bolder" v-html="mosaicXpx"></span>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="3">
        <span class="fs-08rem fw-bolder"><b>Fee: </b></span>
      </mdb-col>
      <mdb-col md="9">
        <span class="fs-08rem fw-bolder" v-html="transactionSelected.fee"></span>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="3">
        <span class="fs-08rem fw-bolder"><b>Message: </b></span>
      </mdb-col>
      <mdb-col md="9">
        <span class="fs-08rem fw-bolder">{{transactionSelected.message.payload}}</span>
      </mdb-col>
    </mdb-row>
    <hr>
    <mdb-row>
      <mdb-col md="3">
        <span class="fs-08rem fw-bolder"><b>Deadline:</b></span>
      </mdb-col>
      <mdb-col md="9">
        <span class="fs-08rem fw-bolder">{{transactionSelected.deadline}}</span>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="3">
        <span class="fs-08rem fw-bolder"><b>Block Height:</b></span>
      </mdb-col>
      <mdb-col md="9">
        <router-link target="_blank" :to="`/block-info/${transactionSelected.transactionInfo.height.compact()}`" class="text-link mouse-pointer">{{transactionSelected.transactionInfo.height.compact()}}</router-link>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="3">
        <span class="fs-08rem fw-bolder"><b>Hash:</b></span>
      </mdb-col>
      <mdb-col md="9">
        <span class="fs-08rem fw-bolder">{{transactionSelected.transactionInfo.hash}}</span>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="3">
        <span class="fs-08rem fw-bolder"><b>Signature:</b></span>
      </mdb-col>
      <mdb-col md="9">
        <span class="fs-08rem fw-bolder">{{transactionSelected.signature}}</span>
      </mdb-col>
    </mdb-row>
    <div v-if="showInfoMosaic">
      <hr>
      <mdb-tbl striped responsiveXl responsiveLg responsiveMd responsiveSm>
        <mdb-tbl-head class="background-explorer" textWhite>
          <tr>
            <th class="text-center">Mosaic</th>
            <th class="text-center">Quantity</th>
          </tr>
        </mdb-tbl-head>
        <mdb-tbl-body>
          <tr v-for="(mosaic, index) in mosaicExist" :key="index">
            <td class="th-lg text-center">
              <span class="fs-08rem fw-bolder">{{mosaic.name}}</span>
            </td>
            <td class="th-lg text-center">
              <span class="fs-08rem fw-bolder" v-html="mosaic.amount"></span>
            </td>
          </tr>
        </mdb-tbl-body>
      </mdb-tbl>
    </div>

  </div>
</template>

<script>
import proximaxProvider from '@/services/proximaxProvider'
import localService from "@/services/localService";
import Utils from '@/services/Utils'
import { mdbRow, mdbCol, mdbTbl, mdbTblHead, mdbTblBody } from 'mdbvue'

var _proximaxProvider
var _localService

export default {
  name: 'TypeTransfer',
  components: {
    mdbRow,
    mdbCol,
    mdbTbl,
    mdbTblHead,
    mdbTblBody
  },
  props: {
    transactionSelected: Object
  },
  data () {
    return {
      mosaicXpx: null,
      showAmount: false,
      showInfoMosaic: false,
      mosaicExist: [],
      mosaicSource: [],
      transaction: this.transactionSelected
    }
  },
  created: function () {
    _localService = new localService()
    _proximaxProvider = new proximaxProvider()
    const xpx = proximaxProvider.mosaicXpx()
    console.log(this.transactionSelected);
    if (this.transactionSelected.mosaics.length > 0) {
      this.mosaicXpx = this.transactionSelected.mosaics.filter(element => {
        return element.id.toHex() === xpx
      })
        console.log(this.mosaicXpx.length > 0);
      
      if (this.mosaicXpx.length > 0) {        
        this.mosaicXpx = Utils.fmtAmountValue(this.mosaicXpx[0].amount.compact())
        this.showAmount = true
      }

      this.transactionSelected.mosaics = this.transactionSelected.mosaics.filter(element => {
        return element.id.toHex() !== xpx
      })

      if (this.transactionSelected.mosaics.length > 0) {
        this.searchMosaics(this.transactionSelected.mosaics)
      }
    } else {
      this.showInfoMosaic = false
    }
  },
  methods: {

    /**
     * build a mosaic, obtaining mosaic information, name and format the amount.
     *
     * @param {any} infoBasicMosaic
     */
    searchMosaics: function(mosaicsIds) {
      console.log("Pruebaaaa",this.existMosaic);
      if (_localService.mosaicsName !== null) {
        for (const index in mosaicsIds) {          
          if (_localService.mosaicsName.hasOwnProperty(mosaicsIds[index].id.toHex())) {
            const existMosaic = mosaicsIds[index]
            existMosaic.amount = Utils.fmtAmountValue(mosaicsIds[index].amount.compact())
            existMosaic.name = _localService.mosaicsName[mosaicsIds[index].id.toHex()]
            this.mosaicExist.push(existMosaic)
          } else {
            this.mosaicSource.push(mosaicsIds[index])
          }
        }
      } else {
        this.mosaicSource = mosaicsIds
      }
      console.log(this.mosaicSource);
      
      if (this.mosaicSource.length > 0) {
        const mosaics = this.mosaicSource.map((mosaic) => { return mosaic.id })
        _proximaxProvider.getMosaicsName(mosaics).subscribe(
          resp => {
            for (const element of resp) {
              _proximaxProvider.namespaceHttp.getNamespacesName([element.namespaceId]).subscribe(
              namespaceName => {
                _localService.setNamespaceName(namespaceName[0].namespaceId.toHex(), namespaceName[0].name)
                for (const i in this.mosaicSource) {
                  if (this.mosaicSource[i].id.toHex() === element.mosaicId.toHex()) {
                    this.mosaicSource[i].name = `${namespaceName[0].name}:${element.name}`
                    this.mosaicSource[i].amount = Utils.fmtAmountValue(this.mosaicSource[i].amount.compact())
                    _localService.setMosaicName(this.mosaicSource[i].id.toHex(), `${namespaceName[0].name}:${element.name}`)
                  }
                  if (i === (this.mosaicSource.length - 1)) {
                    this.mosaicExist = this.mosaicExist.concat(this.mosaicSource)
                    this.showInfoMosaic = true
                  }
                }
              })
            }
          },
          err => {
            console.log('Errroooooooooooooooooor', err);
          }
        )
      } else {
        this.mosaicExist = this.mosaicExist
        this.showInfoMosaic = true
      }
    }
  }
}
</script>

