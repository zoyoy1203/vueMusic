<template>
  <div class="singer_container">
    <back-head ico_color="#fff" ico1="" ico2="icon-fenxiang"></back-head>
    <div class="background">
      <img :src="singerSongs.artist.img1v1Url" alt="">
    </div>
    <div class="container">
      <div class="container_t">
        <div class="singer_detail">
          <p>{{singerSongs.artist.name}}(<span v-if="singerSongs.artist.alias[0]">{{singerSongs.artist.alias[0]}}</span>)</p>
          <span class="collection_tag iconfont icon-jiahao">收藏</span>
          <span class="user_tag iconfont icon-ren-copy">个人主页</span>
        </div>
      </div>
      <div class="container_b" id="main"  :class="[modeType ? '' : 'night', listScroll ? 'isFixed' :'isRelative']">
        <swiper-list :navList="navList">
          <div slot="slot-item-0">
            <div class="container_b0">
              <scroll  ref="scroll"
                       :listenScroll="ifScroll"
                       :preventDefault="preventDefault"
                       :pulldown="pulldown"
                       :pullup="pullup"
                       @pullingDown="pullingDown"
                       @pullingUp="pullingUp"
                       id="wrapper" class="list-wrapper" >
                <div class="list-wrapper_c">
                  <div class="navbar">
                    <span class="navbar_l iconfont icon-shoucang"></span>
                    <span class="navbar_l">收藏热门50单曲</span>
                    <span class="navbar_r">管理</span>
                    <span class="navbar_r iconfont icon-liebiao"></span>
                  </div>
                  <ul id="list_song" class="list_song">
                    <li @click="goSongPlayer(item,index)" class="item" v-for="(item, index) in singerSongs.hotSongs" :key="index">
                      <div class="index">{{index+1}}</div>
                      <div class="song_title">
                        <div class="song_title_t">{{item.name}}</div>
                        <div class="song_title_b">{{item.ar[0].name}}-{{item.al.name}}</div>
                      </div>
                      <div class="icon iconfont icon-more-vertical"></div>
                      <div class="icon iconfont icon-bofang"></div>
                    </li>
                  </ul>
                </div>

              </scroll>
            </div>
          </div>
          <div slot="slot-item-1">
            <div class="container_b1">
              <scroll  ref="scroll"
                       :listenScroll="ifScroll"
                       :preventDefault="preventDefault"
                       :pulldown="pulldown"
                       :pullup="pullup"
                       @pullingDown="pullingDown"
                       @pullingUp="pullingUp"
                       id="wrapper1" class="list-wrapper" >
                <div class="list-wrapper_c">
                  <div class="navbar">
                    <span class="navbar_l">按发行时间排序</span>
                    <span class="navbar_r">排序</span>
                    <span class="navbar_r iconfont icon-liebiao"></span>
                  </div>
                  <ul id="list_album" class="list_album">
                    <li @click="goSonglistDetail(item.id)" class="item" v-for="(item, index) in singerAlbum" :key="index">
                      <div class="img">
                        <img :src="item.picUrl" alt="">
                      </div>
                      <div class="song_title">
                        <div class="song_title_t">{{item.name}}</div>
                        <div class="song_title_b">{{item.publishTime | formatDate()}} 歌曲 {{item.size}}</div>
                      </div>
                    </li>
                  </ul>
                </div>

              </scroll>
            </div>
          </div>
          <div slot="slot-item-2">
            <div class="container_b2">
              <scroll  ref="scroll"
                       :listenScroll="ifScroll"
                       :preventDefault="preventDefault"
                       :pulldown="pulldown"
                       :pullup="pullup"
                       @pullingDown="pullingDown"
                       @pullingUp="pullingUp"
                       id="wrapper2" class="list-wrapper" >
                <div class="list-wrapper_c">
                  <div class="navbar">
                    <span class="navbar_l">全部</span>
                    <span class="navbar_r">MV</span>
                  </div>
                  <ul id="list_mv" class="list_mv">
                    <li @click="" class="item"
                        v-for="(item, index) in singerMvDetail"
                        @click="goVideo(item.id)"
                        :key="index">
                      <div class="img">
                        <img :src="item.cover" alt="">
                        <span class="iconfont icon-bofang1">{{item.playCount | formatNum}}</span>
                      </div>
                      <div class="song_title">
                        <div class="song_title_t">{{item.name}}</div>
                        <div class="song_title_b">{{item.publishTime}}</div>
                      </div>
                    </li>
                  </ul>
                </div>

              </scroll>
            </div>
          </div>
          <div slot="slot-item-3">
            <div class="container_b3">
              <div class="introduction">
                <p class="title">{{singerSongs.artist.name}}简介</p>
                <div class="introduction_text">
                  {{singerDesc.briefDesc}}
                </div>
                <router-link tag="p" to="/singerIntroduction" v-if="singerDesc.introduction.length && singerDesc.introduction" class="more_intro">完整歌手介绍 <span class="iconfont icon-arrow-right"></span></router-link>
              </div>
              <div class="simi_singer">
                <p class="title">相似歌手</p>
           <!--     <ul class="list">
                  <li @click="" class="item" v-for="(item, index) in simiSingers" :key="index">
                    <img :src="item.img1v1Url" alt="">
                    <div class="song_title">
                      <div class="song_title_t">{{item.name}}</div>
                    </div>
                  </li>
                </ul>-->
              </div>

            </div>
          </div>
        </swiper-list>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import util from 'api/util'
  import {formatDate} from 'common/js/date'
  import BackHead from 'base/back-head/back-head'
  import SwiperList from 'base/swiper_list/swiper_list'
  import SliderBar2 from 'base/slider/slider-bar2'
  import Scroll from 'base/scroll/scroll'
  import { getSingerSong, getSingerMv, getMvDetail, getSingerAlbum, getSingerDesc} from 'api/api'
  export default {
    name: 'singer',
    components:{
      BackHead,
      SwiperList,
      Scroll
    },
    data() {
      return{
        singerDesc:null,
        singerSongs:null,
        singerAlbum:[],
        singerMv:[],
        singerMvDetail:[],
        simiSingers:[],
        navList:[
          {name:'热门单曲'},
          {name:'专辑'},
          {name:'视屏'},
          {name:'艺人信息'}
        ],
        offset:0,
        limit:20,
        ifScroll:true,
        preventDefault:false,
        listScroll:false,
        isTop:false,
        pulldown: true,
        pullup:true,
      }
    },
    mounted() {
      document.addEventListener('scroll',this.listenScroll,false)
    },
    created () {
      this._getSingerDesc()
      this._getSingerSong()
      this._getSingerMv()
      this._getSingerAlbum()
      this._getSimiSinger()
    },
    computed:{
      ...mapGetters([
        'modeType',
        'singerId',
      ])
    },
    methods:{
      goVideo(vid) {
        this.$router.push({
          path:'/video',
          name:'video',
          params:{
            vid:vid,
            tag:'mv'
          }
        })
      },
      _getSimiSinger(){
        getSimiSinger(this.singerId).then(res => {
          this.simiSingers = res.data.artists
          console.log(this.simiSingers)
        }).catch(err => {
          console.log(err)
        })
      },
      goSonglistDetail(id) {
        this.$router.push({
          path: '/songlistdetail',
          name: 'songlistdetail',
          params: {
            id: id,
            flag:'album',
          }
        })
      },
      ...mapActions([
        'selectPlay',
        'randomPlay'
      ]),
      pullingUp() {
        console.log("上拉加载啊")
      },
      pullingDown(){
        this.isTop=false
        this.listScroll =false
        console.log(this.isTop)
      },
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
        /*  console.log(mainOffsetTop)
          console.log(scrollTop)*/
        }

        /* var text = document.getElementById("text")
         var navbar = document.getElementById("navbar")
         var listWapper = document.getElementById("wrapper")
         var listSong = document.getElementById("list_song")
         var main = document.getElementById("main")*/

        /*this.preventDefault=false*/
      },
      goSongPlayer(item,index){
        console.log('item='+item)
        console.log('index='+index)
        util.setLocalData('songDetail',item)
        /* this.$router.push({
           path: '/player',
           name: 'player'
         })*/
        this.selectPlay({
          list: this.singerSongs.hotSongs,
          index
        })
      },
      _getSingerMvDetail(id) {
        getMvDetail(id).then(res => {
       /*   console.log(res)*/
          this.singerMvDetail.push(res.data.data)
        }).catch(err => {
          console.log(err)
        })
      },
      _getSingerDesc() {
        getSingerDesc(this.singerId).then(res => {
          console.log(res)
          this.singerDesc = res.data
        }).catch(err => {
          console.log(err)
        })
      },
      _getSingerSong() {
        getSingerSong(this.singerId).then(res => {
          console.log(res)
          this.singerSongs = res.data
          console.log(singerSongs.artist.img1v1Url)
        }).catch(err => {
          console.log(err)
        })
      },
      _getSingerMv(){
        getSingerMv(this.singerId).then(res => {
          console.log(res)
          this.singerMv = res.data.mvs
          var that = this
          this.singerMv.forEach(function (item, index) {
            that._getSingerMvDetail(item.id)
          })
          console.log(this.singerMvDetail)
        }).catch(err => {
          console.log(err)
        })
      },
      _getSingerAlbum() {
        getSingerAlbum(this.singerId,this.offset,this.limit).then(res => {
          console.log(res)
          this.singerAlbum = res.data.hotAlbums
          this.offset +=this.limit
        }).catch(err => {
          console.log(err)
        })
      }
    },
    destroyed () {
      document.removeEventListener('scroll',this.listenScroll)
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd');
      },
      formatNum(num) {
        num = num > 9999 ?  parseInt(num/10000) + "万" : num
        return num
      }
    }
  }
</script>

<style lang="stylus" scoped>
.singer_container{
  .background{
    position: relative
    top:-80px
    left:0
    width: 100%
    height:auto
    img{
      width: 100%
      height:100%
      filter :brightness(80%)
    }
  }
  .container{
    position: absolute
    top:80px
    left:0
    width: 100%
    height:auto
    .container_t{
      position: relative
      width: 100%
      height:450px
      .singer_detail{
        position: absolute
        box-sizing:border-box
        bottom:0
        left:0
        width: 100%
        padding:0 5%
        height:200px
        p{
          font-size:$font-size-large-x
          color: #ffffff
        }
        .user_tag,.collection_tag{
          float: right;
          margin-left:10px
          border-radius :30px
          border:1px solid #ffffff
          padding:10px 15px
          color: #fff
          margin-top:40px
          font-size:$font-size-medium
        }
        .collection_tag{
          background: $color-icon
        }

      }
    }
    .container_b{
      position:relative
      left: 0
      top: -30px
      width: 100%
      height:auto
      border-top-left-radius:40px
      border-top-right-radius:40px
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
      .container_b0{
        .list-wrapper{
          width:100%
          height:1200px
          overflow :hidden
          .list-wrapper_c{
            width: 100%
            height:auto
            .navbar{
              box-sizing :border-box
              width: 100%
              padding: 0 5%
              height:80px
              line-height:80px
              .iconfont{
                font-size:$icon-size-small-x
                padding-right:10px
              }
              .navbar_r{
                float:right
              }
              .navbar_l{
                float: left
              }
            }
            .list_song{
              display: inline-block
              width: 100%
              height:auto
              padding:0
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
                  width:auto
                  max-width :450px
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
                    font-size:$font-size-small-x
                    overflow:hidden
                    text-overflow:ellipsis
                    white-space:nowrap
                  }

                }
                .icon{
                  float: right
                  width:80px
                  height:80px
                  line-height:80px
                  font-size:$font-size-large-x
                }
              }
            }
          }

        }
      }
      .container_b1{
        .list-wrapper{
          width:100%
          height:1200px
          overflow :hidden
          .list-wrapper_c{
            width: 100%
            height:auto
            .navbar{
              box-sizing :border-box
              width: 100%
              padding: 0 5%
              height:80px
              line-height:80px
              .iconfont{
                font-size:$icon-size-small-x
                padding-right:10px
              }
              .navbar_r{
                float:right
              }
              .navbar_l{
                float: left
              }
            }
            .list_album{
              display: inline-block
              width: 100%
              height:auto
              padding:0
              .item{
                box-sizing :border-box
                display: inline-block
                width: 100%
                heihgt:100px
                margin:20px 0
                padding:0 5%
                .img{
                  float: left
                  width:100px
                  height:100px
                  img{
                    width: 100%
                    height:100%
                  }
                }
                .song_title{
                  float: left
                  display:inline-block
                  width:auto
                  max-width :450px
                  height:80px
                  margin:10px 0 10px 20px
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
                    font-size:$font-size-small-x
                    overflow:hidden
                    text-overflow:ellipsis
                    white-space:nowrap
                  }

                }
              }
            }
          }

        }
      }
      .container_b2{
        .list-wrapper{
          width:100%
          height:1200px
          overflow :hidden
          .list-wrapper_c{
            width: 100%
            height:auto
            .navbar{
              box-sizing :border-box
              width: 100%
              padding: 0 5%
              height:80px
              line-height:80px
              .navbar_r{
                float:right
              }
              .navbar_l{
                float: left
              }
            }
            .list_mv{
              display: inline-block
              width: 100%
              height:auto
              padding:0
              .item{
                box-sizing :border-box
                display: inline-block
                width: 100%
                heihgt:150px
                margin:40px 0
                padding:0 5%
                .img{
                  position: relative
                  float: left
                  width:250px
                  height:150px
                  img{
                    width: 100%
                    height:100%
                  }
                  span{
                    position: absolute
                    top:10px
                    right:10px
                    color: #fff
                  }
                }
                .song_title{
                  float: left
                  display:inline-block
                  width:auto
                  max-width :350px
                  height:80pxr
                  margin:30px 0 10px 20px
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
                    font-size:$font-size-small-x
                    overflow:hidden
                    text-overflow:ellipsis
                    white-space:nowrap
                  }

                }
              }
            }
          }

        }
      }
      .container_b3{
        width: 100%
        height:auto
        padding-top:20px
        .introduction{
          box-sizing :border-box
          width: 100%
          padding:0 5%
          height:250px
          .title{
            font-size:$font-size-large
            margin-bottom:20px
          }
          .introduction_text{
            width: 100%
            height:auto
            line-height:40px
            font-size:$font-size-medium
            color: $color-font8
            margin-bottom:10px
          }
          .more_intro{
            text-align :center
            font-size:$font-size-small-x
            color: $color-font4
          }
        }
        .simi_singer{
          .list{
            display: inline-block
            width:2000px
            height:180px
            overflow-x :scroll
            overflow-y : hidden
            white-space : nowrap
            .item{
              float: left
              width:150px
              height: 100%
              img{
                width:150px
                height:150px

              }
            }
          }
        }
      }

    }
  }
}
</style>
