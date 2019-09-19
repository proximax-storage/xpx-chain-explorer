<template>
  <div class="namespacesList">
    <div class="guide" style="background: black">
      <div>
        <div class="title">Name</div>
      </div>

      <div>
        <div class="title">Namespace Id</div>
      </div>

      <div>
        <div class="title">Owner Address</div>
      </div>

      <div>
        <div class="title">Active</div>
      </div>
    </div>

    <dir class="empty" v-show="namespacesArr.length === 0">
      <div>
        Loading namespaces please wait a few moments
      </div>

      <div>
        <mdb-progress bgColor="cyan darken-3" style="width: 100%" indeterminate/>
      </div>
    </dir>

    <div class="list" v-show="namespacesArr.length > 0">
      <div class="element animated fadeIn" v-for="(item, index) in namespacesArr" :key="index">
        <div>
          <div class="title">Name</div>
          <div class="valueLower link" @click="goToNamespace(item.name)">{{ item.name }}</div>
        </div>

        <div>
          <div class="title">Namespace Id</div>
          <div class="value link" @click="goToNamespace(item.id.toHex())">{{ item.id.toHex() }}</div>
        </div>

        <div>
          <div class="title">Owner Address</div>
          <div class="value link" @click="goToAddress(item.owner.address.pretty())">{{ item.owner.address.pretty() }}</div>
        </div>

        <div>
          <div class="title">Active</div>
          <div class="value" :style="(item.active === true) ? 'color: green' : 'color: red'">{{ item.active }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Address, QueryParams } from 'tsjs-xpx-chain-sdk'
import { mdbProgress } from 'mdbvue'

export default {
  name: 'NamespacesList',
  components: {
    mdbProgress
  },
  data () {
    return {
      resp: undefined,
      namespacesArr: [],
      idList: []
    }
  },
  mounted () {
    this.checkNode()
  },
  methods: {
    checkNode () {
      if (this.$store.state.currentNode !== undefined || this.$store.state.currentNode !== '' ) {
        this.searchList()
        console.log('Check List')
      } else {
        this.checkNode()
        console.log('Check Node')
      }
    },

    searchList () {
      let account = this.$proxProvider.createPublicAccount(this.$store.state.rentalFeeInfo.namespaceRentalFee.publicKey, this.$store.state.netType.number)
      let net = this.$store.state.netType.number

      this.$proxProvider.getAllTransactionsFromAccount(account, new QueryParams(100)).subscribe(
        transactions => {
          if (transactions.length > 0) {
            this.resp = transactions

            this.resp.forEach(el => {
              this.$proxProvider.getNamespacesInfo(el.namespaceId).subscribe(
                response => {
                  this.$proxProvider.getNamespacesName([el.namespaceId]).subscribe(
                    responseName => {
                      let name = ''

                      if (responseName.length === 3) {
                        name = `${responseName[2].name}.${responseName[1].name}.${responseName[0].name}`
                      } else if (responseName.length === 2) {
                        name = `${responseName[1].name}.${responseName[0].name}`
                      } else if (responseName.length === 1) {
                        name = `${responseName[0].name}`
                      }
                      response.name = name

                      if (this.idList.includes(el.namespaceId.toHex()) !== true) {
                        this.namespacesArr.push(response)
                      }
                      this.idList.push(el.namespaceId.toHex())
                    }
                  )
                },
                err => {
                  console.warn('Namespace not found')
                }
              )
            })
          }
        },
        error => {
          console.error('ACCOUNT ERROR....', error)
        }
      )
    },

    goToAddress (address) {
      let routeData = (address.length === 64) ?
      this.$router.resolve({ path: `/result/publicKey/${ address }` }) :
      this.$router.resolve({ path: `/result/address/${ address }` })
      window.open(routeData.href, '_blank')
    },

    goToBlock (height) {
      let routeData = this.$router.resolve({ path: `/result/blockHeight/${height}` })
      window.open(routeData.href, '_blank')
    },

    goToHash (hash) {
      let routeData = this.$router.resolve({ path: `/result/hash/${hash}` })
      window.open(routeData.href, '_blank')
    },

    goToNamespace (namespaceId) {
      let routeData = this.$router.resolve({ path: `/result/namespaceInfo/${namespaceId}` })
      window.open(routeData.href, '_blank')
    },

    goToMosaic (mosaicId) {
      let routeData = this.$router.resolve({ path: `/result/mosaicInfo/${mosaicId}` })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style lang="sass" scoped>
.namespacesList
  padding: 10px

.guide
  display: block
  margin: 0px 0px 5px 0px
  border-radius: 5px
  display: flex
  flex-flow: row
  padding: 5px
  & > div
    flex-grow: 1
    text-align: center
    color: white !important
    & > .title
      display: block
      color: white
  & > div:first-child
    width: 200px
  & > div:nth-child(2n)
    width: 150px
  & > div:nth-child(3n)
    width: 360px
  & > div:last-child
    width: 100px

.empty
  width: 100%
  text-align: center
  background: #f4f4f4
  border-radius: 5px
  margin: 0px 0px 5px 0px
  & > div:first-child
    padding: 10px 5px
    color: orange
    font-weight: bold


.list
  background: transparent

.element
  display: flex
  flex-flow: row
  padding: 10px 5px
  margin: 0px 0px 5px 0px
  border-radius: 5px
  border: 1px solid #f4f4f4
  &:nth-child(odd)
    background: #f4f4f4
  &:nth-child(even)
    background: white
  & > div
    flex-grow: 1
    text-align: center
  & > div:first-child
    width: 200px
  & > div:nth-child(2n)
    width: 150px
  & > div:nth-child(3n)
    width: 360px
  & > div:last-child
    width: 100px

.title
  display: none
  font-size: 10px
  font-weight: bold
  text-transform: uppercase
  color: grey

.value
  font-size: 13px
  font-weight: normal
  text-transform: uppercase
  word-break: break-all
  color: black

.valueLower
  font-size: 13px
  font-weight: normal
  word-break: break-all
  color: black

.link:hover
  color: #2BA1B9
  text-decoration: underline
  cursor: pointer

@media screen and (max-width: 700px)
  .guide
    display: none

  .element
    flex-flow: column
    border-radius: 20px
    & > div
      width: 100% !important
      padding: 5px
      border-bottom: 1px solid silver
    & > div:last-child
      border-bottom: 0px solid silver

  .title
    display: block

  .link
    color: #2BA1B9
    text-decoration: underline
    cursor: pointer
</style>
