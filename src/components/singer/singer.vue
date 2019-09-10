<template>
  <div class="singer_container">
    <back-head ico_color="#fff" ico1="" ico2="icon-fenxiang"></back-head>
    <div class="background">
      <img :src="userDetail.profile.backgroundUrl" alt="">
    </div>
    <div class="container">
      <swiper-list :navList="navList">
        <div slot="slot-item-0">000000000</div>
        <div slot="slot-item-1">111111111</div>
        <div slot="slot-item-2">222222222222</div>
        <div slot="slot-item-3">333333333333</div>
      </swiper-list>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import BackHead from 'base/back-head/back-head'
  import SwiperList from 'base/swiper_list/swiper_list'
  import { getUserDetail,getSingerSong, getSingerMv, getSingerAlbum, getSingerDesc} from 'api/api'
  export default {
    name: 'singer',
    components:{
      BackHead,
      SwiperList,
    },
    data() {
      return{
        singerDesc:null,
        userDetail:null,
        navList:[
          {name:'热门单曲'},
          {name:'专辑'},
          {name:'视屏'},
          {name:'艺人信息'}
        ],
        offset:0,
        limit:20,
      }
    },
    created () {
      this._getUserDetail()
      this._getSingerDesc()
      this._getSingerSong()
      this._getSingerMv()
      this._getSingerAlbum()
    },
    computed:{
      ...mapGetters([
        'modeType',
        'singerId',
      ])
    },
    methods:{
      _getUserDetail() {
        getUserDetail(this.singerId).then(res => {
          console.log(res)
          this.userDetail = res.data
        }).catch(err => {
          console.log(err)
        })
      },
      _getSingerDesc() {
        getSingerDesc(this.singerId).then(res => {
          console.log(res)
          this.singerDesc = res.data
        }).catch(err => {
          console.log(err)
        })
      },
      _getSingerSong() {
        getSingerSong(this.singerId).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
      _getSingerMv(){
        getSingerMv(this.singerId).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
      _getSingerAlbum() {
        getSingerAlbum(this.singerId,this.offset,this.limit).then(res => {
          console.log(res)
          this.offset +=this.limit
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
.singer_container{
  .background{
    position: relative
    top:-80px
    left:0
    width: 100%
    height:auto
    img{
      width: 100%
      height:100%
      filter :brightness(80%)
    }
  }
  .container{
    position: absolute
    top:80px
    left:0
    width: 100%
    height:auto
    .container_b{
      width: 100%
      height:100%
      border-top-left-radius:40px
      border-top-right-radius:40px
      background: #fff
      &.isRelative{
        position: relative
      }
      &.isFixed{
        position:fixed;
        background-color:#Fff;
        top:80px;
        z-index:999;
      }
      .navlist{
        width:100%;
        height:80px;
        border-bottom:1px solid rgba(151,151,151,0.1);
        position:relative;
        .navli{
          width: 33%
          text-align:center;
          float:left;
          line-height:80px
          height:80px
          i{
            height: 80px
            font-style: normal;
            font-size: $font-size-medium
            &.activeT{
              color:$color-font3
              padding-bottom: .3rem;
              border-bottom: 4px solid $color-font3
            }
          }
        }
      }

      .swiper-container{
        .swiper-wrapper{
          .swiper-slide{
            .list-wrapper{
              width: 100%
              height:1134px
              .title{
                width: 100%
                padding: 0 5%
                height:60px
                line-height:60px
                .name{
                  font-weight:500
                  font-size:$font-size-medium
                }
                .num{
                  color: $color-font4
                  font-size:$font-size-small
                }
              }
              ul{
                width: 100%
                padding: 0 5%
                .item{
                  display: inline-block
                  width: 100%
                  height:150px
                  .item_l{
                    float: left;
                    width:150px
                    height:100%
                    img{
                      width: 100%
                      height:100%
                    }
                  }
                  .item_r{
                    float: left;
                    width:500px
                    height:150px
                    margin-left:20px
                    p{
                      &.name{
                        width: 100%
                        height:40px
                        line-height:40px
                        font-size:$font-size-medium
                        margin-top:40px
                        overflow:hidden
                        text-overflow :ellipsis
                        white-space:nowrap
                      }
                      &.text{
                        height:30px
                        line-height:30px
                        font-size:$font-size-small-x
                        color: $color-font4
                      }
                    }
                  }
                }
              }
            }

            .list-wrapper2{
              width: 100%
              height:1134px
              ul{
                width: 100%
                padding:0 5%
                .item{
                  display: inline-block
                  width: 100%
                  height:auto
                  border-bottom:1px solid $color-line1
                  margin-bottom:30px
                  margin-top:30px
                  .item_l{
                    float: left;
                    img{
                      width:70px
                      height:70px
                      border-radius :35px
                    }
                  }
                  .item_r{
                    float: left;
                    width:600px
                    padding-left:20px
                    .name{
                      height: 40px
                      line-height: 40px
                      font-size:$font-size-medium
                    }
                    .time{
                      height: 30px
                      line-height: 30px
                      font-size:$font-size-small
                    }
                    .text{
                      height:auto
                      line-height: 40px
                      font-size:$font-size-medium
                    }
                    .img{
                      width: 100%
                      height:300px
                      img{
                        width:200px
                        height:200px
                      }
                    }
                    .tag{
                      display: inline-block
                      width: 100%
                      height:100px
                      line-height:100px
                      .tag_c{
                        float: left
                        margin-right:70px
                        i{
                          font-size:$icon-size-small-x

                        }
                      }
                    }
                  }
                }
              }
            }
            .list-wrapper3{
              .content{
                width: 100%
                padding:0 5%
                .title{
                  height:80px
                  line-height:80px
                  font-size:$font-size-medium
                  font-weight:600
                }
              }
            }
          }
        }
      }

    }
  }
}
</style>
