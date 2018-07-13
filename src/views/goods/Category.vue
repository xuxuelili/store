<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="row-add">
      <el-col :span="24">
        <el-button type="success" plain @click="handleShowAdd">添加分类</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table
      v-loading="loading"
      stripe
      border
      :data="list"
      style="width: 100%">
      <el-tree-grid
        prop="cat_name"
        label="分类名称"
        treeKey="cat_id"
        parentKey="cat_pid"
        levelKey="cat_level"
        childKey="children"
        :indentSize="30">
      </el-tree-grid>
      <!-- <el-table-column
        prop="cat_name"
        label="分类名称"
        width="180">
      </el-table-column> -->
      <el-table-column
        label="级别"
        width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level === 0">一级</span>
          <span v-else-if="scope.row.cat_level === 1">二级</span>
          <span v-else-if="scope.row.cat_level === 2">三级</span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否有效">
        <template slot-scope="scope">
          {{ scope.row.cat_deleted ? '无效' : '有效' }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button plain size="mini" type="primary" icon="el-icon-edit" ></el-button>
          <el-button plain size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!-- 添加分类的对话框 -->
    <el-dialog title="添加商品分类" :visible.sync="addDialogForm">
      <el-form :model="addForm" ref="myAddRef">
        <el-form-item label="分类名称" label-width="80px">
          <el-input v-model="addForm.cat_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类名称" label-width="80px">
          <!-- 级联选择器 -->
          <!-- props=>可选项数据源，键名可通过 props 属性配置
            selectedOptions2 => 用来获取级联选择器的节点-->
          <el-cascader
            expand-trigger="hover"
            change-on-select
            :options="options"
            v-model="selectedOptions2"
            :props="{
              label: 'cat_name',
              value: 'cat_id',
              children: 'children'
            }">
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogForm = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
// 1. npm install element-tree-grid
// 2. 引入组件
// 3. 局部注册组件
import ElTreeGrid from 'element-tree-grid';

export default {
  data() {
    return {
      list: [],
      loading: true,
      // 分页数据
      pagenum: 1,
      pagesize: 5,
      total: 0,
      // 添加分类的对话框
      addDialogForm: false,
      addForm: {
        cat_pid: 0,
        cat_name: '',
        cat_level: 0
      },
      props: [],
      options: [],
      selectedOptions2: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    // 加载列表数据
    async loadData() {
      this.loading = true;
      const { data: resData } = await this.$http.get(`categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);

      this.loading = false;

      const { data: { result, total } } = resData;
      this.list = result;
      // 获取总条数
      this.total = total;
    },
    // 分页方法
    handleSizeChange(val) {
      this.pagesize = val;
      this.loadData();
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.loadData();
      // console.log(`当前页: ${val}`);
    },
    // 删除事件
    async handleDelete(rot) {
      // console.log(rot);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`categories/${rot.cat_id}`);
        // console.log(res);
        const {meta: {status, msg}} = res.data;
        if (status === 200) {
          // 成功
          // 刷新页面
          // 提示
          this.$message.success(msg);
          this.loadData();
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
          message: '已取消删除'
        });
      });
    },
    // 点击添加分类按钮
    async handleShowAdd() {
      // 获取所有分类
      this.addDialogForm = true;
      const res = await this.$http.get('categories?type=2');
      // console.log(res);
      const {data, meta: {status, msg}} = res.data;
      if (status === 200) {
        // 获取数据成功
        // 展示数据到级联选择器
        this.options = data;
      } else {
        this.$message.error(msg);
      }
    },
    // 添加分类事件
    async handleAdd() {
      const addForm = {
        ...this.addForm,
        cat_pid: this.selectedOptions2[this.selectedOptions2.length - 1],
        cat_level: this.selectedOptions2.length
      };
      // console.log(addForm);
      const res = await this.$http.post('/categories', addForm);
      // console.log(res);
      const {meta: {status, msg}} = res.data;
      if (status === 201) {
        // 添加成功
        // 提示
        this.$message.success(msg);
        // 刷新页面
        this.loadData();
        // 关闭会话层
        this.addDialogForm = false;
        // 清空
        this.selectedOptions2 = [];
        this.$refs['myAddRef'].resetFields();
      } else {
        // 添加失败
        this.$message.error(msg);
      }
    }
  },
  components: {
    ElTreeGrid
  }
};
</script>

<style>
.box-card {
  height: 100%;
  overflow: auto;
}
.row-add {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
