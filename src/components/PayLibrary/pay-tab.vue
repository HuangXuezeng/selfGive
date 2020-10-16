<template>
  <div>
    <router-view />
    <van-tabbar v-model="active" @change="onChange" route>
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="bar-chart-o" replace to="/perCapitaWage" >人均工资</van-tabbar-item>
      <van-tabbar-item icon="send-gift-o" replace to="/ProgressRewards"
        >奖励进度</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  name: "payTab",
  data() {
    return {
      active: 0
    };
  },
  methods: {
    onChange(index) {}
  }
};
</script>

<style>
</style>
