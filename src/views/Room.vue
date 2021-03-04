<template>
  <div>
    <!-- 导航区域 -->
    <my-nav></my-nav>
    <!-- 搜索 -->
    <div class="search d-flex ai-center">
      <el-row class="w-100" :gutter="20">
        <el-col :offset="6" :span="10">
          <el-input placeholder="输入你需要搜索的房间类型" v-model="searchInput_val" clearable @clear="searchInputClear" @change="searchInputChange" ref="searchInputRef"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="search_btn">搜索</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="bgc">
      <!-- 筛选 -->
      <div class="select">
        <p>房间类型</p>
        <div>
          <el-checkbox-group v-model="checkboxGroup1">
            <el-checkbox-button
              v-for="room in rooms"
              :label="room"
              :key="room"
              @change="roomChange(checkboxGroup1)"
            >{{room}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
        <p>楼层</p>
        <div>
          <el-checkbox-group v-model="checkboxGroup2">
            <el-checkbox-button
              v-for="floor in floors"
              :label="floor"
              :key="floor"
              @change="floorChange(checkboxGroup2)"
            >{{floor}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>
      <!-- 房间列表 -->
      <div class="roomlist_div d-flex" v-for="i in roomlist" :key="i._id">
        <div>
          <img class="roomimg" :src="i.cover" alt="404" />
        </div>
        <div class="roomnumber text-center">
          <p>{{i.number}}号房</p>
          <p>{{i.type}}</p>
          <p>{{i.floor}}</p>
        </div>
        <div class="roomevaluate">
          <p><span class="text-blue">{{i.comment.length>0 ? i.comment[0].generalComment : 0 }}</span>分/5分</p>
          <p>
            <el-rate
                :value="commentValue(i.comment)"
                disabled
                score-template="{value}"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
              >></el-rate>
          </p>
          <p>{{i.comment.length}}条评价</p>
        </div>
        <div class="roomprice">
          <p class="text-yellow">
            ￥
            <span class="fs-xxxl">{{i.prices}}</span>
          </p>
          <!-- <router-link class="TO_roomdetail" :to="{name:'roomdetail',params:{data:i}}">查看详情</router-link> -->
          <button class="TO_roomdetail" @click="$router.push(`/roomdetail/${i._id}`)">查看详情</button>
        </div>
      </div>
    </div>

    <!-- 房间信息 -->
    <!-- <div class="mx-6">
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
    </div>-->
    <!-- 订单弹框 -->
    <!-- <el-dialog title="预定订单" :visible.sync="dialogVisible">
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
    </el-dialog> -->
  </div>
</template>

<script>
const roomsOptions = ["单人间", "双人间", "三人间"];
const floorOptions = ["一楼", "二楼", "三楼", "四楼"];
export default {
  data() {
    return {
      checkboxGroup1: [],
      checkboxGroup2: [],
      rooms: roomsOptions,
      floors: floorOptions,

      searchInput_val: "", //搜索框输入的内容

      // switch: { "switch": '1' },
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
      const res = await this.$http.get("roomlist", {
        params: { "switch": 1 }
      }); //查询房间列表，后端需要用query接收params
      this.roomlist = res.data;
      console.log(this.roomlist)
    },
    async floorChange(checkboxGroup2) {
      //筛选不同楼层的房间
      if (checkboxGroup2.length) {
        const res = await this.$http.post("roomlist", {
          $or: [
            { "floor": { $in: checkboxGroup2 } },
            { type: { $in: this.checkboxGroup1 } }
          ]
        });
        // console.log(this.checkboxGroup1);
        this.roomlist = res.data;
      } else {
        this.getroomlist();
      }
    },
    async roomChange(checkboxGroup1) {
      //筛选不同房型的房间
      if (checkboxGroup1.length) {
        const res = await this.$http.post("roomlist", {
          $or: [
            { "floor": { $in: this.checkboxGroup2 } },
            { type: { $in: checkboxGroup1 } }
          ]
        });
        // console.log(this.checkboxGroup2);
        this.roomlist = res.data;
      } else {
        this.getroomlist();
      }
    },
    async search_btn() {//搜索框模糊查询
      const res = await this.$http.post("roomlist",{$or:[{type: this.searchInput_val},{"floor":this.searchInput_val},{number: this.searchInput_val}]});
      this.roomlist = res.data
      
    },
    searchInputClear(){
      this.getroomlist()
    },
    searchInputChange(){//当搜索框值为空，刷新数据
      !this.searchInput_val && this.getroomlist()
    },
    commentValue(comment){
      return comment.length>0 ? comment[0].generalComment : 0
    }
  },
  created() {
    this.getroomlist();
  }
};
</script>

<style scoped>
.select {
  border-radius: 3px;
  background-color: #ffffff;
  padding: 30px;
  margin-top: 20px;
}
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
.search {
  width: 100%;
  height: 80px;
  padding: 0 200px;
}
.bgc {
  width: 100%;
  padding: 20px 200px;
  background-color: #f7f7f7;
}
.roomlist_div {
  border-radius: 3px;
  background-color: #ffffff;
  padding: 30px;
  margin-top: 20px;
}
.roomlist_div:hover {
  box-shadow: -1px 5px 10px #c8c8c8;
  /* box-shadow: 水平阴影(左右) 垂直阴影(上下) 模糊程度 颜色; */
}
.roomnumber {
  width: 40%;
}
.roomevaluate {
  width: 20%;
  border-left: 1px solid #e2e2e2;
  border-right: 1px solid #e2e2e2;
  text-align: center;
}
.roomprice {
  width: 20%;
  margin-left: 50px;
  text-align: center;
}
.roomimg {
  width: 200px;
  height: 150px;
}
.TO_roomdetail {
  display: inline-block;
  width: 150px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 5px;
  background-color: #66b1ff;
  border: none;
}
.TO_roomdetail:hover {
  background-color: #409eff;
  color: white;
  cursor: pointer;
}
</style>