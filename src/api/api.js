import qs from 'querystring'
import fetch from '@/axios/fetch'

/*

*/
// 获取轮播图
// let apiUrl = process.env.API_HOST
let apiUrl = '/api'

export function getBanner(){
  return fetch({
    /*url:  '/api/banner',*/
    url: apiUrl + '/banner?type=0',
  })
}

//推荐歌单
export function getRecommendSonglist(limit){
  return fetch({
   /* url:  '/api/personalized?limit=' + limit,*/
    url: apiUrl +  '/personalized?limit=' + limit,
  })
}

//歌单分类
export function getCatlist(){
  return fetch({
   /* url:  '/api/playlist/catlist'*/
    url:  apiUrl + '/playlist/catlist'
  })
}

//热门歌单分类
export function getHotlist() {
  return fetch({
   /* url:  '/api/playlist/hot'*/
    url: apiUrl +  '/playlist/hot'
  })
}

//精品歌单分类
export function gethighquality(){
  return fetch({
   /* url:  '/api/top/playlist/highquality'*/
    url: apiUrl +  '/top/playlist/highquality'
  })
}

//歌单
export function getSonglist(tag,offset,limit){
  return fetch({
  /*  url:  '/api/top/playlist?cat=' + tag + '&offset=' + offset + '&limit=' +limit*/
    url: apiUrl +  '/top/playlist?cat=' + tag + '&offset=' + offset + '&limit=' +limit
  })
}

//歌单详情
  export function getSonglistDetail(id){
    return fetch({
     /* url:  '/api/playlist/detail?id=' + id*/
      url: apiUrl +  '/playlist/detail?id=' + id
    })
  }

//每日推荐歌曲
export function getEverydayRecSongs(){
  return fetch({
    url: apiUrl +  '/recommend/songs'
  })
}

//歌曲详情
export function getSongDetail(ids){
  return fetch({
   /* url:  '/api/song/detail?ids=' + ids*/
    url: apiUrl +  '/song/detail?ids=' + ids
  })
}

//音乐URL
export function getSongUrl(id){
  return fetch({
    /*url: '/api/song/url?id=' + id*/
    url:apiUrl +  '/song/url?id=' + id
  })
}

//音乐歌词
export function getSongText(id){
  return fetch({
   /* url:  '/api/lyric?id=' + id*/
    url: apiUrl +  '/lyric?id=' + id
  })
}

//新碟上架
export function getNewDisc(offset, limit){
  return fetch({
   /* url:  '/api/top/album?offset=0&limit=3',*/
    url: apiUrl +  '/top/album?offset=' + offset + '&limit=' + limit,
  })
}

//新歌速递
export function  getNewSong(){
  return fetch({
   /* url:  '/api/top/song?type=0',*/
    url: apiUrl +  '/top/song?type=0',
  })
}

//所有榜单内容摘要
export function  getToplist(){
  return fetch({
  /*  url:  '/toplist/detail',*/
    url: apiUrl +   '/toplist/detail',
  })
}

//各个榜单歌曲详情
export function  getToplistDetail(idx){
  return fetch({
   /* url:   '/api/top/list?idx=' + idx,*/
    url:apiUrl + '/top/list?idx=' + idx,
  })
}

//每日推荐歌曲
export function  getRecommendSongs(){
  return fetch({
   /* url:   '/api/personalized/newsong',*/
    url: apiUrl +   '/personalized/newsong',
  })
}

//手机登录
export function  phoneLogin(phone,password){
  return fetch({
   /* url:   '/api/login/cellphone?phone=' + phone + '&password=' + password,*/
    url:  apiUrl +  '/login/cellphone?phone=' + phone + '&password=' + password,
  })
}

//获取用户详情
export function  getUserDetail(uid){
  return fetch({
/*    url:   '/api/user/detail?uid='+uid*/
    url:  apiUrl +  '/user/detail?uid='+uid
  })
}

//获取登录用户信息 , 歌单，收藏，mv, dj 数量
export function  getUserMore(){
  return fetch({
  /*  url:   '/api/user/subcount'*/
    url: apiUrl + '/user/subcount'
  })
}

//获取用户电台
export function  getUserDj(id){
  return fetch({
    /*  url:   '/api/user/subcount'*/
    url: apiUrl + '/user/dj?uid=' + id
  })
}

//获取用户歌单
export function  getUserSonglist(id,offset,limit){
  return fetch({
    /*  url:   '/api/user/subcount'*/
    url: apiUrl + '/user/playlist?uid=' + id + '&offset=' + offset + '&limit=' + limit
  })
}

//获取用户动态
export function  getUserEvent(id){
  return fetch({
    /*  url:   '/api/user/subcount'*/
    url: apiUrl + '/user/event?uid=' + id
  })
}



//登录状态
export function  getUserStatus(){
  return fetch({
/*    url:  '/api/login/status'*/
    url: apiUrl +  '/login/status'
  })
}

//获取每日推荐歌单
export function  getDailySonglist(){
  return fetch({
  /*  url:  '/api/recommend/resource'*/
    url: apiUrl +  '/recommend/resource'
  })
}

//获取视频标签列表
export function  getVideoList(){
  return fetch({
    url: apiUrl +  '/video/group/list'
  })
}

//获取视频标签下的视频
export function  getVideos(ids){
  return fetch({
    url: apiUrl +  '/video/group?id=' + ids
  })
}

//视频播放地址
export function  getVideo(id){
  return fetch({
    url: apiUrl +  '/video/url?id=' + id
  })
}


//相关视频
export function  getAboutVideo(id){
  return fetch({
    url: apiUrl +  '/related/allvideo?id=' + id
  })
}

//视频详情
export function  getVideoDetail(id){
  return fetch({
    url: apiUrl +  '/video/detail?id=' + id
  })
}

//视频评论
export function  getVideoComment(id,offset,limit){
  return fetch({
    url: apiUrl +  '/comment/video?id=' + id + '&offset=' + offset + '&limit=' + limit
  })
}

//歌单评论
export function  getSonglistComment(id,offset,limit){
  return fetch({
    url: apiUrl +  '/comment/playlist?id=' + id + '&offset=' + offset + '&limit=' + limit
  })
}

//获取热门评论
export function  getHotComment(id,type,offset,limit){
  return fetch({
    url: apiUrl +  '/comment/hot?id=' + id + '&type=' + type + '&offset=' + offset + '&limit=' + limit
  })
}

//电台banner
export function  getDjBanner(){
  return fetch({
    url: apiUrl + '/banner?type=0',
  })
}

//电台推荐
export function  getDjRecommend(num){
  return fetch({
    url: apiUrl + '/dj/recommend?limit=' + num,
  })
}

//电台-付费精选
export function  getDjPaygift(){
  return fetch({
    url: apiUrl + '/dj/paygift?limit=3&offset=0',
  })
}

//电台分类
export function  getDjCatelist(){
  return fetch({
    url: apiUrl + '/dj/catelist',
  })
}

//电台分类推荐
export function  getDjCatelistRec(type){
  return fetch({
    url: apiUrl + '/dj/recommend/type?type=' + type,
  })
}


//电台详情
export function  getDjDetail(rid){
  return fetch({
    url: apiUrl + '/dj/detail?rid=' + rid,
  })
}


//电台节目详情
export function  getDjProgramDetail(id){
  return fetch({
    url: apiUrl + '/dj/program/detail?id=' + id,
  })
}


//获取动态评论
export function  getCommentEvent(id){
  return fetch({
    url: apiUrl + '/comment/event?threadId=' + id,
  })
}

//搜索
export function  getSearch(keywords){
  return fetch({
    url: apiUrl + '/search?keywords= ' + keywords,
  })
}

//热搜列表（简略）
export function  getSearchHot(){
  return fetch({
    url: apiUrl + '/search/hot',
  })
}

//热搜列表（详细）
export function  getSearchHotDetail(){
  return fetch({
    url: apiUrl + '/search/hot/detail',
  })
}

//搜索建议
export function  getSearchSuggest(keywords){
  return fetch({
    url: apiUrl + '/search/suggest?keywords=' + keywords  ,
  })
}

//热门歌手
export function  getHotSingers(offset,limit){
  return fetch({
    url: apiUrl + '/top/artists?offset=' + offset + '&limit=' + limit  ,
  })
}

//歌手描述
export function  getSingerDesc(id){
  return fetch({
    url: apiUrl + '/artist/desc?id=' + id ,
  })
}

//歌手单曲
export function  getSingerSong(id){
  return fetch({
    url: apiUrl + '/artists?id=' + id ,
  })
}

//歌手MV
export function  getSingerMv(id){
  return fetch({
    url: apiUrl + '/artist/mv?id=' + id ,
  })
}
//歌手专辑
export function  getSingerAlbum(id,offset,limit){
  return fetch({
    url: apiUrl + '/artist/album?id=' + id + '&offset=' + offset + '&limit=' + limit  ,
  })
}
//专辑内容
export function  getAlbum(id){
  return fetch({
    url: apiUrl + '/album?id=' + id ,
  })
}

//MV数据
export function  getMvDetail(id){
  return fetch({
    url: apiUrl + '/mv/detail?mvid=' + id ,
  })
}

//MV地址
export function  getMvUrl(id){
  return fetch({
    url: apiUrl + '/mv/url?id=' + id ,
  })
}
//获取相似歌手
export function getSimiSinger (id){
  return fetch({
    url: apiUrl + '/simi/artist?id=' + id ,
  })
}
