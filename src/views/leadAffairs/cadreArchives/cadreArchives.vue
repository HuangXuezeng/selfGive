<template>
  <div>
    <div class="header">
      <van-sticky>
        <div class="headbgc">
          <van-row type="flex" justify="center">
            <van-col span="22">
              <van-search
                v-model="value"
                show-action
                placeholder="请输入搜索关键词"
                @search="onSearch"
                @cancel="onCancel"
              />
            </van-col>
          </van-row>
        </div>
      </van-sticky>
    </div>
    <div class="main"></div>
    <div class="footer"></div>
  </div>
</template>

<script>
import { findCadreRosterInfo } from "@/api/cadreArchivesApi.js";
// import easyTable from "@/components/easyTable/easyTable.vue";

export default {
  components: {
    // easyTable: easyTable
  },
  data() {
    return {
      value: '',
    };
  },
  created() {
    // findCadreRosterInfo({jobnumber:6200244,pageNum:1}).then((res) =>{
    //   this.Fatherdata = res.obj
    // })
  },
  methods: {
    onSearch(val) {
      Toast(val);
    },
    onCancel() {
      Toast('取消');
    },
  },
};
</script>

<style lang="stylus">
.headbgc {
  height: 15vh;
  background-image: linear-gradient(#ff3334, #fd9d9d);
}
</style>
