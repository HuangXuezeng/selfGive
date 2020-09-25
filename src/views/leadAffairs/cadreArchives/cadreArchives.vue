<template>
  <div>
    <div class="header">
      <van-sticky>
        <div class="headbgc">
          <van-row type="flex" justify="center" class="resetVant">
            <van-col span="22">
              <van-search
                v-model="value"
                shape="round"
                background="transparent"
                placeholder="请输入搜索关键词"
              />
            </van-col>
          </van-row>
        </div>
      </van-sticky>
    </div>
    <div class="main">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        :offset="10"
        finished-text="没有更多了~"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <div class="bgccolor">
          <div class="marginsides" v-for="items in achlist" :key="items.a0190">
            <div class="myContents">
              <div class="messageInfoos">
                <!-- <span><img class="img" src="../../assets/timg.jpg" alt=""></span> -->
                <span>
                  <img class="img" :src="items.photo ? items.photo : defaultAvatar " alt />
                </span>
                <span class="resuName">{{items.a0101}}</span>
                <br />
                <span class="resuNamess">
                  岗位：
                  <i style="color:black">{{items.gwName}}</i>
                </span>
                <span class="resuNamesss">
                  职级：
                  <i style="color:#ccc">{{items.a01516}}</i>
                </span>
                <br />
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import { findCadreRosterInfo } from "@/views/leadAffairs/cadreArchives/cadreArchivesApi.js";
import { Card } from "vant";
export default {
  components: {
    // easyTable: easyTable
  },
  data() {
    return {
      value: "",
      loading: false,
      finished: false,
      achlist: [],
      error: false,
      defaultAvatar: "src/assets/timg.jpg",
      nextpage: 1
    };
  },
  created() {
    this.queryDepartmentPersonnel()
  },
  methods: {
    //请求数据
    queryDepartmentPersonnel() {
      findCadreRosterInfo({ jobnumber: 6006234, pageNum: this.nextpage }).then(res => {
        if(res.code == '1000'){
          if(res.obj.length != 0){
           this.achlist =  this.achlist.concat(res.obj) ;
           this.loading = false
          }else{
            this.finished = true
          }
        }else{
          this.error = true
        }
      });
    },
    async onLoad() {
      this.nextpage++
      await  this.queryDepartmentPersonnel()

    }
  }
};
</script>

<style lang="stylus">
.headbgc {
  height: 15vh;
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

.img {
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
  padding-left: 5vw;
}
</style>
