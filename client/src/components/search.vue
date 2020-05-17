<template lang="html">
    <div>
        <h1 id="title">FaveSound</h1>

        <!--<div class="leftDiv">
          <input v-model="searchQuery" type="text" name="text" class="searchArea" placeholder="Search for songs, artist, albums..." v-on:keyup.enter='search'>
          <button v-on:click='search' name="submit" class="submit">Search</button>

          <div v-for='sTrack in searchedTracks' :key='sTrack.id' class="trackinfo" :id='`${sTrack.id}`'>
            <span>Artist: </span>
            <span v-for='(sArtist, sIndex) in sTrack.artists' :key='sIndex'>{{sArtist.name}}
              <span v-if="sIndex+1 < sTrack.artists.length">, </span>
            </span>
            <b-icon icon='star' class='iconfix' v-on:click='addFavourite'></b-icon>
            <br><br>
            <span>Track: {{sTrack.name}}</span><br><br>
            <span>Album: {{sTrack.album.name}}</span><br>
          </div>
        </div>

        <div class="rightDiv">
          <h2 class="favourites">Favourites</h2>
          <div v-if='faveListPresent'>
            <div v-for='track in tracks' :key='track.id' class="trackinfo" :id='track.id'>
              <span>Artist: </span>
              <span v-for='(artist, index) in track.artists' :key='index'>{{artist.name}}
                <span v-if="index+1 < track.artists.length">, </span>
              </span>
              <b-icon icon='star-fill' class='iconfix' v-on:click='removeFavourite'></b-icon>
              <br><br>
              <span>Track: {{track.name}}</span><br><br>
              <span>Album: {{track.album.name}}</span><br>
            </div>
          </div>
        </div> -->

        <div class="leftDiv">
          <input v-model="searchQuery" type="text" name="text" class="searchArea" placeholder="Search for songs, artist, albums..." v-on:keyup.enter='search'>
          <button v-on:click='search' name="submit" class="submit">Search</button>
          <track-box :tracks='searchedTracks' :print='searched' :functionOnClick='addFavourite' :side='`left`'></track-box>
        </div>
        <div class ="rightDiv">
          <h2 class="favourites">Favourites</h2>
          <track-box :tracks='tracks' :print='faveListPresent' :functionOnClick='removeFavourite' :side='`right`'></track-box>
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
      searchedTracks: [],
      faveListPresent: Boolean,
      searched: Boolean
    }
  },
  mounted () {
    this.loadFavourites()
  },
  methods: {
    async loadFavourites () {
      const favelist = await searchAPI.getFavelist(this.$cookies.get('user').userid)
      // Check if current user has a present favelist or not
      if (favelist.status === 204) {
        // Set false since we dont want to display and make an unneccecary request to the server
        this.faveListPresent = false
      } else {
        this.faveListPresent = true
        let trackInfo = await searchAPI.getTracks(favelist)
        this.tracks = trackInfo.data
      }
    },
    async search () {
      const searchedTracks = await searchAPI.searchTracks(this.searchQuery)
      this.searched = true
      this.searchedTracks = searchedTracks.data
    },
    async removeFavourite () {
      console.log('remove')
    },
    async addFavourite () {
      console.log('add')
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
  cursor: pointer;
}

.searchForm {
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

.favourites {
  font-family: ethnocentricregular;
  margin-top: -5px;
  margin-bottom: -2px;
  text-align: center;
}

</style>
