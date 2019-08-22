import {playMode} from 'common/js/config'
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'

//状态
const state = {
  //手机号
  phone: "",
  //用户id
  userId:"",
  //用户名
  username:"",
  //头像
  avatarUrl:"",
  //是否登录
  isLogin:false,

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
  //夜间日间背景模式
  modeType:true,
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}

export default state
