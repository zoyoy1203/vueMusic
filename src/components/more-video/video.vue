<template>
  <div class="container" :class="modeType ? '' : 'night'">
    <back-head  :ico_color="modeType ? '#fff' : '#000'" ico_display="none"></back-head>
    <div class="video" v-if="videoUrl != null">
      <video
        id="myVideo"
        class="video-js"
        preload="auto"
        autoplay='autoplay'
        controls='controls'
        width="1334"
        data-setup='{}'
      >
        <source
          :src="videoUrl"
          type="video/mp4"
        >
      </video>
    </div>
  <!--  <div class="content" >
      <div class="video_info">

        <div class="title">
          <div class="title_c"> {{videoDetail.title}}</div>
          <span class="icon iconfont" :class="tagFlag ? 'icon-shixinjiantou-xiangshang' : 'icon-shixinjiantou-xiangshang-copy'" @click="tagFlag=!tagFlag"></span>
        </div>
        <div class="tag" v-if="tagFlag">
          <span v-for="(item, index) in videoDetail.videoGroup" :class="modeType ? '' : 'night'">{{item.name}}</span>
        </div>
        <div class="video_nav" :class="modeType ? '' : 'night'">
          <ul>
            <li class="nav ">
              <div class="icon iconfont icon-dianzan"></div>
              <div class="text">{{videoDetail.praisedCount}}</div>
            </li>
            <li class="nav ">
              <div class="icon iconfont icon-shoucang"></div>
              <div class="text">{{videoDetail.subscribeCount}}</div>
            </li>
            <li class="nav ">
              <div class="icon iconfont icon-xiaoxi"></div>
              <div class="text">{{videoDetail.commentCount}}</div>
            </li>
            <li class="nav ">
              <div class="icon iconfont icon-fenxiang"></div>
              <div class="text">{{videoDetail.shareCount}}</div>
            </li>
          </ul>
        </div>
        <div class="author">
          <img :src="videoDetail.creator.avatarUrl" alt="">
          <span>{{videoDetail.creator.nickname}}</span>
          <span class="attention">+关注</span>
        </div>
        <div class="line" :class="modeType ? '' : 'night'"></div>
        <div class="aboutVideo">
          <div class="title">相关视频</div>
          <div class="content">
            <div class="content_c" v-for="(item, index) in videoAbout">
              <img :src="item.coverUrl" alt="">
              <div class="text">
                <div class="title">{{item.title}}</div>
                <span>{{item.creator[0].userName}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="line" :class="modeType ? '' : 'night'"></div>
        <div class="comment_wrap">
          <div class="title">精彩评论</div>
          <comment-list :comment="videoHotComment" v-if="videoHotComment.length>0"></comment-list>

          <div class="title">最新评论</div>
          <comment-list :comment="videoComment" v-if="videoComment.length>0"></comment-list>
        </div>

      </div>
    </div>-->
  </div>
</template>

<script>
  import {mapGetters,mapMutations} from 'vuex'
  import BackHead from 'base/back-head/back-head'
  import CommentList from 'components/comment/comment-list'
  import {getVideo,  getVideoDetail, getVideoComment,getAboutVideo, getMvUrl} from 'api/api'
  export default {
    name: 'video',
    data() {
      return{
        videoUrl:null,
        videoDetail:null,
        videoHotComment:[],
        videoComment:[],
        videoAbout:null,
        tagFlag:false,
        offset:0,
        limit:20,
        isScroll:true,
      }
    },
    components:{
      BackHead,
      CommentList
    },
    computed: {
      ...mapGetters([
        'modeType',
        'videoId'
      ])
    },
    created() {
      if(this.$route.params.tag === 'mv'){
        if(this.$route.params.vid){
          this.setVideoId(this.$route.params.vid)
        }
        this._getMvUrl(this.videoId)
      }else{
        if(this.$route.params.vid){
          this.setVideoId(this.$route.params.vid)
        }
        this._getVideo(this.videoId)
        this._getVideoComment(this.videoId,this.offset,this.limit)
        this._getAboutVideo(this.videoId)
      }

    },
    mounted() {
      this._getVideoDetail(this.videoId)
      document.addEventListener('scroll',this.scrollMoreData,false)
    },
    methods: {
      _getMvUrl(vid) {
        getMvUrl(vid).then(res => {
          console.log(res)
      /*    this.videoUrl = res.data.urls[0].url*/
      /*    console.log( this.videoUrl)*/
          /*  this.initVideo();*/
          /*   this.initVideo()*/
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
        /*  this.loadingMore = true*/
          this.offset +=20
          console.log('请求刷新------------')
          this._getVideoComment(this.videoId,this.offset,this.limit)
        }
      },
      _getAboutVideo(vid){
        getAboutVideo(vid).then(res => {
          console.log(res)
          this.videoAbout = res.data.data
        }).catch(err => {
          console.log(err)
        })
      },
      _getVideoComment(vid,offset,limit){
        var that = this
        getVideoComment(vid,offset,limit).then(res => {
          console.log(res)
          this.videoHotComment = res.data.hotComments
          let list = res.data.comments
          /*   console.log(list)*/
          list.forEach(function (item) {
            that.videoComment.push(item)
          })
          this.isScroll = true
          console.log(this.videoComment)
        }).catch(err => {
          console.log(err)
        })
      },
      _getVideoDetail(vid) {
        // getVideoDetail(vid).then(res =>{
        //   console.log(res)
        //   this.videoDetail = res.data.data
        // }).catch(err => {
        //   console.log(err)
        // })
      },
      _getVideo(vid) {
        getVideo(vid).then(res => {
          console.log(res)
          this.videoUrl = res.data.urls[0].url
          console.log( this.videoUrl)
        /*  this.initVideo();*/
          /*   this.initVideo()*/
        }).catch(err => {
          console.log(err)
        })
      },
   /*   initVideo() {
        //初始化视频方法
        var myPlayer = this.$video(document.getElementById('myVideo'), {
          //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
          controls: true,
          //自动播放属性,muted:静音播放
          autoplay: 'true',
          //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
          preload: 'auto',
          //设置视频播放器的显示宽度（以像素为单位）
          width: "1334px",
          //设置视频播放器的显示高度（以像素为单位）
          height: "600px"
        })
        console.log(this.videoUrl)
        console.log("111111111111111111")
      }*/
      ...mapMutations({
        setVideoId: 'SET_VIDEO_ID'
      }),

    }

  }
</script>

<style lang="stylus" scoped>
.container{
  .video{
    position: absolute
    top: 0
    left: 0
    width:100%
    height:auto
    video{
      width:100%
      height:600px
    }

  }
  .content{
    margin-top: 540px
    width: 100%
    .&night{
      background: #000
    }
    .video_info{
      .line{
        width: 100%
        height:15px
        background: $color-line1
        &.night{
          background: $color-line2!important
        }
      }
      .title{
        width: 90%
        height:80px
        margin:0 auto
        .title_c{
          float: left
          width: 90%
          height: 80px
          line-height: 40px
          display: -webkit-box
          -webkit-box-orient: vertical
          -webkit-line-clamp: 2
          overflow: hidden
          text-overflow :ellipsis
        }
        .icon{
          float: left
          font-size:$font-size-medium
          color: $color-font4
        }
      }
      .tag{
        width: 90%
        height:auto
        margin: 0 auto
        span{
          display: inline-block
          padding: 10px 15px
          margin: 10px
          border-radius :20px
          word-wrap :break-word
          background: $color-line1
          font-size:$font-size-small-s
          &.night{
            background: $color-line2!important
          }
        }
      }
      .video_nav{
        display: inline-block
        width:100%
        padding-top:20px
        border-bottom:1px solid $color-line
        &.night{
          color: $color-font1!important
        }
        ul{
          .nav{
            float: left
            width: 135px
            height:100px
            margin:10px 25px
            text-align:center
            .icon{
              width:100%
              heihgt:auto
            /*  color:$color-font2*/
              font-size: 40px
            }
            .text{
              width:100%
              height 40px;
              line-height: 40px
              margin-top: 10px
              color: $color-font4
              font-size:$font-size-small-s
            }

          }
        }
      }
      .author{
        width: 90%
        margin:0 auto
        height:100px
        line-height:100px
        img{
          width:70px
          height:70px
          border-radius:35px
          vertical-align :middle
        }
        span{
          vertical-align :middle
        }
        .attention{
          display: inline-block
          float: right
          height: 30px
          line-height: 30px
          padding: 5px 15px
          margin-top: 30px
          color: $color-font1
          border-radius :20px
          font-size: $font-size-small
          background: $color-icon2
          vertical-align :middle
        }
      }
      .aboutVideo{
        width: 90%
        height:auto
        margin:0 auto
        .title{
          height:80px
          line-height:80px
        }
        .content{
          width: 100%
          height:auto
          margin:0
          .content_c{
            display: inline-block
            width: 100%
            height:200px
            img{
              float: left
              width:300px
              height:auto
            }
            .text{
              box-sizing :border-box
              float: left;
              width:350px
              height:200px
              padding-top:30px
              margin-left:10px
              .title{
                width: 100%
                height:auto
                line-height: 40px
                display: -webkit-box
                -webkit-box-orient: vertical
                -webkit-line-clamp: 2
                overflow: hidden
                text-overflow :ellipsis
                font-size:$font-size-medium-x
              }
              span{
                font-size: $font-size-medium
                color: $color-font4
              }
            }
          }
        }
      }

    }
    .comment_wrap{
      .title{
        width: 90%
        height:80px
        line-height:80px
        margin: 0 auto
      }
    }
  }
}
</style>
