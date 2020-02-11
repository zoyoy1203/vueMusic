// 我的页面-> 我的音乐里的横向滑动列表
<template>
  <div class="wrapper" ref="personWrap">
    <ul class="my_music_nav">
      <li class="nav nav_like">
        <p class="icon iconfont icon-shixin"  style="color:red"></p>
        <p class="text">我喜欢的音乐</p>
      </li>
      <li class="nav nav_fm" >
        <div class="bg" :style="{backgroundImage:`url(${nav_fm_bg})`}"></div>
        <div class="nav_fm_p">
          <p class="icon iconfont icon-mayi-diantai" ></p>
          <p class="text">私人FM</p>
          <p class="desc">你的私人曲库</p>
        </div>
      </li>
      <li class="nav nav_rec">
        <p class="rec">推荐</p>
        <p class=" icon iconfont icon-meirituijian-" ></p>
        <p class="text">私藏推荐</p>
        <p class="desc">最懂你的推荐</p>
      </li>
      <li class="nav nav_rec">
        <p class="rec">推荐</p>
        <p class=" icon iconfont icon-kongjian" ></p>
        <p class="text">Sati空间</p>
        <p class="desc">减压轻音乐</p>
      </li>
      <li class="nav nav_rec">
        <p class="rec">推荐</p>
        <p class=" icon iconfont icon-geshou" ></p>
        <p class="text">歌手兴趣圈</p>
        <p class="desc">一起畅聊歌手</p>
      </li>
    </ul>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {mapGetters, mapMutations} from 'vuex'
  import {getSimiSinger} from 'api/api'
  export default {
    name: 'slider-bar2',
    data() {
      return {
        nav_fm_bg: require('common/image/FM.jpg'),
      }
    },
    created() {
      this.$nextTick(() => {
        this.personScroll();
      });
    },
    computed: {
      ...mapGetters([
        'modeType',
      ])
    },
    methods: {
      ...mapMutations({
        setModeType: 'SET_MODE_TYPE',
      }),
      personScroll(){
        // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.personWrap, {
              startX: 0,
              click: true,
              scrollX: true,
              // 忽略竖直方向的滚动
              scrollY: false,
              eventPassthrough: "vertical"
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .my_music_nav{
    width:1200px;
    overflow-x :scroll;
    overflow-y : hidden;
    white-space : nowrap;
    .nav{
      float: left;
      width: 220px;
      height:300px;
      margin:10px 20px 0 0;
      line-height:100px;
      text-align:center;
      background-color: $color-bg1;
      color: $color-font1;
      border-radius: 20px;
      &.nav_like{
        background-image: linear-gradient(to top left, #2c2c2c, #ccc)
      }
      &.nav_fm{
        position: relative;
        background:none;
        .bg{
          width:100%;
          height:100%;
          background-size:cover;
          filter:brightness(60%);
        }
        .nav_fm_p{
          position: absolute;
          top:0;
          left:0;
          bottom:0;
          right:0;
        }
      }
      p{
        z-index:111;
      }
      .icon{
        margin:50px auto 0 auto;
        font-size: $icon-size-large;
      }
      .text{
        margin-top:0;
        height: 30px;
        line-height :30px;
        font-size: $font-size-small-x;
      }
      .desc{
        height: 30px;
        line-height :30px;
        margin-top:70px;
        font-size: $font-size-small-x;
      }
      .rec{
        height:50px;
        line-height:50px;
        font-size: $font-size-small
        color: $color-font9;
      }
      &.nav_rec{
        color: $color-font9;
        .icon{
          color: $color-font2;
          margin:0 auto;
        }
      }
    }
  }
</style>
