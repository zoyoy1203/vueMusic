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

    <div class="mainContent" :class="modeType ? '' : 'night'">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in title" :key="index">

            <div class="videos" v-for="(item, index) in videolist">
              <div class="content1">
                <div class="coverImg">
                  <img :src="item.data.coverUrl" alt="">
                </div>
                <div class="desc">
                  {{item.data.description}}
                </div>
              </div>
             <div class="content2">
            <!--   <video
                 id="myVideo"
                 class="video-js"
               >
                 <source
                   src="http://vodkgeyttp9.vod.126.net/vodkgeyttp8/68sKFbGS_1328070069_hd.mp4?wsSecret=4cf069c5a304cca91f7b46c07b750b5a&wsTime=1566833777&ext=eyPcnfjM5UVOhVyDDzrWSMEpCAQEqSgEcr%2B%2BWKM7TKTfOEcAeyPp2MpNR9mZ73UuIx8RvPqA4L5rtLqHm0kPidkHZKnDPE%2BCad1WI3CwWxuo63Mmyem0h3pGwQB9knDszwsCjNli0ikVS5KHA5pYJnxARnpSaeFlB12uLOagFUZ0iYrtVG45vHwTfUOB20PHs%2BTUHZrtvP%2FjVnGAwmv%2F69ZECiAXaRDwT66mlan0JuUW5PY8t%2BLalWbsBCy0vfJR"
                   type="video/mp4"
                 >
               </video>-->
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
    name: 'slider-menu',
    data() {
      return{
        mySwiper: '',
        isActive: 0,
        title: [], //热门歌单类型
        once:true,//是否是第一次请求
        list:[],
        videolist:[],
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

      this._getVideo('89ADDE33C0AAE8EC14B99F6750DB954D')
    },
    mounted() {
      // 初始化swiper
      /*   this.getSwiper()*/
      document.addEventListener('scroll',this.scrollMoreData,false)

      this.initVideo()
    },
    methods: {
      initVideo() {
//初始化视频方法
        let myPlayer = this.$video(myVideo, {
          //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
          controls: true,
          //自动播放属性,muted:静音播放
          autoplay: "muted",
          //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
          preload: "auto",
          //设置视频播放器的显示宽度（以像素为单位）
          width: "300px",
          //设置视频播放器的显示高度（以像素为单位）
          height: "200px"
        });
      },

      _getVideo(id) {
        getVideo(id).then(res => {
          console.log(res)
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
      height:500px
      .content1{
        .coverImg{
          width: 100%
          height:400px
          img{
            width: 100%
            height:100%
          }
        }
      }
      .content2{

      }

    }
  }
</style>
