<template>
  <div>
    <el-container style="height: 100vh;">
<<<<<<< HEAD
      <el-header  height="70px">
         <h1 class="hotelTitle">酒店管理后台</h1>
        <el-dropdown @command="handelCommand">
          <span class="el-dropdown-link">
            欢迎回来，{{username}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item command="information">个人信息</el-dropdown-item> -->
=======
      <el-header style="text-align: right; font-size: 12px" height="70px">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            欢迎回来 ，{{username}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="information">个人信息</el-dropdown-item>
>>>>>>> master
            <el-dropdown-item command="offLine">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
<<<<<<< HEAD
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu
            router
            background-color="#545c64"
            unique-opened
            text-color="#fff"
            active-text-color="#409eff"
          >
=======
        <el-aside width="200px" style="background-color: rgb(238, 241, 246);">
          <el-menu router background-color="#545c64" unique-opened>
>>>>>>> master
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message"></i>客房管理
              </template>
<<<<<<< HEAD
              <el-menu-item index="/room/addroomtypefloor">添加房型/楼层</el-menu-item>
              <el-menu-item index="/room/roomedit">添加客房</el-menu-item>
              <el-menu-item index="/room/roomlist">客房列表</el-menu-item>
=======
              <el-menu-item-group>
                <!-- <template slot="title">分组一</template> -->
                <el-menu-item index="/room/addroomtype">新增房型/楼层</el-menu-item>
                <el-menu-item index="/room/roomedit">添加房间</el-menu-item>
                <el-menu-item index="/room/roomlist">房间列表</el-menu-item>
              </el-menu-item-group>
>>>>>>> master
            </el-submenu>
            <el-submenu index="2"  >
              <template slot="title">
                <i class="el-icon-message"></i>订单管理
              </template>
<<<<<<< HEAD
              <el-menu-item index="/order/userorder">用户订单</el-menu-item>
            </el-submenu>
            <el-submenu index="3" v-if="level=='2'">
              <template slot="title">
                <i class="el-icon-message"></i>系统管理
              </template>
              <el-menu-item index="/user/webuser">用户管理</el-menu-item>
              <el-menu-item index="/user/role">角色管理</el-menu-item>
            </el-submenu>
            <el-submenu index="4" v-if="level=='2'">
              <template slot="title">
                <i class="el-icon-message"></i>评价管理
              </template>
              <el-menu-item index="/comment/commentlist">评价列表</el-menu-item>
            </el-submenu>
            <el-submenu index="5" v-if="level=='2'">
              <template slot="title">
                <i class="el-icon-message"></i>统计
              </template>
              <el-menu-item index="/statistics">统计图表</el-menu-item>
=======
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
>>>>>>> master
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
<<<<<<< HEAD
          <el-main>
            <router-view :key="$route.path">
            </router-view>
            <!-- 首页区域 -->
=======
          <el-main class="main">
            <router-view :key="$route.path"></router-view>
>>>>>>> master
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
<<<<<<< HEAD
      username: sessionStorage.username,
      level: sessionStorage.level,
     
    };
  },
  methods: {
    handelCommand(command) {
      if (command == "offLine") {
        sessionStorage.clear();
        this.$router.push("/login");
      }
    }
  },
=======
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
>>>>>>> master
};
</script>

<style>
.el-header {
<<<<<<< HEAD
  position: relative;
  background-color: #545c64;
=======
  background-color: rgb(43, 42, 42);
>>>>>>> master
  color: #ffd04b;
  line-height: 70px;
  text-align: right; 
  font-size: 12px;
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
.el-card {
  margin: 10px 0;
}
.el-dropdown-link {
  color: #409eff;
  cursor: pointer;
}
.hotelTitle{
  height: 70px;
  position: absolute;
  left: 0;
  margin: 0 50px;
}
</style>
