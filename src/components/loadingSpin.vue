<template>
  <van-overlay :show="show" @click="show = false">
    <!-- <div class="wrapper" @click.stop> -->
      <van-loading type="spinner" color="#1989fa" />
      <!-- <div class="block" /> -->
    <!-- </div> -->
  </van-overlay>
</template>

<script>
import { Overlay,Loading } from "vant";
export default {
  name: "loadingSpin",
  props: {

  },
  data() {
    return {
       show: true
    };
  }
};
</script>

<style lang="stylus" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
</style>
