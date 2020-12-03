<template>
  <div>
    <!-- 房间信息 -->
    <div class="mx-6">
      <el-table :data="roomlist" label-width="180px" height="650px">
        <el-table-column prop="cover" label="封面" width="230px">
          <template slot-scope="scope">
            <img style="width:100px; height:80px;" :src="scope.row.cover" alt="404" />
          </template>
        </el-table-column>
        <el-table-column prop="number" label="房间号"></el-table-column>
        <el-table-column prop="type" label="房型"></el-table-column>
        <el-table-column prop="breakfast" label="早餐"></el-table-column>
        <el-table-column prop="prices" label="房价"></el-table-column>
        <el-table-column prop="details" class="details_column">
          <template slot-scope="scope">
            <span class="details">
              详情
              <div class="details_box">
                <div class="details_triangle"></div>
                <ul class="details_ul d-flex jc-around flex-wrap">
                  <li class="details_li">窗户：{{scope.row.details.window}}</li>
                  <li class="details_li">网络：{{scope.row.details.internet}}</li>
                  <li class="details_li">房间面积：{{scope.row.details.roomsize}}</li>
                  <li class="details_li">楼层：{{scope.row.details.floor}}</li>
                  <li class="details_li">可入住人数：{{scope.row.details.people}}</li>
                  <li class="details_li">床尺寸：{{scope.row.details.bedsize}}</li>
                </ul>
              </div>
            </span>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              :disabled="flag(scope.row.number)"
              @click="open(scope.row)"
            >{{flag(scope.row.number)?'已满':'立即预定'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 订单弹框 -->
    <el-dialog title="预定订单" :visible.sync="dialogVisible">
      <el-form :model="room_order" label-width="120px">
        <el-form-item label="入住日期">
          <el-date-picker
            v-model="room_order.checkin_date"
            type="daterange"
            range-separator="至"
            start-placeholder="入住"
            end-placeholder="离开"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="入住人姓名">
          <el-input v-model="room_order.username"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码">
          <el-input v-model="room_order.userID"></el-input>
        </el-form-item>
        <el-form-item label="入住人手机号">
          <el-input v-model="room_order.phone"></el-input>
        </el-form-item>
        <el-form-item label="预计到店时间">
          <el-select v-model="room_order.arrivetime" placeholder="请选择">
            <el-option value="14:00">14:00</el-option>
            <el-option value="16:00">16:00</el-option>
            <el-option value="18:00">18:00</el-option>
            <el-option value="20:00">20:00</el-option>
            <el-option value="21:00">21:00</el-option>
            <el-option value="22:00">22:00</el-option>
            <el-option value="23:00">23:00</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="room_order.remarks"></el-input>
        </el-form-item>
        <el-form-item label="应付金额" label-width="600px">
          <span style="color:#f77500; font-size:20px;">¥{{room_order.room.prices}}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit_form">提交订单</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomlist: [],
      orderlist_number: [],
      dialogVisible: false,
      room_order: {
        room: {}, //要预定的房间信息
        order_time: this.getNowFormatDate() //全局挂载的函数，自定义获取当前时间
      },
      pickerOptions: {
        //日期选择限制对象，这里限制只能选择今天以及今后的日期
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      }
    };
  },
  methods: {
    async getroomlist() {
      const res = await this.$http.get("roomlist"); //查询房间列表
      this.roomlist = res.data;
      const res2 = await this.$http.get("orderlist");
      this.orderlist_number = res2.data.map(item => {
        return item.room.number;
      });
      console.log(this.orderlist_number)
    },
    flag(number) {
      //判断是否满房
      for (let item of this.orderlist_number) {
        if (item === number) {
          return true;
        }
      }
    },
    async submit_form() {
      const res = await this.$http.post("roomorder", this.room_order); // eslint-disable-line no-unused-vars
      // console.log(res);
      // console.log(this.room_order)
      this.dialogVisible = false;
      this.$message({ type: "success", message: "预定成功" });
      this.getroomlist();
    },
    open(form_data) {
      this.dialogVisible = true;
      //this.room_order = form_data;这样赋值会覆盖room_order里的全部数据
      this.room_order = Object.assign({}, this.room_order);
      this.room_order.room = form_data;
      // console.log(this.room_order);
    }
  },
  created() {
    this.getroomlist();

  }
};
</script>

<style>
.details_column {
  position: relative;
}
.details {
  color: skyblue;
  cursor: pointer;
}
.details:hover .details_box {
  display: block;
}
.details_box {
  display: none;
  position: absolute;
  top: 80px;
  right: 0;
  z-index: 3;
  color: black;
  background-color: #fffbe5;
}
.details_triangle {
  position: absolute;
  top: -10px;
  right: 135px;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-bottom-color: skyblue;
}
.details_ul {
  width: 800px;
  margin: 0;
  padding: 0;
  border: 1px solid skyblue;
  border-radius: 8px;
}
.details_li {
  width: 200px;
  margin: 2px 0;
}
</style>