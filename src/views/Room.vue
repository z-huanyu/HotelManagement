<template>
  <div>
    <!-- 导航区域 -->
    <my-nav></my-nav>
    <!-- 搜索 -->
    <div class="search d-flex ai-center">
      <el-row class="w-100" :gutter="20">
        <el-col :offset="6" :span="10">
          <el-input
            placeholder="输入你需要搜索的房间名称或房间号"
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
    </div>

    <div class="bgc">
      <!-- 筛选 -->
      <div class="select">
        <p>房间类型</p>
        <div>
          <el-checkbox-group v-model="checkboxGroup1">
            <el-checkbox-button
              v-for="room in rooms"
              :label="room._id"
              :key="room._id"
              @change="roomChange(checkboxGroup1)"
            >{{room.roomType}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
        <p>楼层</p>
        <div>
          <el-checkbox-group v-model="checkboxGroup2">
            <el-checkbox-button
              v-for="floor in floors"
              :label="floor._id"
              :key="floor._id"
              @change="floorChange(checkboxGroup2)"
            >{{floor.roomFloor}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>

      <p>
        查询到
        <span class="text-blue">{{roomlist.length}}</span> 个房间
      </p>
      <!-- 房间列表 -->
      <div
        class="roomlist_div d-flex"
        v-for="i in roomlist.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        :key="i._id"
      >
        <div>
          <img class="roomimg" :src="i.cover" alt="404" />
        </div>
        <div class="roomnumber text-center">
          <p>{{i.name}}</p>
          <p>{{i.number}}号房</p>
          <p>{{i.typeID.roomType}}</p>
          <p>{{i.floorID.roomFloor}}</p>
        </div>
        <div class="roomevaluate">
          <p>
            <span class="text-blue">{{commentValue(i.commentID)}}</span>分/5分
          </p>
          <p>
            <el-rate
              :value="commentValue(i.commentID)"
              disabled
              score-template="{value}"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            >></el-rate>
          </p>
          <p>{{i.commentID ? i.commentID.length : 0}}条评价</p>
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
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="roomlist.length"
        class="text-center mt-3"
      ></el-pagination>
    </div>
     <my-footer></my-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkboxGroup1: [],
      checkboxGroup2: [],
      rooms: [],
      floors: [],
      pageSize: 5, //一页多少数据
      currentPage: 1, //当前页数
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
    handleSizeChange(val) {
      //当前没有数据条数
      this.pageSize = val
    },
    handleCurrentChange(val) {
      //当前页码
      this.currentPage = val
    },
    async getroomlist() {
      const res = await this.$http.get("roomlist", {
        params: { switch: 1, status: "空闲" }
      }); //查询房间列表，后端需要用query接收params
      this.roomlist = res.data;
      // console.log(this.roomlist);
    },
    async getroomtype() {
      const res = await this.$http.get("roomtype");
      this.rooms = res.data;
    },
    async getroomfloor() {
      const res = await this.$http.get("roomfloor");
      this.floors = res.data;
    },
    async floorChange(checkboxGroup2) {
      // console.log(checkboxGroup2);
      //筛选不同楼层的房间
      if (checkboxGroup2.length) {
        const res = await this.$http.post("roomlist", {
          typeID: this.checkboxGroup1,
          floorID: checkboxGroup2
        });

        this.roomlist = res.data;
      } else {
        this.getroomlist();
      }
    },
    async roomChange(checkboxGroup1) {
      //筛选不同房型的房间

      if (checkboxGroup1.length) {
        const res = await this.$http.post("roomlist", {
          typeID: checkboxGroup1,
          floorID: this.checkboxGroup2,

        });

        this.roomlist = res.data;
      } else {
        this.getroomlist();
      }
    },
    async search_btn() {
      //搜索框查询
      if (this.searchInput_val != "") {
        const res = await this.$http.post("roomlist", {
          name: this.searchInput_val,
          number: this.searchInput_val
        });
        this.roomlist = res.data;
      } else {
        this.$message({ type: "warning", message: "搜索内容不能为空！" });
      }
    },
    searchInputClear() {
      this.getroomlist();
    },
    searchInputChange() {
      //当搜索框值为空，刷新数据
      !this.searchInput_val && this.getroomlist();
    },
    commentValue(commentID) {
      if (commentID && commentID.length > 0) {
        let result = 0;
        commentID.forEach(item => {
          result += item.generalComment;
        });
        return +(result / commentID.length).toFixed(1);
      } else {
        return 0;
      }
    }
  },
  created() {
    this.getroomlist();
    this.getroomfloor();
    this.getroomtype();
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