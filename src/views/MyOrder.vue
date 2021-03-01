<template>
  <div>
    <div class="myinformation">我的订单</div>
    <div>
      <el-table :data="userorder">
        <el-table-column prop="webUser" label="用户名" width="180"></el-table-column>
        <el-table-column prop="order_time" label="下单时间" width="180"></el-table-column>
        <el-table-column prop="room.number" label="房间号" width="180"></el-table-column>
        <el-table-column prop="room.prices" label="房价" width="180"></el-table-column>
        <el-table-column prop="room.type" label="房型" width="180"></el-table-column>
        <el-table-column label="订单状态" width="180">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status == '订单已取消' ? 'info' : 'success'">{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="checkout(scope.row._id)" :disabled="flag(scope.row.status)">取消订单</el-button>
             <el-button size="mini" @click="$router.push(`/comments/${scope.row._id}`)">评论</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      webUser: sessionStorage.username,
      userorder: [],
    };
  },
  methods: {
    async getUserOrder() {
      const res = await this.$http.post("userorder", { webUser: this.webUser });
      this.userorder = res.data;
      // console.log(this.userorder)
    },
    async checkout(id){
      await this.$http.put(`checkout/${id}`,{'status':'订单已取消'})
      this.getUserOrder();
    },
    flag(status){//控制按钮开关
     return status == '订单已取消' ? true : false
    }
  },
  created() {
    this.getUserOrder();
  },
};
</script>

<style scoped>
.myinformation {
  text-align: center;
  line-height: 50px;
  border-bottom: 1px solid #f3f3f3;
}
</style>