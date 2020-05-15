<template lang="html">
    <div>
        <h1 id="title">FaveSound</h1>

        <div class="leftDiv">
          <input v-model="searchQuery" type="text" name="text" class="searchArea" placeholder="Search for songs, artist, albums..." v-on:keyup.enter='search'>
          <button v-on:click='search' name="submit" class="submit">Search</button>

          <div v-for='sTrack in searchedTracks' :key='sTrack' class="trackinfo" v-bind:id='`${sTrack.id}`'>
            <span>Artist: </span><span v-for='(sArtist, sIndex) in sTrack.artists' :key='sArtist'>{{sArtist.name}}<span v-if="sIndex+1 < sTrack.artists.length">, </span></span><br><br>
            <span>Track: {{sTrack.name}}</span><br><br>
            <span>Album: {{sTrack.album.name}}</span><br>
          </div>
        </div>

        <div class="rightDiv">
          <h2 class="favourites">Favourites</h2>
          <div v-for='track in tracks' :key='track' class="trackinfo" v-bind:id='`${track.id}`'>
            <span>Artist: </span><span v-for='(artist, index) in track.artists' :key='artist'>{{artist.name}}<span v-if="index+1 < track.artists.length">, </span></span><br><br>
            <span>Track: {{track.name}}</span><br><br>
            <span>Album: {{track.album.name}}</span><br>
          </div>
        </div>
    </div>
</template>

<script>
import searchAPI from '@/services/searchAPI.js'
export default {
  name: 'search',
  beforeCreate: function () {
    document.body.className = 'search'
  },
  data () {
    return {
      tracks: [],
      searchQuery: '',
      searchedTracks: []
    }
  },
  mounted () {
    this.loadTest()
  },
  methods: {
    async loadTest () {
      const favelist = await searchAPI.getFavelist()
      let trackInfo = await searchAPI.getTracks(favelist)
      this.tracks = trackInfo.data
    },
    async search () {
      const searchedTracks = await searchAPI.searchTracks(this.searchQuery)
      this.searchedTracks = searchedTracks.data
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
  width: 35.3vw;
}

.submit {
  font-family: ethnocentricregular;
  text-align: center;
  width: 9vw;
}

.searchForm {
  /* margin: 0 auto; */
  /* text-align: center; */
  width: auto;
}

.leftDiv {
  width: 45.1vw;
  float: left;
}

.rightDiv {
  float: right;
  margin-right: 16px;
}

.trackinfo {
  background-color: blue;
  width: 45vw;
  font-family: ethnocentricregular;
  font-size: 0.8em;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;

}

h3.trackinfo {
  font-size: 0.8em;
}

.favourites {
  font-family: ethnocentricregular;
  margin-top: -5px;
  margin-bottom: -2px;
  text-align: center;
}

</style>
