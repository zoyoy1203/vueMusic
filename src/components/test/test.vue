<template>
<div>
 <!-- <div class="navlist">
    <ul>
      <li class="navli"  v-for="(item,index) in navList" :class="{'activeT':nowIndex===index}" @click="tabClick(index)"><i>{{item.name}}</i>
      </li>
    </ul>
  </div>
  <div class="swiper-container swiper_con">
    <div class="swiper-wrapper">
      &lt;!&ndash; 第一个swiper &ndash;&gt;
      <div class="swiper-slide" ref="viewBox">1111
      </div>
      &lt;!&ndash; 第二个swiper &ndash;&gt;
      <div class="swiper-slide">2222
      </div>
      <div class="swiper-slide">3333
      </div>
    </div>
  </div>-->
  <swiper-list :navList="navList">
    <div slot="slot-item-0">000000000</div>
    <div slot="slot-item-1">111111111</div>
    <div slot="slot-item-2">222222222222</div>
  </swiper-list>
</div>

</template>

<script>
  import SwiperList from 'base/swiper_list/swiper_list'
 /* import Swiper from 'swiper'*/
  export default {
    name: "test",
    data() {
      return {
        navList:[
          {name:'a'},
          {name:'b'},
          {name:'c'}
        ],
        nowIndex:0,
      }
    },
    components:{
      SwiperList,
    },
    mounted() {
    /*  var that=this
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
      });*/
      // this.getList();
    },
    methods: {
    /*  tabClick(index){
        this.nowIndex = index
        this.mySwiper.slideTo(index,1000,false)
      },*/
    },
    created(id){

    }
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
        font-style: normal;
        font-size: 16px;
      }
    }
  }

  .activeT{
    color:#00ba6b;
    padding-bottom: .3rem;
    border-bottom: 2px solid #00ba6b;
  }
  .swiper_con{
    width:100%;
    margin-bottom:40px;
    position:relative;
  }
  .show{
    display:block;
  }
  .none{
    display:none;
  }

</style>
