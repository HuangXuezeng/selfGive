<template>
  <div>
    <router-view />
    <van-tabbar v-model="active" @change="onChange" route>
      <van-tabbar-item icon="friends-o" replace to="/cadreArchives"
        >同事</van-tabbar-item
      >
      <van-tabbar-item icon="cluster" replace to="/institutions"
        >组织</van-tabbar-item
      >
      <!-- <van-tabbar-item icon="friends-o">标签3</van-tabbar-item>
    <van-tabbar-item icon="setting-o">标签4</van-tabbar-item> -->
    </van-tabbar>
  </div>
</template>
<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  name: "cadArcTanbber",
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
