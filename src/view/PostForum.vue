<template>
  <el-button type="primary" :icon="this.Plus" style="display: flex;margin-left: 10px;"
             @click="dialogFormVisible = true">发布新帖
  </el-button>
  <div class="infinite-list-wrapper">
    <ul v-infinite-scroll="load" infinite-scroll-immediate="false" class="infinite-list">
      <li v-for="item in forum.content" :key="item" class="infinite-list-item">
        <div class="item-content">
          <p class="item-title" @click="queryContent" style="cursor: pointer;">{{ item.title }}<span
              class="author-name">作者：{{
              item.usernames
            }}</span></p>
        </div>
      </li>
    </ul>
  </div>
  <el-dialog v-model="dialogFormVisible" title="发布帖子">
    <el-form :model="forumSubmit">
      <el-form-item label="标题">
        <el-input v-model="forumSubmit.title" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="forumSubmit.content" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">提交</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {forumPage} from "@/api/user/forum";
import {Plus} from '@element-plus/icons-vue'

export default {
  name: "PostForum",
  data() {
    return {
      forum: {
        content: [],
        number: 0,
        totalElements: 0,
        totalPages: 0
      },
      forumSubmit: {
        title: '',
        content: '',
        username: JSON.parse(localStorage.getItem("users")).username,
        usernames: JSON.parse(localStorage.getItem("users")).name
      },
      dialogFormVisible: false
    };
  },
  methods: {
    forumPageAll(obj) {
      forumPage(obj)
          .then((res) => {
            if (res.status === 200) {
              this.forum.content = [...this.forum.content, ...res.data.content];
              this.forum.number = res.data.number;
              this.forum.totalElements = res.data.totalElements;
              this.forum.totalPages = res.data.totalPages;
            } else {
              this.$message.error("请求发生了未知错误");
            }
          })
          .catch((err) => {
            this.$message.error(err);
          });
    },
    load() {
      if (this.forum.number < this.forum.totalPages - 1) {
        let obj = {
          page: this.forum.number + 1,
          size: 10
        };
        this.forumPageAll(obj);
      } else {
        if (this.forum.number !== 0) {
          this.$message.success("没有更多内容了");
        }
      }
    },
    queryContent() {
      this.$message.success("查看内容");
    }
  },
  created() {
    let obj = {
      page: 0,
      size: 10
    };
    this.forumPageAll(obj);
  },
  computed: {
    Plus() {
      return Plus
    }
  },
};
</script>

<style scoped>
.infinite-list-wrapper {
  height: 750px;
  overflow-y: auto;
}

.infinite-list {
  padding: 0;
  margin: 0;
  list-style: none;
  width: calc(100% - 10px);
}

.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: left;
  height: 74px;
  background: white;
  margin: 5px;
  opacity: 0.9;
}

.infinite-list-wrapper::-webkit-scrollbar {
  width: 0;
  background: transparent;
}

.item-title {
  font-weight: bold;
  color: #555; /* Default color */
}

.item-title:hover {
  color: #333; /* Darker color on hover */
}

.author-name {
  margin-left: 3ch; /* Add the desired spacing between the title and author name */
}

.author-name:hover {
  color: #222; /* Darker color on hover */
}

.ql-container {
  min-height: 200px;
}
</style>
