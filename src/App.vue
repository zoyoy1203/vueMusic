<template>
  <div id="app" :class="modeType ? '' : 'night'">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view/>
    </keep-alive>
    <!--<FooterGuide  />-->
    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件 -->
    </router-view>
    <player v-if="this.$route.path != '/'"></player>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
import Player from 'components/player/player'
export default {
  name: 'app',
  components: {
    Player
  },
  computed:{
    ...mapGetters([
      "modeType"
    ])
  },
  created () {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
      this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style lang="stylus">
#app,*{
  box-sizing:border-box;
}
#app{
  height: 667px;
  .night{
    background: #000
  }
}
</style>
