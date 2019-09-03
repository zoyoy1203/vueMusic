<template>
  <div class="container">
    <back-head title="付费精品" ico1="" ico2="icon-fenxiang"></back-head>

     <div class="background_color" >
       <img :src="djPaygift.picUrl" alt="">
     </div>
     <div class="content">
        <div class="title">
          <p class="name">{{djPaygift.name}}</p>
          <p class="text">{{djPaygift.rcmdText}} <span>最新上架</span> </p>
        </div>
        <div class="content_c">
          <div class="content_c1">
            <div class="title">
              免费试听
            </div>
            <div class="list">
              <ul>
                <li class="item" v-for="(item,index) in djPaygift.freePrograms">
                  <div class="item_l">
                    <div class="name">
                      {{item.name}}
                    </div>
                    <div class="tag">
                      <span class="icon iconfont icon-dianzan">{{item.likedCount}}</span>
                      <span class="icon iconfont icon-xiaoxi">{{item.commentCount}}</span>
                      <span class="icon iconfont icon-bofang1">{{item.listenerCount}}</span>
                    </div>
                  </div>
                  <div class="item_r">
                    <span class="icon iconfont icon-bofang"></span>
                  </div>
                </li>
              </ul>
              <div class="more_list">
                查看更多 <i class="iconfont icon-arrow-right"></i>
              </div>
            </div>
          </div>
          <div class="content_c2">
            <div class="title">精彩评论</div>
            <ul>
              <li class="item" v-for="(item,index) in djPaygift.commentDatas">
                <div class="img">
                  <img :src="item.userProfile.avatarUrl" alt="">
                </div>
                <div class="item_c">
                  <p class="item_name">{{item.userProfile.nickname}}</p>
                  <div class="item_c_comment">
                    {{item.content}}
                  </div>
                  <p class="item_b">——{{item.programName}}</p>
                </div>
              </li>
            </ul>

          </div>
          <div class="buy_notes">
            <div class="title">
              购买须知
            </div>
            <ol>
              <li>本音频课程为付费订阅产品￥99/20期，已更新完结，订阅成功后即可畅听/下载。</li>
              <li>对于课程有任何想法与建议，可添加微信xxxxxxxxx,备注课程名，入群参与互动讨论。</li>
              <li>请在网易云音乐手机APP支付购买，购买后支持移动，PC，Web等端收听。</li>
              <li>购买成功后不可退款，同时不支持转让，敬请谅解。</li>
              <li>购买过程中遇到任何问题，请私信联系@云音乐客服。</li>
            </ol>

          </div>
        </div>

      </div>

    <div class="footer">
      <div class="footer_l">
        <span class="iconfont icon-bofang"></span>
        免费试听
      </div>
      <div class="footer_r">
        购买： ￥99
      </div>
    </div>
  </div>
</template>

<script>
  import BackHead from 'base/back-head/back-head'
  import CommentList from 'components/comment/comment-list'
  import { getDjDetail} from 'api/api'
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    components:{
      BackHead,
      CommentList
    },
    data() {
      return{
        djPaygift:[],
      }
    },
    created () {
      if(this.$route.params.id){
        this.setRadioId(this.$route.params.id)
      }
      console.log(this.$route.params.id)

      this._getDjDetail()
    },
    computed: {
      ...mapGetters([
        'modeType',
        'radioId',
      ])
    },
    methods:{
      _getDjDetail(){
        getDjDetail(this.radioId).then(res => {
          console.log(res)
          this.djPaygift = res.data.djRadio
        }).catch(err => {
          console.log(err)
        })
      },
      ...mapMutations({
        setRadioId: 'SET_RADIO_ID',
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .container{
    width: 100%
    height:100%
    .background_color{
      position: relative
      left: 0
      top: -80px
      width: 100%
      height:660px
      background-repeat:no-repeat;
      background-size:cover;
      /*    filter:blur(15px);*/
      filter:brightness(75%);
      img{
        width: 100%
        height:100%
      }
    }
    .content{
      position: absolute
      left: 0
      top: 400px
      width: 100%
      height:500px
      .title{
        width: 90%
        margin: 0 auto
        color: $color-font1
        .name{
          height: 40px
          line-height:40px
          font-size: $font-size-medium
        }
        .text{
          font-size:$font-size-small
          color: $color-font7
          span{
            float: right
            color: $color-font7
          }
        }

      }
      .content_c{
        width: 100%
        height:500px
        margin-top: 20px
        background: #fff
        border-top-left-radius :30px
        border-top-right-radius :30px
        .title{
          height:80px
          line-height:80px
        }
        .content_c1{
          .title{
            width: 90%
            margin:0 auto
            height:80px
            line-height:80px
            font-size: $font-size-medium
            border-bottom:1px solid $color-line
            color:$color-font2
          }
          .list{
            width: 90%
            height:auto
            margin:0 auto
            ul{
              display: inline-block
              width: 100%
              height:auto
              .item{
                display: inline-block
                width: 100%
                height:auto
                margin:10px auto 20px auto
                .item_l{
                  float: left
                  height:100%
                  width:550px
                  .name{
                    width: 100%
                    line-height :45px
                    font-size:$font-size-medium
                    text-overflow :ellipsis
                    overflow: hidden;
                  }
                  .tag{
                    width: 85%
                    height:30px
                    line-height:30px
                    span{
                      margin-right:30px
                    }
                  }
                }
                .item_r{
                  float:right
                  width:80px
                  height: 100%
                  text-align :right
                  margin:20px 0
                  span{
                    font-size:$icon-size-medium
                  }

                }
              }
            }
            .more_list{
              width: 100%
              height:100px
              line-height:100px
              color: $color-font4
              text-align: center
            }
          }
        }

        .content_c2{
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
            .item_c{
              margin-left: 20px
              margin-bottom: 20px
              float: left
              width: 600px
              padding-bottom: 20px
              border-bottom: 1px solid $color-line1
              .item_name{
                font-size: $font-size-medium
                color: $color-font4
              }
              .item_c_comment{
                font-size:$font-size-medium-x
                margin:20px auto
              }
              .item_b{
                font-size: $font-size-small
                color: $color-font4
              }
            }
          }
        }
        .buy_notes{
          margin-bottom:100px
          .title{
            height:50px
            line-height:50px
            color:$color-font2
          }
          ol{
            width:90%
            margin: 0 auto
            li{
              list-style-type:decimal;
              list-style-position:inside;
              font-size:$font-size-small
              line-height:40px
            }
          }
        }
      }
    }
    .footer{
      position :fixed
      display: inline-block
      bottom: 0
      left: 0
      width: 100%
      height:100px
      line-height:100px
      border-top:1px solid $color-line
      .footer_l{
        float: left
        width: 40%
        height: 100%
        background: #fff
        text-align :center
        color:$color-icon2
        span{
          font-size:$icon-size-small
        }
      }
      .footer_r{
        float: left;
        width: 60%
        height: 100%
        background :$color-icon2
        text-align :center
        color: $color-font1
      }
    }
  }

</style>
