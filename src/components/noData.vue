<template>
  <div v-if="showNodata" :class="heightAuto">
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
    },
    heightAuto:{
      type:String,
      default: ''
    }
  },
  data() {
    return {
      // defaultAvatar: "src/assets/timg.jpg"
    };
  }
};
</script>

<style lang="stylus">
.height500{
  height: 500px;
}
</style>
