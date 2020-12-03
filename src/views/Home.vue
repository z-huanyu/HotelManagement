<template>
  <div>
    <el-container style="height: 100vh;">
      <el-header style="text-align: right; font-size: 12px" height="70px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>张三</span>
      </el-header>
      <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu router background-color="#545c64" unique-opened>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message"></i>客房管理
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="/room/roomedit">添加客房</el-menu-item>
                <el-menu-item index="/room/roomlist">客房列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-message"></i>订单管理
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="/order/userorder">用户订单</el-menu-item>
                
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-message"></i>系统管理
              </template>
              <el-menu-item-group>
                <template slot="title">系统管理员</template>
                <el-menu-item index="/user/useredit">管理员</el-menu-item>
                <el-menu-item index="/user/userlist">管理员列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view :key="$route.path"></router-view>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {};
</script>

<style>
.el-header {
  background-color: #545c64;
  color: #ffd04b;
  line-height: 70px;
}

.el-aside {
  color: #ffd04b;
}
</style>
