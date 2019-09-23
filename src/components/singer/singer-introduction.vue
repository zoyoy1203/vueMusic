<template>
    <div class="singer_introduction_c">
      <back-head title="歌手介绍" :style="{'background':'#fff'}" ico_display="none"></back-head>
      <div class="container">
        <div class="container_c">
          <div class="title">简介</div>
          <div class="text">
            {{singerDesc.briefDesc}}
          </div>
        </div>
        <div class="container_c" v-for="(item, index) in singerDesc.introduction">
          <div class="title">{{item.ti}}</div>
          <div class="text">{{item.txt}}</div>
        </div>
      </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import BackHead from 'base/back-head/back-head'
  import { getSingerDesc} from 'api/api'
  export default {
    name: 'singer-introduction',
    data() {
      return{
        singerDesc:null,
      }
    },
    components:{
      BackHead
    },
    created () {
      this._getSingerDesc()

    },
    computed:{
      ...mapGetters([
        'modeType',
        'singerId',
      ])
    },
    methods:{
      _getSingerDesc() {
        getSingerDesc(this.singerId).then(res => {
          console.log(res)
          this.singerDesc = res.data
        }).catch(err => {
          console.log(err)
        })
      },

    }
  }
</script>

<style lang="stylus" scoped>
.singer_introduction_c{
  .container{
    box-sizing :border-box
    width: 100%
    height: 100%
    padding:0 5%
    margin-top:$main-margin-top
    padding-bottom:150px
    .container_c{
      padding-top:30px
      .title{
        font-size:$font-size-medium-x
        font-weight :600
        border-left:6px solid $color-line4
        height:30px
        line-height:30px
        margin-bottom:20px
        padding-left:10px
      }
      .text{
        font-size:$font-size-medium
        color: $color-font8
        line-height:40px
      }
    }

  }
}
</style>
