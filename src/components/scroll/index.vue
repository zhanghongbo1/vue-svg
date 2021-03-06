
<template>
  <div class="bscroll" ref="wrapper">
    <slot></slot>
  </div>
</template>
 
<script>
import Bscroll from 'better-scroll'
export default {
  props: {
    probeType: {
      //可选值：1、2、3当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；
      //当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，
      //而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。如果没有设置该值，其默认值为 0，即不派发 scroll 事件
      type: Number,
      default: 1,
    },
    click: {
      //better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件，我们会给派发的 event
      //参数加一个私有属性 _constructed，值为 true,如果better-scroll里面的标签不能点击触发默认事件，需要在标签标签中添加class='needsclick'
      type: Boolean,
      default: true,
    },

    data: {
      //存储数据
      type: Array,
      default: () => [],
    },
    listenScroll: {
      //是否监听滚动，返回的滚动的位置
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    //延迟20ms执行，保证页面加载完成,因为大多浏览器每17ms刷新一次
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll() {
      //初始化better-scroll
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new Bscroll(this.$refs.wrapper, {
        probeType: 3,
        click: this.click,
        // 下拉刷新
        pullDownRefresh: {
          // 下拉距离超过30px触发pullingDown事件
          threshold: 10,
          // 回弹停留在距离顶部20px的位置
          stop: 0,
        },
        pullUpLoad: {
          // 当上拉距离超过30px时触发 pullingUp 事件
          threshold: -30,
        },
      })
      let _this = this

      // 是否派发顶部下拉事件，用于下拉刷新
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')

        // }, 200)
      })
      this.scroll.on('pullingDown', () => {
        this.$emit('pullingDown')
      })
    },
    enable() {
      //启用 better-scroll, 默认 开启。
      this.scroll && this.scroll.enable()
    },
    disable() {
      //禁用 better-scroll，DOM 事件（如 touchstart、touchmove、touchend）的回调函数不再响应。
      this.scroll && this.scroll.disable()
    },
    refresh() {
      //重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      //better-scroll滚动到指定数值的位置
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      //better-scroll滚动到指定元素位置
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    finishPullDown() {
      this.scroll.finishPullDown()
    },
  },
}
</script>
 
<style scoped lang="less">
</style>