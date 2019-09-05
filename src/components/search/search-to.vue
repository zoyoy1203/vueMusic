<template>
    <div class="search_to_container">
      <search-bar @keyDown="keyDown" :value="keywords"></search-bar>
      <div class="content">
        <ul>
          <li class="item" v-for="(item, index) in songlist">
            <div class="item_l">
              <p class="name">{{item.name}}</p>
              <p class="text">
                <span v-for="(artist, i) in item.artists">
                  {{artist.name}}
                  <i v-if="i < item.artists.length-1">/</i>
                </span>
                -
                <span>{{item.album.name}}</span>
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
  import {getSearch, getSearchSuggest} from 'api/api'
  import SearchBar from 'components/search/search-bar'
  export default {
    name: 'searchTo',
    data() {
      return{
        keywords:"",
        songlist:[],
      }
    },
    components:{
      SearchBar,
    },
    created () {
      this.keywords = this.$route.params.keywords
      this._getSearch()
      this._getSearchSuggest()
    },
    methods:{
      keyDown(keywords) {
        this.keywords = keywords
        this._getSearch()
        this._getSearchSuggest()
      },
      _getSearch(){
        getSearch(this.keywords).then(res => {
          console.log(res)
          this.songlist = res.data.result.songs
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
  .content{
    ul{
      margin-top:30px
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
          .name{
            height:60px
            line-height:60px
            font-size:$font-size-medium-x
          }
          .text{
            height:30px
            line-height:30px
            font-size:$font-size-small-x
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
