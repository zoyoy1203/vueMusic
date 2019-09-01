<template>
    <div class="contianer">
      <back-head title="新碟上架" ico_color="#000" ico_display="none"></back-head>
      <div class="content">

      </div>
    </div>
</template>

<script>
  import {getNewDisc} from 'api/api'
  import BackHead from 'base/back-head/back-head'
  export default {
    name: 'new-album',
    data(){
      return{

      }
    },
    components:{
      BackHead
    },
    created () {
      this._getNewDisc()
    },
    methods:{
      _getNewDisc(){
        getNewDisc(0,30).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>

</style>
