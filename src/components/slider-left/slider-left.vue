<template>
  <drawer-layout
    ref="drawerLayout"
    @mask-click="handleMaskClick"
  >
    // 侧边栏内容
    <template v-slot:drawer >
      <div class="drawer">
        <div class="user" :class="modeType ? '' : 'night'">
          <div class="nologin" v-if="!isLogin">
            <p>登录网易云音乐</p>
            <p>手机电脑多端同步，尽享海量高品质音乐</p>
            <router-link tag="button" to="/" :class="modeType ? '' : 'night'">立即登录</router-link>
          </div>
          <div class="login" v-if="isLogin">
            <div class="avatar">
              <img :src="avatarUrl" alt="">
            </div>
            <div class="info">
              <div class="username">{{username}}</div>
              <div class="info_l" :class="modeType ? '' : 'night'">Lv.1</div>
              <div class="info_r">签到</div>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="usernav" :class="modeType ? '' : 'night'">
            <ul>
              <li class="nav ">
                <div class="icon iconfont icon-xiaoxi1"></div>
                <div class="text">我的消息</div>
              </li>
              <li class="nav ">
                <div class="icon iconfont icon-haoyou"></div>
                <div class="text">我的好友</div>
              </li>
              <li class="nav ">
                <div class="icon iconfont icon-huanfu"></div>
                <div class="text">个性换肤</div>
              </li>
              <li class="nav ">
                <div class="icon iconfont icon-huatong"></div>
                <div class="text">听歌识曲</div>
              </li>
            </ul>
          </div>
          <div class="line" :class="modeType ? '' : 'night'"></div>
          <div class="list" :class="modeType ? '' : 'night'">
            <ul>
              <li class="item">
                <span class="icon iconfont icon-huopiaotongxing"></span>
                <span class="text">演出</span>
                <span class="text_r">雅尼音乐会</span>
              </li>
              <li class="item">
                <span class="icon iconfont icon-icon01"></span>
                <router-link tag="span" to="/me" class="text">商城</router-link>
                <span class="text_r">真无线 59元</span>
              </li>
              <li class="item">
                <span class="icon iconfont icon-fujin"></span>
                <span class="text">附近的人</span>
              </li>
              <li class="item">
                <span class="icon iconfont icon-icon--"></span>
                <span class="text">口袋铃声</span>
              </li>
              <li class="item">
                <span class="icon iconfont icon-icon3"></span>
                <span class="text">我的订单</span>
              </li>
            </ul>
            <div class="line" :class="modeType ? '' : 'night'"></div>
            <ul>
              <li class="item">
                <span class="icon iconfont icon-time"></span>
                <span class="text">定时停止播放</span>
              </li>
              <li class="item">
                <span class="icon iconfont icon-saoma"></span>
                <span class="text">扫一扫</span>
              </li>
              <li class="item">
                <span class="icon iconfont icon-paidui"></span>
                <span class="text">音乐闹钟</span>
              </li>
              <li class="item">
                <span class="icon iconfont icon-liuliang"></span>
                <span class="text">在线听歌免流量</span>
              </li>
              <li class="item">
                <span class="icon iconfont icon-youxi"></span>
                <span class="text">游戏推荐</span>
              </li>
              <li class="item">
                <span class="icon iconfont icon-wodeyouhuijuan"></span>
                <span class="text">优惠券</span>
              </li>
              <li class="item">
                <span class="icon iconfont icon-zhibo"></span>
                <span class="text">我要直播</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer" :class="modeType ? '' : 'night'">
          <div class="item" @click="modeClick">
            <span class="icon iconfont " :class="modeType ? 'icon-yejianmoshi' : 'icon-rijianmoshi'"></span>
            <span v-if="modeType">夜间模式</span>
            <span v-else>日间模式</span>
          </div>
          <div class="item">
            <span class="icon iconfont icon-shezhi"></span>
            <router-link tag="span" to="/setting">设置</router-link>
          </div>
          <div class="item">
            <span class="icon iconfont icon-tuichu"></span>
            <span>退出</span>
          </div>
        </div>
      </div>
    </template>
    // 主体内容
    <template v-slot:content>
      <m-header  @icon-click="handleIconClick" :head_color="head_color"></m-header>
      <slot name="mainContainer" />
    </template>
  </drawer-layout>
</template>

<script>
  import DrawerLayout from 'base/drawer-layout/drawer-layout'
  import MHeader from 'components/m-header/m-header'
  import {mapGetters, mapMutations} from 'vuex'
  import {getUserDetail} from 'api/api'
  export default {
    name: 'slider-left',
    props: {
      head_color: {
        type: String,
        default: 'light'
      }
    },
    components: {
      DrawerLayout,
      'm-header':MHeader,
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
    },
    methods: {
      modeClick () {
        this.setModeType(!this.modeType)
      },
      handleIconClick () {
        console.info('icon-click')
        this.$refs.drawerLayout.toggle(true)
      },
      handleSlideStart () {
        console.info('slide-start')
      },
      handleMaskClick () {
        console.info('mask-click')
        this.$refs.drawerLayout.toggle(false)
      },
      ...mapMutations({
        setModeType: 'SET_MODE_TYPE',
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .drawer{
    position: absolute
    left: 0
    top: 0
    bottom: 0
    overflow-x: hidden
    overflow-y:scroll
    width: 100%
    &::-webkit-scrollbar {
      display: none;
    }
    .user{
      &.night{
        background:	#212222!important
      }
      width: 100%
      height:400px
      background:	#F7F7F7
      .nologin{
        width: 100%
        height: 100%
        text-align :center
        padding-top:80px
        p{
          text-align :center
          font-size:$font-size-small
          margin-top:20px
        }
        button{
          &.night{
            background:	#252629!important
            border:1px solid #4a4a4a!important
          }
          margin-top: 40px
          margin-bottom :60px
          background: 	#F7F7F7
          border:1px solid #ccc
          padding: 6px 40px
          border-radius :20px
        }
      }
      .login{
        width: 100%
        height: 100%
        .avatar{
          position: relative
          top: 0
          left: 0
          height:300px
          img{
            position: absolute
            bottom: 20px
            left: 20px
            width:150px
            height:150px
            border-radius :75px

          }
        }

        .info{
          box-sizing :border-box
          width: 100%
          height:100px
          padding:30px 20px
          .username{
            float: left
          }
          .info_l{
            float: left;
            height: 30px
            line-height :30px
            border-radius:15px
            background: #ccc
            padding: 2px 9px
            margin-left: 20px
            font-size:$font-size-small-s
            &.night{
              background: $color-font4!important
            }
          }
          .info_r{
            float: right;
            border-radius :25px
            border:1px solid #ccc
            padding: 9px 15px
            margin-top: -6px
            font-size:$font-size-small
          }
        }
      }
    }

    .content{
      display: inline-block
      &.night{
        background: #2a2a2b!important
      }
      width:100%
      height:auto
      display: inline-block
      .line{
        &.night{
          background: #4a4a4a!important
        }
        width: 100%
        height:1px
        background: #ccc
      }
      .usernav{
        display: inline-block
        width:100%
        padding: 0 5%
        padding-top:40px
        &.night{
          background: #262626!important
        }
        ul{
          .nav{
            float: left
            width: 84px
            height:100px
            margin:10px 25px
            text-align:center
            .icon{
              width:100%
              heihgt:auto
              color:$color-icon
              font-size: 40px
            }
            .text{
              width:100%
              height 40px;
              line-height: 40px
              margin-top: 10px
              font-size:$font-size-small
            }

          }
        }

      }
      .list{
        margin-top: -10px
        margin-bottom:80px
        &.night{
          background: #212427!important
        }
        ul{
          width:90%
          padding:0 5%
          .item{
            width: 100%
            heihgt:80px
            line-height :80px
            display:inline-block
            font-size: $font-size-medium
            .icon{
              float: left
              font-size:$font-size-large-x
            }
            .text{
              float: left
              margin-left:20px
            }
            .text_r{
              float: right
            }
          }
        }
      }
    }

    .footer{
      &.night{
        background:	#252629!important
        border-top:1px solid #252629!important
      }
      display: inline-block
      position: fixed
      bottom:0
      left:0
      right:0
      heihgt:80px
      background: #fff
      border-top:1px solid #ccc
      .item{
        display: inline-block
        height:80px
        line-height :80px
        margin:0 30px
        font-size:$font-size-medium
        .icon{
          font-size:$font-size-medium
        }
      }
    }
  }

</style>
