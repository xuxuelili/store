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
<a href="#" @click.prevent="handleLoginout">退出</a>
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
      <!-- 一级菜单 -->
      <el-submenu
        :index="item.id + ''"
        v-for="item in menus"
        :key="item.id">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span> {{ item.authName }} </span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item
          :index="'/' + item1.path"
          v-for="item1 in item.children"
          :key="item1.id">
          <i class="el-icon-menu"></i>
          {{ item1.authName }}
        </el-menu-item>
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
  data() {
    return {
      menus: []
    };
  },
  // 判断是否登录
  beforeCreate() {
    // 获取session, 判断是否有session
    const token = sessionStorage.getItem('token');
    if (!token) {
      this.$router.push({name: 'login'});
      // 提示
      this.$message.warning('请先登录!');
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData () {
      const {data: resData} = await this.$http.get('menus');
      const {data, meta: {status, msg}} = resData;
      if (status === 200) {
        this.menus = data;
      } else {
        this.$message.error(msg);
      }
    },
    async handleLoginout() {
      // 删除session, 跳转到登录页面
      sessionStorage.clear();
      this.$router.push({name: 'login'});
      // 提示消息
      this.$message.success('退出成功!');
    }
  }
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
