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
        <el-col :offset="6" :span="6">
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
      <el-table :data="commentList.slice((currentPage - 1) * pageSize, currentPage * pageSize)" style="width: 100%" border
        :header-cell-style="{'text-align':'center'}" :default-sort="{prop: 'commentDate', order: 'descending'}">
        <el-table-column prop="commentUsername" label="评价用户" width="120" align="center"></el-table-column>
        <el-table-column prop="roomID.name" label="房间名称" width="120" align="center"></el-table-column>
        <el-table-column prop="roomID.number" label="房间号" width="120" align="center"></el-table-column>
        <el-table-column prop="commentDate" label="点评时间" sortable width="180" align="center"></el-table-column>
        <el-table-column prop="commentText" label="内容" width="120" align="center"></el-table-column>
        <el-table-column prop="generalComment" label="总评" width="120" align="center"></el-table-column>
        <el-table-column prop="comfortable" label="舒适程度" width="120" align="center"></el-table-column>
        <el-table-column prop="environment" label="环境卫生" width="120" align="center"></el-table-column>
        <el-table-column prop="equipment" label="设备设施" width="120" align="center"></el-table-column>
        <el-table-column prop="service" label="服务态度" width="120" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="usersdelete(scope.row._id)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="commentList.length"
        class="fenye"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentList: [],
      searchInput_val:'',
      pageSize: 5, //一页多少数据
      currentPage: 1, //当前页数
    };
  },
  methods: {
     handleSizeChange(val) {
      //当前没有数据条数
      this.pageSize = val
    },
    handleCurrentChange(val) {
      //当前页码
      this.currentPage = val
    },
    async getCommentList() {
      const res = await this.$http.get("rest/comments"); // eslint-disable-line no-unused-vars
      this.commentList = res.data;
    },
    async usersdelete(id) {
      const res = await this.$http.delete(`rest/comments/${id}`); // eslint-disable-line no-unused-vars
      this.$message({ type: "success", message: "删除成功" }); //后端得返回数据，不然会一直等待后端响应，阻塞弹窗
      this.getCommentList();
    },
     searchInputClear() {
      this.getCommentList();
    },
    searchInputChange() {
      //当搜索框值为空，刷新数据
      !this.searchInput_val && this.getCommentList();
    },
    async search_btn() {
      //搜索框模糊查询
      const res = await this.$http.post("searchcomment", {
        InputValue: this.searchInput_val,
      });
      this.commentList = res.data;
    
    },
  },
  created() {
    this.getCommentList();
  }
};
</script>

<style scoped>
.UsersCard {
  width: 100%;
  height: 100%;
}
.fenye{
  text-align: center;
}
</style>