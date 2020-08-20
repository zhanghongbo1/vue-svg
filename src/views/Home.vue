<template>
  <div class="home">
    <div  v-for="(item,index) in list" :key="index" > 
      <svg-icon :icon-class="item" />
      <span>{{item}}</span>
    </div>
    <div class="width">

    </div>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  data() {
    return {
      list:[]
    }
  },
      created() {
        const req = require.context('../icons/svg', false, /\.svg$/)
            let arr=[]
            req.keys().forEach(item=>{
              item=item.split('.')[1].slice(1)
              arr.push(item)
            })
           this.list=arr

      
      },
}
</script>

<style lang="scss">
  .width{
    width: 6rem;
    height: 6rem;
    background: red;
  }
  
</style>
