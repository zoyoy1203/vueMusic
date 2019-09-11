<template>
  <div class="swiper_container">

    <ul class="navlist">
      <li class="navli"  v-for="(item,index) in navList" @click="tabClick(index)">
        <i :class="{'activeT':nowIndex===index}" >{{item.name}}</i>
      </li>
    </ul>

    <div  class="swiper-container ">
      <div class="swiper-wrapper">
        <!-- 第一个swiper -->
        <div class="swiper-slide"  v-for="(item,index) in navList">
          <slot :name="'slot-item-'+index"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  export default {
    name: 'swiper_list',
    data(){
      return{
        mySwiper:'',
        nowIndex:0,
      }
    },
    props: {
      navList:{
        type:Array,
        default:[],
      }
    },
    created() {

    },
    mounted(){
      this.initSwiper()
    },
    methods:{
      tabClick(index){
        this.nowIndex = index
        this.mySwiper.slideTo(index,1000,false)
      },
      initSwiper(){
        var that=this
        this.mySwiper = new Swiper('.swiper-container',{
          initialSlide:0,
          autoplay:false,
          keyboardControl:true,
          autoHeight:true,
          observer:true,
          observeParents:true,
          //引入的swiper为3之后的版本
          onSlideChangeStart:function(){
            // console.log(that.mySwiper.activeIndex)
            that.nowIndex=that.mySwiper.activeIndex
          },
          //引入的版本为4之后的版本
          on: {
            slideChangeTransitionStart: function() {
              that.nowIndex = that.mySwiper.activeIndex
            },
          },
        });
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .navlist{
    display:flex
    height:80px
    border-bottom:1px solid $color-line1
    /*border-bottom:1px solid rgba(151,151,151,0.1);*/
   /* position:relative;*/
    .navli{
        flex: 1
        text-align:center;
        line-height:80px
        height:80px
        i{
          height: 80px
          font-style: normal;
          font-size: $font-size-medium
          &.activeT{
            color:$color-font3
            padding-bottom: .3rem;
            border-bottom: 4px solid $color-font3
          }
        }
      }
  }

  .swiper-container{
    .swiper-wrapper{
      .swiper-slide{
        .list-wrapper{
          width: 100%
          height:1134px
          .title{
            width: 100%
            padding: 0 5%
            height:60px
            line-height:60px
            .name{
              font-weight:500
              font-size:$font-size-medium
            }
            .num{
              color: $color-font4
              font-size:$font-size-small
            }
          }
          ul{
            width: 100%
            padding: 0 5%
            .item{
              display: inline-block
              width: 100%
              height:150px
              .item_l{
                float: left;
                width:150px
                height:100%
                img{
                  width: 100%
                  height:100%
                }
              }
              .item_r{
                float: left;
                width:500px
                height:150px
                margin-left:20px
                p{
                  &.name{
                    width: 100%
                    height:40px
                    line-height:40px
                    font-size:$font-size-medium
                    margin-top:40px
                    overflow:hidden
                    text-overflow :ellipsis
                    white-space:nowrap
                  }
                  &.text{
                    height:30px
                    line-height:30px
                    font-size:$font-size-small-x
                    color: $color-font4
                  }
                }
              }
            }
          }
        }

        .list-wrapper2{
          width: 100%
          height:1134px
          ul{
            width: 100%
            padding:0 5%
            .item{
              display: inline-block
              width: 100%
              height:auto
              border-bottom:1px solid $color-line1
              margin-bottom:30px
              margin-top:30px
              .item_l{
                float: left;
                img{
                  width:70px
                  height:70px
                  border-radius :35px
                }
              }
              .item_r{
                float: left;
                width:600px
                padding-left:20px
                .name{
                  height: 40px
                  line-height: 40px
                  font-size:$font-size-medium
                }
                .time{
                  height: 30px
                  line-height: 30px
                  font-size:$font-size-small
                }
                .text{
                  height:auto
                  line-height: 40px
                  font-size:$font-size-medium
                }
                .img{
                  width: 100%
                  height:300px
                  img{
                    width:200px
                    height:200px
                  }
                }
                .tag{
                  display: inline-block
                  width: 100%
                  height:100px
                  line-height:100px
                  .tag_c{
                    float: left
                    margin-right:70px
                    i{
                      font-size:$icon-size-small-x

                    }
                  }
                }
              }
            }
          }
        }
        .list-wrapper3{
          .content{
            width: 100%
            padding:0 5%
            .title{
              height:80px
              line-height:80px
              font-size:$font-size-medium
              font-weight:600
            }
          }
        }
      }
    }
  }

</style>
