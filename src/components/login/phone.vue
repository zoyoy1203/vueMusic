<template>
    <div class="phone_login" style="background: #fff;">
      <back-head title="手机号登录" ico_display="none" ico_color="#000"></back-head>
      <div class="container" :class="modeType ? '' : 'night'">
        <p>未注册手机号登录后将自动创建账号</p>
        <form @submit.prevent="phoneLogin">
          <input class="phone"  v-model="number" type="text" placeholder="请输入手机号">
          <button type="submit">下一步</button>
        </form>

        <div class="message" v-if="message">
          请输入正确的手机号
        </div>
      </div>
    </div>
</template>

<script>
  import BackHead from 'base/back-head/back-head'
  import {mapGetters} from 'vuex'
  export default {
    name: 'phone',
    components: {
      BackHead
    },
    data() {
      return {
        number:"",
        message:false
      }
    },
    computed: {
      ...mapGetters([
        'modeType'
      ])
    },
    methods: {
      phoneLogin() {
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(this.number)) {
          this.message = true
          setTimeout(() => {
            this.message = false
          },3000);
        } else {
          var that = this
          this.$router.push({
            path:'/password',
            name:'password',
            params: {
              number:that.number
            }
          })
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
.phone_login{
  width: 100%
  height:auto
  .container{
    width: 90%
    height:auto
    margin:100px auto 0 auto
    p{
      margin: 30px 0
      font-size:$font-size-medium
      color: $color-font4
    }
    input{
      width: 100%
      height: 60px
      margin-top:20px
      border-bottom:1px solid #000
      outline:none
    }
    button{
      width: 100%
      height:80px
      margin-top: 60px
      line-height :80px
      text-align :center
      color: $color-font1
      background: $color-icon
      border:none
      border-radius :40px
      font-size:$font-size-medium-x
    }
    .message{
      position: absolute
      bottom: 300px
      width:300px
      margin: 0 200px
      height:50px
      line-height :50px
      text-align center
      font-size:$font-size-medium
      background: rgba(0,0,0,0.7)
      color: $color-font1
    }
  }
}
</style>
