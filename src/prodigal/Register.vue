<template>
  <!-- <img src="./assets/logo.png" /> -->
  <el-container>
    <el-main> </el-main>
    <el-aside class="regis">
      <div id="register-submit-from">
        <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules">
          <el-form-item prop="username">
            <el-input
              placeholder="请输入用户名"
              v-model.number="ruleForm.username"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              v-model="ruleForm.password"
              type="password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input
              placeholder="请输入确认密码"
              v-model="ruleForm.checkPass"
              type="password"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >Submit</el-button
            >
          </el-form-item>
        </el-form>
      </div></el-aside
    >
  </el-container>

  <router-view />
</template>

<script>
export default {
  data() {
    const checkUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名不能为空"));
      } else {
        if (this.ruleForm.username !== "") {
          this.$refs.ruleForm.validateField("username");
        }
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("登录密码不能为空"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("验证密码不可为空"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次密码验证不不匹配"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        checkPass: "",
        username: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        username: [{ validator: checkUsername, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
#register-submit-from {
  position: relative;
  width: 350px;
  height: auto;
  border: red 1px solid;
}

/* 容器样式初始化 */
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  width: 352px;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  opacity: 0.4;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
/* 容器样式初始化结束 */
</style>
