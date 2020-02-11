<template>
  <div class="wrapper">
    <span class="left">{{title}}</span>
    <span class="right icon iconfont " :class="icon1"></span>
    <span class="right">{{text1}}</span>
    <span class="right icon iconfont " :class="icon2"></span>
  </div>
</template>

<script>
  export default {
    name: 'navbar',
    props:{
      title:{
        type:String,
        default:''
      },
      icon1:{
        type:String,
        default:''
      },
      text1:{
        type:String,
        default:''
      },
      icon2:{
        type:String,
        default:''
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .wrapper{
    width:100%;
    height: 80px;
    line-height :80px;
    .left{
      float: left;
    }
    .right{
      float :right;
    }
    .icon{
      font-size: $icon-size-medium;
      color:$color-font9;
    }
  }
</style>
