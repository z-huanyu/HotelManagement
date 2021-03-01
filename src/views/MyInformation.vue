<template>
  <div>
    <div class="myinformation">个人信息</div>
    <div>
      <el-table></el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  created(){
    // console.log(this.$route.params)
  }
};
</script>

<style scoped>
.myinformation{
  text-align: center;
  line-height: 50px;
  border-bottom: 1px solid #f3f3f3;
}
</style>