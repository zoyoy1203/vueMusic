<template>
  <div class="reply">
    <back-head title="回复" ico_color="#000"></back-head>
    <div class="item">
      <div class="img">
        <img :src="comment.user.avatarUrl" alt="">
      </div>
      <div class="text">
        <div class="text_t">
          <div class="text_t_l">
            <p class="username">{{comment.user.nickname}}</p>
            <p>{{comment.time | formatDate}}</p>
          </div>
          <div class="text_t_r">
            <span>{{comment.likedCount}}</span>
            <span class="icon iconfont icon-dianzan"></span>
          </div>
        </div>
        <div class="text_c">
          {{comment.content}}
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="reply">
      <div class="title">全部回复</div>
      <div class="item" v-for="(item,index) in comment.beReplied">
        <div class="img">
          <img :src="item.user.avatarUrl" alt="">
        </div>
        <div class="text">
          <div class="text_t">
            <div class="text_t_l">
              <p class="username">{{item.user.nickname}}</p>
          <!--    <p>{{item.time }}</p>-->
            </div>
            <div class="text_t_r">
              <span>{{item.likedCount}}</span>
              <span class="icon iconfont icon-dianzan"></span>
            </div>
          </div>
          <div class="text_c">
            {{item.content}}
          </div>
      <!--    <span class="reply" @click="goReply(item)">回复</span>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from 'common/js/date'
  import BackHead from 'base/back-head/back-head'
  export default {
    name: 'reply',
    components: {
      BackHead,
    },
    data() {
      return {
        comment:[],
      }
    },
    created() {
      this.comment = this.$route.params.comment
      console.log(this.comment)
    },
    methods: {

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
  .reply{
    .line{
      width: 100%
      height:15px
      background: $color-line1
    }
    .item{
      display: inline-block
      width:100%
      height:auto
      margin:20px auto
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
        }
      }
    }

    .reply{
      .title{
        width: 90%
        height:80px
        line-height:80px
        margin: 0 auto
      }
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
  }
</style>
