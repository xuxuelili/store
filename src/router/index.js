import Vue from 'vue';
import Router from 'vue-router';

// 导入组件
import Login from '@/views/login';
import Home from '@/views/home';
import Users from '@/views/users/Users';
import Rights from '@/views/roles/rights';

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {name: 'users', path: '/users', component: Users},
        {name: 'rights', path: '/rights', component: Rights}
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
});
