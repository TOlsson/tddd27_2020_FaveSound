<template lang="html">
    <div>
        <h1 id="title">FaveSound</h1>
        <div class="leftDiv">
          <div class="searchArea">
            <input v-model="searchQuery" type="text" name="text" autocomplete="off" class="searchField" placeholder="Search for songs, artist, albums..." v-on:keyup.enter='search'>
            <select v-model="limit" id='limit' name='limit'>
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
              <option value='20'>20</option>
            </select>
            <button v-on:click='search' name="submit" class="submit">Search</button>
          </div>
          <div class='scroll-box'>
            <track-box :tracks='searchedTracks' :print='searched' :functionOnClick='addFavourite' :side='`left`'></track-box>
          </div>
        </div>
        <div class ="rightDiv">
          <h2 class="favourites">Favourites</h2>
          <div class='scroll-box'>
            <track-box :tracks='tracks' :print='faveListPresent' :functionOnClick='removeFavourite' :side='`right`'></track-box>
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
      searchedTracks: [],
      faveListPresent: Boolean,
      searched: Boolean,
      limit: 5
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
      const searchedTracks = await searchAPI.searchTracks(this.searchQuery, this.limit)
      this.searched = true
      this.searchedTracks = searchedTracks.data
    },
    async removeFavourite (event) {
      // console.log(event.currentTarget.parentElement.id)
      const newFavelist = await searchAPI.removeFavourite(this.$cookies.get('user').userid, event.currentTarget.parentElement.id)
      if (newFavelist.status === 204) {
        // Set false since we dont want to display and make an unneccecary request to the server
        this.faveListPresent = false
      } else {
        this.faveListPresent = true
        let trackInfo = await searchAPI.getTracks(newFavelist)
        this.tracks = trackInfo.data
      }
      this.loadFavourites()
    },
    async addFavourite (event) {
      console.log(event.currentTarget)
      const newFavelist = await searchAPI.addFavourite(this.$cookies.get('user').userid, event.currentTarget.parentElement.id)
      this.faveListPresent = true
      let trackInfo = await searchAPI.getTracks(newFavelist)
      this.tracks = trackInfo.data
      this.loadFavourites()
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
  margin-bottom: 5px;
}

.searchField {
  font-family: ethnocentricregular;
  width: 33.6vw;
  margin-left: 9px;
}

.submit {
  font-family: ethnocentricregular;
  text-align: center;
  width: 8vw;
  cursor: pointer;
}

.leftDiv {
  /* width: 45.1vw; */
  float: left;
  margin-left: 16px;
}

.rightDiv {
  float: right;
  margin-right: 16px;
}

.favourites {
  font-family: ethnocentricregular;
  margin-top: -5px;
  margin-bottom: 3px;
  text-align: center;
}

.scroll-box {
  border-radius: 15px;
  background-color: rgba(212, 209, 209, 0.74);
  max-height: 592px;
  overflow-x: hidden;
  overflow-y: auto;
}

::-webkit-scrollbar { /* Scrollbaren */
  width: 12px;
}

::-webkit-scrollbar-track { /* Scrollkanten */
  box-shadow: inset 0 0 5px rgba(128, 128, 128, 0.205);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgb(150, 150, 150);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(133, 133, 133);
}

</style>
