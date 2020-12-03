<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="UsersCard">
      <!-- 表格 -->
      <el-table :data="userslist" style="width: 100%">
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="password" label="密码" width="600"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini">编辑</el-button>
            <el-button size="mini" @click="usersdelete(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userslist: []
    };
  },
  methods: {
    async getuserslist() {
      const res = await this.$http.get("rest/users"); // eslint-disable-line no-unused-vars
      this.userslist = res.data;
    },
    async usersdelete(id) {
      const res = await this.$http.delete(`rest/users/${id}`);// eslint-disable-line no-unused-vars
      this.$message({ type: "success", message: "删除成功" });//后端得返回数据，不然会一直等待后端响应，阻塞弹窗
      this.getuserslist();
    }
  },
  created() {
    this.getuserslist();
  }
};
</script>

<style>
.UsersCard {
  width: 100%;
  height: 100%;
}
</style>