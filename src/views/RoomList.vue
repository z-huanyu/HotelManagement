<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>房间列表</el-breadcrumb-item>
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
      <el-divider>房间列表</el-divider>
      <!-- 表格 -->
      <el-table
        :data="roomlist.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        style="width: 100%"
        border
        :header-cell-style="{'text-align':'center'}"
      >
        <el-table-column prop="name" label="房间名称" width="120" align="center"></el-table-column>
        <el-table-column prop="number" label="房间号" width="120" align="center"></el-table-column>
        <el-table-column prop="typeID.roomType" label="房型" width="120" align="center"></el-table-column>
        <el-table-column prop="floorID.roomFloor" label="楼层" width="120" align="center"></el-table-column>
        <el-table-column prop="prices" label="房价" width="120" align="center"></el-table-column>
        <el-table-column prop="cover" label="房间封面" width="120" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.cover" alt="404" style="height:3rem" />
          </template>
        </el-table-column>
        <el-table-column prop="status" label="房间状态" width="120" align="center">
          <template slot-scope="scope">
            <el-tag :type="tag_type_change(scope.row.status)">{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="switch" label="冻结/开启" width="120" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.switch"
              active-value="1"
              inactive-value="0"
              @change="roomSwitchChange($event,scope.row._id)"
            >></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="$router.push(`/room/roomedit/edit/${scope.row._id}`)">编辑</el-button>
            <el-button size="mini" @click="roomdelete(scope.row._id)" type="danger">删除</el-button>
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
        :total="roomlist.length"
        class="fenye"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomlist: [],
      searchInput_val: "",
      pageSize: 5, //一页多少数据
      currentPage: 1 //当前页数
    };
  },
  methods: {
    handleSizeChange(val) {
      //当前没有数据条数
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      //当前页码
      this.currentPage = val;
    },
    async getroomlist() {
      const res = await this.$http.get("rest/rooms"); // eslint-disable-line no-unused-vars
      this.roomlist = res.data;
    },
    async roomdelete(id) {
      const res = await this.$http.delete(`rest/rooms/${id}`); // eslint-disable-line no-unused-vars
      this.$message({ type: "success", message: "删除成功" }); //后端得返回数据，不然会一直等待后端响应，阻塞弹窗
      this.getroomlist();
    },
    tag_type_change(status) {
      //根据状态改变tag标签样式
      let res = "";
      switch (status) {
        case "打扫中":
          res = "danger";
          break;
        case "待入住":
          res = "warning";
          break;
        case "满房":
          res = "info";
          break;
        case "打扫完成":
          res = "warning";
          break;
        case "空闲":
          res = "success";
          break;
        default:
          break;
      }
      return res;
    },
    async roomSwitchChange($event, id) {
      await this.$http.put(`rest/rooms/${id}`, {
        switch: $event
      });
    },
    searchInputClear() {
      this.getroomlist();
    },
    searchInputChange() {
      //当搜索框值为空，刷新数据
      !this.searchInput_val && this.getroomlist();
    },
    async search_btn() {
      //搜索框模糊查询
      const res = await this.$http.post("searchroom", {
        searchData: {
          $or: [
            { name: this.searchInput_val.trim() },
            { number: this.searchInput_val.trim() },
            { status: this.searchInput_val.trim() },
            { prices: parseInt(this.searchInput_val.trim())}
          ]
        },
        searchInput_val: this.searchInput_val.trim()
      });
      this.roomlist = res.data;
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
.fenye {
  text-align: center;
}
</style>