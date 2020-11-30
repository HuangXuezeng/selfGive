<template>
  <div>
    <van-sticky>
      <van-tabs
        v-model="active"
        ref="adresResultstab"
        type="card"
        sticky
        animated
        :swipeable='true'
      >
      <van-tab
          title="整体情况"
          replace
          to="/cadresChange"
          name="cadresChange"
        >
          </van-tab
        >
        <van-tab
          title="干部结构"
          replace
          to="/adresResultps"
          name="adresResultps"
        >
          </van-tab
        >


         <van-tab
          title="干部保留"
          replace
          to="/cadreReserve"
          name="cadreReserve"
        >
          </van-tab
        >
        <van-tab
          title="干部盘点"
          replace
          to="/cadresInventory"
          name="cadresInventory"
        >
          </van-tab
        >
        <van-tab
          title="职业发展路径"
          replace
          to="/careerPath"
          name="careerPath"
        >
          </van-tab
        >
      </van-tabs>
    </van-sticky>
  </div>
</template>
<script>
import { Tab, Tabs, Sticky } from "vant";
export default {
  name: "adresResultsTanbber",
  data() {
    return {
      active: "",
    };
  },
  methods: {
    changtab(tab) {
      this.active = tab;
      localStorage.setItem('activeTab',this.active)
      this.$refs.adresResultstab.resize();
    },
  },
};
</script>

<style>
</style>
