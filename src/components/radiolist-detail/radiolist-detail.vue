<template>
    <div class="container">
      <back-head title="电台"></back-head>

     <!-- <div class="background_color"   :style="{'background':titleContent ? 'url('+songlist.coverImgUrl+')' : 'url('+ require('../../common/img/bg.jpg') +')'}"></div>-->
    <!--  <div class="container">

        <div class="container_title" v-if="titleContent">
          <div class="c_t_detail">
            <div class="img gradient-wrap" >
              <img ref="img" :src="songlist.coverImgUrl"  >
              <span class="playcount iconfont icon-bofang1 ">{{songlist.playCount | formatNum}}</span>
            </div>
            &lt;!&ndash;    <div class="img gradient-wrap" style="">
                  <img ref="img" src="../../common/image/default.png"  cross-origin = "anonymous" >
                </div>&ndash;&gt;
            &lt;!&ndash;       <canvas class="img" ref="canvas">
                   </canvas>&ndash;&gt;
            <div class="text">
              <div class="text_t">{{songlist.name}}</div>
              <div class="text_c" @click="goUser(songlist.creator.userId)">
                <img :src="songlist.creator.avatarUrl" alt="">
                <span>{{songlist.creator.nickname}}</span>
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
                <div class="text">{{songlist.commentCount}}</div>
              </li>
              <li class="nav ">
                <div class="icon iconfont icon-fenxiang"></div>
                <div class="text">{{songlist.shareCount}}</div>
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

        <div id="main" class="container_list" :class="modeType ? '' : 'night'">
          <div class="list_title">
            <div class="list_title_icon iconfont icon-bofang"></div>
            <div class="list_title_t">播放全部  <span>(共{{songlist.trackCount}}首)</span></div>
            <div class="list_save">
              <span class="icon iconfont icon-jiahao"></span>
              收藏
              <span>({{songlist.subscribedCount}})</span>
            </div>
          </div>
          <div  ref="wrapper" class="list-wrapper">
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
          </div>
        </div>
      </div>
-->


    </div>
</template>

<script>
  import BackHead from 'base/back-head/back-head'
  import { getDjDetail} from 'api/api'
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    name: 'radiolist-detail',
    components:{
      BackHead,
    },
    data() {
      return{

      }
    },
    created () {
      this.setRadioId(this.$route.params.id)
      console.log(this.$route.params.id)

      this._getDjDetail()
    },
    computed: {
      ...mapGetters([
        'modeType',
        'radioId',
      ])
    },
    methods:{
      _getDjDetail(){
        getDjDetail(this.radioId).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
      ...mapMutations({
        setRadioId: 'SET_RADIO_ID',
      })
    }
  }
</script>

<style lang="stylus" scoped>
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
              width:490px
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
