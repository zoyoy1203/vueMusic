<template>
  <div class="user">
    <back-head ico_color="#fff" ico1="" ico2="icon-fenxiang"></back-head>
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
          <p v-if="userDetail.profile.allAuthTypes[0].desc">{{userDetail.profile.allAuthTypes[0].desc}}</p>
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

      <user-content></user-content>

      </div>
    </div>
  </div>
</template>
<script>
  import UserContent from 'components/user/user-content'
  import Swiper from 'swiper'
  import BackHead from 'base/back-head/back-head'
  import {mapGetters, mapMutations} from 'vuex'
  import {getUserDetail} from 'api/api'
  export default {
    name: 'user',
    components:{
      BackHead,
      UserContent
    },
    data() {
      return{
        mySwiper:'',
        nowIndex:0,
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
      // this.getList();
    },
    methods: {
      tabClick(index){
        this.nowIndex = index
        this.mySwiper.slideTo(index,1000,false)
      },
      _getUserDetail(uid){
        getUserDetail(uid).then(res => {
          console.log(res)
          this.userDetail = res.data
          console.log(this.userDetail)
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
      /*  this.b-songlist = []
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
      height:100%
      border-top-left-radius:40px
      border-top-right-radius:40px
      background: #fff
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
            font-style: normal;
            font-size: 16px;
          }
        }
      }

      .activeT{
        color:#00ba6b;
        padding-bottom: .3rem;
        border-bottom: 2px solid #00ba6b;
      }
      .swiper_con{
        width:100%;
        margin-bottom:40px;
        position:relative;
      }
    }
  }
}
</style>
