// 歌曲列表组件模块2
<template>
  <div class="wrapper"  @click.once="goSongPlayer()">
    <img v-lazy="img" alt="">
    <div class="content">
      <p class="title">
        {{title}}
        <span class="artists">
          - {{artists}}
        </span>
      </p>
    </div>
    <div class="play">
      <span class="icon iconfont icon-bofang"></span>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {getSongDetail} from 'api/api'
import util from 'api/util'
  export default {
    name: 'songs-wrapper3',
    data(){
      return {
        img:null,
        title:'',
        artists:'',
        songDetail:null,
        id:null,
      }
    },
    props:{
      song:null
    },
    created(){
      this.getSong()
    },
    methods:{
      goSongPlayer() {
        // util.setLocalData('songDetail',this.song)
        console.log(this.id)
        getSongDetail(this.id).then(res=>{
          console.log(res)
          this.songDetail=res.data.songs[0]
          console.log(this.songDetail)
          this.insertSong({
            song:this.songDetail
          })
        }).catch(err => {
          console.log(err)
        })
      
        
      },
      getSong(){
        this.img = this.song.picUrl
        this.title = this.song.name
        this.artists = this.song.song.artists[0].name
        this.id = this.song.id
      },
      ...mapActions([
        'insertSong'
      ])
    }
  }
</script>

<style lang="stylus" scoped>
.wrapper{
  display:flex;
  width:100%;
  height:150px;
  flex-direction:row;
  margin:5px 0;
  img{
    width:150px;
    height:150px;
    border-radius:15px;
    border:1px solid #ccc
  }
  .content{
    width:400px;
    height:100%;
    padding-left:10px;
    .title{
      width:100%;
      height:50px;
      line-height:50px;
      margin-top:50px;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      .artists{
        font-size:$font-size-small-x;
        color:$color-font9;

      }
    }
  }
  .play{
    height:150px;
    flex:1;
    line-height:150px;
    span{
      font-size:$icon-size-medium-x;
    }
  }
}
</style>
