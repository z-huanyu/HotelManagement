<template>
  <div>
    <div class="myinformation">个人信息</div>
    <div>
      <el-form :model="informationForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <span class="ml-3">{{informationForm.username}}</span>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-col :span="12">
            <el-input type="text" v-model="informationForm.phone" :disabled="editFlag"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="身份证" prop="userID">
          <el-col :span="12">
            <el-input type="text" v-model="informationForm.userID" :disabled="editFlag"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="会员等级" prop="LevelName">
          <span
            class="ml-3 text-gray"
          >{{informationForm.LevelName ? informationForm.LevelName : '无'}}</span>
        </el-form-item>
        <el-form-item label="会员特权" prop="LevelDiscount">
          <span
            class="ml-3 text-gray"
          >{{informationForm.LevelDiscount ? `预订房间可享${informationForm.LevelDiscount}折` : '无'}}</span>
        </el-form-item>
        <el-form-item label="会员有效期" prop="LevelDiscount">
          <span
            class="ml-3 text-gray"
          >{{informationForm.LevelDiscount ? `${informationForm.memberDay}天` : '无'}}</span>
        </el-form-item>
        <el-row>
          <el-col :span="6">
            <el-form-item label="钱包余额" prop="money">
              <span class="ml-3 text-yellow fs-xxl">
                <span class="fs-xs">￥</span>
                {{informationForm.money}}
              </span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="text" @click="addMoneydialogVisible = true">充值</el-button>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="danger" @click="saveInformation" v-show="!editFlag">保存</el-button>
          <el-button type="danger" @click="editFlag = false" :disabled="!editFlag">修改基础信息</el-button>
          <el-button type="danger" @click="openChangePassword">修改密码</el-button>
        </el-form-item>
      </el-form>
      <!-- 修改密码弹框 -->
      <el-dialog title="修改密码" :visible.sync="dialogVisible" center width="500px">
        <el-form
          :model="changePasswordForm"
          label-width="120px"
          status-icon
          :rules="rules"
          ref="changePassRef"
        >
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input v-model="changePasswordForm.oldPassword" show-password clearable></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="changePasswordForm.newPassword" show-password clearable></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="againNewPassword">
            <el-input v-model="changePasswordForm.againNewPassword" show-password clearable></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm()">重置</el-button>
          <el-button type="primary" @click="changeSubmit()">确认</el-button>
        </div>
      </el-dialog>
      <!-- 充值弹框 -->
      <el-dialog title="钱包充值" :visible.sync="addMoneydialogVisible" center width="500px">
        <el-form :model="addMoneyForm" label-width="120px">
          <el-form-item label="充值金额" prop="money">
            <el-input v-model="addMoneyForm.money" clearable></el-input>
          </el-form-item>
          <el-form-item label="支付密码" prop="password">
            <el-input type="password" v-model="addMoneyForm.password" clearable></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addMoneydialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addMoneySubmit()">确认</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let validateCheckPass = (rule, value, callback) => {
      //验证两次密码是否一致
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.changePasswordForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    let validateCheckOldPass = async (rule, value, callback) => {
      //验证旧密码
      const res = await this.$http.post("getoldpassword", {
        password: value,
        userID: sessionStorage.webUserID
      });
      // console.log(res.data)
      if (!res.data) {
        callback(new Error("旧密码错误!"));
      } else {
        callback();
      }
    };
    return {
      addMoneyForm: {}, //充值表单
      addMoneydialogVisible: false,

      rules: {
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
          { validator: validateCheckOldPass, trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        againNewPassword: [{ validator: validateCheckPass, trigger: "blur" }]
      },

      informationForm: {},
      editFlag: true, //控制修改基础信息阀
      changePasswordForm: {
        oldPassword: "",
        newPassword: "",
        againNewPassword: ""
      },
      dialogVisible: false
    };
  },
  methods: {
    async addMoneySubmit() {
      //充值订单提交
      if (
        this.addMoneyForm.money == undefined ||
        this.addMoneyForm.password == undefined
      ) {
        this.$message({ type: "warning", message: "请输入充值金额和密码" });
      } else {
        await this.$http.put(
          `addMoney/${sessionStorage.webUserID}`,
          this.addMoneyForm
        );
        this.$message({ type: "success", message: "充值成功" });
        this.addMoneydialogVisible = false;
        this.getuserinformation();
      }
    },
    async getuserinformation() {
      //获取用户数据
      const res = await this.$http.post("getuserinformation", {
        id: sessionStorage.webUserID
      });

      this.informationForm = res.data;
    },
    async saveInformation() {
      if (
        this.informationForm.userID == undefined ||
        this.informationForm.phone == undefined
      ) {
        this.$message({
          type: "warning",
          message: "请填写修改的手机号和身份证"
        });
      } else if (this.informationForm.userID.length != 18) {
        this.$message({ type: "warning", message: "身份证格式错误" });
      } else if (this.informationForm.phone.length != 11) {
        this.$message({ type: "warning", message: "手机号码格式错误" });
      } else {
        await this.$http.put("changeuserinformation", this.informationForm);
        this.$message({ type: "success", message: "保存个人信息成功" });
        this.getuserinformation();
        this.editFlag = true;
      }
    },
    openChangePassword() {
      this.dialogVisible = true;
    },
    async changeSubmit() {
      //提交修改密码表单
      this.$refs.changePassRef.validate(async valid => {
        if (valid) {
          await this.$http.put(`changepassword/${sessionStorage.webUserID}`, {
            password: this.changePasswordForm.againNewPassword
          });
          this.$message({ type: "success", message: "修改密码成功" });
          this.dialogVisible = false;
        } else {
          this.$message({ type: "error", message: "信息填写错误" });

          return false;
        }
      });
    },
    resetForm() {
      //重置修改密码表单
      this.$refs.changePassRef.resetFields();
    }
  },
  created() {
    this.getuserinformation();
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