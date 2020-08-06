<template>
  <div>list111111111111111111111111</div>
</template>
<script>
import { getDetail } from "@/api/home";
export default {
  created() {
    this.getDetail1();
  },

  methods: {
    async getDetail1() {
      const res = await getDetail({num:'1'});
      console.log(res);
    },
  },
};
</script>