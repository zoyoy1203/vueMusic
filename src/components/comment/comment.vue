<template>
  <div class="comment">
    <back-head title="评论" :ico_color="modeType ? '#000': '#fff'" ico1="" ico2="icon-fenxiang"></back-head>
    <div class="comment_wrap">
      <span class="title">精彩评论</span>
      <comment-list :comment="comment.hotComments" class="comment_list"></comment-list>
      <div class="title1">最新评论</div>
      <comment-list :comment="comment.comments" class="comment_list"></comment-list>
    </div>
  </div>
</template>

<script>
  import {getSonglistComment} from 'api/api'
  import BackHead from 'base/back-head/back-head'
  import CommentList from 'components/comment/comment-list'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'comment',
    components:{
      BackHead,
      CommentList
    },
    data() {
      return{
        comment:[],
        offset:0,
        limit:20,

      }
    },
    created() {
     /* this.setSonglistId(this.$route.params.id)*/
      if(this.$route.params.type){
        this.setCommentType(this.$route.params.type)
      }
      this._getComment()
    },
    computed: {
      ...mapGetters([
        'modeType',
        'songlistId',
        'commentType'
      ])
    },
    methods: {
      ...mapMutations({
        setSonglistId: 'SET_SONGLIST_ID',
        setCommentType: 'SET_COMMENT_TYPE'
      }),
      _getComment(){
        if(this.commentType == "2"){
          getSonglistComment(this.songlistId,this.offset,this.limit).then(res => {
            console.log(res)
            this.comment = res.data
          }).catch(err => {
            console.log(err)
          })
        }

      }
    }
  }
</script>

<style lang="stylus" scoped>
  .comment_wrap{
    margin-top: 40px;
    width: 100%
    height:auto
    .title{
      position: relative
      left: -550px
      top:20px
    }
    .title1{
      width: 90%
      height:80px
      line-height:80px
      margin:0 auto
      margin-bottom:-30px
    }
    .comment_list{
      padding-top:20px
    }
  }
</style>
