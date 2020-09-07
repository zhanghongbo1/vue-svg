import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "layout",
    component: () => import("@/components/layout"),
    redirect:'/list',
    children:[
      {
        path: "home",
        name: "home",
        component: () => import("../views/Home.vue"),
        meta:{
          title:'我的账单记录'
        }
      },
      {
        path: "login",
        name: "login",
        component: () => import("../views/login.vue"),
        meta:{
          title:'登录'
        }
      },
      {
        path: "list",
        name: "list",
        component: () => import("../views/list.vue"),
        meta:{
          title:'我的账单记录'
        }
      },
      {
        path: "shezhi",
        name: "shezhi",
        component: () => import("../views/shezhi.vue"),
        meta:{
          title:'设置'
        }
      },
    ]
  },


];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to,from,next)=>{
  document.title=to.meta.title
  // let token =localStorage.getItem('token')
  // if(!token){
  //   router.push('/login')
  // }else{
    next()
  // }
  
})
export default router;
