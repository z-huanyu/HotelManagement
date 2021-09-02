<template>
  <div>
    <my-nav></my-nav>
    <div class="bg-img">
      <div class="login">
        <form class="loginForm">
          <h1 class="loginH1">用户注册</h1>
          <input class="loginInput" type="text" placeholder="用户名" v-model="form_item.username" />
          <input class="loginInput" type="password" placeholder="密码" v-model="form_item.password" />
          <input class="loginInput" type="text" placeholder="身份证" v-model="form_item.userID" />
          <input class="loginInput" type="text" placeholder="手机号" v-model="form_item.phone" />
          <input class="loginBtn" type="button" value="注册" @click="send_loginForm" />
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
      if (
        this.form_item.username == undefined ||
        this.form_item.password == undefined ||
        this.form_item.userID == undefined ||
        this.form_item.phone == undefined
      ) {
        this.$message({ type: "warning", message: "请填写完整的注册信息" });
      } else if (this.form_item.userID.length != 18) {
        this.$message({ type: "warning", message: "身份证格式错误" });
      } else if (this.form_item.phone.length != 11) {
        this.$message({ type: "warning", message: "手机号码格式错误" });
      } else {
        const res = await this.$http.post("register", this.form_item); // eslint-disable-line no-unused-vars
        this.$message({ type: "success", message: "注册成功" });
        this.$router.push("/login");
      }
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
  top: 20%;
  bottom: 0;
  left: 50%;
  width: 80%;
  height: 500px;
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