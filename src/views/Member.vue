<template>
  <div>
    <my-nav></my-nav>
    <header class="bg-img"></header>
    <div class="bgc">
      <div class="CardList">
        <div class="card">
          <p class="fs-xxl">普通会员</p>
          <span>
            价格：
            <i class="text-yellow">98￥</i>/月
          </span>
          <p class="text-yellow">可享特权</p>
          <el-tag class="fs-xl" type="success">
            <i class="fs-xxl text-yellow">9.5</i> 折优惠
          </el-tag>
          <el-button type="danger" class="buyBotton" @click="openForm('普通会员','98',9.5,0)">购买</el-button>
        </div>
        <div class="card">
          <p class="fs-xxl">高级会员</p>
          <span>
            价格：
            <i class="text-yellow">198￥</i> /月
          </span>
          <p class="text-yellow">可享特权</p>
          <el-tag class="fs-xl" type="success">
            <i class="fs-xxl text-yellow">8.8</i> 折优惠
          </el-tag>
          <el-button type="danger" class="buyBotton" @click="openForm('高级会员','198',8.8,1)">购买</el-button>
        </div>
        <div class="card">
          <p class="fs-xxl">贵宾会员</p>
          <span>
            价格：
            <i class="text-yellow">298￥</i> /月
          </span>
          <p class="text-yellow">可享特权</p>
          <el-tag class="fs-xl" type="success">
            <i class="fs-xxl text-yellow">7.5</i> 折优惠
          </el-tag>
          <el-button type="danger" class="buyBotton" @click="openForm('贵宾会员','298',7.5,2)">购买</el-button>
        </div>
        <div class="card">
          <p class="fs-xxl">至尊会员</p>
          <span>
            价格：
            <i class="text-yellow">598￥</i> /月
          </span>
          <p class="text-yellow">可享特权</p>
          <el-tag class="fs-xl" type="success">
            <i class="fs-xxl text-yellow">5</i> 折优惠
          </el-tag>
          <el-button type="danger" class="buyBotton" @click="openForm('至尊会员','598',5,3)">购买</el-button>
        </div>
        <!-- 订单弹框 -->
        <el-dialog title="购买会员" :visible.sync="dialogVisible">
          <el-form :model="memberForm" label-width="120px">
            <el-form-item label="用户名">
              <span class="ml-4">{{memberForm.username}}</span>
            </el-form-item>
            <el-form-item label="会员等级">
              <span class="ml-4">{{memberForm.LevelName}}</span>
            </el-form-item>
            <el-form-item label="特权">
              <span class="ml-4 text-yellow">
                预订房间可享
                <i class="fs-xl">{{memberForm.LevelDiscount}}</i>折
              </span>
            </el-form-item>
            <el-form-item label="身份证">
              <el-input v-model="memberForm.userID"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="memberForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="会员期限">
              <el-select v-model="memberForm.memberDay" placeholder="选择会员期限">
                <el-option label="一个月" value="30"></el-option>
                <el-option label="两个月" value="60"></el-option>
                <el-option label="三个月" value="90"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="应付金额" label-width="600px" v-show="memberForm.memberDay">
              <span
                style="color:#f77500; font-size:20px;"
              >¥{{memberForm.prices*memberForm.memberDay/30}}</span>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="buyMember">购买</el-button>
          </div>
        </el-dialog>
        <!-- 付款弹框 -->
        <el-dialog title="支付页面" :visible.sync="openPaidDialogVisible" width="300px">
          <el-form :model="memberPaidForm" label-width="120px">
            <el-form-item label="支付密码">
              <el-input type="password" v-model="memberPaidForm.password"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="openPaidDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="paidSubmit">付款</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      memberPaidForm: {}, //付款表单
      memberForm: {
        username: sessionStorage.username,
        Level: "",
        LevelName: "",
        LevelDiscount: 0,
        prices: 0,
        userID: "",
        phone: 0,
        switch: true //默认开启会员权限
      },
      dialogVisible: false,
      openPaidDialogVisible: false
    };
  },
  methods: {
    async openForm(LevelName, prices, LevelDiscount, Level) {
      this.memberForm.LevelName = LevelName;
      this.memberForm.prices = prices;
      this.memberForm.LevelDiscount = LevelDiscount;
      this.memberForm.Level = Level;
      if (sessionStorage.webUserID) {
        //获取用户信息
        const res = await this.$http.post(`getuserinformation`, {
          id: sessionStorage.webUserID
        });
        this.memberForm.userID = res.data.userID;
        this.memberForm.phone = res.data.phone;
        this.dialogVisible = true;
      } else {
        this.$router.push("login");
        this.$message({ type: "error", message: "请先登录" });
      }
    },
    async buyMember() {
      if (this.memberForm.memberDay == undefined) {
        this.$message({
          type: "warning",
          message: `请选择会员期限`
        });
      } else {
        this.openPaidDialogVisible = true;
      }
    },
    async paidSubmit() {
      await this.$http.put(`addmember/${sessionStorage.webUserID}`, {
        memberForm: this.memberForm,
        password: this.memberPaidForm.password,
        money: (this.memberForm.prices * this.memberForm.memberDay) / 30
      });
      this.$message({
        type: "success",
        message: `恭喜你成为${this.memberForm.LevelName}`
      });
      this.dialogVisible = false;
      this.openPaidDialogVisible = false;
    }
  },
  created() {
    // console.log(this.$route.params)
  }
};
</script>

<style scoped>
.bgc {
  width: 100%;
  padding: 20px 200px;
  background-color: #f7f7f7;
}
.card {
  position: relative;
  width: 250px;
  height: 280px;
  border-radius: 3px;
  background-color: #ffffff;
  padding: 30px;
  margin-top: 20px;
  box-shadow: -1px 3px 10px #c8c8c8;
  text-align: center;
}
.CardList {
  display: flex;
  justify-content: space-around;
  width: 100%;
  /* border: 1px solid red; */
}
.buyBotton {
  position: absolute;
  left: 50%;
  bottom: 10%;
  transform: translateX(-50%);
  width: 150px;
}
.bg-img {
  width: 100vw;
  height: 700px;
  background: url(../assets/images/member.png) no-repeat;
}
</style>