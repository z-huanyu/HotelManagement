<template>
  <div>
    <div class="myinformation">我的订单</div>
    <div>
      <el-form :model="userorder" label-width="120px">
        <el-divider>入住人信息</el-divider>
        <el-row v-for="(i,index) in userorder.checkinPeople" :key="index">
          <el-col :span="8">
            <el-form-item :label="'入住人'+index+' '+'姓名'">
              <span>{{userorder.checkinPeople[index].name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证">
              <span>{{userorder.checkinPeople[index].ID}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电话号码">
              <span>{{userorder.checkinPeople[index].phone}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider>房间信息</el-divider>
        <el-row>
          <el-col :span="12">
            <el-form-item label="房间名称">
              <span class="ml-3">{{userorder.roomID ? userorder.roomID.name : '无'}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房间号">
              <span class="ml-3">{{userorder.roomID ? userorder.roomID.number : '无'}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider>订单详细</el-divider>
        <el-row>
          <el-col :span="12">
            <el-form-item label="下单时间">
              <span class="ml-3">{{userorder.order_time}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预计到达">
              <span class="ml-3">{{userorder.arrivetime}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="入住时间">
              <span
                class="ml-3"
              >{{userorder.checkinout_date? userorder.checkinout_date[0] : userorder.checkinout_date}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="退房时间">
              <span
                class="ml-3"
              >{{userorder.checkinout_date? userorder.checkinout_date[1] : userorder.checkinout_date}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="订单状态" prop="status">
              <span class="ml-3">{{userorder.status}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="remarks">
              <span class="ml-3">{{userorder.remarks}}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider>
          <span class="orderTitle">订单应付</span>
        </el-divider>
        <el-row>
          <el-col :span="12">
            <el-form-item label="优惠金额" prop="discountPaid">
              <span class="ml-3">{{userorder.discountPaid}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订单金额" prop="paid">
              <span class="ml-3 text-yellow fs-xxl">￥{{userorder.paid}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider>操作</el-divider>
        <div class="operation">
          <!-- <div class="surplusTimeBox" ref="surplusTimeBoxRef">
            <span>距离入住时间还有</span>
            <span></span>
            <span></span>
            <span></span>
            <div>
              <span class="text-yellow">距离入住时间两小时后不可取消</span>
            </div>
          </div>-->
          <el-button type="danger" @click="checkout" :disabled="cancelFlag()">取消订单</el-button>
          <el-button type="danger" @click="changeRoom" v-if="changeRoomFlag()">换房</el-button>
          <el-button type="danger" @click="paidVisible =true" v-if="paidRoomFlag()">付款</el-button>
          <el-button
            type="danger"
            @click="$router.push(`/comments/${$route.params.id}`)"
            v-if="commentFlag()"
          >评价</el-button>
        </div>
      </el-form>
    </div>
    <!-- 换房弹框 -->
    <el-dialog title="换房操作" :visible.sync="changeroomdialogVisible" width="80%">
      <el-form :model="changeRoomform" label-width="120px">
        <el-form-item label="选择房间">
          <el-select
            v-model="changeRoomform.roomID"
            @change="changeRoomSelect"
            @visible-change="changeFlag"
          >
            <el-option
              v-for="item in roomList"
              :key="item._id"
              :value="item._id"
              :label="item.name"
            >{{item.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-divider>房间信息</el-divider>
        <my-RoomDetail v-if="roomDetailFlag" :roomData="selectRoom._id"></my-RoomDetail>
        <div v-else class="d-flex jc-center ai-cernter">
          <p>暂无数据</p>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeroomdialogVisible = false">取 消</el-button>
        <el-button @click="openchangePaid">提交</el-button>
      </div>
    </el-dialog>
    <!-- 换房价格结算弹框 -->
    <el-dialog title="应收应付" :visible.sync="changePaidVisible" width="30%" center>
      <div class="text-center">
        <p v-if="userorder.status == '待付款' ? false : true">
          当前付款金额：
          <span class="ml-5">￥{{userorder.paid}}</span>
        </p>
        <p v-else>
          当前房价：
          <span class="ml-5">￥{{userorder.paid}}</span>
        </p>
        <p>
          新房间价格：
          <span class="ml-5">￥{{changeRoomDiscountPirces()}}</span>
        </p>
        <el-divider>结算</el-divider>
        <div v-if="userorder.status == '待付款' ? false : true">
          <p v-if="changeRoomFinalPaid > 0" class="fs-xxl">
            退还：
            <span class="ml-5 text-yellow">￥{{changeRoomFinalPaid}}</span>
          </p>
          <p v-else class="fs-xxl">
            补全差价：
            <span class="ml-5 text-yellow">￥{{Math.abs(changeRoomFinalPaid)}}</span>
          </p>
        </div>
        <div v-else>
          <p class="fs-xxl">
            换房手续费：
            <span class="ml-5 text-yellow">￥30</span>
          </p>
          <el-row class="d-flex ai-center">
            <el-col :offset="6" :span="6">
              <span>支付密码：</span>
            </el-col>
            <el-col :span="6">
              <el-input type="password" v-model="changeRoomChargePassword"></el-input>
            </el-col>
          </el-row>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changePaidVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeRoomSubmit()">确 认</el-button>
      </span>
    </el-dialog>
    <!-- 付款弹框 -->
    <el-dialog title="付款" :visible.sync="paidVisible" width="20%" center>
      <div class="text-center">
        <p>
          原价：
          <span
            class="text-yellow"
          >￥{{parseInt(userorder.paid)+parseInt(userorder.discountPaid)}}</span>
        </p>
        <p v-if="userorder.webUserID&&userorder.webUserID.LevelDiscount">
          优惠价({{userorder.webUserID.LevelName+userorder.webUserID.LevelDiscount}}折)：
          <span
            class="text-yellow fs-xxl"
          >￥{{userorder.paid}}</span>
        </p>
      </div>
      <el-form :data="paidForm">
        <el-form-item label="支付密码">
          <el-input type="password" v-model="paidForm.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="paidVisible = false">取 消</el-button>
        <el-button type="primary" @click="paid">确认付款</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import RoomDetail from "./RoomDetail";
export default {
  data() {
    return {
      userorder: {},
      roomList: [], //可选择的空房间列表
      changeroomdialogVisible: false,
      changeRoomform: {}, //提交换房的数据

      changeRoomChargePassword: "", //换房支付密码

      paidForm: {},

      selectRoom: {}, //换房选择的房间信息
      roomDetailFlag: false, //控制换房的信息详细隐藏/显示
      paidVisible: false,
      changePaidVisible: false,
      changeRoomFinalPaid: 0, //补全差价
      cancelOrderDialogVisible: false, //取消订单弹框

      cancelFlags: false //控制取消订单按钮
    };
  },
  methods: {
    async getUserOrder() {
      const res = await this.$http.get(`getorder/${this.$route.params.id}`);
      this.userorder = res.data;
    },
    async checkout() {
      //取消订单
      this.$confirm("确认取消订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(async () => {
          //未支付
          if (this.userorder.status == "待付款") {
            await this.$http.put(`checkout/${this.userorder._id}`, {
              status: "订单已取消"
            });
            this.$message({
              type: "success",
              message: "订单已取消!"
            });
            this.getUserOrder();
          } else {
            //已支付，退款操作
            await this.$http.put(`comebackMoney/${sessionStorage.webUserID}`, {
              backMoney: this.userorder.paid
            });
            await this.$http.put(`checkout/${this.userorder._id}`, {
              status: "订单已取消"
            });
            this.$message({
              type: "success",
              message: "订单已取消!"
            });
            this.getUserOrder();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    cancelFlag() {
      //控制按钮开关
      if (
        this.userorder.status == "订单已取消" ||
        this.userorder.status == "订单完成"
      ) {
        // this.$refs.surplusTimeBoxRef.style.display = "none";
        return true;
      } else {
        return false;
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
        this.userorder.status == "订单已取消" ||
        this.userorder.status == "已付款"
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
      //付款
      //验证支付密码
      this.paidForm.money = this.userorder.paid;
      await this.$http.put(
        `paidMoney/${sessionStorage.webUserID}`,
        this.paidForm
      );
      //修改订单状态
      await this.$http.put(`paid/${this.userorder._id}`, {
        status: "已付款"
      });
      this.$message({ type: "success", message: "付款成功" });
      this.getUserOrder();
      this.paidVisible = false;
    },
    openchangePaid() {
      //换房弹框
      this.changeRoomPaid();
      if (this.changeRoomform.roomID) {
        this.changePaidVisible = true;
      } else {
        this.$message({ type: "warning", message: "请选择需要换取的房间！" });
      }
    },
    async changeRoomSubmit() {
      //换房提交数据
      if (this.changeRoomChargePassword == "") {
          this.$message({ type: "warning", message: "请输入支付密码" });
      } else {
        if (
          this.userorder.webUserID &&
          this.userorder.webUserID.LevelDiscount
        ) {
          //会员，打折
          //支付操作
          await this.$http.put(`paidMoney/${sessionStorage.webUserID}`, {
            password: this.changeRoomChargePassword,
            money: 30
          }); //扣去换房手续费
          // 改变房间状态
          await this.$http.put(`changeroom/${this.changeRoomform.id}`, {
            changeData: {
              roomID: this.changeRoomform.roomID,
              paid: parseInt(
                this.selectRoom.prices *
                  this.userorder.webUserID.LevelDiscount *
                  0.1
              ).toFixed(2),
              discountPaid: parseInt(
                this.selectRoom.prices -
                  this.selectRoom.prices *
                    this.userorder.webUserID.LevelDiscount *
                    0.1
              ).toFixed(2)
            },
            oldRoomID: this.userorder.roomID._id
          });
          this.changeroomdialogVisible = false;
          this.changePaidVisible = false;
          this.getUserOrder();
          this.$message({ type: "success", message: "换房成功" });
        } else {
          //不是会员，不打折
          await this.$http.put(`changeroom/${this.changeRoomform.id}`, {
            changeData: {
              roomID: this.changeRoomform.roomID,
              paid: parseInt(this.selectRoom.prices).toFixed(2),
              discountPaid: 0
            },
            oldRoomID: this.userorder.roomID._id
          });
          this.changeroomdialogVisible = false;
          this.changePaidVisible = false;
          this.getUserOrder();
          this.$message({ type: "success", message: "换房成功" });
        }
      }
    },

    changeRoomSelect($event) {
      //换房选择框钩子
      this.roomList.forEach(item => {
        if (item._id == $event) {
          this.selectRoom = item;
        }
      });
      this.roomDetailFlag = true; //当选择框值改变，渲染房间信息
    },
    changeFlag($event) {
      //当选择框打开关闭房间信息
      if ($event == true) {
        this.roomDetailFlag = false;
      }
    },
    changeRoomPaid() {
      //换房
      if (this.userorder.status == "待付款") {
        if (
          this.userorder.webUserID &&
          this.userorder.webUserID.LevelDiscount
        ) {
          this.changeRoomFinalPaid = -parseInt(
            this.selectRoom.prices *
              this.userorder.webUserID.LevelDiscount *
              0.1
          ).toFixed(2);
        } else {
          this.changeRoomFinalPaid = -parseInt(this.selectRoom.prices).toFixed(
            2
          );
        }
      } else {
        //已付款
        if (
          this.userorder.webUserID &&
          this.userorder.webUserID.LevelDiscount
        ) {
          this.changeRoomFinalPaid = parseInt(
            this.userorder.paid -
              this.selectRoom.prices *
                this.userorder.webUserID.LevelDiscount *
                0.1
          ).toFixed(2);
        } else {
          this.changeRoomFinalPaid = parseInt(
            this.userorder.paid - this.selectRoom.prices
          ).toFixed(2);
        }
      }
    },
    changeRoomDiscountPirces() {
      if (this.userorder.webUserID && this.userorder.webUserID.LevelDiscount) {
        return parseInt(
          this.selectRoom.prices * this.userorder.webUserID.LevelDiscount * 0.1
        ).toFixed(2);
      } else {
        return parseInt(this.selectRoom.prices).toFixed(2);
      }
    }
    // surplusTime() {
    //   //距离入住时间倒计时

    //   // console.log(this.$refs.surplusTimeBoxRef.children[0].innerHTML)
    //   // let stl = null;

    //   let checkinTime = this.userorder.checkinout_date[0];
    //   let s = "";
    //   let m = "";
    //   let h = "";
    //   setInterval(() => {
    //     s = parseInt(
    //       ((Date.parse(new Date(checkinTime)) - Date.parse(new Date())) /
    //         1000) %
    //         60
    //     );
    //     m = parseInt(
    //       ((Date.parse(new Date(checkinTime)) - Date.parse(new Date())) /
    //         1000 /
    //         60) %
    //         60
    //     );
    //     h = parseInt(
    //       ((Date.parse(new Date(checkinTime)) - Date.parse(new Date())) /
    //         1000 /
    //         60 /
    //         60) %
    //         24
    //     );

    //     this.$refs.surplusTimeBoxRef.children[1].innerHTML = h + "：";
    //     this.$refs.surplusTimeBoxRef.children[2].innerHTML = m + "：";
    //     this.$refs.surplusTimeBoxRef.children[3].innerHTML = s;

    //     if (h < 2 && h > 0) {
    //       //距离入住时间小于两小时后禁用取消订单按钮
    //       this.cancelFlags = true;
    //     } else if (h < 0 && m < 0 && s < 0) {
    //       this.cancelFlags = true;
    //       this.$refs.surplusTimeBoxRef.style.display = "none";
    //     }
    //   }, 1000);

    //   // setTimeout(() => {
    //   //   clearInterval(stl);
    //   //   stl = null;
    //   // }, 5000);
    // }
  },

  async created() {
    await this.getUserOrder();
    // this.surplusTime();
  },
  mounted() {},
  components: {
    "my-RoomDetail": RoomDetail
  },
  destoryed() {}
};
</script>

<style scoped>
.myinformation {
  text-align: center;
  line-height: 50px;
  border-bottom: 1px solid #f3f3f3;
}
.operation {
  position: relative;
  display: flex;
  justify-content: center;
}
.surplusTimeBox {
  position: absolute;
  left: 5%;
  width: 250px;
  height: 50px;
  padding: 5px 15px;
  border-radius: 10px;
  color: #f3f3f3;
  background: rgba(0, 0, 0, 0.8);
}
</style>