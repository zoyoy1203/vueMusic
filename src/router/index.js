import Vue from 'vue'
import Router from 'vue-router'
import found from '../components/found/found'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
   /* {
      path:'/swiperList',
      name:'swiperList',
      component: resolve => require(['@/base/swiper_list/swiper_list'], resolve),
      meta: {
        keepAlive:false
      }
    },*/
    {
      path: '/',
      name: 'home',
      component: resolve => require(['@/components/login/home'], resolve),
      meta: {
        keepAlive: false
      },
    },
    {
      path: '/phone',
      name: 'phone',
      component: resolve => require(['@/components/login/phone'], resolve),
      meta: {
        keepAlive: false
      },
    },
    {
      path: '/password',
      name: 'password',
      component: resolve => require(['@/components/login/password'], resolve),
      meta: {
        keepAlive: false
      },
    },
    {
      path: '/found',
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
        keepAlive: false
      }
    },
    {
      path: '/me',
      name: 'me',
      component: resolve => require(['@/components/me/me'], resolve),
      meta: {
        keepAlive: true
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
      path: '/videolist',
      name: 'videolist',
      component: resolve => require(['@/components/video/video-list'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/video',
      name: 'video',
      component: resolve => require(['@/components/video/video'], resolve),
      meta: {
        keepAlive: false
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
      path:'/radio',
      name:'radio',
      component: resolve => require(['@/components/radio/radio'], resolve),
      meta: {
        keepAlive:false
      }
    },
    {
      path:'/sliderleft',
      name:'sliderleft',
      component: resolve => require(['@/base/drawer-layout/drawer-layout'], resolve),
      meta: {
        keepAlive:false
      }
    },
    {
      path:'/sliderbar',
      name:'sliderbar',
      component: resolve => require(['@/base/slider/slider-bar'], resolve),
      meta: {
        keepAlive:false
      }
    },
    {
      path:'/setting',
      name:'setting',
      component: resolve => require(['@/components/setting/setting'], resolve),
      meta: {
        keepAlive:false
      }
    },
    {
      path:'/test',
      name:'test',
      component: resolve => require(['@/components/test/test'], resolve),
      meta: {
        keepAlive:false
      }
    },
    {
      path:'/reply',
      name:'reply',
      component: resolve => require(['@/components/reply/reply'], resolve),
      meta: {
        keepAlive:false
      }
    },
    {
      path:'/comment',
      name:'comment',
      component: resolve => require(['@/components/comment/comment'], resolve),
      meta: {
        keepAlive:false
      }
    },
    {
      path:'/user',
      name:'user',
      component: resolve => require(['@/components/user/user'], resolve),
      meta: {
        keepAlive:false
      }
    },
    {
      path:'/djclass',
      name:'djclass',
      component: resolve => require(['@/components/dj-class/dj-class'], resolve),
      meta: {
        keepAlive:false
      }
    },
    {
      path:'/new-album',
      name:'new-album',
      component: resolve => require(['@/components/new-album/new-album'], resolve),
      meta: {
        keepAlive:false
      }
    },
    {
      path:'/radiolistDetail',
      name:'radiolistDetail',
      component: resolve => require(['@/components/radiolist-detail/radiolist-detail'], resolve),
      meta: {
        keepAlive:false
      }
    },
    {
      path:'/djPaygiftDetail',
      name:'djPaygiftDetail',
      component: resolve => require(['@/components/djPaygift-detail/djPaygift-detail'], resolve),
      meta: {
        keepAlive:false
      }
    },
    {
      path:'/search',
      name:'search',
      component: resolve => require(['@/components/search/search'], resolve),
      meta: {
        keepAlive:false
      }
    },
    {
      path:'/searchTo',
      name:'searchTo',
      component: resolve => require(['@/components/search/search-to'], resolve),
      meta: {
        keepAlive:false
      }
    },
    {
      path:'/singer',
      name:'singer',
      component: resolve => require(['@/components/singer/singer'], resolve),
      meta: {
        keepAlive:true
      }
    },
    {
      path:'/singerCategory',
      name:'singerCategory',
      component: resolve => require(['@/components/singer/singer-category'], resolve),
      meta: {
        keepAlive:false
      }
    },
    {
      path:'/singerIntroduction',
      name:'singerIntroduction',
      component: resolve => require(['@/components/singer/singer-introduction'], resolve),
      meta: {
        keepAlive:false
      }
    },
    {
      path:'/everydayrec',
      name:'everydayrec',
      component: resolve => require(['@/components/songlist-detail/everyday-rec'], resolve),
      meta: {
        keepAlive:false
      }
    },
    {
      path: "/404",
      name: "notFound",
      component:  resolve => require(['@/components/error-page/notFound'], resolve),
    },
    {
      path: "*", // 此处需特别注意置于最底部
      redirect: "/404"
    }
  ]
})
