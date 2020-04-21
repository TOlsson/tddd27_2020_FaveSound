<template lang="html">
    <div>
        <ul>
            <li v-for='test in test1' :key='test'>
                <span>{{test}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import testAPI from '@/services/testAPI.js'
export default {
  name: 'test',
  data () {
    return {
      test1: []
    }
  },
  mounted () {
    this.loadTest()
  },
  methods: {
    async loadTest () {
      const res = await testAPI.getTest()
      this.test1 = res.data
    }
  }
}
</script>

<style lang="css">
</style>
