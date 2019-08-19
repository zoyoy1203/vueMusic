<template>
  <div id="app">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view/>
    </keep-alive>
    <!--<FooterGuide  />-->
    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件 -->
    </router-view>
    <player></player>
  </div>
</template>

<script>
import Player from 'components/player/player'
export default {
  name: 'app',
  components: {
    Player
  }
}
</script>

<style>
#app {

}
</style>
