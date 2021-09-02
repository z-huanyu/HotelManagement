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
            <el-input v-model="roomType" placeholder="输入要添加的房型" clearable></el-input>
          </el-col>
          <el-col :span="12">
            <el-button @click="addType" type="primary">添加房型</el-button>
          </el-col>
          <!-- 表格 -->
          <el-table
            :data="typeList"
            style="width: 100%"
            border
            :header-cell-style="{'text-align':'center'}"
          >
            <el-table-column type="index" label="#" width="200" align="center"></el-table-column>
            <el-table-column prop="roomType" label="房型" width="200" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="changeTypeOpenDialog(scope.row)">修改</el-button>
                <el-button size="mini" @click="typeDelete(scope.row._id)" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <el-col :span="12">
            <el-input v-model="roomFloor" placeholder="输入要添加的楼层" clearable></el-input>
          </el-col>
          <el-col :span="12">
            <el-button @click="addFloor" type="primary">添加楼层</el-button>
          </el-col>
          <!-- 表格 -->
          <el-table
            :data="floorList"
            style="width: 100%"
            border
            :header-cell-style="{'text-align':'center'}"
          >
            <el-table-column type="index" label="#" width="200" align="center"></el-table-column>
            <el-table-column prop="roomFloor" label="楼层" width="200" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="changeFloorOpenDialog(scope.row)">修改</el-button>
                <el-button size="mini" @click="floorDelete(scope.row._id)" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>
    <!-- 修改房型弹框 -->
    <el-dialog title="修改房型" :visible.sync="changedialogFormVisible" width="300px" center>
      <el-form :model="changeTypeForm">
        <el-form-item label="房型">
          <el-input v-model="changeTypeForm.roomType" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changedialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeTypeSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 弹框end -->
    <!-- 修改楼层弹框 -->
    <el-dialog title="修改楼层" :visible.sync="changeFloorDialogFormVisible" width="300px" center>
      <el-form :model="changeFloorForm">
        <el-form-item label="楼层">
          <el-input v-model="changeFloorForm.roomFloor" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeFloorDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeFloorSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 弹框end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      typeList: [],
      floorList: [],
      roomType: "",
      roomFloor: "",
      changedialogFormVisible: false,
      changeFloorDialogFormVisible: false,
      changeTypeForm: {},
      changeFloorForm: {}
    };
  },
  methods: {
    //房型方法
    async getTypeList() {
      const res = await this.$http.get("rest/Categories"); // eslint-disable-line no-unused-vars
      this.typeList = res.data;
    },
    async typeDelete(id) {
      const res = await this.$http.delete(`rest/Categories/${id}`); // eslint-disable-line no-unused-vars
      this.$message({ type: "success", message: "删除成功" }); //后端得返回数据，不然会一直等待后端响应，阻塞弹窗
      this.getTypeList();
    },
    async addType() {
      if (this.roomType == "") {
        this.$message({ type: "warning", message: "请输入房型" });
      } else {
        await this.$http.post(`rest/Categories`, {
          roomType: this.roomType
        });
        this.roomType = "";
        this.$message({ type: "success", message: "新增房型成功" });
        this.getTypeList();
      }
    },
    changeTypeOpenDialog(row) {
      this.changeTypeForm = row;
      this.changedialogFormVisible = true;
    },
    async changeTypeSubmit() {
      await this.$http.put(
        `rest/Categories/${this.changeTypeForm._id}`,
        this.changeTypeForm
      );
      this.changedialogFormVisible = false;
    },
    //楼层方法
    async getFloorList() {
      const res = await this.$http.get("rest/floors"); // eslint-disable-line no-unused-vars
      this.floorList = res.data;
    },
    async floorDelete(id) {
      const res = await this.$http.delete(`rest/floors/${id}`); // eslint-disable-line no-unused-vars
      this.$message({ type: "success", message: "删除成功" }); //后端得返回数据，不然会一直等待后端响应，阻塞弹窗
      this.getFloorList();
    },
    async addFloor() {
      if (this.roomFloor == "") {
        this.$message({ type: "warning", message: "请输入楼层" });
      } else {
        await this.$http.post(`rest/floors`, {
          roomFloor: this.roomFloor
        });
        this.roomFloor = "";
        this.$message({ type: "success", message: "新增楼层成功" });
        this.getFloorList();
      }
    },
    changeFloorOpenDialog(row) {
      this.changeFloorForm = row;
      this.changeFloorDialogFormVisible = true;
    },
    async changeFloorSubmit() {
      await this.$http.put(
        `rest/floors/${this.changeFloorForm._id}`,
        this.changeFloorForm
      );
      this.changeFloorDialogFormVisible = false;
    }
  },
  created() {
    this.getTypeList();
    this.getFloorList();
  }
};
</script>

<style scoped>
.UsersCard {
  width: 100%;
  height: 100%;
}
</style>