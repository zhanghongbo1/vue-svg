
<template>
  <div class="recommend">
    <scroll-wrapper :data="disLists" ref="scroll" @pullingUp='pullUp' @pullingDown='pullingDown' class="recommend_wrapper">
      <div>
        <p v-for="(item ,index) in disLists" :key='index'>{{item}}</p>

      </div>
    </scroll-wrapper>
  </div>
</template>
 
<script>
import ScrollWrapper from '@/components/scroll'
import { getI } from '@/api/home'
export default {
  components: {
    ScrollWrapper,
  },
  data() {
    return {
      disLists: [],
      num: 10,
    }
  },
  methods: {
    async Load() {
      //图片加载完成事件，如果存在多张banner图片，通过this.checkLoad，只需要一张加载完成，撑开高度，就重新计算better-scroll高度
      // if (!this.checkLoad) {
      //   this.$refs.scoll.refresh()
      //   this.checkLoad = true
      // }
      const res = await getI({ num: this.num })
      this.disLists = res.data
    },
    async pullUp() {
      console.log('加载')
      console.log(this.num)
      this.num += 4
      await this.Load()
      setTimeout(() => {
        this.$refs.scroll.refresh()
        this.$refs.scroll.finishPullUp()
      }, 200)
    },
    async pullingDown() {
      this.num = 10
      await this.Load()
      setTimeout(() => {
        this.$refs.scroll.refresh()
        this.$refs.scroll.finishPullDown()
      }, 200)
    },
  },
  async created() {
    await this.Load()
  },
}
</script>

<style lang="scss" scoped>
.recommend {
  width: 100%;
  height: 100%;
}
.recommend_wrapper {
  height: 100%;
  overflow: hidden;
  p {
    height: 300px;
    background: red;
    color: white;
  }
}
</style>