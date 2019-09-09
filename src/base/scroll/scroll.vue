<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    props: {
      preventDefault:{
        type:Boolean,
        default:false
      },
      probeType: {
        type: Number,
        default: 2
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: null
      },
      pullup: {
        type: Boolean,
        default: false
      },
      pulldown: {
        type: Boolean,
        default:false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          preventDefault:this.preventDefault,
          pullDownRefresh:{
            threshold:20, // 当下拉到超过顶部40px 时，触发 pullingDown 事件
            stop: 10 // 刷新数据的过程中，回弹停留在距离顶部还有 30px 的位置
          },
          pullUpLoad:{
            threshold:-10,
          },
          useTransition:false  // 防止iphone微信滑动卡顿
        })

        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }

        // 是否派发滚动到底部事件，用于上拉加载
        if (this.pullup) {
          this.scroll.on('pullingUp', () => {
            this.$emit('pullingUp')
            setTimeout(() => {
              // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
              this.scroll.finishPullUp()
              this.scroll.refresh() //重新计算元素高度
            }, 2000)
          })
        }


        // 是否派发顶部下拉事件，用于下拉刷新
        if (this.pulldown) {
          this.scroll.on('pullingDown', (pos) => {
            this.$emit('pullingDown')
            setTimeout(() => {
              // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则下拉事件只会执行一次
              this.scroll.finishPullDown()
            }, 2000)
          })
        }


        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()

      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
