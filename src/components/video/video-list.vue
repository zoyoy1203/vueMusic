<template>
  <div id="lao" class="warp">
    <!--导航-->
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
<!--    <div class="test_two_box" v-if="videoUrl != null" >
      <video
        id="myVideo"
        class="video-js"
        autoplay='false'
        controls='true'
        data-setup='{}'
      >
        <source
          :src="videoUrl"
          type="video/mp4"
        >
      </video>
    </div>-->

    <div class="mainContent" :class="modeType ? '' : 'night'">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in title" :key="index">

            <div class="videos" v-for="(item, index) in videolist">
              <div class="line"></div>
              <div class="content1">
                <div class="coverImg">
                  <img :src="item.data.coverUrl" alt="" v-if="index != videoIndex" @click="playVideo(index,item.data.vid)">
                  <div class="test_two_box" v-if="index === videoIndex && videoUrl != null" >
                    <video
                      id="myVideo"
                      class="video-js"
                      autoplay='false'
                      controls='true'
                      data-setup='{}'
                    >
                      <source
                        :src="videoUrl"
                        type="video/mp4"
                      >
                    </video>
                  </div>
                </div>
                <div class="desc" v-if="item.data.description">
                  {{item.data.description}}
                </div>
                <div class="content_b" @click="goVideo(item.data.vid)">
                  <img :src="item.data.creator.avatarUrl" alt="">
                  <span class="name">{{item.data.creator.nickname}}</span>
                </div>
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
  import Songs from 'base/songs/songs'
  import {getVideoList, getVideos, getVideo} from 'api/api'
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    name: 'video-list',
    data() {
      return{
        mySwiper: '',
        isActive: 0,
        title: [], //热门歌单类型
        once:true,//是否是第一次请求
        list:[],
        videolist:[],
        videoIndex:null,
        videoUrl:null,
        loading:false,
        loadingMore:false,
        isScroll:true,
      }
    },
    components: {
      Songs,
    },
    computed: {
      ...mapGetters([
        'modeType'
      ])
    },
    created() {
      this._getTitle()
    },
    mounted() {
      // 初始化swiper
      /*   this.getSwiper()*/
      document.addEventListener('scroll',this.scrollMoreData,false)
    },
    methods: {
      goVideo(vid) {
        this._getVideo(vid)
        this.$router.push({
          path:'/video',
          name:'video',
          params:{
           vid:vid
          }
        })
      },
      playVideo(index,vid){
        this.videoIndex = index
        this._getVideo(vid)

      },
      _getVideo(vid) {
        getVideo(vid).then(res => {
          console.log(res)
          this.videoUrl = res.data.urls[0].url
          console.log( this.videoUrl)

          /*   this.initVideo()*/
        }).catch(err => {
          console.log(err)
        })
      },
      getImgIndex(index) {
        this.imgIndex = index
        console.log(this.imgIndex)
      },
      ...mapMutations({
        setModeType: 'SET_MODE_TYPE'
      }),
      liseGo(index) {
        this.isActive = index;
        this.mySwiper.slideTo(index, 500, false); //切换到第index个slide，速度为0.5秒
      },
      //封装swiper
      getSwiper() {
        var that = this;
        // swiper-container  class名称
        this.mySwiper = new Swiper('.swiper-container', {
          autoplay: false, //可选选项，自动滑动
          on: {
            slideChangeTransitionEnd: function() {
              // this指向的是当前的swiper实例，that指向的是vue实例
              that.isActive = this.activeIndex; //切换结束时，告诉我现在是第几个slide
            },
          },
        })

      },
      _getTitle() {
        getVideoList().then((res) => {
          console.log(res)
          this.title = res.data.data
          this._getVideolist(this.title[0].id)

        }).catch(err => {
          console.log(err)
        })
      },
      _getVideolist(id){
        /*  console.log(this.title)*/
        var that = this
        getVideos(id).then(res => {
           console.log(res)
          let list = res.data.datas
          /*   console.log(list)*/
          list.forEach(function (item) {
            that.videolist.push(item)
          })
          console.log(that.videolist)
          this.isScroll = true

          // 初始化swiper
          this.getSwiper()
        }).catch(err => {
          console.log(err)
        })
      },
      scrollMoreData() {
        const scrollTopHeight = document.documentElement.scrollTop || document.body.scrollTop //滚动高度
        const clientHeight = document.documentElement.clientHeight || window.screen.availHeight //屏幕可用工作区高度
        const offsetHeight = document.documentElement.offsetHeight || document.body.offsetHeight //网页可见区域高(包括边线的宽)
        // console.log(scrollTopHeight, clientHeight, scrollTopHeight + clientHeight + 50, offsetHeight)
        if ((scrollTopHeight + clientHeight) + 50 >= offsetHeight && this.isScroll) {
          this.isScroll = false
          this.loadingMore = true
          this.offset +=20
          console.log('请求刷新------------')
          this._getVideolist(this.title[this.isActive].id)
        }
      }
    },
    watch: {
      isActive(index){
        this.videolist = []
        this._getVideolist(this.title[this.isActive].id)
      }
    },
    destroyed() {
      document.removeEventListener('scroll', this.scrollMoreData, false)
    }

  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  *{
    padding:0
    margin:0
    font-size:36px
  }
  .warp{
    width: 100%
    height: 100%
    background:#fff
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


  }
  .mainContent{
    margin-top:50px
    .videos{
      width:100%
      height:auto
      .line{
        width: 100%
        height:15px
        background :$color-line1
      }
      .content1{
        .coverImg{
          width:90%
          height:auto
          margin: 15px auto
          img{
            width: 100%
            height:100%
            border-radius :20px
          }
        }
        .desc{
          display: -webkit-box
          -webkit-box-orient: vertical
          -webkit-line-clamp: 3
          overflow: hidden
          text-overflow :ellipsis
          width: 90%
          height :87px
          line-height :30px
          margin:0 auto 10px auto
          font-size:$font-size-medium
        }
        .content_b{
          width: 90%
          height:100px
          margin: 0 auto
          border-top: 1px solid #ccc
          img{
            width:80px
            height:80px
            border-radius :40px
            vertical-align :middle
          }
          .video{

          }
          .name{
            vertical-align :middle
            font-size:$font-size-medium-x
          }
        }
      }

    }
  }
</style>
