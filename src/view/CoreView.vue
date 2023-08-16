<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-button type="primary" :icon="this.House" @click="loadView('Home')">首页</el-button>
        <el-button type="primary" :icon="Reading" @click="loadView('DaysBlade')">天涯明月刀</el-button>
        <el-button type="success" :icon="Notebook" @click="loadView('PostForum')">贴吧论坛</el-button>
        <span style="display: flex;float: right;margin-top: 1rem">
          <el-avatar :size="40" :src="users.avatar"/>
        </span>
      </el-header>
      <el-main>
        <component :is="currentView"></component>
      </el-main>
      <el-footer>妃妃不妃的小窝</el-footer>
    </el-container>
  </div>
</template>


<script>
import {ref} from 'vue';
import {userSelectMe} from '@/api/user/user';
import Home from './HomeView.vue';
import DaysBlade from './DaysBlade.vue';
import PostForum from './PostForum.vue';
import {House, Notebook, Reading} from '@element-plus/icons-vue'

export default {
  name: 'CoreView',
  computed: {
    Notebook() {
      return Notebook
    },
    Reading() {
      return Reading
    },
    House() {
      return House
    }
  },
  components: {
    // 首页组件
    Home,
    // 天刀
    DaysBlade,
    // 论坛
    PostForum
  },
  data() {
    return {
      currentView: Home
    };
  },
  methods: {
    loadView(view) {
      this.currentView = view;
    }
  },
  setup() {
    const users = ref({
      id: 0,
      name: '',
      username: '',
      password: '',
      avatar: '',
      phone: '',
      role: []
    });
    userSelectMe().then((res) => {
      if (res.status === 200) {
        console.log('请求到的数据', res.data);
        users.value = res.data;
        localStorage.setItem('users', JSON.stringify(users.value))
      } else {
        this.$message.error('请求用户自身信息出错');
      }
    }).catch((err) => {
      console.log(err);
    });
    return {
      users
    };
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
</style>