<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{id ? '编辑' : '新建'}}房间</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="width:100%">
      <el-form label-width="100px" @submit.native.prevent="save" size="small" :inline="true">
        <el-divider>基础信息</el-divider>
        <el-row>
          <el-form-item label="房间号">
            <el-input v-model="room.number"></el-input>
          </el-form-item>
          <el-form-item label="房间类型">
            <el-input v-model="room.type"></el-input>
          </el-form-item>
          <el-form-item label="房价">
            <el-input v-model="room.prices"></el-input>
          </el-form-item>
          <el-form-item label="早餐">
            <el-input v-model="room.breakfast"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="房间封面">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="cover_afterUpload"
            >
              <img v-if="room.cover" :src="room.cover" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-row>
        <el-divider>详细信息</el-divider>
        <el-form-item label="上网方式">
          <el-input v-model="room.details.internet"></el-input>
        </el-form-item>
        <el-form-item label="床尺寸">
          <el-input v-model="room.details.bedsize"></el-input>
        </el-form-item>
        <el-form-item label="房间大小">
          <el-input v-model="room.details.roomsize"></el-input>
        </el-form-item>
        <el-form-item label="楼层">
          <el-input v-model="room.details.floor"></el-input>
        </el-form-item>
        <el-row>
          <el-form-item label="窗户">
            <el-radio-group v-model="room.details.window">
              <el-radio label="有窗" value="true"></el-radio>
              <el-radio label="无窗" value="false"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="可入住人数">
            <el-radio-group v-model="room.details.people">
              <el-radio label="一人" value="1"></el-radio>
              <el-radio label="两人" value="2"></el-radio>
              <el-radio label="三人" value="3"></el-radio>
              <el-radio label="四人" value="4"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row type="flex" justify="center">
          <el-form-item style="margin-top:1rem">
            <el-button size="medium" type="primary" native-type="submit">保存</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      room: {
        cover: "", //解决上传图片不显示
        details: {},
        status:'待入住',
      }
    };
  },
  methods: {
    async save() {
      let res; // eslint-disable-line no-unused-vars
      if (this.id) {
        res = await this.$http.put(`rest/rooms/${this.id}`, this.room);
        this.$message({ type: "success", message: "修改房间成功" });
        this.$router.push("/room/roomlist");
      } else {
        res = await this.$http.post("rest/rooms", this.room);
        this.$message({ type: "success", message: "添加房间成功" }); //后端得返回数据，不然会一直等待后端响应，阻塞弹窗
        this.$router.push("/room/roomlist");
      }
    },
    cover_afterUpload(res) {
      //上传图片成功后把图片url地址赋值
      this.room.cover = res.url;
    },
    async getroomlist() {
      const res = await this.$http.get(`rest/rooms/${this.id}`);
      this.room = res.data;
    }
  },
  created() {
    this.id && this.getroomlist(); //&&前面的条件满足后再执行后面的方法
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  width: 5rem;
  height: 5rem;
  display: block;
}
</style>