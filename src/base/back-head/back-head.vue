// 返回头部模板
<template>
  <div class="header"
       :style="{color:ico_color,head_style}"
       :class="[modeType ? '' : 'night',styleClass]"
  >
    <div class="left">
      <span class="iconfont icon-prev" @click="prev"></span>
      <span class="title">{{title}}</span>
    </div>
    <div class="right" :style="{display:ico_display}">
      <span class="iconfont " :class="ico1"></span>
      <span class="iconfont " :class="ico2"></span>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'back-head',
    props: {
      head_style:{
        type:String,
        default:""
      },
      styleClass: {
        type:String,
        default:""
      },
      title: {
        type: String,
        default:""
      },
      ico_display: {
        type: String,
        default: "inline-block"
      },
      ico_color: {
        type:String,
        default:""
      },
      ico1:{
        type:String,
        default:"icon-sousuo"
      },
      ico2:{
        type:String,
        default:"icon-more-vertical"
      }
    },
    computed:{
      ...mapGetters([
        "modeType",
      ])
    },
    methods:{
      prev() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .header{
    box-sizing :border-box
    position: fixed
    top: 0
    left: 0
    height:80px
    width: 100%
    border-bottom:1px solid $color-line
    z-index:100
    background:#fff;
    &.topColor{
      background:#FFFAFA
    }
    &.night{
      background: #000
      color: #fff
    }
    .left{
      display: inline-block
      width: auto
      float: left
      margin: 20px
      .title{
        display: inline-block
        width:450px
        text-overflow :ellipsis
        white-space :nowrap
        overflow :hidden
      }
      span{
        font-size:40px
        margin-right:20px
      }
    }
    .right{
      display: inline-block
      width:130px
      float: right
      margin: 20px
      text-align:right
      span{
        font-size:40px
        margin-left:20px
      }
    }
  }

</style>
