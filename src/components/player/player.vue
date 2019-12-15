<template>
  <div class="player"  v-show="playlist.length>0">

    <transition name="normal"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
                @after-leave="afterLeave"
    >
      <div class="normal_player" v-show="fullScreen">
        <div class="background" v-if="picUrl">
          <img  :src="picUrl" alt="">
        </div>
        <div class="top">
          <div class="icon_l iconfont icon-prev" @click="back"></div>
          <div class="title" v-if="currentSong.name">
            <div class="title_t" >{{currentSong.name}}</div>
            <div class="title_b">{{currentSong.ar[0].name}}</div>
          </div>
          <div class="icon_r iconfont icon-fenxiang"></div>
        </div>
        <div class="middle"
             @touchstart.prevent="middleTouchStart"
             @touchmove.prevent="middleTouchMove"
             @touchend="middleTouchEnd"
        >
          <div class="middle_l" ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdCls" v-if="picUrl">
                <img  class="image" :src="picUrl">
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{playingLyric}}</div>
            </div>
          </div>
          <scroll class="middle_r" ref="lyricList">
            <div class="lyric_wrapper">
              <div v-if="currentLyric">
                <p ref="lyricLine"
                   class="text"
                   :class="{'current': currentLineNum ===index}"
                   v-for="(line,index) in currentLyric.lines">{{line.txt}}</p>
              </div>
            </div>
          </scroll>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{'active':currentShow==='cd'}"></span>
            <span class="dot" :class="{'active':currentShow==='lyric'}"></span>
          </div>
        <!--  <div class="progress-wrapper">
            <span class="time time-l">{{}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
            </div>
            <span class="time time-r">{{</span>
          </div>-->
          <div class="operators">
            <div class="icon" @click="changeMode" >
              <i class="iconfont" :class="iconMode"></i>
            </div>
            <div class="icon i-left"  :class="disableCls">
              <i @click="prev" class="iconfont icon-xiayishou1"></i>
            </div>
            <div class="icon i-center"  :class="disableCls">
              <i @click="togglePlaying" class="iconfont" :class="playIcon"></i>
            </div>
            <div class="icon i-right"  :class="disableCls" >
              <i @click="next" class="icon-next iconfont icon-xiayishou"></i>
            </div>
            <div class="icon i-right">
              <i  @click="toggleFavorite(currentSong)" class="icon iconfont" :class="getFavoriteIcon(currentSong)"></i>
            </div>
          </div>
        </div>


      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open" :class="modeType ? '' : 'night'">
        <div class="icon" v-if="picUrl">  <!--currentSong.al.picUrl-->
          <img :class="cdCls" width="40" height="40"  :src="picUrl">
        </div>
        <div class="text" v-if="currentSong.name">
          <h2 class="name">{{currentSong.name}}</h2>
          <p class="desc">{{currentSong.ar[0].name}}</p>
        </div>
        <div class="control">
        <!--  <progress-circle :radius="radius" :percent="percent">-->
            <i @click.stop="togglePlaying" class="iconfont" :class="miniIcon"></i>
         <!-- </progress-circle>-->
        </div>
        <div class="control" @click.stop="showPlaylist">
          <i class="iconfont icon-bofangliebiao"></i>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src="songUrl" @play="ready" @error="error" @timeupdate="updateTime"
           @ended="end"></audio>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import {getSongUrl, getSongText} from  'api/api'
  import Scroll from 'base/scroll/scroll'
  import ProgressBar from 'base/progress-bar/progress-bar'
  import ProgressCircle from 'base/progress-circle/progress-circle'
  import util from 'api/util'
  import Lyric from 'lyric-parser'
  import animations from 'create-keyframe-animation'
  import {prefixStyle} from 'common/js/dom'
  import {playMode} from 'common/js/config'
  import {playerMixin} from 'common/js/mixin'

  const transform = prefixStyle('transform')
  const transitionDuration = prefixStyle('transitionDuration')

  export default {
    name: 'player',
    mixins: [playerMixin],
    data(){
      return{
        id:null,
        songUrl:[],
        songText:null,
        currentLyric: null,
        currentLineNum:0,
        songReady: false,
        currentTime: 0,
        radius: 32,
        currentShow: 'cd',
        playingLyric: '',
        duration:0,
        picUrl:null,
      }
    },
    components:{
      ProgressBar,
      ProgressCircle,
      Scroll
    },
    created() {
      this.touch = {}

      if(this.currentSong.id){
        this._getSongUrl()
      }

    },
    computed: {
      cdCls() {
        return this.playing ? 'play' : 'pause'
      },
      playIcon() {
        return this.playing ? 'icon-zanting' : 'icon-bofang'
      },
      miniIcon() {
        return this.playing ? 'icon-zanting' : 'icon-bofang'
      },
      disableCls() {
        return this.songReady ? '' : 'disable'
      },
     /* percent() {
        return this.currentTime / this.currentSong.duration
      },*/
      ...mapGetters([
        'currentIndex',
        'fullScreen',
        'playing',
        'modeType'
      ])
    },
    methods: {
      prevs() {
        this.$router.go(-1)
      },
      back() {
        this.setFullScreen(false)
      },
      open() {
        this.setFullScreen(true)
      },
      enter(el, done) {
        const {x, y, scale} = this._getPosAndScale()

        let animation = {
          0: {
            transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
          },
          60: {
            transform: `translate3d(0,0,0) scale(1.1)`
          },
          100: {
            transform: `translate3d(0,0,0) scale(1)`
          }
        }

        animations.registerAnimation({
          name: 'move',
          animation,
          presets: {
            duration: 400,
            easing: 'linear'
          }
        })

        animations.runAnimation(this.$refs.cdWrapper, 'move', done)
      },
      afterEnter() {
        animations.unregisterAnimation('move')
        this.$refs.cdWrapper.style.animation = ''
      },
      leave(el, done) {
        this.$refs.cdWrapper.style.transition = 'all 0.4s'
        const {x, y, scale} = this._getPosAndScale()
        this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
        this.$refs.cdWrapper.addEventListener('transitionend', done)
      },
      afterLeave() {
        this.$refs.cdWrapper.style.transition = ''
        this.$refs.cdWrapper.style[transform] = ''
      },
      togglePlaying() {
        // console.log('this.songReady=' + this.songReady)
        // console.log('this.playing=' + this.playing)
        if (!this.songReady) {
          return
        }
        this.setPlayingState(!this.playing)
        if (this.currentLyric) {
          //切换播放/暂停状态
          this.currentLyric.togglePlay()
        }
      },
      end() {
        if (this.mode === playMode.loop) {
          this.loop()
        } else {
          this.next()
        }
      },
      loop() {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
        this.setPlayingState(true)
        if (this.currentLyric) {
          this.currentLyric.seek(0)
        }
      },
      next() {
        if (!this.songReady) {
          return
        }
        if (this.playlist.length === 1) {
          this.loop()
          return
        } else {
          let index = this.currentIndex + 1
          if (index === this.playlist.length) {
            index = 0
          }
          this.setCurrentIndex(index)
          if (!this.playing) {
            this.togglePlaying()
          }
        }
        this.songReady = false
      },
      prev() {
        if (!this.songReady) {
          return
        }
        if (this.playlist.length === 1) {
          this.loop()
          return
        } else {
          let index = this.currentIndex - 1
          if (index === -1) {
            index = this.playlist.length - 1
          }
          this.setCurrentIndex(index)
          if (!this.playing) {
            this.togglePlaying()
          }
        }
        this.songReady = false
      },
      ready() {
        this.songReady = true
        this.savePlayHistory(this.currentSong)
      },
      error() {
        this.songReady = true
      },
      updateTime(e) {
        this.currentTime = e.target.currentTime
      },
      format(interval) {
        interval = interval | 0
        const minute = interval / 60 | 0
        const second = this._pad(interval % 60)
        return `${minute}:${second}`
      },
     /* onProgressBarChange(percent) {
        const currentTime = this.currentSong.duration * percent
        this.$refs.audio.currentTime = currentTime
        if (!this.playing) {
          this.togglePlaying()
        }
        if (this.currentLyric) {
          this.currentLyric.seek(currentTime * 1000)
        }
      },*/
      _getSongUrl(){
     /*   this.duration = this.$refs.audio.duration
        console.log(this.duration)*/
        this.id = this.currentSong.id
        // console.log('id=========='+this.id)
        getSongUrl(this.id).then(res => {
          this.songUrl = res.data.data[0].url
          // console.log('url======='+this.songUrl)
        }).catch(err => {
          console.log(err)
        })
      },
      getSongText() {
        getSongText(this.id).then(res => {
          console.log(res)
          this.songText = res.data.lrc.lyric
          this.currentLyric = new Lyric(this.songText, this.handleLyric)
        /*  console.log(this.songText)
          console.log(this.currentLyric)*/
          if (this.playing) {
            this.currentLyric.play()
          }
        }).catch(err => {
          console.log(err)
          this.currentLyric = null
          this.playingLyric = ''
          this.currentLineNum = 0
        })
      },
      handleLyric({lineNum, txt}) {
        this.currentLineNum = lineNum
        if (lineNum > 5) {
          let lineEl = this.$refs.lyricLine[lineNum - 5]
          this.$refs.lyricList.scrollToElement(lineEl, 1000)
        } else {
          this.$refs.lyricList.scrollTo(0, 0, 1000)
        }
        this.playingLyric = txt
      },
      middleTouchStart(e) {
        this.touch.initiated = true
        const touch = e.touches[0]
        this.touch.startX = touch.pageX
        this.touch.startY = touch.pageY
        // console.log(this.touch.startX)
      },
      middleTouchMove(e) {
        // console.log('remove')
        if (!this.touch.initiated) {
          return
        }
        const touch = e.touches[0]
        const deltaX = touch.pageX - this.touch.startX
        const deltaY = touch.pageY - this.touch.startY
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          return
        }
        const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
        const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
        this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
        this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
        this.$refs.lyricList.$el.style[transitionDuration] = 0
        this.$refs.middleL.style.opacity = 1 - this.touch.percent
        this.$refs.middleL.style[transitionDuration] = 0
      },
      middleTouchEnd() {
        let offsetWidth
        let opacity
        if (this.currentShow === 'cd') {
          if (this.touch.percent > 0.1) {
            offsetWidth = -window.innerWidth
            opacity = 0
            this.currentShow = 'lyric'
          } else {
            offsetWidth = 0
            opacity = 1
          }
        } else {
          if (this.touch.percent < 0.9) {
            offsetWidth = 0
            this.currentShow = 'cd'
            opacity = 1
          } else {
            offsetWidth = -window.innerWidth
            opacity = 0
          }
        }
        const time = 300
        this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
        this.$refs.lyricList.$el.style[transitionDuration] = `${time}ms`
        this.$refs.middleL.style.opacity = opacity
        this.$refs.middleL.style[transitionDuration] = `${time}ms`
        this.touch.initiated = false
      },
      _pad(num, n = 2) {
        let len = num.toString().length
        while (len < n) {
          num = '0' + num
          len++
        }
        return num
      },
      _getPosAndScale() {
        const targetWidth = 40
        const paddingLeft = 40
        const paddingBottom = 30
        const paddingTop = 80
        const width = window.innerWidth * 0.8
        const scale = targetWidth / width
        const x = -(window.innerWidth / 2 - paddingLeft)
        const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
        return {
          x,
          y,
          scale
        }
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN',
        setPlayingState: 'SET_PLAYING_STATE',
        setCurrentIndex: 'SET_CURRENT_INDEX',
        setPlayMode: 'SET_PLAY_MODE',
        setPlayList: 'SET_PLAYLIST',
        setModeType: 'SET_MODE_TYPE'
      }),
      ...mapActions([
        'savePlayHistory'
      ])
    },
    watch: {
      currentSong(newSong, oldSong) {

        // console.log(newSong.id)
        if (!newSong.id) {
          return
        }
        if (newSong.id === oldSong.id) {
          return
        }
        this.id = this.currentSong.id
        this.picUrl = this.currentSong.al.picUrl
        // console.log('id=========='+this.id)
        getSongUrl(this.id).then(res => {
          this.songUrl = res.data.data[0].url
          // console.log('url======='+this.songUrl)
        }).catch(err => {
          console.log(err)
        })
        if (this.currentLyric) {
          this.currentLyric.stop()
          this.currentTime = 0
          this.playingLyric = ''
          this.currentLineNum = 0
        }
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$refs.audio.play()
          this.getSongText()
        }, 1000)
      },
      playing(newPlaying) {
        const audio = this.$refs.audio
        this.$nextTick(() => {
          newPlaying ? audio.play() : audio.pause()
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .night{
    .text{
      color: #fff!important
    }
    .control {
      .iconfont{
        color: #fff!important
      }
    }
  }
.player{
  .normal_player{
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 100%
    z-index: 150
    color: $color-font1
    background: #000
    .background{
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      z-index: -1
    /*  opacity: 0.6*/
     /* filter: blur(10px)*/
    /*  filter:grayscale(100%);*/
      /*filter:sepia(100%)*/
      filter:brightness(30%);
      img{
        width: 100%
        height:100%
      }
    }
    .top{
      position: relative
      margin-bottom: 25px
      margin-top:20px
      .iconfont{
        width: 100px
        height: 80px
        line-height: 80px
        text-align:center
        font-size:$font-size-medium
      }
      .icon_l{
        float: left
      }
      .title{
        float: left
        width:550px
      }
      .icon_r{
        float: right
      }
    }
    .middle{
      position: fixed;
      width: 100%;
      top: 120px;
      bottom: 340px;
      white-space: nowrap;
      font-size: 0;
      .middle_l{
        display: inline-block
        vertical-align: top
        position: relative
        width: 100%
        height: 0
        .cd-wrapper{
          width: 500px
          height:500px
          margin: 100px 125px
          .cd{
            width: 500px
            height:500px
            box-sizing: border-box
            border: 40px solid rgba(255, 255, 255, 0.1)
            border-radius: 50%
            &.play{
              animation: rotate 20s linear infinite
            }
            &.pause{
              animation-play-state: paused
            }
            img{
              width: 100%
              height:100%
              border-radius: 50%;
            }
          }
        }

        .playing-lyric-wrapper{
          width: 80%
          margin: 30px auto 0 auto
          overflow: hidden
          text-align: center
          .playing-lyric{
            height: 40px
            line-height: 40px
            font-size: $font-size-medium
            color: $color-font1
          }
        }

      }

      .middle_r{
        display: inline-block
        vertical-align: top
        width: 100%
        height: 100%
        overflow: hidden
        .lyric_wrapper{
          width: 80%
          margin: 0 auto
          overflow: hidden
          text-align: center
          .text{
            line-height: 50px
            color:$color-font4
            font-size: $font-size-large
            &.current{
              color: $color-font1
            }

          }

        }

      }

    }

    .bottom{
      position:fixed
      bottom: 50px
      width: 100%
      .dot-wrapper{
        text-align: center
        font-size: 0
        margin-bottom:50px
        .dot{
          display: inline-block
          vertical-align: middle
          margin: 0 4px
          width: 8px
          height: 8px
          border-radius: 50%
          background: $color-text-l
          &.active{
            width: 20px
            border-radius: 5px
            background: $color-text-ll
          }

        }

      }

      .progress-wrapper{
        display: flex
        align-items: center
        width: 80%
        margin: 0px auto
        padding: 10px 0
        .time{
          color: $color-text
          font-size: $font-size-small
          flex: 0 0 30px
          line-height: 30px
          width: 30px
          &.time-l{
            text-align: left
          }
          &.time-r{
            text-align: right
          }
          .progress-bar-wrapper{
            flex: 1
          }

        }

      }

      .operators{
        display: flex
        align-items: center
        .icon{
          flex: 1
          text-align: center
          color: $color-theme
          &.disable{
            color: $color-theme-d
          }
          i{
            font-size: 50px
            color: $color-font1
          }
          .i-left{
            text-align: right
          }
          .i-center{
            padding: 0 20px
            text-align: center
            i{
              font-size: 40px
            }
          }
          .i-right{
            text-align: left
          }
          .icon-favorite{
            color: $color-font1
          }

        }

      }

    }

  }
  .mini-player{
    &.night{
      background: #2e2d2e !important
      border-top:1px solid #4a4a4a
      box-shadow :none
    }
    display: flex
    align-items: center
    position: fixed
    left: 0
    bottom: 0
    z-index: 180
    width: 100%
    height: 120px
    background: #fff
    border-top:1px solid #ccc
    box-shadow:0 -1px 1px #ccc
    &.mini-enter-active, &.mini-leave-active{
      transition: all 0.4s
    }
    &.mini-enter, &.mini-leave-to{
      opacity: 0
    }
    .icon{
      flex: 0 0 80px
      width:120px
      padding: 0 10px 0 40px
      img{
        border-radius: 50%
        &.play{
          animation: rotate 10s linear infinite
        }
        &.pause{
          animation-play-state: paused
        }

      }

    }
    .text{
      display: flex
      flex-direction: column
      justify-content: center
      flex: 1
      line-height:40px
      overflow: hidden
      padding-left: 10px
      .name{
        margin-bottom: 2px
        no-wrap(){
          font-size: $font-size-medium
          color: $color-text
        }
      }
      .desc{
        no-wrap(){
          font-size: $font-size-small
          color: $color-text-d
        }
      }
    }
    .control{
      flex: 0 0 60px
      width:60px
      padding: 0 10px
      .iconfont{
        color:$color-font2
        font-size:$font-size-large-x
      }
      .icon-play-mini, .icon-pause-mini, .icon-playlist{
    /*    font-size: $font-size-medium
        color: $color-font1*/
      }
      .icon-mini{
    /*    font-size: $font-size-medium*/
        position: absolute
        left: 0
        top: 0
      }

    }

  }

}
  @keyframes rotate{
    0%{
      transform: rotate(0)
    }
    100%{
     transform: rotate(360deg)
    }
  }

</style>
