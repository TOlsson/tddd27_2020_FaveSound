import API from '@/services/API'

export default {
  googleLogin (idToken) {
    return API().post('googleLogin', {
      googleToken: idToken
    })
  }
}
