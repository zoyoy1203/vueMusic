<template>
  <div class="radio">
    <back-head title="电台"></back-head>
    <div class="container" :class="modeType ? '' : 'night'">
      <div ref="scroll" class="scroll-content" :class="modeType ? '' : 'night'">
        <div>
          <div v-if="banners.length" class="slider-wrapper" ref="sliderWrapper">
            <slider>
              <div v-for="item in banners">
                <a href="#">
                  <img class="needsclick" @load="loadImage" :src="item.imageUrl">
                </a>
              </div>
            </slider>
          </div>
          <div class="navbar">
            <ul>
              <router-link tag="li" to="/djclass" class="nav " @click="">
                <div class="icon iconfont icon-leimupinleifenleileibie2" :class="modeType ? '' : 'night'"></div>
                <div class="text">电台分类</div>
              </router-link>
              <li class="nav " @click="">
                <div class="icon iconfont icon-paixingbang" :class="modeType ? '' : 'night'"></div>
                <div class="text">电台排行</div>
              </li>
              <li class="nav">
                <div class="icon iconfont icon-jingpin" :class="modeType ? '' : 'night'"></div>
                <div class="text">付费精品</div>
              </li>
              <li class="nav ">
                <div class="icon iconfont icon-diantai" :class="modeType ? '' : 'night'"></div>
                <div class="text">音乐课堂</div>
              </li>
            </ul>
          </div>
          <div class="list-content">
            <div class="list-title">
              <div class="list-title-left">
                电台推荐
              </div>
              <div class="list-title-right"  >
                换一换
              </div>
            </div>
            <ul class="list-center">
              <li @click="goRadiolistDetail(item.id)" v-for="(item, index) in djRecommend" v-if="index<3" :key="index" class="item">
                <div class="img">
                  <img v-lazy="item.picUrl" >
                </div>
                <div class="text" v-html="item.rcmdtext">
                </div>
              </li>
            </ul>
          </div>
          <div class="list-content">
            <div class="list-title">
              <div class="list-title-left">
                精品推荐
              </div>
              <div class="list-title-right"   >
                全部精品
              </div>
            </div>
            <ul class="list-center">
              <li @click="goDjPaygiftDetail(item.id)" v-for="(item, index) in  djPaygift" :key="index" class="item">
                <div class="img">
                  <img v-lazy="item.picUrl" >
                </div>
                <div class="text" v-html="item.rcmdText">
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'
  import Slider from 'base/slider/slider'
  import BackHead from 'base/back-head/back-head'
  import Scroll from 'base/scroll/scroll'
  import {getDjBanner, getDjRecommend, getDjPaygift} from 'api/api'
  export default {
    name: 'radio',
    components: {
      BackHead,
      Slider,
      Scroll
    },
    data () {
      return {
        banners:[],
        djRecommend:[],
        djPaygift:[],
      }
    },
    computed: {
      ...mapGetters([
        'modeType'
      ])
    },
    created () {
      this._getDjBanner()
      this._getDjRecommend()
      this._getDjPaygift()
    },

    methods: {
      goDjPaygiftDetail(id){
        this.$router.push({
          path:'/djPaygiftDetail',
          name:'djPaygiftDetail',
          params:{
            id:id
          }
        })
      },
      goRadiolistDetail(id) {
        this.$router.push({
          path:'/radiolistDetail',
          name:'radiolistDetail',
          params:{
            id:id
          }
        })
      },
      loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
          // this.$refs.scroll.refresh()
        }
      },
      _getDjBanner () {
        getDjBanner().then(res => {
          this.banners=res.data.banners
          console.log(res)
        }).catch(err =>{
          console.log(err)
        })
      },
      _getDjRecommend(){
        getDjRecommend(3).then(res => {
          console.log(res)
          this.djRecommend = res.data.djRadios
        }).catch(err => {
          console.log(err)
        })
      },
      _getDjPaygift() {
        getDjPaygift().then(res => {
          console.log(res)
          this.djPaygift = res.data.data.list
          console.log(this.djPaygift)
        }).catch(err => {
          console.log(err)
        })
      }

    }
  }
</script>

<style lang="stylus" scoped>
  .radio{
    .container{
      width: 100%
      height: 100%
      overflow: hidden
      .scroll-content{
        margin-top:$main-margin-top
        width: 100%
        height:auto
        overflow: hidden
        .slider-wrapper{
          position: relative
          width: 100%
          overflow: hidden
        }
        .navbar{
          width: 100%
          height:100px
          margin:20px 0
          .nav{
            float: left
            width: 100px
            height:150px
            margin:10px 42px
            line-height:100px
            text-align:center
            .icon{
              width:100px
              heihgt:100px
              border-radius:50px
              color:#fff
              background:$color-icon
              font-size: 40px
              &.night{
                background: #a9a9a9!important
                color: #fff!important
              }
            }
            .text{
              height 40px;
              line-height: 40px
              margin-top: 10px
              font-size:$font-size-small
            }

          }

        }

        .list-content{
          .list-title{
            height: 65px
            line-height: 65px
            text-align: center
            width:100%
            display: inline-block
            margin:20px auto;
            .list-title-left{
              float:left
              font-size:$font-size-large-x
              margin:0 20px
            }
            .list-title-right{
              float: right
              font-size:$font-size-small
              line-height: 40px
              width:140px
              heihgt:40px
              border-radius:20px
              border:1px solid $color-line
              margin:15px 20px

            }

          }

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
                font-size:$font-size-medium
              }
            }
          }

        }
      }


    }
  }

</style>
