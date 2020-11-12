<template>
  <van-overlay :show="cubeshow" @click="shutdown">
    <div class="wrapper" @click.stop>
      <van-loading type="spinner" color="#1989fa" />
    </div>
  </van-overlay>
</template>

<script>
import { Overlay,Loading } from "vant";
export default {
  name: "loadingSpin",
  props: {
    show: {
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      cubeshow:true
    };
  },
  created(){
    this.cubeshow = this.show
  },
  methods:{
    shutdown(){
      this.cubeshow = false
    },
    showUp(){
      this.cubeshow = true
    }
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
