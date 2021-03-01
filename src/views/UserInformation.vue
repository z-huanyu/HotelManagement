<template>
  <div>
    <my-nav ref="mynav" @getData="getData"></my-nav>
    <div class="bgc">
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="userinformationcard">
            <div class="informationtitle">个人中心</div>
            <div
              class="informationlist"
              ref="myinformationRef"
              @click="$router.push('/myinformation'); changeColor($refs.myinformationRef)"
            >个人信息</div>
            <div
              class="informationlist"
              ref="myorderRef"
              @click="$router.push('/myorder'); changeColor($refs.myorderRef)"
            >我的订单</div>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="userinformationcard">
            <router-view></router-view>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    changeColor(ref) {
      this.$refs.myinformationRef.style.color = "black";
      this.$refs.myorderRef.style.color = "black";
      ref.style.color = "#66b1ff";
    },
    getData(data) {
      //接收子组件nav传值
      this.changeTextColor(data);
    },
    changeTextColor(data) {
      //改变字体颜色
      this.$refs.myinformationRef.style.color = "black";
      this.$refs.myorderRef.style.color = "black";
      if (data == "myinformationRef") {
        this.$refs.myinformationRef.style.color = "#66b1ff";
      } else {
        this.$refs.myorderRef.style.color = "#66b1ff";
      }
    }
  },
  mounted() {
    let data = this.$route.params.data;
    this.changeTextColor(data);
  }
};
</script>

<style scoped>
.bgc {
  width: 100%;
  padding: 20px 200px;
  background-color: #f7f7f7;
}
.userinformationcard {
  border-radius: 3px;
  background-color: #ffffff;
  padding: 30px;
  margin-top: 20px;
}
.useriformation {
  font-size: 20px;
}
.userinformation_ul {
  line-height: 30px;
}
.informationlist {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
}
.informationlist:hover {
  background-color: #66b1ff;
  color: #ffffff !important;
}
.informationtitle {
  text-align: center;
  line-height: 50px;
  border-bottom: 1px solid #f3f3f3;
}
</style>