<template>
  <div class="comment">
    <div class="item" v-for="(item,index) in comment">
      <div class="img">
        <img :src="item.user.avatarUrl" alt="">
      </div>
      <div class="text">
        <div class="text_t">
          <div class="text_t_l">
            <p class="username">{{item.user.nickname}}</p>
            <p>{{item.time | formatDate}}</p>
          </div>
          <div class="text_t_r">
            <span>{{item.likedCount}}</span>
            <span class="icon iconfont icon-dianzan"></span>
          </div>
        </div>
        <div class="text_c">
          {{item.content}}
        </div>
        <p class="reply" @click="goReply(item)" v-if="item.beReplied.length>0">回复</p>
      </div>
    </div>
    <div class="more_hot_comment">
      <span >全部评论》</span>
    </div>
  </div>
</template>

<script>
  import {formatDate} from 'common/js/date'
  export default {
    name: 'comment-list',
    props:{
      comment:{
        type:Array,
        default:() => []
      }
    },
    methods: {
      goReply(item) {
        this.$router.push({
          path:'/reply',
          name:'reply',
          params:{
            comment:item
          }
        })
      },
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .comment{
    margin-top:20px
    .item{
      display: inline-block
      width:100%
      height:auto
      .img{
        padding-left:5%
        img{
          float: left
          width:60px
          height:60px
          border-radius :30px
        }
      }

      .text{
        margin-left: 20px
        margin-bottom: 20px
        float: left
        width: 600px
        border-bottom: 1px solid $color-line1
        .text_t{
          display: inline-block
          width:100%
          margin-bottom:20px
          .text_t_l{
            display: inline-block
            height:60px
            line-height:30px
            p{
              font-size:$font-size-small-s
              &.username{
                font-size:$font-size-small
              }
            }
          }
          .text_t_r{
            display: inline-block
            float: right
            height:60px
            line-height:60px
            font-size:$font-size-small
            .icon{
              font-size: $font-size-medium
            }
          }
        }
        .text_c{
          width: 100%
          height:auto
          line-height:40px
          font-size:$font-size-medium
        }
        .reply{
          height:40px
          line-height:40px
          margin-top: 10px
          font-size:$font-size-small
          color:$color-font5
        }
      }
    }
    .more_hot_comment{
      display: inline-block
      width: 100%
      height:100px
      line-height:100px
      text-align:center
      border-bottom:1px solid $color-line1
      span{
        border:1px solid $color-line
        border-radius :20px
        padding:10px 15px
        margin:0 auto
        font-size:$font-size-small
      }
    }
  }
</style>
