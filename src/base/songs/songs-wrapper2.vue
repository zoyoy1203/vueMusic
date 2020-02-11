// 歌单列表组件模块2

<template>
  <div class="wrapper" @click="goSonglistDetail()">
    <img :src="img" alt="">
    <div class="text">{{text}}</div>
  </div>
</template>
<script>
  export default {
    name: 'songs-wrapper2',
    props:{
      img: {
        type:String,
        default:null
      },
      text:{
        type:String,
        default:'暂无信息！'
      },
      id:{
        type:Number,
        default:null
      }
    },
    methods:{
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
    width: 200px;
    height:280px;
    img{
      width:200px;
      height:200px;
      border-radius:20px;
    }
    .text{
      width: 100%
      height:80px
      line-height: 40px
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      white-space: normal !important;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size:$font-size-small-x
    }
  }
</style>
