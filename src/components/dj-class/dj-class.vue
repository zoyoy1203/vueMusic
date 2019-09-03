<template>
  <div class="container">
    <back-head title="电台分类" ico_color="#000" ico_display="none" style="background: #fff;"></back-head>
    <div class="content">
      <div class="title" >热门分类</div>
      <ul>
        <li class="item" v-for="(item, index) in djClass" v-if="index<6">
          <div class="item_c">
            <div class="item_cc">
              <div class="img" :style="{'background': 'url('+item.picWebUrl+')' }"></div>
              <!--    <img :src="item.picWebUrl" alt="">-->
              <span>{{item.name}}</span>
            </div>

          </div>

        </li>
      </ul>

      <li class="title">更多分类</li>
      <ul>
        <li class="item" v-for="(item, index) in djClass" v-if="index>5">
          <div class="item_c">
            <div class="item_cc">
              <div class="img" :style="{'background': 'url('+item.picWebUrl+')' }"></div>
              <!--    <img :src="item.picWebUrl" alt="">-->
              <span>{{item.name}}</span>
            </div>

          </div>

        </li>
      </ul>

      <div class="content_b">
        我要做主播
      </div>
    </div>
  </div>
</template>

<script>
  import BackHead from 'base/back-head/back-head'
  import {getDjCatelist, getDjCatelistRec} from 'api/api'
  export default {
    name: 'dj-class',
    components:{
      BackHead
    },
    data() {
      return{
        djClass:[],
      }
    },
    created () {
      this._getDjCatelist()
      getDjCatelistRec("2001").then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    methods: {
      _getDjCatelist() {
        getDjCatelist().then(res => {
          console.log(res)
          this.djClass = res.data.categories
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
.container{
  .content{
    width: 90%
    margin: $main-margin-top auto 0 auto
    .title{
      width: 100%
      height:100px
      line-height:120px
      text-align :center
    }
    ul{
      display: inline-block
      margin-top: 10px
      border-top:1px solid $color-line1
      .item:nth-of-type(odd){
        .item_c{
          border-right:1px solid $color-line1
        }
      }
      .item{
        box-sizing :border-box
        float: left;
        width: 50%
        height: 120px
        text-align :center
        border-bottom:1px solid $color-line1
        .item_c{
          width:100%
          height:70px
          line-height:70px
          margin:25px auto
          .item_cc{
            width:250px
            height:70px
            margin:0 auto
            .img{
              float: left;
              width: 96px
              height: 96px
              background-position: -96px 0!important
              vertical-align :middle
            }
            span{
              float: left;
              vertical-align :middle
              height:50px
              line-height: 50px
              margin:25px auto
              font-size:$font-size-medium
            }
          }

        }


      }
    }
    .content_b{
      width:100%

    }
  }
}
</style>
