<template>
  <div>
    <!-- 导航区域 -->
    <header>
      <div class="welocome text-white d-flex px-7 ai-center jc-between">
        <span>你好，欢迎光临本酒店~</span>
        <div class="login_register" ref="login_registerRef">
          <router-link class="text-white mx-3 login_btn" to="/login">登录</router-link>
          <router-link class="text-white mx-3 register" to="/register">注册</router-link>
        </div>
        <div class="user d-flex jc-center ai-center" ref="userRef">
          <span class="user_span">Hi，{{username}}</span>
          <div class="user_information">
            <div class="information" @click="$router.push({name:'myinformation',params:{data:'myinformationRef'}});">个人信息</div>
            <div class="information" @click="$router.push({name:'myorder',params:{data:'myorderRef'}});">我的订单</div>
            <div class="information" @click="offLine">退出</div>
          </div>
        </div>
      </div>
      <div class="d-flex ai-center px-7 nav fs-xl jc-between">
        <div class="mr-5 text-white">
          <span class="hotel">&#xe60e;雅馨酒店</span>
        </div>
        <div class="nav_right d-flex ai-center jc-between">
          <router-link class="text-white nav_a" to="/">首页</router-link>
          <router-link class="text-white nav_a" to="/room">预订房间</router-link>
          <router-link class="text-white nav_a" to="/room">成为会员</router-link>
          <router-link class="text-white nav_a" to="/room">活动中心</router-link>
          <router-link class="text-white nav_a" to="/room">合作伙伴</router-link>
          <router-link class="text-white nav_a" to="/room">更多</router-link>
        </div>
      </div>
    </header>
    <!-- 轮播图 -->
    <swiper class="swiper_styles" ref="mySwiper" :options="swiperOptions">
      <swiper-slide>
        <img class="carousel_img" src="../assets/images/img1.png" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="carousel_img" src="../assets/images/img2.png" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="carousel_img" src="../assets/images/img3.png" alt />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- 房间卡片列表 -->
    <div class="mt-5 mx-6">
      <!-- <div class="room_lists d-flex flex-wrap jc-between">
        <div>
          <router-link :to="{path:'/room',query:{data:'../assest/images/room1.jpg'}}">
            <img src="../assets/images/room1.jpg" alt />
          </router-link>
        </div>
      </div>-->
      <ul>
        <p class="fs-xxxl text-center">限时特惠房</p>
        <li class="discount">
          <div class="d-flex">
            <div class="discount_div">
              <img class="w-100 h-100 discount_img" src="../assets/images/discount.jpg" alt />
            </div>
            <div class="ml-5">
              <p class="fs-xxxl">101号贵宾房</p>
              <p class="fs-xl text-yellow">
                ￥
                <span class="fs-xxxl text-yellow">198.00</span>
              </p>
              <p class="fs-xxl text-gray">标准双人床</p>
              <p class="fs-xl text-gray">地址：啊对哇对哇打底裤袜队</p>
              <div class="d-flex py-5">
                <div>
                  <img class="little_img my-3 mx-1" src="../assets/images/discount.jpg" alt />
                </div>
                <div>
                  <img class="little_img my-3 mx-1" src="../assets/images/discount.jpg" alt />
                </div>
                <div>
                  <img class="little_img my-3 mx-1" src="../assets/images/discount.jpg" alt />
                </div>
                <div>
                  <img class="little_img my-3 mx-1" src="../assets/images/discount.jpg" alt />
                </div>
              </div>
            </div>
          </div>
          <el-button class="yuding" type="primary">预订</el-button>
        </li>
        <li class="discount">
          <div class="d-flex">
            <div class="discount_div">
              <img class="w-100 h-100 discount_img" src="../assets/images/discount.jpg" alt />
            </div>
            <div class="ml-5">
              <p class="fs-xxxl">101号贵宾房</p>
              <p class="fs-xl text-yellow">
                ￥
                <span class="fs-xxxl text-yellow">198.00</span>
              </p>
              <p class="fs-xxl text-gray">标准双人床</p>
              <p class="fs-xl text-gray">地址：啊对哇对哇打底裤袜队</p>
              <div class="d-flex py-5">
                <div>
                  <img class="little_img my-3 mx-1" src="../assets/images/discount.jpg" alt />
                </div>
                <div>
                  <img class="little_img my-3 mx-1" src="../assets/images/discount.jpg" alt />
                </div>
                <div>
                  <img class="little_img my-3 mx-1" src="../assets/images/discount.jpg" alt />
                </div>
                <div>
                  <img class="little_img my-3 mx-1" src="../assets/images/discount.jpg" alt />
                </div>
              </div>
            </div>
          </div>
          <el-button class="yuding" type="primary">预订</el-button>
        </li>
      </ul>
    </div>
    <div class="division"></div>
    <div class="mt-5 mx-6">
      <ul>
        <p class="fs-xxxl text-center">会员专享房</p>
        <li class="discount">
          <div class="d-flex">
            <div class="discount_div">
              <img class="w-100 h-100 discount_img" src="../assets/images/vip.jpg" alt />
            </div>
            <div class="ml-5">
              <p class="fs-xxxl">101号贵宾房</p>
              <p class="fs-xl text-yellow">
                ￥
                <span class="fs-xxxl text-yellow">198.00</span>
              </p>
              <p class="fs-xxl text-gray">标准双人床</p>
              <p class="fs-xl text-gray">地址：啊对哇对哇打底裤袜队</p>
              <div class="d-flex py-5">
                <div>
                  <img class="little_img my-3 mx-1" src="../assets/images/vip.jpg" alt />
                </div>
                <div>
                  <img class="little_img my-3 mx-1" src="../assets/images/vip.jpg" alt />
                </div>
                <div>
                  <img class="little_img my-3 mx-1" src="../assets/images/vip.jpg" alt />
                </div>
                <div>
                  <img class="little_img my-3 mx-1" src="../assets/images/vip.jpg" alt />
                </div>
              </div>
            </div>
          </div>
          <el-button class="yuding" type="primary">预订</el-button>
        </li>
        <li class="discount">
          <div class="d-flex">
            <div class="discount_div">
              <img class="w-100 h-100 discount_img" src="../assets/images/vip.jpg" alt />
            </div>
            <div class="ml-5">
              <p class="fs-xxxl">101号贵宾房</p>
              <p class="fs-xl text-yellow">
                ￥
                <span class="fs-xxxl text-yellow">198.00</span>
              </p>
              <p class="fs-xxl text-gray">标准双人床</p>
              <p class="fs-xl text-gray">地址：啊对哇对哇打底裤袜队</p>
              <div class="d-flex py-5">
                <div>
                  <img class="little_img my-3 mx-1" src="../assets/images/vip.jpg" alt />
                </div>
                <div>
                  <img class="little_img my-3 mx-1" src="../assets/images/vip.jpg" alt />
                </div>
                <div>
                  <img class="little_img my-3 mx-1" src="../assets/images/vip.jpg" alt />
                </div>
                <div>
                  <img class="little_img my-3 mx-1" src="../assets/images/vip.jpg" alt />
                </div>
              </div>
            </div>
          </div>
          <el-button class="yuding" type="primary">预订</el-button>
        </li>
      </ul>
    </div>
    <my-footer></my-footer>
  </div>
</template>
            
<script>
export default {
  data() {
    return {
      username: "",
      swiperOptions: {
        pagination: {
          //轮播图分页
          el: ".swiper-pagination"
        },
        autoplay: true, //开启自动轮播
        loop: true //循环
        // Some Swiper option/callback...
      }
    };
  },
  methods: {
    loginChange() {
      this.$refs.login_registerRef.style.display = "none"; //隐藏登录/注册
      this.$refs.userRef.style.display = "flex"; //显示个人信息
    },
    offLine() {
      sessionStorage.clear();
      this.$router.go(0);
    }
  },
  created() {
    this.username = sessionStorage.username;
  },
  mounted() {
    sessionStorage.token && this.loginChange();
  }
  // computed: {
  //   swiper() {
  //     return this.$refs.mySwiper.$swiper;
  //   }
  // },
  // mounted() {
  //   console.log("Current Swiper instance object", this.swiper);
  //   //this.swiper.slideTo(3, 1000, true);
  // }
};
</script>
<style scoped>
/* Logo 字体 */

body {
  position: relative;
}
header {
  width: 100%;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
}
.discount {
  position: relative;
  margin-bottom: 10px;
}
.discount_div {
  width: 550px;
  height: 450px;
  overflow: hidden;
}
.discount_img {
  transition: all 0.5s;
}
.discount_div:hover .discount_img {
  transform: scale(1.3);
}
.little_img {
  width: 100px;
  height: 100px;
}
.yuding {
  position: absolute;
  right: 0;
  top: 15%;
  width: 130px;
  height: 50px;
}
.division {
  height: 50px;
  background-color: #f7f7f7;
}
.swiper_styles {
  height: 600px;
}
.carousel_img {
  height: 600px;
}
.welocome {
  width: 100%;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.4);
}
.nav {
  height: 60px;
}
.login_btn {
  display: inline-block;
  width: 100px;
  height: 28px;
  background-color: #66b1ff;
  border-radius: 8px;
  text-align: center;
  line-height: 28px;
}
.login_btn:hover {
  color: #f7f7f7;
}
.nav_right {
  width: 80%;
  line-height: 60px;
}
.nav_a {
  height: 60px;
}
.nav_a:hover {
  border-bottom: 2px solid #66b1ff;
}
.user {
  display: none;
  position: relative;
  width: 200px;
  height: 100%;
  text-align: center;
  cursor: pointer;
}
.user:hover .user_information {
  display: block;
}
.information {
  width: 100%;
  height: 35px;
  text-align: center;
  line-height: 35px;
  color: #999999;
  cursor: pointer;
  border: 1px solid #f9f9f9;
}
.user_information {
  display: none;
  position: absolute;
  top: 90%;
  z-index: 99;
  width: 150px;
  height: 105px;
  background-color: #ffffff;
  /* box-shadow: -1px 3px 8px #c8c8c8; */
}
.information:hover {
  background-color: #f9f9f9;
  color: #2c85df;
}
.user_span{
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
}
</style>


