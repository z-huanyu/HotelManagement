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
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="checkout(scope.row._id)"
              :disabled="cancelFlag(scope.row.status)"
            >取消订单</el-button>
            <el-button size="mini" :disabled="commentFlag(scope.row.status)" @click="$router.push(`/comments/${scope.row._id}`)">评论</el-button>
            <el-button size="mini" :disabled="changeRoomFlag(scope.row.status)" @click="changeRoom(scope.row._id)">换房</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 换房弹框 -->
    <el-dialog title="换房操作" :visible.sync="changeroomdialogVisible">
      <el-form :model="changeRoomform" label-width="120px">
        <el-form-item label="选择房间">
          <el-select v-model="changeRoomform.changeRoomNumber" @change="changeRoomCallback($event)">
            <el-option v-for="item in roomList" :key="item._id" :value="item.number">{{item.number}}</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeroomdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeRoomSubmit()">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      webUser: sessionStorage.username,
      userorder: [],
      roomList:[],//可选择的空房间列表
      changeroomdialogVisible: false,
      changeRoomform:{}//提交换房的数据
    };
  },
  methods: {
    async getUserOrder() {
      const res = await this.$http.post("userorder", { webUser: this.webUser });
      this.userorder = res.data;
      // console.log(this.userorder)
    },
    async checkout(id) {
      await this.$http.put(`checkout/${id}`, { status: "订单已取消" });
      this.getUserOrder();
    },
    cancelFlag(status) {
      //控制按钮开关
      if(status == '订单已取消' || status == '订单完成'){
        return true
      }else{
        return false
      }
    },
    commentFlag(status) {
      //控制按钮开关
      if(status == '订单完成'){
        return false
      }else{
        return true
      }
    },
    changeRoomFlag(status) {
      //控制按钮开关
      if(status == '订单已取消' || status == '订单完成'){
        return true
      }else{
        return false
      }
    },
    async changeRoom(id) {
      this.changeRoomform.id = id//获取当前要修改的订单id
      const res = await this.$http.get("roomlist", {
        params: { status: "待入住" }
      });
      this.roomList = res.data
      this.changeroomdialogVisible = true
    },
    async changeRoomSubmit(){
      await this.$http.put(`changeroom/${this.changeRoomform.id}`,{room:this.changeRoomform.changeRoomID})
      this.changeroomdialogVisible = false
      this.getUserOrder()
      this.$message({type:'success',message:'换房成功'})
    },
    changeRoomCallback($event){//获取换房id
    let item = this.roomList.filter(item=>item.number == $event)
    this.changeRoomform.changeRoomID = item[0]._id
    
  },
  },
  
  created() {
    this.getUserOrder();
  }
}
</script>

<style scoped>
.myinformation {
  text-align: center;
  line-height: 50px;
  border-bottom: 1px solid #f3f3f3;
}
</style>