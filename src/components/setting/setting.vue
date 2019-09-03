<template>
    <div class="setting">
      <back-head title="设置" ico_color="#000" ico_display="none"></back-head>
      <div class="content">
        <div class="line"></div>
        <div class="list">
          <div class="title">网络</div>
          <ul>
            <li class="item">
              <div class="item_l">
                <p>使用2G/3G/4G网络播放</p>
                <p class="s">视屏Mlog播放不受此设置影响</p>
              </div>
              <div class="item_r">
                <vswitch  class="vswitch" :index="0" @changeSwitch="changeSwitch" ></vswitch>
              </div>
            </li>
            <li class="item">
              <div class="item_l">
                使用2G/3G/4G网络下载
              </div>
              <div class="item_r">
                <vswitch  class="vswitch" :index="0" @changeSwitch="changeSwitch" ></vswitch>
              </div>
            </li>
            <li class="item">
              <div class="item_l">
                动态页中Wi-Fi下自动播放视频
              </div>
              <div class="item_r">
                <vswitch  class="vswitch" :index="0" @changeSwitch="changeSwitch" ></vswitch>
              </div>
            </li>
            <li class="item">
              <div class="item_l">
                视屏页中Wi-Fi下连续播放
              </div>
              <div class="item_r">
                <vswitch  class="vswitch" :index="0" @changeSwitch="changeSwitch" ></vswitch>
              </div>
            </li>
          </ul>
        </div>
        <div class="line"></div>
        <div class="list">
          <div class="title">播放和下载</div>
          <ul>
            <li class="item">
              <div class="item_l">
               在线播放音质
              </div>
              <div class="item_r text">
                标准
              </div>
            </li>
            <li class="item">
              <div class="item_l">
                下载音质
              </div>
              <div class="item_r text">
                极高
              </div>
            </li>
            <li class="item">
              <div class="item_l">
                鲸云音效
              </div>
              <div class="item_r">

              </div>
            </li>
            <li class="item">
              <div class="item_l">
                视屏解码模式
              </div>
              <div class="item_r text">
                默认设置
              </div>
            </li>
            <li class="item">
              <div class="item_l">
                视屏后台播放
              </div>
              <div class="item_r">
                <vswitch  class="vswitch" :index="0" @changeSwitch="changeSwitch" ></vswitch>
              </div>
            </li>
            <li class="item">
              <div class="item_l">
                边听边存
              </div>
              <div class="item_r text">
                未开启
              </div>
            </li>
            <li class="item">
              <div class="item_l">
                设置下载目录
              </div>
              <div class="item_r text">
                存储卡1
              </div>
            </li>
            <li class="item">
              <div class="item_l">
                缓存设置
              </div>
              <div class="item_r">

              </div>
            </li>
            <li class="item">
              <div class="item_l">
                允许与其他应用同时播放
              </div>
              <div class="item_r">
                <vswitch  class="vswitch" :index="0" @changeSwitch="changeSwitch" ></vswitch>
              </div>
            </li>
          </ul>
        </div>
        <div class="line"></div>
        <div class="list">
          <div class="title">账号和隐私</div>
          <ul>
            <li class="item">
              <div class="item_l">
               账号和绑定设置
              </div>
              <div class="item_r">
              </div>
            </li>
            <li class="item">
              <div class="item_l">
                消息和隐私设置
              </div>
              <div class="item_r">
              </div>
            </li>
            <li class="item">
              <div class="item_l">
                登录保护
              </div>
              <div class="item_r">
              </div>
            </li>
          </ul>
        </div>
        <div class="line"></div>
        <div class="list">
          <div class="title">工具</div>
          <ul>
            <li class="item">
              <div class="item_l">
                桌面歌词
              </div>
              <div class="item_r text">
                <vswitch  class="vswitch" :index="0" @changeSwitch="changeSwitch" ></vswitch>
              </div>
            </li>
            <li class="item">
              <div class="item_l">
                显示歌词翻译
              </div>
              <div class="item_r text">
                <vswitch  class="vswitch" :index="0" @changeSwitch="changeSwitch" ></vswitch>
              </div>
            </li>
            <li class="item">
              <div class="item_l">
                跑步FM离线包
              </div>
              <div class="item_r">
                <vswitch  class="vswitch" :index="0" @changeSwitch="changeSwitch" ></vswitch>
              </div>
            </li>
            <li class="item">
              <div class="item_l">
                桌面小部件
              </div>
              <div class="item_r text">

              </div>
            </li>
            <li class="item">
              <div class="item_l">
               锁屏显示
              </div>
              <div class="item_r text">
                云音乐锁屏
              </div>
            </li>
            <li class="item">
              <div class="item_l">
                通知栏样式
              </div>
              <div class="item_r text">
                云音乐通知栏样式（自动）
              </div>
            </li>
            <li class="item">
              <div class="item_l">
                切换语音
              </div>
              <div class="item_r text">
                默认
              </div>
            </li>
            <li class="item">
              <div class="item_l">
                侧边栏管理
              </div>
              <div class="item_r">

              </div>
            </li>
            <li class="item">
              <div class="item_l">
                自动下载最新安装包
              </div>
              <div class="item_r text">
                仅Wi-Fi网络
              </div>
            </li>
          </ul>
        </div>
        <div class="line"></div>
        <div class="list">
          <div class="title">音乐硬件</div>
          <ul>
            <li class="item">
              <div class="item_l">
                耳机线控切歌
              </div>
              <div class="item_r text">
                已开启
              </div>
            </li>
            <li class="item">
              <div class="item_l">
                连接DLNA设备
              </div>
              <div class="item_r text">
                未开启
              </div>
            </li>
            <li class="item">
              <div class="item_l">
                智能硬件
              </div>
              <div class="item_r">
              </div>
            </li>
          </ul>
        </div>
        <div class="line"></div>
        <div class="list">
          <div class="title">关于</div>
          <ul>
            <li class="item">
              <div class="item_l">
                云音乐新歌指南
              </div>
              <div class="item_r">

              </div>
            </li>
            <li class="item">
              <div class="item_l">
                帮助与反馈
              </div>
              <div class="item_r">

              </div>
            </li>
            <li class="item">
              <div class="item_l">
                关于网易云音乐
                <span>新版本</span>
              </div>
              <div class="item_r">

              </div>
            </li>
          </ul>
        </div>
        <div class="line"></div>
        <div class="bottom">
          切换账号
        </div>
      </div>
    </div>
</template>

<script>
  import BackHead from 'base/back-head/back-head'
  import Vswitch from 'base/switch/switch'
  export default {
    name: 'setting',
    components: {
      BackHead,
      Vswitch
    },
    data() {
      return {
        value:false,
        FId:'123',
        index:0,
      }
    },
    methods:{
      changeSwitch(checked,index) {
        console.log(checked + '-----'+ index)
      }
    }
  }
</script>

<style lang="stylus" scoped>
.setting{
  .content{
    .list{
      margin-left:20px
      .title{
        width:100%
        height:80px
        line-height:80px
        color: $color-font4
        font-size:$font-size-medium
      }
      ul{
        .item{
          display:inline-block
          width: 100%
          height:80px
          line-height :80px
          border-bottom:1px solid $color-line
          .item_l{
            float: left
            height: 100%
            font-size: $font-size-medium
            span{
              padding: 3px 6px
              background:$color-background-home
              font-size:$font-size-small-s
            }
            p{
              line-height :35px
              &.s{
                font-size:$font-size-small
                color: $color-font4
              }
            }

          }
          .item_r{
            box-sizing :border-box
            float:right
            height: 100%
            padding-top:20px
            margin-right:20px
            font-size:$font-size-small
            &.text{
              padding:0
            }
          }
        }
      }
    }
    .line{
      width: 100%
      height: 15px
      background: $color-line1
      margin-top:-10px
    }
    .bottom{
      width: 100%
      height:100px
      line-height:100px
      color: $color-icon
      text-align :center
    }
  }
}
</style>
