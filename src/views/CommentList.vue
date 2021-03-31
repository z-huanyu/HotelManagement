<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>评价管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="UsersCard">
      <el-divider>操作</el-divider>
      <el-row>
        <el-col :span="6">
          <el-input
            placeholder="请输入"
            v-model="searchInput_val"
            clearable
            @clear="searchInputClear"
            @change="searchInputChange"
            ref="searchInputRef"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="search_btn">搜索</el-button>
        </el-col>
      </el-row>
      <el-divider>评价列表</el-divider>
      <!-- 表格 -->
      <el-table :data="commentList" style="width: 100%">
        <el-table-column prop="commentUsername" label="评价用户" width="150"></el-table-column>
        <el-table-column prop="roomID.name" label="房间名称" width="150"></el-table-column>
        <el-table-column prop="roomID.number" label="房间号" width="100"></el-table-column>
        <el-table-column prop="commentDate" label="点评时间" width="180"></el-table-column>
        <el-table-column prop="commentText" label="内容" width="200"></el-table-column>
        <el-table-column prop="generalComment" label="总评" width="100"></el-table-column>
        <el-table-column prop="comfortable" label="舒适程度" width="100"></el-table-column>
        <el-table-column prop="environment" label="环境卫生" width="100"></el-table-column>
        <el-table-column prop="equipment" label="设备设施" width="100"></el-table-column>
        <el-table-column prop="service" label="服务态度" width="100"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
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
      commentList: [],
      searchInput_val:''
    };
  },
  methods: {
    async getuserslist() {
      const res = await this.$http.get("rest/comments"); // eslint-disable-line no-unused-vars
      this.commentList = res.data;
      console.log(this.commentList)
    },
    async usersdelete(id) {
      const res = await this.$http.delete(`rest/comments/${id}`); // eslint-disable-line no-unused-vars
      this.$message({ type: "success", message: "删除成功" }); //后端得返回数据，不然会一直等待后端响应，阻塞弹窗
      this.getuserslist();
    },
     searchInputClear() {
      this.getuserslist();
    },
    searchInputChange() {
      //当搜索框值为空，刷新数据
      !this.searchInput_val && this.getroomlist();
    },
    async search_btn() {
      //搜索框模糊查询
      const res = await this.$http.post("roomlist", {
        name: this.searchInput_val,
        number: this.searchInput_val
      });
      this.roomlist = res.data;
    },
  },
  created() {
    this.getuserslist();
  }
};
</script>

<style scoped>
.UsersCard {
  width: 100%;
  height: 100%;
}
</style>