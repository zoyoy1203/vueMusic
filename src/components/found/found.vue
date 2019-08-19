<template>
  <div>
    <m-header></m-header>
    <div class="recommend" ref="recommend">
      <scroll ref="scroll" class="recommend-content">
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
                <div class="icon iconfont icon-meirituijian-"></div>
                <div class="text">每日推荐</div>
              </li>
              <li class="nav " @click="goSonglist()">
                <div class="icon iconfont icon-gedan"></div>
                <div class="text">歌单</div>
              </li>
              <router-link tag="li" to="/leaderboard" class="nav">
                <div class="icon iconfont icon-paixingbang"></div>
                <div class="text">排行榜</div>
              </router-link>
              <li class="nav ">
                <div class="icon iconfont icon-diantai"></div>
                <div class="text">电台</div>
              </li>
              <li class="nav ">
                <div class="icon iconfont icon-zhibo"></div>
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
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import Songs from 'base/songs/songs'
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
      Songs
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

    },
    methods: {
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
      }
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
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
