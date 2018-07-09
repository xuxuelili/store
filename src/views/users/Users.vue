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
  <el-button type="success" plain @click="dialogFormVisible = true">添加用户</el-button>

  <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
    <el-form :model="formData">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="formData.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="formData.password" type="password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="formData.email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth">
        <el-input v-model="formData.mobile" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleAdd">确 定</el-button>
    </div>
  </el-dialog>

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
      list: [],
      formData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '120px'
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
      const res = await this.$http.get('users?pagenum=1&pagesize=10');
      // console.log(res);
      const {meta: {msg, status}, data: {users}} = res.data;
      if (status === 200) {
        // 获取数据成功
        this.list = users;
      } else {
        this.$message.error(msg);
      }
    },
    async handleAdd() {
      // 关闭弹出层
      this.dialogFormVisible = false;
      // 获取到input的内容
      this.formData.mg_time = new Date();
      const res = await this.$http.post('users', this.formData);
      // console.log(res);
      const {meta: {msg, status}} = res.data;
      if (status === 201) {
        // 创建成功
        // 清空input
        this.formData = {};
        // 刷新页面
        this.loadData();
        // 提示信息
        this.$message.success(msg);
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
