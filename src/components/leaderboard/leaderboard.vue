<template>
    <div class="leaderboard" :class="modeType ? '' : 'night'">
      <back-head title="排行榜" ico_color="hFontColor" ico_display="none"></back-head>
      <div class="container">
        <div>
          <div class="c1">
            <div class="title">官方榜</div>
            <ul>
              <li class="item" v-for="(item,index) in list1" :key="index" @click="goSonglistDetail(item.listId)">
                <div class="img">
                  <img :src="item.coverImgUrl" alt="">
                </div>
                <div class="text">
                  <ul>
                    <li class="text_list" v-for="(t,i) in item.tracks">
                      {{i+1}}.{{t.first}}-{{t.second}}
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div class="c2">
            <div class="title">推荐榜</div>
            <songs :songlist="list2" img="coverImgUrl"></songs>
          </div>
          <div class="c2">
            <div class="title">全球榜</div>
            <songs :songlist="list3" img="coverImgUrl"></songs>
          </div>
          <div class="c2">
            <div class="title">更多榜单</div>
            <songs :songlist="list4" img="coverImgUrl"></songs>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import BackHead from 'base/back-head/back-head'
  import Songs from 'base/songs/songs'
  import {getToplist} from 'api/api'
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    name: 'leaderboard',
    data() {
      return {
        hFontColor:'black',
        toplist:[],
        list1:[],//官方榜
        list2:[],//推荐榜
        list3:[],//全球版
        list4:[],//其他榜
        listIndex:{
          "云音乐新歌榜":0 ,

          "云音乐热歌榜":1 ,

          "网易原创歌曲榜":2 ,

          "云音乐飙升榜": 3,

          "云音乐电音榜":4 ,

          "UK排行榜周榜":5 ,

          "美国Billboard周榜":6 ,

          "KTV嗨榜": 7,

          "iTunes榜":8 ,

          "Hit FM Top榜":9 ,

          "日本Oricon周榜":10 ,

          "韩国Melon排行榜周榜":11 ,

          "韩国Mnet排行榜周榜":12 ,

          "韩国Melon原声周榜":13 ,

          "中国TOP排行榜(港台榜)":14 ,

          "中国TOP排行榜(内地榜)":15 ,

          "香港电台中文歌曲龙虎榜": 16,

          "华语金曲榜":17 ,

          "中国嘻哈榜":18 ,

          "法国 NRJ EuroHot 30周榜":19 ,

          "台湾Hito排行榜": 20 ,

          "Beatport全球电子舞曲榜": 21,

          "云音乐ACG音乐榜":22 ,

          "云音乐嘻哈榜": 23
        }

      }
    },
    components: {
      BackHead,
      Songs
    },
    computed: {
      ...mapGetters([
        'modeType'
      ])
    },
    created () {
      this._getToplistDetail()
    },
    methods: {
      ...mapMutations({
        setModeType: 'SET_MODE_TYPE'
      }),
      goSonglistDetail(id) {
        this.$router.push({
          path: '/songlistdetail',
          name: 'songlistdetail',
          params: {
            id:id,
            flag:"leaderboard"
          }
        })
      },
      _getToplistDetail() {
        getToplist().then(res => {
          console.log(res)
          this.toplist = res.data.list
          var that = this
          var num = 0
          this.toplist.forEach(function (item, index) {
            var i = that.listIndex[item.name]
            item.listId = i
            if(item.tracks.length>0){
              that.list1.push(item)
              num += 1
            }else if(num <10){
              that.list2.push(item)
              num += 1
            }else if(num <16){
              that.list3.push(item)
              num += 1
            }else{
              that.list4.push(item)
              num += 1
            }
          })
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .leaderboard{
    position: fixed
    top: 0
    left: 0
    bottom: 0
    width: 100%
    overflow :none
    &.night{
      background: $color-night-bg3!important
      color: $color-night-font1!important
    }
    .container{
      width: 100%
      position: absolute
      top: 0
      left: 0
      bottom: 0
      margin-top:$main-margin-top
      overflow-y :scroll
      .c1{
        .title{
          width: 100%
          height:80px
          line-height:100px
          padding-left:10px
        }
        ul{
          width:700px
          margin:0 auto
          .item{
            display: inline-block
            width: 100%
            height:200px
            margin: 20px auto 0
            .img{
              float: left
              width:200px
              heihgt:200px
              overflow:hidden
              img{
                width: 100%
                height:auto
              }
            }
            .text{
              box-sizing:border-box
              float: left;
              width:450px
              height: 100%
              padding-left:20px
              ul{
                width:100%
                .text_list{
                  width: 100%
                  height:66px
                  line-height:66px
                  overflow:hidden
                  text-overflow :ellipsis
                  white-space :nowrap
                }
              }
            }
          }
        }
      }
      .c2{
        margin-top:50px
        .title{
          width: 100%
          height:80px
          line-height:80px
          padding-left:10px
        }
      }

    }
  }


</style>
