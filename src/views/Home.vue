<template>
  <div>
    <el-container style="height: 100vh;">
      <el-header style="text-align: right; font-size: 12px" height="70px">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            欢迎回来 ，{{username}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="information">个人信息</el-dropdown-item>
            <el-dropdown-item command="offLine">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246);">
          <el-menu router background-color="#545c64" unique-opened>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message"></i>客房管理
              </template>
              <el-menu-item-group>
                <!-- <template slot="title">分组一</template> -->
                <el-menu-item index="/room/addroomtype">新增房型/楼层</el-menu-item>
                <el-menu-item index="/room/roomedit">添加房间</el-menu-item>
                <el-menu-item index="/room/roomlist">房间列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-message"></i>订单管理
              </template>
              <el-menu-item-group>
                <el-menu-item index="/order/userorder">用户订单</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3" v-if="flag()">
              <template slot="title">
                <i class="el-icon-message"></i>系统管理
              </template>
              <el-menu-item-group>
                <el-menu-item index="/user/useredit">管理员</el-menu-item>
                <el-menu-item index="/user/webUser">用户</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4" v-if="flag()">
              <template slot="title">
                <i class="el-icon-message"></i>评论管理
              </template>
              <el-menu-item-group>
                <el-menu-item index="/comment/commentlist">评论列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5" v-if="flag()">
              <template slot="title">
                <i class="el-icon-message"></i>统计
              </template>
              <el-menu-item-group>
                <el-menu-item index="/statistics/statisticstable">统计表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main class="main">
            <router-view :key="$route.path"></router-view>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
    };
  },
  methods: {
    handleCommand(command) {
      if (command == "offLine") {
        sessionStorage.clear();
        this.$router.push("/login");
      } else {
        return;
      }
    },
    flag(){//根据level权限控制页面显示
      if(sessionStorage.level == '2'){
        return true
      }else{
        return false
      }
    }
  },
  created() {
    if (sessionStorage.username) {
      this.username = sessionStorage.username;
    }
  }
};
</script>

<style>
.el-header {
  background-color: rgb(43, 42, 42);
  color: #ffd04b;
  line-height: 70px;
}
.main {
  background-color: #f0f0f0;
}
.el-card {
  margin: 10px 0;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
