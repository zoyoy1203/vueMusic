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
                <navbar :title="my_music_title" :icon1="icon1" :icon2="icon2"></navbar>
                <slider-bar2></slider-bar2>
              </div>
              <div class="my_playmusic">
                <navbar :title="my_playmusic_title" :icon1="icon1" :text1="my_playmusic_text1"></navbar>
                <div class="my_playmusic_c">
                  <songs-wrapper1
                    :img=" song_wrapper1_img"
                    :text1="song_wrapper1_text1"
                    :text2="song_wrapper1_text2"
                  ></songs-wrapper1>
                  <songs-wrapper1
                    :img=" song_wrapper1_img"
                    :text1="song_wrapper1_text1"
                    :text2="song_wrapper1_text2"
                  ></songs-wrapper1>
                </div>
              </div>
              <div class="rec_songs">
                <navbar :title="rec_songs_title" :icon1="icon3"></navbar>
                <songs-wrapper1
                  v-for="(item, index) in songlist"
                  :key="index"
                  :img="item.picUrl"
                  :text1="item.name"
                  :text2="item.copywriter"
                  :id="item.id"
                ></songs-wrapper1>
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
  import SliderBar2 from 'base/slider/slider-bar2'
  import SongsWrapper1 from 'base/songs/songs-wrapper1'
  import Navbar from 'base/navbar/navbar'
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
        head_color:"dark",
        song_wrapper1_img: require('common/image/FM.jpg'),
        song_wrapper1_text1:'全部已播歌曲全部已播歌曲全部已播歌曲全部已播歌曲全部已播歌曲',
        song_wrapper1_text2:'2首',
        my_music_title:'我的音乐',
        icon1:'icon-arrow-right',//右箭头
        icon2:'icon-airudiantubiaohuizhi-zhuanqu_qinzichengchang',
        icon3:'icon-cross', //×
        my_playmusic_title:'最近播放',
        my_playmusic_text1:'更多',
        rec_songs_title:'推荐歌单'
      }
    },
    components: {
      SliderLeft,
      SliderMain,
      SliderBar2,
      SongsWrapper1,
      Navbar,
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
    height:1300px;
    overflow :hidden
    .content{
      display: inline-block
      width: 100%
      height:1400px;
      .my_music{
        width:100%;
        padding:0 20px;
        margin-top:30px;
      }
      .my_playmusic{
        margin-top:30px;
        padding: 0 20px;
        .my_playmusic_c{
          width:100%;
          height: 130px;
        }
      }
      .rec_songs{
        margin-top:30px;
        width:100%;
        padding:0 20px;
      }
    }
  }

</style>
