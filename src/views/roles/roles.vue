<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="addRoles">
      <el-col :span="24">
        <el-button type="success" plain size="medium">
          添加角色
        </el-button>
      </el-col>
    </el-row>
      <!-- 表格 -->
    <el-table
      border
      :data="list">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 一级权限 -->
          <el-row
            class="rowTable"
            v-for="item1 in scope.row.children"
            :key="item1.id">
            <el-col :span="4">
              <el-tag type="success" closable @close="handleClose(scope.row, item1.id)"> {{ item1.authName }} </el-tag>
            </el-col>
            <!-- 二级和三级权限 -->
            <el-col :span="20">
              <el-row
                v-for="item2 in item1.children"
                :key="item2.id">
                <el-col :span="4"> <el-tag type="primary" @close="handleClose(scope.row, item2.id)" closable> {{ item2.authName }} </el-tag> </el-col>
                <el-col :span="16">
                  <el-tag
                    type="warning"
                    class="tagTable"
                    closable
                    @close="handleClose(scope.row, item3.id)"
                    v-for="item3 in item2.children"
                    :key="item3.id">
                      {{ item3.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

          <!-- 没有权限时显示 -->
          <el-row
            v-if="scope.row.children.length === 0">
            <el-col :span="24">未分配权限</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        width="80">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini">
          </el-button>
          <el-button type="success" icon="el-icon-check" plain size="mini" @click="handleSetRightDialog(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 权限分配弹出框 -->
    <el-dialog
      @open="handleOpenDialog"
      title="分配权限"
      :visible.sync="dialogVisible">
      <el-tree
        ref="tree"
        :data="treeData"
        :props="defaultProps"
        :default-checked-keys="checkList"
        node-key="id"
        show-checkbox
        default-expand-all>
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSetRight">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      dialogVisible: false,
      treeData: [],
      // 配置要显示的哪个属性
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      checkList: [],
      // 记录当前修改的角色id
      currentRoleId: -1
    };
  },
  created () {
    this.loadData();
  },
  methods: {
    async loadData () {
      const res = await this.$http.get('roles');
      const {data, meta: {status, msg}} = res.data;
      if (status === 200) {
        // 请求成功
        this.list = data;
      } else {
        this.$message.error(msg);
      }
    },
    // tag标签关闭时间
    async handleClose (role, rightId) {
      // scope.row.id 角色id  item.id 权限id
      const {data: resData} = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
      const {data, meta: {status, msg}} = resData;
      // console.log(resData);
      if (status === 200) {
        // 成功
        this.$message.success(msg);
        // this.loadData();
        role.children = data;
      } else {
        // 失败
        this.$message.error(msg);
      }
    },
    // 打开对话框的时候触发,树形分配权限事件
    async handleOpenDialog () {
      const { data: resData } = await this.$http.get('rights/tree');

      const { data } = resData;
      // console.log(data);
      this.treeData = data;
      // console.log(this.treeData);
    },
    // 点击按钮弹出分配权限的对话框
    handleSetRightDialog (role) {
      // 记录角色id
      this.currentRoleId = role.id;
      this.dialogVisible = true;
      // 遍历一级权限
      const arr = [];
      role.children.forEach((item1) => {
        item1.children.forEach((item2) => {
          item2.children.forEach((item3) => {
            arr.push(item3.id);
          });
        });
      });
      this.checkList = arr;
    },
    // 点击确定按钮,分配权限
    async handleSetRight () {
      // 获取到被选中的节点的id
      const checkedKeys = this.$refs.tree.getCheckedKeys();
      // 获取到半选的节点的id
      const halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys();
      const newArray = [...checkedKeys, ...halfCheckedKeys];
      const { data: resData } = await this.$http.post(`roles/${this.currentRoleId}/rights`, {
        rids: newArray.join(',')
      });
      console.log(this.currentRoleId);
      console.log(newArray);
      const {meta: {status, msg}} = resData;
      if (status === 200) {
        // 成功
        // 关闭
        this.dialogVisible = false;
        // 提示
        this.$message.success(msg);
        // 重新加载数据
        this.loadData();
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>

<style>
.addRoles {
  margin: 10px 0;
}
.rowTable {
  margin-bottom: 10px;
}
.tagTable {
  margin: 3px 2px;
}
</style>
