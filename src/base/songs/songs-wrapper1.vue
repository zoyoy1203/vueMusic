// 歌单列表组件模块1

<template>
  <div class="wrapper" @click="goSonglistDetail()">
    <img :src="img" alt="">
    <div class="content">
      <div class="text1">{{text1}}</div>
      <p class="text2">{{text2}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'songs-wrapper1',
    props:{
      img:{
        type:String,
        default:require('common/image/default.jpg')
      },
      text1:{
        type:String,
        default:'暂无信息！'
      },
      text2:{
        type:String,
        default:'暂无信息！'
      },
      id:{
        type:Number,
        default:null
      }
    },
    methods: {
      goSonglistDetail() {
        this.$router.push({
          path: '/songlistdetail',
          name: 'songlistdetail',
          params: {
            id: this.id
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .wrapper{
    float: left;
    width:50%;
    height:100%;
    img{
      position: absolute;
      width:130px;
      height: 130px;
      border-radius:20px;
    }
    .content{
      width:100%;
      height:100%;
      padding: 20px 0 20px 145px;
      .text1{
        width:100%;
        height:60px;
        line-height: 30px;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size:$font-size-small-x
      }
      .text2{
        height:30px;
        line-height:30px;
        font-size:$font-size-small-x;
        color:$color-font9;
        margin-top:10px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>
