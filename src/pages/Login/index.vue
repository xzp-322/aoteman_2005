<template>
  <div class="login-pages">
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="demo-loginForm"
    >
      <h1 class="title">奥特曼管理系统</h1>
      <el-form-item label="用户名" prop="username">
        <el-input
          type="text"
          v-model="loginForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>

    <video
      muted="muted"
      src="../video/dijia.mp4"
      autoplay="autoplay"
      loop="loop"
      preload="auto"
      class="bg_video"
     
    ></video>
  </div>
</template>

<script>
//登入逻辑地实现
//1 收集用户输入的用户名username和密码password 传递给后端

//2 登入通过后，将后端返回的token存到本地,跳转到主页

//3 每次请求的时候携带token到请求头authorization

//4 展示token校验正确的数据

//5 校验不通过跳转到登入页
import { login } from "@/api";
export default {
  data() {
    /**
     * @param {object} rule 就是一个表单验证对象
     * @param {string} value 输入值
     * @param {function}  callback 校验通过不传参 不通过传参
     */
    var validatausername = (rule, value, callback) => {
      if (!value) {
        callback("请输入用户名");
        alert("請輸入用戶名")
      } else {
        callback();
      }
    };
    var validataPassword = (rule, value, callback) => {
      if (!value) {
        callback("请输入密码");
        alert("请输入密码")
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: validatausername, trigger: "blur" }],
        password: [{ validator: validataPassword, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      //本地校验通过打开登入加载动画
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
      }, 1000);

      this.$refs[formName].validate((valid) => {
        if (valid) {
          //本地校验通过
          login(this.loginForm.username, this.loginForm.password)
            //可以结构为   let {username,password} = this.loginForm    login(username,password)
            .then((res) => {
              //服务器响应，关闭loading动画
              setTimeout(() => {
                loading.close();
              }, 1000);

              if (res.data.state) {
                this.$message({
                  showClose: true,
                  message: "恭喜你，这是一条成功消息",
                  type: "success",
                });
                //用户名密码正确
                console.log(res)
                localStorage.setItem("xzp-token", res.data.token);
                //跳转到主页
                this.$router.push("/");
              } else {
                //用户名或者密码错误
                this.$message({
                  showClose: true,
                  message: "错了哦，这是一条错误消息",
                  type: "error",
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style >
/* 表单样式 */
.el-form {
  width: 400px;
  height: 487px;
  text-align: center;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 11px;
}
.title {
  color: #fff;
}

.login-pages .title {
  padding-top: 100px;
  margin-bottom: 50px;
}
.title h1 {
  display: block;
  font-size: 20px;
  margin-block-start: 6.7px;
  margin-block-end: 6.7px;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
.login-pages {
  /* background-image:url(".."); */
  width: 100%;
}
.demo-loginForm {
  position: absolute;
  top: 20%;
  left: 65%;
  z-index: 99;
}
.bg_video {
  position: fixed;
  	right: 0;
  	bottom: 0;
  	min-width: 100%;
  	min-height: 100%;
  	height: auto;
  	width: auto;

}
</style>