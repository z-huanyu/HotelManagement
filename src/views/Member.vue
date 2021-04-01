<template>
  <div>
    <my-nav></my-nav>
    <div class="bgc">
      <div class="CardList">
        <div class="card">
          <p class="fs-xxl">普通会员</p>
          <span>价格：<i class="text-yellow">98￥</i> /月</span>
          <p class="text-yellow">可享特权</p>
          <el-tag class="fs-xl" type="success">
            <i class="fs-xxl text-yellow">9.5</i> 折优惠
          </el-tag>
          <el-button type="danger" class="buyBotton" @click="openForm('普通会员','98','9.5','0')">购买</el-button>
        </div>
        <div class="card">
          <p class="fs-xxl">高级会员</p>
         <span>价格：<i class="text-yellow">198￥</i> /月</span>
          <p class="text-yellow">可享特权</p>
          <el-tag class="fs-xl" type="success">
            <i class="fs-xxl text-yellow">8.8</i> 折优惠
          </el-tag>
          <el-button type="danger" class="buyBotton" @click="openForm('高级会员','198','8.8','1')">购买</el-button>
        </div>
        <div class="card">
          <p class="fs-xxl">贵宾会员</p>
           <span>价格：<i class="text-yellow">298￥</i> /月</span>
          <p class="text-yellow">可享特权</p>
          <el-tag class="fs-xl" type="success">
            <i class="fs-xxl text-yellow">7.5</i> 折优惠
          </el-tag>
          <el-button type="danger" class="buyBotton" @click="openForm('贵宾会员','298','7.5','2')">购买</el-button>
        </div>
        <div class="card">
          <p class="fs-xxl">至尊会员</p>
           <span>价格：<i class="text-yellow">598￥</i> /月</span>
          <p class="text-yellow">可享特权</p>
          <el-tag class="fs-xl" type="success">
            <i class="fs-xxl text-yellow">5</i> 折优惠
          </el-tag>
          <el-button type="danger" class="buyBotton" @click="openForm('至尊会员','598','5','3')">购买</el-button>
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
              <span class="ml-4 text-yellow">预订房间可享 <i class="fs-xl">{{memberForm.LevelDiscount}}</i>折</span>
            </el-form-item>
            <el-form-item label="身份证">
              <el-input v-model="memberForm.userID"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="memberForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="应付金额" label-width="600px">
              <span style="color:#f77500; font-size:20px;">¥{{memberForm.prices}}</span>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="buyMember">提交订单</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      memberForm: {
        username: sessionStorage.username,
        Level: "",
        LevelName: "",
        LevelDiscount: "",
        prices: "",
        userID: "",
        phone: "",
        switch: true//默认开启会员权限
      },
      dialogVisible: false
    };
  },
  methods: {
    openForm(LevelName, prices, LevelDiscount, Level) {
      this.memberForm.LevelName = LevelName;
      this.memberForm.prices = prices;
      this.memberForm.LevelDiscount = LevelDiscount;
      this.memberForm.Level = Level;

      if(sessionStorage.username){
        this.dialogVisible = true
      }else{
        this.$router.push('login')
        this.$message({type:'error',message:'请先登录'})
      }
    },
    async buyMember() {
      let res = null;

      res = await this.$http.post("addmember", this.memberForm);
      console.log(res.data);
      this.$message({ type: "success", message: `恭喜你成为${this.memberForm.LevelName}` });
      this.dialogVisible = false
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
</style>