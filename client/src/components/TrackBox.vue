<!-- Vue component for track boxes -->
<template>
  <div v-if='print'>
    <div v-for='track in tracks' :key='track.id' class="trackinfo" :id='track.id'>
      <img class='imageFix' :src='track.album.images[2].url'>
      <div>
        <span style='position: relative; top: 10px;' >Artist: </span>
        <span style='position: relative; top: 10px;' v-for='(artist, index) in track.artists' :key='index'>{{artist.name}}
          <span v-if="index+1 < track.artists.length">, </span>
        </span>
      </div>
      <b-icon v-if='side === "left"' icon='star' class='iconfix' v-on:click='functionOnClick($event)'></b-icon>
      <b-icon v-else icon='star-fill' class='iconfix' v-on:click='functionOnClick($event)'></b-icon>
      <br><br>
      <span>Track: {{track.name}}</span><br><br>
      <span>Album: {{track.album.name}}</span><br>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'tracks',
    'print',
    'functionOnClick',
    'side'
  ]
}
</script>

<style lang="css">
@import url('../assets/fonts/stylesheet.css');

.trackinfo {
  background-color: grey;
  width: 45vw;
  font-family: ethnocentricregular;
  font-size: 0.8em;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  height: 84px;
  line-height: 12px;
  border-radius: 10px;
  display: table;
}

.iconfix {
  float: right;
  margin-right: 10px;
  margin-top: -5px;
  font-size: 1.8em;
  color: gold;
}

.iconfix:hover {
  cursor: pointer;
  font-size: 1.9em;
}

.imageFix {
  float: left;
  margin: 10px;
  border-radius: 10px;
}
</style>
