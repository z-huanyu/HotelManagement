<template>
  <div>
    <el-card class="loginDiv" header="请先登录">
      <el-form label-position="left" label-width="80px" @submit.native.prevent="login">
          <el-form-item label="用户名">
            <el-input clearable v-model="login_form.username" type="text" prefix-icon="el-icon-user-solid"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input clearable v-model="login_form.password" type="password" prefix-icon="iconfont el-icon-s-goods"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit">登录</el-button>
          </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login_form:{},
    };
  },
  methods:{
    async login(){
     
      const res = await this.$http.post('login',this.login_form)
      sessionStorage.token = res.data.token//存储token缓存
      sessionStorage.editer = res.data.userInformation.editer
      sessionStorage.username = res.data.userInformation.username
      sessionStorage.level = res.data.userInformation.level
      // sessionStorage.userInformation =  JSON.stringify(res.data.userInformation)
      // console.log(sessionStorage.userInformation)
      this.$router.push('/')
      this.$message({type:'success',message:'登录成功'})
    }
  }
};
</script>

<style scoped>
.loginDiv {
  width: 25rem;
  margin: 5rem auto;
}
body{
  background-color: #e7e7e7;
}
</style>