<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div id="type" class="card"></div>
      </el-col>
      <el-col :span="12">
        <div id="comment" class="card"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const echarts = require("echarts");
let resultData = [];
export default {
  data() {
    return {
      typeOptions: {
        title: {
          text: "房型热度"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: ["单人间", "双人间", "三人间", "限时特惠房", "会员专享房"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: resultData
          }
        ]
      },
      commentOptions: {
        title:{
          text:'酒店评价'
        },
        tooltip: {},
    
        series: [
          {
            name: "评分",
            type: "pie",
            // radius: "55%",
            data: [
              {
                value: 111,
                name: "服务态度",
                itemStyle: {
                  color: "#5c7bd9"
                }
              },
              {
                value: 222,
                name: "设备设施",
                itemStyle: {
                  color: "#9fe080"
                }
              },
              {
                value: 222,
                name: "舒适程度",
                itemStyle: {
                  color: "#fdd55d"
                }
              },
              {
                value: 222,
                name: "环境卫生",
                itemStyle: {
                  color: "#ff7070"
                }
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    async getdata() {
      const res = await this.$http.get("rest/orders");

      const getdatafn = type => {
        return res.data.filter(item => {
          return item.room.type == type;
        }).length;
      };
      resultData.push(
        getdatafn("单人间"),
        getdatafn("双人间"),
        getdatafn("三人间"),
        getdatafn("限时特惠房"),
        getdatafn("会员专享房")
      );
      // this.options.series[0].data = [...data]
    }
  },
  created() {},
  async mounted() {
    // 基于准备好的dom，初始化echarts实例
    var typeChart = echarts.init(document.getElementById("type"));
    var commentChart = echarts.init(document.getElementById("comment"));
    //等待返回数据后再展示数据
    await this.getdata();
    //展示数据
    typeChart.setOption(this.typeOptions);
    commentChart.setOption(this.commentOptions);
  }
};
</script>

<style scoped>
.card {
  width: 600px;
  height: 400px;
  background-color: #ffffff;
  box-shadow: 1px 3px 10px #c8c8c8;
}
</style>