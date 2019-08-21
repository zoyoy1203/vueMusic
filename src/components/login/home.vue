<template>
    <div class="home">
      <div class="home_container">
        <div class="logo">
          <span class="icon iconfont icon-bofang"></span>
        </div>
        <button class="phone">
          手机号登录
        </button>
        <router-link tag="button" to="/found" class="go">
          立即体验
        </router-link>
        <div class="more">
          <span class="icon iconfont icon-diantai"></span>
          <span class="icon i_c iconfont icon-diantai"></span>
          <span class="icon i_c iconfont icon-diantai"></span>
          <span class="icon iconfont icon-diantai"></span>
        </div>
        <div class="text">
          <span class="icon iconfont icon-diantai"></span>
          <span>同意</span>
        《用户协议》和《隐私政策》
        </div>
      </div>
      </div>

</template>

<script>
  export default {
    name: 'home'
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
.home{
  display: inline-block
  width: 100%
  height:1334px
  background: $color-background-home
  .home_container{
    width: 80%
    height: 100%
    margin:0 auto
    .logo{
      width: 100%
      height:800px
      text-align :center
      .icon{
        display:inline-block
        color: $color-font1
        font-size:$icon-size-large-x
        margin-top: 200px
        width:100px
        height:80px
        border-radius :75px
        padding-top:20px
        background :$color-icon2
      }
    }
    .phone{
      width: 100%
      height:80px
      line-height:80px
      color: $color-font3
      border-radius:40px
      background: #fff
      border:none
    }
    .go{
      width: 100%
      height:80px
      line-height:80px
      color: $color-font1
      border-radius:40px
      background:$color-background-home
      border: 1px solid #fff
      margin-top:40px
    }
    .more{
      display:flex
      justify-content : space-between
      width: 100%
      height:100px
      margin-top:60px
      .icon{
        box-sizing :border-box
        display: inline-block
        width: 60px
        height:60px
        border-radius:30px
        text-align :center
        padding-top:10px
        border: 1px solid #fff
        color: $color-icon1
        font-size:$icon-size-medium-x
      }
    }
    .text{
      text-align :center
      color: $color-font1
      font-size:$font-size-small
    }
  }

}
</style>
