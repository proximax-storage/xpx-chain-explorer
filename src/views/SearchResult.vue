<template>
  <!-- Search Result View -->
  <div class="searchResult">
    <!-- Search Bar Component -->
    <node-admin/>
    <search-bar/>
    <!-- End Search Bar Component -->

    <!-- Search Result Main Message Container -->
    <div class="search-cont animated fast fadeIn">
      <div class="search-type">{{ type }}</div>
      <div class="search-value">{{ value }}</div>
    </div>
    <!-- End Search Result Main Message Container -->

    <error/>

    <!-- Public Key Component -->
    <public-key v-if="type === 'Public Key' || type === 'Address'" :detail="param"/>
    <multisig v-if="multisigActive" :info="multisigData" :cosignatories="cosignList" :relatedAccount="multisigRelatedAccount"/>
    <!-- End Public Key Component -->

    <!-- Block Info Component -->
    <block-info v-if="type === 'Block Height'" :detail="param"/>
    <!-- Block Info Component -->

    <!-- Transaction Component -->
    <transaction v-if="type === 'Transaction Hash'" :detail="param" @runOpen="openModal" @runPush="pushInfo"/>
    <!-- End Transaction Component -->

    <namespace-info v-if="type === 'Namespace'" :detail="param"/>

    <mosaic-info v-if="type === 'Mosaic ID' || type === 'Mosaic Name'" :detail="param"/>

    <div class="address-list" v-if="type === 'Public Key' || type === 'Address'">
      <div class="bititle">
        <h1 class="supertitle" :class="{ 'activeList': activeList === 'nam', 'inactiveList': activeList !== 'nam' }" @click="changeList('nam')">
          Namespaces
        </h1>
        <h1 class="supertitle" :class="{ 'activeList': activeList === 'mos', 'inactiveList': activeList !== 'mos' }" @click="changeList('mos')">
          Other Mosaics
        </h1>
      </div>
      <div v-if="mosaicLoader === true" style="padding: 10px 0px">
        <mdb-progress bgColor="cyan darken-3" indeterminate />
      </div>

      <account-namespace v-show="activeList === 'nam'" v-if="type === 'Public Key' || type === 'Address'" :namespacesList="linkNamespaces"/>

      <mosaics v-show="activeList === 'mos'" v-if="showRecentMosaic && blockMosaics !== null && blockMosaics.length > 0" :arrayTransactions="blockMosaics" :nameLabel="'Others Mosaics'" @viewMosaic ="openModal" @pushInfo="pushInfo"/>

      <div class="emptyMosNam animated fast fadeIn" v-show="activeList === 'mos'" v-if="mosaicLoader === false && blockMosaics === null">
        No mosaics yet
      </div>

      <div class="emptyMosNam animated fast fadeIn" v-show="activeList === 'nam'" v-if="linkNamespaces === undefined || linkNamespaces.length === 0">
        No namespaces yet
      </div>
    </div>


    <!-- Mosaics Component -->
    <!-- End Mosaics Component -->

    <!-- Recent Transactions Component -->
    <recent-trans v-if="showRecentTransaction && blockTransactions.length > 0 && blockTransactions.length > 0" :arrayTransactions="blockTransactions"/>
    <!-- End Recent Transactions Component -->

    <!-- Modal Component -->
    <modal :param="modalInfo" :active="modalActive" :run="closeModal" :title="modalTitle"/>
    <!-- End Modal Component -->

  </div>
  <!-- End Search Result View -->
</template>

<script>
import NodeAdmin from '@/components/home/NodeAdmin.vue'
import SearchBar from '@/components/global/SearchBar.vue'
import Error from '@/components/global/Error.vue'
import PublicKey from '@/components/searchResult/PublicKey.vue'
import AccountNamespace from '@/components/searchResult/AccountNamespace.vue'
import Multisig from '@/components/searchResult/MultisigInfo.vue'
import BlockInfo from '@/components/searchResult/BlockInfo.vue'
import Transaction from '@/components/searchResult/Transaction.vue'
import NamespaceInfo from '@/components/searchResult/NamespaceInfo.vue'
import MosaicInfo from '@/components/searchResult/MosaicInfo.vue'
import Modal from '@/components/global/Modal.vue'
import RecentTrans from '@/components/searchResult/RecentTrans.vue'
import Mosaics from '@/components/searchResult/Mosaics.vue'
import { Address, Deadline, NetworkType , Id, NamespaceId, NamespaceName, MosaicId, QueryParams } from 'tsjs-xpx-chain-sdk'
import proximaxProvider from '@/services/proximaxProviders.js'
import { mdbProgress } from 'mdbvue'
import axios from 'axios'

export default {
  name: 'SearchResult',
  components: {
    NodeAdmin,
    SearchBar,
    Error,
    PublicKey,
    Multisig,
    AccountNamespace,
    BlockInfo,
    Transaction,
    NamespaceInfo,
    MosaicInfo,
    RecentTrans,
    Mosaics,
    Modal,
    mdbProgress
  },
  data () {
    return {
      param: {},
      type: '',
      value: '',
      recent: [],
      showRecentTransaction: false,
      blockTransactions: [],
      showRecentMosaic: false,
      blockMosaics: null,
      mosaicLoader: false,
      // Public Key
      errorPublicKey: false,
      linkNamespaces: undefined,
      activeList: 'nam',

      // Multisig
      multisigActive: false,
      multisigData: undefined,
      multisigRelatedAccount: [],
      errorMultisig: false,

      // modalConfig
      modalInfo: [],
      modalActive: false,
      modalTitle: 'Info'
    }
  },
  mounted () {
    // $proxProvider and proximaxProvider is Proximax Service (Proximax Provider Service)
    // included in the main instance of vue (No need import)
    /**
     * Mounted - Lifecycle Hook of Vue
     * Search Result View
     *
     * In the search results, the mounted method, performs an analysis
     * of what type of data is being received and depending on this shows
     * the appropriate component to represent the data, in this case it
     * alternates on the components: Public Key, Block Info, and Transactions
     *
     * This component is widely connected to the Search Bar component
     */
    if (this.$route.params.type === 'publicKey' || this.$route.params.type === 'address') {
      let tmp
      if (this.$route.params.id.length === 64) {
        if (this.$store.state.netType === undefined) {
          this.emergencyNet()
        } else {
          tmp = this.$proxProvider.createPublicAccount(this.$route.params.id, this.$store.state.netType.number)
          this.getInfoAccountAndViewTransactions(tmp.address.address)
        }
      } else if (this.$route.params.id.length === 40 || this.$route.params.id.length === 46) {
        this.getInfoAccountAndViewTransactions(this.$route.params.id)
      }
    } else if (this.$route.params.type === 'blockHeight') {
      this.getBlockByHeight(this.$route.params.id)
    } else if (this.$route.params.type === 'hash') {
      this.getInfoTransaction(this.$route.params.id)
    } else if (this.$route.params.type === 'namespaceInfo') {
      if (this.isHex(this.$route.params.id) === false) {
        let tmp = this.$route.params.id
        let tmp2 = new NamespaceId(tmp)
        this.getNamespaceInfo(tmp2.id.toHex())
      } else {
        this.getNamespaceInfo(this.$route.params.id)
      }
    } else if (this.$route.params.type === 'mosaicInfo') {
      if (this.isHex(this.$route.params.id) === false) {
        let tmp = this.$route.params.id
        let tmp2 = new NamespaceId(tmp)
        this.$proxProvider.getNamespacesInfo(tmp2.id).subscribe(
          response => {
            this.getMosaicInfo(new Id(response.alias.mosaicId).toHex())
          },
          error => {
            this.$store.dispatch('updateErrorInfo', {
              active: true,
              message: 'Mosaic not found',
              submessage: 'Check the information provided and try again'
            })
          }
        )
      } else {
        this.getMosaicInfo(this.$route.params.id)
      }
    }
    this.value = this.$route.params.id
  },
  methods: {
    // For Public Key and Hash Transactions Data
    /**
     * Get Info Account And View Transactions
     *
     * This method performs the request and receipt of the information of an account,
     * and also returns your recent transactions shown in a component dedicated to it.
     *
     * @param { String } Account
     */
    getInfoAccountAndViewTransactions (account) {
      const addr = Address.createFromRawAddress(account)
      const xpx = this.$store.state.xpx
      let errorActive1 = false
      let errorActive2 = false
      this.mosaicLoader = true
      this.$proxProvider.getAccountInfo(addr).subscribe(
        resp => {
          // Assign the response to accountInfo and show the account information
          this.param = resp
          this.showComponent()
          // If your account information has tiles, look up your information and name to display them in the tile table
          if (resp.mosaics.length > 0) {
            let filteredTrans = resp.mosaics.filter(el => el.id.toHex() !== xpx)
            let tmpArr = []

            if (filteredTrans.length === 0) {
              this.mosaicLoader = false
            }


            filteredTrans.forEach((el, index) => {
              this.$proxProvider.getMosaic(el.id).subscribe(
                mosaicResponse => {
                  let amountCompact = el.amount.compact()
                  let mosHeight = mosaicResponse.height.compact()
                  let mosDurat = (mosaicResponse.duration === undefined) ? 0 : mosaicResponse.duration.compact()
                  this.$proxProvider.getMosaicsName([mosaicResponse.mosaicId]).subscribe(
                    responseName => {
                      let tmpObj = {
                        name: (responseName[0].names.length > 0) ? responseName[0].names[0].name : '',
                        id: el.id.toHex(),
                        owner: (resp.publicKey === mosaicResponse.owner.publicKey) ? 'true' : 'false',
                        quantity: (mosaicResponse.divisibility === 0) ? amountCompact : this.$utils.fmtDivisibility(el.amount.compact(), mosaicResponse.divisibility),
                        expired: (this.$store.state.currentBlock.height >= (mosHeight + mosDurat)) ? false : true
                      }
                      tmpArr.push(tmpObj)
                      if (index + 1 === filteredTrans.length) {
                        this.blockMosaics = tmpArr
                        this.showRecentMosaic = !this.showRecentMosaic
                        this.mosaicLoader = false
                      }
                    },
                    error => {
                      console.warn(error)
                      this.blockMosaics = null
                      this.showRecentMosaic = !this.showRecentMosaic
                      this.mosaicLoader = false
                    }
                  )
                }, err => {
                  console.warn(err)
                }
              )
            })

            // this.blockMosaics = filteredTrans
            // this.showRecentMosaic = !this.showRecentMosaic
          } else {
            this.mosaicLoader = false
          }

          this.viewTransactionsFromPublicAccount(resp.publicAccount)
        },
        error => {
          this.errorPublicKey = true
        }
      )

      axios.get(`${this.$store.state.currentNode}/account/${addr.address}/namespaces`)
        .then(response => {
          let tmpArr = []
          let revisionArray = []
          if (response.data.length !== 0) {
            response.data.forEach(el => {
              let tmpObj = {
                status: (el.meta.active) ? 'Active' : 'Inactive'
              }

              let requestArr = []
              let currentLevel = 0
              if (el.namespace.level2 !== undefined) {
                currentLevel = 2
                requestArr.push(new Id(el.namespace.level2))
                requestArr.push(new Id(el.namespace.level1))
                requestArr.push(new Id(el.namespace.level0))
                tmpObj.id = new Id(el.namespace.level2).toHex()
              } else if (el.namespace.level1 !== undefined) {
                currentLevel = 1
                requestArr.push(new Id(el.namespace.level1))
                requestArr.push(new Id(el.namespace.level0))
                tmpObj.id = new Id(el.namespace.level1).toHex()
              } else if (el.namespace.level0 !== undefined) {
                currentLevel = 0
                requestArr.push(new Id(el.namespace.level0))
                tmpObj.id = new Id(el.namespace.level0).toHex()
              }


              this.$proxProvider.getNamespacesName(requestArr).subscribe(
                responseName => {
                  let verifyLength = (arr) => {
                    let arrResult
                    let biggerNumber = 0
                    let index = undefined

                    arrResult = arr.map(el => el.length)

                    arrResult.forEach(el => {
                      if (el > biggerNumber) {
                        biggerNumber = el
                      }
                    })

                    return arr[arrResult.indexOf(biggerNumber)]
                  }

                  if (currentLevel === 0) {
                    tmpObj.name = responseName[0].name
                  } else if (currentLevel === 1) {
                    tmpObj.name = verifyLength([responseName[0].name, responseName[1].name])
                  } else if (currentLevel === 2) {
                    tmpObj.name = verifyLength([responseName[0].name, responseName[1].name, responseName[2].name])
                  }

                  tmpArr.push(tmpObj)
                }
              )
            })
            this.linkNamespaces = tmpArr
          } else {
            this.linkNamespaces = []
          }
        })
        .catch(err => {
          this.linkNamespaces = []
        })

      axios.get(`${this.$store.state.currentNode}/account/${addr.address}/multisig`)
        .then(response => {
          let objTmp = {
            account: response.data.multisig.account,
            accountAddress: response.data.multisig.accountAddress,
            minApproval: response.data.multisig.minApproval,
            minRemoval: response.data.multisig.minRemoval
          }


          this.cosignList = Array.from(response.data.multisig.cosignatories)
          this.multisigRelatedAccount = Array.from(response.data.multisig.multisigAccounts),
          this.multisigConsignatories = Array.from(response.data.multisig.cosignatories)
          this.multisigData = objTmp
          this.multisigActive = true

          if (this.type === '') {
            this.type = 'Multisig Account'
          }
        })
        .catch(error => {
          this.errorMultisig = true
        })
    },

    /**
     * Get Block By Height
     *
     * This method performs the request and receipt of the information of an block,
     * and also returns your recent transactions shown in a component dedicated to it.
     *
     * @param { String } block
     */
    getBlockByHeight (block) {
      this.$proxProvider.blockHttp.getBlockByHeight(parseInt(block)).subscribe(
        next => {
        next.date = this.$utils.fmtTime(new Date(next.timestamp.compact() + Deadline.timestampNemesisBlock * 1000))
        next.difficulty = (next.difficulty.compact()/Math.pow(10, 14)*100).toFixed(2) + "%"
        next.totalFee = this.$utils.fmtAmountValue(next.totalFee.compact())
        this.param = {
          height: block,
          timestamp: next.date,
          publicKey: next.signer.publicKey,
          hash: next.hash,
          difficulty: next.difficulty,
          txes: next.numTransactions,
          fee: next.totalFee
        }
        this.showRecentTransaction = (this.param.txes > 0) ? true : false
        this.showComponent()
        this.showInfo = true

        let transactions = 100
        if (next.numTransactions < 100 && next.numTransactions > 75) {
          transactions = 75
        } else if (next.numTransactions < 75 && next.numTransactions > 50) {
          transactions = 50
        } else if (next.numTransactions < 50 && next.numTransactions > 25) {
          transactions = 25
        } else if (next.numTransactions < 25 && next.numTransactions > 10) {
          transactions = 10
        }

        this.$proxProvider.blockHttp.getBlockTransactions(parseInt(block), new QueryParams(transactions)).subscribe(
          blockTransactions => {
            this.blockTransactions = blockTransactions
            for (const index in this.blockTransactions) {
              this.blockTransactions[index].fee = this.$utils.fmtAmountValue(this.blockTransactions[index].maxFee.compact())
              this.blockTransactions[index].deadline = this.$utils.fmtTime(new Date(this.blockTransactions[index].deadline.value.toString()))
            }
            this.showRecentTransaction = true
            this.noShowTransactions = (this.blockTransactions.length > 0) ? false : true
          },
          error => {
            this.noShowTransactions = true
          }
        )
      },
      error => {
        this.$store.dispatch('updateErrorInfo', {
          active: true,
          message: 'Block Height not found',
          submessage: 'Check the information provided and try again'
        })
      })
    },

    /**
     * Get Info Transaction
     *
     * This method performs the request and receipt of information about a transaction
     *
     * @param { String } hast
     */
    getInfoTransaction: function (hast) {
      this.$proxProvider.getTransactionInformation(hast).subscribe(
        resp => {
          this.param = resp
          this.showComponent()
        },
        error => {
          this.$store.dispatch('updateErrorInfo', {
            active: true,
            message: 'Transaction not found',
            submessage: 'Check the information provided and try again'
          })
        }
      )
    },

    getNamespaceInfo (namespaceHex) {
      let namespaceId = Id.fromHex(namespaceHex)
      this.$proxProvider.getNamespacesInfo(namespaceId).subscribe(
        response => {
          this.$proxProvider.getNamespacesName([namespaceId]).subscribe(
            nameResponse => {
              this.param = response
              nameResponse = nameResponse.reverse()
              if (nameResponse.length > 1) {
                this.param.name = `${nameResponse[0].name}.${nameResponse[1].name}`
              } else {
                this.param.name = nameResponse[0].name
              }
              this.showComponent()
            }
          )
        },
        error => {
          this.$store.dispatch('updateErrorInfo', {
            active: true,
            message: 'Namespace not found',
            submessage: 'Check the information provided and try again'
          })
        }
      )
    },

    getMosaicInfo (mosaicHex) {
      let mosaicId = Id.fromHex(mosaicHex)
      this.$proxProvider.getMosaic(mosaicId).subscribe(
        response => {
          this.$proxProvider.getMosaicsName([mosaicId]).subscribe(
            nameResponse => {
              this.param = response
              this.param.name = (nameResponse[0].names && nameResponse[0].names.length !== 0) ? nameResponse[0].names[0].name : undefined
              this.showComponent()
            }
          )
        },
        error => {
          this.$store.dispatch('updateErrorInfo', {
            active: true,
            message: 'Mosaic not found',
            submessage: 'Check the information provided and try again'
          })
        }
      )
    },

    showComponent () {
      if (this.$route.params.type === 'publicKey') {
        this.type = 'Public Key'
      } else if (this.$route.params.type === 'blockHeight') {
        this.type = 'Block Height'
      } else if (this.$route.params.type === 'hash') {
        this.type = 'Transaction Hash'
      } else if (this.$route.params.type === 'address') {
        this.type = 'Address'
      } else if (this.$route.params.type === 'namespaceInfo') {
        this.type = 'Namespace'
      } else if (this.$route.params.type === 'mosaicInfo') {
        this.type = (isNaN(parseInt(this.$route.params.id, 16))) ? 'Mosaic Name' : 'Mosaic ID'
        // this.type = 'Mosaic ID'
      }
      this.value = this.$route.params.id
    },

    /**
     * View Transactions From Public Account
     * Search all transactions from the public account
     *
     * @param { any } publicAccount
     */
    viewTransactionsFromPublicAccount(publicAccount) {
      this.$proxProvider.getAllTransactionsFromAccount(publicAccount, 100).subscribe(
        transactions => {
          if (transactions.length > 0) {
            transactions.forEach(element => {
              element.fee = this.$utils.fmtAmountValue(element.maxFee.compact())
              element.deadline = this.$utils.fmtTime(new Date(element.deadline.value.toString()))
              this.blockTransactions.push(element)
            })
            this.showRecentTransaction = true
          }
        },
        error => {
          console.error('ACCOUNT ERROR....', error)
        }
      )
    },

    /**
     * Open Modal
     *
     * Se inicia el componente modal, de modo que aparece en la pantalla
     * y al mismo tiempo se configura el título.
     */
    openModal (title) {
      this.modalTitle = title
      this.modalActive = true
    },

    /**
     * Push Info
     *
     * This function performs the configuration of the information
     * that you want to show in the modal
     */
    pushInfo (info) {
      this.modalInfo = info
    },

    /**
     * Close Modal
     *
     * This method works in reverse of 'openModal' method,
     * but emptying the information, preparing the modal for a next use
     */
    closeModal () {
      this.modalActive = false
      this.modalInfo = []
    },

    showError () {
      this.$store.dispatch('updateErrorInfo', {
        active: true,
        message: 'Address or public key not found',
        submessage: 'Check the information provided and try again'
      })
    },

    changeList (list) {
      this.activeList = list
    },

    async emergencyNet () {
      let response = await axios.get('./config/config.json')
      let tmp = this.$proxProvider.createPublicAccount(this.$route.params.id, response.data.NetworkType.number)
      this.getInfoAccountAndViewTransactions(tmp.address.address)
    },

    isHex (value) {
      let regex =  /^[0-9A-Fa-f]+$/
      return regex.test(value)
    }
  },
  watch: {
    errorMultisig (n, o) {
      if (this.errorMultisig && this.errorPublicKey) {
        this.showError()
      }
    },

    errorPublicKey (n, o) {
      if (this.errorMultisig && this.errorPublicKey) {
        this.showError()
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.address-list

.activeList
  background: #2BA1B9
  color: white !important

.inactiveList
  background: #f4f4f4
  color: black
  cursor: pointer
  &:hover
    background: silver
    color: white

.bititle
  width: 100%
  display: flex
  flex-flow: row
  padding: 0px 10px
  justify-content: center

.supertitle
  display: flex
  flex-flow: row nowrap
  justify-content: center
  color: #2BA1B9
  margin: 0px
  font-size: 17px
  padding: 5px 20px
  border-radius: 20px
  &:first-child
    border-radius: 20px 0px 0px 20px
  &:last-child
    border-radius: 0px 20px 20px 0px

.search-cont
  text-align: center
  padding: 15px 0px
  border-bottom: 1px solid silver

.search-type
  color: #2BA1B9
  font-weight: bold
  font-size: 25px

.search-value
  padding: 0px 10px 5px
  color: black
  font-size: 20px
  text-transform: uppercase
  font-weight: bold
  word-wrap: break-word

.emptyMosNam
  width: 100%
  color: grey
  padding: 5px
  text-align: center
  background: #f4f4f4
  margin: 10px 0px

@media screen and (max-width: 550px)
  .search-type
    font-size: 20px

  .search-value
    font-size: 15px
</style>
