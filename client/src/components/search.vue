<template lang="html">
    <div>
        <!--<ul>
            <li v-for='test in test1' :key='test'>
                <span>{{test}}</span>
            </li>
        </ul> -->

        <h1 id="title">FaveSound</h1>

        <form action="/#/search" method="GET" class="searchForm">
            <input type="text" name="text" class="searchArea" placeholder="Search for songs, artist, albums...">
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

#title {
  font-family: ethnocentricregular;
  text-align: center;
  margin-top: 15vh;
  font-size: 4vw;
}

.searchArea {
  font-family: ethnocentricregular;
  width: 55%;
}

.submit {
  font-family: ethnocentricregular;
  text-align: center;
}

.searchForm {
  margin: 0 auto;
  text-align: center;
}

</style>
