<template>
  <div>
    <div class="bgccolor" v-if="manInfoFlag == 1">
      <div class="marginsides" v-for="items in Fachlist" :key="items.a0190">
        <div class="myContents">
          <div class="messageInfoos" @click="manageInfoMethod(items)">
            <!-- <span><img class="img" src="../../assets/timg.jpg" alt=""></span> -->
            <span>
              <img
                class="imgpps"
                :src="items.photo != null ? items.photo : defaultAvatar"
                alt
              />
            </span>
            <span class="resuName">{{ items.a0101 }}</span>
            <br />
            <div class="mangetouxiang">
              <span class="resuNamess">
                岗位：
                <i style="color:black">{{ items.gwName }}</i>
              </span>
              <span class="resuNamesss">
                职级：
                <i style="color:#ccc">{{
                  items.zjName ? items.zjName : items.a01516
                }}</i>
              </span>
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
    <div class="bgccolor" style="padding-bottom: 18vw;" v-if="manInfoFlag == 2">
      <van-row type="flex" justify="end" v-if="firstFlag == 1">
        <van-col span="12"
          ><van-button
            round
            icon="weapp-nav"
            color="linear-gradient(to right, #ff6034, #ee0a24)"
            size="small"
            @click="faMore"
            >更多子部门</van-button
          ></van-col
        >
      </van-row>
      <div v-if="!Fachlist.length">
        <van-empty
          class="custom-image"
          image="https://img.yzcdn.cn/vant/custom-empty-image.png"
          description="请点击更多子部门"
        />
      </div>
      <div v-if="Fachlist.length">
        <div class="marginsides" v-for="items in Fachlist" :key="items.a0190">
          <div class="myContents">
            <div class="messageInfoos" @click="manageInfoMethod(items)">
              <span>
                <img
                  class="img"
                  :src="items.photo != null ? items.photo : defaultAvatar"
                  alt
                />
              </span>
              <span class="resuName">{{ items.a0101 }}</span>
              <br />
              <div style="display: flex;flex-direction: column;">
                <div class="resuNamess">
                  岗位：
                  <i style="color:black">{{ items.gwName }}</i>
                </div>
                <div class="resuNamesss">
                  职级：
                  <i style="color:#ccc">{{ items.zjName }}</i>
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "manageInfoCompon",
  props: {
    Fachlist: {
      type: Array,
      default: []
    },
    manInfoFlag: {
      type: Number,
      default: 1
    },
    firstFlag: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      defaultAvatar: null
    };
  },
  created() {
    this.defaultAvatar = require('@/assets/timg.jpg')
  },
  methods: {
    manageInfoMethod(item) {
      this.$router.push({
        name: "cadreArchivesInfo",
        params: { managerInfo: item }
      });
    },
    faMore() {
      this.$emit("institutionsChild", {});
    }
  }
};
</script>

<style lang="stylus" >
.headbgc {
  height: 30%;
  background-image: linear-gradient(#ff3334, #fd9d9d);
}

.header {
}

.bgccolor {
  // background-color #fff
  // padding 5px 0 5px 0
  border-radius: 16px;
}

.marginsides {
  border-radius: 5px;
  margin-top: 10px;
}

.myContents {
  // background-color #fff
}

.messageInfoos {
  font-size: 14px;
  // color #8f8f94
  padding: 5px 0 5px 10px;
  background-color: #fff;
  // border-top-left-radius 16px
  // border-top-right-radius 16px
  // height 17vh
  line-height: 4.5vh;
  margin-top: 10px;
}

.imgpps {
  float: left;
  border-radius: 50%;
  border: 1px solid #eee;
  width: 50px;
  height: 50px;
  vertical-align: middle;
}

.resuName {
  color: #3E4146;
  font-weight: 700;
  font-size: 16px;
  padding-left: 5px;
}

.resuNames {
  color: #ccc;
  font-size: 14px;
  padding-left: 5px;
}

.resuNamess {
  color: black;
  font-size: 14px;
  padding-left: 5px;
}

.resuNamesss {
  color: black;
  font-size: 14px;
  padding-left: 5px;
}
.mangetouxiang{
display: flex;
flex-direction: column;
}
</style>
