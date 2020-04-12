export default {
  methods: {
    $goToHome () {
      this.$router.push('/')
    },

    $goToNodes () {
      this.$router.push('/nodes')
    },

    $goToHistory () {
      this.$router.push('/history')
    },

    $goToCustomRoute (route) {
      if (typeof route === 'string') {
        this.$router.push(route)
      }
    },

    $goToPublicKey (publickey) {
      this.$router.push(`/publicKey/${publickey}`)
    },

    $goToBlock (block) {
      this.$router.push(`/block/${block}`)
    }
  }
}
