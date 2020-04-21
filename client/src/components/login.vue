<template lang="html">
    <button v-google-signin-button="clientId" class="google-singin-button">Login with Google</button>
</template>

<script>
import loginAPI from '@/services/loginAPI.js'
import router from '../router'
export default {
  name: 'login',
  data: () => ({
    clientId: '592206751385-m2bon646bbi7oqpv0b42f9sftdo35qhq.apps.googleusercontent.com'
  }),
  methods: {
    async OnGoogleAuthSuccess (idToken) {
      const res = await loginAPI.googleLogin(idToken)
      if (res.status === 200) {
        router.push({name: 'test'})
      }
    },
    OnGoogleAuthFail (error) {
      console.log(error)
    }
  }
}
</script>

<style lang="css">
</style>
