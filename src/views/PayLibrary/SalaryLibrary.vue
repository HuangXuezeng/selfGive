<template>
  <div style="padding-bottom: 20%;">
    <div>
      <van-search
        v-model="searchObj.name"
        placeholder="请输入工号或姓名"
        show-action
        :clearable="false"
        @search="onSearch(1)"
        background="Chocolate"
        shape="round"
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

          <span class="searchSty" @click="showPopupClick">
            <van-icon name="filter-o" />
            <span style="font-size:12px;">筛选</span>
          </span>
        </template>
      </van-search>
      <div>
        <van-row type="flex" justify="left" style="margin-bottom:10px">
          <van-col>
            <div class="titleSalary">
              <span class="honghe"></span>
              薪资库
            </div>
          </van-col>
        </van-row>
        <!-- <van-pagination
              v-model="currentPage"
              :total-items="125"
              :show-page-size="3"
              force-ellipses
            /> -->
        <pagination
          :Fatotal="total"
          :Faseachflag="seachFlag"
          @queryNewSearch="upDateNewSearch"
          @queryNew="queryFindPayrollInfo"
          ref="Paypagination"
        ></pagination>
        <van-tabs v-model="active" type="card" class="resetVant" animated>
          <van-tab name="简略">
            <template #title>
              <van-icon name="coupon-o" size="20px" />简略
            </template>
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
              :even-bg-color="'LightGrey'"
            ></v-table>
          </van-tab>
          <van-tab name="详情">
            <template #title>
              <van-icon name="orders-o" size="20px" />详情
            </template>

            <div>
              <v-table
                is-horizontal-resize
                style="width:100%;"
                is-vertical-resize
                :min-height="300"
                :title-rows="tableConfig.titleRows"
                :columns="tableConfig.columns"
                :table-data="tableConfig.tableData"
                row-hover-color="#eee"
                row-click-color="#edf7ff"
                :is-loading="isLoading"
                :paging-index="(pageIndex - 1) * pageSize"
                :vertical-resize-offset="tableBootomHight"
                :even-bg-color="'LightGrey'"
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
          <div style="background-color: Chocolate;">
            <van-row type="flex" justify="center" style="margin-bottom:10px">
              <van-col>
                <div class="titleRewardSalary">
                  筛选条件
                </div></van-col
              >
            </van-row>
          </div>
          <div>
            <choosedepartment
              @confirmNode="selctdept"
              :Farequired="true"
              labelTitle="部门:"
              :workingNum="true"
              :isSelctall="true"
              :faDeptData="deptData"
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
            <van-field label="最近调薪记录:" label-width="7em">
              <template #input>
                <van-stepper v-model="searchObj.num" />
              </template>
            </van-field>
            <!-- <span class="cadreLine"></span> -->
            <van-row type="flex" justify="space-around" style="margin-top:20px">
              <van-col span="8">
                <van-button
                  type="primary"
                  size="normal"
                  @click="restSeach"
                  style="width:15vh"
                  >重置</van-button
                >
              </van-col>
              <van-col span="8">
                <van-button
                  type="danger"
                  size="normal"
                  @click="confirmSearch"
                  style="width:15vh"
                  >确定</van-button
                >
              </van-col>
            </van-row>
          </div>
        </van-popup>
      </div>
      <div>
        <van-row type="flex" justify="left" style="margin-bottom:10px">
          <van-col>
            <div class="titleRewards">
              <span class="honghe"></span>
              人均工资
            </div></van-col
          >
        </van-row>
        <van-row type="flex">
          <van-col span="24">
            <van-field
              readonly
              clickable
              label="年/月:"
              label-class="labelStyle"
              v-model="selectedyear"
              placeholder="请选择年月"
              @click="vanDateShow = true"
            />
            <van-action-sheet v-model="vanDateShow">
              <van-datetime-picker
                v-model="currentDate"
                type="year-month"
                title="选择年月"
                :min-date="minDate"
                :max-date="maxDate"
                :formatter="formatter"
                @confirm="confirmYear"
              />
            </van-action-sheet>
          </van-col>
        </van-row>
      </div>
      <div class="resetVant">
        <v-table
          is-horizontal-resize
          style="width:100%"
          :columns="columns"
          :table-data="tableData"
          row-hover-color="#eee"
          row-click-color="#edf7ff"
          :cell-merge="cellMerge"
          :is-loading="lodingFlag"
          :column-cell-class-name="columnCellClass"
        ></v-table>
      </div>
      <div>
        <!-- <van-tab title="人均工资" name="人均工资"> -->
        <div class="shodowRewards">
          <van-row type="flex" justify="left" style="margin-bottom:10px">
            <van-col>
              <div class="titleRewards">
                <span class="honghe"></span>
                年薪分位值
              </div></van-col
            >
          </van-row>
          <van-row type="flex">
            <choosedepartment
              @confirmNode="selctdept"
              :Farequired="true"
              labelTitle="部门:"
              :workingNum="true"
              :isSelctall="true"
              :faDeptData="deptData"
              ref="salaryDep"
            ></choosedepartment>
          </van-row>
        </div>
        <div class="resetVant">
          <v-table
            is-horizontal-resize
            style="width:100%"
            :columns="SalaryLibraryColumns"
            :table-data="SalaryLibrarytableData"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
            :cell-merge="SalaryLibrarycellMerge"
            :is-loading="SalaryLibrarylodingFlag"
            :column-cell-class-name="columnCellClass"
          ></v-table>
        </div>
      </div>
      <div>
        <van-row type="flex" justify="left" style="margin-bottom:10px">
          <van-col>
            <div class="titleRewards">
              <span class="honghe"></span>
              年薪分位值趋势图
            </div></van-col
          >
        </van-row>
        <div>
          <choosedepartment
            @confirmNode="tantileSelectdept"
            :Farequired="true"
            labelTitle="部门:"
            :workingNum="true"
            :isSelctall="true"
            :faDeptData="deptData"
            ref="salaryDep"
          ></choosedepartment>
          <chooseZJlist
            ref="chooseZJlistRef"
            :checkboxlist="checkboxlist"
            :selectZjNameMap="selectZjNameMap"
            @confirmZj="confirmZjMethod"
          ></chooseZJlist>
          <div style="width:100%;">
            <div
              ref="tantileEchart"
              :style="{ width: '100%', height: '500px' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
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
  Button,
  Pagination
} from "vant";
import payTab from "@/components/PayLibrary/pay-tab.vue";
import {
  findPayrollDept,
  findPayrollInfo,
  findPayrollInfoBySearch,
  findPerGetInfo,
  findFwValueInfo,
  findZjListInfo,
  findFwDeatilsInfo
} from "@/views/PayLibrary/PayLibrary.js";
import noData from "@/components/noData.vue";
import chooseDepartment from "@/components/chooseDepartment.vue";
import pagination from "@/components/PayLibrary/pagination.vue";
import chooseZJlist from "@/components/PayLibrary/chooseZJlist.vue";

export default {
  components: {
    payTab,
    noData,
    pagination,
    choosedepartment: chooseDepartment,
    chooseZJlist
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
        jobnumber: "",
        pageNum: 1,
        dept: []
      },
      concelFlag: false,
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
          field: "a8602009",
          title: "调整前",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          titleCellClassName: "normalLabelStyle"
        },
        {
          field: "a8602013",
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
            isResize: true
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
      },
      columns: [
        {
          field: "zl",
          title: "职类",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          titleCellClassName: "titleclass"
        },
        {
          field: "zj",
          title: "职级",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          titleCellClassName: "titleclass"
        },
        {
          field: "month",
          title: "本月",
          width: 120,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          titleCellClassName: "titleclass"
        },
        {
          field: "lastMonth",
          title: "上月",
          width: 120,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          titleCellClassName: "titleclass"
        },
        {
          field: "hb",
          title: "环比",
          width: 120,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          titleCellClassName: "titleclass"
        },
        {
          field: "tb",
          title: "同比",
          width: 120,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          titleCellClassName: "titleclass"
        },
        {
          field: "tq",
          title: "同期",
          width: 120,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          titleCellClassName: "titleclass"
        }
      ],
      tableData: [],
      vanTabsActive: "薪资库",
      selectedyear: "",
      vanDateShow: false,
      // currentDate: "",
      currentDate: new Date(),
      minDate: new Date(2020, 0, 1),
      maxDate: null,
      lodingFlag: true,
      //年薪分位值
      selectedyear: "",
      vanDateShow: false,
      currentDate: "",
      minDate: new Date(2020, 0, 1),
      maxDate: null,
      SalaryLibraryColumns: [
        {
          field: "zl",
          title: "职类",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          titleCellClassName: "titleclass"
        },
        {
          field: "zj",
          title: "职级",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          titleCellClassName: "titleclass"
        },
        {
          field: "numMin",
          title: "最小值",
          width: 120,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          titleCellClassName: "titleclass"
        },
        {
          field: "num25",
          title: "25分位值",
          width: 120,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          titleCellClassName: "titleclass"
        },
        {
          field: "num50",
          title: "50分位值",
          width: 120,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          titleCellClassName: "titleclass"
        },
        {
          field: "numAvg",
          title: "平均值",
          width: 120,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          titleCellClassName: "titleclass"
        },
        {
          field: "num75",
          title: "75分位值",
          width: 120,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          titleCellClassName: "titleclass"
        },
        {
          field: "numMax",
          title: "最大值",
          width: 120,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          titleCellClassName: "titleclass"
        }
      ],
      SalaryLibrarytableData: [],
      SalaryLibrarylodingFlag: true,
      ddJobNum: localStorage.getItem("jobNum"),
      mlength: 0,
      plength: 0,
      slength: 0,
      olength: 0,
      searchObj: {
        deptList: [],
        isDown: "",
        jobnumber: ""
      },
      deptData: [],
      checkboxlist: [],
      selectZjNameMap: null,
      selectZj: null
    };
  },
  created() {
    this.initMethods();
  },
  methods: {
    initMethods() {
      let nowData = new Date();
      let y = nowData.getFullYear();
      let m = nowData.getMonth() - 1;
      this.maxDate = new Date(y, m, 1);
      this.selectZjNameMap = new Map();
      this.selectZj = new Set();
      this.queryfindPerGetInfo();
      this.queryFindPayrollInfo();
      this.queryfindPayrollDept();
      this.resizeHeight();
      this.queryfindFwValueInfo();
      this.queryfindPayrollDept();
      this.queryFindZjListInfo();
      this.queryFindFwDeatilsInfo();
      // this.tantileEchart()
    },
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      }
      return val;
    },
    cellMerge(rowIndex, rowData, field) {
      if (field === "zl" && rowData[field] === "M类") {
        return {
          colSpan: 1,
          rowSpan: this.mlength,
          content: '<span style="color:red">M类</span>',
          componentName: ""
        };
      }
      if (field === "zl" && rowData[field] === "P类") {
        return {
          colSpan: 1,
          rowSpan: this.plength,
          content: '<span style="color:red">P类</span>',
          componentName: ""
        };
      }
      if (field === "zl" && rowData[field] === "S类") {
        return {
          colSpan: 1,
          rowSpan: this.slength,
          content: '<span style="color:red">S类</span>',
          componentName: ""
        };
      }
      if (field === "zl" && rowData[field] === "O类") {
        return {
          colSpan: 1,
          rowSpan: this.olength,
          content: '<span style="color:red">O类</span>',
          componentName: ""
        };
      }
      if (field === "zl" && rowData[field] === "合计") {
        return {
          colSpan: 2,
          rowSpan: 1,
          content: '<span style="color:red">合计</span>',
          componentName: ""
        };
      }
    },
    columnCellClass(rowIndex, columnName, rowData) {
      if (rowIndex < this.mlength) {
        return "mClass";
      }
      if (this.mlength <= rowIndex && rowData.zl == "P类") {
        return "pClass";
      }
      if (this.plength <= rowIndex && rowData.zl == "S类") {
        return "sClass";
      }
      if (this.slength <= rowIndex && rowData.zl == "O类") {
        return "oClass";
      }
      if (rowData.zl == "合计") {
        return "heClass";
      }
    },
    pageChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.queryFindPayrollInfo();
    },
    queryfindPerGetInfo(queryObj) {
      let queryData = {};
      if (queryObj) {
        queryData = queryObj;
      } else {
        queryData = { jobnumber: this.ddJobNum };
      }
      findPerGetInfo(queryData).then(res => {
        if (res.code == 1000) {
          //先初始化
          this.tableData = [];
          for (let key in res.obj) {
            if (key == "m" && res.obj[key]) {
              this.mlength = res.obj[key].length;
              for (let m in res.obj[key]) {
                res.obj[key][m].zl = "M类";
                this.tableData.push(res.obj[key][m]);
              }
            } else if (key == "p" && res.obj[key]) {
              this.plength = res.obj[key].length;
              for (let p in res.obj[key]) {
                res.obj[key][p].zl = "P类";
                this.tableData.push(res.obj[key][p]);
              }
            } else if (key == "s" && res.obj[key]) {
              this.slength = res.obj[key].length;
              for (let s in res.obj[key]) {
                res.obj[key][s].zl = "S类";
                this.tableData.push(res.obj[key][s]);
              }
            } else if (key == "o" && res.obj[key]) {
              this.olength = res.obj[key].length;
              for (let o in res.obj[key]) {
                res.obj[key][o].zl = "O类";
                this.tableData.push(res.obj[key][o]);
              }
            }
          }
          let totalObj = {
            zl: "合计",
            zj: "",
            hb: res.obj.hbTotal,
            lastMonth: res.obj.lastMonthTotal,
            month: res.obj.monthTotal,
            tb: res.obj.tbTotal,
            tq: res.obj.tqTotal
          };
          this.tableData.push(totalObj);
          if (res.obj.year != null) {
            let resTime = res.obj.year.replace(/^(\d{4})(\d{2})$/, "$1-$2");
            let newTime = new Date(resTime);
            let y = newTime.getFullYear();
            let m = newTime.getMonth();
            this.maxDate = new Date(y, m, 1);
            m = (newTime.getMonth() + 1).toString().padStart(2, "0");
            this.selectedyear = y + "年" + m + "月";
          }
        } else {
          Toast.fail(res.msg);
        }
        this.lodingFlag = false;
      });
    },
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
    },
    showPopupClick() {
      this.filtrateFlag = true;
      this.$nextTick(() => {
        if (this.concelFlag) {
          this.$refs.salaryDep.RemoveNodeMeth();
          this.concelFlag = false;
        }
      });
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
          this.resizeHeight();
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
          this.resizeHeight();
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
      this.restSeach();
    },
    selctdept(data, isDown) {
      if (data) {
        this.searchObj.dept = data;
      }
    },
    confirmYear(value) {
      // debugger
      let valueTime = new Date(value);
      let y = valueTime.getFullYear();
      let m = (valueTime.getMonth() + 1).toString().padStart(2, "0");
      let lastm = valueTime
        .getMonth()
        .toString()
        .padStart(2, "0");
      let lasty = y;
      this.selectedyear = y + "年" + m + "月";
      if (m == "01") {
        lasty = y - 1;
        lastm = "12";
      }
      let queryObj = {
        jobnumber: this.ddJobNum,
        year: y + m,
        lastYear: lasty + lastm
      };
      this.queryfindPerGetInfo(queryObj);
      this.lodingFlag = true;
      this.vanDateShow = false;
    },
    queryfindPayrollDept() {
      if (
        localStorage.getItem("SalaryDeptRes") == "" ||
        localStorage.getItem("SalaryDeptRes") == null ||
        localStorage.getItem("SalaryDeptRes") == "underfined" ||
        JSON.parse(localStorage.getItem("SalaryDeptRes")).code != "1000"
      ) {
        findPayrollDept({ jobnumber: localStorage.getItem("jobNum") }).then(
          res => {
            this.deptData = res.obj.depts;
          }
        );
      } else {
        const SalaryDeptRes = JSON.parse(localStorage.getItem("SalaryDeptRes"));
        this.deptData = SalaryDeptRes.obj.depts;
      }
    },
    confirmSearch() {
      this.filtrateFlag = false;

      this.upDateNewSearch();
    },
    restSeach() {
      // debugger
      this.searchObj = {
        dept: [],
        jobnumber: this.ddJobNum,
        name: "",
        num: 1,
        pageNum: 1
      };
      this.concelFlag = true;
    },
    resizeHeight() {
      if (navigator.userAgent.indexOf("iPhone") > -1) {
        this.tableBootomHight = window.screen.height * 0.1;
      } else {
        this.tableBootomHight = window.screen.height * 0.06;
      }
    },
    //年薪分位值方法
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      }
      return val;
    },
    SalaryLibrarycellMerge(rowIndex, rowData, field) {
      if (field === "zl" && rowData[field] === "M类") {
        return {
          colSpan: 1,
          rowSpan: this.mlength,
          content: '<span style="color:red">M类</span>',
          componentName: ""
        };
      }
      if (field === "zl" && rowData[field] === "P类") {
        return {
          colSpan: 1,
          rowSpan: this.plength,
          content: '<span style="color:red">P类</span>',
          componentName: ""
        };
      }
      if (field === "zl" && rowData[field] === "S类") {
        return {
          colSpan: 1,
          rowSpan: this.slength,
          content: '<span style="color:red">S类</span>',
          componentName: ""
        };
      }
      if (field === "zl" && rowData[field] === "O类") {
        return {
          colSpan: 1,
          rowSpan: this.olength,
          content: '<span style="color:red">O类</span>',
          componentName: ""
        };
      }
      if (field === "zl" && rowData[field] === "合计") {
        return {
          colSpan: 2,
          rowSpan: 1,
          content: '<span style="color:red">合计</span>',
          componentName: ""
        };
      }
    },
    columnCellClass(rowIndex, columnName, rowData) {
      if (rowIndex < this.mlength) {
        return "mClass";
      }
      if (this.mlength <= rowIndex && rowData.zl == "P类") {
        return "pClass";
      }
      if (this.plength <= rowIndex && rowData.zl == "S类") {
        return "sClass";
      }
      if (this.slength <= rowIndex && rowData.zl == "O类") {
        return "oClass";
      }
      if (rowData.zl == "合计") {
        return "heClass";
      }
    },
    queryfindFwValueInfo(queryObj) {
      let queryData = {};
      if (queryObj) {
        queryData = queryObj;
      } else {
        queryData = { jobnumber: this.ddJobNum, deptList: [] };
      }
      findFwValueInfo(queryData).then(res => {
        if (res.code == 1000) {
          //先初始化
          this.SalaryLibrarytableData = [];
          let mlist = [];
          let plist = [];
          let slist = [];
          let olist = [];
          for (let i in res.obj) {
            switch (res.obj[i].zl) {
              case "M类":
                mlist.push(res.obj[i]);
                break;
              case "P类":
                plist.push(res.obj[i]);
                break;
              case "S类":
                slist.push(res.obj[i]);
                break;
              case "O类":
                olist.push(res.obj[i]);
                break;
              default:
                break;
            }
          }
          if (mlist.length) {
            this.mlength = mlist.length;
          }
          if (plist.length) {
            this.plength = plist.length;
          }
          if (slist.length) {
            this.slength = slist.length;
          }
          if (olist.length) {
            this.olength = olist.length;
          }
          this.SalaryLibrarytableData = res.obj;
        } else {
          Toast.fail(res.msg);
        }
        this.SalaryLibrarylodingFlag = false;
      });
    },
    selctdept(data, isDown) {
      if (data) {
        this.searchObj.deptList = data;
        this.searchObj.isDown = isDown;
        this.searchObj.jobnumber = this.ddJobNum;
        this.SalaryLibrarylodingFlag = true;
        this.queryfindFwValueInfo(this.searchObj);
      }
    },
    queryfindPayrollDept() {
      if (
        localStorage.getItem("SalaryDeptRes") == "" ||
        localStorage.getItem("SalaryDeptRes") == null ||
        localStorage.getItem("SalaryDeptRes") == "underfined" ||
        JSON.parse(localStorage.getItem("SalaryDeptRes")).code != "1000"
      ) {
        findPayrollDept({ jobnumber: localStorage.getItem("jobNum") }).then(
          res => {
            this.deptData = res.obj.depts;
          }
        );
      } else {
        const SalaryDeptRes = JSON.parse(localStorage.getItem("SalaryDeptRes"));
        this.deptData = SalaryDeptRes.obj.depts;
      }
    },
    tantileSelectdept(data, isdown) {
      let queryData = {
        deptList: data,
        isDown: isdown,
        jobnumber: this.ddJobNum
      };
      findZjListInfo(queryData).then(res => {
        if (res.code == 1000) {
          let zlList = res.obj;
          for (let p in zlList) {
            zlList[p].zjList = zlList[p].zj;
          }
          let indexNum = 0;
          for (let i in zlList) {
            zlList[i].zlchecked = false;
            zlList[i].zlNum = i;
            zlList[i].zl = zlList[i].zlName;
            if (zlList[i].zjList != null) {
              for (let k in zlList[i].zjList) {
                zlList[i].zjList[k].indexNumber = indexNum;
                zlList[i].zjList[k].number = zlList[i].zjList[k].key;
                zlList[i].zjList[k].zj = zlList[i].zjList[k].value;
                // if (zlList[i].zjList[k].zj == "M3") {
                this.selectZj.add(zlList[i].zjList[k].number);
                // }
                indexNum++;
                this.selectZjNameMap.set(
                  zlList[i].zjList[k].number,
                  zlList[i].zjList[k].zj
                );
              }
            }
          }
          this.checkboxlist = res.obj;
        } else {
          Toast.fail(res.msg);
        }
      });
    },
    queryFindZjListInfo() {
      let queryData = { deptList: [], isDown: "Y", jobnumber: this.ddJobNum };
      findZjListInfo(queryData).then(res => {
        if (res.code == 1000) {
          let zlList = res.obj;
          for (let p in zlList) {
            zlList[p].zjList = zlList[p].zj;
          }
          let indexNum = 0;
          for (let i in zlList) {
            zlList[i].zlchecked = false;
            zlList[i].zlNum = i;
            zlList[i].zl = zlList[i].zlName;
            if (zlList[i].zjList != null) {
              for (let k in zlList[i].zjList) {
                zlList[i].zjList[k].indexNumber = indexNum;
                zlList[i].zjList[k].number = zlList[i].zjList[k].key;
                zlList[i].zjList[k].zj = zlList[i].zjList[k].value;
                // if (zlList[i].zjList[k].zj == "M3") {
                this.selectZj.add(zlList[i].zjList[k].number);
                // }
                indexNum++;
                this.selectZjNameMap.set(
                  zlList[i].zjList[k].number,
                  zlList[i].zjList[k].zj
                );
              }
            }
          }
          this.checkboxlist = res.obj;
        } else {
          Toast.fail(res.msg);
        }
      });
    },
    queryFindFwDeatilsInfo() {
      findFwDeatilsInfo({
        jobnumber: this.ddJobNum,
        zjList: [],
        deptList: [],
        isDown: "Y"
      }).then(res => {
        debugger;
        this.tantileEchart(res.obj);
      });
    },
    tantileEchart(data) {
      debugger;
      var myCharts = this.$echarts.init(this.$refs.tantileEchart);
      let month = [];
      let num25List = [];
      let num50List = [];
      let num75List = [];
      let numAvgList = [];
      let numMaxList = [];
      let numMinList = [];
      for (let i in data) {
        month.push(data[i].month);
        num25List.push(data[i].num25);
        num50List.push(data[i].num50);
        num75List.push(data[i].num75);
        numAvgList.push(data[i].numAvg);
        numMaxList.push(data[i].numMax);
        numMinList.push(data[i].numMin);
      }
      function isInteger(obj) {
        return obj % 1 === 0;
      }
    //   title: {
    //     text: '折线图堆叠'
    // },
    // tooltip: {
    //     trigger: 'axis'
    // },
    // legend: {
    //     data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    // },
    // grid: {
    //     left: '3%',
    //     right: '4%',
    //     bottom: '3%',
    //     containLabel: true
    // },
    // toolbox: {
    //     feature: {
    //         saveAsImage: {}
    //     }
    // },
    // xAxis: {
    //     type: 'category',
    //     boundaryGap: false,
    //     data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    // },
    // yAxis: {
    //     type: 'value'
    // },
    // series: [
    //     {
    //         name: '邮件营销',
    //         type: 'line',
    //         stack: '总量',
    //         data: [120, 132, 101, 134, 90, 230, 210]
    //     },
    //     {
    //         name: '联盟广告',
    //         type: 'line',
    //         stack: '总量',
    //         data: [220, 182, 191, 234, 290, 330, 310]
    //     },
    //     {
    //         name: '视频广告',
    //         type: 'line',
    //         stack: '总量',
    //         data: [150, 232, 201, 154, 190, 330, 410]
    //     },
    //     {
    //         name: '直接访问',
    //         type: 'line',
    //         stack: '总量',
    //         data: [320, 332, 301, 334, 390, 330, 320]
    //     },
    //     {
    //         name: '搜索引擎',
    //         type: 'line',
    //         stack: '总量',
    //         data: [820, 932, 901, 934, 1290, 1330, 1320]
    //     }
    // ]
      myCharts.setOption({
        // title: {
        //   text: "堆叠区域图"
        // },
        // tooltip: {
        //   trigger: "axis",
        //   axisPointer: {
        //     type: "cross",
        //     label: {
        //       // backgroundColor: "#6a7985"
        //     }
        //   }
        // },
        tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
        },
        legend: {
          data: [
            "最小值",
            "25分位值",
            "50分位值",
            "平均值",
            "75分位值",
            "最大值"
          ]
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: month
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              show: true,
              formatter: function(value, index) {
                let text = "";
                if (Math.abs(value) >= 10000) {
                  let divisionNum = value / 10000;
                  if (!isInteger(divisionNum)) {
                    return (text = divisionNum.toFixed(2) + "万");
                  } else {
                    return (text = divisionNum + "万");
                  }
                } else if (Math.abs(value) >= 1000) {
                  let divisionNum = value / 1000;
                  if (!isInteger(divisionNum)) {
                    return (text = divisionNum.toFixed(2) + "千");
                  } else {
                    return (text = divisionNum + "千");
                  }
                } else {
                  return value;
                }
              }
            }
          }
        ],
        series: [
          {
            name: "最小值",
            type: "line",
            data: numMinList
          },
          {
            name: "25分位值",
            type: "line",
            data: num25List
          },
          {
            name: "50分位值",
            type: "line",
            data: num50List
          },
          {
            name: "平均值",
            type: "line",
            data: numAvgList
          },
          {
            name: "75分位值",
            type: "line",
            data: num75List
          },
          {
            name: "最大值",
            type: "line",
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: function(item, index) {
                  let value = item.value
                  let text = "";
                  if (Math.abs(value) >= 10000) {
                    let divisionNum = value / 10000;
                    if (!isInteger(divisionNum)) {
                      return (text = divisionNum.toFixed(2) + "万");
                    } else {
                      return (text = divisionNum + "万");
                    }
                  } else if (Math.abs(value) >= 1000) {
                    let divisionNum = value / 1000;
                    if (!isInteger(divisionNum)) {
                      return (text = divisionNum.toFixed(2) + "千");
                    } else {
                      return (text = divisionNum + "千");
                    }
                  } else {
                    return value;
                  }
                }
              }
            },
            data: numMaxList
          }
        ]
      });
    },
    confirmZjMethod(data) {
      debugger;
    }
  }
};
</script>
<style lang="stylus">
.searchSty {
  color: FloralWhite;
  display: inline-block;
  font-size: 22px;
  border: 1px solid #fff;
  padding: 3px;
  line-height: 22px;
  border-radius: 10px;
}

.titleRewardSalary {
  font-size: 18px;
  font-weight: 700;
  padding: 20px;
  color: #fff;
}

.titleRewards {
  font-size: 18px;
  font-weight: 700;
  margin-top: 20px;
  color: red;
}

.titleSalary {
  font-size: 18px;
  font-weight: 700;
  color: red;
  margin-top: 8px;
}

.cadreLine {
  width: 100%;
  border-bottom: 0.5px solid #ebedf0;
  display: inline-block;
}

.BeforeConfirmationSty {
  background-color: Peru;
  color: #fff;
}

.afterConfirmationSty {
  background-color: Chocolate;
  color: #fff;
}

.normalLabelStyle {
  background-color: IndianRed;
  color: #fff;
}

.mClass {
  background-color: #FFEBCD;
}

.pClass {
  background-color: #FFDEAD;
}

.sClass {
  background-color: #FFEBCD;
}

.oClass {
  background-color: #FFDEAD;
}

.heClass {
  background-color: #FFEBCD;
}

.honghe {
  width: 10px;
  height: 15px;
  display: inline-block;
  background-color: red;
}

.labelStyle {
  color: red;
}
</style>
