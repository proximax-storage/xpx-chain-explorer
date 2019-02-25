<template>
  <mdb-card class="card">
    <mdb-card-body>
      <div class="d-flex align-items-center" v-if="!showInfo">
        <strong>Loading...</strong>
        <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
      </div>
      <div v-if="showError">
        <mdb-alert color="danger">
          {{msg}}
        </mdb-alert>
      </div>
      <div v-if="!showError && showInfo">
        <mdb-card-title>{{typeTransaction}}</mdb-card-title>
        <hr>
        <info-transactions v-if="typeTransaction" :transactionSelected="infoTransaction" :classGreen="classGreen" :classInfo="classInfo" ></info-transactions>
        <details-transaction :transaction="detailTransaction" :typeTransactionId="typeTransactionId"></details-transaction>
      </div>
    </mdb-card-body>
  </mdb-card>
</template>

<script>
import proximaxProvider from '@/services/proximaxProvider'
import localService from "@/services/localService"
import Utils from '@/services/Utils'
import { mdbCard, mdbCardBody, mdbCardTitle, mdbCardText, mdbRow, mdbCol, mdbAlert } from 'mdbvue'
import infoTransactions from '@/components/shared/infoTransactions'
import detailsTransaction from '@/components/shared/detailsTransaction'

var _proximaxProvider
var _localService

export default {
  name: 'TransactionHast',
  components: {
    mdbCard,
    mdbCardBody,
    mdbCardTitle,
    mdbCardText,
    mdbRow,
    mdbCol,
    mdbAlert,
    infoTransactions,
    detailsTransaction
  },
  data () {
    _localService = new localService()
    _proximaxProvider = new proximaxProvider()
    return {
      infoTransaction: [],
      transaction: null,
      detailTransaction: [],
      typeTransactionId: null,
      typeTransaction: '',
      classGreen: 2,
      classInfo: true,
      showInfo: false,
      showError: false,
      msg: '',
      mosaicName: null,
      mosaicId: null,
      mosaicXpx: null,
      mosaicsSource: [],
      mosaicsExist: [],
      mosaicInfo: []
    }
  },
  mounted: function () {
    this.getInfoTransaction(this.$route.params.hast)
  },
  methods: {
    /**
     * Method for get the information of the transaction.
     * @param hash of the transaction
     */
    getInfoTransaction: function (hast) {
      _proximaxProvider.getTransactionInformation(hast).subscribe(
        resp => {          
          const typeTransactions = proximaxProvider.typeTransactions()
          switch (resp.type) {
            case typeTransactions.transfer.id:
              this.typeTransactionId = typeTransactions.transfer.id
              this.typeTransaction = typeTransactions.transfer.name
              this.transferTransaction(resp)
              break;

            case typeTransactions.registerNamespace.id:
              this.typeTransactionId = typeTransactions.registerNamespace.id
              this.typeTransaction = typeTransactions.registerNamespace.name
              this.registerNamespaceTransaction(resp)
              break;

            case typeTransactions.mosaicDefinition.id:
              this.typeTransactionId = typeTransactions.mosaicDefinition.id
              this.typeTransaction = typeTransactions.mosaicDefinition.name
              this.mosaicDefinitionTransaction(resp)
              break;

            case typeTransactions.mosaicSupplyChange.id:
              this.typeTransactionId = typeTransactions.mosaicSupplyChange.id
              this.typeTransaction = typeTransactions.mosaicSupplyChange.name
              this.mosaicSupplyChangeTransaction(resp)
              break;
          
            default:
              this.msg = 'Unexpected error try later!'
              this.showInfo = true
              this.showError = true
              break;
          }
          this.showInfo = true
        },
        error => {          
          this.msg = 'Communication error with the node!'
          this.showInfo = true
          this.showError = true
        }
      )
    },

    /**
     * Method to look for the mosaics of the transaction.
     * @param mosaicsIds of the transaction
     */
    searchMosaic: function (mosaicsIds) {
      if (_localService.mosaicsName !== null) {
        const mosaicSearch = []
        for (const index in mosaicsIds) {
          if (_localService.mosaicsName.hasOwnProperty(mosaicsIds[index].id.toHex())) {
            let existMosaic = mosaicsIds[index]
            existMosaic.amount = Utils.fmtAmountValue(mosaicsIds[index].amount.compact())
            existMosaic.name = _localService.mosaicsName[mosaicsIds[index].id.toHex()]
            this.mosaicsExist.push(existMosaic)
          } else {
            mosaicSearch.push(mosaicsIds[index])
          }
        }
        this.mosaicSource = mosaicSearch.map(mosaic => { return mosaic.id })
      } else {
        this.mosaicsSource = mosaicsIds.map(mosaic => { return mosaic.id })
      }
      if (this.mosaicsSource.length > 0) {
        
        _proximaxProvider.getMosaicsName(this.mosaicsSource).subscribe(
          resp => {
            for (const element of resp) {
              _proximaxProvider.namespaceHttp.getNamespacesName([element.namespaceId]).subscribe(
              namespaceName => {
                _localService.setNamespaceName(namespaceName[0].namespaceId.toHex(), namespaceName[0].name)
                for (const i in this.mosaicsSource) {
                  if (this.mosaicsSource[i].id.toHex() === element.mosaicId.toHex()) {
                    this.mosaicsSource[i].name = `${namespaceName[0].name}:${element.name}`
                    this.mosaicsSource[i].amount = Utils.fmtAmountValue(this.mosaicsSource[i].amount.compact())
                    _localService.setMosaicName(this.mosaicsSource[i].id.toHex(), `${namespaceName[0].name}:${element.name}`)
                  }
                  if (i === (this.mosaicsSource.length - 1)) {
                    this.detailTransaction = this.mosaicsExist.concat(this.mosaicsSource)
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
        this.detailTransaction = this.mosaicsExist
      }
    },

    /**
     * Method for searching the name of a mosaic.
     * @param mosaic
     */
    sourceMosaic: function (mosaic) {
      _proximaxProvider.getMosaicsName([mosaic]).subscribe(
          resp => {
            this.mosaicName = resp[0].name
            this.sourceNamespace(resp.namespaceId, true)
          },
          err => {
            console.log('Errroooooooooooooooooor', err);
          }
        )
    },

    /**
     * Method for searching the namespace of a mosaic.
     * @param namespace
     * @param setMosaic
     */
    sourceNamespace: function (namespace, setMosaic) {
      _proximaxProvider.namespaceHttp.getNamespacesName([namespace]).subscribe(
        namespaceName => {
          this.mosaicName = `${namespaceName[0].name}:${this.mosaicName}`
          _localService.setNamespaceName(namespaceName[0].namespaceId.toHex(), namespaceName[0].name)
          if (setMosaic) {
            _localService.setMosaicName(this.mosaicId, this.mosaicName)
          }
        })
    },
    
    /**
     * Method to show information in transfer type transactions.
     * @param transaction
     */
    transferTransaction: function (transaction) {
      this.infoTransaction = [
        { label: 'From',          value: transaction.signer.address.pretty(),           classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'To',            value: transaction.recipient.pretty(),    classLabel: 'col-md-2', classValue: 'col-md-10'}
      ]
      if (transaction.mosaics !== undefined && transaction.mosaics.length > 0) {
        const xpx = proximaxProvider.mosaicXpx()
        this.mosaicXpx = transaction.mosaics.filter(element => {
          return element.id.toHex() === xpx
        })
        if (this.mosaicXpx.length > 0) {
          this.mosaicXpx = Utils.fmtAmountValue(this.mosaicXpx[0].amount.compact())
          this.infoTransaction.push(
            { label: 'Amount',   value: this.mosaicXpx,     classLabel: 'col-md-2', classValue: 'col-md-10'}
          )
        }
        transaction.mosaics = transaction.mosaics.filter(element => {
          return element.id.toHex() !== xpx
        })
        if (transaction.mosaics.length > 0) {
          this.searchMosaic(transaction.mosaics)
        }        
      }

      this.infoTransaction = this.infoTransaction.concat([
        { label: 'Fee',         value: Utils.fmtAmountValue(transaction.fee.compact()),   classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Message',       value: transaction.message.payload,                   classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Deadline',     value: Utils.fmtTime(new Date(transaction.deadline.value.toString())),         classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Block Height',  value: transaction.transactionInfo.height.compact(),  classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Hash',          value: transaction.transactionInfo.hash,              classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Signature',     value: transaction.signature,                         classLabel: 'col-md-2', classValue: 'col-md-10'}
      ])
    },

    /**
     * Method to show information in Register Namespace type transactions.
     * @param transaction
     */
    registerNamespaceTransaction: function (transaction) {
      this.infoTransaction = [
        { label: 'Namespace',          value: transaction.namespaceName,           classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Fee',            value: Utils.fmtAmountValue(transaction.fee.compact()),                classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Duration',       value: `<span><b>(Blocks: ${transaction.duration.compact()})</b> ${Utils.calculateDuration(transaction.duration.compact())}</span>`,                   classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Signer',     value: transaction.signer.address.pretty(),         classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Deadline',          value: Utils.fmtTime(new Date(transaction.deadline.value.toString())) ,              classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Block Height',     value: transaction.transactionInfo.height.compact(),                         classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Hash',     value: transaction.transactionInfo.hash,                         classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Signature',  value: transaction.signature,  classLabel: 'col-md-2', classValue: 'col-md-10'}
      ]
    },

    /**
     * Method to show information in Mosaic Definition type transactions.
     * @param transaction
     */
    mosaicDefinitionTransaction: function (transaction) {
      const namespaceXpx = proximaxProvider.namespaceXpx()
      if (transaction.parentId.toHex() === namespaceXpx.id) {
        this.mosaicName = `${namespaceXpx.name}:${transaction.mosaicName}`
      } else {
        if (_localService.namespaceName !== null) {
          if (_localService.namespaceName.hasOwnProperty(transaction.parentId.toHex())) {
            this.mosaicName = _localService.namespaceName[transaction.parentId.toHex()]
          } else {
            this.mosaicName = transaction.mosaicName
            this.sourceNamespace(transaction.parentId, false)
          }
        } else {
          this.mosaicName = transaction.mosaicName
          this.sourceNamespace(transaction.parentId, false)
        }
      }
      this.infoTransaction = [
        { label: 'Mosaic',          value: this.mosaicName,           classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Fee',            value: Utils.fmtAmountValue(transaction.fee.compact()),                classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Signer',            value: transaction.signer.address.pretty(),                classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Deadline',       value: Utils.fmtTime(new Date(transaction.deadline.value.toString())),                   classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Block Height',     value: transaction.transactionInfo.height.compact(),         classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Hash',          value: transaction.transactionInfo.hash,              classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Signature',  value: transaction.signature,  classLabel: 'col-md-2', classValue: 'col-md-10'}
      ]
      this.detailTransaction = [
        { label: 'Divisibility:',          value: transaction.mosaicProperties.divisibility,           classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Duration:',          value:  Utils.calculateDuration(transaction.mosaicProperties.duration.compact()),           classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Supply Mutable?',          value: transaction.mosaicProperties.supplyMutable,           classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Levy Mutable?',          value: transaction.mosaicProperties.levyMutable,           classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Transferable?',          value: transaction.mosaicProperties.transferable,           classLabel: 'col-md-2', classValue: 'col-md-10'},
      ]
    },

    /**
     * Method to search the mosaic information
     * @param mosaicsIds of the transaction
     */
    getInfoMosaic: function (mosaic) {
      _proximaxProvider.getMosaic(mosaic).subscribe(
        resp => {
          this.mosaicInfo = resp
          this.continueTransaction(this.transaction)
        },
        err => {
          this.mosaicInfo = null
          this.continueTransaction(this.transaction)
          // this.msg = 'not found mosaic info!'
          // this.showError = true
          console.log('Errroooooooooooooooooor', err);
        }
      )
    },

    /**
     * Method to show information in Mosaic Supply change type transactions.
     * @param transaction
     */
    mosaicSupplyChangeTransaction: function (transaction) {
      this.getInfoMosaic(transaction.mosaicId)
      const mosaicXpx = proximaxProvider.mosaicFullXpx()
      if (transaction.mosaicId.toHex() === mosaicXpx.id) {
        this.mosaicName = mosaicXpx.name
      } else {
        if (_localService.mosaicsName !== null) {
          if (_localService.mosaicsName.hasOwnProperty(transaction.mosaicId.toHex())) {
            this.mosaicName = _localService.mosaicsName[transaction.mosaicId.toHex()]
          } else {
            this.mosaicId = transaction.mosaicId.toHex()
            this.sourceMosaic(transaction.mosaicId)
          }
        } else {
          this.mosaicId = transaction.mosaicId.toHex()
          this.sourceMosaic(transaction.mosaicId)
        }
      }
      this.transaction = transaction
    },

    /**
     * Method to continue with the Mosaic Supply change type transactions.
     * @param transaction
     */
    continueTransaction: function (transaction) {      
      this.infoTransaction = [
        { label: 'Mosaic',          value: this.mosaicName,           classLabel: 'col-md-2', classValue: 'col-md-10'}
      ]
      if (transaction.direction === 1) {
        if (this.mosaicInfo === null) {
          this.infoTransaction.push(
            { label: 'Increase',          value: `+ ${Utils.fmtIntValue(transaction.delta.compact())}`,           classLabel: 'col-md-2', classValue: 'col-md-10 text-green'}
          )
        } else {
          this.infoTransaction.push(
            { label: 'Increase',          value: `+ ${Utils.fmtDivisibility(transaction.delta.compact(), this.mosaicInfo.properties.divisibility)}`,           classLabel: 'col-md-2', classValue: 'col-md-10 text-green'}
          )
        }
      } else {
        if (this.mosaicInfo === null) {
          this.infoTransaction.push(
            { label: 'Decrease',          value: `- ${Utils.fmtIntValue(transaction.delta.compact())}`,           classLabel: 'col-md-2', classValue: 'col-md-10 text-red'}
          )
        } else {
          this.infoTransaction.push(
            { label: 'Decrease',          value: `- ${Utils.fmtDivisibility(transaction.delta.compact(), this.mosaicInfo.properties.divisibility)}`,           classLabel: 'col-md-2', classValue: 'col-md-10 text-red'}
          )
        }
      }
      this.infoTransaction = this.infoTransaction.concat([
        { label: 'Fee',            value: Utils.fmtAmountValue(transaction.fee.compact()),                classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Signer',            value: transaction.signer.address.pretty(),                classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Deadline',       value: Utils.fmtTime(new Date(transaction.deadline.value.toString())),                   classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Block Height',     value: transaction.transactionInfo.height.compact(),         classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Hash',          value: transaction.transactionInfo.hash,              classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Signature',  value: transaction.signature,  classLabel: 'col-md-2', classValue: 'col-md-10'}
      ])

    }
  }
}
</script>
