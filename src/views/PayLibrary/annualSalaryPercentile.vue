<template>
  <div style="padding-bottom: 25%;">
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
        :columns="columns"
        :table-data="tableData"
        row-hover-color="#eee"
        row-click-color="#edf7ff"
        :cell-merge="cellMerge"
        :is-loading="lodingFlag"
        :column-cell-class-name="columnCellClass"
      ></v-table>
    </div>
    <!-- </van-tab> -->
    <payTab></payTab>
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
import payTab from "@/components/PayLibrary/pay-tab.vue";
import {
  findFwValueInfo,
  findPayrollDept
} from "@/views/PayLibrary/PayLibrary.js";
import noData from "@/components/noData.vue";
import chooseDepartment from "@/components/chooseDepartment.vue";
export default {
  components: {
    payTab,
    noData,
    choosedepartment: chooseDepartment
  },
  data() {
    return {
      selectedyear: "",
      vanDateShow: false,
      currentDate: "",
      minDate: new Date(2020, 0, 1),
      maxDate: null,
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
      tableData: [],
      lodingFlag: true,
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
      deptData: []
    };
  },
  created() {
    this.queryfindFwValueInfo();
    this.queryfindPayrollDept()
  },
  methods: {
    confirmYear(value) {
      // let valueTime = new Date(value);
      // let y = valueTime.getFullYear();
      // let m = (valueTime.getMonth() + 1).toString().padStart(2, "0");
      // let lastm = valueTime
      //   .getMonth()
      //   .toString()
      //   .padStart(2, "0");
      // let lasty = y;
      // this.selectedyear = y + "年" + m + "月";
      // if (m == "01") {
      //   lasty = y - 1;
      //   lastm = "12";
      // }
      // let queryObj = {
      //   jobnumber: this.ddJobNum,
      //   year: y + m,
      //   lastYear: lasty + lastm
      // };
      // this.queryfindPerGetInfo(queryObj);
      // this.lodingFlag = true;
      // this.vanDateShow = false;
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
      if (
        rowData.zl == "合计"
      ) {
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
          this.tableData = [];
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
          this.tableData = res.obj;
        } else {
          Toast.fail(res.msg);
        }
        this.lodingFlag = false;
      });
    },
    selctdept(data, isDown) {
      if (data) {
        this.searchObj.deptList = data;
        this.searchObj.isDown = isDown;
        this.searchObj.jobnumber = this.ddJobNum;
        this.lodingFlag = true
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
    }
  }
};
</script>

<style lang="stylus">
.shodowRewards {
  box-shadow: rgba(100, 101, 102, 0.12) -9px 5px 60px -10px;
}

.titleRewards {
  font-size: 18px;
  font-weight: 700;
  margin-top: 20px;
  color: red;
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
.titleclass {
  background-color: #dc7272;
  color: #ffffff;
}
</style>
