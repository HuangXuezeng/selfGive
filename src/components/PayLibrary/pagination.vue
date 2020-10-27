<template>
  <div>
    <van-row type="flex" style="padding: 3px 0">
      <van-col span="24"
        ><v-pagination
          style="display: flex;justify-content: center;"
          @page-change="pageChange"
          @page-size-change="pageSizeChange"
          :total="Fatotal"
          :page-size= "pageSize"
          :pageIndex = 'pageIndex'
          :layout="['prev', 'pager', 'next']"
          :showPagingCount="3"
        ></v-pagination
      ></van-col>
    </van-row>
  </div>
</template>

<script>
import { Col, Row } from "vant";
export default {
 name: "pagination",
 props: {
    Fatotal: {
      type: Number,
      default: 0
    },
     Faseachflag: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      pageSize:20,
      pageIndex:1
    };
  },
  methods: {
   pageChange(pageIndex) {
    //  debugger
      this.pageIndex = pageIndex;
      if(this.Faseachflag = 1){
        this.$emit("queryNewSearch",this.pageIndex);
      }else{
        this.$emit("queryNew",this.pageIndex);
      }
      // this.queryFindPayrollInfo();
    },
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
    },
    restPageIndex(){
      // debugger
      this.pageIndex = 1;
    }
  }
};
</script>

<style>
</style>
