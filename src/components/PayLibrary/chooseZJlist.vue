<template>
  <div>
    <van-row type="flex">
      <van-col span="24">
        <van-field
          readonly
          clickable
          label="职级:"
          label-class="labelStyle"
          v-model="selectzjName"
          placeholder="请选择职级"
          @click="rightPopShow"
        />
        <van-popup
          v-model="rightPop"
          position="right"
          :overlay="true"
          :lazy-render="true"
          style="width: 50%; height: 100%;"
          :get-container="getContainer"
        >
          <div style="height: 90%;overflow: auto;z-index: 2049;">
            <div v-for="item in checkboxlist" :key="item.zl">
              <van-cell clickable @click="toggleZL(item)">
                <template #title>
                  <div style="font-size: 15px;font-weight: 700;">
                    <span class="honghe"></span>
                    {{ item.zl }}
                  </div>
                </template>
                <template #right-icon>
                  <van-checkbox
                    :name="item.zlNum"
                    v-model="item.zlchecked"
                    ref="checkboxesZL"
                    shape="square"
                  />
                </template>
              </van-cell>
              <van-checkbox-group v-model="result">
                <van-cell-group>
                  <van-cell
                    v-for="items in item.zjList"
                    clickable
                    :key="items.number"
                    :title="`${items.zj}`"
                    @click="toggle(items)"
                  >
                    <template #right-icon>
                      <van-checkbox
                        :name="items.indexNumber"
                        ref="checkboxes"
                      />
                    </template>
                  </van-cell>
                </van-cell-group>
              </van-checkbox-group>
            </div>
          </div>
          <van-row type="flex" justify="space-around">
            <van-col span="10">
              <van-button type="info" size="normal" @click="restSelectZj"
                >重置</van-button
              >
            </van-col>
            <van-col span="10">
              <van-button
                :loading="selctzjqueryLoading"
                loading-type="spinner"
                type="primary"
                size="normal"
                @click="selctzjquery"
                >确认</van-button
              >
            </van-col>
          </van-row>
        </van-popup>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import {
  Picker,
  Toast,
  DropdownMenu,
  DropdownItem,
  Col,
  Row,
  DatetimePicker,
  Popup,
  Checkbox,
  CheckboxGroup,
  Notify,
  Overlay
} from "vant";
export default {
  name: "chooseZJlist",
  props: {
    checkboxlist: {
      type: Array
    },
    selectZjNameMap:{
      type: Map
    }
  },
  data() {
    return {
      rightPop:false,
      selctzjqueryLoading: false,
      selectZj: null,
      selectzjName: "全部",
      result:[],
      firstInflag:0
    };
  },
  created(){
    this.selectZj = new Set();

    // this.selectZjNameMap = new Map();
  },
  methods: {
    //弹出右边职级选择框
    rightPopShow() {
      if(this.checkboxlist.length == 0){
        return
      }
      this.rightPop = true;
      if (!this.firstInflag) {
        this.firstInflag++;
        this.$nextTick(() => {
          this.restSelectZj(1);
          // this.$refs.checkboxes[0].toggle(true);
        });
      }
    },
    getContainer() {
      return document.querySelector(".my-container");
    },
    //重置选择的职级(第一次进全选)
    restSelectZj(type) {
      // debugger
      for (let k in this.checkboxlist) {
        if (type == 1) {
          this.checkboxlist[k].zlchecked = true;
        } else {
          this.checkboxlist[k].zlchecked = false;
        }
      }
      for (let i = 0; i <= this.selectZjNameMap.size - 1; i++) {
        if (type == 1) {
          this.$refs.checkboxes[i].toggle(true);
        } else {
          this.$refs.checkboxes[i].toggle(false);
        }
      }
      this.selectZj.clear();
    },
    toggleZL(item) {
      if (item.zlchecked) {
        item.zlchecked = false;
        for (let i in item.zjList) {
          this.$refs.checkboxes[item.zjList[i].indexNumber].toggle(false);
          this.selectZj.delete(item.zjList[i].number);
        }
      } else {
        item.zlchecked = true;
        for (let i in item.zjList) {
          this.$refs.checkboxes[item.zjList[i].indexNumber].toggle(true);
          this.selectZj.add(item.zjList[i].number);
        }
      }
    },
    toggle(item) {
      if (this.selectZj.has(item.number)) {
        this.selectZj.delete(item.number);
      } else {
        this.selectZj.add(item.number);
      }
    },
    selctzjquery() {
      if (!this.selectZj.size) {
        Toast.fail("请至少选择一项");
        return;
      }
      // this.selctzjqueryLoading = true;
      let zjListArry = Array.from(this.selectZj);
      this.selectzjName = "";
      zjListArry.forEach(item => {
        if (this.selectZjNameMap.has(item)) {
          this.selectzjName =
            this.selectzjName + "+" + this.selectZjNameMap.get(item);
        }
      });
      this.selectzjName = this.selectzjName.slice(1);
      this.selctzjqueryLoading = true;
      this.$emit("confirmZj", zjListArry);
      // findPerGetDetailsInfo({
      //   jobnumber: this.ddJobNum,
      //   flag: "2",
      //   zjList: zjListArry
      // }).then(res => {
      //   if (res.code == 1000) {
      //     this.showNodata = false;
      //     this.$nextTick(() => {
      //       this.payEachrts(res);
      //     });
      //     this.rightPop = false;
      //   } else {
      //     Toast.fail(res.msg);
      //   }
      //   this.selctzjqueryLoading = false;
      // });
    },
    shutDownLading(){
      this.selctzjqueryLoading = false;
      this.rightPop = false
    },
    SwitchDepart(type){
      if(type){
        this.selectzjName = '暂无数据'
      }else{
        this.selectzjName = '全部'
        this.firstInflag = 0
      }
    }
  }
};
</script>

<style lang="stylus">
.labelStyle {
  color: red;
}
</style>
