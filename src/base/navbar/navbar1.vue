<template>
  <div class="wrapper">
    <div class="content_t">
      <span class="t_text1">{{t_text1}}</span>
    </div>
    <div class="content_b">
      <span class="b_text1">{{b_text1}}</span>
      <span class="select_tag">
         <slot name="select_tag"></slot>
      </span>
      <span class="b_text2" @click="goSonglist()">{{b_text2}}</span>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'navbar1',
    props:{
      path:{
        type:String,
        default:null
      },
      t_text1:{
        type:String,
        default:null
      },
      b_text1:{
        type:String,
        default:null
      },
      b_text2:{
        type:String,
        default:null
      }
    },
    methods:{
      goSonglist() {
        this.$router.push({
          path: this.path
        })
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .wrapper{
    width:100%;
    height:80px;
    .content_t{
      height:30px;
      line-height:30px;
      .t_text1 {
        font-size: $font-size-small-x;
        color: $color-font9;
      }
    }
    .content_b{
      height:50px;
      line-height:50px;
      .b_text1{
        float:left;
        font-size:$font-size-medium;
        font-weight:bold;
      }
      .select_tag{
        float:left;
        font-size:$font-size-medium;
        font-weight:bold;
      }
      .b_text2{
        display:inline-block;
        float:right;
        height:40px;
        line-height:40px;
        font-size:$font-size-small-x;
        color:$color-font8;
        border:1px solid $color-line;
        border-radius:30px;
        padding:0 10px;
      }
    }
  }
</style>
