<template>
  <div>
    <div class="myinformation">我的订单</div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="全部" name="first">
        <el-row>
          <el-col :span="8" v-for="i in userorder" :key="i._id">
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <img :src="i.roomID.cover" class="cover" />
              <div>
                <p>{{i.roomID.name}}</p>
                <p>
                  状态：
                  <el-tag :type="statusColor(i.status)">{{i.status}}</el-tag>
                </p>
                <p>{{i.order_time}}</p>
                <el-button type="danger" @click="$router.push(`/myorderdetial/${i._id}`)">查看详情</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="待付款" name="second">待付款</el-tab-pane>
      <el-tab-pane label="已付款" name="third">已付款</el-tab-pane>
      <el-tab-pane label="待入住" name="fourth">待入住</el-tab-pane>
      <el-tab-pane label="待入住" name="fifth">待入住</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      userorder: [],
      roomList: [], //可选择的空房间列表
      changeroomdialogVisible: false,
      changeRoomform: {} //提交换房的数据
    };
  },
  methods: {
    async getUserOrder() {
      const res = await this.$http.post("userorder", {
        webUserID: sessionStorage.webUserID
      });
      this.userorder = res.data;
    },
    statusColor(status) {
      let type = "";
      switch (status) {
        case "订单已取消":
          type = "info";
          break;
        case "待付款":
          type = "danger";
          break;
        case "已付款":
          type = "success";
          break;
        case "待入住":
          type = "warning";
          break;
        default:
          break;
         
      }
       return type;
    }
  },

  created() {
    this.getUserOrder();
  }
};
</script>

<style scoped>
.myinformation {
  text-align: center;
  line-height: 50px;
  border-bottom: 1px solid #f3f3f3;
}
.cover {
  width: 100%;
  height: 100%;
}
.el-card {
  text-align: center;
  width: 250px;
  height: 380px;
}
</style>