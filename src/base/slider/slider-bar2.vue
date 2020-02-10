// 我的页面-> 我的音乐里的横向滑动列表
<template>
  <div class="wrapper" ref="personWrap">
    <ul class="my_music_nav">
      <li class="nav">
        <p class="icon iconfont icon-shixin" :class="modeType ? '' : 'night'" style="color:red"></p>
        <p class="text">我喜欢的音乐</p>
      </li>
      <li class="nav ">
        <p class="icon iconfont icon-mayi-diantai" :class="modeType ? '' : 'night'"></p>
        <p class="text">私人FM</p>
        <p class="desc">最懂你的推荐</p>
      </li>
      <router-link tag="li" to="/leaderboard" class="nav">
        <p class="icon iconfont icon-meirituijian-" :class="modeType ? '' : 'night'"></p>
        <p class="text">私藏推荐</p>
        <p class="desc">最懂你的推荐</p>
      </router-link>
      <li class="nav ">
        <p class="icon iconfont icon-kongjian" :class="modeType ? '' : 'night'"></p>
        <p class="text">Sati空间</p>
        <p class="desc">减压轻音乐</p>
      </li>
      <li class="nav ">
        <p class="icon iconfont icon-geshou" :class="modeType ? '' : 'night'"></p>
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
      margin:10px 10px;
      line-height:100px;
      text-align:center;
      background-color: #ccc;
      color: #fff;
      border-radius: 20px;
      .icon{
        margin:50px auto 0 auto;
        font-size: $icon-size-large
      }
      .text{
        margin-top:0;
        height: 30px;
        line-height :30px;
        font-size: $font-size-small-x
      }
    }
  }
</style>
