import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 全局配置 Axios 实例
axios.defaults.baseURL = 'http://127.0.0.1';
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;


const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router);
app.use(ElementPlus, {
    locale: zhCn,
})
app.config.globalProperties.$axios = axios;
app.mount('#app');
