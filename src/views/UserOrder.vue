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
              <el-form-item label="房间号">
                <span>{{ scope.row.room.number}}</span>
              </el-form-item>
              <el-form-item label="早餐">
                <span>{{ scope.row.room.breakfast}}</span>
              </el-form-item>
              <el-form-item label="房价">
                <span>¥{{ scope.row.room.prices}}</span>
              </el-form-item>
              <el-form-item label="房型">
                <span>{{ scope.row.room.type}}</span>
              </el-form-item>
              <el-form-item label="备注">
                <span>{{ scope.row.remarks}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="_id" label="订单号" width="210"></el-table-column>
        <el-table-column prop="username" label="用户名" width="80"></el-table-column>
        <el-table-column prop="order_time" label="下单时间" width="180"></el-table-column>
        <el-table-column label="状态" width="180">
          <template slot-scope="scope">
            <el-tag :type="status_tagtype(scope.row.room.status)">{{scope.row.room.status}}</el-tag>
            <el-tag type="success">已付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini">编辑</el-button>
            <el-button size="mini" @click="checkin(scope.row.room._id)">入住</el-button>
            <el-button size="mini" @click="changeroom(scope.row.room._id,scope.row._id)">换房</el-button>
            <el-button size="mini" @click="checkoutroom(scope.row.room._id)">退房</el-button>
            <el-button size="mini" @click="ordersdelete(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 换房弹框 -->
    <el-dialog title="换房操作" :visible.sync="changeroomdialogVisible">
      <el-form :model="changeroom_order" label-width="120px">
        <el-form-item label="选择房间">
          <el-select v-model="changeroom_order.number" @change="getselectID">
            <el-option
              v-for="item in changeroomlist"
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
      orderlist: [], //订单列表
      changeroomdialogVisible: false,
      changeroomlist: [], //可换房间列表
      changeroom_order: {},
      OriginalID: "", //目前的房间id
      // SelectedID: "" //换取的房间id
      Order_id:"",
    };
  },
  methods: {
    async getorderlist() {
      //获取订单数据
      const res = await this.$http.get("rest/orders");
      this.orderlist = res.data;
    },
    async ordersdelete(id) {
      //删除订单
      const res = await this.$http.delete(`rest/orders/${id}`); // eslint-disable-line no-unused-vars
      this.$message({ type: "success", message: "删除成功" }); //后端得返回数据，不然会一直等待后端响应，阻塞弹窗
      this.getorderlist();
    },
    async checkin(id) {
      //入住操作
      const res = await this.$http.put(`rest/rooms/${id}`, {// eslint-disable-line no-unused-vars
        status: "已入住"
      });
     
      this.getorderlist();
    },
    async changeroom(id,order_id) {//目前房间id
      const res = await this.$http.get(`rest/rooms`); //获取可换的房间（空房）
      this.changeroomlist = res.data.filter(item => {
        //筛选出待入住的房间
        return item.status === "待入住";
      });
      // console.log(this.changeroomlist);
      this.changeroomdialogVisible = true;

      this.OriginalID = id; //传输目前房间的id
      this.Order_id = order_id
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
      //把用户本订单数据进行修改
      const res = await this.$http.put(// eslint-disable-line no-unused-vars
        `rest/orders/${this.Order_id}`,
        {room: this.changeroom_order}
      ); 
      // console.log(res);
      //
      const res2 = await this.$http.put(`rest/rooms/${this.OriginalID}`, { // eslint-disable-line no-unused-vars
        status: "待入住"
      });
      // console.log(res2);
      const res3 = await this.$http.put(`rest/rooms/${this.changeroom_order._id}`, { // eslint-disable-line no-unused-vars
        status: "已入住"
      }); // eslint-disable-line no-unused-vars
      this.$message({ type: "success", message: "换房成功" });
      this.changeroomdialogVisible = false;
      this.getorderlist();
    },
    getselectID(value) {
      //根据选择框选中的value反选出id
      let selecteditem = {};
      selecteditem = this.changeroomlist.find(item => {
        return (item.value = value);
      });
      // this.SelectedID = selecteditem._id;
      this.changeroom_order = selecteditem
      // console.log(this.changeroom_order)
    },
    async checkoutroom(id) {
      //退房操作
      const res = await this.$http.put(`rest/rooms/${id}`, {// eslint-disable-line no-unused-vars
        status: "待入住"
      });
      this.getorderlist();
    }
  },
  created() {
    this.getorderlist();
  }
};
</script>

<style>
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
</style>