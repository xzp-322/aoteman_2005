import axios from "axios";

import router from "../router"

import ElementUI from 'element-ui';

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "/api" : "http://www.chst.vip"

axios.defaults.withCredentials = true;  //允许请求携带认证

//創建攔截器，可以给每个请求都携带上想要传递的内容
axios.interceptors.request.use(config => {
    //登入和注册是不需要token的
    if(config.url == "/users/login"){
        //放行
        return config
    }else{
        let token = localStorage.getItem('xzp-token')
        config.headers['authorization'] = token;
        return config
    }
    

})
//响应拦截
axios.interceptors.response.use(config=>{
    let {data} = config
    if(data.code =='1004' || data.code =='10022'){  //在当前的后台api中1004的code为校验失败，提示错误并且让页面跳转到登入页
        alert("登入信息失效，请重新登录")
        ElementUI.Message.error("登入信息失效，请重新登入")
        router.push("/login")
    }
    return config
})

axios.create({
    timeout: 4000
})

export default axios