import API from '@/services/API'

export default {
  getTest () {
    return API().get('test')
  }
}
