<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
<!-- 搜索框 -->
<div style="margin-top: 15px; border: none;">
<el-input placeholder="请输入内容" v-model="searchInput" class="input-with-select" clearable style="width: 350px;">
<el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
</el-input>
  <el-button type="success" plain @click="addDialogVisible = true">添加用户</el-button>
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
        <template slot-scope="scope">
          {{ scope.row.create_time | fmtDate('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column
        label="用户状态">
        <template slot-scope="scope">
          <!-- scope-row就是当前行绑定的数据对象 -->
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleChangeStatus(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain size="mini" @click="handleShowInfo(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini" @click="handleDelete(scope.row.id)">
          </el-button>
          <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
  <!-- 分页 -->
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
  </el-pagination>

  <!-- 添加用户的对话框 -->
  <el-dialog title="添加用户" :visible.sync="addDialogVisible">
    <el-form :model="formData" :rules="rules" ref="myref">
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
        <el-input v-model="formData.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
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
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleAdd">确 定</el-button>
    </div>
  </el-dialog>

  <!-- 修改用户的对话框 -->
  <el-dialog title="修改用户" :visible.sync="editDialogVisible">
    <el-form :model="formData" :rules="rules" ref="myref">
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="username" :v-model="editUserName">
        <el-input v-model="formData.username" disabled auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="formData.email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth">
        <el-input v-model="formData.mobile" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleEdit">确 定</el-button>
    </div>
  </el-dialog>
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
      addDialogVisible: false,
      formLabelWidth: '120px',
      pagenum: 1,
      pagesize: 2,
      total: 0,
      // 搜索框
      searchInput: '',
      // 添加用户表单验证
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ]
      },
      // 修改用户
      editDialogVisible: false,
      editUserName: ''
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
      const res = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchInput}`);
      // console.log(res);
      const {meta: {msg, status}, data: {users}} = res.data;
      if (status === 200) {
        // 获取数据成功
        // console.log(res.data);
        const {data: {total}} = res.data;
        this.list = users;
        this.total = total;
      } else {
        this.$message.error(msg);
      }
    },
    async handleAdd() {
      // 验证表单
      // console.log(this.$refs);
      this.$refs.myref.validate(async (valid) => {
        if (!valid) {
          return this.$message.error('请完整填写表单!');
        }
        // 获取到input的内容
        this.formData.mg_time = new Date();
        const res = await this.$http.post('users', this.formData);
        // console.log(res);
        const {meta: {msg, status}} = res.data;
        if (status === 201) {
          // 创建成功
          // 关闭弹出层
          this.addDialogVisible = false;
          // 清空input
          for (let key in this.formData) {
            this.formData[key] = '';
          }
          // 刷新页面
          this.loadData();
          // 提示信息
          this.$message.success(msg);
        } else {
          this.$message.error(msg);
        }
      });
    },
    async handleDelete(id) {
      // 提示用户是否删除
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`users/${id}`);
        // console.log(res);
        const {meta: {status, msg}} = res.data;
        if (status === 200) {
          // 刷新页面
          // 提示
          this.loadData();
          this.$message.success(msg);
        } else {
          this.$message.error(msg);
        }
        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除!'
        });
      });
    },
    handleSizeChange(val) {
      // 页面条数发生改变的时候
      this.pagesize = val;
      this.loadData();
    },
    handleCurrentChange(val) {
      // 页码发生改变的时候
      this.pagenum = val;
      this.loadData();
    },
    // 点击搜索按钮时候出发
    handleSearch () {
      // 带上查询参数
      this.loadData();
    },
    // 用户状态发生改变的时候触发
    async handleChangeStatus(user) {
      // console.log(user);
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`);
      const {meta: {status, msg}} = res.data;
      if (status === 200) {
        // 修改成功
        // 提示
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    },
    // 展示修改表单信息
    handleShowInfo (user) {
      this.editDialogVisible = true;
      // this.formData = user;
      // 解决点击取消按钮input输入框跟着变的问题
      this.formData.username = user.username;
      this.formData.email = user.email;
      this.formData.mobile = user.mobile;
      this.formData.id = user.id;
    },
    // 修改用户信息
    async handleEdit() {
      // console.log(this.formData);
      const res = await this.$http.put(`users/${this.formData.id}`, {
        mobile: this.formData.mobile,
        email: this.formData.email
      });
      console.log(res);
      const {meta: {status, msg}} = res.data;
      if (status === 200) {
        // 更新成功
        // 提示
        this.$message.success(msg);
        // 关闭会话框
        this.editDialogVisible = false;
        // 重新加载列表
        this.loadData();
        // 清空文本框
        for (let key in this.formData) {
          this.formData[key] = '';
        }
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
