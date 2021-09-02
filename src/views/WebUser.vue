<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
<<<<<<< HEAD
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="UsersCard">
      <el-divider>操作</el-divider>
      <el-row>
        <el-col :span="6">
=======
      <el-breadcrumb-item>用户账号管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="UsersCard">
      <el-divider content-position="left">管理员操作</el-divider>
      <el-row class="w-100" :gutter="20">
        <el-col :offset="1" :span="6">
>>>>>>> master
          <el-button @click="dialogFormVisible = true">添加用户</el-button>
        </el-col>
        <el-col :span="6">
          <el-input
<<<<<<< HEAD
            placeholder="输入你需要搜索的房间名称或房间号"
=======
            placeholder="输入用户姓名"
>>>>>>> master
            v-model="searchInput_val"
            clearable
            @clear="searchInputClear"
            @change="searchInputChange"
            ref="searchInputRef"
          ></el-input>
        </el-col>
        <el-col :span="6">
<<<<<<< HEAD
          <el-button type="primary" @click="search_btn">搜索</el-button>
        </el-col>
      </el-row>
      <el-divider>用户列表</el-divider>
      <!-- 表格 -->
      <el-table
        :data="userslist.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        style="width: 100%"
        border
        :header-cell-style="{'text-align':'center'}"
      >
        <el-table-column prop="username" label="用户名" width="180" align="center"></el-table-column>
        <el-table-column prop="userID" label="身份证" width="180" align="center"></el-table-column>
        <el-table-column prop="phone" label="电话" width="180" align="center"></el-table-column>
        <el-table-column label="会员" width="180" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.switch ? '是':'否'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="会员等级" width="180" align="center">
          <template slot-scope="scope">
            <el-tag>{{scope.row.LevelName? scope.row.LevelName : '无'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建者" width="180" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.editer ? scope.row.editer : '线上注册'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="changeUser(scope.row)">修改</el-button>
            <el-button size="mini" @click="usersdelete(scope.row._id)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userslist.length"
        class="fenye"
      ></el-pagination>
    </el-card>
    <!-- 新增弹框 -->
    <el-dialog
      title="新增用户"
      :visible.sync="dialogFormVisible"
      width="500px"
      center
      @close="cleardialog"
    >
=======
          <el-button @click="search_btn">搜索</el-button>
        </el-col>
      </el-row>

      <el-divider content-position="left">用户列表</el-divider>
      <el-table :data="userslist" style="width: 100%">
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="userID" label="身份证" width="180"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="180"></el-table-column>
        <el-table-column label="会员" width="180">
          <template slot-scope="scope">{{scope.row.switch == 1 ? '是' : '否'}}</template>
        </el-table-column>
        <el-table-column label="会员等级" width="180">
          <template slot-scope="scope">
            <el-tag>{{scope.row.LevelName ? scope.row.LevelName : '无'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建者" width="180">
          <template slot-scope="scope">{{scope.row.editer ? scope.row.editer : '线上注册'}}</template>
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
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" @close="dialogClose()">
>>>>>>> master
      <el-form :model="usersform">
        <el-form-item label="用户名">
          <el-input v-model="usersform.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="usersform.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
<<<<<<< HEAD
          <el-input type="userID" v-model="usersform.userID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input type="phone" v-model="usersform.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员">
          <el-radio-group v-model="usersform.switch" @change="mumberFlag">
=======
          <el-input type="text" v-model="usersform.userID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input type="text" v-model="usersform.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员">
          <el-radio-group v-model="usersform.switch">
>>>>>>> master
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="会员等级">
<<<<<<< HEAD
          <el-select
            v-model="usersform.Level"
            placeholder="请选择"
            :disabled="flag"
            @change="mumberLevelChange"
          >
=======
          <el-select v-model="usersform.Level" :disabled="!usersform.switch" placeholder="请选择会员等级">
>>>>>>> master
            <el-option label="普通会员" value="0"></el-option>
            <el-option label="高级会员" value="1"></el-option>
            <el-option label="贵宾会员" value="2"></el-option>
            <el-option label="至尊会员" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
<<<<<<< HEAD
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddUsers">确 定</el-button>
=======
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="AddUsers">确定</el-button>
>>>>>>> master
      </div>
    </el-dialog>
    <!-- 弹框end -->
    <!-- 修改弹框 -->
<<<<<<< HEAD
    <el-dialog title="修改用户" :visible.sync="changedialogFormVisible" width="500px" center>
      <el-form :model="changeusersform">
        <el-form-item label="用户名">
          <el-input v-model="changeusersform.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="changeusersform.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input type="userID" v-model="changeusersform.userID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input type="phone" v-model="changeusersform.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员">
          <el-radio-group v-model="changeusersform.switch" @change="changeMumberSwitch">
=======
    <el-dialog title="修改用户信息" :visible.sync="changeDialogFormVisible">
      <el-form :model="changeUserForm">
        <el-form-item label="用户名">
          <el-input v-model="changeUserForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="changeUserForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="changeUserForm.userID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="changeUserForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员">
          <el-radio-group v-model="changeUserForm.switch"  @change="memberSwitchChange">
>>>>>>> master
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="会员等级">
          <el-select
<<<<<<< HEAD
            v-model="changeusersform.Level"
            placeholder="请选择"
            :disabled="changeusersform.Level!=''? false : true"
            @change="mumberLevelEdit"
=======
            v-model="changeUserForm.Level"
            :disabled="!changeUserForm.switch"
            placeholder="请选择会员等级"
            @change="memberLevelChange"
>>>>>>> master
          >
            <el-option label="普通会员" value="0"></el-option>
            <el-option label="高级会员" value="1"></el-option>
            <el-option label="贵宾会员" value="2"></el-option>
            <el-option label="至尊会员" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
<<<<<<< HEAD
        <el-button @click="changedialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeUserSubmit">确 定</el-button>
=======
        <el-button @click="changeDialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="changeUserSubmit">确定</el-button>
>>>>>>> master
      </div>
    </el-dialog>
    <!-- 弹框end -->
  </div>
</template>

<script>
<<<<<<< HEAD
export default {
  data() {
    return {
      pageSize: 5, //一页多少数据
      currentPage: 1, //当前页数
      userslist: [],
      usersform: {
        editer: sessionStorage.username,
        switch: false //创建者
      },
      dialogFormVisible: false,
      searchInput_val: "",
      changeusersform: {},
      changedialogFormVisible: false,
      flag: true //控制会员选择框disabled
    };
  },
  methods: {
    handleSizeChange(val) {
      //当前没有数据条数
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      //当前页码
      this.currentPage = val;
=======
let editer = sessionStorage.username
// let editer = JSON.parse(sessionStorage.userInformation).username;
export default {
  data() {
    return {
      usersform: {
        editer: editer,
        LevelName: "",
        LevelDiscount: ""
      },
      dialogFormVisible: false,
      userslist: [],
      searchInput_val: "",
      changeUserForm: {}, //修改管理员数据
      changeDialogFormVisible: false
    };
  },
  methods: {
    async AddUsers() {
      switch (this.usersform.Level) {
        case "0":
          (this.usersform.LevelName = "普通会员"),
            (this.usersform.LevelDiscount = "9.5");
          break;
        case "1":
          (this.usersform.LevelName = "高级会员"),
            (this.usersform.LevelDiscount = "8.8");
          break;
        case "2":
          (this.usersform.LevelName = "贵宾会员"),
            (this.usersform.LevelDiscount = "7.5");
          break;
        case "3":
          (this.usersform.LevelName = "至尊会员"),
            (this.usersform.LevelDiscount = "5");
          break;
        default:
          break;
      }
      const res = await this.$http.post("rest/webUsers", this.usersform); // eslint-disable-line no-unused-vars
      this.dialogFormVisible = false;
      this.$message({ type: "success", message: "添加用户成功" });
      this.getuserslist();
    },
    dialogClose() {
      this.usersform = {};
>>>>>>> master
    },
    async getuserslist() {
      const res = await this.$http.get("rest/webUsers"); // eslint-disable-line no-unused-vars
      this.userslist = res.data;
    },
    async usersdelete(id) {
      const res = await this.$http.delete(`rest/webUsers/${id}`); // eslint-disable-line no-unused-vars
<<<<<<< HEAD
      this.$message({ type: "success", message: "删除成功" });
      this.getuserslist();
    },
    async AddUsers() {
      console.log(this.usersform)
      if (
        //验证表单
        this.usersform.username == undefined ||
        this.usersform.password == undefined ||
        this.usersform.phone == undefined||
        this.usersform.userID == undefined
      ) {
        this.$message({ type: "warning", message: "信息填写不完整" });
      } else {
        const res = await this.$http.post("rest/webUsers", this.usersform); // eslint-disable-line no-unused-vars
        this.dialogFormVisible = false;
        this.$message({ type: "success", message: "添加用户成功" });
        this.getuserslist();
      }
    },
    searchInputClear() {
      this.getuserslist();
    },
    searchInputChange() {
      //当搜索框值为空，刷新数据
      !this.searchInput_val && this.getuserslist();
    },
    async search_btn() {
      //搜索框模糊查询
      const res = await this.$http.post("searchwebuser", {
        $or: [
          { username: this.searchInput_val.trim() },
          { LevelName: this.searchInput_val.trim() },
          { userID: this.searchInput_val.trim() },
          { phone: parseInt(this.searchInput_val.trim()) }
=======
      this.$message({ type: "success", message: "删除成功" }); //后端得返回数据，不然会一直等待后端响应，阻塞弹窗
      this.getuserslist();
    },
    async search_btn() {
      //搜索框模糊查询
      const res = await this.$http.post(`searchuser`, {
        $or: [
          { username: this.searchInput_val },
          { phone: this.searchInput_val }
>>>>>>> master
        ]
      });
      this.userslist = res.data;
    },
<<<<<<< HEAD
    async userSwitchChange($event, id) {
      await this.$http.put(`rest/webUsers/${id}`, {
        switch: $event
      });
    },
    changeUser(row) {
      this.changeusersform = row;
      this.changedialogFormVisible = true;
    },
    async changeUserSubmit() {
      await this.$http.put(
        `rest/webUsers/${this.changeusersform._id}`,
        this.changeusersform
      ); // eslint-disable-line no-unused-vars
      this.changedialogFormVisible = false;
      this.$message({ type: "success", message: "修改用户成功" });
    },
    cleardialog() {
      this.usersform = {
        editer: sessionStorage.username //创建者
      };
    },
    mumberFlag($event) {
      this.flag = !$event;
      if (!$event) {
        this.usersform.Level = "";
      }
    },
    mumberLevelChange($event) {
      let resname = "";
      let resdiscount = 0;
      switch ($event) {
        case "0":
          resname = "普通会员";
          resdiscount = 9.5;
          break;
        case "1":
          resname = "高级会员";
          resdiscount = 8.8;
          break;
        case "2":
          resname = "贵宾会员";
          resdiscount = 7.5;
          break;
        case "3":
          resname = "至尊会员";
          resdiscount = 5;
          break;

        default:
          break;
      }
      this.usersform.LevelName = resname;
      this.usersform.LevelDiscount = resdiscount;
    },
    changeMumberSwitch($event) {
      if ($event == false) {
        //关闭会员
        this.changeusersform.Level = "";
        this.changeusersform.LevelName = "";
        this.changeusersform.LevelDiscount = 0;
      } else {
        //开启会员
        this.changeusersform.Level = "0";
        this.changeusersform.LevelName = "普通会员";
        this.changeusersform.LevelDiscount = 9.5;
      }
    },
    mumberLevelEdit($event) {
      let resname = "";
      let resdiscount = "";
      switch ($event) {
        case "0":
          resname = "普通会员";
          resdiscount = 9.5;
          break;
        case "1":
          resname = "高级会员";
          resdiscount = 8.8;
          break;
        case "2":
          resname = "贵宾会员";
          resdiscount = 7.5;
          break;
        case "3":
          resname = "至尊会员";
          resdiscount = 5;
          break;

        default:
          break;
      }

      this.changeusersform.LevelName = resname;
      this.changeusersform.LevelDiscount = resdiscount;
    }
  },
=======
    searchInputClear() {
      this.getuserslist();
    },
    searchInputChange() {
      //当搜索框值为空，刷新数据
      !this.searchInput_val && this.getuserslist();
    },
 
  
    changeUser(row) {
      this.changeUserForm = row;
      this.changeDialogFormVisible = true;
    },
    async changeUserSubmit() {
      await this.$http.put(
        `rest/webUsers/${this.changeUserForm._id}`,
        this.changeUserForm
      );
      this.changeDialogFormVisible = false;
    },
    memberSwitchChange($event){
      if($event == false){
        this.changeUserForm.Level = ''
        this.changeUserForm.LevelDiscount = ''
        this.changeUserForm.LevelName = ''
      }
    },
    memberLevelChange($event){
      let index = $event

      switch (index) {
        case '0':
          (this.changeUserForm.LevelName = "普通会员"),
            (this.changeUserForm.LevelDiscount = "9.5");
          break;
        case '1':
          (this.changeUserForm.LevelName = "高级会员"),
            (this.changeUserForm.LevelDiscount = "8.8");
          break;
        case '2':
          (this.changeUserForm.LevelName = "贵宾会员"),
            (this.changeUserForm.LevelDiscount = "7.5");
          break;
        case '3':
          (this.changeUserForm.LevelName = "至尊会员"),
            (this.changeUserForm.LevelDiscount = "5");
          break;
        default:
          break;
      }
    }
  },

>>>>>>> master
  created() {
    this.getuserslist();
  }
};
</script>

<style scoped>
.UsersCard {
  width: 100%;
  height: 100%;
}
<<<<<<< HEAD
.fenye {
  text-align: center;
}
=======
>>>>>>> master
</style>