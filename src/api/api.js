import qs from 'querystring'
import fetch from '@/axios/fetch'


// 获取轮播图
export function getBanner(){
  return fetch({
    url: '/api/banner',
  })
}

//推荐歌单
export function getRecommendSonglist(limit){
  return fetch({
    url: '/api/personalized?limit=' + limit,
  })
}

//歌单分类
export function getCatlist(){
  return fetch({
    url: '/api/playlist/catlist'
  })
}

//热门歌单分类
export function getHotlist() {
  return fetch({
    url: '/api/playlist/hot'
  })
}

//精品歌单分类
export function gethighquality(){
  return fetch({
    url: '/api/top/playlist/highquality'
  })
}

//歌单
export function getSonglist(tag,offset,limit){
  return fetch({
    url: '/apitop/playlist?cat=' + tag + '&offset=' + offset + '&limit=' +limit
  })
}

//歌单详情
  export function getSonglistDetail(id){
    return fetch({
      url: '/api/playlist/detail?id=' + id
    })
  }

//歌曲详情
export function getSongDetail(ids){
  return fetch({
    url: '/api/song/detail?ids=' + ids
  })
}

//音乐URL
export function getSongUrl(id){
  return fetch({
    url: '/api/song/url?id=' + id
  })
}

//音乐歌词
export function getSongText(id){
  return fetch({
    url: '/api/lyric?id=' + id
  })
}

//新碟上架
export function getNewDisc(){
  return fetch({
    url: '/api/top/album?offset=0&limit=3',
  })
}

//新歌速递
export function  getNewSong(){
  return fetch({
    url: '/api/top/song?type=0',
  })
}

//所有榜单内容摘要
export function  getToplist(){
  return fetch({
    url: '/api/toplist/detail',
  })
}

//各个榜单歌曲详情
export function  getToplistDetail(idx){
  return fetch({
    url: '/api/top/list?idx=' + idx,
  })
}

//每日推荐歌曲
export function  getRecommendSongs(){
  return fetch({
    url: '/api/personalized/newsong',
  })
}

//手机登录
export function  phoneLogin(phone,password){
  return fetch({
    url: '/api/login/cellphone?phone=' + phone + '&password=' + password,
  })
}

//获取用户详情
export function  getUserDetail(uid){
  return fetch({
    url: '/api/user/detail?uid='+uid
  })
}

//获取用户信息 , 歌单，收藏，mv, dj 数量
export function  getUserMore(){
  return fetch({
    url: '/api/user/subcount'
  })
}

//获取每日推荐歌单
export function  getDailySonglist(){
  return fetch({
    url: '/api/recommend/resource'
  })
}

