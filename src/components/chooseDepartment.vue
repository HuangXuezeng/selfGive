<template>
  <div>
    <van-field
      v-model="selectedDepartment"
      @click="pickDept"
      :label="labelTitle"
      :placeholder="deptPlacehoder"
      :rules="reqireRule"
      type="textarea"
      readonly
    />
    <van-popup
      v-model="showPickDept"
      position="top"
      :style="{ height: '70%' }"
      get-container="body"
      closeable
    >
      <div style="padding-bottom:10%">
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
      <div class="butnPosition">
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
            style="background-color:Coral"
            @click="selctAllNodeMeth"
          >
            全选
          </div>
          <div
            class="buttonChoose"
            style="background-color:DeepSkyBlue "
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
import { findPayrollDept } from "@/views/PayLibrary/PayLibrary.js";

import { Notify, Toast, Col, Row, Dialog } from "vant";
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
    isSelctall: {
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
      strictlyFlag: true
    };
  },
  created() {
    this._getOrz();
    if (this.Farequired) {
      this.reqireRule = [{ required: true, message: "请选择部门" }];
      this.deptPlacehoder = "必填";
    }
    this.selectedDepartment = this.selectName;
  },
  mounted() {
    if (this.isSelctall) {
      this.strictlyFlag = false;
      this.selectedDepartment = "全部";
    }
  },
  methods: {
    //获取组织下的部门
    _getOrz() {
      // debugger
      if (this.workingNum) {
        findPayrollDept({ jobnumber: localStorage.getItem("jobNum") }).then(
          res => {
            this.deptData = res.obj.depts;
          }
        );
      } else {
        const departRes = JSON.parse(localStorage.getItem("departRes"));
        this.deptData.push(departRes.obj.departments);
      }
    },
    //选择部门
    pickDept() {
      this.showPickDept = true;
      this.$nextTick(() => {
        this.$refs.tree.setChecked({ deptId: this.opennode }, true);
        this.openlist = [this.opennode];
        if (this.isSelctall && this.firstIn == 1) {
          this.selctAllNodeMeth();
          this.firstIn++;
        }
      });
    },
    //选择时触发
    handleCheckChange(data, checked, indeterminate) {
      if (this.isSelctall) {
        if (data.depts.length != 0) {
        }
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
          Notify("选择成功");
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
            Notify("选择成功");
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
    judgeLowerLevel(checkedNodes, list) {
      debugger;
      if (checkedNodes.depts != null) {
        for (let i in checkedNodes.depts) {
          this.$refs.tree.setChecked(checkedNodes.depts[i].deptId, false);
        }
      }
      this.$refs.tree.setChecked(checkedNodes.deptId, true);
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
          this.selectedDepartment = data.content;
          this.transferData(data);
        } else {
          Notify(res.msg);
        }
      });
    },
    RemoveNodeMeth() {
      this.$refs.tree.setCheckedKeys([]);
    },
    confirmNodeMeth() {
      let selctArray = this.$refs.tree.getCheckedKeys();
      this.$emit("confirmNode", selctArray);
      this.showPickDept = false;
      Notify("选择成功");
    },
    selctAllNodeMeth() {
      this.$refs.tree.setCheckedKeys([this.deptData[0].deptId]);
    }
  }
};
</script>

<style lang="stylus" >
.butnPosition {
  position: fixed;
  bottom: 30vh;
  z-index: 99;
  padding: 2px;
  width: 100%;
  background-color: #fff;
}

.butnPos {
  display: flex;
  justify-content: space-between;
}

.buttonChoose {
  display: inline-block;
  width: 17vh;
  height: 5vh;
  text-align: center;
  border: 1px solid #ccc;
  line-height: 5vh;
  color: #fff;
  border-radius: 12px;
}
</style>
