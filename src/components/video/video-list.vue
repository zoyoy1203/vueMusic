<template>
  <slider-left>
    <div  slot="mainContainer">
      <div class="main_container">
        <div class="navList" :class="modeType ? '' : 'night'">
          <ul>
            <li  v-for="(item, index) in title" :key="index"  @click="liseGo(index)">
        <span class="tag" :class="{myColor:index==isActive}">
          {{item.name}}
        </span>
            </li>
          </ul>
        </div>
        <div class="mainContent" :class="modeType ? '' : 'night'">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item, index) in title" :key="index">

                <div class="videos" v-for="(video, i) in videolist" v-if="index === isActive">
                  <div class="line" :class="modeType ? '' : 'night'"></div>
                  <div class="content1">
                    <div class="coverImg">
                      <img :src="video.data.coverUrl" alt="" v-if="i != videoIndex" @click="playVideo(i,video.data.vid)">
                      <div class="video" v-if="i === videoIndex && videoUrl != null" >
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
                    <div class="desc" v-if="video.data.description">
                      {{video.data.description}}
                    </div>
                    <div class="content_b">
                      <img :src="video.data.creator.avatarUrl" alt="">
                      <span class="name">{{video.data.creator.nickname}}</span>
                      <div class="icon iconfont icon-more-vertical"></div>
                      <div class="icon iconfont icon-xiaoxi" @click="goVideo(video.data.vid)"><span>{{video.data.commentCount}}</span></div>
                      <div class="icon iconfont icon-dianzan"><span>{{video.data.praisedCount}}</span></div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </slider-left>
</template>

<script>
  import SliderLeft from 'components/slider-left/slider-left'
  import Swiper from 'swiper'
  import Songs from 'base/songs/songs'
  import {getVideoList, getVideos, getVideo} from 'api/api'
  import {mapGetters} from 'vuex'
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
      SliderLeft,
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
        this._getVideo(index,vid)
      },
      _getVideo(index,vid) {
        getVideo(vid).then(res => {
          console.log(res)
          this.videoUrl = res.data.urls[0].url
          console.log( this.videoUrl)
          this.videoIndex = index

          /*   this.initVideo()*/
        }).catch(err => {
          console.log(err)
        })
      },
      getImgIndex(index) {
        this.imgIndex = index
        console.log(this.imgIndex)
      },
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
         /* resistanceRatio: 0,*/
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
        /*  let idss = ""
          this.title.forEach(function (item,index) {
            idss +=item.id+","
          })
          this.ids = idss.slice(0,idss.length-1)
          console.log(this.ids)*/
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

     /*   var video = this.$video("myVideo")
        video.dispose()*/
        this.videoIndex = null
        this._getVideolist(this.title[this.isActive].id)
      }
    },
    destroyed() {
      document.removeEventListener('scroll', this.scrollMoreData, false)
    }

  }
</script>

<style lang="stylus" scoped>
  .main_container{
    position:fixed
    width: 100%
    top: 80px
    bottom: 0
    overflow-y:scroll
    .navList{
      /*    position: absolute
          left: 0
          top: 90px*/
      overflow:hidden
      &.night{
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
      padding-top:40px
      .videos{
        width:100%
        height:auto
        .line{
          width: 100%
          height:15px
          background :$color-line1
          &.night{
            background: $color-line2!important
          }
        }
        .content1{
          .coverImg{
            width:90%
            height:auto
            margin: 15px auto
            img{
              width: 100%
              height:auto
              border-radius :20px
            }
            .video{
              width: 100%
              margin:40px auto
              video{
                width: 100%
              }
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
              width:60px
              height:60px
              border-radius :30px
              vertical-align :middle
            }
            .name{
              height: 100px
              line-height:100px
              vertical-align :middle
              font-size:$font-size-medium-x
            }
            .icon{
              float: right
              height:100px
              line-height:100px
              font-size:$font-size-medium-x
              span{
                position: relative
                top:-20px
                left:-10px
                font-size:$font-size-small-s
              }
            }
          }
        }

      }
    }


  }

</style>
