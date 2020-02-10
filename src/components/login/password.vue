<template>
  <div class="phone_login">
    <back-head title="手机号登录" ico_display="none" ico_color="#000"></back-head>
    <form class="container" @submit.prevent="getLogin">
      <input class="password"  v-model="password" type="password" placeholder="请输入密码" autocomplete='off'>
      <button type="submit">登录</button>
      <div class="message" v-if="message">
        用户名或者密码错误
      </div>
    </form>
  </div>
</template>

<script>
  import BackHead from 'base/back-head/back-head'
  import { phoneLogin, getUserStatus} from 'api/api'
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    name: 'password',
    data() {
      return {
        password:"",
        message:false
      }
    },
    components: {
      BackHead
    },
    computed: {
      ...mapGetters([
        'phone',
        'userId',
        'username',
        'avatarUrl',
        'isLogin'
      ])
    },
    methods: {
      // 获取登录用户信息并存储
      _getUserStatus() {
        getUserStatus().then(res => {
          var profile = res.data.profile
          this.setUserId(profile.userId)
          this.setUsername(profile.nickname)
          this.setAvatarUrl(profile.avatarUrl)
        }).catch(err => {
          console.log(err)
        })
      },
      getLogin() {
        var phone = this.$route.params.number

        phoneLogin(phone,this.password).then(res => {
          // 判断登录是否成功
          if (res.data.code === 200){
            this.setPhone(phone)
            this.setIsLogin(true)
            this.$router.push({
              path:'/found'
            })
          }else{
            // 设置登录状态
            this.setIsLogin(false)
            // 显示登录失败提示，3s后消失
            this.message = true
            setTimeout(() => {
              this.message = false
            },3000);
          }

        }).catch(err => {
          console.log(err)
          this.setIsLogin(false)
          this.message = true
          setTimeout(() => {
            this.message = false
          },3000);
        })
      },
      ...mapMutations({
        setPhone: 'SET_PHONE',
        setUserId: 'SET_USER_ID',
        setUsername: 'SET_USERNAME',
        setAvatarUrl: 'SET_AVATAR_URL',
        setIsLogin: 'SET_IS_LOGIN'
      }),
    },
    beforeDestroy() {
      console.log("销毁之前")
      this._getUserStatus()
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
      input{
        width: 100%
        height: 60px
        margin-top:100px
        border-bottom:1px solid #000
        outline:none
      }
      button{
        width: 100%
        height:80px
        margin-top: 80px
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
