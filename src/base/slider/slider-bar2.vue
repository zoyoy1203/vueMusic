<template>
  <div class="wrapper" ref="personWrap">
    <ul class="list">
      <li @click="" class="item" v-for="(item, index) in simiSingers" :key="index">
        <img :src="item.img1v1Url" alt="">
        <div class="song_title">
          <div class="song_title_t">{{item.name}}</div>
        </div>
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
  .list{
    display: inline-block
    width:2000px
    height:180px
    overflow-x :scroll
    overflow-y : hidden
    white-space : nowrap
    .item{
      float: left
      width:150px
      height: 100%
      img{
        width:150px
        height:150px

      }
    }
  }

</style>
