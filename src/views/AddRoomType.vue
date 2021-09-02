<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>添加房型/楼层</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="UsersCard">
      <el-row>
        <el-col :span="12">
          <el-col :span="12">
            <el-input v-model="typeForm.roomType" placeholder="输入房间类型"></el-input>
          </el-col>
          <el-col :span="12">
            <el-button @click="AddRoomType">添加房型</el-button>
          </el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="12">
            <el-input v-model="floorForm.roomFloor" placeholder="输入楼层"></el-input>
          </el-col>
          <el-col :span="12">
            <el-button @click="AddRoomFloor">添加楼层</el-button>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-table :data="RoomTypeList">
            <el-table-column type="index" label="#" width="180"></el-table-column>
            <el-table-column prop="roomType" label="房型" width="180"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="changeRoomType(scope.row)">修改</el-button>
                <el-button size="mini" @click="typedelete(scope.row._id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <el-table :data="FloorList">
            <el-table-column type="index" label="#" width="180"></el-table-column>
            <el-table-column prop="roomFloor" label="楼层" width="180"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="changeRoomFloor(scope.row)">修改</el-button>
                <el-button size="mini" @click="floordelete(scope.row._id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <!-- 修改房型弹框 -->
      <el-dialog center width="350px" title="修改房型" :visible.sync="changeRoomTypeDialogFormVisible">
        <el-form :model="changeRoomTypeForm">
          <el-form-item label="房间类型">
            <el-input v-model="changeRoomTypeForm.roomType" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="changeRoomTypeDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="changeRoomTypeSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 弹框end -->
      <!-- 修改楼层弹框 -->
      <el-dialog center width="350px" title="修改楼层" :visible.sync="changeRoomFloorDialogFormVisible">
        <el-form :model="changeRoomFloorForm">
          <el-form-item label="楼层">
            <el-input v-model="changeRoomFloorForm.roomFloor" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="changeRoomFloorDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="changeRoomFloorSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 弹框end -->
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //房型数据
      typeForm: {},
      RoomTypeList: [],
      changeRoomTypeForm: {},
      changeRoomTypeDialogFormVisible: false,
      //楼层数据
      floorForm: {},
      FloorList: [],
      changeRoomFloorForm: {},
      changeRoomFloorDialogFormVisible: false
    };
  },
  methods: {
    //房间类型方法
    async AddRoomType() {
      const res = await this.$http.post("rest/categories", this.typeForm); // eslint-disable-line no-unused-vars
      this.$message({ type: "success", message: "添加房型成功" }); //后端得返回数据，不然会一直等待后端响应，阻塞弹窗
      this.getRoomType();
      this.typeForm = {}
    },
    async getRoomType() {
      const res = await this.$http.get("rest/categories"); // eslint-disable-line no-unused-vars
      this.RoomTypeList = res.data;
    },
    async typedelete(id) {
      const res = await this.$http.delete(`rest/categories/${id}`); // eslint-disable-line no-unused-vars
      this.$message({ type: "success", message: "删除成功" }); //后端得返回数据，不然会一直等待后端响应，阻塞弹窗
      this.getRoomType();
    },

    changeRoomType(row) {
      this.changeRoomTypeForm = row;
      this.changeRoomTypeDialogFormVisible = true;
    },
    async changeRoomTypeSubmit() {
      await this.$http.put(
        `rest/categories/${this.changeRoomTypeForm._id}`,
        this.changeRoomTypeForm
      );
      this.changeRoomTypeDialogFormVisible = false;
    },
    //楼层方法
    async AddRoomFloor() {
      const res = await this.$http.post("rest/floors", this.floorForm); // eslint-disable-line no-unused-vars
      this.$message({ type: "success", message: "添加房型成功" }); //后端得返回数据，不然会一直等待后端响应，阻塞弹窗
      this.getRoomFloor();
      this.floorForm = {}
    },
    async getRoomFloor() {
      const res = await this.$http.get("rest/floors"); // eslint-disable-line no-unused-vars
      this.FloorList = res.data;
    },
    async floordelete(id) {
      const res = await this.$http.delete(`rest/floors/${id}`); // eslint-disable-line no-unused-vars
      this.$message({ type: "success", message: "删除成功" }); //后端得返回数据，不然会一直等待后端响应，阻塞弹窗
      this.getRoomFloor();
    },

    changeRoomFloor(row) {
      this.changeRoomFloorForm = row;
      this.changeRoomFloorDialogFormVisible = true;
    },
    async changeRoomFloorSubmit() {
      await this.$http.put(
        `rest/floors/${this.changeRoomFloorForm._id}`,
        this.changeRoomFloorForm
      );
      this.changeRoomFloorDialogFormVisible = false;
    }
  },

  created() {
    this.getRoomType();
    this.getRoomFloor();
  }
};
</script>

<style scoped>
.UsersCard {
  width: 100%;
  height: 100%;
}
</style>