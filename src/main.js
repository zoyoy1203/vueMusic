import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'

import 'common/stylus/index.styl'
import 'common/fonts/iconfont.css'

import Video from 'video.js'
import 'video.js/dist/video-js.css'

Vue.prototype.$video = Video


Vue.use(VueAwesomeSwiper, /* { default global options } */)
fastclick.attach(document.body)

Vue.use(axios)
Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

Vue.prototype.$axios = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
