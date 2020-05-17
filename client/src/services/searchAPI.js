import API from '@/services/API'

export default {
  getFavelist (userid) {
    return API().post('getFavelist', {userid: userid})
  },
  getTracks (favelist) {
    return API().post('getTracks', {
      favelist: favelist
    })
  },
  searchTracks (searchQuery) {
    return API().post('searchTracks', {
      query: searchQuery
    })
  },
  addFavourite (userid, trackid) {
    return API().post('addFavourite', {
      userid: userid,
      trackid: trackid
    })
  },
  removeFavourite (userid, trackid) {
    return API().post('removeFavourite', {
      userid: userid,
      trackid: trackid
    })
  }
}
