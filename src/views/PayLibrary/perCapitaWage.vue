<template>
    <div style="padding-bottom: 10%" class="my-container resetVantfixed">
        <payTab ref="payTab"></payTab>
        <!-- <van-tabs
      v-model="vanTabsActive"
      scrollspy
      sticky
      type="card"
      ref="vanTabs"
    > -->
        <!-- <van-tab title="各职级平均工资" name="各职级平均工资"> -->
        <div class="shodowRewards">
            <van-row type="flex" justify="left" style="margin-bottom: 10px">
                <van-col>
                    <div class="titleRewards">
                        <span class="honghe"></span>
                        各职级平均工资
                    </div>
                </van-col>
            </van-row>
            <chooseZJlist ref="chooseZJlistRef" :checkboxlist="checkboxlist" :selectZjNameMap="selectZjNameMap" @confirmZj="selctzjquery"></chooseZJlist>
            <!-- <van-row type="flex">
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
          </van-row> -->
        </div>
        <div style="width: 100%" v-if="!showNodata">
            <div ref="payEch" :style="{ width: '100%', height: '500px' }"></div>
        </div>
        <noData :showNodata="showNodata"></noData>
        <!-- </van-tab> -->
        <!-- <van-tab title="各职类平均工资" name="各职类平均工资"> -->
        <div class="shodowRewards">
            <van-row type="flex" justify="left" style="margin-bottom: 10px">
                <van-col>
                    <div class="titleRewards">
                        <span class="honghe"></span>
                        各职类平均工资
                    </div>
                </van-col>
            </van-row>
            <choosedepartment @confirmNode="selctdept" :Farequired="true" labelTitle="部门:" :workingNum="true" :isSelctall="true" :faDeptData="deptData"></choosedepartment>
        </div>
        <div class="resetVant">
            <v-table is-horizontal-resize style="width: 100%" :columns="columnsAnnualSalary" :table-data="tableDataAnnualSalary" row-hover-color="#eee" row-click-color="#edf7ff" :cell-merge="cellMergeAnnualSalary" :is-loading="lodingFlagAnnualSalary" :column-cell-class-name="columnCellClassAnnualSalary" :row-click="lineChart"></v-table>
        </div>
        <!-- </van-tab> -->
        <!-- </van-tabs> -->
        <van-overlay :show="lineChartShow" @click="lineChartShow = false">
            <div class="lineChartWrapper">
                <div class="lineChartBox" @click.stop>
                    <div ref="lineChart" :style="{ width: '300px', height: '300px' }"></div>
                </div>
            </div>
        </van-overlay>
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
        Overlay,
    } from "vant";
    import payTab from "@/components/PayLibrary/pay-tab.vue";
    import {
        findPerGetInfo,
        findPerGetDetailsInfo,
        findPerYearInfo,
        findPayrollDept,
    } from "@/views/PayLibrary/PayLibrary.js";
    import noData from "@/components/noData.vue";
    import chooseDepartment from "@/components/chooseDepartment.vue";
    import chooseZJlist from "@/components/PayLibrary/chooseZJlist.vue";
    export default {
        components: {
            payTab,
            noData,
            choosedepartment: chooseDepartment,
            chooseZJlist,
        },
        data() {
            return {
                tableData: [],
                columns: [{
                        field: "zl",
                        title: "职类",
                        width: 80,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "zj",
                        title: "职级",
                        width: 80,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "month",
                        title: "本月",
                        width: 120,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "lastMonth",
                        title: "上月",
                        width: 120,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "hb",
                        title: "环比",
                        width: 120,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "tb",
                        title: "同比",
                        width: 120,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "tq",
                        title: "同期",
                        width: 120,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                ],
                mlength: 1,
                plength: 1,
                slength: 1,
                olength: 1,
                lodingFlag: true,
                selectedyear: "",
                // currentDate: "",
                minDate: new Date(2020, 0, 1),
                maxDate: null,
                currentDate: new Date(),
                vanDateShow: false,
                rightPop: false,
                result: [],
                checkboxlist: [],
                selectZj: null,
                selectzjName: "全部",
                selectZjNameMap: null,
                selctzjqueryLoading: false,
                firstInflag: 0,
                showNodata: false,
                //人均年薪
                columnsAnnualSalary: [{
                        field: "zl",
                        title: "职类",
                        width: 80,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "zj",
                        title: "职级",
                        width: 80,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                        formatter: function(rowData, rowIndex, pagingIndex, field) {
                            return `<span class='bluejunpColor'>${rowData[field]}</span>`;
                            //  '<span  onclick=test("' + rowData +');>'+rowData[field]+'</span>'
                        },
                    },
                    {
                        field: "lastTwelve",
                        title: "上年12月",
                        width: 120,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "one",
                        title: "1月",
                        width: 120,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "two",
                        title: "2月",
                        width: 120,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "three",
                        title: "3月",
                        width: 120,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "four",
                        title: "4月",
                        width: 120,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "five",
                        title: "5月",
                        width: 120,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "six",
                        title: "6月",
                        width: 120,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "seven",
                        title: "7月",
                        width: 120,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "eight",
                        title: "8月",
                        width: 120,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "nine",
                        title: "9月",
                        width: 120,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "ten",
                        title: "10月",
                        width: 120,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "eleven",
                        title: "11月",
                        width: 120,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "twelve",
                        title: "12月",
                        width: 120,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "zf",
                        title: "较上年12月增幅",
                        width: 120,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                ],
                tableDataAnnualSalary: [],
                lodingFlagAnnualSalary: true,
                mAnnualSalary: 1,
                pAnnualSalary: 1,
                sAnnualSalary: 1,
                oAnnualSalary: 1,
                ddJobNum: localStorage.getItem("jobNum"),
                deptData: [],
                lineChartShow: false,
                vanTabsActive: "人均工资",
            };
        },
        watch: {
            tableData: function() {
                // this.$nextTick(() => {
                //   //判断由那个入口进来的 salaryFlag 0平均工资 1人均年薪
                //   if (this.$route.params.salaryFlag == 1) {
                //     this.$refs.vanTabs.scrollTo("人均年薪");
                //   } else {
                //     this.$refs.vanTabs.scrollTo("人均工资");
                //   }
                // });
            },
        },
        created() {
            this.initMethods();
        },
        mounted() {
            this.$refs.payTab.changtab("perCapitaWage");
        },

        methods: {
            async initMethods() {
                let nowData = new Date();
                let y = nowData.getFullYear();
                let m = nowData.getMonth() - 1;
                this.maxDate = new Date(y, m, 1);
                await this.queryfindPerGetInfo();
                await this.queryfindPerGetDetailsInfo();
                await this.queryfindPerYearInfo();
                await this.queryfindPayrollDept();
                this.selectZj = new Set();
                this.selectZjNameMap = new Map();
            },
            getContainer() {
                return document.querySelector(".my-container");
            },
            //弹出右边职级选择框
            rightPopShow() {
                this.rightPop = true;
                if (!this.firstInflag) {
                    this.firstInflag++;
                    this.$nextTick(() => {
                        this.restSelectZj(1);
                        // this.$refs.checkboxes[0].toggle(true);
                    });
                }
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
            cellMerge(rowIndex, rowData, field) {
                if (field === "zl" && rowData[field] === "M类") {
                    return {
                        colSpan: 1,
                        rowSpan: this.mlength,
                        content: '<span style="color:red">M类</span>',
                        componentName: "",
                    };
                }
                if (field === "zl" && rowData[field] === "P类") {
                    return {
                        colSpan: 1,
                        rowSpan: this.plength,
                        content: '<span style="color:red">P类</span>',
                        componentName: "",
                    };
                }
                if (field === "zl" && rowData[field] === "S类") {
                    return {
                        colSpan: 1,
                        rowSpan: this.slength,
                        content: '<span style="color:red">S类</span>',
                        componentName: "",
                    };
                }
                if (field === "zl" && rowData[field] === "O类") {
                    return {
                        colSpan: 1,
                        rowSpan: this.olength,
                        content: '<span style="color:red">O类</span>',
                        componentName: "",
                    };
                }
                if (field === "zl" && rowData[field] === "合计") {
                    return {
                        colSpan: 2,
                        rowSpan: 1,
                        content: '<span style="color:red">合计</span>',
                        componentName: "",
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
            queryfindPerGetInfo(queryObj) {
                let queryData = {};
                if (queryObj) {
                    queryData = queryObj;
                } else {
                    queryData = {
                        jobnumber: this.ddJobNum
                    };
                }
                findPerGetInfo(queryData).then((res) => {
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
                            tq: res.obj.tqTotal,
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
            formatter(type, val) {
                if (type === "year") {
                    return `${val}年`;
                } else if (type === "month") {
                    return `${val}月`;
                }
                return val;
            },
            confirmYear(value) {
                let valueTime = new Date(value);
                let y = valueTime.getFullYear();
                let m = (valueTime.getMonth() + 1).toString().padStart(2, "0");
                let lastm = valueTime.getMonth().toString().padStart(2, "0");
                let lasty = y;
                this.selectedyear = y + "年" + m + "月";
                if (m == "01") {
                    lasty = y - 1;
                    lastm = "12";
                }
                let queryObj = {
                    jobnumber: this.ddJobNum,
                    year: y + m,
                    lastYear: lasty + lastm,
                };
                this.queryfindPerGetInfo(queryObj);
                this.lodingFlag = true;
                this.vanDateShow = false;
            },
            selctzjquery(data) {
                // if (!this.selectZj.size) {
                //   Toast.fail("请至少选择一项");
                //   return;
                // }
                // this.selctzjqueryLoading = true;
                // let zjListArry = Array.from(this.selectZj);
                // this.selectzjName = "";
                // zjListArry.forEach(item => {
                //   if (this.selectZjNameMap.has(item)) {
                //     this.selectzjName =
                //       this.selectzjName + "+" + this.selectZjNameMap.get(item);
                //   }
                // });
                // this.selectzjName = this.selectzjName.slice(1);
                this.echartsLoding()
                findPerGetDetailsInfo({
                    jobnumber: this.ddJobNum,
                    flag: "2",
                    zjList: data,
                }).then((res) => {
                    if (res.code == 1000) {
                        this.showNodata = false;
                        // this.$nextTick(() => {
                        this.payEachrts(res);
                        // });
                        this.rightPop = false;
                    } else {
                        Toast.fail(res.msg);
                    }
                    // this.selctzjqueryLoading = false;
                    this.$refs.chooseZJlistRef.shutDownLading();
                });
            },
            queryfindPayrollDept() {
                if (
                    localStorage.getItem("SalaryDeptRes") == "" ||
                    localStorage.getItem("SalaryDeptRes") == null ||
                    localStorage.getItem("SalaryDeptRes") == "underfined" ||
                    JSON.parse(localStorage.getItem("SalaryDeptRes")).code != "1000"
                ) {
                    findPayrollDept({
                        jobnumber: localStorage.getItem("jobNum")
                    }).then(
                        (res) => {
                            this.deptData = res.obj.depts;
                        }
                    );
                } else {
                    const SalaryDeptRes = JSON.parse(localStorage.getItem("SalaryDeptRes"));
                    this.deptData = SalaryDeptRes.obj.depts;
                }
            },
            queryfindPerGetDetailsInfo() {
                this.echartsLoding()
                findPerGetDetailsInfo({
                    jobnumber: this.ddJobNum,
                    flag: "1",
                    zjList: [],
                }).then((res) => {
                    if (res.code == 1000) {
                        let zlList = res.obj.zlList;
                        let indexNum = 0;
                        for (let i in zlList) {
                            zlList[i].zlchecked = false;
                            zlList[i].zlNum = i;
                            if (zlList[i].zjList != null) {
                                for (let k in zlList[i].zjList) {
                                    zlList[i].zjList[k].indexNumber = indexNum;
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
                        this.checkboxlist = res.obj.zlList;
                        this.showNodata = false;
                        // this.$nextTick(() => {
                        this.payEachrts(res);
                        // });
                    } else {
                        Toast.fail(res.msg);
                    }
                });
            },
            //公共方法 补全月份
            /**
             * type 1 当前年份，echartData：原始数据，YearList：月份数组，avgNumbeList：折线图数据
             */
            MonFull(echartData, YearList, avgNumbeList, nowYear, type) {
                // nowYear = echartData.year[0].mon.substring(0, 4);
                if (type == 1) {
                    for (let k in echartData.year) {
                        let splityear = echartData.year[k].mon.replace(
                            /^(\d{4})(\d{2})$/,
                            "$1-$2"
                        );
                        YearList.push(splityear);
                        avgNumbeList.push(echartData.year[k].avgNumber);
                    }
                } else {
                    for (let k in echartData.lastYear) {
                        let splityear = echartData.lastYear[k].mon.replace(
                            /^(\d{4})(\d{2})$/,
                            "$1-$2"
                        );
                        YearList.push(splityear);
                        avgNumbeList.push(echartData.lastYear[k].avgNumber);
                    }
                }

                //年份数据不全，补全月份
                let MinstagingList = [];
                let MinavgNumbestagingList = [];
                let MaxstagingList = [];
                let MaxavgNumbestagingList = [];
                let maxMon = YearList[YearList.length - 1].split("-")[1];
                let minMon = YearList[0].split("-")[1];
                if (maxMon != "12") {
                    let NumnowLast = Number(maxMon);
                    for (let p = NumnowLast + 1; p <= 12; p++) {
                        MaxstagingList.push(nowYear + "-" + p.toString().padStart(2, "0"));
                        MaxavgNumbestagingList.push("");
                    }
                }
                if (minMon != "01") {
                    let minMonNum = Number(minMon);
                    for (let t = 1; t < minMonNum; t++) {
                        MinstagingList.push(nowYear + "-" + t.toString().padStart(2, "0"));
                        MinavgNumbestagingList.push("");
                    }
                }
                YearList = MinstagingList.concat(YearList);
                YearList = YearList.concat(MaxstagingList);
                avgNumbeList = MinavgNumbestagingList.concat(avgNumbeList);
                avgNumbeList = avgNumbeList.concat(MaxavgNumbestagingList);
                return {
                    avgNumbeList: avgNumbeList,
                    YearList: YearList
                };
            },
            echartsLoding() {
                var myCharts = this.$echarts.init(this.$refs.payEch);
                myCharts.showLoading({
                    text: "loading",
                    color: "#4cbbff",
                    textColor: "#4cbbff",
                    maskColor: "rgba(0, 0, 0, 0.9",
                });
            },
            payEachrts(res) {
                var myCharts = this.$echarts.init(this.$refs.payEch);
                let echartData = res.obj;
                let lastYearList = [];
                let lastavgNumberList = [];
                let YearList = [];
                let avgNumbeList = [];
                let nowYear = "";
                let lastYear = "";
                if (echartData.year.length == 0 && echartData.lastYear.length == 0) {
                    //判断今年和去年都为空
                    myCharts.clear();
                    this.showNodata = true;
                    return;
                } else if (
                    echartData.lastYear.length == 0 &&
                    echartData.year.length != 0
                ) {
                    //判断今年不为空，去年为空
                    nowYear = echartData.year[0].mon.substring(0, 4);
                    lastYear = Number(nowYear) - 1;
                    let nowyearobj = this.MonFull(
                        echartData,
                        YearList,
                        avgNumbeList,
                        nowYear,
                        1
                    );
                    YearList = nowyearobj.YearList;
                    avgNumbeList = nowyearobj.avgNumbeList;
                    avgNumbeList.push(echartData.jdlj);
                    for (let u = 1; u <= 12; u++) {
                        lastYearList.push(lastYear + "-" + u.toString().padStart(2, "0"));
                        lastavgNumberList.push("");
                    }
                    YearList.push("阶段累计");
                    lastYearList.push("阶段累计");
                    lastavgNumberList.push("");
                } else {
                    //今年和去年都有数据的
                    lastYear = echartData.lastYear[0].mon.substring(0, 4);
                    nowYear = echartData.year[0].mon.substring(0, 4);
                    let lastyearobj = this.MonFull(
                        echartData,
                        lastYearList,
                        lastavgNumberList,
                        lastYear
                    );
                    lastYearList = lastyearobj.YearList;
                    lastavgNumberList = lastyearobj.avgNumbeList;
                    let nowyearobj = this.MonFull(
                        echartData,
                        YearList,
                        avgNumbeList,
                        nowYear,
                        1
                    );
                    YearList = nowyearobj.YearList;
                    avgNumbeList = nowyearobj.avgNumbeList;
                    lastYearList.push("阶段累计");
                    YearList.push("阶段累计");
                    avgNumbeList.push(echartData.jdlj);
                    lastavgNumberList.push(echartData.lastJdlj);
                }
                var colors = ["#5793f3", "#d14a61", "#675bba"];

                function isInteger(obj) {
                    return obj % 1 === 0;
                }
                myCharts.setOption({
                    color: colors,

                    tooltip: {
                        trigger: "none",
                        axisPointer: {
                            type: "cross",
                        },
                    },
                    legend: {
                        data: [lastYear + " 职级工资", nowYear + " 职级工资"],
                    },
                    grid: {
                        top: 70,
                        bottom: 50,
                        left: 50,
                    },
                    xAxis: [{
                            type: "category",
                            axisTick: {
                                alignWithLabel: true,
                            },
                            axisLine: {
                                onZero: false,
                                lineStyle: {
                                    color: colors[1],
                                },
                            },
                            axisPointer: {
                                label: {
                                    formatter: function(params) {
                                        return (
                                            "职级工资  " +
                                            params.value +
                                            (params.seriesData.length ?
                                                "：" + params.seriesData[0].data :
                                                "")
                                        );
                                    },
                                },
                            },
                            data: YearList,
                        },
                        {
                            type: "category",
                            axisTick: {
                                alignWithLabel: true,
                            },
                            axisLine: {
                                onZero: false,
                                lineStyle: {
                                    color: colors[0],
                                },
                            },
                            axisPointer: {
                                label: {
                                    formatter: function(params) {
                                        return (
                                            "职级工资  " +
                                            params.value +
                                            (params.seriesData.length ?
                                                "：" + params.seriesData[0].data :
                                                "")
                                        );
                                    },
                                },
                            },
                            data: lastYearList,
                        },
                    ],
                    yAxis: [{
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
                            },
                        },
                    }, ],
                    series: [{
                            name: lastYear + " 职级工资",
                            type: "line",
                            xAxisIndex: 1,
                            smooth: true,
                            data: lastavgNumberList,
                        },
                        {
                            name: nowYear + " 职级工资",
                            type: "line",
                            smooth: true,
                            data: avgNumbeList,
                        },
                    ],
                });
                myCharts.hideLoading()
            },
            //重置选择的职级(第一次进全选)
            restSelectZj(type) {
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
            queryfindPerYearInfo(queryObj) {
                let queryData = {};
                if (queryObj) {
                    queryData = queryObj;
                } else {
                    queryData = {
                        jobnumber: this.ddJobNum,
                        deptList: [],
                    };
                }
                findPerYearInfo(queryData).then((res) => {
                    if (res.code == 1000) {
                        //先初始化
                        this.tableDataAnnualSalary = [];
                        let mlist = [];
                        let plist = [];
                        let slist = [];
                        let olist = [];
                        for (let k in res.obj) {
                            if (res.obj[k].zl == "M类") {
                                mlist.push(res.obj[k]);
                            } else if (res.obj[k].zl == "P类") {
                                plist.push(res.obj[k]);
                            } else if (res.obj[k].zl == "S类") {
                                slist.push(res.obj[k]);
                            } else if (res.obj[k].zl == "O类") {
                                olist.push(res.obj[k]);
                            }
                        }
                        this.mAnnualSalary = mlist.length;
                        this.pAnnualSalary = plist.length;
                        this.sAnnualSalary = slist.length;
                        this.oAnnualSalary = olist.length;
                        this.orderPush(mlist);
                        this.orderPush(plist);
                        this.orderPush(slist);
                        this.orderPush(olist);
                        for (let t in res.obj) {
                            if (res.obj[t].zl == "合计") {
                                this.tableDataAnnualSalary.push(res.obj[t]);
                            }
                        }
                        //第一次请求不需要重置位置
                        // if (queryObj) {
                        //   this.$nextTick(() => {
                        //     this.$refs.vanTabs.scrollTo("人均年薪");
                        //   });
                        // }
                    } else {
                        Toast.fail(res.msg);
                    }
                    this.lodingFlagAnnualSalary = false;
                });
            },
            cellMergeAnnualSalary(rowIndex, rowData, field) {
                if (field === "zl" && rowData[field] === "M类") {
                    return {
                        colSpan: 1,
                        rowSpan: this.mAnnualSalary,
                        content: '<span style="color:red">M类</span>',
                        componentName: "",
                    };
                }
                if (field === "zl" && rowData[field] === "P类") {
                    return {
                        colSpan: 1,
                        rowSpan: this.pAnnualSalary,
                        content: '<span style="color:red">P类</span>',
                        componentName: "",
                    };
                }
                if (field === "zl" && rowData[field] === "S类") {
                    return {
                        colSpan: 1,
                        rowSpan: this.sAnnualSalary,
                        content: '<span style="color:red">S类</span>',
                        componentName: "",
                    };
                }
                if (field === "zl" && rowData[field] === "O类") {
                    return {
                        colSpan: 1,
                        rowSpan: this.oAnnualSalary,
                        content: '<span style="color:red">O类</span>',
                        componentName: "",
                    };
                }
                if (field === "zl" && rowData[field] === "合计") {
                    return {
                        colSpan: 2,
                        rowSpan: 1,
                        content: '<span style="color:red">合计</span>',
                        componentName: "",
                    };
                }
            },
            columnCellClassAnnualSalary(rowIndex, columnName, rowData) {
                if (rowIndex < this.mAnnualSalary) {
                    return "mClass";
                }
                if (this.mAnnualSalary <= rowIndex && rowData.zl == "P类") {
                    return "pClass";
                }
                if (this.pAnnualSalary <= rowIndex && rowData.zl == "S类") {
                    return "sClass";
                }
                if (this.sAnnualSalary <= rowIndex && rowData.zl == "O类") {
                    return "oClass";
                }
                if (rowData.zl == "合计") {
                    return "heClass";
                }
            },
            lineChart(rowIndex, rowData, column) {
                this.lineChartShow = true;
                var myCharts = this.$echarts.init(this.$refs.lineChart);
                let chartData = [
                    rowData.lastTwelve,
                    rowData.one,
                    rowData.two,
                    rowData.three,
                    rowData.four,
                    rowData.five,
                    rowData.six,
                    rowData.seven,
                    rowData.eight,
                    rowData.nine,
                    rowData.ten,
                    rowData.eleven,
                    rowData.twelve,
                ];

                function isInteger(obj) {
                    return obj % 1 === 0;
                }
                myCharts.setOption({
                    xAxis: {
                        type: "category",
                        data: [
                            "上年12月",
                            "1月",
                            "2月",
                            "3月",
                            "4月",
                            "5月",
                            "6月",
                            "7月",
                            "8月",
                            "9月",
                            "10月",
                            "12月",
                        ],
                    },
                    yAxis: {
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
                            },
                        },
                    },
                    title: {
                        text: rowData.zj + "趋势图",
                        left: "center",
                        align: "right",
                    },
                    grid: {
                        left: 50,
                    },
                    tooltip: {
                        trigger: "axis",
                    },
                    series: [{
                        data: chartData,
                        type: "line",
                        smooth: true,
                    }, ],
                });
            },
            //按顺序装填数组
            orderPush(list) {
                if (list) {
                    for (let i in list) {
                        this.tableDataAnnualSalary.push(list[i]);
                    }
                }
            },
            selctdept(data, isDown) {
                this.lodingFlagAnnualSalary = true;
                if (data.length != 0) {
                    this.queryfindPerYearInfo({
                        jobnumber: this.ddJobNum,
                        deptList: data,
                        isDown: isDown,
                    });
                }
            },
        },
    };
</script>

<style lang="stylus">
    .honghe {
        width: 10px;
        height: 15px;
        display: inline-block;
        background-color: red;
    }

    .titleclass {
        background-color: #dc7272;
        color: #ffffff;
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

    .bluejunpColor {
        color: blue;
    }

    .lineChartWrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .lineChartBox {
        width: 300px;
        height: 300px;
        background-color: #fff;
    }

    .shodowRewards {
        box-shadow: rgba(100, 101, 102, 0.12) -9px 5px 60px -10px;
    }

    .titleRewards {
        font-size: 18px;
        font-weight: 700;
        margin-top: 20px;
        color: red;
    }

    .labelStyle {
        color: red;
    }
</style>
