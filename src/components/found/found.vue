<template>
  <slider-left>
    <div slot="mainContainer">
      <div class="recommend" ref="recommend" :class="modeType ? '' : 'night'">
        <scroll ref="scroll" class="recommend-content">
          <div>
            <!--轮播图-->
            <div v-if="banners.length" class="slider-wrapper" :class="modeType ? '' : 'night'" ref="sliderWrapper">
              <slider>
                <div v-for="item in banners">
                  <a href="#">
                    <img class="needsclick"  :src="item.imageUrl">
                  </a>
                </div>
              </slider>
            </div>
            <!--导航栏-->
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
                <navbar1 :path="path" t_text1="推荐歌单" b_text1="为你精挑细选" b_text2="查看更多"></navbar1>
              </div>
              <div class="list-content">
                <div class="list_content_c">
                  <songs-wrapper2
                    v-for="(item, index) in songlist"
                    v-if="index<6"
                    :key="index"
                    :id="item.id"
                    :img="item.picUrl"
                    :text="item.name"
                    class="item"
                  ></songs-wrapper2>
                </div>
              </div>
            </div>
            <div class="recommend-list" :class="modeType ? '' : 'night'">
              <div class="list-title">
                <navbar1  t_text1="2月11日"  :b_text2="discORsong ? '更多新歌' : '更多新碟'" :path="discORsong ? '/new-album' : null" >
                  <template v-slot:select_tag>
                    <span class="tag tag1" @click="discORsong=true" :class="discORsong ? 'active' : ''" >
                      新歌
                    </span>
                    <span class="tag" @click="discORsong=false" :class="discORsong ? '' : 'active'">
                      新碟
                    </span>
                  </template>
                </navbar1>
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
  import SongsWrapper2 from 'base/songs/songs-wrapper2'
  import SliderLeft from 'components/slider-left/slider-left'
  import Navbar1 from '../../base/navbar/navbar1'
  import { getBanner, getNewDisc,getNewSong, getRecommendSonglist} from 'api/api'

  export default {
    data() {
      return {
        banners:[],
        discList: [],
        newSongList:[],
        discORsong:true,
        songlist:[],
        path:'/songlist'
      }
    },
    components: {
      Slider,
      Scroll,
      Loading,
      Songs,
      SongsWrapper2,
      SliderLeft,
      Navbar1
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
      goSonglist() {
        this.$router.push({
          path: '/songlist',
          name: 'songlist'
        })
      },
      goRecommendSongs() {
        this.$router.push({
          path: '/everydayrec',
          name: 'everydayrec',
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
        .list-title{
          width:100%;
          padding:0 20px;
          margin-bottom:10px;
          .tag{
            font-size:$font-size-medium-x;
            color:$color-font4;
            &.tag1{
              margin-right:10px;
              padding-right:10px;
              border-right:1px solid $color-line;
            }
            &.active{
              color:$color-font2;
            }
          }
        }
        .list-content{
          width:100%;
          height:300px;
          padding:0 20px;
          overflow-x :scroll;
          overflow-y : hidden;
          white-space : nowrap;
          .list_content_c{
            width:1350px;
            .item{
              float:left;
              margin-right:20px;
            }
          }
        }
        .list-content::-webkit-scrollbar {display:none}
</style>
