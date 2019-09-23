<template>
  <slider-left>
    <div slot="mainContainer">
      <div class="recommend" ref="recommend" :class="modeType ? '' : 'night'">
        <scroll ref="scroll" class="recommend-content">
          <div>
            <div v-if="banners.length" class="slider-wrapper" :class="modeType ? '' : 'night'" ref="sliderWrapper">
              <slider>
                <div v-for="item in banners">
                  <a href="#">
                    <img class="needsclick" @load="loadImage" :src="item.imageUrl">
                  </a>
                </div>
              </slider>
            </div>
            <div class="navbar" :class="modeType ? '' : 'night'">
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
                <router-link tag="li" to="/radio" class="nav ">
                  <div class="icon iconfont icon-diantai" :class="modeType ? '' : 'night'"></div>
                  <div class="text">电台</div>
                </router-link>
                <li class="nav ">
                  <div class="icon iconfont icon-zhibo" :class="modeType ? '' : 'night'"></div>
                  <div class="text">直播</div>
                </li>
              </ul>
            </div>
            <div class="recommend-list" :class="modeType ? '' : 'night'">
              <div class="list-title">
                <div class="list-title-left">
                  推荐歌单
                </div>
                <div class="list-title-right":class="modeType ? '' : 'night'" @click="goSonglist()"  >
                  歌单广场
                </div>
              </div>
              <songs :songlist="songlist" img="picUrl"></songs>
            </div>
            <div class="recommend-list" :class="modeType ? '' : 'night'">
              <div class="list-title">
                <div class="list-title-left" @click="discORsong=true" :class="discORsong ? (modeType ? 'active' : 'active_night') : ''">
                  新碟
                </div>
                <div class="list-title-left" @click="discORsong=false" :class="!discORsong ? (modeType ? 'active' : 'active_night') : ''" >
                  新歌
                </div>
                <router-link tag="div" to="/new-album" class="list-title-right" :class="modeType ? '' : 'night'" v-if="discORsong">
                  更多新碟
                </router-link>
                <div class="list-title-right" :class="modeType ? '' : 'night'" v-else>
                  新歌推荐
                </div>
              </div>
              <songs :songlist="discORsong ? discList : newSongList" :img="discORsong ? 'picUrl' : 'album.picUrl'"></songs>
            </div>
          </div>
        </scroll>
        <router-view></router-view>
      </div>
    </div>
  </slider-left>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import Songs from 'base/songs/songs'
  import SliderLeft from 'components/slider-left/slider-left'
  import { getBanner, getNewDisc,getNewSong, getRecommendSonglist} from 'api/api'

  export default {
    data() {
      return {
        banners:[],
        discList: [],
        newSongList:[],
        discORsong:true,
        songlist:[],
      }
    },
    components: {
      Slider,
      Scroll,
      Loading,
      Songs,
      SliderLeft
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
      this._getNewSong()
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
          path: '/b-songlist',
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
            that.b-songlist[index]={
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
        getNewDisc(0,3).then((res) => {
          console.log(res)
         this.discList = res.data.albums
          console.log(this.discList)
        }).catch(err => {
          console.log(err)
        })
      },
      _getNewSong() {
        getNewSong().then(res => {
          console.log(res)
          let newSonglist =res.data.data
          this.newSongList = newSonglist.slice(0,3)
          console.log(this.newSongList)

        }).catch(err => {
          console.log(err)
        })
      },
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .recommend
    position: fixed
    width: 100%
    top: 80px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        width: 100%
        height:200px
        padding-top:20px
        &.night{
          background:$color-night-bg1!important
        }

      .navbar
        width: 100%
        height:250px
        padding-top:80px
        border-bottom:1px solid #ccc
        &.night{
          background: $color-night-bg2!important
          border-bottom:1px solid $color-night-line1
        }
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
        &.night{
          background :$color-night-bg3!important
        }
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          width:100%
          display: inline-block
          margin:20px auto;
          .list-title-left
            float:left
            font-size:$font-size-medium
            color: $color-font4
            margin:0 20px
            &.active{
              font-size:$font-size-large-x
              color: #000
            }
            &.active_night{
              color: #ccc
              font-size:$font-size-large-x
            }
          .list-title-right
            float: right
            font-size:$font-size-small
            line-height: 40px
            width:140px
            heihgt:40px
            border-radius:20px
            border:1px solid $color-line
            margin:15px 20px
            &.night{
              background:$color-night-bg3!important
              border:1px solid $color-night-line1
            }
</style>
