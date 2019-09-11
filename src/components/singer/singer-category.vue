<template>
    <div class="singer_container">
      <back-head title="歌手分类" ico_color="#000" ico_display="none" :style="{'background':'#fff'}"></back-head>
      <div class="hotSinger">
        <scroll  ref="scroll"
                 :listenScroll="ifScroll"
                 :preventDefault="preventDefault"
                 :pulldown="pulldown"
                 :pullup="pullup"
                 @pullingUp="pullingUp"
                 id="wrapper" class="list-wrapper" >
          <div class="scroll_c">
            <div class="title">热门歌手</div>
            <ul>
              <li @click="goSinger(item)" class="item" v-for="(item, index) in singerList" :key="index">
                <img :src="item.picUrl" alt="">
                <span>{{item.name}}</span>
                <span class="li_r iconfont icon-jiahao">收藏</span>
              </li>
            </ul>
          </div>

        </scroll>
      </div>
    </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import BackHead from 'base/back-head/back-head'
  import Scroll from 'base/scroll/scroll'
  import {getHotSingers} from 'api/api'
  export default {
    name: 'singerCategory',
    components:{
      BackHead,
      Scroll
    },
    data() {
      return{
        offset:0,
        limit:20,
        singerList:[],
        pulldown:false,
        pullup:true,
        ifScroll:false,
        preventDefault:true,
      }
    },
    computed: {
      ...mapGetters([
        'modeType',
      ])
    },
    created() {
      this._getHotSingers()
    },
    methods:{
      ...mapMutations({
        setSingerDetail:"SET_SINGER_DETAIL"
      }),
      goSinger(item) {
        this.setSingerId(item.id)
        this.setSingerDetail(item)
        this.$router.push({
          path:'/singer',
          name:'singer',
        })
      },
      pullingUp(){
        console.log("上拉刷新")
        this._getHotSingers()
      },
      _getHotSingers() {
        var that = this
        getHotSingers(this.offset,this.limit).then(res => {
          console.log(res)
          var singerlist = res.data.artists
          singerlist.forEach(function (item) {
            that.singerList.push(item)
          })
          this.offset += this.limit
        }).catch(err => {
          console.log(err)
        })
      },
      ... mapMutations({
        setSingerId: 'SET_SINGER_ID'
      })
    }
  }
</script>

<style lang="stylus" scoped>
.singer_container{
  width:100%
  .hotSinger{
    position:absolute
    left: 0
    top: 80px
    width: 100%
    overflow :hidden
    .list-wrapper{
      width: 100%
      height :1234px
      .scroll_c{
        .title{
          width: 100%
          padding: 0 5%
          height:70px
          line-height:70px
          font-size:$font-size-medium
          background: $color-bg1
          color: $color-font4
        }
        ul{
          box-sizing :border-box
          width: 100%
          padding:0 5%
          li{
            display: inline-block
            width: 100%
            height:120px
            line-height:120px
            img{
              width:100px
              height:100px
              border-radius :50px
              vertical-align :middle
            }
            span{
              font-size:$font-size-medium-x
              vertical-align :middle
              &.li_r{
                float: right;
                border-radius:20px
                padding: 5px 10px
                height: 30px
                line-height: 30px
                border:1px solid $color-line4
                margin:40px 0
                color: $color-line4
                font-size:$font-size-small-x
              }
            }
          }
        }
      }

    }
  }
}
</style>
