<template>
  <div>
    <div class="header">
      <van-sticky class="resetVantfixed">
        <!-- <div class="headbgc"> -->
          <van-row type="flex" justify="center" class="resetVant">
            <van-col span="24">
              <van-search
                v-model="searchValue"
                shape="round"
                background="linear-gradient(#ff3334, #fd9d9d)"
                placeholder="请输入搜索关键词"
                @search="onSearch"
              />
            </van-col>
          </van-row>
        <!-- </div> -->
      </van-sticky>
    </div>
    <div class="main">
      <van-list
        v-if="loadFlag"
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        :offset="10"
        finished-text="没有更多了~"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
      <manageInfoCompon :Fachlist='achlist'></manageInfoCompon>
      </van-list>
      <div v-if="!loadFlag" style="padding-bottom:10vw">
        <manageInfoCompon :Fachlist='searchList'></manageInfoCompon>
      </div>
    </div>
    <div class="footer">
      <cadArcTanbber></cadArcTanbber>
    </div>
    <loadingSpin ref="loadingSpin"></loadingSpin>
  </div>
</template>

<script>
import {
  findCadreRosterInfo,
  findCadreRosterInfoByCondition
} from "@/views/leadAffairs/cadreArchives/cadreArchivesApi.js";
import cadArcTanbber from "@/components/cadArcComponents/cadArcTanbber.vue";
import { Card, Toast } from "vant";
import loadingSpin from "@/components/loadingSpin.vue";
import manageInfoCompon from'@/components/cadArcComponents/manageInfoCompon.vue'
export default {
  components: {
    cadArcTanbber,
    loadingSpin,
    manageInfoCompon
  },
  data() {
    return {
      value: "",
      loading: false,
      finished: false,
      achlist: [],
      error: false,
      defaultAvatar: "src/assets/timg.jpg",
      nextpage: 1,
      searchValue: "",
      loadFlag: true,
      searchList: [],
      ddJobNum: localStorage.getItem("jobNum"),
      firstIn:1
    };
  },
  created() {
    this.queryDepartmentPersonnel();
  },
  methods: {
    //请求数据
    queryDepartmentPersonnel() {
      findCadreRosterInfo({ jobnumber: this.ddJobNum, pageNum: this.nextpage }).then(
        res => {
          if (res.code == "1000") {
            if (res.obj.length != 0) {
              this.achlist = this.achlist.concat(res.obj);
              this.loading = false;
              this.$refs.loadingSpin.shutdown();
            } else {
              this.finished = true;
            }
          } else {
            this.error = true;
          }
        }
      );
    },
    async onLoad() {
      this.nextpage++;
      await this.queryDepartmentPersonnel();
    },
    async onSearch() {
      this.$refs.loadingSpin.showUp();
      let queryData = {
        jobnumber: this.searchValue,
        jobnumber1: this.ddJobNum
      };
      await this.searchQuery(queryData);

      this.loadFlag = false;
    },
    searchQuery(data) {
      findCadreRosterInfoByCondition(data).then(res => {
        if (res.code == "1000") {
          if(res.obj != null){
            this.searchList = res.obj;
          }
          this.showFooter = true;
        } else {
          Toast.fail(res.msg);
          this.loadFlag = true;
        }
      });
      this.$refs.loadingSpin.shutdown();
    },
    manageInfoMethod(item){
      this.$router.push({name:'cadreArchivesInfo',params:{managerInfo:item}})
    }
  }
};
</script>

<style lang="stylus">
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

.img {
  // float: left;
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
</style>
