// 上下滑动歌单详情等页面 主模板
<template>
  <div class="wrapper">
    <!--头部-->
    <slot name="head" />
    <!--背景-->
    <div class="background">
      <slot name="background" />
    </div>
    <!--主体内容-->
    <div class="container">
      <div class="container_title" :style="{'height': container_title_h}">
        <slot name="container_title" />
      </div>
      <div  id="main" class="container_content" :class=" isTop ? 'isFixed' :'isRelative'">
        <slot name="container_content" />
      </div>
    </div>

  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import Scroll from 'base/scroll/scroll'
  export default {
    name: 'slider-main',
    props: {
      container_title_h:{
        type: String,
        default:'250px'
      }
    },
    components: {
      Scroll,
    },
    computed: {
      ...mapGetters([
        'isTop'
      ])
    },
    mounted () {
      document.addEventListener('scroll',this.listenScroll,false)
    },
    methods: {
      listenScroll() {

        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动高度
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight; //变量windowHeight是可视区的高度
        var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;//变量scrollHeight是滚动条的总高度

        var mainOffsetTop = document.querySelector('#main').offsetTop -20
        if(scrollTop > mainOffsetTop && !this.isTop){
          console.log("到顶部")
          this.setIsTop(true)
        }

      },
      ...mapMutations({
        setIsTop: 'SET_IS_TOP',
      })

    },
    destroyed () {
      document.removeEventListener('scroll',this.listenScroll)
    },
  }
</script>

<style scoped lang="stylus">
  .wrapper{
    width:100%;
      .background{
        position: relative
        left: 0
        top: -80px
        width: 100%
        height:660px
        overflow: hidden;
        z-index: -1;
      }
      .container{
        position: absolute
        left: 0
        top: 80px
        width: 100%
        color: $color-font1
        height: 100%;
        overflow:scroll;
        .container_title{
          filter:none
          width: 100%
        }
        .container_content{
          position:relative
          left: 0
          top: -30px
          width: 100%
          height:auto
          border-top-left-radius:40px
          border-top-right-radius:40px
          border:1px solid $color-line
          color: $color-font2
          background: #fff
          &.isRelative{
            position: relative
          }
          &.isFixed{
            position:fixed;
            top:80px;
            z-index:999;
          }
        }
      }
  }
</style>
