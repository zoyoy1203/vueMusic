<template>
  <ul class="list-center">
    <li @click="goSonglistDetail(item)" v-for="(item, index) in songlist"  :key="index" class="item">
      <div class="img">
        <img v-lazy="item.picUrl" v-if="img === 'picUrl'">
        <img v-lazy="item.coverImgUrl" v-if="img === 'coverImgUrl'">
        <img v-lazy="item.album.picUrl" v-if="img === 'album.picUrl'">
      </div>
      <div class="text" v-html="item.name">
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'songs',
    props: {
      songlist: {
        type:Array,
        default:[]
      },
      img:{
        type: String,
        default:""
      },
      imgUrl:{
        type:String,
        default:""
      }
    },
    created() {
      console.log(this.songlist)
    },
    mounted() {
    },
    methods: {

      goSonglistDetail(item) {
        this.$router.push({
          path: '/songlistdetail',
          name: 'songlistdetail',
          params: {
            id: item.id
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .list-center{
    display: flex
    width: 100%
    height:auto
    flex-wrap: wrap
    justify-content :center
    align-items: center
    .item{
      display: flex
      flex-direction:column
      box-sizing: border-box
      padding: 0 20px 20px 20px
      width:33%
      .img{
        flex: 0 0 60px
        width:100%
        padding-right: 20px
        img{
          width: 100%
          heihgt: auto
        }
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
  }

</style>
