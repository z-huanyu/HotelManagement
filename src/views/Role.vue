<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="UsersCard">
      <el-divider>操作</el-divider>
      <el-row>
        <el-col :span="6">
          <el-button @click="dialogFormVisible = true">添加角色</el-button>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="输入你需要搜索的房间名称或房间号"
            v-model="searchInput_val"
            clearable
            @clear="searchInputClear"
            @change="searchInputChange"
            ref="searchInputRef"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="search_btn">搜索</el-button>
        </el-col>
      </el-row>
      <el-divider>管理员列表</el-divider>
      <!-- 表格 -->
      <el-table
        :data="userslist.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        style="width: 100%"
        border
        :header-cell-style="{'text-align':'center'}"
      >
        <el-table-column prop="username" label="用户名" width="180" align="center"></el-table-column>
        <el-table-column label="角色" width="180" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.level == '2'? 'warning':''"
            >{{scope.row.level == '2'? '超级管理员':'前台接待员'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="switch" label="状态" width="180" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.switch"
              active-value="1"
              inactive-value="0"
              @change="userSwitchChange($event,scope.row._id)"
            >></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="editer" label="创建者" width="180" align="center"></el-table-column>
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
    <el-dialog title="新增角色" :visible.sync="dialogFormVisible" width="500px" center>
      <el-form :model="usersform">
        <el-form-item label="用户名">
          <el-input v-model="usersform.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="usersform.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="usersform.level" placeholder="请选择">
            <el-option label="前台接待员" value="0"></el-option>
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
    <!-- 修改弹框 -->
    <el-dialog title="修改角色" :visible.sync="changedialogFormVisible" width="500px" center>
      <el-form :model="changeusersform">
        <el-form-item label="用户名">
          <el-input v-model="changeusersform.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="changeusersform.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="changeusersform.level" placeholder="请选择">
            <el-option label="前台接待员" value="0"></el-option>
            <el-option label="超级管理员" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="changeusersform.switch">
            <el-radio label="1">正常</el-radio>
            <el-radio label="0">冻结</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changedialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeUserSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 弹框end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageSize: 5, //一页多少数据
      currentPage: 1, //当前页数
      userslist: [],
      usersform: {
        editer: sessionStorage.username //创建者
      },
      dialogFormVisible: false,
      searchInput_val: "",
      changeusersform: {},
      changedialogFormVisible: false
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
    },
    async getuserslist() {
      //获取角色列表
      const res = await this.$http.get("rest/users"); // eslint-disable-line no-unused-vars
      this.userslist = res.data;
    },
    async usersdelete(id) {
      //删除角色
      const res = await this.$http.delete(`rest/users/${id}`); // eslint-disable-line no-unused-vars
      this.$message({ type: "success", message: "删除成功" });
      this.getuserslist();
    },
    async AddUsers() {
      //新增角色
      if (//验证表单
        this.usersform.username == undefined ||
        this.usersform.password == undefined ||
        this.usersform.level == undefined ||
        this.usersform.switch == undefined
      ) {
        this.$message({ type: "warning", message: "信息填写不完整" });
     
      } else {
        const res = await this.$http.post("rest/users", this.usersform); // eslint-disable-line no-unused-vars
        this.dialogFormVisible = false;
        this.$message({ type: "success", message: "添加角色成功" });
      }
    },
    searchInputClear() {
      //清空搜索框
      this.getuserslist();
    },
    searchInputChange() {
      //当搜索框值为空，刷新数据
      !this.searchInput_val && this.getuserslist();
    },
    async search_btn() {
      //搜索框模糊查询
      let levelVal = "";
      if (this.searchInput_val.trim() == "前台接待员") {
        levelVal = "0";
      } else if (this.searchInput_val.trim() == "超级管理员") {
        levelVal = "2";
      }
      const res = await this.$http.post("searchuser", {
        $or: [{ username: this.searchInput_val }, { level: levelVal }]
      });
      this.userslist = res.data;
    },
    async userSwitchChange($event, id) {
      await this.$http.put(`rest/users/${id}`, {
        switch: $event
      });
    },
    changeUser(row) {
      this.changeusersform = row;
      this.changedialogFormVisible = true;
    },
    async changeUserSubmit() {
      await this.$http.put(
        `rest/users/${this.changeusersform._id}`,
        this.changeusersform
      ); // eslint-disable-line no-unused-vars
      this.changedialogFormVisible = false;
      this.$message({ type: "success", message: "修改角色成功" }); //后端得返回数据，不然会一直等待后端响应，阻塞弹窗
    }
  },
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
.fenye {
  text-align: center;
}
</style>