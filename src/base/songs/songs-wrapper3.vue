// 歌曲列表组件模块2

<template>
  <div class="wrapper" @click="paly()">
    <img :src="img" alt="">
    <div class="content">
      <p class="title">
        {{title}}
        <span class="artists">
          - {{artists}}
        </span>
      </p>
    </div>
    <div class="play">
      <span class="icon iconfont icon-bofang"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'songs-wrapper3',
    props:{
      img:{
        type:String,
        default: require('common/image/default.jpg')
      },
      title:{
        type:String,
        default:'暂无信息！'
      },
      artists:{
        type:String,
        default:'未知'
      }
    },
    methods:{
      play(){

      }
    }
  }
</script>

<style lang="stylus" scoped>
.wrapper{
  display:flex;
  width:100%;
  height:150px;
  flex-direction:row;
  img{
    width:150px;
    height:150px;
    border-radius:15px;
  }
  .content{
    width:400px;
    height:100%;
    padding-left:10px;
    .title{
      width:100%;
      height:50px;
      line-height:50px;
      margin-top:50px;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      .artists{
        font-size:$font-size-small-x;
        color:$color-font9;

      }
    }
  }
  .play{
    height:150px;
    flex:1;
    line-height:150px;
    span{
      font-size:$icon-size-medium-x;
    }
  }
}
</style>
