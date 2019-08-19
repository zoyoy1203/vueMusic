<template>
    <div class="m-header">
      <div class="left iconfont icon-liebiao"></div>
      <div class="center">
        <router-link tag="a" to="/me">我的</router-link>
        <router-link tag="a" to="/" exact>发现</router-link>
        <router-link tag="a" to="/cloud">云村</router-link>
        <router-link tag="a" to="/video">视屏</router-link>
      </div>
      <div class="right iconfont icon-sousuo"></div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .m-header{
    width: 100%
    height: 80px
    border-bottom: 1px solid #ccc
    .left{
      float:left
      width:115px
      height:auto
      margin: 20px 10px
      text-align:center
      font-size:$font-size-large
    }
    .center{
      float:left
      width:430px
      height:auto
      padding:20px 25px
      a{
        display: inline-block
        width:23%
        text-align:center
      }
      .router-link-active{
        color: #000
      }
    }
    .right{
      float: right
      width:115px
      height:auto
      margin: 20px 10px
      text-align :center
      font-size:$font-size-large
    }
  }
</style>
