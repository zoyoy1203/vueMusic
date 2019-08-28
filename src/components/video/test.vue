<template>
  <div class="test_two_box" v-if="videoUrl!=null">
    <video
      id="myVideo"
      class="video-js"
    >
      <source
        :src="videoUrl"
        type="video/mp4"
      >
    </video>
  </div>
</template>

<script>
  import {getVideoList, getVideos, getVideo} from 'api/api'
  /* eslint-disable */
  export default {
    name: "test",
    data() {
      return {
        videoUrl:null,
      };
    },
    mounted() {
      this.initVideo();
    },
    created() {

    },
    methods: {
      _getVideo(id) {
        getVideo(id).then(res => {
          console.log(res)
          this.videoUrl = res.data.urls[0].url
          console.log( res.data.urls[0].url)

          /*   this.initVideo()*/
        }).catch(err => {
          console.log(err)
        })
      },
      initVideo() {
        this._getVideo('89ADDE33C0AAE8EC14B99F6750DB954D')
        //初始化视频方法
        var myPlayer = this.$video(document.getElementById('myVideo'), {
          //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
          controls: true,
          //自动播放属性,muted:静音播放
          autoplay: "muted",
          //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
          preload: "auto",

        });
      }
    }
  };
</script>

<style scoped>
</style>
