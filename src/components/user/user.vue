<template>
  <div class="user">
    <back-head ico_color="#000" ico1="" ico2="icon-fenxiang"></back-head>
    <div class="background" v-if="profile">
      <img :src="profile.backgroundUrl" alt="">
    </div>
    <div class="container">
      <div class="container_t">
        <div class="container_t_t">
          <div class="container_t_t_l"  v-if="profile">
            <img :src="profile.avatarUrl" alt="">
          </div>
          <div class="container_t_t_r">
            <span class="attention">
              <span class="iconfont icon-jiahao"></span>
              关注
            </span>
            <span class="icon iconfont icon-xiaoxi1"></span>
          </div>
        </div>
        <div class="container_t_b"  v-if="profile && allAuthTypes">
          <p class="name">{{profile.nickname}}</p>
          <p v-if="allAuthTypes">{{allAuthTypes[0].desc}}</p>
          <p class="num">
            <span>关注</span>
            <span>{{profile.follows}}</span>
            <span>|</span>
            <span>粉丝</span>
            <span>{{profile.followeds | formatNum}}</span>
          </p>
          <p class="level">
            <span>Lv.{{userDetail.level}}</span>
          </p>
        </div>
      </div>
      <div class="container_b" id="main" :class="[modeType ? '' : 'night', listScroll ? 'isFixed' :'isRelative']">

        <div class="navlist">
          <ul>
            <li class="navli"  v-for="(item,index) in navList" @click="tabClick(index)"><i :class="{'activeT':nowIndex===index}" >{{item.name}}</i>
            </li>
          </ul>
        </div>
        <div  class="swiper-container ">
          <div class="swiper-wrapper">
            <!-- 第一个swiper -->
            <div class="swiper-slide" ref="viewBox">
              <scroll ref="scroll"
                        :listenScroll="ifScroll"
                        :preventDefault="preventDefault"
                        :pulldown="pulldown"
                        :pullup="pullup"
                        @pullingDown="pullingDown"
                        @pullingUp="pullingUp"
                        class="list-wrapper" >
                  <div>
                    <div class="title">
                      <span class="name">电台</span>
                      <span class="num">{{djList .length}}</span>
                    </div>
                    <ul>
                      <li class="item" v-for="(item, index) in djList ">
                        <div class="item_l">
                          <img :src="item.coverUrl" alt="">
                        </div>
                        <div class="item_r">
                          <p class="name">{{item.name}}</p>
                          <p class="text">
                            <span>{{item.likedCount}}人喜欢</span>
                            <span>{{item.listenerCount}}人订阅</span>
                          </p>
                        </div>
                      </li>
                    </ul>

                    <div class="title">
                      <span  class="name">歌单</span>
                      <span  class="num">{{songList.length}}</span>
                    </div>
                    <ul>
                      <li class="item" v-for="(item, index) in songList">
                        <div class="item_l">
                          <img :src="item.coverImgUrl" alt="">
                        </div>
                        <div class="item_r">
                          <p class="name">{{item.name}}</p>
                          <p class="text">
                            <span>{{item.trackCount}}首</span>
                            <span>播放{{item.playCount}}次</span>
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>

                </scroll>
            </div>
            <!-- 第二个swiper -->
            <div class="swiper-slide">
              <scroll ref="scroll"
                      :listenScroll="ifScroll"
                      :preventDefault="preventDefault"
                      :pulldown="pulldown"
                      @pullingDown="pullingDown"
                      @pullingUp="pullingUp"
                      class="list-wrapper2" >
                    <ul>
                      <li class="item" v-for="(item, index) in userEvent">
                        <div class="item_l">
                          <img :src="item.user.avatarUrl" alt="">
                        </div>
                        <div class="item_r">
                          <p class="name">{{item.user.nickname}} 发：</p>
                          <p class="time">{{item.showTime | formatDate}}</p>
                          <div class="text">
                            {{item.info.commentThread.resourceTitle}}
                          </div>
                          <div class="img" v-if="item.pics.length>0">
                            <img :src="item.pics[0].originUrl" alt="">
                          </div>
                          <div class="forwarded">

                          </div>
                          <div class="tag">
                            <div class="tag_c">
                              <i class="iconfont icon-shunxubofang"></i>
                              <span v-if="item.insiteForwardCount != '0'"> {{item.insiteForwardCount}}</span>
                              <span v-else>转发</span>
                            </div>
                            <div class="tag_c">
                              <i class="iconfont icon-xiaoxi"></i>
                              <span v-if="item.info.commentCount != '0'"> {{item.info.commentCount}}</span>
                              <span v-else>回复</span>
                            </div>
                            <div class="tag_c">
                              <i class="iconfont icon-dianzan"></i>
                              <span v-if="item.info.likedCount != '0'"> {{item.info.likedCount}}</span>
                              <span v-else>点赞</span>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
              </scroll>
            </div>
            <div class="swiper-slide">
              <scroll ref="scroll"
                      :listenScroll="ifScroll"
                      :preventDefault="preventDefault"
                      :pulldown="pulldown"
                      @pullingDown="pullingDown"
                      @pullingUp="pullingUp"
                      class="list-wrapper3" >
                <div class="content">
                  <div class="title">认证信息</div>
                  <ul v-if="allAuthTypes">
                    <li v-for="(item, index) in allAuthTypes">
                      {{item.desc}}
                    </li>
                  </ul>
                  <div class="title">个人信息</div>
                  <p>等级 {{userDetail.level}}</p>
                  <div class="social_account" v-if="item.url.length>0" v-for="(item, index) in userDetail.bindings">
                    <span>社交账号</span>
                    <a :href="item.url" >
                      链接
                    </a>
                  </div>
                  <div class="title">个人介绍</div>
                  <div class="text" v-if="profile">
                    {{profile.signature}}
                  </div>

                </div>
              </scroll>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import Swiper from 'swiper'
  import Scroll from 'base/scroll/scroll'
  import BackHead from 'base/back-head/back-head'
  import {mapGetters, mapMutations} from 'vuex'
  import {getUserDetail, getUserDj, getUserSonglist, getUserEvent} from 'api/api'
  import {formatDate} from 'common/js/date'
  export default {
    name: 'user',
    components:{
      BackHead,
      Scroll
    },
    data() {
      return{
        mySwiper:'',
        nowIndex:0,
        uid:null,
        userDetail:[],
        navList:[
          {name:'音乐'},
          {name:'动态'},
          {name:'关于TA'}
        ],
        djList:[],
        songList:[],
        userEvent:[],
        ifScroll:true,
        preventDefault:false,
        listScroll:false,
        isTop:false,
        pulldown: true,
        pullup:true,
        offset:0,
        limit:20,
        profile:null,
        allAuthTypes:null,
      }
    },
    created () {
      if(this.$route.params.uid){
        this.setOtherUserId(this.$route.params.uid)
      }
      this._getUserDetail(this.otherUserId)
      this._getUserDj()
      this._getUserSonglist()
      this._getUserEvent()
    },
    computed: {
      ...mapGetters([
        'modeType',
        'otherUserId'
      ])
    },
    mounted() {
      document.addEventListener('scroll',this.listenScroll,false)

    },
    methods: {
      pullingUp() {
        console.log("上拉加载啊")
        this._getUserSonglist()
      },
      pullingDown(){
        this.isTop=false
        this.listScroll =false
        console.log(this.listScroll )
      },
      listenScroll() {

        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动高度
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight; //变量windowHeight是可视区的高度
        var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;//变量scrollHeight是滚动条的总高度

        var mainOffsetTop = document.querySelector('#main').offsetTop
        if(scrollTop > mainOffsetTop && !this.isTop){
          console.log("到顶部")
          console.log(scrollTop)
          console.log(mainOffsetTop+80)
          this.listScroll = true
          this.isTop = true
        }

        var text = document.getElementById("text")
        var navbar = document.getElementById("navbar")
        var listWapper = document.getElementById("wrapper")
        var listSong = document.getElementById("list_song")
        var main = document.getElementById("main")

        /* this.preventDefault=false*/
      },
      initSwiper(){
        var that=this
        that.mySwiper = new Swiper('.swiper-container',{
          initialSlide:0,
          autoplay:false,
          keyboardControl:true,
          autoHeight:true,
          observer:true,
          observeParents:true,
          //引入的swiper为3之后的版本
          onSlideChangeStart:function(){
            // console.log(that.mySwiper.activeIndex)
            that.nowIndex=that.mySwiper.activeIndex
          },
          //引入的版本为4之后的版本
          on: {
            slideChangeTransitionStart: function() {
              that.nowIndex = that.mySwiper.activeIndex
            },
          },
        });
      },
      tabClick(index){
        this.nowIndex = index
        this.mySwiper.slideTo(index,1000,false)
      },
      _getUserDj() {
        getUserDj(this.otherUserId).then(res => {
          console.log(res)
          this.djList = res.data.programs
        }).catch(err => {
          console.log(err)
        })
      },
      _getUserSonglist() {
        var that = this
        getUserSonglist(this.otherUserId,this.offset,this.limit).then(res => {
          console.log(res)

          let list = res.data.playlist
          list.forEach(function (item) {
            that.songList.push(item)
          })
          console.log(this.songList)
          this.offset += this.limit

        }).catch(err => {
          console.log(err)
        })
      },
      _getUserDetail(uid){
        getUserDetail(uid).then(res => {
          console.log(res)
          this.userDetail = res.data
          this.profile = this.userDetail.profile
          this.allAuthTypes = this.profile.allAuthTypes
          console.log(this.userDetail)
        }).catch(err => {
          console.log(err)
        })
      },
      _getUserEvent(){
        getUserEvent(this.otherUserId).then(res => {
          console.log(res)
          this.userEvent = res.data.events
        }).catch(err => {
          console.log(err)
        })
      },
      ...mapMutations({
        setOtherUserId: 'SET_OTHER_USER_ID',
      }),
    },
    watch: {
      songList(val) {
        this.$nextTick(() => {
          this.initSwiper()
        })
      }
    },
    destroyed () {
      document.removeEventListener('scroll',this.listenScroll)
    },
    filters: {
      formatNum(num) {
        num = num > 9999 ?  (num/10000).toFixed(1) + "万" : num
        return num
      },
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    }
  }
</script>
<style lang="stylus" scoped>
.user{
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
      width: 100%
      height:500px
      .container_t_t{
        width: 90%
        margin: 0 auto
        height:300px
        line-height:300px
        .container_t_t_l{
          float: left
          width: 60%
          height:300px
          line-height:300px
          img{
            float: left;
            width:160px
            height:160px
            margin: 70px auto
            border-radius :80px
          }
        }
        .container_t_t_r{
          float: left;
          width: 40%
          height:300px
          line-height:300px
          text-align :right
          .attention{
            background:$color-icon2
            color: $color-font1
            padding:15px 25px
            border-radius :10px
            margin-right:10px
            .iconfont{
              font-size:$font-size-medium
            }
          }
          .icon{
            font-size:$font-size-medium
            padding:15px
            border-radius :10px
            background: rgba(192,192,192,0.7)
            color: $color-font1
          }
        }

      }
      .container_t_b{
        width: 90%
        height:200px
        margin:0 auto
        color: $color-font1
        p{
          height:40px
          line-height:40px
          font-size:$font-size-small
          color: $color-font7
          &.name{
            color:$color-font1
            font-size:$font-size-medium-x
          }
          &.num{
            span{
              margin-right:10px
            }
          }
          &.level{
            span{
              padding:6px 10px
              background: rgba(192,192,192,0.7)
              border-radius :20px
            }
          }
        }
      }
    }
    .container_b{
      width: 100%
      height:100%
      border-top-left-radius:40px
      border-top-right-radius:40px
      background: #fff
      &.isRelative{
        position: relative
      }
      &.isFixed{
        position:fixed;
        background-color:#Fff;
        top:80px;
        z-index:999;
      }
      .navlist{
        width:100%;
        height:80px;
        border-bottom:1px solid rgba(151,151,151,0.1);
        position:relative;
        .navli{
          width: 33%
          text-align:center;
          float:left;
          line-height:80px
          height:80px
          i{
            height: 80px
            font-style: normal;
            font-size: $font-size-medium
            &.activeT{
              color:$color-font3
              padding-bottom: .3rem;
              border-bottom: 4px solid $color-font3
            }
          }
        }
      }

      .swiper-container{
        .swiper-wrapper{
          .swiper-slide{
            .list-wrapper{
              width: 100%
              height:1134px
              .title{
                width: 100%
                padding: 0 5%
                height:60px
                line-height:60px
                .name{
                  font-weight:500
                  font-size:$font-size-medium
                }
                .num{
                  color: $color-font4
                  font-size:$font-size-small
                }
              }
              ul{
                width: 100%
                padding: 0 5%
                .item{
                  display: inline-block
                  width: 100%
                  height:150px
                  .item_l{
                    float: left;
                    width:150px
                    height:100%
                    img{
                      width: 100%
                      height:100%
                    }
                  }
                  .item_r{
                    float: left;
                    width:500px
                    height:150px
                    margin-left:20px
                    p{
                      &.name{
                        width: 100%
                        height:40px
                        line-height:40px
                        font-size:$font-size-medium
                        margin-top:40px
                        overflow:hidden
                        text-overflow :ellipsis
                        white-space:nowrap
                      }
                      &.text{
                        height:30px
                        line-height:30px
                        font-size:$font-size-small-x
                        color: $color-font4
                      }
                    }
                  }
                }
              }
            }

            .list-wrapper2{
              width: 100%
              height:1134px
              ul{
                width: 100%
                padding:0 5%
                .item{
                  display: inline-block
                  width: 100%
                  height:auto
                  border-bottom:1px solid $color-line1
                  margin-bottom:30px
                  margin-top:30px
                  .item_l{
                    float: left;
                    img{
                      width:70px
                      height:70px
                      border-radius :35px
                    }
                  }
                  .item_r{
                    float: left;
                    width:600px
                    padding-left:20px
                    .name{
                      height: 40px
                      line-height: 40px
                      font-size:$font-size-medium
                    }
                    .time{
                      height: 30px
                      line-height: 30px
                      font-size:$font-size-small
                    }
                    .text{
                      height:auto
                      line-height: 40px
                      font-size:$font-size-medium
                    }
                    .img{
                      width: 100%
                      height:300px
                      img{
                        width:200px
                        height:200px
                      }
                    }
                    .tag{
                      display: inline-block
                      width: 100%
                      height:100px
                      line-height:100px
                      .tag_c{
                        float: left
                        margin-right:70px
                        i{
                          font-size:$icon-size-small-x

                        }
                      }
                    }
                  }
                }
              }
            }
            .list-wrapper3{
              .content{
                width: 100%
                padding:0 5%
                .title{
                  height:80px
                  line-height:80px
                  font-size:$font-size-medium
                  font-weight:600
                }
              }
            }
          }
        }
      }

    }
  }
}
</style>
