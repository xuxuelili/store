<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-input placeholder="请输入内容" class="input-with-select goodlistsearch" v-model="searchInfo">
      <!--  -->
      <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
    </el-input>
    <el-button type="success" plain @click="$router.push({name: 'category-add-goods'})">
      添加商品
    </el-button>
    <!-- 表格 -->
    <el-table
      stripe
      border
      :data="list"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goods_weight"
        label="商品重量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="add_time"
        label="创建时间"
        width="180">
        <template slot-scope="scope">
          {{ scope.row.add_time | fmtDate('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button plain size="mini" type="primary" icon="el-icon-edit"></el-button>
          <el-button plain size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 15, 20, 25]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      // 分页
      pagenum: 1,
      pagesize: 10,
      total: 0,
      // 搜索
      searchInfo: ''
    };
  },
  created () {
    this.loadData();
  },
  methods: {
    async loadData () {
      const res = await this.$http.get('goods', {
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize,
          query: this.searchInfo
        }
      });
      // console.log(res);
      const {data: {goods, total}, meta: {msg, status}} = res.data;
      if (status === 200) {
        // 查询数据成功
        this.list = goods;
        this.total = total;
      } else {
        // 查询数据失败
        this.$message.success(msg);
      }
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.loadData();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.loadData();
    },
    // 搜索按钮点击的时候触发
    handleSearch () {
      this.loadData();
    },
    // 删除商品
    async handleDelete (goods) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`goods/${goods.goods_id}`);
        const {meta: {msg, status}} = res.data;
        if (status === 200) {
          this.$message.success(msg);
          this.loadData();
        } else {
          this.$message.error(msg);
        }
        // console.log(res);
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
    }
  }
};
</script>

<style>
.goodlistsearch {
  width: 550px;
  margin: 10px 0;
}
</style>
