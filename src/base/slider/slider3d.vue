<template>
  <div id="wrapper">
    <ul name="list"  mode="out-in" class="slider_wrapper"
        @touchstart.prevent="middleTouchStart"
        @touchmove.prevent="middleTouchMove"
        @touchend="middleTouchEnd"
    >
      <li v-for="(item,index) in piclist" :key="index" :style="config[index]"  @click="goSonglistDetail(item)" >
        <div class="img">
          <img :src="item.coverImgUrl">
        </div>
        <div class="text" v-html="item.name" :class="modeType ? '' : 'night'">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    name: 'slider3d',
    computed: {
      ...mapGetters([
        'modeType'
      ])
    },
    data() {
      return {
        //文件图片配置
        config: [
          {
            position: "absolute",
            width: "140px",
            height:"180px",
            top: "10px",
            left: "5px",
            opacity: 0.5,
            zIndex: 2,
            transition: "1s"
          },
          {
            position: "absolute",
            width: "150px",
            height:"190px",
            top: "20px",
            left: "100px",
            opacity: 1,
            zIndex: 4,
            transition: "1s"
          },
          {
            position: "absolute",
            width: "140px",
            height:"180px",
            top: "10px",
            left: "200px",
            opacity: 0.5,
            zIndex: 2,
            transition: "1s"
          }
        ],
        previous: 0,
        now: Date.now(),
        tag:1,
        index:1
      };
    },
    props:{
      piclist:{
        type:Array,
        default:[]
      }
    },
    created() {
      this.touch = {}
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
      },
      middleTouchStart(e) {
        this.touch.initiated = true
        const touch = e.touches[0]
        this.touch.startX = touch.pageX
        this.touch.startY = touch.pageY
   /*     console.log(this.touch.startX)*/
      },
      middleTouchMove(e) {
     /*   console.log('remove')*/
        if (!this.touch.initiated) {
          return
        }
        const touch = e.touches[0]
        const deltaX = touch.pageX - this.touch.startX
        const deltaY = touch.pageY - this.touch.startY
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          return
        }
      /*  console.log(deltaX)*/
        if(deltaX>0){
          this.now = Date.now();
          if (this.now - this.previous > 1000) {
            this.config.push(this.config.shift());
            this.previous = this.now;
            this.tag -=1
          }

        }else{
          this.now = Date.now();
          if (this.now - this.previous > 1000) {
            this.config.unshift(this.config.pop());
            this.previous = this.now;
            this.tag +=1
          }

        }


      },
      middleTouchEnd() {
        this.$emit("getImgIndex",this.index)

      },
      //实现点击按钮切换的动画，设置时间参数防止多次点击
      turnleft: function() {
        this.now = Date.now();
        if (this.now - this.previous > 1000) {
          this.config.push(this.config.shift());
          this.previous = this.now;
        }
      },
      turnright: function() {
        this.now = Date.now();
        if (this.now - this.previous > 1000) {
          this.config.unshift(this.config.pop());
          this.previous = this.now;
        }
      }
    },
    watch: {
      tag(val){
        if(val < 0){
          while (val < 0){
            val += 3
          }
          this.index = val
        }else if(val >2){
          while (val > 2){
            val -= 3
          }
          this.index = val
        }else{
          this.index = val
        }
     /*  console.log(this.index)*/

      }
    }
  }
</script>

<style lang="stylus" scoped>
  #wrapper {
    margin: auto;
    height:450px ;
    width:90%;
    position: relative;
    .slider_wrapper{
      width:100%;
      list-style: none;
      li{
        .img{
          width:100%
          img{
            width: 100%
            heihgt: auto
          }
        }
        .text{
          box-sizing :border-box
          width: 100%
          height:80px
          line-height: 40px
          border-bottom: 1px solid #A9A9A9
          border-right: 1px solid	#A9A9A9
          border-left: 1px solid 	#A9A9A9
          box-shadow :4px 2px 2px #ccc
          background: #fff
          padding-left: 6px
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          word-wrap: break-word;
          white-space: normal !important;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          font-size:$font-size-medium
          &.night{
            box-shadow :none
            border:none
          }
        }
      }
    }

  }



</style>
