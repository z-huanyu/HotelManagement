<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div id="roomTypepopularity" class="card"></div>
      </el-col>
      <el-col :span="12">
        <div id="generalComment" class="card"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      roomTypeArr: [], //房间类型
      commentList: [],
      roomTypePopularityOption: {
        title: {
          left: "center",
          text: "房型热度"
        },
        tooltip: {
          //提示数据
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        xAxis: {
          name: "房型",
          type: "category",
          data: []
        },
        yAxis: {
          name: "热度",
          type: "value"
        },
        series: [
          {
            name: "热度",

            data: [],
            type: "bar"
          }
        ]
      },
      commentOption: {
        title: {
          left: "center",
          text: "酒店评价"
        },
        tooltip: {
          //提示数据
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        xAxis: {
          name: "评价类别",
          type: "category",
          data: ["舒适程度", "设备设施", "环境卫生", "服务态度"]
        },
        yAxis: {
          name: "评分",
          type: "value"
        },
        series: [
          {
            name: "分数",
            data: [],
            type: "bar"
          }
        ]
      }
    };
  },
  methods: {
    async getRoomTypeTitle() {
      const res = await this.$http.get("rest/categories");
      res.data.forEach(item => {
        this.roomTypePopularityOption.xAxis.data.push(item.roomType);
      });
      this.roomTypeArr = res.data;
    },
    async getRoomTypeData() {
      const res = await this.$http.get(`rest/orders`);
      this.roomTypeArr.forEach(type => {
        this.roomTypePopularityOption.series[0].data.push(
          res.data.filter(item => {
            return item.roomID.typeID == type._id;
          }).length
        );
      });
    },
    async getComment() {
      const res = await this.$http.get("rest/comments");
      this.commentList = res.data;
    },
    getCommentDate() {
      let res = [];
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
      res.push(
        (totolComfortabel.reduce((x, y) => x + y) / totolComfortabel.length).toFixed(1)
      );
      res.push((totolEquipment.reduce((x, y) => x + y) / totolEquipment.length).toFixed(1))
      res.push(
        (totolEnvironment.reduce((x, y) => x + y) / totolEnvironment.length).toFixed(1)
      );
      res.push((totolService.reduce((x, y) => x + y) / totolService.length).toFixed(1));
      this.commentOption.series[0].data = res;
    }
  },
  created() {
    this.getComment();
  },
  async mounted() {
    //渲染房型热度
    var roomTypepopularity = echarts.init(
      document.getElementById("roomTypepopularity")
    );
    await this.getRoomTypeTitle();
    await this.getRoomTypeData();
    roomTypepopularity.setOption(this.roomTypePopularityOption);

    //渲染酒店评价
    var generalComment = echarts.init(
      document.getElementById("generalComment")
    );
    this.getCommentDate();
    generalComment.setOption(this.commentOption);
  }
};
</script>

<style scoped>
#roomTypepopularity {
  width: 600px;
  height: 500px;
}
.card {
  box-shadow: 1px 3px 10px #c8c8c8;
}
#generalComment {
  width: 600px;
  height: 500px;
}
</style>