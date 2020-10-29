<template>
  <div>
    <van-search
      v-model="searchObj.name"
      placeholder="请输入工号或姓名"
      show-action
      :clearable="false"
      @search="onSearch(1)"
      background='Chocolate'
      shape='round'
    >
      <template #action>
        <span
          @click="onSearch(1)"
          style="display: inline-block;color:#fff"
          v-show="!seachFlag"
          >搜索</span
        >
        <span
          @click="clearSearchName"
          style="display: inline-block;color:#fff"
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
    <van-tabs v-model="active" type="card" animated>
      <van-tab title="简略" name="简略">
        <v-table
          is-horizontal-resize
          style="width:100%;"
          is-vertical-resize
          :columns="briefColumns"
          :table-data="tableConfig.tableData"
          row-hover-color="#eee"
          row-click-color="#edf7ff"
          :is-loading="isLoading"
          :paging-index="(pageIndex - 1) * pageSize"
          :vertical-resize-offset="tableBootomHight"
          :even-bg-color='"LightGrey"'
        ></v-table>
      </van-tab>
      <van-tab title="详情" name="详情">
        <div>
          <v-table
            is-horizontal-resize
            style="width:100%;"
            is-vertical-resize
            :title-rows="tableConfig.titleRows"
            :columns="tableConfig.columns"
            :table-data="tableConfig.tableData"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
            :is-loading="isLoading"
            :paging-index="(pageIndex - 1) * pageSize"
            :vertical-resize-offset="tableBootomHight"
            :even-bg-color='"LightGrey"'
          ></v-table>
        </div>
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
          :isFromRost="true"
          ref="salaryDep"
        ></choosedepartment>
        <span class="cadreLine"></span>
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
        <!-- <span class="cadreLine"></span> -->
        <van-field label="最近调薪记录:">
          <template #input>
            <van-stepper v-model="searchObj.num" />
          </template>
        </van-field>
        <!-- <span class="cadreLine"></span> -->
        <van-row type="flex" justify="space-between" style="margin-bottom:10px">
          <van-col span="10">
            <van-button
              type="primary"
              size="normal"
              round
              @click="restSeach"
              style="width:20vh"
              >重置</van-button
            >
          </van-col>
          <van-col span="10">
            <van-button
              type="danger"
              size="normal"
              round
              @click="confirmSearch"
              style="width:20vh"
              >确定</van-button
            >
          </van-col>
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
  Field,
  Button
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
      tableBootomHight: "",
      searchObj: {
        num: 1,
        name: "",
        jobnumber: '',
        pageNum: 1,
        dept: []
      },
      briefColumns: [
        {
          field: "a0101",
          title: "姓名",
          width: 60,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          titleCellClassName: "normalLabelStyle",
          isFrozen: true
        },
        {
          field: "a8602005",
          title: "调整前",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          titleCellClassName: "normalLabelStyle"
        },
        {
          field: "a8602010",
          title: "调整后",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          titleCellClassName: "normalLabelStyle"
        },
        {
          field: "txfd",
          title: "幅度",
          width: 50,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          titleCellClassName: "normalLabelStyle"
        },
        {
          field: "A8602014",
          title: "调薪日期",
          width: 95,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          titleCellClassName: "normalLabelStyle"
        }
      ],
      tableConfig: {
        multipleSort: false,
        tableData: [],
        columns: [
          {
            field: "custome",
            title: "序号",
            width: 30,
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
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            titleCellClassName: "titleclass"
          },
          {
            field: "a0101",
            title: "姓名",
            width: 60,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            isFrozen: true,
            titleCellClassName: "titleclass"
          },
          {
            field: "a0122",
            title: "司龄",
            width: 50,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            titleCellClassName: "titleclass"
          },
          {
            field: "xl",
            title: "学历",
            width: 90,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            titleCellClassName: "titleclass"
          },
          {
            field: "zj",
            title: "职级",
            width: 40,
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
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            titleCellClassName: "titleclass"
          },
          {
            field: "a8602006",
            title: "年固薪合计",
            width: 90,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            titleCellClassName: "titleclass"
          },
          {
            field: "a8602007",
            title: "年度绩效",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            titleCellClassName: "titleclass"
          },
          {
            field: "a8602008",
            title: "年终奖",
            width: 70,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            titleCellClassName: "titleclass"
          },
          {
            field: "a8602009",
            title: "标准年薪",
            width: 90,
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
            width: 100,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            titleCellClassName: "titleclass"
          },
          {
            field: "txfd",
            title: "调薪幅度",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
          }
        ],
        titleRows: [
          [
            {
              fields: ["custome"],
              title: "序号",
              titleAlign: "center",
              rowspan: 2,
              titleCellClassName: "normalLabelStyle"

            },
            {
              fields: ["oneDeptName"],
              title: "一级单位",
              titleAlign: "center",
              rowspan: 2,
              titleCellClassName: "normalLabelStyle"

            },
            {
              fields: ["twoDeptName"],
              title: "二级部门",
              titleAlign: "center",
              rowspan: 2,
              titleCellClassName: "normalLabelStyle"

            },
            {
              fields: ["threeDeptName"],
              title: "三级模块",
              titleAlign: "center",
              rowspan: 2,
              titleCellClassName: "normalLabelStyle"

            },
            {
              fields: ["a0190"],
              title: "工号",
              titleAlign: "center",
              rowspan: 2,
              titleCellClassName: "normalLabelStyle"

            },
            {
              fields: ["a0101"],
              title: "姓名",
              titleAlign: "center",
              rowspan: 2,
              titleCellClassName: "normalLabelStyle"

            },
            {
              fields: ["a0122"],
              title: "司龄",
              titleAlign: "center",
              rowspan: 2,
              titleCellClassName: "normalLabelStyle"

            },
            {
              fields: ["xl"],
              title: "学历",
              titleAlign: "center",
              rowspan: 2,
              titleCellClassName: "normalLabelStyle"

            },
            {
              fields: ["zj"],
              title: "职级",
              titleAlign: "center",
              rowspan: 2,
              titleCellClassName: "normalLabelStyle"

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
              colspan: 6,
              titleCellClassName: "BeforeConfirmationSty"
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
              colspan: 6,
              titleCellClassName: "afterConfirmationSty"
            },
            {
              fields: ["A8602014"],
              title: "调薪日期",
              titleAlign: "center",
              rowspan: 2,
              titleCellClassName: "normalLabelStyle"

            },
            {
              fields: ["txfd"],
              title: "调薪幅度",
              titleAlign: "center",
              rowspan: 2,
              titleCellClassName: "normalLabelStyle"

            }
          ],
          [
            {
              fields: ["gwmc"],
              title: "岗位名称",
              titleAlign: "center",
              titleCellClassName: "BeforeConfirmationSty"

            },
            {
              fields: ["a8602005"],
              title: "月固薪",
              titleAlign: "center",
              titleCellClassName: "BeforeConfirmationSty"

            },
            {
              fields: ["a8602006"],
              title: "年固薪合计",
              titleAlign: "center",
              titleCellClassName: "BeforeConfirmationSty"

            },
            {
              fields: ["a8602007"],
              title: "年度绩效",
              titleAlign: "center",
              titleCellClassName: "BeforeConfirmationSty"

            },
            {
              fields: ["a8602008"],
              title: "年终奖",
              titleAlign: "center",
              titleCellClassName: "BeforeConfirmationSty"

            },
            {
              fields: ["a8602009"],
              title: "标准年薪",
              titleAlign: "center",
              titleCellClassName: "BeforeConfirmationSty"

            },
            {
              fields: ["zzgwmc"],
              title: "岗位名称",
              titleAlign: "center",
              titleCellClassName: "afterConfirmationSty"


            },
            {
              fields: ["a8602010"],
              title: "月固薪",
              titleAlign: "center",
              titleCellClassName: "afterConfirmationSty"

            },
            {
              fields: ["a8602021"],
              title: "年固薪合计",
              titleAlign: "center",
              titleCellClassName: "afterConfirmationSty"

            },
            {
              fields: ["a8602011"],
              title: "年度绩效",
              titleAlign: "center",
              titleCellClassName: "afterConfirmationSty"

            },
            {
              fields: ["a8602012"],
              title: "年终奖金",
              titleAlign: "center",
              titleCellClassName: "afterConfirmationSty"

            },
            {
              fields: ["a8602013"],
              title: "标准年薪",
              titleAlign: "center",
              titleCellClassName: "afterConfirmationSty"

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
    //搜索过后翻页操作
    upDateNewSearch(data) {
      let pageNumber = "";
      if (data) {
        pageNumber = data;
      } else {
        pageNumber = 1;
      }
      this.searchObj.jobnumber = this.ddJobNum;
      this.searchObj.pageNum = pageNumber;
      this.isLoading = true;
      findPayrollInfoBySearch(this.searchObj).then(res => {
        if (res.code == "1000") {
          this.tableConfig.tableData = res.obj.salaryList;
          this.total = res.obj.count;
          this.seachFlag = 1;
          this.resizeHeight()
        } else {
          Toast.fail(res.msg);
        }
        this.isLoading = false;
      });
    },
    //第一次输入搜索调用
    onSearch(data) {
      let pageNumber = "";
      if (data) {
        pageNumber = data;
      } else {
        pageNumber = 1;
      }
      this.searchObj.jobnumber = this.ddJobNum;
      this.searchObj.pageNum = pageNumber;
      this.isLoading = true;
      findPayrollInfoBySearch(this.searchObj).then(res => {
        if (res.code == "1000") {
          this.tableConfig.tableData = res.obj.salaryList;
          this.total = res.obj.count;
          this.seachFlag = 1;
          this.resizeHeight()
        } else {
          Toast.fail(res.msg);
        }
        this.isLoading = false;
      });
    },
    clearSearchName() {
      this.seachFlag = 0;
      this.searchObj.name = "";
      this.queryFindPayrollInfo();
      this.restSeach()
    },
    selctdept(data, isDown) {
      if (data) {
        this.searchObj.dept = data;
      }
    },
    queryfindPayrollDept() {
      findPayrollDept({ jobnumber: localStorage.getItem("jobNum") }).then(
        res => {
          this.deptData = res.obj.depts;
        }
      );
    },
    confirmSearch() {
      this.filtrateFlag = false;
      this.upDateNewSearch();
    },
    restSeach(){
      this.searchObj = {dept:[],jobnumber:this.ddJobNum,name:'',num:1,pageNum:1}
      this.$refs.salaryDep.RemoveNodeMeth()
    },
    resizeHeight(){
      this.tableBootomHight = window.screen.height * 0.1;
      console.log(this.tableBootomHight)
    }
  },
  created() {
    debugger
    this.queryFindPayrollInfo();
    this.queryfindPayrollDept();
    this.resizeHeight()
  }
};
</script>
<style lang="stylus" >
.searchSty {
  color: FloralWhite;
  display: inline-block;
  font-size: 22px;
  border: 1px solid #fff;
  padding: 3px;
  line-height: 22px;
  border-radius: 10px;
}

.titleRewards {
  font-size: 18px;
  font-weight: 700;
  margin-top: 20px;
  color: red;
}

.cadreLine {
  width: 100%;
  border-bottom: 0.5px solid #ebedf0;
  display: inline-block;
}

.BeforeConfirmationSty {
  background-color: Peru;
  color:#fff;
}

.afterConfirmationSty {
  background-color: Chocolate;
  color:#fff;
}
.normalLabelStyle{
  background-color: IndianRed;
  color:#fff;
}
</style>
