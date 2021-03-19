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
      <div
        class="list"
        :class="i.switch == 0 ? 'inactive_bgc' : 'active_bgc'"
        v-for="(i,index) in roomlist"
        :key="index"
        ref="listroom"
      >
        <el-row style="margin:10px 0">
          <el-col :span="12">
            <span>{{i.number}}号房</span>
          </el-col>
          <el-col :span="12">
            <el-switch
          
              v-model="i.switch"
              active-value="1"
              inactive-value="0"
              active-color="#67c23a"
              active-text="开"
              inactive-text="关"
              @change="switchChange($event,index,i._id)"
            ></el-switch>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-tag>{{i.status}}</el-tag>
          </el-col>
          <el-col :span="8">
            <el-tag>{{i.typeID.roomType}}</el-tag>
          </el-col>
          <el-col :span="8">
            <el-tag>{{i.floorID.roomFloor}}</el-tag>
          </el-col>
        </el-row>
        <el-row style="margin:10px 0">
          <el-button size="small" icon="el-icon-edit" @click="$router.push(`/room/roomedit/edit/${i._id}`)"></el-button>
          <el-button size="small" icon="el-icon-delete" @click="roomdelete(i._id)"></el-button>
        </el-row>
      </div>
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
      console.log(this.roomlist)
    },
    async roomdelete(id) {
      const res = await this.$http.delete(`rest/rooms/${id}`); // eslint-disable-line no-unused-vars
      this.$message({ type: "success", message: "删除成功" }); //后端得返回数据，不然会一直等待后端响应，阻塞弹窗
      this.getroomlist();
    },
    tag_type_change(status) {
      if (status === "已入住") {
        return "info";
      } else {
        return "success";
      }
    },
    async switchChange($event, index,id) {//开关状态改变回调
      const res = await this.$http.put(`rest/rooms/${id}`,this.roomlist[index])// eslint-disable-line no-unused-vars
      this.$message({type:'success', message:'修改房间开/关成功'})
      $event == 1
        ? (this.$refs.listroom[index].style.background = "#67c23a")
        : (this.$refs.listroom[index].style.background = "#dcdfe6");
      // console.log(this.roomlist[index].switch);
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
.list {
  display: inline-block;
  width: 250px;
  height: 130px;
  margin-right: 10px;
  margin-top: 10px;
  border-radius: 30px;
  cursor: pointer;
  text-align: center;
  box-shadow: 3px 5px 10px #c8c8c8;
}
.inactive_bgc {
  background-color: #dcdfe6;
}
.active_bgc {
  background-color: #67c23a;
}
</style>