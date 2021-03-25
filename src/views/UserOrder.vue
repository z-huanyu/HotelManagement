<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户订单</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="UsersCard">
      <!-- 表格 -->
      <el-table :data="orderlist" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="身份证">
                <span>{{ scope.row.userID }}</span>
              </el-form-item>
              <el-form-item label="手机号">
                <span>{{ scope.row.phone }}</span>
              </el-form-item>
              <el-form-item label="入住时间">
                <span>{{ scope.row.checkin_date[0]}}</span>
              </el-form-item>
              <el-form-item label="离开时间">
                <span>{{ scope.row.checkin_date[1]}}</span>
              </el-form-item>
              <el-form-item label="预计到达时间">
                <span>{{ scope.row.arrivetime }}</span>
              </el-form-item>
              <el-form-item label="早餐">
                <span>{{ scope.row.roomID.breakfast}}</span>
              </el-form-item>
              <el-form-item label="备注">
                <span>{{ scope.row.remarks}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="_id" label="订单号" width="220"></el-table-column>
        <el-table-column prop="roomID.name" label="房名称" width="100"></el-table-column>
        <el-table-column prop="roomID.number" label="房间号" width="100"></el-table-column>
        <el-table-column prop="username" label="用户名" width="100"></el-table-column>
        <el-table-column prop="order_time" label="下单时间" width="180"></el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <el-tag :type="status_tagtype(scope.row.status)">{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="实付金额" width="100">
          <template slot-scope="scope">
            <span class="pricesColor">￥{{scope.row.paid}}</span>
          </template>
        </el-table-column>
        <el-table-column label="优惠金额" width="100">
          <template slot-scope="scope">
            <span class="pricesColor">￥{{scope.row.discountPaid}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button size="mini">编辑</el-button> -->
            <el-button size="mini" @click="checkin(scope.row)">确认入住</el-button>
            <el-button size="mini" @click="changeroom(scope.row)">换房</el-button>
            <el-button size="mini" @click="cleanroom(scope.row)">打扫</el-button>
            <el-button size="mini" @click="checkoutroom(scope.row)">退房</el-button>
            <el-button size="mini" @click="ordersdelete(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 换房弹框 -->
    <el-dialog title="换房操作" :visible.sync="changeroomdialogVisible">
      <el-form :model="changeRoomForm" label-width="120px">
        <el-form-item label="选择房间">
          <el-select v-model="changeRoomForm.number" @change="getselectID($event)">
            <el-option
              v-for="item in changeRoomList"
              :key="item._id"
              :value="item.number"
            >{{item.number}}</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeroomdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeroom_submit()">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {}, //当前点击订单
      orderlist: [], //订单列表
      changeroomdialogVisible: false,
      changeRoomList: [], //可换房间列表
      changeRoomForm: {}
    };
  },
  methods: {
    async getorderlist() {
      //获取订单数据
      const res = await this.$http.get("rest/orders");
      this.orderlist = res.data;
      console.log(this.orderlist);
    },
    async ordersdelete(id) {
      //删除订单
      const res = await this.$http.delete(`rest/orders/${id}`); // eslint-disable-line no-unused-vars
      this.$message({ type: "success", message: "删除成功" }); //后端得返回数据，不然会一直等待后端响应，阻塞弹窗
      this.getorderlist();
    },
    async checkin(row) {
      //入住操作
      await this.$http.put(`rest/rooms/${row.roomID._id}`, {
        // eslint-disable-line no-unused-vars
        status: "满房",
        switch:'0'
      });
      await this.$http.put(`rest/orders/${row._id}`, {
        // eslint-disable-line no-unused-vars
        status: "已入住"
      });
      this.getorderlist();
    },
    async cleanroom(row) {
      //入住操作
      await this.$http.put(`rest/rooms/${row.roomID._id}`, {
        // eslint-disable-line no-unused-vars
        status: "打扫中",
        switch:'0'
      });
      await this.$http.put(`rest/orders/${row._id}`, {
        // eslint-disable-line no-unused-vars
        status: "打扫中"
      });
      this.getorderlist();
    },
    async changeroom(row) {
      this.order = row;
      const res = await this.$http.get("rest/rooms");
      this.changeRoomList = res.data.filter(item => item.status == "空闲");
      this.changeroomdialogVisible = true;
      this.getorderlist();
    },
    status_tagtype(status) {
      //根据订单状态改变tag标签样式
      if (status === "已入住") {
        return "info";
      } else {
        return "";
      }
    },
    async changeroom_submit() {
      await this.$http.put(`rest/orders/${this.order._id}`, {
        roomID: this.changeRoomForm.roomID
      });
      await this.$http.put(`rest/rooms/${this.order.roomID._id}`, {
        status: "空闲"
      });
      this.getorderlist()
      this.changeroomdialogVisible = false;
    },
    getselectID($event) {
      this.changeRoomForm.roomID = this.changeRoomList.filter(
        item => item.number == $event
      )[0]._id;
    },
    async checkoutroom(row) {
      //退房操作
      await this.$http.put(`rest/rooms/${row.roomID._id}`, {
        // eslint-disable-line no-unused-vars
        status: "空闲",
        switch: '1'
      });
      await this.$http.put(`rest/orders/${row._id}`, {
        // eslint-disable-line no-unused-vars
        status: "订单完成"
      });
      this.getorderlist();
    }
  },
  created() {
    this.getorderlist();
  }
};
</script>

<style scoped>
.UsersCard {
  width: 100%;
  height: 100%;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 100px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.pricesColor {
  color: #fe7f00;
}
</style>