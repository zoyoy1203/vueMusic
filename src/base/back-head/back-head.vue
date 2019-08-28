<template>
  <div class="header" :style="{color:ico_color}">
    <div class="left">
      <span class="iconfont icon-prev" @click="prev"></span>
      <span class="title">{{title}}</span>
    </div>
    <div class="right" :style="{display:ico_display}">
      <span class="iconfont icon-sousuo"></span>
      <span class="iconfont icon-more-vertical"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'back-head',
    props: {
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
        default:"#fff"
      }
    },
    methods:{
      prev() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .header{
    position: relative
    top: 0
    left: 0
    height:80px
    width: 100%
    border-bottom:1px solid $color-line
    z-index:100
    .left{
      display: inline-block
      width: auto
      heihgt: auto
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
      heihgt:auto
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
