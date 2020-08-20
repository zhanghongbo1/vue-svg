<template>
  <div class="login">
    <van-form @submit="onSubmit" v-if="!gitToken()">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <p class="mid" v-else>欢迎登录</p>
  </div>
</template>
<script>
import { login  } from "@/api/home";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  created() {
   
  },
  computed: {
      
  },
  methods: {
     onSubmit(values) {
      this.loginInto()
    },
    async loginInto(params){
      const res = await login({username:this.username,password:this.password})
      if(res.code==200){
        localStorage.setItem('token',res.token)
        this.$router.push('/')
      }
    },
    gitToken(){
        return localStorage.getItem('token')
      }
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>