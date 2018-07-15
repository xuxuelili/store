<template>
  <div class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="goods-btn">
      <el-col :span="24">
        <el-tag closable type="info" plain size="small" class="el-icon-info" style="width: 100%">添加商品信息</el-tag>
      </el-col>
    </el-row>
    <!-- 步骤条 -->
    <el-steps
      :active="active"
      align-center
      space="200px"
      finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- 标签页 -->
    <el-tabs tab-position="left">
      <el-tab-pane label="基本信息">
        <div style="margin: 20px;"></div>
        <el-form label-position="top" label-width="80px" v-model="list">
          <el-form-item label="商品名称">
            <el-input v-model="list.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="list.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="list.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="list.goods_numbe"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
             <CategoryCascader type="3"></CategoryCascader>
            <!-- <el-cascader
              expand-trigger="hover"
              :options="options"
              v-model="selectedOptions2"
              @change="handleChange">
            </el-cascader> -->
          </el-form-item>
          <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性">商品属性</el-tab-pane>
      <el-tab-pane label="商品图片">商品图片</el-tab-pane>
      <el-tab-pane label="商品内容">商品内容</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CategoryCascader from '@/components/CategoryCascader';
export default {
  data() {
    return {
      active: 0,
      list: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_numbe: '',
        goods_cat: ''
      }
    };
  },
  methods: {
    next() {
      if (this.active++ > 4) this.active = 0;
    }
  },
  components: {
    CategoryCascader
  }
};
</script>

<style>
.goods-btn {
  margin: 10px 0;
}
</style>
