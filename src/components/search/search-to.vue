<template>
    <div class="search_to_container" :class="modeType ? '' : 'night'">
      <search-bar @keyDown="keyDown" :value="keywords"></search-bar>
      <div class="content">
        <div class="title">
          <span class="title_l">单曲</span>
          <span class="title_r iconfont icon-bofang">播放全部</span>
        </div>
        <ul>
          <li class="item" v-for="(item, index) in songlist">
            <div class="item_l" @click="goSongPlayer(item,index)">
              <p class="name" v-html="item.name"></p>
              <p class="text">
                <span v-for="(artist, i) in item.artists">
                  {{artist.name}}
                  <i v-if="i < item.artists.length-1">/</i>
                </span>
                -
                <span v-html="item.album.name"></span>
              </p>
            </div>
            <div class="item_r">
              <i class="iconfont icon-bofang"></i>
              <i class="iconfont icon-more-vertical"></i>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  import {getSearch, getSearchSuggest, getSongDetail} from 'api/api'
  import SearchBar from 'components/search/search-bar'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import util from 'api/util'
  export default {
    name: 'searchTo',
    data() {
      return{
        keywords:"",
        songlist:[],
        songlistDetail:[],
        ids:"",
      }
    },
    components:{
      SearchBar,
    },
    computed: {
      ...mapGetters([
        'modeType',
        'songlistId',
      ])
    },
    created () {
      this.keywords = this.$route.params.keywords
      this._getSearch()
     /* this._getSearchSuggest()*/
    },
    methods:{
      _getSongDetail() {
        console.log(this.ids)
        getSongDetail(this.ids).then((res) => {
          this.songlistDetail = res.data.songs
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
      ...mapActions([
        'selectPlay',
        'randomPlay'
      ]),
      ...mapMutations({
        setSonglistId: 'SET_SONGLIST_ID',
      }),
      goSongPlayer(item,index){
        console.log('item='+item)
        console.log('index='+index)
        util.setLocalData('songDetail',item)
        /* this.$router.push({
           path: '/player',
           name: 'player'
         })*/
        this.selectPlay({
          list: this.songlistDetail,
          index
        })
      },
      changeColor (resultsList) {
        resultsList.map((item, index) => {
          // console.log('item', item)
          if (this.keywords && this.keywords.length > 0) {
            // 匹配关键字正则
            let replaceReg = new RegExp(this.keywords, 'g')
            // 高亮替换v-html值
            let replaceString =
              '<span class="search-text">' + this.keywords + '</span>'
            resultsList[index].name = item.name .replace(
              replaceReg,
              replaceString
            )
            resultsList[index].album.name = item.album.name.replace(
              replaceReg,
              replaceString
            )
          }
        })
        this.songlist = resultsList
      },
      keyDown(keywords) {
        this.keywords = keywords
        this._getSearch()
        this._getSearchSuggest()
      },
      _getSearch(){
        getSearch(this.keywords).then(res => {
          console.log(res)
          var songlist = res.data.result.songs
          this.changeColor(songlist)
          let songid = ""
          songlist.forEach(function (item,index) {
            songid +=item.id+","
          })
          this.ids = songid.slice(0,songid.length-1)
          this._getSongDetail()


        }).catch(err => {
          console.log(err)
        })
      },
      _getSearchSuggest(){
        getSearchSuggest(this.keywords).then(res => {
          console.log(res)
        }).catch(err =>{
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
.search_to_container{
  &.night{
    background: $color-night-bg2
  }
  .content{
    .title{
      box-sizing :border-box
      display: inline-block
      margin-top:30px
      width: 100%
      padding:0 5%
      height:40px
      line-height:40px
      .title_l{
        float: left
        line-height: 45px
        font-size:$font-size-medium
        font-weight :600
        vertical-align :middle
      }
      .title_r{
        float: right
        height:35px
        line-height:35px
        vertical-align :middle
        font-size:$font-size-small
        border-radius 20px
        border:1px solid $color-line
        padding:0px 15px
      }
    }
    ul{
      .item{
        box-sizing:border-box
        display: inline-block
        width: 100%
        padding:0 5%
        height:90px
        margin-bottom:20px
        .item_l{
          float: left;
          width: 80%
          overflow :hidden
          .name{
            width: 100%
            height:60px
            line-height:60px
            font-size:$font-size-medium-x
            overflow :hidden
            text-overflow :ellipsis
            white-space :nowrap
            >>>.search-text{
              color:  #1e90ff
            }
          }
          .text{
            height:30px
            line-height:30px
            font-size:$font-size-small-x
            span{
              >>>.search-text{
                color:  #1e90ff
              }
            }
          }
        }
        .item_r{
          float: right
          height:90px
          line-height:90px
          i{
            font-size:$icon-size-medium
          }
        }
      }
    }
  }
}
</style>
