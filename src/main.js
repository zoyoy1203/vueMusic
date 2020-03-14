import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'

import axios from 'axios'
Vue.prototype.$axios = axios


import VueLazyload from 'vue-lazyload'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'common/stylus/index.styl'
import 'swiper/dist/css/swiper.css'

import 'common/fonts/iconfont.css'

import Video from 'video.js'
import 'video.js/dist/video-js.css'

Vue.prototype.$video = Video


Vue.use(VueAwesomeSwiper, /* { default global options } */)
fastclick.attach(document.body)

/*
axios 不是vue插件，不要这样写
Vue.use(axios)
*/

Vue.use(VueLazyload, {
  loading: require('common/image/default.jpg'),
  error: require('common/image/error.jpg')
})

// Vue.prototype.$axios = axios
Vue.config.productionTip = false

// 若是没有开启Devtools工具，在开发环境中开启，在生产环境中关闭
if (process.env.NODE_ENV == 'development') {
  Vue.config.devtools = true;
} else {
  Vue.config.devtools = false;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
