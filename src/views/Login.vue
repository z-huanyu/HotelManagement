<template>
  <div>
    <el-card header="请先登录">
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
      console.log(res.data)
      sessionStorage.token = res.data
      this.$router.push('/')
      this.$message({type:'success',message:'登录成功'})
    }
  }
};
</script>

<style>
.el-card {
  width: 25rem;
  margin: 5rem auto;
}
body{
  background-color: #e7e7e7;
}
</style>