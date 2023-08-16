<template>
  <div>我是天涯明月刀的内容
    <img :src="user.avatar" alt="图片"/>
  </div>
</template>

<script>

export default {
  name: "DaysBlade",
  setup() {
    const user = JSON.parse(localStorage.getItem("users"))
    return {
      user
    }
  }
}
</script>

<style scoped>

</style>