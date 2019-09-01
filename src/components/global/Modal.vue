<template>
  <div class="modal animated faster fadeIn" v-if="active">
    <div class="modal-back" @click="run"></div>
    <div class="cont">
      <h1 class="supertitle">{{ title || 'Info' }}</h1>

      <!-- Abstract Info -->
      <div class="basicInfo">
        <div>
          <div class="element">
            <div class="title">Sender Address</div>
            <div class="value" :class="param.senderAddress.class" @click="param.senderAddress.run(param.senderAddress.value)">
              {{ param.senderAddress.value }}
            </div>
          </div>

          <div class="element">
            <div class="title">DeadLine</div>
            <div class="value" :class="param.deadline.class">
              {{ param.deadline.value }}
            </div>
          </div>
        </div>

        <div>
          <div class="element">
            <div class="title">Sender PublicKey</div>
            <div class="value" :class="param.senderPublicKey.class" @click="param.senderPublicKey.run(param.senderPublicKey.value)">
              {{ param.senderPublicKey.value }}
            </div>
          </div>

          <div class="element">
            <div class="title">Height</div>
            <div class="value" :class="param.height.class" @click="param.height.run(param.height.value)">
              {{ param.height.value }}
            </div>
          </div>
        </div>

        <div>
          <div class="element">
            <div class="title centerAlign">Signature</div>
            <div class="value centerAlign" :class="param.signature.class">
              {{ param.signature.value }}
            </div>
          </div>
        </div>

        <div>
          <div class="element">
            <div class="title">Aggregate Id</div>
            <div class="value" :class="param.aggregateId.class">
              {{ param.aggregateId.value }}
            </div>
          </div>

          <div class="element">
            <div class="title">Fee</div>
            <div class="value" :class="param.signature.class" v-html="param.fee.valueHtml"></div>
          </div>

          <div class="element">
            <div class="title">Type</div>
            <div class="value" :class="param.type.class">
              {{ param.type.value }}
            </div>
          </div>
        </div>

        <div v-if="param.recipient !== undefined">
          <div class="element">
            <div class="title centerAlign">Recipient</div>
            <div class="value centerAlign" :class="param.recipient.class">
              {{ param.recipient.value }}
            </div>
          </div>
        </div>
      </div>
      <!-- End Abstract Info -->

      <!-- Details -->
      <div class="specificDetails" v-if="param.details.length !== 0">
        <h1 class="supertitle">Details</h1>
        <div class="element" v-for="(item, index) in param.details" :key="index">
          <div class="title centerAlign">{{ item.key }}</div>
          <div class="value centerAlign" :class="param.type.class">
            {{ item.value }}
          </div>
        </div>
      </div>
      <!-- End Details -->

      <!-- Modifications -->
      <div class="specificDetails" v-if="param.modifications !== undefined && param.modifications.length > 0">
        <h1 class="supertitle" v-if="param.modifications !== undefined && param.modifications.length > 0">Modifications</h1>
        <div class="element-mod" v-for="(item, index) in param.modifications" :key="index">
          <div>
            <div class="title centerAlign">Cosigner Address</div>
            <div class="value centerAlign">
              {{ item.address }}
            </div>
          </div>

          <div>
            <div class="title centerAlign">Cosigner Public Key</div>
            <div class="value centerAlign">
              {{ item.publicKey }}
            </div>
          </div>

          <div>
            <div class="title centerAlign">Type</div>
            <div class="value centerAlign">
              {{ item.type }}
            </div>
          </div>
        </div>
      </div>
      <!-- End Modifications -->

      <!-- Loader -->
      <div class="loader">
        <button class="red button" @click="run"><mdb-icon icon="times"/> Close</button>
      </div>
      <!-- End Loader -->

    </div>
  </div>
</template>

<script>
import {
  mdbSpinner,
  mdbBtn,
  mdbIcon
} from 'mdbvue'

export default {
  name: 'Modal',

  components: {
    mdbSpinner,
    mdbBtn,
    mdbIcon
  },

  props: [
    'active',
    'run',
    'title',
    'param'
  ],

  mounted () {
  },

  methods: {
    goToAddress (address) {
      let routeData = this.$router.resolve({ path: `/result/address/${address}` })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style lang="sass" scoped>
.supertitle
  margin: 0px
  font-size: 17px
  font-weigth: bold
  color: #2BA1B9
  border-radius: 5px
  padding: 0px 0px 10px 0px
  margin: 0px
  text-align: center

.loader
  text-align: center
  padding: 10px 0px 5px 0px

.element
  padding: 10px
  background: #f4f4f4
  border-radius: 20px
  margin: 0px 0px 5px 0px

.element-mod
  padding: 10px
  background: #f4f4f4
  border-radius: 20px
  margin: 0px 0px 5px 0px
  display: flex
  & > div
    flex-grow: 1
    &:nth-child(1)
      width: 300px
    &:nth-child(2)
      width: 380px
    &:nth-child(3)
      width: 50px

.title
  font-size: 10px
  font-weight: bold
  text-transform: uppercase
  margin: 0px
  color: grey

.link:hover
  color: #2BA1B9
  text-decoration: underline
  cursor: pointer

.true
  color: #008c00

.false
  color: red

.value
  font-size: 13px
  font-weight: normal
  text-transform: uppercase
  word-break: break-all

.button
  border: 0px
  border-radius: 5px
  padding: 5px 15px
  color: white
  margin: 0px

.centerAlign
  text-align: center

.modal
  display: flex
  flex-flow: row nowrap
  justify-content: center
  align-items: center
  position: fixed
  z-index: 5000
  width: 100%
  height: 100%
  & > .modal-back
    width: 100%
    height: 100%
    background: #c0c0c0b5
  & > .cont
    position: absolute
    z-index: 6000
    border: 1px solid white
    color: black
    width: 95%
    max-height: 95%
    padding: 10px
    border-radius: 5px
    background: white
    overflow-y: auto
    box-shadow: 0px 5px 5px #656565
    &::-webkit-scrollbar
      background: transparent
      width: 5px
    &::-webkit-scrollbar-thumb
      background: #2BA1B9
      border-radius: 10px

.basicInfo
  display: block
  & > div:nth-child(1)
    width: 100%
    display: flex
    & > .element
      flex-grow: 1
      &:first-child
        margin-right: 5px
      &:nth-child
        margin-right: 5px
  & > div:nth-child(2)
    width: 100%
    display: flex
    & > .element
      flex-grow: 1
      &:first-child
        margin-right: 5px
  & > div:nth-child(3)
    width: 100%
  & > div:nth-child(4)
    width: 100%
    display: flex
    & > .element
      flex-grow: 1
      &:first-child
        margin-right: 5px
      &:nth-child(2)
        margin-right: 5px

@media screen and (max-width: 700px)
  .element
    padding: 5px

  .modal > .cont
    max-width: inherit
    width: 95%

  .link
    color: #2BA1B9
    text-decoration: underline
    cursor: pointer

  .basicInfo
    & > div:nth-child(1)
      width: 100%
      display: block
      & > .element
        padding: 10px
        flex-grow: 1
    & > div:nth-child(2)
      width: 100%
      display: block
      & > .element
        padding: 10px
        flex-grow: 1
    & > div:nth-child(3)
      width: 100%
    & > div:nth-child(4)
      width: 100%
      display: block
      & > .element
        padding: 10px
        flex-grow: 1
</style>
