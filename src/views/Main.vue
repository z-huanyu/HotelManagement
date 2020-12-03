<template>
  <div>
    <!-- 轮播图 -->
    <swiper class="swiper_styles" ref="mySwiper" :options="swiperOptions">
      <swiper-slide>
        <img src="../assets/images/img1.png" alt />
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/img2.png" alt />
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/img3.png" alt />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- 房间卡片列表 -->
    <div class="mt-5 mx-6">
      <div class="room_lists d-flex flex-wrap jc-between">
        <div>
          <router-link :to="{path:'/room',query:{data:'../assets/images/room1.jpg'}}">
            <img src="../assets/images/room1.jpg" alt />
          </router-link>
        </div>
        <div>
          <router-link to="/room">
            <img src="../assets/images/room2.jpg" alt />
          </router-link>
        </div>
        <div>
          <router-link to="/room">
            <img src="../assets/images/room3.jpg" alt />
          </router-link>
        </div>
        <div>
          <router-link to="/room">
            <img src="../assets/images/room4.jpg" alt />
          </router-link>
        </div>
        <div>
          <router-link to="/room">
            <img src="../assets/images/room5.jpg" alt />
          </router-link>
        </div>
        <div>
          <router-link to="/room">
            <img src="../assets/images/room6.jpg" alt />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
            
<script>
export default {
  data() {
    return {
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
<style>
.room_lists div {
  width: 350px;
  height: 230px;
  margin-bottom: 30px;
  border-radius: 5px;
  overflow: hidden;
}
</style>


