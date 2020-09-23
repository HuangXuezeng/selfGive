<template>
  <div>
    <van-field
      v-model="selectedDepartment"
      @click="pickDept"
      label="部门"
      :placeholder="deptPlacehoder"
      :rules="reqireRule"
      readonly
    />
    <van-popup
      v-model="showPickDept"
      position="top"
      :style="{ height: '70%' }"
      get-container="body"
      closeable
    >
      <el-tree
        :data="deptData"
        ref="tree"
        node-key="deptId"
        @check-change="handleCheckChange"
        :props="props"
        show-checkbox
        :check-strictly="true"
        :default-expanded-keys='openlist'
      ></el-tree>
    </van-popup>
  </div>
</template>

<script>
import { getOrz } from "@/views/leadAffairs/api.js";
import { Toast } from "vant";
export default {
  name: "chooseDepartment",
  props: {
    Farequired: {
      type: Boolean,
      default: false
    },
    opennode:{
      type: Number,
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
      deptPlacehoder:'请选择部门',
      openlist:[]
    };
  },
  created() {
    this._getOrz();
    if (this.Farequired) {
      this.reqireRule = [{ required: true, message: "请选择部门" }];
      this.deptPlacehoder = '必填'
    }
  },
  mounted(){

  },
  methods: {
    //获取组织下的部门
    _getOrz() {
      let queryData = {
        jobnumber: 6006212
      };
      getOrz(queryData).then(res => {
        this.deptData.push(res.obj.departments);
      });
    },
    //选择部门
    pickDept() {
      this.showPickDept = true;
      this.$nextTick(() =>{
      this.$refs.tree.setChecked({deptId:this.opennode}, true);
      this.openlist = [this.opennode]
    })
    },
    //选择时触发
    handleCheckChange(data, checked, indeterminate) {
      // 获取当前选择的id在数组中的索引
      const indexs = this.selectOrg.orgsid.indexOf(data.deptId);
      // 如果不存在数组中，并且数组中已经有一个id并且checked为true的时候，代表不能再次选择。
      if (indexs < 0 && this.selectOrg.orgsid.length === 1 && checked) {
        debugger
        Toast.fail("只能选择一个部门");
        // 设置已选择的节点为false 很重要
        this.$refs.tree.setChecked(data, false);
      } else if (this.selectOrg.orgsid.length === 0 && checked) {
        // 发现数组为空 并且是已选择
        // 防止数组有值，首先清空，再push
        this.selectOrg.orgsid = [];
        this.selectOrg.orgsid.push(data.deptId);
        this.selectedDepartment = data.content;
        this.transferData(data);
      } else if (
        indexs >= 0 &&
        this.selectOrg.orgsid.length === 1 &&
        !checked
      ) {
        // 再次直接进行赋值为空操作
        this.transferData(data);
        this.selectedDepartment = data.content;
        this.selectOrg.orgsid = [];
      }
    },
    transferData(data) {
      this.$emit("transferFa", data);
    }
  }
};
</script>

<style>
</style>
