<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>评论管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="UsersCard">
      <el-divider content-position="left">管理员操作</el-divider>
      <el-row class="w-100" :gutter="20">
        <el-col :span="6">
          <el-input
            placeholder="输入评论人"
            v-model="searchInput_val"
            clearable
            @clear="searchInputClear"
            @change="searchInputChange"
            ref="searchInputRef"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <el-button @click="search_btn">搜索</el-button>
        </el-col>
      </el-row>

      <el-divider content-position="left">评论列表</el-divider>
      <el-table :data="commentList" style="width: 100%">
        <el-table-column prop="roomID.number" label="房间号" width="180"></el-table-column>
        <el-table-column prop="commentUsername" label="评论人" width="180"></el-table-column>
        <el-table-column prop="commentDate" label="评论时间" width="180"></el-table-column>
        <el-table-column prop="commentText" label="内容" width="280"></el-table-column>
        <el-table-column prop="generalComment" label="综合评价" width="100"></el-table-column>
        <el-table-column prop="comfortable" label="舒适度" width="100"></el-table-column>
        <el-table-column prop="environment" label="环境卫生" width="100"></el-table-column>
        <el-table-column prop="equipment" label="设备" width="100"></el-table-column>
        <el-table-column prop="service" label="服务" width="100"></el-table-column>
       
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
      searchInput_val: "",
     
    };
  },
  methods: {
  
    
    async getcommentList() {
      const res = await this.$http.get("rest/comments"); // eslint-disable-line no-unused-vars
      this.commentList = res.data;
    },
    async usersdelete(id) {
      const res = await this.$http.delete(`rest/comments/${id}`); // eslint-disable-line no-unused-vars
      this.$message({ type: "success", message: "删除成功" }); //后端得返回数据，不然会一直等待后端响应，阻塞弹窗
      this.getcommentList();
    },
    async search_btn() {
      //搜索框模糊查询
      const res = await this.$http.post(`searchcomment`, {
        $or: [
          { commentUsername: this.searchInput_val },
        
        ]
      });
      this.commentList = res.data;
    },
    searchInputClear() {
      this.getcommentList();
    },
    searchInputChange() {
      //当搜索框值为空，刷新数据
      !this.searchInput_val && this.getcommentList();
    },
   
  },

  created() {
    this.getcommentList();
  }
};
</script>

<style scoped>
.UsersCard {
  width: 100%;
  height: 100%;
}
</style>