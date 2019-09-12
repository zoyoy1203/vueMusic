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
      <div class="container_b">
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
                <div>
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
          <div slot="slot-item-1">111111111</div>
          <div slot="slot-item-2">222222222222</div>
          <div slot="slot-item-3">
            <div class="container_b4">
              <div class="introduction">
                <p class="title">{{singerSongs.artist.name}}简介</p>
                <div class="introduction_text">
                  {{singerDesc.briefDesc}}
                </div>
                <router-link tag="p" to="/singerIntroduction" v-if="singerDesc.introduction.length && singerDesc.introduction" class="more_intro">完整歌手介绍 <span class="iconfont icon-arrow-right"></span></router-link>
              </div>
            </div>
          </div>
        </swiper-list>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import BackHead from 'base/back-head/back-head'
  import SwiperList from 'base/swiper_list/swiper_list'
  import { getSingerSong, getSingerMv, getSingerAlbum, getSingerDesc} from 'api/api'
  export default {
    name: 'singer',
    components:{
      BackHead,
      SwiperList,
    },
    data() {
      return{
        singerDesc:null,
        singerSongs:null,
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
    created () {
      this._getSingerDesc()
      this._getSingerSong()
      this._getSingerMv()
      this._getSingerAlbum()
    },
    computed:{
      ...mapGetters([
        'modeType',
        'singerId',
      ])
    },
    methods:{
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
        }).catch(err => {
          console.log(err)
        })
      },
      _getSingerAlbum() {
        getSingerAlbum(this.singerId,this.offset,this.limit).then(res => {
          console.log(res)
          this.offset +=this.limit
        }).catch(err => {
          console.log(err)
        })
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
      .container_b0{
        .list-wrapper{
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
      .container_b4{
        width: 100%
        height:250px
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
      }
    }
  }
}
</style>
