import {createRouter, createWebHistory} from 'vue-router';
import Login from '../components/login/LoginRegister.vue';
import Home from '../view/CoreView.vue';
import {ElMessage} from 'element-plus';

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        meta: {
            requiresAuth: false, // 不需要登录才能访问的页面
        },
    },
    {
        path: '/core',
        name: 'CoreView',
        component: Home,
        meta: {
            requiresAuth: true, // 需要登录才能访问的页面
        },
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (to.meta.requiresAuth && !token) {
        ElMessage.error('请先登录');
        next('/');
    } else {
        if (token) {
            const exp = localStorage.getItem('token_expire_time')
            if (!exp || exp < Date.now() / 1000) {
                ElMessage.warning('令牌已过期');
                next('/');
            } else {
                next();
            }
        } else {
            ElMessage.error('令牌不存在');
            next('/');
        }
    }
});

export default router;
