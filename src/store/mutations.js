import * as types from './mutation-types'

//更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
const matutaions = {
  [types.SET_PHONE](state,phone){
    state.phone = phone
  },
  [types.SET_USER_ID](state,userId){
    state.userId = userId
  },
  [types.SET_USERNAME](state,username){
    state.username = username
  },
  [types.SET_AVATAR_URL](state,avatarUrl){
    state.avatarUrl = avatarUrl
  },
  [types.SET_IS_LOGIN](state,isLogin){
    state.isLogin = isLogin
  },
  [types.SET_VIDEO_ID](state,videoId){
    state.videoId = videoId
  },
  [types.SET_SONGLIST_ID](state,songlistId){
    state.songlistId = songlistId
  },
  [types.SET_RADIO_ID](state,radioId){
    state.radioId = radioId
  },
  [types.SET_COMMENT_TYPE](state,commentType){
    state.commentType = commentType
  },
  [types.SET_OTHER_USER_ID](state,otherUserId){
    state.otherUserId = otherUserId
  },
  [types.SET_SINGER_ID](state, singerId) {
    state.singerId= singerId
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },
  [types.SET_DISC](state, disc) {
    state.disc = disc
  },
  [types.SET_TOP_LIST](state, topList) {
    state.topList = topList
  },
  [types.SET_MODE_TYPE](state, flag) {
    state.modeType = flag
  },
  [types.SET_SEARCH_HISTORY](state, history) {
    state.searchHistory = history
  },
  [types.SET_PLAY_HISTORY](state, history) {
    state.playHistory = history
  },
  [types.SET_FAVORITE_LIST](state, list) {
    state.favoriteList = list
  },
  [types.SET_IS_TOP](state, isTop) {
    state.isTop = isTop
  }
}

export default matutaions
