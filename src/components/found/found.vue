<template>
  <drawer-layout
    ref="drawerLayout"
    @mask-click="handleMaskClick"
  >
    <div slot="drawer" class="drawer" :class="modeType ? '' : 'night'">
      <div class="user" :class="modeType ? '' : 'night'">
        <div class="nologin">
          <p>登录网易云音乐</p>
          <p>手机电脑多端同步，尽享海量高品质音乐</p>
          <button :class="modeType ? '' : 'night'">立即登录</button>
        </div>
        <div class="login" style="display: none;">

        </div>
      </div>
      <div class="content">
        <div class="usernav">
          <ul>
            <li class="nav ">
              <div class="icon iconfont icon-xiaoxi1"></div>
              <div class="text">我的消息</div>
            </li>
            <li class="nav ">
              <div class="icon iconfont icon-haoyou"></div>
              <div class="text">我的好友</div>
            </li>
            <li class="nav ">
              <div class="icon iconfont icon-huanfu"></div>
              <div class="text">个性换肤</div>
            </li>
            <li class="nav ">
              <div class="icon iconfont icon-huatong"></div>
              <div class="text">听歌识曲</div>
            </li>
          </ul>
        </div>
        <div class="line"></div>
        <div class="list">
          <ul>
            <li class="item">
              <span class="icon iconfont icon-huopiaotongxing"></span>
              <span class="text">演出</span>
              <span class="text_r">雅尼音乐会</span>
            </li>
            <li class="item">
              <span class="icon iconfont icon-icon01"></span>
              <span class="text">商城</span>
              <span class="text_r">真无线 59元</span>
            </li>
            <li class="item">
              <span class="icon iconfont icon-fujin"></span>
              <span class="text">附近的人</span>
            </li>
            <li class="item">
              <span class="icon iconfont icon-icon--"></span>
              <span class="text">口袋铃声</span>
            </li>
            <li class="item">
              <span class="icon iconfont icon-icon3"></span>
              <span class="text">我的订单</span>
            </li>
          </ul>
          <div class="line"></div>
          <ul>
            <li class="item">
              <span class="icon iconfont icon-time"></span>
              <span class="text">定时停止播放</span>
            </li>
            <li class="item">
              <span class="icon iconfont icon-saoma"></span>
              <span class="text">扫一扫</span>
            </li>
            <li class="item">
              <span class="icon iconfont icon-paidui"></span>
              <span class="text">音乐闹钟</span>
            </li>
            <li class="item">
              <span class="icon iconfont icon-liuliang"></span>
              <span class="text">在线听歌免流量</span>
            </li>
            <li class="item">
              <span class="icon iconfont icon-youxi"></span>
              <span class="text">游戏推荐</span>
            </li>
            <li class="item">
              <span class="icon iconfont icon-wodeyouhuijuan"></span>
              <span class="text">优惠券</span>
            </li>
            <li class="item">
              <span class="icon iconfont icon-zhibo"></span>
              <span class="text">我要直播</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer" :class="modeType ? '' : 'night'">
        <div class="item" @click="modeClick">
          <span class="icon iconfont " :class="modeType ? 'icon-yejianmoshi' : 'icon-rijianmoshi'"></span>
          <span>夜间模式</span>
        </div>
        <div class="item">
          <span class="icon iconfont icon-shezhi"></span>
          <span>设置</span>
        </div>
        <div class="item">
          <span class="icon iconfont icon-tuichu"></span>
          <span>退出</span>
        </div>
      </div>
    </div>
    <div slot="content">
      <m-header  @icon-click="handleIconClick" :class="modeType ? '' : 'night'"></m-header>
      <div class="recommend" ref="recommend">
        <scroll ref="scroll" class="recommend-content" :class="modeType ? '' : 'night'">
          <div>
            <div v-if="banners.length" class="slider-wrapper" ref="sliderWrapper">
              <slider>
                <div v-for="item in banners">
                  <a href="#">
                    <img class="needsclick" @load="loadImage" :src="item.imageUrl">
                  </a>
                </div>
              </slider>
            </div>
            <div class="navbar">
              <ul>
                <li class="nav " @click="goRecommendSongs()">
                  <div class="icon iconfont icon-meirituijian-" :class="modeType ? '' : 'night'"></div>
                  <div class="text">每日推荐</div>
                </li>
                <li class="nav " @click="goSonglist()">
                  <div class="icon iconfont icon-gedan" :class="modeType ? '' : 'night'"></div>
                  <div class="text">歌单</div>
                </li>
                <router-link tag="li" to="/leaderboard" class="nav">
                  <div class="icon iconfont icon-paixingbang" :class="modeType ? '' : 'night'"></div>
                  <div class="text">排行榜</div>
                </router-link>
                <li class="nav ">
                  <div class="icon iconfont icon-diantai" :class="modeType ? '' : 'night'"></div>
                  <div class="text">电台</div>
                </li>
                <li class="nav ">
                  <div class="icon iconfont icon-zhibo" :class="modeType ? '' : 'night'"></div>
                  <div class="text">直播</div>
                </li>
              </ul>
            </div>
            <div class="recommend-list">
              <div class="list-title">
                <div class="list-title-left">
                  推荐歌单
                </div>
                <div class="list-title-right" @click="goSonglist()"  >
                  歌单广场
                </div>
              </div>
              <songs :songlist="songlist" img="picUrl"></songs>
            </div>
            <div class="recommend-list">
              <div class="list-title">
                <div class="list-title-left">
                  新碟
                </div>
                <div class="list-title-right">
                  更多新碟
                </div>
              </div>
              <songs :songlist="discList" img="picUrl"></songs>
            </div>
          </div>
        </scroll>
        <router-view></router-view>
      </div>
    </div>
  </drawer-layout>

</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'
  import MHeader from 'components/m-header/m-header'
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import Songs from 'base/songs/songs'
  import DrawerLayout from 'base/drawer-layout/drawer-layout'
  import { getBanner, getNewDisc,getRecommendSonglist} from 'api/api'

  export default {
    data() {
      return {
        banners:[],
        discList: [],
        songlist:[]
      }
    },
    components: {
      'm-header':MHeader,
      Slider,
      Scroll,
      Loading,
      Songs,
      DrawerLayout
    },
    computed: {
      ...mapGetters([
        'modeType'
      ])
    },
    watch: {
      '$route' (to, from) {
        this.$router.go(0);
      }
    },
    created() {
      this._getBanners()
      this._getSonglist()
      this._getDiscList()
      console.log(this.mode)

    },
    methods: {
      modeClick() {
        this.setModeType(!this.modeType)
      },
      handleIconClick() {
        console.info('icon-click')
        this.$refs.drawerLayout.toggle(true)
      },
      handleSlideStart() {
        console.info('slide-start')
      },
      handleMaskClick() {
        console.info('mask-click')
        this.$refs.drawerLayout.toggle(false)
      },
      loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
          this.$refs.scroll.refresh()
        }
      },
      goSonglist() {
        this.$router.push({
          path: '/songlist',
          name: 'songlist'
        })
      },
      goRecommendSongs() {
        this.$router.push({
          path: '/songlistdetail',
          name: 'songlistdetail',
          params: {
            flag:"recommend"
          }
        })
      },
      _getBanners() {
        getBanner().then((res) => {
          console.log(res)
          this.banners = res.data.banners
        }).catch(err => {
          console.log(err)
        })
      },
      _getSonglist() {
        getRecommendSonglist(9).then((res) => {
          console.log(res)
          /*let songslist = res.data.result
          var that = this
          songslist.forEach(function (item,index) {
            that.songlist[index]={
              id:item.id,
              name:item.name,
              img:item.picUrl
            }
          })*/
          this.songlist = res.data.result
          console.log('推荐歌单列表=')
          console.log(this.songlist)
        }).catch(err => {
          console.log(err)
        })
      },
      _getDiscList() {
        getNewDisc().then((res) => {
          console.log(res)
         /* let disclist = res.data.albums
          var that = this
          disclist.forEach(function (item,index) {
            that.discList[index]={
              id:item.id,
              name:item.name,
              img:item.picUrl
            }
          })*/
         this.discList = res.data.albums
          console.log(this.discList)
        }).catch(err => {
          console.log(err)
        })
      },
      ...mapMutations({
        setModeType: 'SET_MODE_TYPE'
      }),
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .drawer{
    position: absolute
    left: 0
    top: 0
    bottom: 0
    overflow-x: hidden
    overflow-y:scroll
    width: 100%
    &::-webkit-scrollbar {
      display: none;
    }
    &.night{
      background:	#545454!important
    }
    .user{
      background:	#F7F7F7
      .nologin{
        text-align :center
        padding-top:80px
        p{
          text-align :center
          font-size:$font-size-small
          margin-top:20px
        }
        button{
          margin-top: 40px
          margin-bottom :60px
          background: 	#F7F7F7
          border:1px solid #ccc
          padding: 6px 40px
          border-radius :20px
        }
      }
    }

    .content{
      width:90%
      height:auto
      margin: 0 5%
      display: inline-block
      .line{
        width: 100%
        height:1px
        background: #ccc
      }
      .usernav{
        display: inline-block
        width:100%
        padding-top:40px
        ul{
          .nav{
            float: left
            width: 84px
            height:100px
            margin:10px 25px
            text-align:center
            .icon{
              width:100%
              heihgt:auto
              color:$color-icon
              font-size: 40px
            }
            .text{
              width:100%
              height 40px;
              line-height: 40px
              margin-top: 10px
              font-size:$font-size-small-s
            }

          }
        }

      }
      .list{
        margin-bottom:80px
        ul{
          .item{
            width: 100%
            heihgt:80px
            line-height :80px
            display:inline-block
            font-size: $font-size-medium
            .icon{
              float: left
              font-size:$font-size-large-x
            }
            .text{
              float: left
              margin-left:20px
            }
            .text_r{
              float: right
            }
          }
        }
      }
    }

    .footer{
      display: inline-block
      position: fixed
      bottom:0
      left:0
      right:0
      heihgt:80px
      background: #fff
      border-top:1px solid #ccc
      .item{
        display: inline-block
        height:80px
        line-height :80px
        margin:0 30px
        font-size:$font-size-medium
        .icon{
          font-size:$font-size-medium
        }
      }
    }
  }

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .navbar
        width: 100%
        height:100px
        margin:20px 0
        .nav
          float: left
          width: 100px
          height:150px
          margin:10px 25px
          line-height:100px
          text-align:center
          .icon
            width:100px
            heihgt:100px
            border-radius:50px
            color:#fff
            background:$color-icon
            font-size: 40px
            &.night{
              background: #a9a9a9!important
              color: #fff!important
            }
          .text
            height 40px;
            line-height: 40px
            margin-top: 10px
            font-size:$font-size-small

      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          width:100%
          display: inline-block
          margin:20px auto;
          .list-title-left
            float:left
            font-size:$font-size-large-x
            margin:0 20px
          .list-title-right
            float: right
            font-size:$font-size-small
            line-height: 40px
            width:140px
            heihgt:40px
            border-radius:20px
            border:1px solid $color-line
            margin:15px 20px
</style>
