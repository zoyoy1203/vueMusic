<template>
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
            <li class="nav">
              <div class="icon iconfont icon-meirituijian-"></div>
              <div class="text">每日推荐</div>
            </li>
            <li class="nav ">
              <div class="icon iconfont icon-gedan"></div>
              <div class="text">歌单</div>
            </li>
            <li class="nav">
              <div class="icon iconfont icon-paixingbang"></div>
              <div class="text">排行榜</div>
            </li>
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
            <div class="list-title-right">
              歌单广场
            </div>
          </div>
          <ul class="list-center">
            <li @click="selectItem(item)" v-for="(item, index) in recommends" v-if="index<9" :key="index" class="item">
              <div class="img">
                <img v-lazy="item.picUrl">
              </div>
              <div class="text" v-html="item.name">
              </div>
            </li>
          </ul>
        </div>
        <div class="recommend-list">
          <div class="list-title">
            <div class="list-title-left">
              推荐歌单
            </div>
            <div class="list-title-right">
              歌单广场
            </div>
          </div>
          <ul class="list-center">
            <li @click="selectItem(item)" v-for="(item, index) in discList" v-if="index<9" :key="index" class="item">
              <div class="img">
                <img v-lazy="item.picUrl">
              </div>
              <div class="text" v-html="item.name">
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {getRecommendSongList, getBanner, getNewDisc} from 'api/api'

  export default {
    data() {
      return {
        banners:[],
        recommends: [],
        discList: []
      }
    },
    components: {
      Slider,
      Scroll,
      Loading
    },
    created() {
      this._getBanners()
      this._getRecommend()

      this._getDiscList()
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''

        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
          this.$refs.scroll.refresh()
        }
      },
      selectItem(item) {
        this.$router.push({
          path: `/recommend/${item.dissid}`
        })
        this.setDisc(item)
      },
      _getBanners() {
        getBanner().then((res) => {
          console.log(res)
          this.banners = res.data.banners
        }).catch(err => {
          console.log(err)
        })
      },
      _getRecommend() {
        getRecommendSongList().then((res) => {
          console.log(res)
          this.recommends = res.data.result
        }).catch(err => {
          console.log(err)
        })
      },
      _getDiscList() {
        getNewDisc().then((res) => {
          console.log(res)
          this.discList = res.data.albums
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
        .list-center
          display: flex
          width: 100%
          height:auto
          flex-wrap: wrap
          justify-content :center
          align-items: center
          .item
            display: flex
            flex-direction:column
            box-sizing: border-box
            padding: 0 20px 20px 20px
            width:33%
            .img
              flex: 0 0 60px
              width:100%
              padding-right: 20px
              img
                width: 100%
                heihgt: auto
            .text
              width: 100%
              height:80px
              line-height: 40px
              display: -webkit-box;
              overflow: hidden;
              text-overflow: ellipsis;
              word-wrap: break-word;
              white-space: normal !important;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              font-size:$font-size-medium
</style>
