<template>
  <div class="user">
    <back-head ico_color="#fff" ico1=""></back-head>
    <div class="background">
      <img :src="userDetail.profile.backgroundUrl" alt="">
    </div>
    <div class="container">
      <div class="container_t">
        <div class="container_t_t">
          <div class="container_t_t_l">
            <img :src="userDetail.profile.avatarUrl" alt="">
          </div>
          <div class="container_t_t_r">
            <span class="attention">
              <span class="iconfont icon-jiahao"></span>
              关注
            </span>
            <span class="icon iconfont icon-xiaoxi1"></span>
          </div>
        </div>
        <div class="container_t_b">
          <p class="name">{{userDetail.profile.nickname}}</p>
          <p>{{userDetail.profile.allAuthTypes[0].desc}}</p>
          <p class="num">
            <span>关注</span>
            <span>{{userDetail.profile.follows}}</span>
            <span>|</span>
            <span>粉丝</span>
            <span>{{userDetail.profile.followeds | formatNum}}</span>
          </p>
          <p class="level">
            <span>Lv.{{userDetail.level}}</span>
          </p>
        </div>
      </div>
      <div class="container_b">

        <div class="navList" :class="modeType ? '' : 'night'">
          <ul>
            <li  v-for="(item, index) in title" :key="index"  @click="liseGo(index)">
          <span class="tag" :class="{myColor:index==isActive}">
            {{item.name}}
          </span>
            </li>
          </ul>
        </div>
        <!--内容-->
        <div class="mainContent" :class="modeType ? '' : 'night'">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item, index) in title" :key="index">
                {{item.name}}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import Swiper from 'swiper'
  import BackHead from 'base/back-head/back-head'
  import {mapGetters, mapMutations} from 'vuex'
  import {getUserDetail} from 'api/api'
  export default {
    name: 'user',
    components:{
      BackHead
    },
    data() {
      return{
        mySwiper: '',
        isActive: 0,
        uid:null,
        userDetail:[],
        title:[
          {name: "音乐"},
          {name: "动态"},
          {name: "关于TA"},

        ]
      }
    },
    created () {
      if(this.$route.params.uid){
        this.setOtherUserId(this.$route.params.uid)
      }
      this._getUserDetail(this.otherUserId)
    },
    computed: {
      ...mapGetters([
        'modeType',
        'otherUserId'
      ])
    },
    mounted() {
      this.getSwiper()
    },
    methods: {
      liseGo(index) {
        this.isActive = index;
        console.log("2222222222")
        this.mySwiper.slideTo(index, 500, false); //切换到第index个slide，速度为0.5秒
      },
      //封装swiper
      getSwiper() {
        console.log("111111111111")
        var that = this;
        // swiper-container  class名称
        this.mySwiper = new Swiper('.swiper-container', {
          autoplay: false, //可选选项，自动滑动
          on: {
            slideChangeTransitionEnd: function() {
              // this指向的是当前的swiper实例，that指向的是vue实例
              that.isActive = this.activeIndex; //切换结束时，告诉我现在是第几个slide
              console.log(this.activeIndex)
            },
          },
        })

      },
      _getUserDetail(uid){
        getUserDetail(uid).then(res => {
          console.log(res)
          this.userDetail = res.data
          console.log(this.userDetail)
          console.log(this.userDetail.profile.backgroundUrl)
        }).catch(err => {
          console.log(err)
        })
      },
      ...mapMutations({
        setOtherUserId: 'SET_OTHER_USER_ID',
      }),
    },
    watch: {
      isActive(index){
      /*  this.songlist = []
        this.offset = 0
        this.once = true*/
      }
    },
    filters: {
      formatNum(num) {
        num = num > 9999 ?  (num/10000).toFixed(1) + "万" : num
        return num
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable"
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
      height:600px
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
        margin:0 auto
        color: $color-font1
        p{
          height:40px
          line-height:40px
          font-size:$font-size-small
          color: $color-font7
          &.name{
            color:$color-font1
            font-size:$font-size-medium
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
      height:400px
      border-top-left-radius:40px
      border-top-right-radius:40px
      background: #fff
      .navList{
        overflow:hidden
        margin-bottom:40px
        &.night{
          background: none!important
          color: #fff!important
          border:none
        }
        ul{
          display: -webkit-box
          overflow-x scroll
          white-space:nowrap
          li{
            width:150px
            text-align :center
            display: inline-block
            padding:5px 10px
            height:50px
            line-height:50px
            border-bottom: 1px solid #ccc
            text-align: center
            .myColor{
              color: $color-icon
              border-bottom :4px solid $color-icon
            }
          }
        }
      }

      .mainContent{
        margin-top:50px
      }
    }
  }
}
</style>
