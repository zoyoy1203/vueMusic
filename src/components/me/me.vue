<template>
<div>
  <slider-left>
    <div slot="mainContainer">
      <div class="main_container">
        <scroll ref="scroll" class="container">
          <div>
            <slider-bar></slider-bar>
            <div class="list">
              <ul>
                <li class="item">
                  <span class="icon iconfont icon-yinyue"></span>
                  <div class="text">本地音乐 <span>(137)</span></div>
                </li>
                <li class="item">
                  <span class="icon iconfont icon-zuijinbofang"></span>
                  <div class="text">最近播放 <span>(37)</span></div>
                </li>
                <li class="item">
                  <span class="icon iconfont icon-iconset0425"></span>
                  <div class="text">下载管理 <span>(137)</span></div>
                </li>
                <li class="item">
                  <span class="icon iconfont icon-diantai"></span>
                  <div class="text">我的电台 <span>(137)</span></div>
                </li>
                <li class="item">
                  <span class="icon iconfont icon-yixianshi-"></span>
                  <div class="text">我的收藏 <span>(137)</span></div>
                </li>
              </ul>
            </div>
            <div class="line"></div>
            <div class="my_songlist">
              <div class="head">
                <span class="icon iconfont icon-xiangxiajiantou"></span>
                <span>创建歌单</span>
                <span>(1)</span>
                <span class="icon i_r iconfont icon-diantai"></span>
                <span class="icon i_r iconfont icon-diantai"></span>
              </div>
            </div>
            <div class="line"></div>
            <div class="recommend-list">
              <div class="list-title">
                <span class="icon i_l iconfont icon-shixin"></span>
                <span>推荐歌单</span>
                <span class="icon i_r iconfont icon-cross"></span>
              </div>
              <songs :songlist="songlist" img="picUrl"></songs>
            </div>
          </div>
        </scroll>
      </div>
    </div>
  </slider-left>
</div>

</template>

<script>
  import SliderLeft from 'components/slider-left/slider-left'
  import SliderBar from 'base/slider/slider-bar'
  import Songs from 'base/songs/songs'
  import Scroll from 'base/scroll/scroll'
  import {mapGetters, mapMutations} from 'vuex'
  import {getDailySonglist} from 'api/api'
  export default {
    name: 'me',
    data() {
      return {
        songlist:[]
      }
    },
    components: {
      SliderLeft,
      SliderBar,
      Songs,
      Scroll
    },
    computed: {
      ...mapGetters([
        'modeType',
      ])
    },
    created() {
      this._getDailySonglist()
    },
    methods: {
      loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
          this.$refs.scroll.refresh()
        }
      },
      _getDailySonglist(){
        getDailySonglist().then(res => {
          this.songlist = res.data.recommend
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
      ...mapMutations({
        setModeType: 'SET_MODE_TYPE',
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .main_container{
    position:fixed
    width: 100%
    top: 88px
    bottom: 0
    .container{

      .list{
        width: 100%
        height:auto
        .item{
          display :inline-block
          width: 100%
          height:90px
          line-height:90px
          .icon{
            float: left
            font-size:$icon-size-large
            width:150px
            text-align :center
          }
          .text{
            float: left
            width:600px
            border-bottom:1px solid #ccc
          }
        }
      }

      .line{
        width: 100%
        height:10px
        background: #ccc
        margin-top:-3px
      }
      .my_songlist{
        width: 100%
        height:auto
        .head{
          width: 100%
          height:80px
          line-height:80px
          .icon{
            font-size:$icon-size-medium
            &.i_r{
              float: right
            }
          }

        }
      }
      .recommend-list{
        .list-title{
          height:80px
          line-height :80px
          width:100%
          display: inline-block
          span{
            vertical-align :middle
          }
          .icon{
            display: inline-block
            font-size:$font-size-small
            text-align :center
            &.i_l{
              box-sizing :border-box
              width: 40px
              height: 40px
              line-height :40px
              border-radius :20px
              background:$color-icon
              margin: 0 10px
            }
            &.i_r{
              float: right
              margin-right:20px
              font-size:$font-size-medium-x
            }
          }
        }
      }
    }
  }



</style>
