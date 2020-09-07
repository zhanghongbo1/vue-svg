<template>
  <div class="shezhi">
        <div class="login" v-for='item in loginArr' :key='item.username' @click="login(item)">
            <p :class="userName==item.username?'color':''">{{item.username}}</p>
            <svg-icon v-show="userName==item.username" icon-class="gou" />
        </div>
        <van-button type="info" @click="out" size="large">退出</van-button>
  </div>
</template>



<script>
import { login  } from "@/api/home";
import { getLogin } from "@/api/shezhi";
export default {
  data() {
    return {
      userName: "",
      loginArr:JSON.parse(localStorage.getItem('userArr'))
    };
  },

  created() {
   
    if(localStorage.getItem('token')){
      this.getUserName();
    }
    
  },
  methods: {
    async getUserName() {
      const res = await getLogin({});
      console.log(res);
      this.userName=res.data.username
    },
  async  login(item){
       const res = await login({username:item.username,password:item.password})
       localStorage.setItem('token',res.token)
       this.getUserName();
    },
    out(){
      localStorage.removeItem('token')
      this.$router.push('/')
    }
  },
};
</script>

<style lang="scss" scoped>
.shezhi{
  .login{
    display: flex;
    padding: 0 10px;
    margin: 10px 0;
    background: LightGrey;
    justify-content: space-between;
    align-items: center;
    p{
      font-size: 18px;
    }
    .color{
      color: #1E90FF;
    }
  }
}
  
</style>