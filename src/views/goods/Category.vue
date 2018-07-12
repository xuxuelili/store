<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="success" plain size="mini" class="cate-btn">
      添加分类
    </el-button>
      <!-- 表格 -->
    <el-table
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      border
      height="600"
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="cat_name"
        label="分类名称"
        width="350">
      </el-table-column>
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
        label="是否有效"
        width="180">
        <template slot-scope="scope">
          {{ scope.row.cat_deleted ? '无效':'有效' }}
        </template>
      </el-table-column>
     <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="currentSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total=total>
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      currentPage: 1,
      currentSize: 10,
      total: 0
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const {data: resData} = await this.$http.get(`categories?type=3&pagenum=${this.currentPage}&pagesize=${this.currentSize}`);
      const {data: {result, total}} = resData;
      console.log(resData);
      this.list = result;
      // console.log(data);
      this.total = total;
    },
    handleSizeChange(val) {
      this.currentSize = val;
      this.loadData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loadData();
    }
  }
};
</script>

<style>
.box-card {
  height: 100%;
}
.cate-btn {
  margin: 10px 0;
}
</style>
