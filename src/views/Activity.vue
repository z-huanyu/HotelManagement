<template>
  <div>
    <my-nav ref="mynav"></my-nav>
    <header class="bg-img"></header>
    <div class="bgc">
      <h1>限时领取酒店订房优惠卷</h1>
      <span class="border"></span>
      <div class="d-flex jc-between">
        <div class="discountBox">
          <div class="mask">限时优惠卷</div>
          <img class="discountImg" src="../assets/images/room5.jpg" alt />
        </div>
        <div class="discountBox">
          <div class="mask">限时优惠卷</div>
          <img class="discountImg" src="../assets/images/vip.jpg" alt />
        </div>
      </div>
      <h1 class="mt-6">订房送礼品</h1>
      <span class="border"></span>
      <div class="d-flex flex-wrap jc-between">
        <div class="giftBox">
          <img class="giftImg" src="../assets/images/gift1.png" alt />
        </div>
        <div class="giftBox">
          <img class="giftImg" src="../assets/images/gift2.png" alt />
        </div>
        <div class="giftBox">
          <img class="giftImg" src="../assets/images/gift3.png" alt />
        </div>
        <div class="giftBox">
          <img class="giftImg" src="../assets/images/gift4.png" alt />
        </div>
        <div class="giftBox">
          <img class="giftImg" src="../assets/images/gift5.png" alt />
        </div>
        <div class="giftBox">
          <img class="giftImg" src="../assets/images/gift6.png" alt />
        </div>
        <div class="giftBox">
          <img class="giftImg" src="../assets/images/gift7.png" alt />
        </div>
        <div class="giftBox">
          <img class="giftImg" src="../assets/images/gift8.png" alt />
        </div>
        <div class="giftBox">
          <img class="giftImg" src="../assets/images/gift9.png" alt />
        </div>
      </div>
    </div>
     <my-footer></my-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.bg-img {
  width: 100vw;
  height: 750px;
  background: url(../assets/images/activity.png) no-repeat;
}
.bgc {
  width: 100%;
  padding: 20px 300px;
}
.discountBox {
  position: relative;
  width: 500px;
  height: 400px;
  cursor: pointer;
}
.mask {
  position: absolute;
  width: 500px;
  height: 400px;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  font-size: 30px;
  text-align: center;
  line-height: 400px;
}
.border {
  display: inline-block;
  width: 100px;
  border-bottom: 3px solid #9bbea2;
}
.discountImg {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.giftBox {
  width: 350px;
  height: 350px;
  margin: 10px 0;
  box-shadow: 1px 3px 10px #c8c8c8;
}
.giftImg {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>