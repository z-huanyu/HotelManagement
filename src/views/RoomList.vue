<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>房间列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="UsersCard">
      <!-- 表格 -->
      <el-table :data="roomlist" style="width: 100%">
        <el-table-column prop="name" label="房间名称" width="180"></el-table-column>
        <el-table-column prop="number" label="房间号" width="180"></el-table-column>
        <el-table-column prop="typeID.roomType" label="房型" width="180"></el-table-column>
        <el-table-column prop="floorID.roomFloor" label="楼层" width="180"></el-table-column>
        <el-table-column prop="prices" label="房价" width="180"></el-table-column>
        <el-table-column prop="cover" label="房间封面" width="180">
          <template slot-scope="scope">
            <img :src="scope.row.cover" alt="404" style="height:3rem">
          </template>
        </el-table-column>
        <el-table-column prop="status" label="房间状态" width="180">
          <template slot-scope="scope">
            <el-tag :type="tag_type_change(scope.row.status)">{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="$router.push(`/room/roomedit/edit/${scope.row._id}`)">编辑</el-button>
            <el-button size="mini" @click="roomdelete(scope.row._id)">删除</el-button>
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
      roomlist: []
    };
  },
  methods: {
    async getroomlist() {
      const res = await this.$http.get("rest/rooms"); // eslint-disable-line no-unused-vars
      this.roomlist = res.data;
    },
    async roomdelete(id) {
      const res = await this.$http.delete(`rest/rooms/${id}`);// eslint-disable-line no-unused-vars
      this.$message({ type: "success", message: "删除成功" });//后端得返回数据，不然会一直等待后端响应，阻塞弹窗
      this.getroomlist();
    },
    tag_type_change(status){
      if(status==='已入住'){
        return 'info'
      }else{
        return 'success'
      }
    }
  },
  created() {
    this.getroomlist();
  }
};
</script>

<style scoped>
.UsersCard {
  width: 100%;
  height: 100%;
}
</style>