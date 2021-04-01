<template>
  <div>
    <div class="myinformation">个人信息</div>
    <div>
      <el-form :model="informationForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <!-- <el-input v-if="flag" v-model="informationForm.username"></el-input> -->
          <span class="ml-3">{{informationForm.username}}</span>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
         <el-col :span="12">
            <el-input type="text" v-model="informationForm.phone"></el-input>
         </el-col>
        </el-form-item>
        <el-form-item label="身份证" prop="userID">
          <el-col :span="12">
            <el-input type="text" v-model="informationForm.userID"></el-input>
         </el-col>
        </el-form-item>
        <el-form-item label="会员等级" prop="LevelName">
          <!-- <el-input type="text" v-model="informationForm.LevelName"></el-input> -->
           <span class="ml-3 text-gray">{{informationForm.LevelName ? informationForm.LevelName : '无'}}</span>
        </el-form-item>
        <el-form-item label="会员特权" prop="LevelDiscount">
          <!-- <el-input type="text" v-model="informationForm.LevelName"></el-input> -->
           <span class="ml-3 text-gray">{{informationForm.LevelDiscount ? `预订房间可享${informationForm.LevelDiscount}折` : '无'}}</span>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="saveInformation">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      informationForm: {},
      // flag: false,
    };
  },
  methods: {
    async getuserinformation() {
      const res = await this.$http.post("getuserinformation", {
        username: sessionStorage.username
      });
      this.informationForm = res.data[0]
    },
    async saveInformation(){
      await this.$http.put('changeuserinformation',this.informationForm)
      this.$message({type:'success',message:'保存个人信息成功'})
      this.getuserinformation()
    }
  },
  created() {
    this.getuserinformation()
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