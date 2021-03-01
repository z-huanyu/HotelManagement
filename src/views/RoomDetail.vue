<template>
  <div>
    <!-- 导航 -->
    <my-nav></my-nav>
    <!-- 客房详细信息 -->

    <div class="bgc">
      <div class="room_card d-flex flex-wrap jc-between">
        <p class="fs-xxl w-100">房间详细信息</p>
        <div>
          <img class="room_img" :src="roomdetails.cover" alt />
        </div>
        <div class="mx-5 d-flex ai-center flex-wrap detial_right">
          <div class="fs-xxl w-100">{{roomdetails.number}}号房</div>
          <div class="room_detai_middle w-100">
            <p>价格：{{roomdetails.prices}}￥</p>
            <p>房型：{{roomdetails.type}}</p>
            <p>早餐：{{roomdetails.breakfast}}</p>
            <p>网络：{{roomdetails.internet}}</p>
            <p>床大小：{{roomdetails.bedsize}}</p>
            <p>房间大小：{{roomdetails.roomsize}}</p>
            <p>窗户：{{roomdetails.window}}</p>
            <p>可入住：{{roomdetails.people}}</p>
          </div>
          <div>
            <el-button class="btn" @click="open()">预订</el-button>
          </div>
        </div>
      </div>
      <!-- <div class="room_card">
            <el-alert
              title="带辅助性文字介绍"
              type="success"
              description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰挥发化为灰……"
            ></el-alert>
            <img class="img_bottom" src="../assets/images/room6.jpg" alt />
      </div>-->
      <el-tabs type="border-card">
        <el-tab-pane label="房间预订"></el-tab-pane>
        <el-tab-pane label="位置信息"></el-tab-pane>
        <el-tab-pane label="酒店概况">酒店信息</el-tab-pane>
        <el-tab-pane label="评价">
          <!-- 总评论 -->
          <div class="generalComment d-flex jc-around ai-center">
            <div>
              <span>
                <i class="fs-xxxl text-blue">{{totolCommentValue}}</i>/5分
              </span>
            </div>
            <div class="commentbox">
              <span>服务态度</span>
              <el-rate
                v-model="serviceFinalValue"
                disabled
                score-template="{value}"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
              >></el-rate>
            </div>
            <div class="commentbox">
              <span>环境卫生</span>
              <el-rate
                v-model="environmentFinalValue"
                disabled
                score-template="{value}"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
              >></el-rate>
            </div>
            <div class="commentbox">
              <span>设施设备</span>
              <el-rate
                v-model="equipmentFinalValue"
                disabled
                score-template="{value}"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
              >></el-rate>
            </div>
            <div class="commentbox">
              <span>舒适程度</span>
              <el-rate
                v-model="comfortableFinalValue"
                disabled
                score-template="{value}"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
              >></el-rate>
            </div>
          </div>
          <!-- 评论分类 -->
          <el-tabs>
            <el-tab-pane label="全部评论">
              <div class="commentlistbox d-flex" v-for="i in commentList" :key="i._id">
                <div class="commentusername">{{i.commentUsername}}</div>
                <div class="commentinformationbox">
                  <span class="commentinformation">{{i.commentText}}</span>
                  <div class="commentdataratebox">
                    <span>点评日期：{{i.commentDate}}</span>
                    <el-rate
                      class="commentrate"
                      v-model="i.generalComment"
                      disabled
                      score-template="{value}"
                      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                    ></el-rate>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="好评"></el-tab-pane>
            <el-tab-pane label="中评"></el-tab-pane>
            <el-tab-pane label="差评"></el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      roomdetails: {},

      orderlist_number: [],
      dialogVisible: false,
      room_order: {
        room: {}, //要预定的房间信息
        order_time: this.getNowFormatDate(), //全局挂载的函数，自定义获取当前时间
        webUser: sessionStorage.username, //获取缓存中的用户名
        status: "待入住"
      },
      pickerOptions: {
        //日期选择限制对象，这里限制只能选择今天以及今后的日期
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },

      commentList: [],
      comfortableFinalValue: 0,
      equipmentFinalValue: 0,
      environmentFinalValue: 0,
      serviceFinalValue: 0,

      totolCommentValue: 0
    };
  },
  methods: {
    async getroomdetails() {
      const res = await this.$http.get(`/roomdetails/${this.id}`);
      this.roomdetails = res.data;
      this.getCommentlist(); //获取评论列表
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
      //提交订单
      const res = await this.$http.post("roomorder", this.room_order); // eslint-disable-line no-unused-vars
      this.dialogVisible = false;
      this.$message({ type: "success", message: "预定成功" });
      this.$router.push("/room");
    },
    open() {
      //打开弹框
      this.dialogVisible = true;
      this.room_order = Object.assign({}, this.room_order);
      this.room_order.room = this.roomdetails;
    },
    async getCommentlist() {
      // console.log(this.roomdetails)
      const res = await this.$http.post("getcommentlist", {
        commentRoomNumber: this.roomdetails.number
      });
      this.commentList = res.data;

      // console.log(this.commentList);
      //获取当前房间评论的平均值
      let totolComfortabel = [];
      let totolEquipment = [];
      let totolEnvironment = [];
      let totolService = [];
      this.commentList.forEach(item => {
        totolComfortabel.push(item.comfortable);
        totolEquipment.push(item.equipment);
        totolEnvironment.push(item.environment);
        totolService.push(item.service);
      });

      this.comfortableFinalValue =
        totolComfortabel.reduce((x, y) => x + y) / totolComfortabel.length;
      this.equipmentFinalValue =
        totolEquipment.reduce((x, y) => x + y) / totolEquipment.length;
      this.environmentFinalValue =
        totolEnvironment.reduce((x, y) => x + y) / totolEnvironment.length;
      this.serviceFinalValue =
        totolService.reduce((x, y) => x + y) / totolService.length;

      this.totolCommentValue = (
        (this.comfortableFinalValue +
          this.equipmentFinalValue +
          this.environmentFinalValue +
          this.serviceFinalValue) /
        4
      ).toFixed(1);
    }
  },
  created() {
    this.id = this.$route.params.id; //接收路由router传值params,也可以利用props接收
    this.id && this.getroomdetails();
  },
  mounted() {}
};
</script>

<style scoped>
.bgc {
  width: 100%;
  padding: 20px 200px;
  background-color: #f7f7f7;
}
.room_card {
  border-radius: 3px;
  background-color: #ffffff;
  padding: 30px;
  margin-top: 20px;
}
.room_img {
  width: 600px;
  height: 400px;
}
.room_detai_middle {
  background-color: #f7f7f7;
}
.btn {
  width: 150px;
  height: 40px;
  text-align: center;
  border-radius: 5px;
}
.detial_right {
  width: 500px;
}
.img_bottom {
  width: 100%;
  height: 500px;
}
.generalComment {
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #f4f4f4;
}
.commentbox {
  text-align: center;
}
.commentlistbox {
  width: 100%;
  height: 150px;
  border-bottom: 1px solid #f1f1f1;
}
.commentusername {
  width: 200px;
  height: 100%;
  text-align: center;
  line-height: 150px;
  border: 1px solid #f1f1f1;
  border-radius: 50%;
  margin-right: 20px;
}
.commentinformation {
  display: block;
  margin: 40px 0;
}
.commentrate {
  display: inline-block;
}
.commentinformationbox {
  width: 900px;
  position: relative;
}
.commentdataratebox {
  position: absolute;
  bottom: 20%;
  color: #8d8d8d;
}
</style>