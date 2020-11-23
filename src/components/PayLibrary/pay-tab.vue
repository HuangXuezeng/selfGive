<template>
  <div>
    <!-- <router-view />
    <div class="resetVantfixed">
    <van-tabbar v-model="active" @change="onChange" class="resetVantfixed" route>
      <van-tabbar-item icon="home-o" replace to="/SalaryLibrary">定薪</van-tabbar-item>
      <van-tabbar-item icon="medal" replace to="/ProgressRewards"
        >奖励</van-tabbar-item
      >
      <van-tabbar-item icon="bill" replace to="/annualSalaryPercentile">人工费用</van-tabbar-item>
      <van-tabbar-item icon="bar-chart-o" replace to="/perCapitaWage" >员工收入</van-tabbar-item>

    </van-tabbar>
    </div> -->
    <div>
      <van-sticky>
        <van-tabs
          v-model="active"
          ref="adresResultstab"
          type="card"
          sticky
          animated
        >
          <van-tab
            title="定薪"
            replace
            to="/SalaryLibrary"
            name="SalaryLibrary"
          >
          </van-tab>
          <van-tab
            title="奖励"
            replace
            to="/ProgressRewards"
            name="ProgressRewards"
          >
          </van-tab>
          <van-tab
            title="人工费用"
            replace
            to="/annualSalaryPercentile"
            name="annualSalaryPercentile"
          >
          </van-tab>
          <van-tab
            title="员工收入"
            replace
            to="/perCapitaWage"
            name="perCapitaWage"
          >
          </van-tab>
        </van-tabs>
      </van-sticky>
    </div>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  name: "payTab",
  data() {
    return {
      active: "",
    };
  },
  methods: {
    changtab(tab) {
      this.active = tab;
      this.$refs.adresResultstab.resize();
    },
  },
};
</script>

<style>
</style>
