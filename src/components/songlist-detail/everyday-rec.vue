<template>
  <slider-main :container_title_h="container_title_h">

    <template v-slot:head>
      <back-head title="歌单"
                 :ico_color="modeType ? '#fff' : ''"
                 :style="{'background': isTop ? backheadUrl : 'none'}"
                 class="backhead"
      ></back-head>
    </template>

    <template v-slot:background>
      <div class="background_color"  :class="modeType ? '' : 'night'" :style="{'background':'url('+ require('../../common/img/bg.jpg') +')'}"></div>
    </template>

    <template v-slot:container_content>
      <div class="list_title">
        <div class="list_title_icon iconfont icon-bofang"></div>
        <div class="list_title_t">
          播放全部
          <span v-if="songlist.trackCount">(共{{songlist.trackCount}}首)</span>
          <span v-if="songlist.size">(共{{songlist.size}}首)</span>
        </div>
        <div class="list_save" :class="modeType ? '' : 'night'">
          <span class="icon iconfont icon-jiahao" ></span>
          收藏
          <span>({{songlist.subscribedCount}})</span>
        </div>
      </div>
      <scroll  ref="scroll"
               :listenScroll="ifScroll"
               :preventDefault="preventDefault"
               :pulldown="pulldown"
               :pullup="pullup"
               @pullingDown="pullingDown"
               @pullingUp="pullingUp"
               id="wrapper" class="list-wrapper" >
        <ul id="list_song" class="list_song">
          <li @click="goSongPlayer(item,index)" class="item" v-for="(item, index) in songlistDetail" :key="index">
            <div class="index">{{index}}</div>
            <div class="song_title">
              <div class="song_title_t">{{item.name}}</div>
              <div class="song_title_b">{{item.ar[0].name}}</div>
            </div>
            <div class="icon iconfont icon-more-vertical"></div>
            <div class="icon iconfont icon-bofang"></div>
          </li>
        </ul>
      </scroll>
    </template>

  </slider-main>
</template>
<script>
  import BScroll from 'better-scroll'
  import Scroll from 'base/scroll/scroll'
  import SliderMain from 'base/slider/slider-main'
  import {getSonglistDetail, getSongDetail,getToplistDetail,getRecommendSongs, getAlbum} from 'api/api'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  // import {playlistMixin} from 'common/js/mixin'
  import util from 'api/util'
  import BackHead from 'base/back-head/back-head'

  export default {
    name: 'songlist-detail',
    // mixins: [playlistMixin], //取消
    data() {
      return {
        songlist:[],
        backgroundImg:null,
        backgroundColor:{},
        ids:"",
        songlistDetail:[],
        songDetailS:"",
        leaderboardFlag:false,
        titleContent:true,
        backheadUrl:"",
        scrolly:null,
        ifScroll:true,
        preventDefault:false,
        pulldown: true,
        pullup:true,
        container_title_h: '150px'
      }
    },
    components: {
      BackHead,
      BScroll,
      Scroll,
      SliderMain
    },
    computed: {
      ...mapGetters([
        'modeType',
        'songlistId',
        'isTop'
      ])
    },
    created () {
      if(this.$route.params.id){
        this.setSonglistId(this.$route.params.id)
      }
      this._getSonglist()
    },

    methods: {
      pullingUp() {
        console.log("上拉加载啊")
      },
      pullingDown(){
        this.setIsTop(false)
      },

      getElementToPageTop(el){
        if(el.parentElement){
          return this.getElementToPageTop(el.parentElement) + el.offsetTop
        }
        return el.offsetTop
      },
      goUser(uid) {
        console.log(uid)
        this.$router.push({
          path:'/user',
          name:'user',
          params:{
            uid:uid
          }
        })
      },
      goComment() {
        this.$router.push({
          path:'/comment',
          name:'comment',
          params:{
            id:this.songlistId,
            type:"2",
          }
        })
      },
      ...mapMutations({
        setSonglistId: 'SET_SONGLIST_ID',
        setIsTop: 'SET_IS_TOP'
      }),

      goSongPlayer(item,index){
        console.log('item='+item)
        console.log('index='+index)
        util.setLocalData('songDetail',item)
        this.selectPlay({
          list: this.songlistDetail,
          index
        })
      },
      prev() {
        this.$router.go(-1)
      },
      _getSonglist() {
        console.log('recommend')
        this.titleContent=false
        this.scrolly=100
        console.log(this.backheadUrl)
        getRecommendSongs().then((res) => {
          console.log(res)
          this.songlist = res.data.result
          this.backgroundImg = this.songlist.coverImgUrl
          let songid = ""
          this.songlist.forEach(function (item,index) {
            songid +=item.id+","
          })
          this.ids = songid.slice(0,songid.length-1)
          this._getSongDetail()
        }).catch(err => {
          console.log(err)
        })

      },
      _getSongDetail() {
        console.log(this.ids)
        getSongDetail(this.ids).then((res) => {
          this.songlistDetail = res.data.songs
          console.log(res)

          /* const options = {
             scrollY:true,//默认， 可以省略
             click:true
           }
           setTimeout(() => {
             this.scroll = new BScroll(this.$refs.wrapper,options)
           },20)
   */
        }).catch(err => {
          console.log(err)
        })
      },
      ...mapActions([
        'selectPlay',
        'randomPlay'
      ])

    },

    filters: {
      formatNum(num) {
        num = num > 9999 ?  parseInt(num/10000) + "万" : num
        return num
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .background_color{
    width:100%;
    height:100%;
    background-repeat:no-repeat;
    background-size:cover;
    /*    filter:blur(15px);*/
    filter:brightness(75%);
    &.night{
      filter:brightness(50%);
    }
  }
  .container_title1{
    position: relative
    filter:none
    width: 100%
    height:300px
    .text{
      position: absolute
      bottom: 50px
      left: 20px
      font-size:$font-size-small
      color: $color-font1
    }
  }
  .container_title{
    filter:none
    width: 100%
    height:500px
    .c_t_detail{
      width: 100%
      height:350px
      .img{
        position: relative
        float: left
        width: 350px
        height:350px
        img{
          width:250px
          height:250px
          margin:50px !important
        }
        .playcount{
          position: absolute
          top:60px
          right:60px
          color: $color-font1
          font-size:$font-size-medium
          &.iconfont{
            font-size:$font-size-small-s
          }
        }
      }
      .text{
        float: right
        width: 400px
        height:350px
        .text_t{
          line-height: 40px
          margin-top: 40px
          margin-right: 50px
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          word-wrap: break-word;
          white-space: normal !important;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          font-size:$font-size-medium-x
        }
        .text_c{
          width: 100%
          height:80px
          line-height:80px
          img{
            width:50px
            height:50px
            border-radius :25px
            vertical-align :middle
          }
          span{
            color: $color-font6
            font-size:$font-size-small
            vertical-align :middle
          }

        }
        .text_d{
          display: inline-block
          height: 120px
          line-height:40px
          margin-top: 10px
          margin-right: 50px
          color: $color-font7
          .text_d_t{
            float: left;
            width: 80%
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: break-word;
            white-space: normal !important;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            font-size:$font-size-small
          }
          .text_d_b{
            color: $color-font7
            float: left;
            width:20%
            height: 120px
            line-height:120px
            text-align :center
            font-size:$font-size-medium
          }
        }
      }

    }
    .c_t_navbar{
      height:150
      width: 100%
      .nav{
        float: left
        width: 25%
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
  }

  .list_title{
    display: inline-block
    width: 100%
    heihgt:80px
    .list_title_icon{
      float: left
      width:100px
      height: 80px
      line-height: 80px
      text-align: center
      font-size:$font-size-large
    }
    .list_title_t{
      float: left
      width:auto
      height:80px
      line-height:80px
      span{
        font-size:$font-size-small
        color: $color-font4
      }
    }
    .list_save{
      float: right
      width:200px
      heihgt:60px
      line-height:60px
      margin:5px 20px
      background:red
      border-radius 30px
      text-align:center
      color: $color-font1
      font-size:$font-size-small
      &.night{
        background:$color-night-ico1
      }
      .icon{
        font-size:$font-size-medium
      }
    }
  }

  .list-wrapper{
    width: 100%
    height:1134px
    overflow :hidden
    .list_song{
      display: inline-block
      width: 100%
      height:auto
      .item{
        display: inline-block
        width: 100%
        heihgt:80px
        margin:20px 0
        .index{
          float: left
          width:100px;
          height:80px
          line-height:80px
          text-align :center
        }
        .song_title{
          float: left
          display:inline-block
          width:460px
          height:80px
          .song_title_t{
            height:50px
            line-height:50px
            font-size:$font-size-medium-x
            overflow:hidden
            text-overflow:ellipsis
            white-space:nowrap
          }
          .song_title_b{
            height:30px
            line-heihgt:30px
            font-size:$font-size-small
          }

        }
        .icon{
          float: right
          width:80px
          height:80px
          line-height:80px
          font-size:$font-size-medium
        }
      }
    }
  }


</style>
