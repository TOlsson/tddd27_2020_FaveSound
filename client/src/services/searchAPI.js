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
  }
}
