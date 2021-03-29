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
          <el-form-item label="房间名称">
            <el-input v-model="room.name"></el-input>
          </el-form-item>
          <el-form-item label="房间号">
            <el-input v-model="room.number"></el-input>
          </el-form-item>
          <el-form-item label="房间类型">
            <el-select v-model="room.typeID" placeholder="请选择房型">
              <el-option
                v-for="item in roomType"
                :key="item._id"
                :label="item.roomType"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="楼层">
            <el-select v-model="room.floorID" placeholder="请选择楼层">
              <el-option
                v-for="item in roomFloor"
                :key="item._id"
                :label="item.roomFloor"
                :value="item._id"
              ></el-option>
            </el-select>
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
          <el-form-item label="照片1">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="img1_afterUpload"
            >
              <img v-if="room.img1" :src="room.img1" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="照片2">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="img2_afterUpload"
            >
              <img v-if="room.img2" :src="room.img2" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="照片3">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="img3_afterUpload"
            >
              <img v-if="room.img3" :src="room.img3" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-row>

        <el-divider>详细信息</el-divider>
        <el-form-item label="上网方式">
          <el-select v-model="room.internet" placeholder="请选择上网方式">
            <el-option label="酒店WiFi" value="酒店WiFi"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="床尺寸">
          <el-select v-model="room.bedsize" placeholder="请选择床尺寸">
            <el-option label="1.2m*1.8m" value="1.2m*1.8m"></el-option>
            <el-option label="1.5m*2m" value="1.5m*2m"></el-option>
            <el-option label="1.8m*2m" value="1.8m*2m"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间大小">
          <el-select v-model="room.roomsize" placeholder="请选择房间大小">
            <el-option label="10-20平方米" value="10-20平方米"></el-option>
            <el-option label="20-30平方米" value="20-30平方米"></el-option>
            <el-option label="30-40平方米" value="30-40平方米"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="早餐">
          <el-select v-model="room.breakfast" placeholder="请选择房间大小">
            <el-option label="有" value="有"></el-option>
            <el-option label="无" value="无"></el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-form-item label="窗户">
            <el-radio-group v-model="room.window">
              <el-radio label="有窗"></el-radio>
              <el-radio label="无窗"></el-radio>
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
        status: "空闲",
        switch: 1
      },
      roomType: [], //房间类型
      roomFloor: [] //楼层
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
    img1_afterUpload(res) {
      //上传图片成功后把图片url地址赋值
      this.room.img1 = res.url;
    },
    img2_afterUpload(res) {
      //上传图片成功后把图片url地址赋值
      this.room.img2 = res.url;
    },
    img3_afterUpload(res) {
      //上传图片成功后把图片url地址赋值
      this.room.img3 = res.url;
    },
    async getroomlist() {
      const res = await this.$http.get(`rest/rooms/${this.id}`);
      this.room = res.data;
    },
    async getRoomType() {
      const res = await this.$http.get("rest/categories");
      this.roomType = res.data;
    },
    async getRoomFloor() {
      const res = await this.$http.get("rest/floors");
      this.roomFloor = res.data;
    }
  },
  created() {
    this.id && this.getroomlist(); //&&前面的条件满足后再执行后面的方法
    this.getRoomType();
    this.getRoomFloor();
  }
};
</script>

<style scoped>
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