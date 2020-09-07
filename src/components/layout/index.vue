<template>
  <div class="layout">
    <div class="title">{{title}}</div>
    <div class="wrap">
    <router-view></router-view>
    </div>
    <div class="footer">
        <div v-for="item in list" :key='item.id' @click="changeItem(item)">
              <img  :src="matchRouter(item)?item.activeSrc:item.defalutSrc" alt="">
              <p :class="matchRouter(item)?'activeColor':''">{{item.title}}</p>
        </div>
        
    </div>
  </div>
</template>
<script>
export default {
    data() {
      return {
        defalutActive:0,
        list:[
          {id:0,title:'首页',defalutSrc:require('./img/home.png'),activeSrc:require('./img/home1.png'),url:"/list"},
          {id:1,title:'个人中心',defalutSrc:require('./img/login.png'),activeSrc:require('./img/login1.png'),url:"/login"},
          {id:2,title:'设置',defalutSrc:require('./img/sz.png'),activeSrc:require('./img/acsz.png'),url:"/shezhi"}
        ]
      }
    },
    created() {
     
    },
    computed: {
      title(){
        return this.$route.meta.title
      },
     
    },
    methods: {
      changeItem(item){
        this.defalutActive=item.id
        this.$router.push(item.url)
      },
       matchRouter(item){
        return this.$route.path==item.url
      }
    },
}
</script>

<style lang="scss" scoped>
  .layout{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .wrap{
      flex: 1;
      overflow-y: auto;
       -webkit-overflow-scrolling: touch;
    }
    .footer{
      height: 60px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      div > img{
        width: 20px;
        height: 20px;
      }
    }
    .activeColor{
      color: #1E90FF;
    }
    .title{
      text-align: center;
      background: #1E90FF	;
      color: white;
      font-size: 16px;
      height: 40px;
      line-height: 40px;
    }
  }
</style>
