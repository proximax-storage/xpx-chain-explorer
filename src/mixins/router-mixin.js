export default {
  methods: {
    $addElemToHistory (route) {
      const history = JSON.parse(localStorage.getItem('history'))
      if (history[0] !== route) {
        if (history.length === 25) {
          history.unshift(route)
          history.pop()
        } else {
          history.unshift(route)
        }
      }

      localStorage.setItem('history', JSON.stringify(history))
    },

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
        this.$router.push('/')
        setTimeout(() => {
          this.$router.push(route)
          this.$addElemToHistory(route)
        }, 25)
      }
    },

    $goToPublicKey (publickey) {
      this.$router.push(`/publicKey/${publickey}`)
      this.$addElemToHistory(`/publicKey/${publickey}`)
    },

    $goToBlock (block) {
      this.$router.push(`/block/${block}`)
      this.$addElemToHistory(`/block/${block}`)
    }
  }
}
