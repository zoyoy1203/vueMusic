<template>
    <div class="slider_left">
      <transition name="fade" @touchmove.stop.prevent>
        <div class="menu_mask" v-show="isRellyShow" @click="hideSide"></div>
      </transition>
      <transition name="slider_fade">
        <div class="side_content" v-show="isRellyShow">
          <a class="change">
            <img src="../../common/image/img1.jpg" alt="">
          </a>
        </div>
      </transition>
    </div>
</template>

<script>
  export default {
    name: 'slider-left',
    data() {
      return{
        isRellyShow: true
      }
    },
    methods: {
      hideSide: function () {

      }
    },
    computed: {

    }
  }
</script>

<style lang="stylus" scoped>
.menu-mask{
  position:fixed;
  top:0;
  left:0;
  bottom:0;
  right:0;
  opacity: 1;
  z-index:10;
  background:rgba(0,0,0,0.5);
}
.side-content{
  z-index: 11;position:fixed;width: 286px;
  height: 100%;
  background: #e5e5e5;
  top: 0;
  left: 0;
  bottom: 0;
  -webkit-overflow-scrolling:touch;
}
.fade-enter-to, .fade-leave-to{
  transition: opacity 0.3s
}
.fade-enter, .fade-leave-to{
  opacity: 0
}


.slide-fade-enter-to, .slide-fade-leave-to{
  transition: transform 0.3s;
  transform:translate(0px,0px);
}
.slide-fade-enter, .slide-fade-leave-to{
  opacity : 0
 -webkit-transform:translate(-286px,0px)
 transform:translate(-286px,0px)
 -webkit-transition:opacity 0.3s ease-in-out 0.3s,-webkit-transform 0.3s ease-in-out
 transition: opacity 0.3s ease-in-out 0.3s,transform 0.3s ease-in-out
}
</style>
