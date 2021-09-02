<template>
  <div>
    <!-- 面包屑 -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/order/userorder' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户订单</el-breadcrumb-item>
    </el-breadcrumb> -->
    <!-- 卡片 -->
    <el-card class="UsersCard">
      <el-divider>操作</el-divider>
      <el-row>
        <el-col :span="6">
          <el-button type="danger" @click="addOrderDialogVisible = true">添加订单</el-button>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="请输入"
            v-model="searchInput_val"
            clearable
            @clear="searchInputClear"
            @change="searchInputChange"
            ref="searchInputRef"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="search_btn">搜索</el-button>
        </el-col>
      </el-row>
      <el-divider>房间列表</el-divider>
      <!-- 表格 -->
      <el-table
        :data="orderlist.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        style="width: 100%"
        border
        :header-cell-style="{'text-align':'center'}"
        :default-sort="{prop: 'commentDate', order: 'descending'}"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item
                v-for="(i,index) in scope.row.checkinPeople"
                :key="index"
                :label="'入住人'+(index+1)"
              >
                <div class="checkinPeopleDiv">
                  <el-row>
                    <el-col :span="6">
                      <span>姓名:</span>
                      <span>{{ scope.row.checkinPeople[index].name}}</span>
                    </el-col>
                    <el-col :span="10">
                      <span>身份证:</span>
                      <span>{{ scope.row.checkinPeople[index].ID}}</span>
                    </el-col>
                    <el-col :span="8">
                      <span>手机号:</span>
                      <span>{{ scope.row.checkinPeople[index].phone}}</span>
                    </el-col>
                  </el-row>
                </div>
              </el-form-item>
              <el-form-item label="入住时间">
                <span>{{ scope.row.checkinout_date[0]}}</span>
              </el-form-item>
              <el-form-item label="离开时间">
                <span>{{ scope.row.checkinout_date[1]}}</span>
              </el-form-item>
              <el-form-item label="预计到达时间">
                <span>{{ scope.row.arrivetime }}</span>
              </el-form-item>
              <el-form-item label="早餐">
                <span>{{ scope.row.roomID.breakfast}}</span>
              </el-form-item>
              <el-form-item label="备注">
                <span>{{ scope.row.remarks}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="用户名" width="120" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.webUserID? scope.row.webUserID.username: '无'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="roomID.name" label="房间名称" width="120" align="center"></el-table-column>
        <el-table-column prop="roomID.number" label="房间号" width="120" align="center"></el-table-column>
        <el-table-column prop="discountPaid" label="优惠金额" width="120" align="center"></el-table-column>
        <el-table-column prop="paid" label="实付金额" width="120" align="center"></el-table-column>
        <el-table-column prop="order_time" label="下单时间" width="180" align="center" sortable></el-table-column>
        <el-table-column label="状态" width="120" align="center">
          <template slot-scope="scope">
            <el-tag :type="status_tagtype(scope.row.status)">{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createWay" label="下单方式" width="120" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="info"
              size="mini"
              @click="openCheckin(scope.row)"
              v-if="scope.row.status == '已付款'"
            >确认入住</el-button>
            <el-button
              type="info"
              size="mini"
              @click="Paid(scope.row._id)"
              v-if="scope.row.status == '待付款'"
            >到店付款</el-button>
            <el-button
              type="warning"
              size="mini"
              @click="changeroom(scope.row._id,scope.row.roomID._id,scope.row)"
              v-if="scope.row.status == '已付款'||scope.row.status == '待付款' || scope.row.status == '已入住'"
            >换房</el-button>
            <el-button
              type="warning"
              size="mini"
              @click="cleanroom(scope.row._id,scope.row.roomID._id)"
              v-if="scope.row.status == '等待打扫'"
            >打扫</el-button>
            <el-button
              type="warning"
              size="mini"
              @click="cleanroomcomplete(scope.row._id,scope.row.roomID._id)"
              v-if="scope.row.status == '打扫中'"
            >打扫完成</el-button>
            <el-button
              type="warning"
              size="mini"
              @click="checkoutroom(scope.row.roomID._id,scope.row._id)"
              v-if="scope.row.status == '已入住'"
            >退房</el-button>
            <el-button
              type="warning"
              size="mini"
              @click="complateroom(scope.row.roomID._id,scope.row._id)"
              v-if="scope.row.status == '打扫完成'"
            >订单完成</el-button>
            <el-button
              size="mini"
              @click="ordersrenew(scope.row)"
              type="success"
              v-if="scope.row.status == '已入住'"
            >续费</el-button>
            <el-button size="mini" @click="ordersdelete(scope.row._id)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="orderlist.length"
        class="fenye"
      ></el-pagination>
    </el-card>
    <!-- 换房弹框 -->
    <el-dialog title="换房操作" :visible.sync="changeroomdialogVisible">
      <el-form :model="changeroom_order" label-width="120px">
        <el-form-item label="选择房间">
          <el-select v-model="changeroom_order.id">
            <el-option
              v-for="item in changeroomlist"
              :key="item._id"
              :value="item._id"
              :label="item.name+'('+item.number+'号房)'"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeroomdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeroom_submit()">提交</el-button>
      </div>
    </el-dialog>
    <!-- 确认入住弹框 -->
    <el-dialog title="确认入住信息" :visible.sync="openCheckinDialogVisible" center>
      <el-form :model="CheckinForm" label-width="100px">
        <el-divider>入住人信息</el-divider>
        <el-row v-for="(i,index) in CheckinForm.checkinPeople" :key="index">
          <el-col :span="8">
            <el-form-item :label="'入住人'+index+' '+'姓名'">
              <el-input
                v-model="CheckinForm.checkinPeople[index].name"
                :disabled="changeCheckinPeoleInformationFlag"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证">
              <el-input
                v-model="CheckinForm.checkinPeople[index].ID"
                :disabled="changeCheckinPeoleInformationFlag"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电话号码">
              <el-input
                v-model="CheckinForm.checkinPeople[index].phone"
                :disabled="changeCheckinPeoleInformationFlag"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider>房间信息</el-divider>
        <el-row>
          <el-col :span="12">
            <el-form-item label="房间名称">
              <span class="ml-3">{{CheckinForm.roomID ? CheckinForm.roomID.name : '无'}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房间号">
              <span class="ml-3">{{CheckinForm.roomID ? CheckinForm.roomID.number : '无'}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider>订单详细</el-divider>
        <el-row>
          <el-col :span="12">
            <el-form-item label="下单时间">
              <span class="ml-3">{{CheckinForm.order_time}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预计到达">
              <span class="ml-3">{{CheckinForm.arrivetime}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="入住时间">
              <span
                class="ml-3"
              >{{CheckinForm.checkinout_date? CheckinForm.checkinout_date[0] : CheckinForm.checkinout_date}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="退房时间">
              <span
                class="ml-3"
              >{{CheckinForm.checkinout_date? CheckinForm.checkinout_date[1] : CheckinForm.checkinout_date}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="订单状态" prop="status">
              <span class="ml-3">{{CheckinForm.status}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="remarks">
              <span class="ml-3">{{CheckinForm.remarks}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider>
          <span class="orderTitle">订单应付</span>
        </el-divider>
        <el-row>
          <el-col :span="12">
            <el-form-item label="优惠金额" prop="discountPaid">
              <span class="ml-3">{{CheckinForm.discountPaid}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订单金额" prop="paid">
              <span class="ml-3 text-yellow fs-xxl">￥{{CheckinForm.paid}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="checkinCancel">取 消</el-button>
        <el-button type="primary" @click="checkinSubmit()">确 认</el-button>
        <el-button @click="changeCheckinPeoleInformationFlag = false">修改入住人信息</el-button>
      </div>
    </el-dialog>
    <!-- 添加订单弹框 -->
    <el-dialog title="添加订单" :visible.sync="addOrderDialogVisible" center>
      <el-form :model="room_order" label-width="130px">
        <el-form-item label="选择房间">
          <el-select v-model="room_order.roomID" placeholder="请选择房间" @change="roomSelectChange">
            <el-option
              v-for="i in roomlist"
              :key="i._id"
              :value="i._id"
              :label="i.number+'('+i.name+')'"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择用户">
          <el-select v-model="room_order.webUserID" placeholder="请选择用户" @change="userSelectChange">
            <el-option v-for="i in userlist" :key="i._id" :value="i._id" :label="i.username"></el-option>
          </el-select>
        </el-form-item>
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
        <el-form-item label="备注">
          <el-input v-model="room_order.remarks" type="textarea"></el-input>
        </el-form-item>

        <div v-for="i in checkInNumber" :key="i" class="checkinpeople">
          <p class="checkinDiv">入住人{{i}}</p>
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
        <div class="btnDiv">
          <el-button v-show="room_order.roomID" type="warning" @click="addCheckInNumber">添加入住人</el-button>
          <el-button v-show="checkInNumber!=0" type="danger" @click="checkInNumber--">删除入住人</el-button>
        </div>
        <el-form-item label="房费总计：" v-show="userdetails&&checkinDay!=0">
          <el-col :span="6">
            <span>￥{{roomdetails.prices*checkinDay}}</span>
          </el-col>
          <el-col :span="10">
            <span>优惠金额：</span>
            <span>￥{{userdetails.LevelDiscount? discountPaidFn():0}}</span>
          </el-col>
          <el-col :span="8">
            <span>实际应付：</span>
            <span>¥{{userdetails.LevelDiscount?paidFn():roomdetails.prices*checkinDay}}</span>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addOrderDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit_form">提交订单</el-button>
      </div>
    </el-dialog>
    <!-- 续费弹框 -->
    <el-dialog title="订单续费" :visible.sync="renewOrderDialogVisible" center width="500px">
      <el-form :model="renewForm" label-width="130px">
        <el-form-item label="续费至">
          <el-date-picker
            v-model="renewForm.checkinout_date[1]"
            type="datetime"
            placeholder="选择续费日期"
            :picker-options="pickerOptions"
            default-time="12:00:00"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="renewDay"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="renewForm.remarks" type="textarea"></el-input>
        </el-form-item>
        <div v-if="showRenewPaidFlag">
          <el-form-item label="续费应付：">
            <el-col :span="6">
              <span v-if="renewForm.roomID">￥{{(renewForm.roomID.prices*renewDays).toFixed(2)}}</span>
            </el-col>
          </el-form-item>
          <el-form-item label="优惠金额：">
            <el-col :span="10">
              <span
                v-if="renewForm.webUserID.LevelDiscount"
              >￥{{(renewForm.roomID.prices*renewDays-renewForm.roomID.prices*renewDays*renewForm.webUserID.LevelDiscount*0.1).toFixed(2)}}</span>
              <span v-else>￥{{0}}</span>
            </el-col>
          </el-form-item>
          <el-form-item label="实际应付：">
            <el-col :span="8">
              <span
                v-if="renewForm.webUserID.LevelDiscount"
                class="text-yellow fs-xxl"
              >¥{{(renewForm.roomID.prices*renewDays*renewForm.webUserID.LevelDiscount*0.1).toFixed(2)}}</span>
              <span
                v-else
                class="text-yellow fs-xxl"
              >¥{{(renewForm.roomID.prices*renewDays).toFixed(2)}}</span>
            </el-col>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="renewOrderDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="renewSubmit">确认续费</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      renewForm: {
        checkinout_date: ["", ""]
      }, //续费表单
      renewOrderDialogVisible: false,
      oldStringTime: "", //退房时间
      renewDays: 0, //续费天数
      showRenewPaidFlag: false, //控制续费价格阀
      renewPaid: 0,
      renewDiscountPaid: 0,

      changeCheckinPeoleInformationFlag: true, //控制修改用户信息开关
      max_checkInNumber: 5, //最大入住人数
      checkinDay: 0, //入住天数
      checkInNumber: 0, //订单入住人数
      room_order: {
        checkinPeople: [], //入住人
        roomID: "", //要预定的房间id
        order_time: this.getNowFormatDate(), //全局挂载的函数，自定义获取当前时间
        //webUserID: sessionStorage.webUserID, //获取缓存中的用户名
        paid: "",
        discountPaid: "",
        status: "待付款",
        createWay: "店内下单",
        editer: sessionStorage.editer, //编辑者

        checkinDay: 0
      },
      pickerOptions: {
        //日期选择限制对象，这里限制只能选择今天以及今后的日期
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },

      roomlist: [],
      roomdetails: {},
      userlist: [],
      userdetails: {},

      addOrderDialogVisible: false, //添加订单弹框
      orderlist: [], //订单列表

      changeroomRow: {}, //当前点击的订单信息(换房)
      changeroomdialogVisible: false,
      changeroomlist: [], //可换房间列表
      changeroom_order: {},

      openCheckinDialogVisible: false, //确认入住弹框控制
      CheckinForm: {}, //确认入住当前订单信息
      searchInput_val: "",
      pageSize: 5, //一页多少数据
      currentPage: 1 //当前页数
    };
  },
  methods: {
    checkinCancel() {
      //关闭确认入住修改阀
      this.changeCheckinPeoleInformationFlag = true;
      this.openCheckinDialogVisible = false;
    },
    async renewSubmit() {
      //续费提交
      await this.$http.put(`rest/orders/${this.renewForm._id}`, {
        checkinout_date: this.renewForm.checkinout_date,
        paid: parseInt(this.renewForm.paid) + parseInt(this.renewPaid),
        discountPaid:
          parseInt(this.renewForm.discountPaid) + parseInt(this.renewDiscountPaid),
        remarks: this.renewForm.remarks
      });
      this.$message({ type: "success", message: "续费成功" });
      this.showRenewPaidFlag = false;
      this.renewOrderDialogVisible = false;
      this.getorderlist();
    },
    ordersrenew(row) {
      //续费弹框
      this.renewForm = row;
      //赋值旧退房时间
      this.oldStringTime = row.checkinout_date[1];
      this.renewOrderDialogVisible = true;
      // console.log(this.renewForm)
    },
    renewDay($event) {
      //续费日期钩子
      // let nowtamp = +new Date() / 1000;//获取现在时间戳
      //续费日期时间戳
      let renewtamp = Date.parse(new Date($event)) / 1000;
      //退房日期时间戳
      let oldtamp = Date.parse(new Date(this.oldStringTime)) / 1000;
      //赋值续费天数
      this.renewDays = (renewtamp - oldtamp) / 60 / 60 / 24;

      this.showRenewPaidFlag = true; //打开价格显示

      if (this.renewForm.webUserID.LevelDiscount) {
        //判断订单用户是否会员
        //计算实际应付
        this.renewPaid = (
          this.renewForm.roomID.prices *
          this.renewDays *
          this.renewForm.webUserID.LevelDiscount *
          0.1
        ).toFixed(2);
        //计算优惠价格
        this.renewDiscountPaid = (
          this.renewForm.roomID.prices * this.renewDays -
          this.renewForm.roomID.prices *
            this.renewDays *
            this.renewForm.webUserID.LevelDiscount *
            0.1
        ).toFixed(2);
      } else {
        this.renewPaid = (
          this.renewForm.roomID.prices * this.renewDays
        ).toFixed(2);
        this.renewDiscountPaid = 0;
      }
    },
    async Paid(id) {
      await this.$http.put(`rest/orders/${id}`, {
        status: "已付款"
      });
      this.getorderlist();
    },
    discountPaidFn() {
      return (
        this.roomdetails.prices * this.checkinDay -
        this.roomdetails.prices *
          this.checkinDay *
          this.userdetails.LevelDiscount *
          0.1
      ).toFixed(2);
    },
    paidFn() {
      return (
        this.roomdetails.prices *
        this.checkinDay *
        this.userdetails.LevelDiscount *
        0.1
      ).toFixed(2);
    },
    async submit_form() {
      //提交订单
      this.room_order.checkinDay = this.checkinDay;
      const res = await this.$http.post("rest/orders", this.room_order); // eslint-disable-line no-unused-vars
      await this.$http.put(`rest/rooms/${this.roomdetails._id}`, {
        status: "待入住"
      });
      this.$message({
        type: "success",
        message: "添加订单成功"
      });
      this.getorderlist();
      this.addOrderDialogVisible = false;
      this.room_order = {
        checkinPeople: [
          //避免报错，name/ID/phone 不存在
          { name: "", ID: "", phone: "" },
          { name: "", ID: "", phone: "" },
          { name: "", ID: "", phone: "" },
          { name: "", ID: "", phone: "" },
          { name: "", ID: "", phone: "" }
        ], //入住人
        roomID: "", //要预定的房间id
        order_time: this.getNowFormatDate(), //全局挂载的函数，自定义获取当前时间
        //webUserID: sessionStorage.webUserID, //获取缓存中的用户名
        paid: "",
        discountPaid: "",
        status: "待付款",
        createWay: "店内下单",
        editer: sessionStorage.editer //编辑者
      };
    },
    roomSelectChange($event) {
      //选择房间改变钩子
      this.roomdetails = this.roomlist.filter(item => {
        return item._id == $event;
      })[0];
      this.setMaxCheckinNumber(this.roomdetails.people);
    },
    userSelectChange($event) {
      //选择用户改变钩子
      this.userdetails = this.userlist.filter(item => {
        return item._id == $event;
      })[0];
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
      //日期选择框钩子
      let checkindate =
        (Date.parse(new Date($event[1])) / 1000 -
          Date.parse(new Date($event[0])) / 1000) /
        60 /
        60 /
        24; //计算入住天数
      // 日期选择框不为空
      if (checkindate != 0) {
        if (this.userdetails.LevelDiscount) {
          this.checkinDay = checkindate;
          this.room_order.paid = (
            this.roomdetails.prices *
            checkindate *
            this.userdetails.LevelDiscount *
            0.1
          ).toFixed(2);
          this.room_order.discountPaid = (
            this.roomdetails.prices * checkindate -
            this.roomdetails.prices *
              this.userdetails.LevelDiscount *
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
        default:
          break;
      }
      //避免添加入住人报错name undefined
      for (let i = 0; i < this.max_checkInNumber; i++) {
        this.room_order.checkinPeople.push({ name: "", ID: "", phone: "" });
      }
    },
    handleSizeChange(val) {
      //当前没有数据条数
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      //当前页码
      this.currentPage = val;
    },
    async getroomlist() {
      const res = await this.$http.get("rest/rooms"); // eslint-disable-line no-unused-vars
      this.roomlist = res.data.filter(item => {
        return item.status == "空闲";
      });
    },
    async getorderlist() {
      //获取订单数据
      const res = await this.$http.get("rest/orders");
      this.orderlist = res.data.reverse();
    },
    async getuserlist() {
      //获取用户列表数据
      const res = await this.$http.get("rest/webUsers");
      this.userlist = res.data;
    },
    ordersdelete(id) {
      //删除订单
      this.$confirm("此操作将永久删除该订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(async () => {
          const res = await this.$http.delete(`rest/orders/${id}`); // eslint-disable-line no-unused-vars
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getorderlist();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    openCheckin(row) {
      this.openCheckinDialogVisible = true;
      this.CheckinForm = row;
    },
    async checkinSubmit() {
      //确认入住
      //入住操作
      await this.$http.put(`rest/rooms/${this.CheckinForm.roomID._id}`, {
        status: "满房"
      });
      await this.$http.put(`rest/orders/${this.CheckinForm._id}`, {
        status: "已入住",
        checkinPeople: this.CheckinForm.checkinPeople
      });
      this.openCheckinDialogVisible = false;
      this.changeCheckinPeoleInformationFlag = true;
      this.getorderlist();
    },
    async changeroom(orderid, orderroomid, row) {
      //换房
      //目前房间id
      const res = await this.$http.get(`rest/rooms`); //获取可换的房间（空房）
      this.changeroomlist = res.data.filter(item => {
        //筛选出待入住的房间
        return item.status === "空闲";
      });
      this.changeroomRow = row; //赋值当前点击订单信息

      this.changeroomdialogVisible = true;
      this.changeroom_order.orderID = orderid;
      this.changeroom_order.orderRoomID = orderroomid;
    },
    async cleanroom(orderid, orderroomid) {
      //打扫房间
      await this.$http.put(`rest/orders/${orderid}`, {
        status: "打扫中"
      });
      await this.$http.put(`rest/rooms/${orderroomid}`, {
        status: "打扫中",
        switch: 0
      });
      this.getorderlist();
    },
    async cleanroomcomplete(orderid, orderroomid) {
      await this.$http.put(`rest/orders/${orderid}`, {
        status: "打扫完成"
      });
      await this.$http.put(`rest/rooms/${orderroomid}`, {
        status: "打扫完成"
      });
      this.getorderlist();
    },
    async changeroom_submit() {
      //提交换房订单
      const res = await this.$http.get(
        `rest/rooms/${this.changeroom_order.id}`
      );
      let { prices } = res.data;
      if (this.changeroomRow.webUserID.LevelDiscount) {
        //判断会员
        await this.$http.put(`rest/orders/${this.changeroom_order.orderID}`, {
          roomID: this.changeroom_order.id,
          paid: (
            this.changeroomRow.checkinDay *
            prices *
            this.changeroomRow.webUserID.LevelDiscount *
            0.1
          ).toFixed(2),
          discountPaid: (
            this.changeroomRow.checkinDay * prices -
            this.changeroomRow.checkinDay *
              prices *
              this.changeroomRow.webUserID.LevelDiscount *
              0.1
          ).toFixed(2)
        });
      } else {
        await this.$http.put(`rest/orders/${this.changeroom_order.orderID}`, {
          roomID: this.changeroom_order.id,
          paid: (this.changeroomRow.checkinDay * prices).toFixed(2),
          discountPaid: 0
        });
      }

      await this.$http.put(`rest/rooms/${this.changeroom_order.orderRoomID}`, {
        status: "空闲"
      });

      await this.$http.put(`rest/rooms/${this.changeroom_order.id}`, {
        status: "待入住"
      }); // eslint-disable-line no-unused-vars
      this.$message({ type: "success", message: "换房成功" });
      this.changeroomdialogVisible = false;
      this.getorderlist();
    },
    async checkoutroom(roomid, orderid) {
      //退房操作
      await this.$http.put(`rest/rooms/${roomid}`, {
        status: "等待打扫",
        switch: 1
      });
      await this.$http.put(`rest/orders/${orderid}`, {
        status: "等待打扫"
      });
      this.getorderlist();
    },
    async complateroom(roomid, orderid) {
      //退房操作
      await this.$http.put(`rest/rooms/${roomid}`, {
        status: "空闲",
        switch: 1
      });
      await this.$http.put(`rest/orders/${orderid}`, {
        status: "订单完成"
      });
      this.getorderlist();
    },
    status_tagtype(status) {
      //根据订单状态改变tag标签样式
      let res = "";
      switch (status) {
        case "已入住":
          res = "success";
          break;
        case "打扫中":
          res = "danger";
          break;
        case "待付款":
          res = "warning";
          break;
        case "订单已取消":
          res = "info";
          break;
        case "已付款":
          res = "success";
          break;
        case "打扫完成":
          res = "success";
          break;
        case "等待打扫":
          res = "warning";
          break;

        default:
          break;
      }
      return res;
    },
    searchInputClear() {
      this.getorderlist();
    },
    searchInputChange() {
      //当搜索框值为空，刷新数据
      !this.searchInput_val && this.getorderlist();
    },
    async search_btn() {
      //搜索框查询
      const res = await this.$http.post("searchorder", {
        searchData: {
          $or: [
            { remarks: this.searchInput_val.trim() },
            { paid: parseInt(this.searchInput_val.trim()) },
            { discountPaid: parseInt(this.searchInput_val.trim()) },
            { status: this.searchInput_val.trim() },
            { order_time: this.searchInput_val.trim() },
            { createWay: this.searchInput_val.trim() }
          ]
        },
        searchInput_val: this.searchInput_val.trim()
      });
      this.orderlist = res.data;
    }
  },
  created() {
    this.getorderlist();
    this.getroomlist();
    this.getuserlist();
  }
};
</script>

<style scoped>
.UsersCard {
  width: 100%;
  height: 100%;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 100px;
  color: #99a9c5;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.fenye {
  text-align: center;
}
.btnDiv {
  text-align: center;
}
.checkinPeopleDiv {
  width: 550px;
  border: 1px solid #f1f1f1;
  border-radius: 15px;
}
.checkinDiv {
  text-align: center;
}
</style>