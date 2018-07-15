import Vue from 'vue';
import Router from 'vue-router';

// 导入组件
import Login from '@/views/login';
import Home from '@/views/home';
import Users from '@/views/users/Users';
import Rights from '@/views/roles/rights';
import Roles from '@/views/roles/roles';
import Category from '@/views/goods/Category';
import CategoryList from '@/views/goods/list';
import CategoryAdd from '@/views/goods/addGoods';

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {name: 'users', path: '/users', component: Users},
        {name: 'rights', path: '/rights', component: Rights},
        {name: 'roles', path: '/roles', component: Roles},
        {name: 'category', path: '/categories', component: Category},
        {name: 'categorylist', path: '/goods', component: CategoryList},
        {name: 'category-add-goods', path: '/goods/add', component: CategoryAdd}
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
});
