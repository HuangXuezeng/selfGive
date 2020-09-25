<template>
  <div>
    <van-collapse v-model="activeNames">
      <div v-for="(item,index) in addteamlist" :key="item.recordid">
        <van-collapse-item :name="index">
          <template #title>
            <div class="fontweig">
              <van-tag mark type="primary" color="#07c160">新增的团队{{index+1}}</van-tag>
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
            <span>{{item.a8TDPYXX016name? item.a8TDPYXX016name :'无'}}</span>
          </p>
          <p>
            <span>继任者2：</span>
            <span>{{item.a8TDPYXX017? item.a8TDPYXX017 :'无'}}</span>
          </p>
          <p>
            <span>继任者2成熟度：</span>
            <span>{{item.a8TDPYXX018name? item.a8TDPYXX018name :'无'}}</span>
          </p>
          <p>
            <span>继任者3：</span>
            <span>{{item.a8TDPYXX019? item.a8TDPYXX019 :'无'}}</span>
          </p>
          <p>
            <span>继任者3成熟度：</span>
            <span>{{item.a8TDPYXX020name? item.a8TDPYXX020name :'无'}}</span>
          </p>
          <p>
            <span>团队所属机构：</span>
            <span>{{item.a8TDPYXX013Name? item.a8TDPYXX013Name :'无'}}</span>
          </p>
          <p>
            <span>审核人：</span>
            <span>{{item.shrName? item.shrName :'无'}}</span>
          </p>
        </van-collapse-item>
        <van-row type="flex" justify="center" v-if="activeNames.indexOf(index) != -1">
          <van-col span="6">
            <div class="btn">
              <van-button
                type="primary"
                size="small"
                color="#fc5f10"
                @click="addback(item)"
                style="font-size:16px"
              >撤回</van-button>
            </div>
          </van-col>
        </van-row>
      </div>
    </van-collapse>
    <van-collapse v-model="activeEditNames">
      <div v-for="(item,index) in updateteamlist" :key="item.recordid">
        <van-collapse-item :name="index">
          <template #title>
            <div class="fontweig">
              <van-tag mark type="primary" color="#fc5f10">已修改的团队{{index+1}}</van-tag>
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
            <span>{{item.a8TDPYXX016name? item.a8TDPYXX016name :'无'}}</span>
          </p>
          <p>
            <span>继任者2：</span>
            <span>{{item.a8TDPYXX017? item.a8TDPYXX017 :'无'}}</span>
          </p>
          <p>
            <span>继任者2成熟度：</span>
            <span>{{item.a8TDPYXX018name? item.a8TDPYXX018name :'无'}}</span>
          </p>
          <p>
            <span>继任者3：</span>
            <span>{{item.a8TDPYXX019? item.a8TDPYXX019 :'无'}}</span>
          </p>
          <p>
            <span>继任者3成熟度：</span>
            <span>{{item.a8TDPYXX020name ? item.a8TDPYXX020name :'无'}}</span>
          </p>
          <p>
            <span>团队所属机构：</span>
            <span>{{item.a8TDPYXX013Name? item.a8TDPYXX013Name :'无'}}</span>
          </p>
          <p>
            <span>审核人：</span>
            <span>{{item.shrName? item.shrName :'无'}}</span>
          </p>
        </van-collapse-item>
        <van-row type="flex" justify="center" v-if="activeEditNames.indexOf(index) != -1">
          <van-col span="6">
            <div class="btn">
              <van-button
                type="primary"
                size="small"
                color="#fc5f10"
                @click="editback(item)"
                style="font-size:16px"
              >撤回</van-button>
            </div>
          </van-col>
        </van-row>
      </div>
    </van-collapse>

    <van-row type="flex" justify="center">
      <van-col span="12">
        <van-button
          type="primary"
          size="small"
          color="#fc5f10"
          @click="backHome"
          style="width:100%;font-size:16px"
        >返回列表</van-button>
      </van-col>
    </van-row>
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
  Notify,
  Toast
} from "vant";
import { findAdd, deleteTeamBuildingInfo } from "./teamFosterApi";
export default {
  data() {
    return {
      activeNames: [],
      activeEditNames:[],
      addteamlist: [],
      updateteamlist: []
    };
  },
  created() {
    this.findTeam();
  },
  methods: {
    //查询团队明细
    findTeam() {
      // localStorage.setItem("jobNum", "9050104");
      let queryData = { jobnumber: localStorage.getItem("jobNum") };
      findAdd(queryData).then(res => {
        if (res.code == "1000") {
          this.addteamlist = res.obj.add;
          this.updateteamlist = res.obj.update;
          for(let i=0;i<=this.addteamlist.length;i++ ){
            this.activeNames.push(i)
          }
          for(let k=0;k<=this.updateteamlist.length;k++ ){
            this.activeEditNames.push(k)
          }
        } else {
          Toast.fail(res.msg);
        }
      });
    },
    addback(item) {
      item.recordid =item.id
      item.flag = 2
      deleteTeamBuildingInfo(item).then((res) =>{
        if(res.code == '1000'){
           Notify({ type: "success", message: res.msg });
           this.findTeam();
        }else{
          Toast.fail(res.msg);
        }
      })
    },
    editback(item) {
      item.flag = 1
      deleteTeamBuildingInfo(item).then((res) =>{
        if(res.code == '1000'){
           Notify({ type: "success", message: res.msg });
           this.findTeam();
        }else{
          Toast.fail(res.msg);
        }
      })
    },
    backHome() {
      this.$router.push({ name: "teamFoster" });
    }
  }
};
</script>
<style lang="stylus" scoped>
.btn {
  padding: 10px;
}
</style>
