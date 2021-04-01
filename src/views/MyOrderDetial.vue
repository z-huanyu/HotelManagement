<template>
  <div>
    <div class="myinformation">我的订单</div>
    <div>
      <el-form :model="userorder" label-width="150px">
        <el-row></el-row>
        <el-form-item label="房间名称">
          <span class="ml-3">{{userorder.roomID ? userorder.roomID.name : '无'}}</span>
        </el-form-item>
        <el-form-item label="房间状态" prop="status">
          <el-col :span="12">
            <span class="ml-3">{{userorder.status}}</span>
          </el-col>
        </el-form-item>
        <el-form-item label="订单金额" prop="paid">
          <el-col :span="12">
            <span class="ml-3">{{userorder.paid}}</span>
          </el-col>
        </el-form-item>
        <el-form-item label="优惠金额" prop="discountPaid">
          <el-col :span="12">
            <span class="ml-3">{{userorder.discountPaid}}</span>
          </el-col>
        </el-form-item>
        <el-form-item label="下单时间" prop="order_time">
          <el-col :span="12">
            <span class="ml-3">{{userorder.order_time}}</span>
          </el-col>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-col :span="12">
            <span class="ml-3">{{userorder.remarks}}</span>
          </el-col>
        </el-form-item>
        <el-form-item label="预计到达时间" prop="arrivetime">
          <el-col :span="12">
            <span class="ml-3">{{userorder.arrivetime}}</span>
          </el-col>
        </el-form-item>
        <el-form-item label="入住人姓名" prop="username">
          <el-col :span="12">
            <span class="ml-3">{{userorder.username}}</span>
          </el-col>
        </el-form-item>
        <el-form-item label="入住人身份证" prop="userID">
          <el-col :span="12">
            <span class="ml-3">{{userorder.userID}}</span>
          </el-col>
        </el-form-item>
        <el-form-item label="入住人电话号码" prop="phone">
          <el-col :span="12">
            <span class="ml-3">{{userorder.phone}}</span>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="checkout" v-if="cancelFlag()">取消订单</el-button>
          <el-button type="danger" @click="changeRoom" v-if="changeRoomFlag()">换房</el-button>
          <el-button type="danger" @click="paid" v-if="paidRoomFlag()">付款</el-button>
          <el-button
            type="danger"
            @click="$router.push(`/comments/${$route.params.id}`)"
            v-if="commentFlag()"
          >评价</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 换房弹框 -->
    <el-dialog title="换房操作" :visible.sync="changeroomdialogVisible" width="500px">
      <el-form :model="changeRoomform" label-width="120px">
        <el-form-item label="选择房间">
          <el-select v-model="changeRoomform.roomID" @change="changeRoomSelect">
            <el-option
              v-for="item in roomList"
              :key="item._id"
              :value="item._id"
              :label="item.name"
            >{{item.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-divider>房间信息</el-divider>
        <el-form-item label="房间名称" v-show="changeRoomform.roomID">
          <span>{{selectRoom.name}}</span>
        </el-form-item>
        <el-form-item label="房间号" v-show="changeRoomform.roomID">
          <span>{{selectRoom.number}}</span>
        </el-form-item>
        <el-form-item label="价格" v-show="changeRoomform.roomID">
          <span>￥{{selectRoom.prices}}</span>
        </el-form-item>
        <el-form-item label="优惠价" v-show="changeRoomform.roomID">
          <span>￥{{changeRoomDiscountPirces()}}</span>
        </el-form-item>
        <el-form-item label="补全差价" v-show="changeRoomform.roomID">
          <span>￥{{changeRoomPaid()}}</span>
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
      // webUser: sessionStorage.username,
      userorder: {},
      roomList: [], //可选择的空房间列表
      changeroomdialogVisible: false,
      changeRoomform: {}, //提交换房的数据
      paidForm: {},
      selectRoom: {} //换房选择的房间信息
    };
  },
  methods: {
    async getUserOrder() {
      const res = await this.$http.get(`getorder/${this.$route.params.id}`);
      this.userorder = res.data;
    },
    async checkout() {
      await this.$http.put(`checkout/${this.userorder._id}`, {
        status: "订单已取消"
      });
      this.getUserOrder();
    },
    cancelFlag() {
      //控制按钮开关
      if (
        this.userorder.status == "订单已取消" ||
        this.userorder.status == "订单完成"
      ) {
        return false;
      } else {
        return true;
      }
    },
    commentFlag() {
      //控制按钮开关
      if (this.userorder.status == "订单完成") {
        return true;
      } else {
        return false;
      }
    },
    changeRoomFlag() {
      //控制按钮开关
      if (
        this.userorder.status == "订单完成" ||
        this.userorder.status == "订单已取消"
      ) {
        return false;
      } else {
        return true;
      }
    },
    paidRoomFlag() {
      if (this.userorder.status == "待付款") {
        return true;
      } else {
        return false;
      }
    },
    async changeRoom() {
      this.changeRoomform.id = this.userorder._id; //获取当前要修改的订单id
      const res = await this.$http.get("roomlist", {
        params: { status: "空闲" }
      });
      this.roomList = res.data;
      this.changeroomdialogVisible = true;
    },
    async paid() {
      await this.$http.put(`paid/${this.userorder._id}`, {
        status: "已付款"
      });
      this.$message({ type: "success", message: "付款成功" });
      this.getUserOrder();
    },
    async changeRoomSubmit() {
      await this.$http.put(`changeroom/${this.changeRoomform.id}`, {
        changeData: {
          roomID: this.changeRoomform.roomID,
          paid: (
            this.selectRoom.prices *
            this.userorder.webUserID.LevelDiscount *
            0.1
          ).toFixed(2),
          discountPaid: (
            this.selectRoom.prices -
            this.selectRoom.prices *
              this.userorder.webUserID.LevelDiscount *
              0.1
          ).toFixed(2)
        },
        oldRoomID: this.userorder.roomID._id
      });
      this.changeroomdialogVisible = false;
      this.getUserOrder();
      this.$message({ type: "success", message: "换房成功" });
    },
    changeRoomPaidCancel() {
      this.changeroomdialogVisible1 = false;
      this.changeroomdialogVisible = false;
    },
    changeRoomSelect($event) {
      this.roomList.forEach(item => {
        if (item._id == $event) {
          this.selectRoom = item;
        }
      });
    },
    changeRoomPaid() {
      if (this.userorder.status == "待付款") {
        return (
          this.selectRoom.prices *
          this.userorder.webUserID.LevelDiscount *
          0.1
        ).toFixed(2);
      } else {
        return (
          this.userorder.paid -
          this.selectRoom.prices * this.userorder.webUserID.LevelDiscount * 0.1
        ).toFixed(2);
      }
    },
    changeRoomDiscountPirces() {
      return (
        this.selectRoom.prices *
        this.userorder.webUserID.LevelDiscount *
        0.1
      ).toFixed(2);
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
</style>