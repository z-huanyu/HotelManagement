<template>
  <div>
    <my-nav ref="mynav"></my-nav>
    <div class="bg-img">
      <div class="login">
        <form class="loginForm">
          <h1 class="loginH1">用户登录</h1>
          <input class="loginInput" type="text" placeholder="用户名" v-model="form_item.username" />
          <input class="loginInput" type="password" placeholder="密码" v-model="form_item.password" />
          <input
            class="loginBtn"
            type="button"
            value="登录"
            @click="send_loginForm(form_item.username)"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form_item: {}
    };
  },
  methods: {
    async send_loginForm() {
      const res = await this.$http.post("login", this.form_item);
      sessionStorage.token = res.data.token; //存储token
      sessionStorage.username = res.data.userInformation.username;
      sessionStorage.webUserID = res.data.userInformation._id
      this.$message({ type: "success", message: "登录成功" });
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.bg-img {
  width: 100vw;
  height: 100vh;
  background: url(../assets/images/login.png) no-repeat;
}
.login {
  position: relative;
  width: 600px;
  height: 500px;
  /* border: 1px solid blue; */
  margin: 0 auto;
}
.loginH1 {
  display: block;
  padding: 30px 100px;
  margin: 5px auto;
  text-align: center;
}
.loginForm {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 80%;
  height: 400px;
  /* border: 1px solid red; */
  transform: translateX(-50%);
  background-color: #ffffff;
}
.loginInput {
  display: block;
  width: 70%;
  height: 40px;
  margin: 30px auto;
  padding: 0 10px;
  border-radius: 5px;
}
.loginBtn {
  display: block;
  width: 60%;
  height: 40px;
  margin: 50px auto;
  background-color: skyblue;
  border: none;
}
.loginBtn:hover {
  background-color: #2c85df;
}
</style>