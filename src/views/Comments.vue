<template>
  <div>
    <my-nav></my-nav>
    <div class="bgc">
      <div class="room_card">
        <div class="commentTitle mb-4">
          <p>用户评价</p>
        </div>
        <el-form :model="comments" label-position="left">
          <el-form-item>
            <el-col :span="6">
              <span>服务态度</span>
              <el-rate v-model="comments.service"></el-rate>
            </el-col>
            <el-col :span="6">
              <span>环境卫生</span>
              <el-rate v-model="comments.environment"></el-rate>
            </el-col>
            <el-col :span="6">
              <span>设施设备</span>
              <el-rate v-model="comments.equipment"></el-rate>
            </el-col>
            <el-col :span="6">
              <span>舒适程度</span>
              <el-rate v-model="comments.comfortable"></el-rate>
            </el-col>
          </el-form-item>
          <el-form-item label-width="100px" label="评论内容">
            <el-col :span="21">
              <el-input type="textarea" v-model="comments.commentText">评价内容</el-input>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :offset="10">
              <el-button @click="formSubmit">发表评论</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comments: {
        commentDate: this.getNowFormatDate(),
        commentUsername: sessionStorage.username,
        commentRoomNumber: '',
        generalComment: '',
      }
    };
  },
  methods: {
    async formSubmit() {
      let totolCount = (this.comments.service+this.comments.environment+this.comments.equipment+this.comments.comfortable)/4
      this.comments.generalComment = parseFloat(totolCount).toFixed(1).toString()
      await this.$http.post('/comment',this.comments)
      this.$message({type:'success',message:'发表评论成功'})
      this.$router.push('/myorder')
    },
    async getCommentRoomNumber() {//根据传值id查询要评论的房间
      const res = await this.$http.get(`/getcommentroom/${this.$route.params.id}`)
      this.comments.commentRoomNumber = res.data.room.number
    }
  },
  created() {
      this.getCommentRoomNumber()
    
  }
};
</script>

<style scoped>
.bgc {
  width: 100%;
  padding: 20px 400px;
  background-color: #f7f7f7;
}
.room_card {
  border-radius: 3px;
  background-color: #ffffff;
  padding: 30px;
  margin-top: 20px;
}
.commentTitle {
  border-bottom: 1px solid #f1f1f1;
  font-size: 20px;
}
</style>