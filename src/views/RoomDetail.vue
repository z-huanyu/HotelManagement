<template>
  <div>
    <!-- 导航 -->
    <my-nav v-if="!roomData"></my-nav>
    <!-- 客房详细信息 -->

    <div class="bgc" ref="bgcRef">
      <div class="room_card d-flex flex-wrap jc-between">
        <div class="d-flex w-100 jc-around mb-4 topDiv">
          <span class="fs-xxl">{{roomdetails.number}}号房</span>
          <span class="fs-xxl">
            价格：
            <i class="text-yellow">
              <i class="fs-xl">￥</i>
              {{roomdetails.prices}}
            </i>
          </span>
        </div>
        <div>
          <img ref="bigImage" class="room_img" :src="roomdetails.cover" alt />
        </div>
        <div class="mx-5 d-flex ai-center flex-wrap detial_right">
          <div @click="changeBigImage">
            <img class="detailImg" :src="roomdetails.cover" alt />
            <img class="detailImg" :src="roomdetails.img1" alt />
            <img class="detailImg" :src="roomdetails.img2" alt />
            <img class="detailImg" :src="roomdetails.img3" alt />
          </div>
          <div class="detailInformation">
            <div class="room_detai_middle w-100 d-flex flex-wrap">
              <span
                class="detialSpan"
              >房型：{{roomdetails.typeID ? roomdetails.typeID['roomType'] : '数据错误'}}</span>
              <span
                class="detialSpan"
              >楼层：{{roomdetails.floorID ? roomdetails.floorID['roomFloor'] : '数据错误'}}</span>
              <span class="detialSpan">早餐：{{roomdetails.breakfast}}</span>
              <span class="detialSpan">网络：{{roomdetails.internet}}</span>
              <span class="detialSpan">床大小：{{roomdetails.bedsize}}</span>
              <span class="detialSpan">房间大小：{{roomdetails.roomsize}}</span>
              <span class="detialSpan">窗户：{{roomdetails.window}}</span>
              <span class="detialSpan">可入住：{{roomdetails.people}}</span>
            </div>
            <div>
              <el-button class="btn" v-if="!roomData" @click="open()" type="warning">预订</el-button>
            </div>
          </div>
        </div>
      </div>
      <el-tabs type="border-card">
        <el-tab-pane label="酒店政策">
          <p>外宾：可接待外宾</p>
          <p>儿童：不接受18岁以下客人单独入住</p>
          <p>发票：可开具增值税普通发票</p>
          <p>禁烟酒店：酒店全面禁止抽烟</p>
          <p>外宾：可接待外宾</p>
          <p>1.办理入住时需要出示有效证件，如二代身份证身份证，国内驾照，军官证，港澳通行证，台胞证，国外护照，居住证。</p>
          <p>2.最早到店入住时间为当天06:00，请致电酒店前台确认。续住房：下午14:00-18:00退房收取半日租，18:00后退房收取全日租</p>
        </el-tab-pane>
        <el-tab-pane label="酒店位置">
          <!-- 百度地图组件 -->
          <baidu-map
            class="allmap"
            :center="center"
            :zoom="zoom"
            @ready="handler"
            :scroll-wheel-zoom="true"
          >
            <!-- 标尺 -->
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
            <!-- 定位 -->
            <bm-geolocation
              anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
              :showAddressBar="true"
              :autoLocation="true"
            ></bm-geolocation>
            <!-- 点 -->
            <bm-marker
              :position="{lng: 113.287385, lat: 23.135455}"
              :dragging="true"
              animation="BMAP_ANIMATION_BOUNCE"
            >
              <bm-label content="酒店位置" :offset="{width: -15, height: 30}" />
            </bm-marker>
          </baidu-map>
        </el-tab-pane>
        <el-tab-pane label="酒店概况">
          <p>电话：0755-86966188</p>
          <p>地址：酒店（宝安新安万达广场店）位于宝安区中心地带，地处宝安区新安街道自由路与上川路交汇处137号。</p>
          <p>地处深圳宝安福诚万达广场对面50米，宝安商业政治文化中心，座落于美食一条街上。</p>
          <p>东行至107国道30米，西行至宝安大道300米。</p>
          <p>位于深圳地铁5号线环中线翻身地铁站附近。</p>
          <p>距离宝安国际机场仅需15分钟车程，距深圳北站仅需20分钟，宝安汽车站步行仅需7分钟左右。</p>
          <p>紧靠港湾、宝安公园，深圳湾公园、距离海岸城，蛇口口岸及前海自贸区仅15分钟车程。</p>
          <p>距离东部华侨城，沙井海上田园40分钟车程。周边配套有万达广场、港隆城、创业天虹、海雅缤纷城、壹方城、宝安区政府、宝安体育馆。</p>
          <p>周围有中国银行农业银行、建设银行等。</p>
          <p>酒店拥有客房102间，配有西餐厅。</p>
          <p>采用欧陆风情设计，装修风格经典、雅致艺术、温馨，是您休闲、购物、旅游及商务的首选之地、酒店服务周到、热情、硬件配置豪华、“深睡眠、大健康”。</p>
          <p>酒店全体员工欢迎您的光临！</p>
          <p>特别介绍：酒店配套早餐厅、停车场、自助洗衣房、茶具、生活小用品、热毛巾</p>
        </el-tab-pane>
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
            <el-tab-pane label="好评">
              <div
                class="commentlistbox d-flex"
                v-for="i in commentList.filter(item=>item.generalComment>=4)"
                :key="i._id"
              >
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
            <el-tab-pane label="中评">
              <div
                class="commentlistbox d-flex"
                v-for="i in commentList.filter(item=>item.generalComment>=2.5&&item.generalComment<4)"
                :key="i._id"
              >
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
            <el-tab-pane label="差评">
              <div
                class="commentlistbox d-flex"
                v-for="i in commentList.filter(item=>item.generalComment<2.5)"
                :key="i._id"
              >
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
          </el-tabs>
        </el-tab-pane>
      </el-tabs>
      <!-- 订单弹框 -->
      <el-dialog title="预定订单" :visible.sync="dialogVisible" center>
        <el-form :model="room_order" label-width="130px">
          <el-form-item label="入住日期">
            <el-date-picker
              v-model="room_order.checkinout_date"
              type="daterange"
              range-separator="至"
              start-placeholder="入住"
              end-placeholder="离开"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['12:00:00', '12:00:00']"
              @change="checkinDateChange"
            ></el-date-picker>
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
            <el-input v-model="room_order.remarks" type="textarea"></el-input>
          </el-form-item>
          <div v-for="i in checkInNumber" :key="i" class="checkinpeople">
            <p class="text-center">入住人{{i}}</p>
            <el-row>
              <el-col :span="22">
                <el-form-item label="姓名">
                  <el-input v-model="room_order.checkinPeople[i-1].name"></el-input>
                </el-form-item>
                <el-form-item label="身份证">
                  <el-input v-model="room_order.checkinPeople[i-1].ID"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                  <el-input v-model="room_order.checkinPeople[i-1].phone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="text-center my-3">
            <el-button type="warning" @click="addCheckInNumber">添加入住人</el-button>
            <el-button v-show="checkInNumber!=0" type="danger" @click="checkInNumber--">删除入住人</el-button>
          </div>
          <el-form-item label="房费总计：">
            <el-col :span="6">
              <span>￥{{roomdetails.prices*checkinDay}}</span>
            </el-col>
            <el-col :span="10">
              <span>优惠金额({{userInformation.LevelName}})：</span>
              <span>￥{{paidDiscountfn()}}</span>
            </el-col>
            <el-col :span="8">
              <span>实际应付：</span>
              <span class="text-yellow fs-xxl">¥{{paidfn()}}</span>
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit_form">提交订单</el-button>
        </div>
      </el-dialog>
    </div>
    <my-footer v-if="!roomData"></my-footer>
  </div>
</template>
<script>
export default {
  props: {
    roomData: {
      type: String
    }
  },
  data() {
    return {
      //地图坐标
      center: { lng: 0, lat: 0 },
      zoom: 3,

      max_checkInNumber: 5, //最大入住人数
      checkinDay: 0, //入住天数
      checkInNumber: 0, //订单入住人数
      userInformation: {}, //个人信息
      id: "",
      roomdetails: {},
      dialogVisible: false,
      room_order: {
        checkinPeople: [], //入住人
        roomID: "", //要预定的房间id
        order_time: this.getNowFormatDate(), //全局挂载的函数，自定义获取当前时间
        webUserID: sessionStorage.webUserID, //获取缓存中的用户名
        paid: "",
        discountPaid: "",
        status: "待付款",

        checkinDay: 0
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
  components: {},
  methods: {
    //百度地图坐标方法
    handler({ BMap, map }) {
      console.log(BMap, map);
      this.center.lng = 113.287385;
      this.center.lat = 23.135455;
      this.zoom = 15;
    },
    addCheckInNumber() {
      if (this.checkInNumber == this.max_checkInNumber) {
        this.$message({
          type: "warning",
          message: `该房间最多只能入住${this.max_checkInNumber}人`
        });
      } else {
        this.checkInNumber++;
      }
    },
    checkinDateChange($event) {
      //日期选择钩子
      let checkindate =
        (Date.parse(new Date($event[1])) / 1000 -
          Date.parse(new Date($event[0])) / 1000) /
        60 /
        60 /
        24; //计算入住天数
      if (checkindate != 0) {
        if (this.userInformation.LevelDiscount) {
          this.checkinDay = checkindate;
          this.room_order.paid = (
            this.roomdetails.prices *
            checkindate *
            this.userInformation.LevelDiscount *
            0.1
          ).toFixed(2);
          this.room_order.discountPaid = (
            this.roomdetails.prices * checkindate -
            this.roomdetails.prices *
              this.userInformation.LevelDiscount *
              checkindate *
              0.1
          ).toFixed(2);
        } else {
          this.checkinDay = checkindate;
          this.room_order.paid = (
            this.roomdetails.prices * checkindate
          ).toFixed(2);
          this.room_order.discountPaid = 0;
        }
      } else {
        this.checkinDay = 1;
      }
    },
    async getroomdetails() {
      const res = await this.$http.get(`/roomdetails/${this.id}`);
      this.roomdetails = res.data;
      this.commentList = res.data.commentID;
      this.setMaxCheckinNumber(res.data.people);
      //避免添加入住人报错name undefined
      for (let i = 0; i < this.max_checkInNumber; i++) {
        this.room_order.checkinPeople.push({ name: "", ID: "", phone: "" });
      }
      res.data.commentID && this.getFinalComment(); //当前房间的评价条数大于0，再去统计房间总评价分数
    },
    //限制房间最大可入住人数
    setMaxCheckinNumber(val) {
      switch (val) {
        case "一人":
          this.max_checkInNumber = 1;
          break;
        case "两人":
          this.max_checkInNumber = 2;
          break;
        case "三人":
          this.max_checkInNumber = 3;
          break;
        case "四人":
          this.max_checkInNumber = 4;
          break;
        case "五人":
          this.max_checkInNumber = 5;
          break;
        default:
          break;
      }
    },
    async submit_form() {
      //提交订单
      if (//表单验证
        this.room_order.checkinout_date == undefined ||
        this.room_order.checkinPeople[0].name == "" ||
        this.room_order.checkinPeople[0].ID == "" ||
        this.room_order.checkinPeople[0].phone == ""
      ) {
        this.$message({ type: "warning", message: "请填写完整订单信息" });
      } else {
        // 表单验证成功
        this.room_order.checkinDay = this.checkinDay; //赋值入住天数
        const res = await this.$http.post("roomorder", this.room_order); // eslint-disable-line no-unused-vars
        await this.$http.put(`changeroomstatus/${this.roomdetails._id}`, {
          status: "待入住"
        });
        this.dialogVisible = false;
        this.$confirm("预订成功，可以到我的订单查看订单信息！", "提示", {
          confirmButtonText: "跳转到我的订单",
          cancelButtonText: "确定",
          type: "warning",
          center: true
        })
          .then(() => {
            this.$router.push("/myorder");
          })
          .catch(() => {
            this.$message({
              type: "success",
              message: "预订成功"
            });
            this.$router.push("/room");
          });
      }
    },
    open() {
      //打开弹框
      if (!sessionStorage.username) {
        this.$confirm("你不是登录状态，是否转到登录页面?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作"
            });
          });
      } else {
        this.dialogVisible = true;
        this.room_order = Object.assign({}, this.room_order);
        this.room_order.roomID = this.roomdetails._id;
        //判断是否会员
        if (this.userInformation.LevelDiscount) {
          //是会员，打折
          this.room_order.paid = (
            this.roomdetails.prices *
            this.userInformation.LevelDiscount *
            0.1
          ).toFixed(2);
          this.room_order.discountPaid = (
            this.roomdetails.prices -
            this.roomdetails.prices * this.userInformation.LevelDiscount * 0.1
          ).toFixed(2);
        } else {
          //不是会员，原价
          this.room_order.paid = this.roomdetails.prices.toFixed(2);
          this.room_order.discountPaid = 0;
        }
      }
    },

    changeBigImage(e) {
      this.$refs.bigImage.src = e.target.src;
    },
    getFinalComment() {
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

      if (
        totolComfortabel != 0 &&
        totolEquipment != 0 &&
        totolEnvironment != 0 &&
        totolService != 0
      ) {
        //避免报错数组为空，在填充数组后再调用reduce累加求平均值
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
    async getUserInformation() {
      //获取用户信息判断是否会员
      const res = await this.$http.post("getuserinformation", {
        id: sessionStorage.webUserID
      });
      this.userInformation = res.data;
    },
    paidDiscountfn() {
      return this.userInformation.LevelDiscount
        ? (
            this.roomdetails.prices * this.checkinDay -
            this.roomdetails.prices *
              this.userInformation.LevelDiscount *
              this.checkinDay *
              0.1
          ).toFixed(2)
        : 0;
    },
    paidfn() {
      return this.userInformation.LevelDiscount
        ? (
            this.roomdetails.prices *
            this.checkinDay *
            this.userInformation.LevelDiscount *
            0.1
          ).toFixed(2)
        : this.roomdetails.prices;
    }
  },
  created() {
    sessionStorage.username && this.getUserInformation();
    this.id = this.roomData || this.$route.params.id; //接收路由router传值params,也可以利用props接收
    this.id && this.getroomdetails();
  },
  mounted() {
    this.roomData && this.$refs.bgcRef.classList.remove("bgc");
  },
  beforeUpdate() {},
  updated() {},
  computed: {}
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
  /* background-color: #f7f7f7; */
}
.btn {
  width: 150px;
  height: 40px;
  text-align: center;
  border-radius: 5px;
  margin-left: 30%;
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
.detailImg {
  width: 200px;
  height: 100px;
  margin: 0 10px;
}
.detailInformation {
  height: 50%;
}
.detialSpan {
  width: 50%;
  margin: 10px 0;
}
.checkinpeople {
  border: 1px solid #c8c8c8;
}
.allmap {
  width: 100%;
  height: 500px;
}
</style>