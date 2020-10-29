<template>
  <div class="resetVant">
    <van-field
      v-model="selectedDepartment"
      @click="pickDept"
      :label="labelTitle"
      :placeholder="deptPlacehoder"
      :rules="reqireRule"
      type="textarea"
      :autosize="autosize"
      :label-class="labelStyle"
      readonly

    />
    <van-popup
      v-model="showPickDept"
      position="top"
      :style="{ height: '70%' }"
      get-container="body"
      :closeable="closeableFlag"
    >
      <div style="padding-bottom:12%" >
        <!-- <van-switch :value="isDownValue" @input="isDownMethods" /> -->
        <van-cell
          center
          title="是否自动包含下级部门"
          title-style="color:red"
          icon="setting"
          v-if="isSelctall"
        >
          <template #right-icon>
            <van-switch
              :value="isDownValue"
              @input="isDownMethods"
              size="15px"
            />
          </template>
        </van-cell>
        <el-tree
          :data="deptData"
          ref="tree"
          node-key="deptId"
          @check-change="handleCheckChange"
          @check="judgeLowerLevel"
          :props="props"
          show-checkbox
          :check-strictly="strictlyFlag"
          :default-expanded-keys="openlist"
        ></el-tree>
      </div>
      <div class="butnPosition" v-if="isSelctall">
        <div class="butnPos">
          <div
            class="buttonChoose"
            style="background-color:MediumAquamarine"
            @click="RemoveNodeMeth"
          >
            重置
          </div>
          <div
            class="buttonChoose"
            :style="selectAllstyle"
            @click="selctAllNodeMeth"
          >
            全选
          </div>
          <div
            class="buttonChoose"
            style="background-color:DeepSkyBlue"
            @click="confirmNodeMeth"
          >
            确认
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getOrz } from "@/views/leadAffairs/api.js";
import { findTeamBuildingJGLJInfo } from "@/views/personAffairs/teamFoster/teamFosterApi.js";

import { Notify, Toast, Col, Row, Dialog, Switch } from "vant";
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
    labelTitle: {
      type: String,
      default: " 团队所属机构："
    },
    workingNum: {
      type: Boolean,
      default: false
    },
    //区别单选和多选的标志，与团队培育分开
    isSelctall: {
      type: Boolean,
      default: false
    },
    faDeptData: {
      type: Array
    },
    isFromRost: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
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
      deptPlacehoder: "请选择部门",
      openlist: [],
      onSelected: "",
      firstIn: 1,
      strictlyFlag: true,
      isDownValue: true,
      closeableFlag: true,
      selectkeySet: null,
      beforeSelectName: "",
      SelectNameMap: null,
      selectAllstyle: "background-color:Coral",
      labelStyle: "",
      restFlag: false, //花名册清空勾选,
      autosize: { maxHeight: '25', minHeight: '20' }
    };
  },
  created() {
    this._getOrz();
    if (this.Farequired) {
      this.reqireRule = [{ required: true, message: "请选择部门" }];
      this.deptPlacehoder = "必填";
    }
    this.selectedDepartment = this.selectName;
    this.selectkeySet = new Set();
    this.SelectNameMap = new Map();
  },
  mounted() {
    if (this.isSelctall) {
      this.strictlyFlag = false;
      if (this.isFromRost) {
        this.selectedDepartment = "";
        this.deptPlacehoder = "请选择部门";
      } else {
        this.selectedDepartment = "全部";
        this.labelStyle = "labelStyle";
      }
      this.closeableFlag = false;
    }
  },
  methods: {
    //获取组织下的部门
    _getOrz() {
      if (this.workingNum) {
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
        if (this.isSelctall && this.firstIn == 1) {
          this.deptData = this.faDeptData;
          this.openlist = [this.faDeptData[0].deptId];
          if (!this.isFromRost) {
            this.selctAllNodeMeth();
          }
          this.firstIn++;
        }
      });
    },
    //团队培育用的方法 选择时触发
    handleCheckChange(data, checked, indeterminate) {
      if (this.isSelctall) {
      } else {
        // 如果不存在数组中，并且数组中已经有一个id并且checked为true的时候，代表不能再次选择。
        if (data.deptId == this.onSelected) {
          this.onSelected = "";
          return;
        }
        if (this.selectOrg.orgsid.length === 1 && checked) {
          // Toast.fail("只能选择一个部门");
          // 设置已选择的节点为false 很重要
          this.$refs.tree.setChecked(this.selectOrg.orgsid[0], false);
          this.onSelected = this.selectOrg.orgsid[0].deptId;
          this.selectOrg.orgsid = [];
          this.selectOrg.orgsid.push(data);
          let assignData = Object.assign({}, data);
          this.mechanismPath(assignData);
          this.showPickDept = false;
          Notify({ type: "success", message: "选择成功" });
        } else if (this.selectOrg.orgsid.length === 0 && checked) {
          // 发现数组为空 并且是已选择
          // 防止数组有值，首先清空，再push
          this.selectOrg.orgsid = [];
          this.selectOrg.orgsid.push(data);
          // this.selectedDepartment = data.content;
          let assignData = Object.assign({}, data);
          this.mechanismPath(assignData);
          if (this.firstIn == 1 && this.selectName) {
            this.firstIn++;
          } else {
            this.showPickDept = false;
            this.onSelected = "";
            Notify({ type: "success", message: "选择成功" });
          }
        } else if (this.selectOrg.orgsid.length === 1 && !checked) {
          // 再次直接进行赋值为空操作
          let assignData = { content: "", deptId: "" };
          this.transferData(assignData);
          this.selectedDepartment = "";
          this.selectOrg.orgsid = [];
          this.onSelected = "";
        }
      }
    },
    //输入框名字重新赋值
    setbeforeSelectName(obj) {
      this.beforeSelectName = "";
      for (let p of this.selectkeySet) {
        if (this.SelectNameMap.has(p)) {
          this.beforeSelectName =
            this.beforeSelectName + "," + this.SelectNameMap.get(p);
        }
      }
    },
    //多选的主要逻辑
    judgeLowerLevel(checkedNodes, obj) {
      if (this.isDownValue) {
        this.selectkeySet.clear();
        for (let k in obj.checkedKeys) {
          this.selectkeySet.add(obj.checkedKeys[k]);
          this.SelectNameMap.set(
            obj.checkedNodes[k].deptId,
            obj.checkedNodes[k].content
          );
        }
        this.setbeforeSelectName(obj);
      } else {
        this.$refs.tree.setCheckedKeys([]);
        this.SelectNameMap.set(checkedNodes.deptId, checkedNodes.content);
        if (this.selectkeySet.has(checkedNodes.deptId)) {
          this.selectkeySet.delete(checkedNodes.deptId);
          this.setbeforeSelectName(obj);
        } else {
          this.selectkeySet.add(checkedNodes.deptId);
          this.setbeforeSelectName(obj);
        }
        for (let item of this.selectkeySet) {
          this.$refs.tree.setChecked(item, true, false);
        }
      }
    },
    //团队培育用的方法
    transferData(data) {
      this.$emit("transferFa", data);
    },
    //查询机构路径
    mechanismPath(data) {
      let queryDta = { deptId: data.deptId };
      findTeamBuildingJGLJInfo(queryDta).then(res => {
        if (res.code == 1000) {
          data.content = res.obj;
          this.selectedDepartment = data.content;
          this.transferData(data);
        } else {
          Notify(res.msg);
        }
      });
    },
    RemoveNodeMeth() {
      this.$refs.tree.setCheckedKeys([]);
      //清空set
      this.selectkeySet.clear();
      this.beforeSelectName = "";
      this.selectedDepartment = ''
    },
    //点击确认按钮
    confirmNodeMeth() {
      let selctArray = Array.from(this.selectkeySet);
      let isDown = "";
      if (this.isDownValue) {
        isDown = "Y";
      } else {
        isDown = "N";
      }
      if (selctArray.length == 0) {
        Dialog.alert({
          message: "请至少选择一个部门"
        }).then(() => {
          // on close
        });
        return;
      }
      this.$emit("confirmNode", selctArray, isDown);
      this.showPickDept = false;
      Notify({ type: "success", message: "选择成功" });
      if (this.beforeSelectName.split(",").length != 1) {
        this.selectedDepartment = this.beforeSelectName.slice(1);
      } else {
        this.selectedDepartment = this.beforeSelectName;
      }
    },
    //全选按钮
    selctAllNodeMeth() {
      if (!this.isDownValue) {
        return;
      }
      this.$refs.tree.setCheckedKeys([this.deptData[0].deptId], false);
      this.selectkeySet.clear();
      this.selectkeySet.add(this.deptData[0].deptId);
      this.beforeSelectName = "全部";
    },
    //开关按钮方法
    isDownMethods(isDownValue) {
      let isDownTip = "";
      if (!isDownValue) {
        isDownTip = "关闭";
      } else {
        isDownTip = "开启";
      }
      Dialog.confirm({
        title: "提醒",
        message: `是否${isDownTip}自动包含下级？`
      }).then(() => {
        this.isDownValue = isDownValue;
        if (!isDownValue) {
          this.selectAllstyle = "background-color:#ccc";
        } else {
          this.selectAllstyle = "background-color:Coral";
        }
      });
    }
  },
  watch: {
    restFlag: function(newVal, oldVal) {
      // console.log(this.restFlag)
      if (this.restFlag == true) {
        this.$refs.tree.setCheckedKeys([]);
        this.restFlag = false;
      }
    }
  }
};
</script>

<style lang="stylus" >
.butnPosition {
  position: fixed;
  bottom: 28vh;
  z-index: 99;
  padding: 5px;
  width: 100%;
  background-color: #fff;
  box-sizing: content-box;
}

.butnPos {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.buttonChoose {
  display: inline-block;
  width: 16vh;
  height: 4vh;
  text-align: center;
  border: 1px solid #ccc;
  line-height: 4vh;
  color: #fff;
  border-radius: 12px;
}

.labelStyle {
  color: red;
}
</style>
