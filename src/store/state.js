import {playMode} from 'common/js/config'
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'

//状态
const state = {
  //手机号
  phone: "",
  //本人id
  userId:"",
  //用户名
  username:"",
  //头像
  avatarUrl:"",
  //是否登录
  isLogin:false,

  //视屏id
  videoId:null,
  //歌单id
  songlistId:null,
  //电台id
  radioId:null,

  //评论类型
  commentType:null,

  //用户id
  otherUserId:null,

  //歌手
  singerId: {},
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
  favoriteList: loadFavorite(),
  // 判断歌单列表是否滑动到顶部
  isTop:false,
}

export default state
