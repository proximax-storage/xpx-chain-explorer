<template>
  <div class="paginator">
    test
  </div>
</template>

<script>
export default {
  name: 'Paginator',
  props: {
    limit: {
      type: Number,
      default: 10
    },
    arrayLength: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      testArr: [],
      counter: 0
    }
  },
  computed: {

  }
}
</script>

<style lang="sass" scoped></style>
