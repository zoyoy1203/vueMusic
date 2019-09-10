<template>
    <div class="search_bar_container"  :class="modeType ? '' : 'night'">
      <span class="search_bar_l iconfont icon-prev"  @click="prev"></span>
      <form @submit.prevent="formSubmit" action="javascript:return true">
        <input type="search"
               class="search_bar_c"
               :class="modeType ? '' : 'night'"
               v-model="keywords"
               @keydown="getSearch($event)"
               placeholder="请输入关键字">
      </form>
      <router-link tag="span" to="/singerCategory" class="search_bar_r iconfont icon-geshou"></router-link>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'search-bar',
    data() {
      return{
        keywords:this.value,
      }
    },
    props:{
      value:{
        type:String,
        default:""
      }
    },
    computed:{
      ...mapGetters([
        "modeType",
      ])
    },
    methods: {
      prev() {
        this.$router.go(-1)
      },
      formSubmit () {
        return false
      },
      getSearch(ev){
        if(ev.keyCode == 13) {  //键盘回车的编码是13
          this.$emit('keyDown',this.keywords)
        }
      },
    },
    watch: {
      value(newVal){
        this.keywords = newVal;
      }
    },


  }
</script>

<style lang="stylus" scoped>
.search_bar_container{
  box-sizing :border-box
  display: inline-block
  width: 100%
  padding:0 5%
  height:80px
  line-height:80px
  .search_bar_l{
    float: left;
    font-size:$icon-size-medium
  }
  .search_bar_r{
    float: right
    font-size:$icon-size-medium
  }
  .search_bar_c{
    float: left;
    height:70px
    line-height:70px
    width:80%
    margin:0 2%
    border-bottom:1px solid $color-line3
    outline :none
    &.night{
      border-bottom:1px solid $color-night-line2!important
    }
  }
}
</style>
