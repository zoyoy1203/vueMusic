<template>
  <div>
    <div class="navlist">
      <ul>
        <li class="navli"  v-for="(item,index) in navList" @click="tabClick(index)"><i :class="{'activeT':nowIndex===index}" >{{item.name}}</i>
        </li>
      </ul>
    </div>
    <div class="swiper-container swiper_con">
      <div class="swiper-wrapper">
        <!-- 第一个swiper -->
        <div class="swiper-slide" ref="viewBox">
          <div class="content">
            <div class="title">
              <span>歌单</span>
              <span>{{songList.length}}</span>
            </div>
            <ul>
              <li class="item" v-for="(item, index) in songList">
                <div class="item_l">
                  <img :src="item.coverImgUrl" alt="">
                </div>
                <div class="item_r">
                  <p class="name">{{item.name}}</p>
                  <p class="text">
                    <span>{{item.trackCount}}首</span>
                    <span>播放{{item.playCount}}次</span>
                  </p>
                </div>
              </li>
            </ul>

          </div>

        </div>
        <!-- 第二个swiper -->
        <div class="swiper-slide">2222
        </div>
        <div class="swiper-slide">3333
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  import Swiper from 'swiper'
  import {getUserDj,  getUserSonglist} from 'api/api'
  import {mapGetters} from 'vuex'
  export default {
    name: "test",
    data() {
      return {
        navList:[
          {name:'音乐'},
          {name:'动态'},
          {name:'关于TA'}
        ],
        nowIndex:0,
        djList:[],
        songList:[],

      }
    },
    props: {

    },
    computed: {
      ...mapGetters([
        'modeType',
        'otherUserId'
      ])
    },
    created(){
      this._getUserDj()
      this._getUserSonglist()
    },
    mounted() {
      var that=this
      that.mySwiper = new Swiper('.swiper-container',{
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
      // this.getList();
    },
    methods: {
      _getUserDj() {
        getUserDj(this.otherUserId).then(res => {
          console.log(res)
          this.djList = res.data
        }).catch(err => {
          console.log(err)
        })
      },
      _getUserSonglist() {
        getUserSonglist(this.otherUserId).then(res => {
          console.log(res)
          this.songList = res.data.playlist
          console.log(this.songList)
        }).catch(err => {
          console.log(err)
        })
      },
      tabClick(index){
        this.nowIndex = index
        this.mySwiper.slideTo(index,1000,false)
      },
    },

  }
</script>

<style lang="stylus" scoped>
  .navlist{
    width:100%;
    height:80px;
    border-bottom:1px solid rgba(151,151,151,0.1);
    position:relative;
    .navli{
      width: 33%
      text-align:center;
      float:left;
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

  /*.swiper_con{
    width:100%;
    margin-bottom:40px;
    position:relative;
  }*/

  .content{
    .title{
      width: 100%
      padding: 0 5%
      height:60px
      line-height:60px
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
          width:w-150
          height:150px
          margin-left:20px
          p{
            &.name{
              width: 600px
              height:40px
              line-height:40px
              font-size:$font-size-medium
              margin-top:40px
              overflow:hidden
              text-overflow :ellipsis
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

</style>
