import {playMode} from 'common/js/config'
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'

//状态
const state = {
  //歌手
  singer: {},
  //播放状态：播放，暂停
  playing: false,
  //播放器展开与收起状态
  fullScreen: false,
  //当前播放列表
  playlist: [],
  //顺序列表
  sequenceList: [],
  //播放状态：顺序，随机，单曲
  mode: playMode.sequence,
  //当前播放索引
  currentIndex: -1,
  //歌单
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}

export default state
