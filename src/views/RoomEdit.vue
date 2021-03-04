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
            <el-select v-model="room.type" placeholder="请选择房间类型">
              <el-option label="单人间" value="单人间"></el-option>
              <el-option label="双人间" value="双人间"></el-option>
              <el-option label="三人间" value="三人间"></el-option>
              <el-option label="标准间" value="标准间"></el-option>
              <el-option label="限时特惠房" value="限时特惠房"></el-option>
              <el-option label="会员专享房" value="会员专享房"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房价">
            <el-input v-model="room.prices"></el-input>
          </el-form-item>
          <el-form-item label="早餐">
            <el-select v-model="room.breakfast" placeholder="请选择是否含早餐">
              <el-option label="有" value="有"></el-option>
              <el-option label="无" value="无"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="房间图片">
            <el-col :span="6">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="cover_afterUpload"
              >
                <img v-if="room.cover" :src="room.cover" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
            <el-col :span="6">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="img1_afterUpload"
              >
                <img v-if="room.img1" :src="room.img1" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
            <el-col :span="6">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="img2_afterUpload"
              >
                <img v-if="room.img2" :src="room.img2" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
            <el-col :span="6">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="img3_afterUpload"
              >
                <img v-if="room.img3" :src="room.img3" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
          </el-form-item>
        </el-row>
        <el-divider>详细信息</el-divider>
        <el-form-item label="上网方式">
          <el-input v-model="room.internet"></el-input>
        </el-form-item>
        <el-form-item label="床尺寸">
          <el-input v-model="room.bedsize"></el-input>
        </el-form-item>
        <el-form-item label="房间大小">
          <el-input v-model="room.roomsize"></el-input>
        </el-form-item>
        <el-form-item label="楼层">
          <el-select v-model="room.floor" placeholder="请选择楼层">
            <el-option label="一楼" value="一楼"></el-option>
            <el-option label="二楼" value="二楼"></el-option>
            <el-option label="三楼" value="三楼"></el-option>
            <el-option label="四楼" value="四楼"></el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-form-item label="窗户">
            <el-radio-group v-model="room.window">
              <el-radio label="有窗" value="true"></el-radio>
              <el-radio label="无窗" value="false"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="可入住人数">
            <el-radio-group v-model="room.people">
              <el-radio label="一人"></el-radio>
              <el-radio label="两人"></el-radio>
              <el-radio label="三人"></el-radio>
              <el-radio label="四人"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否开放房间">
            <el-radio-group v-model="room.switch">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
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
        img1: "",
        img2: "",
        img3: "",
        status: "待入住",
        pictureUrl: [] //图片url
      },
      dialogImageUrl: "",
      dialogVisible: false
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
      console.log(res);
    },
    img1_afterUpload(res) {
      //上传图片成功后把图片url地址赋值
      this.room.img1 = res.url;
      console.log(res);
    },
    img2_afterUpload(res) {
      //上传图片成功后把图片url地址赋值
      this.room.img2 = res.url;
      console.log(res);
    },
    img3_afterUpload(res) {
      //上传图片成功后把图片url地址赋值
      this.room.img3 = res.url;
      console.log(res);
    },
    async getroomlist() {
      const res = await this.$http.get(`rest/rooms/${this.id}`);
      this.room = res.data;
      console.log(this.room);
    },
    handleRemove(file) {
      let removeIndex = this.room.pictureUrl.findIndex(
        item => item == file.response.url
      );
      this.room.pictureUrl.splice(removeIndex, 1);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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