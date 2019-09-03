<template>
  <div class="wrapper" ref="personWrap">
    <ul ref="personTab">
      <li class="nav " @click="goRecommendSongs()">
        <div class="icon iconfont icon-kongjian" :class="modeType ? '' : 'night'"></div>
        <div class="text">Sati空间</div>
      </li>
      <li class="nav " @click="goSonglist()">
        <div class="icon iconfont icon-mayi-diantai" :class="modeType ? '' : 'night'"></div>
        <div class="text">私人FM</div>
      </li>
      <router-link tag="li" to="/leaderboard" class="nav">
        <div class="icon iconfont icon-wodetuijian" :class="modeType ? '' : 'night'"></div>
        <div class="text">私藏推荐</div>
      </router-link>
      <li class="nav ">
        <div class="icon iconfont icon-icon--" :class="modeType ? '' : 'night'"></div>
        <div class="text">最新电音</div>
      </li>
      <li class="nav ">
        <div class="icon iconfont icon-zhibo" :class="modeType ? '' : 'night'"></div>
        <div class="text">直播</div>
      </li>
      <li class="nav ">
        <div class="icon iconfont icon-aixin" :class="modeType ? '' : 'night'"></div>
        <div class="text">应乐交友</div>
      </li>
      <li class="nav ">
        <div class="icon iconfont icon-airudiantubiaohuizhi-zhuanqu_qinzichengchang" :class="modeType ? '' : 'night'"></div>
        <div class="text">亲子频道</div>
      </li>
      <li class="nav ">
        <div class="icon iconfont icon-yueqin" :class="modeType ? '' : 'night'"></div>
        <div class="text">古典专区</div>
      </li>
      <li class="nav ">
        <div class="icon iconfont icon-paobu" :class="modeType ? '' : 'night'"></div>
        <div class="text">跑步FM</div>
      </li>
      <li class="nav ">
        <div class="icon iconfont icon-diantai" :class="modeType ? '' : 'night'"></div>
        <div class="text">小冰电台</div>
      </li>
      <li class="nav ">
        <div class="icon iconfont icon-cheliang" :class="modeType ? '' : 'night'"></div>
        <div class="text">驾驶模式</div>
      </li>
    </ul>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    name: 'slider-bar',
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
    ul{
      width:1700px
      height: 100%
      overflow-x :scroll
      overflow-y : hidden
      white-space : nowrap
      border-bottom:1px solid #ccc
      .nav{
        float: left
        width: 100px
        height:150px
        margin:10px 25px
        line-height:100px
        text-align:center
        .icon{
          width:100px
          heihgt:100px
          border-radius:50px
          color:#fff
          background:$color-icon
          font-size: 40px
          &.night{
            background: #a9a9a9!important
            color: #fff!important
          }
        }
        .text{
          height 40px;
          line-height: 40px
          margin-top: 10px
          font-size:$font-size-small
        }

      }

    }


</style>
