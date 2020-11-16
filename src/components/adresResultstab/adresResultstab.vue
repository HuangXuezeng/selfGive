<template>
  <div>
    <router-view />
    <div class="resetVantfixed">
      <van-tabbar v-model="active" @change="onChange" route :placeholder='true'>
        <van-tabbar-item icon="coupon-o" replace to="/adresResultps"
          >干部分布</van-tabbar-item
        >
        <van-tabbar-item icon="cluster" replace to="/cadresChange"
          >干部变化</van-tabbar-item
        >
        <!-- <van-tabbar-item icon="friends-o">标签3</van-tabbar-item>
    <van-tabbar-item icon="setting-o">标签4</van-tabbar-item> -->
      </van-tabbar>
    </div>
  </div>
</template>
<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  name: "adresResultsTanbber",
  data() {
    return {
      active: 0
    };
  },
  methods: {
    onChange(index) {
    }
  }
};
</script>

<style>
</style>
