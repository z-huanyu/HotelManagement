<template>
  <div class="d-flex nav">
    <div class="nav_left text-center">
      <span class="hotel">&#xe60e;雅馨酒店</span>
    </div>
    <div class="nav_middle d-flex jc-around ai-center">
      <router-link class="nav_a fs-xl" to="/">首页</router-link>
      <router-link class="nav_a fs-xl" to="/room">预订房间</router-link>
      <router-link class="nav_a fs-xl" to="/member">成为会员</router-link>
      <router-link class="nav_a fs-xl" to="/room">活动中心</router-link>
      <router-link class="nav_a fs-xl" to="/room">合作伙伴</router-link>
      <router-link class="nav_a fs-xl" to="/room">更多</router-link>
    </div>
    <div class="nav_right d-flex ai-center" ref="login_registerRef">
      <router-link class="login_register" to="/login">登录</router-link>
      <router-link class="login_register" to="/register">注册</router-link>
    </div>
    <div class="user d-flex ai-center jc-center" ref="userRef">
      <span class="user_span">HI，{{username}}</span>
      <div class="user_information">
        <div class="information" @click="$router.push({name:'myinformation',params:{data:'myinformationRef'}}); setData('myinformationRef')">个人信息</div>
        <div class="information" @click="$router.push({name:'myorder',params:{data:'myorderRef'}}); setData('myorderRef')">我的订单</div>
        <div class="information" @click="offLine">退出</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: ""
    };
  },
  methods: {
    loginChange() {
      this.$refs.login_registerRef.style.display = "none"; //隐藏登录/注册
      this.$refs.userRef.style.display = "flex"; //显示个人信息
    },
    offLine() {
      sessionStorage.clear()
      this.$router.push('/')
      // this.$router.go(0)//刷新当前页面
    },
    setData(data){
      this.$emit('getData', data)
    }
  },
  created() {
    this.username = sessionStorage.username;
  },
  mounted() {
    sessionStorage.token && this.loginChange();
  }
};
</script>

<style scoped>
.nav {
  width: 100%;
  height: 100px;
  border-bottom: 2px solid #66b1ff;
}
.nav_left {
  width: 20%;
  line-height: 100px;
}
.nav_middle {
  width: 60%;
  height: 100%;
}
.nav_right {
  width: 20%;
  height: 100%;
  /* display: none; */
}
.nav_a {
  height: 50px;
  line-height: 50px;
}
.nav_a:hover {
  border-bottom: 2px solid #66b1ff;
}
.login_register {
  width: 80px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.login_register:hover {
  border: 1px solid #66b1ff;
}
.user {
  display: none;
  position: relative;
  width: 150px;
}
.user_span {
  cursor: pointer;
  color: #2c85df;
}
.user:hover .user_information {
  display: block;
}
.user_information {
  display: none;
  position: absolute;
  top: 70%;
  z-index: 99;
  width: 150px;
  height: 105px;
  background-color: #ffffff;
  box-shadow: -1px 3px 8px #c8c8c8;
}
.information {
  width: 100%;
  height: 35px;
  text-align: center;
  line-height: 35px;
  color: #999999;
  cursor: pointer;
  border: 1px solid #f9f9f9;
}
.information:hover {
  background-color: #f9f9f9;
  color: #2c85df;
}
</style>