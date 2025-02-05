// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import GoogleSignInButton from 'vue-google-signin-button-directive'
import '@/assets/css/global.css'
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueCookies from 'vue-cookies'
import trackBox from './components/TrackBox'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.use(VueCookies)
Vue.$cookies.set('theme', 'default')
Vue.$cookies.set('hover-time', '1s')

Vue.config.productionTip = false

Vue.component('track-box', trackBox)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  GoogleSignInButton,
  render: h => h(App)
}).$mount('#app')
