import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "@/assets/styles/base.css"
import "@/assets/styles/el-reset.css"

Vue.use(ElementUI);

Vue.config.productionTip = false;

//路有前置钩子（导航守卫）
router.beforeEach((to, from, next) => {
   //用户登入之后，localstrage中有token
   let token = localStorage.getItem('xzp-token');
   if(token){
     //如果是注册页面或者是登入页面直接放行
     next()
   }else{
     //没token   判断是不是登入页面
     if(to.path ==="/login"){
       next()
     }else{
       //访问的不是登入页，就要跳转到登入页
       next({path:"/login"})
     }
   }
  
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
