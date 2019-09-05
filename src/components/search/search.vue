<template>
    <div class="search_container">
      <search-bar @keyDown="keyDown"></search-bar>
      <div class="search_content">
        <div class="search_history">
          <div class="title">
            <span>历史记录</span>
            <i class="iconfont icon-shanchu"></i>
          </div>
          <div class="tag">
            <span></span>
          </div>
        </div>
        <div class="search_hot">
          <div class="title">热搜榜</div>
          <ul>
            <li v-for="(item, index) in searchHotList">
              <div class="li_l">
                {{index+1}}
              </div>
              <div class="li_r">
                <p class="title">
                  <span class="name">{{item.searchWord}}</span>
                  <span class="num">{{item.score}}</span>
                </p>
                <p class="text">
                  {{item.content}}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import {getSearchHotDetail,} from 'api/api'
  import SearchBar from 'components/search/search-bar'
  export default {
    name: 'search',
    data() {
      return{
        searchHotList:[],
      }
    },
    components:{
      SearchBar,
    },
    created () {
      this._getSearchHotDetail()
    },
    methods:{
      keyDown(keywords) {
        this.$router.push({
          path:'/searchTo',
          name:'searchTo',
          params:{
            keywords:keywords
          }
        })
      },
      _getSearch(){
        getSearch(this.keywords).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
      _getSearchHotDetail() {
        getSearchHotDetail().then(res => {
          console.log(res)
          this.searchHotList = res.data.data
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
.search_container{
  .search_content{
    .search_history{
      box-sizing :border-box
      width: 100%
      padding: 0 5%
      height:auto
      .title{
        width: 100%
        height:80px
        line-height:80px
        span{
          float: left;
          font-weight :600
          font-size:$font-size-medium
        }
        i{
          float: right;
          font-size:$icon-size-small-x
        }
      }
    }
    .search_hot{
      box-sizing :border-box
      width: 100%
      padding:0 5%
      .title{
        height:80px
        line-height:80px
        font-size:$font-size-medium
      }
      ul{
        li{
          display: inline-block
          width: 100%
          height:80px
          margin-bottom:30px
          .li_l{
            float: left;
            width:60px
            height:80px
            line-height: 80px
            text-align :left
          }
          .li_r{
            float: left
            .title{
              width: 100%
              height:50px
              line-height:50px
              .name{
                font-size:$font-size-medium
                font-weight :600
              }
              .num{
                font-size:$font-size-small-x
                color:$color-font7
              }
            }
            .text{
              height:30px
              line-height:30px
              font-size:$font-size-small
              color: $color-font4
            }
          }
        }
      }
    }
  }
}
</style>
