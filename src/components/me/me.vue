<template>
<div>
  <slider-left :head_color="head_color">
    <template v-slot:mainContainer>
      <slider-main :container_title_h="container_title_h">
        <template v-slot:background>
          <div class="background_color"  :class="modeType ? '' : 'night'" ></div>
        </template>

        <template v-slot:container_title>
          <div class="user_info">
            <img :src="avatarUrl" alt="" class="avatar">
            <span class="username">{{username}}</span>
          </div>
          <div class="c_t_navbar">
            <ul>
              <li class="nav">
                <div class="icon iconfont icon-yinyue"></div>
                <div class="text">本地音乐</div>
              </li>
              <li class="nav ">
                <div class="icon iconfont icon-xiazai"></div>
                <div class="text">下载管理</div>
              </li>
              <li class="nav">
                <div class="icon iconfont icon-diantai"></div>
                <div class="text">我的电台</div>
              </li>
              <li class="nav ">
                <div class="icon iconfont icon-yixianshi-"></div>
                <div class="text">我的收藏</div>
              </li>
              <li class="nav ">
                <div class="icon iconfont icon-huabankaobei-"></div>
                <div class="text">关注新歌</div>
              </li>
            </ul>
          </div>
        </template>

        <template v-slot:container_content>
          <scroll  ref="scroll"
                   :listenScroll="ifScroll"
                   :preventDefault="preventDefault"
                   :pulldown="pulldown"
                   :pullup="pullup"
                   id="wrapper" class="list-wrapper" >
            <div class="content">
              <div class="my_music">
                <div class="my_music_t">
                  <span class="left">我的音乐</span>
                  <span class="right icon iconfont icon-arrow-right"></span>
                  <span class="right icon iconfont icon-airudiantubiaohuizhi-zhuanqu_qinzichengchang"></span>
                </div>
                <slider-bar2></slider-bar2>
              </div>
            </div>
          </scroll>
        </template>

      </slider-main>
    </template>
  </slider-left>
</div>

</template>

<script>
  import SliderLeft from 'components/slider-left/slider-left'
  import SliderMain from 'base/slider/slider-main'
  import SliderBar from 'base/slider/slider-bar'
  import SliderBar2 from 'base/slider/slider-bar2'
  import Songs from 'base/songs/songs'
  import Scroll from 'base/scroll/scroll'
  import {mapGetters, mapMutations} from 'vuex'
  import {getDailySonglist} from 'api/api'
  export default {
    name: 'me',
    data() {
      return {
        songlist:[],
        ifScroll:true,
        preventDefault:false,
        pulldown: true,
        pullup:true,
        container_title_h:'180px',
        head_color:"dark"
      }
    },
    components: {
      SliderLeft,
      SliderMain,
      SliderBar,
      SliderBar2,
      Songs,
      Scroll
    },
    computed: {
      ...mapGetters([
        'modeType',
        'userId',
        'username',
        'avatarUrl',
        'isLogin'
      ])
    },
    created() {
      this._getDailySonglist()
    },
    methods: {
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
  .left{
    float: left;
  }
  .right{
    float :right;
  }
  .background_color{
    width:100%;
    height:100%;
    background-color:#2a2a2b;
  }
  .user_info{
    height: 200px;
    line-height: 200px
    padding: 0 20px;
    .avatar{
      width: 100px;
      height: 100px;
      border-radius:50px;
      vertical-align: middle;
      margin-right: 20px;
    }
    .username{
      vertical-align: middle;
    }
  }

  .c_t_navbar{
    height:150
    width: 100%
    .nav{
      float: left
      width: 20%
      height:100px
      text-align:center
      margin:0
      .icon{
        width:100%
        color:#fff
        font-size: 54px
      }
      .text{
        height 50px;
        line-height: 50px
        margin-top: 10px
        font-size:$font-size-small
      }
    }
  }

  .list-wrapper{
    width: 100%
    height:1134px
    overflow :hidden
    .content{
      width: 100%
      height:auto
      .my_music{
        .my_music_t{
          padding: 0 20px;
          height: 80px;
          line-height :80px
          .right{
            font-size: $icon-size-medium
          }
        }
      }
    }
  }

</style>
