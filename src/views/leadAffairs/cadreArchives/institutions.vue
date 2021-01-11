<template>
  <div style="padding-bottom:10%">
    <van-tree-select
      height="170vw"
      :items="deptList"
      :main-active-index.sync="activeIndex"
      @click-nav="leftClick"
    >
      <template slot="content" >
        <zuzhiInfo :Fachlist='achlist' :manInfoFlag='2' @institutionsChild='instituMore' :firstFlag='1'></zuzhiInfo>
      </template>
    </van-tree-select>
    <cadArcTanbber></cadArcTanbber>
    <loadingSpin ref="loadingSpin"></loadingSpin>
  </div>
</template>

<script>
import cadArcTanbber from "@/components/cadArcComponents/cadArcTanbber.vue";
import {
  findCadreRosterInfo,
  findCadreDownDept,
  findCadreDept
} from "@/views/leadAffairs/cadreArchives/cadreArchivesApi.js";
import { TreeSelect, Toast } from "vant";
import loadingSpin from '@/components/loadingSpin.vue';
import zuzhiInfo from'@/components/cadArcComponents/zuzhiInfo.vue'
export default {
  components: {
    cadArcTanbber,
    loadingSpin,
    zuzhiInfo
  },
  data() {
    return {
      activeIndex: 0,
      deptList: [],
      achlist: [],
      defaultAvatar: "src/assets/timg.jpg",
      nextDeptlist:{},
      ddJobNum: localStorage.getItem("jobNum"),
    };
  },
  created() {
    this.queryInstitiu();
  },
  methods: {
    queryInstitiu() {
      findCadreDept({ jobnumber:this.ddJobNum}).then(res => {
        if (res.code == 1000) {
          for (let i in res.obj) {
            //进行数据的转换
            res.obj[i].text = res.obj[i].content;
            res.obj[i].badge = res.obj[i].allCount;
            res.obj[i].children = res.obj[i].jobnumbers;
          }
          this.deptList = res.obj;
          this.achlist = res.obj[0].children;
          this.nextDeptlist = this.deptList[0]
        } else {
          Toast.fail(res.msg);
          this.$router.push({name:'cadreArchives'})
        }
        this.$refs.loadingSpin.shutdown();
      });
    },
    leftClick(index) {
      this.nextDeptlist = this.deptList[index]
      this.achlist = this.deptList[index].children;
    },
    instituMore(){
      this.$router.push({name:'institutionsMore',params:{dept:this.nextDeptlist.deptId}})
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

