<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框0 -->
    <el-input placeholder="请输入内容" class="input-with-select goodlistsearch">
      <!--  -->
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-button type="success" plain>
      添加商品
    </el-button>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%">
      <e-table-column
        type="index"
        width="80">
      </e-table-column>
      <el-table-column
        prop="date"
        label="商品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品价格"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="商品重量">
      </el-table-column>
      <el-table-column
        prop="address"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {

};
</script>

<style>
.goodlistsearch {
  width: 550px;
  margin: 10px 0;
}
</style>
