<template>
  <div>
    <van-field
      v-model="selectedDepartment"
      @click-input="pickDept"
      label="选择单位："
      :placeholder="deptPlacehoder"
      :rules="reqireRule"
      readonly
    />
    <van-popup
      v-model="showPickDept"
      position="top"
      :style="{ height: '70%' }"
      get-container="body"
    >
      <van-cell
        center
        title="是否自动包含下级部门"
        title-style="color:red"
        icon="setting"
        v-if="showSwitch"
      >
        <template #right-icon>
          <van-switch
            size="15px"
            :value="isDownValue"
            @input="isDownMethods"
            ref="isDown"
          />
        </template>
      </van-cell>
      <el-tree
        :data="deptData"
        ref="tree"
        style="padding-bottom:10%"
        node-key="deptId"
        @check-change="handleCheckChange"
        :props="props"
        show-checkbox
        :check-strictly="true"
        :default-expanded-keys="openlist"
      ></el-tree>
      <div class="butnPosition">
        <van-button type="primary" color="#fc5f10" size="small" @click="closeTree" style="width:100%"
          >关闭</van-button
        >
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getOrz,isHaveQx } from "@/views/leadAffairs/api.js";
import { findTeamBuildingJGLJInfo } from "@/views/personAffairs/teamFoster/teamFosterApi.js";
import { Notify,Toast } from "vant";
export default {
  name: "chooseDepartment",
  props: {
    Farequired: {
      type: Boolean,
      default: false
    },
    opennode: {
      type: Number
    },
    selectName: {
      type: String
    },
    faDeptData: {
      type: Array
    },
    workingNum: {
      type: Boolean,
      default: false
    },
    showSwitchFlag: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      showSwitch: false, //默认不显示是否包含下级，只有流失率页面可以显示
      isDownValue: true, //默认包含下级部门
      deptData: [],
      selectedDepartment: "",
      showPickDept: false,
      deptVal: "",
      props: {
        label: "content",
        children: "depts"
      },
      defaultProps: null,
      selectOrg: {
        orgsid: []
      },
      reqireRule: [],
      deptPlacehoder: "请选择单位",
      openlist: [],
      onSelected:'',
      firstIn:1,
      restFlag: false
    };
  },
  created() {
    this._getOrz();
    if(this.showSwitchFlag){
      this.showSwitch = true
    }
    // if (this.Farequired) {
    //   this.reqireRule = [{ required: true, message: "请选择部门" }];
    //   this.deptPlacehoder = "必填";
    // }

    this.selectedDepartment = this.selectName;
  },
  mounted() {},
  methods: {
    //获取组织下的部门
    // _getOrz() {
    //   const departRes =  JSON.parse(localStorage.getItem('departRes'))
    //   this.deptData.push(departRes);

    // },
    //获取组织下的部门
    _getOrz() {
      if (this.workingNum) {
        this.deptData = this.faDeptData
      } else {
        const departRes = JSON.parse(localStorage.getItem("departRes"));
        this.deptData.push(departRes);
      }
    },
    //选择部门
    pickDept() {
      this.showPickDept = true;
      this.$nextTick(() => {
        this.$refs.tree.setChecked({ deptId: this.opennode }, true);
        this.openlist = [this.opennode];
        // this.selectOrg.orgsid.push({deptId: this.opennode,content:this.selectName});
      });
    },
    //选择时触发
    handleCheckChange(data, checked, indeterminate) {
      //验证选择部门的权限
      const deptIdsRes = JSON.parse(localStorage.getItem('deptIdsRes'))
      let searchData = {
          deptId: data.deptId,
          deptIds: deptIdsRes
      }
      if(checked == true){
          isHaveQx(searchData).then(res=>{
            if(res.code == 1001 && checked == true){
                this.$refs.tree.setCheckedKeys([])
                Toast.fail(res.msg)
                return
            }else{
              // 如果不存在数组中，并且数组中已经有一个id并且checked为true的时候，代表不能再次选择。
              if(data.deptId  ==  this.onSelected){
                this.onSelected = ''
                return
              }
              if (this.selectOrg.orgsid.length === 1 && checked) {
                // Toast.fail("只能选择一个部门");
                // 设置已选择的节点为false 很重要
                  this.$refs.tree.setChecked(this.selectOrg.orgsid[0], false);
                  this.onSelected = this.selectOrg.orgsid[0].deptId
                  this.selectOrg.orgsid = [];
                  this.selectOrg.orgsid.push(data);
                  let assignData = Object.assign({}, data);
                  this.transferData(assignData);
                  // this.mechanismPath(assignData);
                  this.selectedDepartment = data.content
                  this.showPickDept = false;
                  this.$refs.tree.setCheckedKeys([])
                  Notify({ type: 'success', message: '选择成功' });

              } else if (this.selectOrg.orgsid.length === 0 && checked) {
                // 发现数组为空 并且是已选择
                // 防止数组有值，首先清空，再push
                this.selectOrg.orgsid = [];
                this.selectOrg.orgsid.push(data);
                let assignData = Object.assign({}, data);
                this.transferData(assignData);
                // this.mechanismPath(assignData);
                this.selectedDepartment = data.content
                if(this.firstIn == 1&&this.selectName){
                  this.firstIn++
                }else{
                  this.showPickDept = false;
                  this.onSelected=''
                  this.$refs.tree.setCheckedKeys([])
                  Notify({ type: 'success', message: '选择成功' });
                }

              } else if (
                this.selectOrg.orgsid.length === 1 &&
                !checked
              ) {
                // 再次直接进行赋值为空操作
                let assignData = { content: "", deptId: "" };
                this.transferData(assignData);
                this.selectedDepartment = "";
                this.selectOrg.orgsid = [];
                this.onSelected=''

              }
            }
        })
      }
    },
    transferData(data) {
      this.$emit("transferFa", data);
    },
    //查询机构路径
    mechanismPath(data) {
      let queryDta = { deptId: data.deptId };
      findTeamBuildingJGLJInfo(queryDta).then(res => {
        if (res.code == 1000) {
          data.content = res.obj;
          // this.selectedDepartment = data.content;
          this.transferData(data);
        } else {
          Notify(res.msg);
        }
      });
    },
    //清空输入框
    showAlert1(){
      this.selectedDepartment = ''
    },
    //关闭弹窗
    closeTree(){
      this.showPickDept = false
    },
    //默认包含下级部门事件
    isDownMethods(){
      if(this.isDownValue){
        this.isDownValue = false
      }else{
        this.isDownValue = true
      }
      this.$emit('getIsdownVal',this.isDownValue)
    }
  },
  watch:{
    'restFlag' : function(newVal,oldVal){
        // console.log(this.restFlag)
      if(this.restFlag == true){
        this.$refs.tree.setCheckedKeys([])
        this.restFlag = false
      }
    }
  }
};
</script>

<style lang="stylus">
  .butnPosition {
    position: fixed;
    bottom: 30vh;
    z-index: 99;
    width: 100%;
    box-sizing: content-box;
  }
</style>