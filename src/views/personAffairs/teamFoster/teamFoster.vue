<template>
  <div>
    <!-- <loadingspin></loadingspin> -->
    <van-collapse v-model="activeNames">
      <div v-for="(item,index) in teamlist" :key="item.recordid">
        <van-collapse-item :name="index">
          <template #title>
            <div class="fontweig">
              <van-tag mark type="primary" color="#fc5f10">团队{{index+1}}</van-tag>
            </div>
          </template>
          <p>
            <span>团队规模：</span>
            <span>{{item.a8TDPYXX014 ? item.a8TDPYXX014 :'无'}}</span>
          </p>
          <p>
            <span>继任者1：</span>
            <span>{{item.a8TDPYXX015? item.a8TDPYXX015 :'无'}}</span>
          </p>
          <p>
            <span>继任者1成熟度：</span>
            <span>{{item.a8TDPYXX016? item.a8TDPYXX016name :'无'}}</span>
          </p>
          <p>
            <span>继任者2：</span>
            <span>{{item.a8TDPYXX017? item.a8TDPYXX017 :'无'}}</span>
          </p>
          <p>
            <span>继任者2成熟度：</span>
            <span>{{item.a8TDPYXX018? item.a8TDPYXX018name :'无'}}</span>
          </p>
          <p>
            <span>继任者3：</span>
            <span>{{item.a8TDPYXX019? item.a8TDPYXX019 :'无'}}</span>
          </p>
          <p>
            <span>继任者3成熟度：</span>
            <span>{{item.a8TDPYXX020? item.a8TDPYXX020name :'无'}}</span>
          </p>
          <p>
            <span>团队所属机构：</span>
            <span>{{item.a8TDPYXX013Name? item.a8TDPYXX013Name :'无'}}</span>
          </p>
        </van-collapse-item >
        <div class="btn" v-if="activeNames.indexOf(index) != -1">
          <van-button
            v-if="item.sign == 0"
            type="primary"
            size="small"
            color="#fc5f10"
            @click="update(item)"
            style="width:100%;font-size:16px"
          >修改</van-button>
          <van-button
            v-if="item.sign == 1"
            type="primary"
            size="small"
            color="#ccc"
            @click="update(item)"
            style="width:100%;font-size:16px"
          >修改</van-button>
        </div>
      </div>
    </van-collapse>

    <div class="btn">
      <van-button
        type="primary"
        size="small"
        color="#fc5f10"
        @click="addTeam"
        style="width:100%;font-size:16px"
      >添加</van-button>
      <van-button
        type="primary"
        size="small"
        color="#fc5f10"
        style="width:100%;font-size:16px;margin-top:10px"
         @click="jumplistalready"
      >审核列表</van-button>
    </div>
  </div>
</template>
<script>
import {
  Button,
  Tag,
  Collapse,
  CollapseItem,
  Popup,
  ImagePreview,
  Notify
} from "vant";
import { findTeamBuildingInfo } from "./teamFosterApi";
import  loadingSpin  from "@/components/loadingSpin.vue";
export default {
  components: {
    loadingspin: loadingSpin
  },
  data() {
    return {
      activeNames: [],
      teamlist: []
    };
  },
  created() {
    this.findTeam();
  },
  methods: {
    //查询团队明细
    findTeam() {
      // localStorage.setItem('jobNum','9050104')
      let queryData = { jobnumber: localStorage.getItem("jobNum") };
      findTeamBuildingInfo(queryData).then(res => {
        if (res.code == "1000") {
          this.teamlist = res.obj;
          for(let i=0;i<=this.teamlist.length;i++ ){
            this.activeNames.push(i)
          }
        } else {
          Toast.fail(res.msg);
        }
      });
    },
    addTeam(){
       this.$router.push({name:'addTeamFoster'})
    },
    jumplistalready(){
      this.$router.push({name:'alreadyTeamFoster'})
    },
    update(item){
      if(item.sign == 1){
        return
      }
       this.$router.push({name:'editTeamFoster',params:{sData:item}})
    }

  }
};
</script>
<style lang="stylus" scoped>
  .btn{
        padding 10px
      }
  p{
      padding 5px 0 5px 5px
      border-bottom  1px solid #eee
  }
</style>
