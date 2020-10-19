<template>
  <div v-if="showNodata">
    <van-empty
      class="custom-image"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="暂无数据"
    />
  </div>
</template>

<script>
import {
  Empty
} from "vant";
export default {
  name: "noData",
  props: {
    showNodata: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // defaultAvatar: "src/assets/timg.jpg"
    };
  }
};
</script>

<style>
</style>
