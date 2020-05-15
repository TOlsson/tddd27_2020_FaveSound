import API from '@/services/API'

export default {
  getFavelist () {
    return API().get('getFavelist')
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
