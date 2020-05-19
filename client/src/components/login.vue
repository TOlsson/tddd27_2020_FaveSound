<template lang="html">
    <div id ="background">
      <h1 id="title">FaveSound</h1>
      <button v-google-signin-button="clientId" class="google-singin-button" id="sign-in-button">Login with Google</button>
    </div>
</template>

<script>
import loginAPI from '@/services/loginAPI.js'
import router from '../router'
export default {
  name: 'login',
  beforeCreate: function () {
    document.body.className = 'login'
  },
  data: () => ({
    clientId: '592206751385-m2bon646bbi7oqpv0b42f9sftdo35qhq.apps.googleusercontent.com' // When using localhost
    // clientId: '592206751385-46likdak30iu58t4gn3q0v5jrruregmn.apps.googleusercontent.com' // When using netlify
  }),
  methods: {
    async OnGoogleAuthSuccess (idToken) {
      const res = await loginAPI.googleLogin(idToken)
      if (res.status === 200) {
        this.$cookies.set('user', {userid: res.request.response})
        router.push({name: 'search'})
      }
    },
    OnGoogleAuthFail (error) {
      console.log(error)
    }
  }
}
</script>

<style scoped>
@import url('../assets/fonts/stylesheet.css');

#title {
  font-family: ethnocentricregular;
  text-align: center;
  margin-top: 15vh;
  font-size: 4vw;
}

#sign-in-button {
  font-family: ethnocentricregular;

  background-color: #dd4b39;
  color: white;

  width: 30%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  margin: 5px 0;
  opacity: 0.85;
  display: inline-block;
  font-size: 17px;
  line-height: 20px;
  text-decoration: none;

  margin: 54vh auto 0 auto;
  display: block;
}

</style>
