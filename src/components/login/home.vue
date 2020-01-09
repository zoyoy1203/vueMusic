<template>
    <div class="home">
      <div class="home_container">
        <div class="logo">
          <span class="icon iconfont icon-huabankaobei-"></span>
        </div>
        <button class="phone" @click="getPhone">
          手机号登录
        </button>
        <router-link tag="button" to="/found" class="go">
          立即体验
        </router-link>
        <div class="more">
          <span class="icon iconfont icon-weixin"></span>
          <span class="icon i_c iconfont icon-qq"></span>
          <span class="icon i_c iconfont icon-weibo"></span>
          <span class="icon iconfont icon-youxiang"></span>
          <div class="message" v-if="message">
            请勾选同意《用户协议》和《隐私政策》
          </div>
        </div>
        <div class="text">
          <span class="icon iconfont icon-fuxuankuang" v-if="flag" @click="flag=!flag"></span>
          <span class="icon iconfont icon--fuxuankuang" v-else  @click="flag=!flag"></span>
          <span>同意</span>
        《用户协议》和《隐私政策》
        </div>
        <div class="icp">
          <p>ICP证:<a href="http://www.beian.miit.gov.cn">浙ICP备18046278号-1</a></p>
        </div>
      </div>
    </div>

</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        flag:true,
        message:false
      }
    },
    methods: {
      getPhone() {
        if(this.flag){
          this.message = true
          setTimeout(() => {
            this.message = false
          },3000);

        }else{
          this.$router.push({
            path:'/phone'
          })
        }

      }
    }
  }
</script>

<style lang="stylus" scoped>
  * { touch-action: pan-y; }
  .icp{
    width:100%;
    text-align :center;
    margin-top:100px;
  }
.home{
  width: 100%
  height:100vh
  background: $color-background-home
  .home_container{
    width: 80%
    height: 100%
    margin:0 auto
    .logo{
      width: 100%
      height:750px
      text-align :center
      .icon{
        display:inline-block
        color: $color-font1
        font-size:$icon-size-large-x
        margin-top: 200px
        width:120px
        height:100px
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
        text-align :center
        color: $color-icon1
        font-size:$icon-size-large-x
      }
      .message{
        position: absolute
        width: 80%
        height:50px
        line-height :50px
        text-align center
        font-size:$font-size-medium
        background: rgba(0,0,0,0.7)
        color: $color-font1
      }
    }
    .text{
      text-align :center
      color: $color-font1
      font-size:$font-size-small
      margin-bottom:auto
      .icon{
        font-size:$icon-size-medium
      }
    }
  }

}
</style>
