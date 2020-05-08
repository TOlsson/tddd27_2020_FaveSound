<template lang="html">
    <div>
        <!--<ul>
            <li v-for='test in test1' :key='test'>
                <span>{{test}}</span>
            </li>
        </ul> -->

        <h1 class="favesound">FaveSound</h1>

        <form action="/#/serach" method="GET">
            <input type="text" name="text" class="search" placeholder="Search for songs, artist, albums...">
            <input type="submit" name="submit" class="submit" value="Search">
        </form>
    </div>
</template>

<script>
import testAPI from '@/services/testAPI.js'
export default {
  name: 'search',
  beforeCreate: function () {
    document.body.className = 'search'
  },
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
@import url('../assets/fonts/stylesheet.css');

h1 {
  font-family: ethnocentricregular;
}

.favesound {
  text-align: center;
}

.search {
  font-family: ethnocentricregular;
  width: 55%;
  text-align: center;
}

.submit {
  font-family: ethnocentricregular;
  text-align: center;
}

</style>
