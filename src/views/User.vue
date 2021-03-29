<template>
  <div>
      <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="UsersCard">
      <el-button @click="dialogFormVisible = true">添加用户</el-button>
    </el-card>
    <!-- 弹框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
  <el-form :model="usersform">
    <el-form-item label="用户名">
      <el-input v-model="usersform.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="usersform.password" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="AddUsers">确 定</el-button>
  </div>
</el-dialog>
<!-- 弹框end -->
  </div>
</template>

<script>
export default {
    data(){
        return{
            usersform:{},
            dialogFormVisible: false,
        }
    },
    methods:{
        async AddUsers(){
            const res = await this.$http.post('rest/users',this.usersform) // eslint-disable-line no-unused-vars
            this.dialogFormVisible = false
            this.$message({type:'success', message:'添加用户成功'})//后端得返回数据，不然会一直等待后端响应，阻塞弹窗
            this.$router.push('/user/userlist')
        }
    }
}
</script>

<style scoped>
.UsersCard {
  width: 100%;
  height: 100%;
}
</style>