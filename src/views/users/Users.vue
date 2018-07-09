<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
<!-- 搜索框 -->
<div style="margin-top: 15px; border: none;">
<el-input placeholder="请输入内容" class="input-with-select" clearable style="width: 350px;">
<el-button slot="append" icon="el-icon-search"></el-button>
</el-input>
<el-button type="success" plain>添加用户</el-button>
</div>
<!-- 表格 -->
 <el-table
      :data="list"
      border
      class="user-table"
      style="width: 100%">
       <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="注册时间">
      </el-table-column>
      <el-table-column
        label="用户状态">
        <template slot-scope="scope">
          <!-- scope-row就是当前行绑定的数据对象 -->
          <el-switch
          v-model="scope.row.mg_state"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
        <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
        <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
      </template>
      </el-table-column>
    </el-table>
</el-card>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      // 发送请求之前获取token
      const token = sessionStorage.getItem('token');
      // 在请求头中设置token
      this.$http.defaults.headers.common['Authorization'] = token;
      const res = await this.$http.get('users?pagenum=1&pagesize=6');
      // console.log(res);
      const {meta: {msg, status}, data: {users}} = res.data;
      if (status === 200) {
        // 获取数据成功
        this.list = users;
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>

<style>
.user-table {
margin-top: 3px;
}
.box-card {
height: 100%;
}
</style>
