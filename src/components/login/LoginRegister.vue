<template>
  <div class="login-register">
    <el-card class="login-card" v-show="showLogin">
      <h2>登录</h2>
      <!-- Login form fields -->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-position="top" class="login-form">
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 3rem;margin-top: 2rem">
          <el-button type="primary" @click="login">立即登录</el-button>
          <el-button type="text" @click="show_clear_content(false)">还没有账号?即刻注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="register-card" v-show="!showLogin">
      <h2>注册</h2>
      <!-- Register form fields -->
      <el-form ref="registerForm" :model="registerForm" :rules="registerRules" label-position="top"
               class="register-form">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="registerForm.name" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model="registerForm.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="registerForm.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 3rem;margin-top: 3rem">
          <el-button type="primary" @click="register">立即注册</el-button>
          <el-button type="text" @click="show_clear_content(true)">已有账号，立即登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
  <router-view></router-view>
</template>

<script>

import {userLogin, userRegister} from "@/api/user/user";
import jwt_decode from "jwt-decode";

export default {
  name: 'Login',
  data() {
    return {
      showLogin: true,
      // showRegister: false,
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        name: '',
        username: '',
        password: '',
        phone: ''
      },
      loginRules: {
        username: [
          {required: true, message: '账号不可为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不可为空', trigger: 'blur'}
        ]
      },
      registerRules: {
        name: [
          {required: true, message: '昵称不可为空', trigger: 'blur'}
        ],
        username: [
          {required: true, message: '账号不可为空', trigger: 'blur'}
        ],
        password: [
          {required: true, min: 6, max: 12, message: '密码不可为空,长度范围6-12位', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    login() {
      console.log("开始登录")
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          userLogin(this.loginForm).then(response => {
            console.log(response.data);
            let token_json = jwt_decode(response.data.token);
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('refresh_token', response.data.refresh_token)
            localStorage.setItem('token_expire_time', token_json.exp)
            this.$message.success('登录成功');
            this.$router.push("/core")
          }).catch(error => {
            console.log(error)
            if (error.response.status === 401 || error.response.status === 403) {
              this.$message.error('账号密码不正确');
            } else if (error.response.status === 500) {
              this.$message.error('服务异常，暂时无法登录');
            } else {
              this.$message.error('出现未知错误:', error.message);
            }
          });
        } else {
          console.log('登录表单验证失败，请刷新后重试');
          return false;
        }
      });
    },
    register() {
      const that = this;
      // 校验手机号
      if (this.validatePhoneNumber()) {
        this.$refs.registerForm.validate((valid) => {
          if (valid) {
            userRegister(this.registerForm).then(response => {
              if (response) {
                this.$message.success('注册成功');
                that.open(true, response);
              } else {
                that.$message({
                  message: "注册返回信息异常,请联系管理人员排查",
                  type: 'warning'
                });
              }
            }).catch(error => {
              if (!error.response.status && error.response.status === 500) {
                that.$message({
                  message: error.response.data.errors[0],
                  type: 'warning'
                });
                that.resetForm('registerForm');
              } else {
                that.$message({
                  message: "发生了未知错误，稍后重试吧",
                  type: 'warning'
                });
              }
            });
          } else {
            that.$message({
              message: "提交失败,再检查一下是否填写完整吧!",
              type: 'warning'
            });
            return false;
          }
        });
      }
    },
    // 切换登录或注册时清除隐藏的卡片的字段信息
    show_clear_content(showLogin) {
      this.showLogin = showLogin;
      if (showLogin) {
        this.registerForm = {
          name: '',
          username: '',
          password: '',
          phone: ''
        }
      } else {
        this.loginForm = {
          username: '',
          password: ''
        }
      }
    },
    validatePhoneNumber() {
      // 验证手机号码是否合法
      const phoneNumberPattern = /^1[3456789]\d{9}$/
      if (this.registerForm.phone && !phoneNumberPattern.test(this.registerForm.phone)) {
        this.$message.error('手机号格式不正确');
        return false;
      }
      return true;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //sus 状态 res 结果
    open(sus, res) {
      const that = this;
      if (sus === true && res !== null) {
        this.$confirm(res.name + '注册成功,是否需要跳转至登录界面', '注册消息提示', {
          confirmButtonText: '需要',
          cancelButtonText: '手动跳转',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '开始跳转'
          });
          that.showLogin = true
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '用户选择手动跳转,界面暂留'
          });
        });
        that.resetForm('registerForm');
      }
    }
  }
};
</script>

<style scoped>

.login-register {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100vh;
  margin-right: 5rem;
}

.login-card,
.register-card {
  width: 430px;
  padding: 30px;
  margin-left: 10px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>