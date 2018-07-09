<template>
<el-container class="container">
  <el-header class="header">
<el-row>
<el-col :span="4">
<img src="@/assets/imgs/logo.png" alt="">
</el-col>
<el-col :span="19">
<h2>电商后台管理系统</h2>
</el-col>
<el-col :span="1">
<a href="#">退出</a>
</el-col>
</el-row>
</el-header>

  <el-container class="container">
<!-- 侧边栏 -->
    <el-aside width="200px">
 <el-menu
      default-active="2"
      unique-opened
      :router="true"
      class="el-menu-vertical-demo">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/users">
          <i class="el-icon-menu"></i>
          用户列表
        </el-menu-item>
      </el-submenu>
<el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
          <el-menu-item index="2-1">
            <i class="el-icon-menu"></i>
            角色列表
          </el-menu-item>
        <el-menu-item-group>
          <el-menu-item index="2-2">
            <i class="el-icon-menu"></i>
            权限列表
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
<el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">
            <i class="el-icon-menu"></i>
            商品列表
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="3-2">
            <i class="el-icon-menu"></i>
            分类参数
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="3-3">
            <i class="el-icon-menu"></i>
            商品分类
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
<el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1">
            <i class="el-icon-menu"></i>
            订单列表
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
<el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据统计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1">
            <i class="el-icon-menu"></i>
            数据报表
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>

</el-aside>
<!-- 主体 -->
    <el-main class="main">
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
};
</script>

<style>
.container {
height: 100%;
}

.header {
background-color: #b3c0d1;
padding: 0;
}
.header h2 {
color: #fff;
margin: 0;
line-height: 60px;
text-align: center;
}
.header a {
text-decoration: none;
color: orange;
line-height: 60px;
}

.aside {
background-color: #d3dce6;
}

.main {
background-color: #e9eef3;
height: 100%;
}
</style>
