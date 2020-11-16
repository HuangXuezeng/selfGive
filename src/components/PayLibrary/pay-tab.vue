<template>
  <div>
    <router-view />
    <div class="resetVantfixed">
    <van-tabbar v-model="active" @change="onChange" class="resetVantfixed" route>
      <van-tabbar-item icon="home-o" replace to="/SalaryLibrary">定薪</van-tabbar-item>
      <van-tabbar-item icon="medal" replace to="/ProgressRewards"
        >奖励</van-tabbar-item
      >
      <van-tabbar-item icon="bill" replace to="/annualSalaryPercentile">人工费用</van-tabbar-item>
      <van-tabbar-item icon="bar-chart-o" replace to="/perCapitaWage" >员工收入</van-tabbar-item>

    </van-tabbar>
    </div>
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
