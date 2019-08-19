<template>
 <div class="songlist">
   <back-head title="歌单广场" ico_display="none" ico_color="#000"></back-head>
   <div class="songlist_container">
     <slider-menu></slider-menu>
   </div>
 </div>
</template>

<script>
  import BackHead from 'base/back-head/back-head'
  import SliderMenu from 'base/slider-menu/slider-menu'

  export default {
    name: 'songlist',
    components: {
      BackHead,
      SliderMenu
    },
  }
</script>

<style lang="stylus" scoped>

</style>
