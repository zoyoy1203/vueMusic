import Vue from 'vue'
import Router from 'vue-router'
import found from '../components/found/found'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'found',
      component: resolve => require(['@/components/found/found'], resolve),
      meta: {
        keepAlive: true
      },
    },
    {
      path: '/songlistdetail',
      name: 'songlistdetail',
      component: resolve => require(['@/components/songlist-detail/songlist-detail'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/songlist',
      name: 'songlist',
      component: resolve => require(['@/components/songlist/songlist'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/me',
      name: 'me',
      component: resolve => require(['@/components/me/me'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/cloud',
      name: 'cloud',
      component: resolve => require(['@/components/cloud/cloud'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/video',
      name: 'video',
      component: resolve => require(['@/components/video/video'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path:'/leaderboard',
      name:'leaderboard',
      component: resolve => require(['@/components/leaderboard/leaderboard'], resolve),
      meta: {
        keepAlive:false
      }
    },
    {
      path:'/sliderleft',
      name:'sliderleft',
      component: resolve => require(['@/base/slider-left/slider-left'], resolve),
      meta: {
        keepAlive:false
      }
    }
  ]
})
