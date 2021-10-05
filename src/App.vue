<template>
  <!-- <img src="./assets/logo.png" /> -->
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
    >
      <el-menu-item index="1" @click="toHome">浪子归家</el-menu-item>
      <el-menu-item index="2" @click="toRegister">注册</el-menu-item>
      <el-menu-item index="3">其他</el-menu-item>
    </el-menu>

    <!-- 路由显示↓ -->
    <router-view />
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    function toHome() {
      router.push("/");
    }
    function toRegister() {
      router.push("/register");
    }
    return {
      toHome,
      toRegister,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


</style>
