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
      } else {
        callback();
      }
    };
    var validataPassword = (rule, value, callback) => {
      if (!value) {
        callback("请输入密码");
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //本地校验通过
          alert("submit!");
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
  width: 100%;
}
</style>