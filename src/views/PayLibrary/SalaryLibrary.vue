<template>
  <div>
    <v-table
      is-vertical-resize=""
      :vertical-resize-offset="60"
      is-horizontal-resize
      style="width:100%"
      :multiple-sort="false"
      :min-height="350"
      even-bg-color="#f2f2f2"
      :title-rows="tableConfig.titleRows"
      :columns="tableConfig.columns"
      :table-data="tableConfig.tableData"
      row-hover-color="#eee"
      row-click-color="#edf7ff"
      :paging-index="(pageIndex - 1) * pageSize"
    ></v-table>

    <div class="mt20 mb20 bold"></div>
    <v-pagination
      @page-change="pageChange"
      @page-size-change="pageSizeChange"
      :total="50"
      :page-size="pageSize"
      :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"
    ></v-pagination>
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
  Overlay
} from "vant";
import payTab from "@/components/PayLibrary/pay-tab.vue";
import {
  findPayrollDept,
  findPayrollInfo
} from "@/views/PayLibrary/PayLibrary.js";
import noData from "@/components/noData.vue";
import chooseDepartment from "@/components/chooseDepartment.vue";

export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      ddJobNum: localStorage.getItem("jobNum"),
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
            field: "lastDate",
            title: "调薪日期",
            width: 120,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            titleCellClassName: "titleclass"
          },
          {
            field: "lastSalary",
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
              fields: ["lastDate"],
              title: "调薪日期",
              titleAlign: "center",
              rowspan: 2
            },
            {
              fields: ["lastSalary"],
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
    // getTableData() {
    //   this.tableConfig.tableData = tableDate.slice(
    //     (this.pageIndex - 1) * this.pageSize,
    //     this.pageIndex * this.pageSize
    //   );
    // },
    pageChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.queryFindPayrollInfo();
      // console.log(pageIndex);
    },
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      // this.getTableData();
    },
    queryFindPayrollInfo() {
      findPayrollInfo({ jobnumber: this.ddJobNum, pageNum: this.pageIndex }).then(res => {
        this.tableConfig.tableData = res.obj;
      });
    }
  },
  created() {
    this.queryFindPayrollInfo();
  }
};
</script>
