<template>
  <div>
    <div class="box">
      <div class="box_left" v-if="flag">
        <!-- 左导航栏 -->
        <van-sidebar v-model="activeKey" @change="onChange" class="van-sidebar">
          <van-sidebar-item title="花名册" to="roster" />
          <van-sidebar-item title="流失率" to="retention" />
          <van-sidebar-item title="人员结构" to="perStructure" />
          <van-sidebar-item title="人效分析" to="humanEffect" />
          <van-sidebar-item title="人员异动" to="changes" />
        </van-sidebar>
      </div>
      <div class="box_right" ref="right">
        <span @click="hiddle" class="arrow" v-if="hideleArr">
          <van-icon name="arrow-left" color="orange" />
        </span>
        <span @click="show" class="arrow" v-if="showArr">
          <van-icon name="arrow" color="orange" />
        </span>
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import { Sidebar, SidebarItem, Icon } from "vant";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      // activeKey: 0,
      flag: true,
      hideleArr: true,
      showArr: false
    };
  },
  computed: {
    activeKey: {
      //getter  获取activeKey默认值
      get: function() {
        return this.$store.state.type;
      },
      //setter  修改activeKey的默认值
      set: function(newVal) {
        this.$store.state.type = newVal;
      }
    }
  },
  created() {},
  methods: {
    //隐藏导航栏
    hiddle() {
      this.arr_flag(1); //vuex中赋值标识
      this.flag = false;
      this.showArr = true;
      this.hideleArr = false;
      // document.getElementsByClassName('box_right')[0].style.width = 100+'%'
      this.$refs.right.style.width = 100 + "%";
      this.$refs.right.children[0].style.left = 0;
    },
    show() {
      this.arr_flag(2);
      this.flag = true;
      this.hideleArr = true;
      this.showArr = false;
      this.$refs.right.style.width = "";
      this.$refs.right.children[0].style.left = "";
    },
    //导航栏点击时
    onChange() {
      // console.log(document.getElementsByClassName("box")[0].scrollTop)
      // console.log(document.getElementsByClassName("box_right"))
      // document.getElementsByClassName("box_right")[0].scrollTop = 0
      // console.log(document.body.scrollTop)
      // document.getElementsByClassName("rightcont")[0].scrollTop = 0
    },
    // scrollHandle(){
    //     let top = document.getElementsByClassName("container")[0].scrollTop;    // 获取页面滚动高度
    //     console.log(top);
    // },
    ...mapMutations({
      save_type: "save_type",
      arr_flag: "arr_flag"
    })
  },
  mounted() {
    // console.log(this.$refs.right.style.height)
    // window.addEventListener('scroll',this.scrollHandle);//绑定页面滚动事件
  }
};
</script>
<style lang="stylus" scoped>
.box {
  width: 100%;
  height: 100%;

  .box_left {
    float: left;
    height: 100%;
    width: 23%;
    background-color: #f7f8fa;

    .van-sidebar {
      position: fixed;
      top: 0;
      bottom: 0;
      overflow-y: auto;
      overflow-x: hidden;
      background-color: #f7f8fa;
      width: 23%;
    }
  }

  .box_right {
    // position relative
    float: right;
    height: 100%;
    overflow: auto;
    width: 77%;

    .arrow {
      position: fixed;
      z-index: 99;
      left: 22%;
      bottom: 50%;
    }
  }
}
</style>