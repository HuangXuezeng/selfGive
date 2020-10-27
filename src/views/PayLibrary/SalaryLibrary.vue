<template>
  <div style="padding-bottom: 20%;">
    <van-tabs v-model="active" type="card">
      <van-search
        v-model="searchName"
        placeholder="请输入工号或姓名"
        show-action
        :clearable="false"
        @search="onSearch(1)"
      >
        <template #action>
          <span
            @click="onSearch(1)"
            style="display: inline-block;"
            v-show="!seachFlag"
            >搜索</span
          >
          <span
            @click="clearSearchName"
            style="display: inline-block;"
            v-show="seachFlag"
            >取消</span
          >

          <span class="searchSty" @click="filtrateFlag = true">
            <van-icon name="filter-o" />
            <span style="font-size:12px;">筛选</span>
          </span>
        </template>
      </van-search>
      <pagination
        :Fatotal="total"
        :Faseachflag="seachFlag"
        @queryNewSearch="upDateNewSearch"
        @queryNew="queryFindPayrollInfo"
        ref="Paypagination"
      ></pagination>
      <van-tab title="简略" name="简略">
        <v-table
          is-horizontal-resize
          style="width:100%"
          :min-height="350"
          even-bg-color="#f2f2f2"
          :columns="briefColumns"
          :table-data="tableConfig.tableData"
          row-hover-color="#eee"
          row-click-color="#edf7ff"
          :is-loading="isLoading"
          :paging-index="(pageIndex - 1) * pageSize"
        ></v-table>
      </van-tab>
      <van-tab title="详情" name="详情">
        <v-table
          is-horizontal-resize
          style="width:100%"
          :min-height="350"
          even-bg-color="#f2f2f2"
          :title-rows="tableConfig.titleRows"
          :columns="tableConfig.columns"
          :table-data="tableConfig.tableData"
          row-hover-color="#eee"
          row-click-color="#edf7ff"
          :is-loading="isLoading"
          :paging-index="(pageIndex - 1) * pageSize"
        ></v-table>
      </van-tab>
    </van-tabs>
    <van-popup
      v-model="filtrateFlag"
      position="right"
      :style="{ height: '100%', width: '80%' }"
      :get-container="'body'"
    >
      <van-row type="flex" justify="center" style="margin-bottom:10px">
        <van-col>
          <div class="titleRewards">
            筛选条件
          </div></van-col
        >
      </van-row>
      <div>
        <choosedepartment
          @confirmNode="selctdept"
          :Farequired="true"
          labelTitle="部门:"
          :workingNum="true"
          :isSelctall="true"
          :faDeptData="deptData"
          :isFromRost='true'
        ></choosedepartment>
        <van-field
          v-model="searchObj.name"
          label="姓名/工号:"
          placeholder="请输入用户名或工号"
        />
        <!-- <van-cell title="调薪次数:">
          <template #default>
            <van-stepper v-model="searchObj.num" />
          </template>
        </van-cell> -->
        <van-field
          label="调薪次数:"
        >
         <template #input>
            <van-stepper v-model="searchObj.num" />
          </template>
        </van-field>
        <van-row type="flex" justify="center" style="margin-bottom:10px">
        <van-col span="24">
         <van-button type="danger" size="large" round @click='confirmSearch'>确定</van-button>
          </van-col
        >
      </van-row>
      </div>
    </van-popup>
    <payTab></payTab>
  </div>
</template>
<style>
.title-cell-class-name-test1 {
  background-color: #2db7f5;
  color: #fff;
}
.title-cell-class-name-test2 {
  background-color: #f60;
  color: #fff;
}
</style>
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
  Overlay,
  Search,
  Stepper,
  Field
} from "vant";
import payTab from "@/components/PayLibrary/pay-tab.vue";
import {
  findPayrollDept,
  findPayrollInfo,
  findPayrollInfoBySearch
} from "@/views/PayLibrary/PayLibrary.js";
import noData from "@/components/noData.vue";
import chooseDepartment from "@/components/chooseDepartment.vue";
import pagination from "@/components/PayLibrary/pagination.vue";

export default {
  components: {
    payTab,
    noData,
    pagination,
    choosedepartment: chooseDepartment
  },
  data() {
    return {
      pageIndex: 1,
      pageSize: 20,
      ddJobNum: localStorage.getItem("jobNum"),
      active: "简略",
      total: 0,
      isLoading: true,
      searchName: "",
      seachFlag: 0,
      filtrateFlag: false,
      deptData: [],

      searchObj: {
        num: 1,
        name: "",
        jobnumber:this.ddJobNum,
        
      },
      briefColumns: [
        // {
        //   field: "custome",
        //   title: "序号",
        //   width: 80,
        //   titleAlign: "center",
        //   columnAlign: "center",
        //   isResize: true,
        //   titleCellClassName: "titleclass",
        //   isFrozen: true,
        //   formatter: function(rowData, rowIndex, pagingIndex, field) {
        //     return (
        //       '<span style="color:red;font-weight: bold;">' +
        //       (rowIndex + 1) +
        //       "</span>"
        //     );
        //   }
        // },
        {
          field: "a0101",
          title: "姓名",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          titleCellClassName: "titleclass"
        },
        {
          field: "a8602005",
          title: "调整前",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          titleCellClassName: "titleclass"
        },
        {
          field: "a8602010",
          title: "调整后",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          titleCellClassName: "titleclass"
        },
        {
          field: "txfd",
          title: "幅度",
          width: 50,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          titleCellClassName: "titleclass"
        },
        {
          field: "A8602014",
          title: "调薪日期",
          width: 110,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          titleCellClassName: "titleclass"
        }
      ],
      tableConfig: {
        multipleSort: false,
        tableData: [],
        columns: [
          {
            field: "custome",
            title: "序号",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            titleCellClassName: "titleclass",
            isFrozen: true,
            formatter: function(rowData, rowIndex, pagingIndex, field) {
              return (
                '<span style="color:red;font-weight: bold;">' +
                (rowIndex + 1) +
                "</span>"
              );
            }
          },
          {
            field: "oneDeptName",
            title: "一级单位",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            titleCellClassName: "titleclass"
          },
          {
            field: "twoDeptName",
            title: "二级部门",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            titleCellClassName: "titleclass"
          },
          {
            field: "threeDeptName",
            title: "三级模块",
            width: 120,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            titleCellClassName: "titleclass"
          },
          {
            field: "a0190",
            title: "工号",
            width: 120,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            titleCellClassName: "titleclass"
          },
          {
            field: "a0101",
            title: "姓名",
            width: 120,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            isFrozen: true,
            titleCellClassName: "titleclass"
          },
          {
            field: "a0122",
            title: "司龄",
            width: 120,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            titleCellClassName: "titleclass"
          },
          {
            field: "xl",
            title: "学历",
            width: 120,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            titleCellClassName: "titleclass"
          },
          {
            field: "zj",
            title: "职级",
            width: 120,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            titleCellClassName: "titleclass"
          },

          {
            field: "gwmc",
            title: "岗位名称",
            width: 120,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            titleCellClassName: "titleclass"
          },
          {
            field: "a8602005",
            title: "月固薪",
            width: 120,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            titleCellClassName: "titleclass"
          },
          {
            field: "a8602006",
            title: "年固薪合计",
            width: 120,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            titleCellClassName: "titleclass"
          },
          {
            field: "a8602007",
            title: "年度绩效",
            width: 120,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            titleCellClassName: "titleclass"
          },
          {
            field: "a8602008",
            title: "年终奖",
            width: 120,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            titleCellClassName: "titleclass"
          },
          {
            field: "a8602009",
            title: "标准年薪",
            width: 120,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            titleCellClassName: "titleclass"
          },
          {
            field: "zzgwmc",
            title: "岗位名称",
            width: 120,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            titleCellClassName: "titleclass"
          },
          {
            field: "a8602010",
            title: "月固薪",
            width: 120,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            titleCellClassName: "titleclass"
          },
          {
            field: "a8602021",
            title: "年固薪合计",
            width: 120,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            titleCellClassName: "titleclass"
          },
          {
            field: "a8602011",
            title: "年度绩效",
            width: 120,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            titleCellClassName: "titleclass"
          },
          {
            field: "a8602012",
            title: "年终奖金",
            width: 120,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            titleCellClassName: "titleclass"
          },
          {
            field: "a8602013",
            title: "标准年薪",
            width: 120,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            titleCellClassName: "titleclass"
          },
          {
            field: "A8602014",
            title: "调薪日期",
            width: 120,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            titleCellClassName: "titleclass"
          },
          {
            field: "txfd",
            title: "调薪幅度",
            width: 120,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            titleCellClassName: "titleclass"
          }
        ],
        titleRows: [
          [
            {
              fields: ["custome"],
              title: "序号",
              titleAlign: "center",
              rowspan: 2
            },
            {
              fields: ["oneDeptName"],
              title: "一级单位",
              titleAlign: "center",
              rowspan: 2
            },
            {
              fields: ["twoDeptName"],
              title: "二级部门",
              titleAlign: "center",
              rowspan: 2
            },
            {
              fields: ["threeDeptName"],
              title: "三级模块",
              titleAlign: "center",
              rowspan: 2
            },
            {
              fields: ["a0190"],
              title: "工号",
              titleAlign: "center",
              rowspan: 2
            },
            {
              fields: ["a0101"],
              title: "姓名",
              titleAlign: "center",
              rowspan: 2
            },
            {
              fields: ["a0122"],
              title: "司龄",
              titleAlign: "center",
              rowspan: 2
            },
            {
              fields: ["xl"],
              title: "学历",
              titleAlign: "center",
              rowspan: 2
            },
            {
              fields: ["zj"],
              title: "职级",
              titleAlign: "center",
              rowspan: 2
            },
            {
              fields: [
                "gwmc",
                "a8602005",
                "a8602006",
                "a8602007",
                "a8602008",
                "a8602009"
              ],
              title: "试用期/调整前薪资标准",
              titleAlign: "center",
              colspan: 6
            },
            {
              fields: [
                "zzgwmc",
                "a8602010",
                "a8602021",
                "a8602011",
                "a8602012",
                "a8602013"
              ],
              title: "转正后/调整后薪资标准",
              titleAlign: "center",
              colspan: 6
            },
            {
              fields: ["A8602014"],
              title: "调薪日期",
              titleAlign: "center",
              rowspan: 2
            },
            {
              fields: ["txfd"],
              title: "调薪幅度",
              titleAlign: "center",
              rowspan: 2
            }
          ],
          [
            {
              fields: ["gwmc"],
              title: "岗位名称",
              titleAlign: "center"
            },
            {
              fields: ["a8602005"],
              title: "月固薪",
              titleAlign: "center"
            },
            {
              fields: ["a8602006"],
              title: "年固薪合计",
              titleAlign: "center"
            },
            {
              fields: ["a8602007"],
              title: "年度绩效",
              titleAlign: "center"
            },
            {
              fields: ["a8602008"],
              title: "年终奖",
              titleAlign: "center"
            },
            {
              fields: ["a8602009"],
              title: "标准年薪",
              titleAlign: "center"
            },
            {
              fields: ["zzgwmc"],
              title: "岗位名称",
              titleAlign: "center"
            },
            {
              fields: ["a8602010"],
              title: "月固薪",
              titleAlign: "center"
            },
            {
              fields: ["a8602021"],
              title: "年固薪合计",
              titleAlign: "center"
            },
            {
              fields: ["a8602011"],
              title: "年度绩效",
              titleAlign: "center"
            },
            {
              fields: ["a8602012"],
              title: "年终奖金",
              titleAlign: "center"
            },
            {
              fields: ["a8602013"],
              title: "标准年薪",
              titleAlign: "center"
            }
          ]
        ]
      }
    };
  },
  methods: {
    pageChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.queryFindPayrollInfo();
    },
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
    },
    queryFindPayrollInfo(data) {
      this.isLoading = true;
      let pageNumber = "";
      if (data) {
        pageNumber = data;
      } else {
        pageNumber = 1;
      }
      findPayrollInfo({
        jobnumber: this.ddJobNum,
        pageNum: pageNumber
      }).then(res => {
        this.tableConfig.tableData = res.obj.salaryList;
        this.total = res.obj.count;
        this.isLoading = false;
      });
    },
    upDateNewSearch(data) {
      // debugger
      let pageNumber = "";
      if (data) {
        pageNumber = data;
      } else {
        pageNumber = 1;
      }
      let searchObj = {
        jobnumber: this.ddJobNum,
        pageNum: pageNumber,
        name: this.searchName,
        dept: []
      };
      this.isLoading = true;
      findPayrollInfoBySearch(searchObj).then(res => {
        this.tableConfig.tableData = res.obj.salaryList;
        this.total = res.obj.count;
        this.isLoading = false;
        this.seachFlag = 1;
        // debugger
      });
    },
    onSearch(data) {
      // debugger
      let pageNumber = "";
      if (data) {
        pageNumber = data;
      } else {
        pageNumber = 1;
      }
      let searchObj = {
        jobnumber: this.ddJobNum,
        pageNum: pageNumber,
        name: this.searchName,
        dept: []
      };
      this.isLoading = true;
      findPayrollInfoBySearch(searchObj).then(res => {
        this.tableConfig.tableData = res.obj.salaryList;
        this.total = res.obj.count;
        this.isLoading = false;
        this.seachFlag = 1;
        this.$refs.Paypagination.restPageIndex();
        // debugger
      });
    },
    clearSearchName() {
      this.seachFlag = 0;
      this.searchName = "";
      this.queryFindPayrollInfo();
    },
    selctdept(data, isDown) {},
    queryfindPayrollDept() {
      findPayrollDept({ jobnumber: localStorage.getItem("jobNum") }).then(
        res => {
          this.deptData = res.obj.depts;
        }
      );
    },
    confirmSearch(){

    }
  },
  created() {
    this.queryFindPayrollInfo();
    this.queryfindPayrollDept();
  }
};
</script>
<style lang="stylus" >
.searchSty {
  color: FloralWhite;
  display: inline-block;
  font-size: 22px;
  /* border: 1px solid #ccc; */
  padding: 3px;
  line-height: 22px;
  background-color: DarkKhaki;
}

.titleRewards {
  font-size: 18px;
  font-weight: 700;
  margin-top: 20px;
  color: red;
}
</style>
