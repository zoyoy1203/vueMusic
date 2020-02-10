<template>
    <div class="m-header"  :class="head_color">
      <div class="left iconfont icon-liebiao" @click="handleIconClick"></div>
      <div class="center">
        <router-link tag="a" to="/me">我的</router-link>
        <router-link tag="a" to="/found" exact>发现</router-link>
        <router-link tag="a" to="/cloud">云村</router-link>
        <router-link tag="a" to="/videolist">视屏</router-link>
      </div>
      <router-link tag="div" to="/search" class="right iconfont icon-sousuo"></router-link>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
export default {
  props: {
    head_color: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters([
      'modeType'
    ])
  },
  methods: {
    handleIconClick() {
     /* if (this.moving) return;*/
      this.$emit('icon-click');
    },
  }
}
</script>

<style lang="stylus" scoped>
  .dark{
    .left{
      color: #fff!important
    }
    .right{
      color: #fff!important
    }
    .center{
      .router-link-active{
        color: #fff!important
      }
    }
  }
  .m-header{
    width: 100%
    height: 80px
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
