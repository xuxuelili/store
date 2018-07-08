import Vue from 'vue';
import Router from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/base.css';

// 导入组件
import Login from '@/views/login';

Vue.use(ElementUI);
Vue.use(Router);

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      redirect: { name: 'login' }
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
});
