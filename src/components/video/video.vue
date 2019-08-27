<template>
  <div class="container">
    <back-head title="视频" ico_color="#000" ico_display="none"></back-head>
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
  </div>
</template>

<script>
  import BackHead from 'base/back-head/back-head'
  import {getVideo,  getVideoDetail} from 'api/api'
  export default {
    name: 'video',
    data() {
      return{
        vid:null,
        videoUrl:null,
      }
    },
    components:{
      BackHead,
    },
    created() {
      this._getVideo()
    },
    mounted() {
      this._getVideoDetail(this.vid)
    },
    methods: {
      _getVideoDetail(vid) {
        getVideoDetail(vid).then(res =>{
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
      _getVideo() {
        this.vid = this.$route.params.vid
        getVideo(this.vid).then(res => {
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
    }
  }
</script>

<style lang="stylus" scoped>
.container{
  .video{
    margin-top: 20px
    video{
      margin:0 auto
    }

  }
}
</style>
