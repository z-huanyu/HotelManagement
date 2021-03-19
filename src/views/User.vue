<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="UsersCard">
      <el-divider content-position="left">管理员操作</el-divider>
      <el-row class="w-100" :gutter="20">
        <el-col :offset="1" :span="6">
          <el-button @click="dialogFormVisible = true">添加管理员</el-button>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="输入管理员姓名"
            v-model="searchInput_val"
            clearable
            @clear="searchInputClear"
            @change="searchInputChange"
            ref="searchInputRef"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <el-button @click="search_btn">搜索</el-button>
        </el-col>
      </el-row>

      <el-divider content-position="left">管理员列表</el-divider>
      <el-table :data="userslist" style="width: 100%">
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column label="身份" width="180">
          <template slot-scope="scope">
            <el-tag>{{getUserLevel(scope.row.level)}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="180">
          <template slot-scope="scope">
            <!-- <el-tag
              :type="scope.row.switch == 1 ? 'success' : 'info'"
            >{{scope.row.switch == 1 ? '正常' : '冻结'}}</el-tag>-->
            <el-switch
              v-model="scope.row.switch"
              active-value="1"
              inactive-value="0"
              active-color="#13ce66"
              inactive-color="#f4f4f5"
              @change="switchChange($event,scope.row._id)"
            ></el-switch>
          </template>
        </el-table-column>
         <el-table-column label="编辑者" width="180">
          <template slot-scope="scope">{{scope.row.editer ? scope.row.editer : '无'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="changeUser(scope.row)">修改</el-button>
            <el-button size="mini" @click="usersdelete(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 弹框 -->
    <el-dialog title="添加管理员" :visible.sync="dialogFormVisible">
      <el-form :model="usersform">
        <el-form-item label="用户名">
          <el-input v-model="usersform.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="usersform.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份">
          <el-select v-model="usersform.level" placeholder="请选择身份">
            <el-option label="前台管理员" value="0"></el-option>
            <el-option label="经理" value="1"></el-option>
            <el-option label="超级管理员" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="usersform.switch">
            <el-radio label="1">正常</el-radio>
            <el-radio label="0">冻结</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddUsers">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 弹框end -->
    <!-- 弹框 -->
    <el-dialog title="修改管理员信息" :visible.sync="changeDialogFormVisible">
      <el-form :model="changeUserForm">
        <el-form-item label="用户名">
          <el-input v-model="changeUserForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="changeUserForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份">
          <el-select v-model="changeUserForm.level" placeholder="请选择身份">
            <el-option label="前台管理员" value="0"></el-option>
            <el-option label="经理" value="1"></el-option>
            <el-option label="超级管理员" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="changeUserForm.switch">
            <el-radio label="1">正常</el-radio>
            <el-radio label="0">冻结</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeUserSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 弹框end -->
  </div>
</template>

<script>
let editer = JSON.parse(sessionStorage.userInformation).username;
export default {
  data() {
    return {
      usersform: {
        editer: '',//编辑者
      },
      dialogFormVisible: false,
      userslist: [],
      searchInput_val: "",
      changeUserForm: {
        editer: '',//编辑者
      }, //修改管理员数据
      changeDialogFormVisible: false
    };
  },
  methods: {
    async AddUsers() {
      console.log(this.usersform)
      const res = await this.$http.post("rest/users", this.usersform); // eslint-disable-line no-unused-vars
      this.dialogFormVisible = false;
      this.$message({ type: "success", message: "添加用户成功" }); //后端得返回数据，不然会一直等待后端响应，阻塞弹窗
      this.getuserslist();
    },
    async getuserslist() {
      const res = await this.$http.get("rest/users"); // eslint-disable-line no-unused-vars
      this.userslist = res.data;
    },
    async usersdelete(id) {
      const res = await this.$http.delete(`rest/users/${id}`); // eslint-disable-line no-unused-vars
      this.$message({ type: "success", message: "删除成功" }); //后端得返回数据，不然会一直等待后端响应，阻塞弹窗
      this.getuserslist();
    },
    async search_btn() {
      //搜索框模糊查询
      const res = await this.$http.post(`searchuser`, {
        $or: [
          { username: this.searchInput_val },
          { switch: this.searchInput_val }
        ]
      });
      this.userslist = res.data;
    },
    searchInputClear() {
      this.getuserslist();
    },
    searchInputChange() {
      //当搜索框值为空，刷新数据
      !this.searchInput_val && this.getuserslist();
    },
    getUserLevel(val) {
      let endResult = null;
      switch (val) {
        case "0":
          endResult = "前台服务员";
          break;
        case "1":
          endResult = "经理";
          break;
        case "2":
          endResult = "超级管理员";
          break;
        default:
          endResult = "无";
          break;
      }
      return endResult;
    },
    async switchChange($event, id) {
      await this.$http.put(`rest/users/${id}`, { switch: $event ,'editer': editer});
      this.getuserslist()
    },
    changeUser(row) {
      this.changeUserForm = row;
      this.changeUserForm.editer = editer;
      this.changeDialogFormVisible = true;
    },
    async changeUserSubmit() {
      await this.$http.put(
        `rest/users/${this.changeUserForm._id}`,
        this.changeUserForm
      );
      this.changeDialogFormVisible = false;
    },
    getUserInformation() {
      this.usersform.editer = editer;
    }
  },

  created() {
    this.getuserslist();
    this.getUserInformation()
  }
};
</script>

<style scoped>
.UsersCard {
  width: 100%;
  height: 100%;
}
</style>