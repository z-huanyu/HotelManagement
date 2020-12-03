<template>
  <div>
    <!-- 导航区域 -->
    <header>
      <div class="d-flex jc-around my-4">
        <router-link to="/main">雅馨酒店</router-link>
        <router-link to="/main">首页</router-link>
        <router-link to="/room">房间</router-link>
        <router-link to="/login">登录</router-link>
        <router-link to="/register">注册</router-link>
      </div>
    </header>
    <!-- 内容区域 -->
    <article>
      <!-- 路由占位符 -->
      <router-view></router-view>
    </article>
  </div>
</template>
          


