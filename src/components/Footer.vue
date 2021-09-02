<template>
  <div>
    <div class="footer bg-black">
      <div class="footertBox mx-6 text-white d-flex jc-between">
        <!-- 左内容 -->
        <div class="leftBox text-white">
          <span class="leftSpan">关于我们</span>
          <span class="leftSpan">联系我们</span>
          <span class="leftSpan">加入我们</span>
          <span class="leftSpan">常见问题</span>
          <span class="leftSpan">用户体验反馈</span>
        </div> 
        <!-- 右内容 -->
        <div class="rightBox d-flex py-4">
          <div class="phone">
              <h3>客服联系电话</h3>
              <h3>13060622846</h3>
          </div>
          <div>
              <img class="weixinimg" src="../assets/images/weixin.png" alt="">
              <h3 class="text-center">关注公众号</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.footer {
  height: 200px;
}
.footerBox {
  padding: 40px;
}
.leftBox {
    width: 500px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-content: center;
    
}
.leftSpan{
    margin: 0 5px;
    text-align: center;
    line-height: 100px;
    cursor: pointer;
}
.weixinimg{
    width: 100px;
    height: 100px;
}
.rightBox{
    width: 300px;
    justify-content: space-between;
}
.phone{
    padding: 30px 0;
}
</style>