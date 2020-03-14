<template>
 <div class="songlist">
   <div class="background" :style="{'background':'url('+background+')'}">
   </div>
   <back-head title="歌单广场" ico_display="none" :ico_color="modeType ? '#000' : '#fff'" style="border:none;background:none;">
   </back-head>

  <!--导航-->
    <div class="navList" :class="[modeType ? '' : 'night']">
      <ul>
        <li  v-for="(item, index) in title" :key="index"  @click="liseGo(index)">
      <span class="tag" :class="{myColor:index==isActive}">
        {{item.name}}
      </span>
        </li>
      </ul>
    </div>
    <scroll  ref="scroll"
          :listenScroll="false"
          :preventDefault="false"
          :pulldown="false"
          :pullup="true"
          @pullingUp="pullingUp"
          id="wrapper" class="list-wrapper" >

      <div id="lao" class="warp">
        <div class="slider">
          <slider3d :piclist="sliderImg" @getImgIndex="getImgIndex" class="slider3d"> </slider3d>
        </div>
        <!--内容-->
        <div class="mainContent" :class="modeType ? '' : 'night'">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item, index) in title" :key="index">
                <songs :songlist="songlist" img="coverImgUrl"></songs>
              </div>
            </div>
          </div>
        </div>
      </div>
 

    </scroll>

 </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import BackHead from 'base/back-head/back-head'
  import Swiper from 'swiper'
  import Songs from 'base/songs/songs'
  import Slider3d from 'base/slider/slider3d'
  import {getHotlist, getSonglist} from 'api/api'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'songlist',
    data() {
      return{
        mySwiper: '',
        isActive: 0,
        title: [], //热门歌单类型
        songlist: [],//歌单内容
        sliderImg:[],//旋转木马轮播图
        once:true,//是否是第一次请求
        list:[],
        ids:'',//热门歌单所有id
        loading:false,
        loadingMore:false,
        isScroll:true,
        offset:0,
        limit:20,
        imgIndex:'',
        background:''
      }
    },
    components: {
      BackHead,
      Songs,
      Slider3d,
      Scroll
    },computed: {
      ...mapGetters([
        'modeType'
      ])
    },
    created() {
      this._getTitle()
    },
    mounted: function () {
      // 初始化swiper
      /*   this.getSwiper()*/
    },
    methods: {
       pullingUp() {
        console.log("上拉加载啊")
        console.log(this.isScroll)
        if (this.isScroll) {
          this.isScroll = false
      /*    this.loadingMore = true*/
          this.offset +=20
          console.log('请求刷新------------')
          this._getSonglist(this.isActive,this.offset,this.limit)
        }
      },
      getImgIndex(index) {
        this.imgIndex = index
        console.log(this.imgIndex)
        this.background = this.sliderImg[this.imgIndex].coverImgUrl
        console.log(this.background)
      },
      ...mapMutations({
        setModeType: 'SET_MODE_TYPE'
      }),
      liseGo(index) {
        this.isActive = index;
        this.mySwiper.slideTo(index, 500, false); //切换到第index个slide，速度为0.5秒
      },
      //封装swiper
      getSwiper() {
        var that = this;
        // swiper-container  class名称
        this.mySwiper = new Swiper('.swiper-container', {
          autoplay: false, //可选选项，自动滑动
          on: {
            slideChangeTransitionEnd: function() {
              // this指向的是当前的swiper实例，that指向的是vue实例
              that.isActive = this.activeIndex; //切换结束时，告诉我现在是第几个slide
            },
          },
        })

      },
      _getTitle() {
        getHotlist().then((res) => {
          this.title = res.data.tags
          let idss = ""
          this.title.forEach(function (item,index) {
            idss +=item.id+","
          })
          this.ids = idss.slice(0,idss.length-1)
          /*   console.log(this.ids)*/
          this._getSonglist(0,0,20)
        }).catch(err => {
          console.log(err)
        })
      },
      _getSonglist(index,offset,limit){
        /*  console.log(this.title)*/
        let tag = this.title[index].name
        var that = this
        getSonglist(tag,offset,limit).then(res => {
          /* console.log(res)*/
          let list = res.data.playlists
          /*   console.log(list)*/
          list.forEach(function (item) {
            that.songlist.push(item)
          })
          /*  this.b-songlist.push=res.data.playlists*/
          if(this.once){
            this.sliderImg = []
            this.sliderImg.push(this.songlist.shift())
            this.sliderImg.push(this.songlist.shift())
            this.sliderImg.push(this.songlist.shift())
            console.log(this.sliderImg)
            this.once = false
            this.background = this.sliderImg[1].coverImgUrl
          }

          console.log(that.songlist)
          this.isScroll = true

          // 初始化swiper
          this.getSwiper()
        }).catch(err => {
          console.log(err)
        })
      }
    },
    watch: {
      isActive(index){
        this.songlist = []
        this.offset = 0
        this.once = true
        this._getSonglist(index,this.offset,this.limit)
      }
    },
    destroyed() {
      document.removeEventListener('scroll', this.scrollMoreData, false)
    }
  }
</script>

<style lang="stylus" scoped>
  *{
    padding:0
    margin:0
    font-size:36px
  }
  .songlist{
    .background{
      position: absolute
      top: 0
      left: 0
      width: 100%
      height:500px
      filter blur(20px)
      background-size:cover
      z-index:-1
    }
    .navList{
      width: 100%
      overflow:hidden
      margin-top:80px
      z-index:111
      &.night{
        background: none!important
        color: #ccc!important
      }
      ul{
        display: -webkit-box
        -webkit-overflow-scrolling: touch;
        overflow-x: auto;
        overflow-y: hidden;
        white-space:nowrap
        padding-bottom:20px
        border-bottom:1px solid #ccc
        &::-webkit-scrollbar{
          display: none;
        }
        li{
          width:150px
          text-align :center
          display: inline-block
          padding:5px 10px
          height:50px
          line-height:50px
          text-align: center
          z-index: 333
          .myColor{
            color: $color-icon
            border-bottom :4px solid $color-icon
          }
        }
      }
    }
  }
  .list-wrapper{
    width: 100%
    height:1134px
    overflow :hidden
    .warp{
      display:inline-block
      width: 100%
      height:auto
      .slider{
        padding-top:70px
      }
      .mainContent{
        padding-top:50px
        background-image:linear-gradient(180deg,rgba(255,255,255,0.5),rgba(255,255,255,0.9))
        &.night{
          background: #333
        }
      }
    }
  }
  

</style>
