<template>
  <el-container>
    <el-main> </el-main>

    <el-aside>
      <p>欢迎注册-浪子归家</p>
      <p>我们致力于交流学习</p>
      <p id="register-p-left">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;现在学习会遇到很多不会的，往往一个很简单的问题，没有思路却要花费很久的时间才能达到我们想要的效果.
        所以，来和我们试一试把
      </p>
      <el-divider></el-divider>
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
            <el-button
              id="register-submit-size"
              type="primary"
              @click="submitForm('ruleForm')"
              >立即注册</el-button
            >
          </el-form-item>
        </el-form>
      </div></el-aside
    >
  </el-container>

  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { useRouter } from "vue-router";
export default defineComponent({
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
  setup() {
    const router = useRouter();

    const open = () => {
      router.push("/");
    };

    return {
      open,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          ElMessageBox.confirm("注册成功了，是否现在转去登录呢?", "浪子归家", {
            confirmButtonText: "好的",
            cancelButtonText: "取消",
            type: "success",
          }).then(() => {
            this.open();
          });
        } else {
          ElMessage.error('注册失败了，可能是网络出现了异常，请稍后重试.')
          return false;
        }
      });
    },
  },
});
</script>

<style>
#register-submit-from {
  position: relative;
  width: 23em;
  height: auto;
  /* border: red 1px solid; */
}
p {
  color: black;
}
html {
  overflow: hidden;
}

#register-p-left {
  text-align: left;
}

#register-submit-size {
  width: 26em;
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
  background: white no-repeat center 0;
  color: var(--el-text-color-primary);
  text-align: center;
  width: 23em;
  margin-left: 4px;
  height: calc(100vh);
}

.el-main {
  /* background-color: #e9eef3; */
  background: url("../assets/register/hailang.jpg") no-repeat center 0;
  background-size: 100%;
  opacity: 0.9;
  color: var(--el-text-color-primary);
  text-align: center;
  margin: 0 auto;
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
