<template>
  <div class="warp">
    <selet :data="list" @hasChoose="choose" ref="select" :placeholder="placeholder" v-if="reFresh"></selet>
  </div>
</template>
<script>
import selet from "@/components/selet/index";
import axios from "axios";
export default {
  components: {
    selet,
  },
  data() {
    return {
      placeholder: "请选择",
      list: [],
      reFresh: true,
    };
  },
  watch: {
    list() {
      this.reFresh = false;
      this.$nextTick(() => {
        this.reFresh = true;
      });
    },
  },
  created() {
    this.get();
  },
  methods: {
    choose(val) {
      // console.log(val)
      // console.log(this.$refs.select.choose,'this.$refs.select.choose')
    },
    async get() {
      axios.post("http://localhost:3000/aa").then((res) => {
        console.log(res);
        this.list = res.data;
        // this.$refs.select.data=res.data
      });
    },
  },
};
</script>

<style lang="scss">
.warp {
  width: 600px;
  margin: 0 auto;
}
</style>