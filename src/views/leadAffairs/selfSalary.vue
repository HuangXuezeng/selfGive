<template>
  <div>
    <div class="box">
      <!-- <div class="box_left" v-if="flag">
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
      </div> -->
      <van-sticky>
        <van-tabs 
        v-model="activeKey"
        :swipeable="true"
        type="card"
        color="#fc5f10"
        line-height="4px">
          <van-tab title="花名册" to="roster"></van-tab>
          <van-tab title="人员结构" to="perStructure"></van-tab>
          <van-tab title="人员编制" to="organization" v-if="isHaveBianzhi"></van-tab>
          <van-tab title="人员效率" to="humanEffect" v-if="isHaveRenxiao"></van-tab>
          <van-tab title="人员异动" to="changes"></van-tab>
          <van-tab title="人员流失" to="retention"></van-tab>
        </van-tabs>
      </van-sticky>
      <router-view />
    </div>
  </div>
</template>
<script>
import { Sidebar, SidebarItem, Icon, Sticky } from "vant";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      // active: 1,
      flag: true,
      hideleArr: true,
      showArr: false,
      isHaveBianzhi: true,
      isHaveRenxiao: true
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
  created() {
    this.isHaveQx()
  },
  methods: {
    // 根据权限显示隐藏编制和人效
    isHaveQx(){
      if(localStorage.getItem("isHaveBianzhi") == "N"){
        this.isHaveBianzhi = false
      };
      if(localStorage.getItem("isHaveRenxiao") == "N"){
        this.isHaveRenxiao = false
      };
    },
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
    toRoster(){
      alert('花名册')
      this.$router.push({name:'roster'})
    },
    toChanges(){
      this.$router.push({name:'changes'})
    },
    handleFn(){
      this.$router.push({name:'selfHome'})
    },
    ...mapMutations({
      save_type: "save_type",
      arr_flag: "arr_flag"
    })
  },
  mounted() {
    let that = this
    dd.ready(() => {
      dd.biz.navigation.setRight({
          // show: false,//控制按钮显示， true 显示， false 隐藏， 默认true
          control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
          text: '首页',//控制显示文本，空字符串表示显示默认文本
          onSuccess : function(result) {
              //如果control为true，则onSuccess将在发生按钮点击事件被回调
              /*
              {}
              */
            that.$router.push({name:'selfHome'})
          },
          onFail : function(err) {}
      });
    })

    //pc端返回事件
    DingTalkPC.ready(() => {
      DingTalkPC.addEventListener('leftBtnClick', handleFn)
    })
  }
};
</script>
<style>
  .van-tabs__nav--card{
    margin: 0
  }
  .van-tab__text--ellipsis{
    font-weight: 700;
  }
  .van-tabs__nav--card .van-tab.van-tab--active{
    background-color: #fc5f10;
  }
  .van-tabs__nav--card{
    border: 1px solid #fc5f10;
  }
</style>
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
  .van-tab-active {
    background-color #ccc
  }
}
</style>