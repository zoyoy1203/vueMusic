<template>
  <div class="songlist_detail">
    <back-head title="歌单"
               :ico_color="modeType ? '#fff' : ''"
               :style="{'background': listScroll ? backheadUrl : 'none'}"
               class="backhead"
    ></back-head>
    <!--
    :style="{'background':titleContent ? 'url('+b-songlist.coverImgUrl+')' : 'url('+ require('../../common/img/bg.jpg') +')'}"
    :style="{'background': 'url('+b-songlist.coverImgUrl+')'}"
    :style="{background: backgroundColor}"
    -->
    <div class="background_color"  :class="modeType ? '' : 'night'" :style="{'background':titleContent ? 'url('+backgroundImg+')' : 'url('+ require('../../common/img/bg.jpg') +')'}"></div>
    <div class="container">

      <div class="container_title" :style="listScroll ? 'display:none' : '' " v-if="titleContent" >
        <div class="c_t_detail">
          <div class="img gradient-wrap" >
            <img ref="img" :src="backgroundImg"  >
            <span class="playcount iconfont icon-bofang1 " v-if="songlist.playCount">{{songlist.playCount | formatNum}}</span>
          </div>
      <!--    <div class="img gradient-wrap" style="">
            <img ref="img" src="../../common/image/default.png"  cross-origin = "anonymous" >
          </div>-->
   <!--       <canvas class="img" ref="canvas">
          </canvas>-->
          <div class="text">
            <div class="text_t">{{songlist.name}}</div>
            <div class="text_c" v-if="songlist.creator" @click="goUser(songlist.creator.userId)">
              <img :src="songlist.creator.avatarUrl" alt="">
              <span>{{songlist.creator.nickname}}</span>
              <span class="iconfont icon-arrow-right"></span>
            </div>
            <div class="text_c" v-if="songlist.artist" @click="goUser(songlist.artist.id)">
              <img :src="songlist.artist.picUrl" alt="">
              <span>{{songlist.artist.name}}</span>
              <span class="iconfont icon-arrow-right"></span>
            </div>
            <div class="text_d">
              <div class="text_d_t">
                {{songlist.description}}
              </div>
              <div class="text_d_b iconfont icon-arrow-right">
              </div>
            </div>
          </div>
        </div>
        <div id="navbar" class="c_t_navbar">
          <ul>
            <li class="nav" @click="goComment()">
              <div class="icon iconfont icon-xiaoxi"></div>
              <div class="text " v-if="songlist">{{songlist.commentCount}}</div>
              <div class="text " v-else>{{songlist.info.commentCount}}</div>
            </li>
            <li class="nav ">
              <div class="icon iconfont icon-fenxiang"></div>
              <div class="text" v-if="songlist">{{songlist.shareCount}}</div>
              <div class="text" v-else>{{songlist.info.shareCount}}</div>
            </li>
            <li class="nav">
              <div class="icon iconfont icon-xiazai"></div>
              <div class="text">下载</div>
            </li>
            <li class="nav ">
              <div class="icon iconfont icon-duoxuan"></div>
              <div class="text">多选</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="container_title1"v-else>
        <div id="text" class="text">
          根据你的音乐口味，为你推荐好音乐，好朋友
        </div>
      </div>

      <div id="main" class="container_list" :class="[modeType ? '' : 'night', listScroll ? 'isFixed' :'isRelative']">
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
      </div>
    </div>

  </div>
</template>
<script>
import BScroll from 'better-scroll'
import Scroll from 'base/scroll/scroll'
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
      listScroll:false,
      isTop:false,
      pulldown: true,
      pullup:true,
    }
  },
  components: {
    BackHead,
    BScroll,
    Scroll
  },
  computed: {
    ...mapGetters([
      'modeType',
      'songlistId',
    ])
  },
  created () {
    if(this.$route.params.id){
      this.setSonglistId(this.$route.params.id)
    }
    this._getSonglist()
  },
  mounted () {
/*    this.drawCanvas()*/
  /*  window.addEventListener('load', function(){
      Grade(document.querySelectorAll('.gradient-wrap'))
    })*/
    document.addEventListener('scroll',this.listenScroll,false)

  },
  methods: {
    pullingUp() {
      console.log("上拉加载啊")
    },
    pullingDown(){
      this.isTop=false
      this.listScroll =false
      console.log(this.isTop)
    },
 /*   listScroll(pos){
     /!* console.log(pos)*!/
      this.scrollY = Math.abs(Math.round(pos.y));
      //判断滑动距离

      if(this.scrollY >600) {
        this.isScroll = true;
        console.log(this.scrolly)
      }else {
        this.isScroll = false;
   /!*     console.log(this.scrolly)*!/
      }

    },*/
    listenScroll() {

      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动高度
      var windowHeight = document.documentElement.clientHeight || document.body.clientHeight; //变量windowHeight是可视区的高度
      var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;//变量scrollHeight是滚动条的总高度


      /*bug啊！距离变化多端*/
      var mainOffsetTop = document.querySelector('#main').offsetTop -20
      if(scrollTop > mainOffsetTop && !this.isTop){
        console.log("到顶部")
        console.log(scrollTop)
        console.log(mainOffsetTop+80)
        this.listScroll = true
        this.isTop = true
      }else{
        // console.log(mainOffsetTop)
        // console.log(scrollTop)
      }

     /* var text = document.getElementById("text")
      var navbar = document.getElementById("navbar")
      var listWapper = document.getElementById("wrapper")
      var listSong = document.getElementById("list_song")
      var main = document.getElementById("main")*/

      /*this.preventDefault=false*/
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
    }),
    // handlePlaylist(playlist) {
    //   const bottom = playlist.length > 0 ? '60px' : ''
    //   this.$refs.list.$el.style.bottom = bottom
    //   this.$refs.list.refresh()
    // },
    goSongPlayer(item,index){
      console.log('item='+item)
      console.log('index='+index)
      util.setLocalData('songDetail',item)
     /* this.$router.push({
        path: '/player',
        name: 'player'
      })*/
      this.selectPlay({
        list: this.songlistDetail,
        index
      })
    },
    prev() {
      this.$router.go(-1)
    },
    _getSonglist() {
/*      if(this.$route.params.flag == "leaderboard"){
        /!*this.leaderboardFlag = true*!/
      }*/
      if(this.$route.params.flag === "leaderboard"){
        this.titleContent=true
        this.scrolly=300
        getToplistDetail(this.songlistId).then((res) => {
          console.log(res)
          this.songlist = res.data.playlist
          this.backgroundImg = this.songlist.coverImgUrl
          let songid = ""
          this.songlist.tracks.forEach(function (item,index) {
            songid +=item.id+","
          })
          this.ids = songid.slice(0,songid.length-1)
          this._getSongDetail()
        }).catch(err => {
          console.log(err)
        })
      }else if (this.$route.params.flag === "recommend"){
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
      }else if(this.$route.params.flag === "album"){
        getAlbum(this.songlistId).then(res => {
          console.log(res)
          this.songlist = res.data.album
          this.backgroundImg = this.songlist.blurPicUrl
          let songid = ""
          res.data.songs.forEach(function (item,index) {
            songid +=item.al.id+","
          })
          this.ids = songid.slice(0,songid.length-1)
          this._getSongDetail()
        }).catch(err => {
          console.log(err)
        })
      }
      else{
        this.titleContent=true
        this.scrolly = 150
   /*     const id = this.$route.params.id*/
        console.log(this.backheadUrl)
        getSonglistDetail(this.songlistId).then((res) => {
          console.log(res)
          this.songlist = res.data.playlist
          this.backheadUrl ='url(' + this.songlist.coverImgUrl + ')'
          this.backgroundImg = this.songlist.coverImgUrl
          console.log(this.songlist)
          let songid = ""
          this.songlist.tracks.forEach(function (item,index) {
            songid +=item.id+","
          })
          this.ids = songid.slice(0,songid.length-1)
          this._getSongDetail()
        }).catch(err => {
          console.log(err)
        })
      }

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
  /*  drawCanvas() {
      let canvas = this.$refs.canvas
      let ctx = canvas.getContext('2d');
      let r = 0
      let g = 0
      let b = 0
      //创建img元素
      var img = this.$refs.img
      img.crossOrigin = "anonymous"
      //保证img元素绘制完成
      img.onload = function () {
        ctx.drawImage(img, 25, 25,250,120);

        // 获取像素数据
        var data = ctx.getImageData(0, 0, img.width, img.height).data;

        // 取所有像素的平均值
        for (var row = 0; row < img.height; row++) {
          for (var col = 0; col < img.width; col++) {
            r += data[((img.width * row) + col) * 4];
            g += data[((img.width * row) + col) * 4 + 1];
            b += data[((img.width * row) + col) * 4 + 2];
          }
        }

        // 求取平均值
        r /= (img.width * img.height);
        g /= (img.width * img.height);
        b /= (img.width * img.height);

        // 将最终的值取整
        r = Math.round(r);
        g = Math.round(g);
        b = Math.round(b);

        this.color =  "rgb(" + r + "," + g + "," + b + ")"
        this.backgroundColor = "rgb(" + r + "," + g + "," + b + ")"
        console.log(this.backgroundColor)
      };


    },*/
    ...mapActions([
      'selectPlay',
      'randomPlay'
    ])

  },
  destroyed () {
    document.removeEventListener('scroll',this.listenScroll)
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
  .songlist_detail{
    width:100%
    .backhead{
      background-size:100%
    }
  }
  .background_color{
    position: relative
    left: 0
    top: -80px
    width: 100%
    height:660px
    background-repeat:no-repeat;
    background-size:cover;
/*    filter:blur(15px);*/
    filter:brightness(75%);
    &.night{
      filter:brightness(50%);
    }
  }
  .container{
    position: absolute
    left: 0
    top: 80px
    width: 100%
    color: $color-font1
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
    .container_list{
      position:relative
      left: 0
      top: -30px
      width: 100%
      height:auto
      border-top-left-radius:40px
      border-top-right-radius:40px
      border:1px solid $color-line
      color: $color-font2
      background: #fff
      &.night{
        background:$color-night-bg2
        border:none
      }
      &.isRelative{
        position: relative
      }
      &.isFixed{
        position:fixed;
        top:80px;
        z-index:999;
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

    }
  }
</style>
