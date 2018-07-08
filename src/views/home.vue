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
    <el-aside width="200px">Aside</el-aside>
    <el-main class="main">Main</el-main>
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
