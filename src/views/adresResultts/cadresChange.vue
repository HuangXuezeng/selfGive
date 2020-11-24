<template>
    <div style="padding-bottom: 10%">
        <adresNavbar></adresNavbar>
        <adresResultsTanbber ref="adresResultsTanbber" />
        <div class="shodowRewards">
            <van-row type="flex" justify="left" style="margin-bottom: 10px">
                <van-col>
                    <div class="titleRewards">
                        <span class="honghe"></span>
                        干部人数月度变化情况
                    </div>
                </van-col>
            </van-row>
            <div class="resetVantfixed resetVantfixcader">
                <van-dropdown-menu>
                    <van-dropdown-item v-model="selecYear" :options="yearlist" @change="yearChange" title-class="colorFFF" />
                    <van-dropdown-item v-model="selecMoth" :options="mothlist" @change="mothChange" title-class="colorFFF" />
                </van-dropdown-menu>
            </div>
            <!-- <chooseDepartment @confirmNode="selctdept" :Farequired="true" labelTitle="部门:" :workingNum="true" :isSelctall="true" :faDeptData="deptData"></chooseDepartment> -->
        </div>
        <div class="resetVant">
            <v-table is-horizontal-resize style="width: 100%" :columns="columnsCadresChange" :table-data="tableData" row-hover-color="#eee" row-click-color="#edf7ff" :cell-merge="cellMergeCadresChange" :is-loading="lodingFlagcadresChange" :column-cell-class-name="columnCellClassCadresChange"></v-table>
        </div>
        <div>
            <van-row type="flex" justify="left" style="margin-bottom: 10px">
                <van-col>
                    <div class="titleRewards">
                        <span class="honghe"></span>
                        干部才报干部人数年度情况
                    </div>
                </van-col>
            </van-row>
            <!-- <chooseDepartment @confirmNode="YearChangeDepart" :Farequired="true" labelTitle="部门:" :workingNum="true" :isSelctall="true" :faDeptData="deptData"></chooseDepartment> -->
            <div>
                <div style="width: 100%; height: 400px">
                    <div ref="cadresChange" :style="{ width: '100%', height: '400px' }"></div>
                </div>
            </div>
        </div>
        <div>
            <van-row type="flex" justify="left" style="margin-bottom: 10px">
                <van-col>
                    <div class="titleRewards">
                        <span class="honghe"></span>
                        干部管理幅度
                    </div>
                </van-col>
            </van-row>
            <!-- <chooseDepartment @confirmNode="ManagementrangeDepart" :Farequired="true" labelTitle="部门:" :workingNum="true" :isSelctall="true" :faDeptData="deptData"></chooseDepartment> -->
            <v-table is-horizontal-resize style="width: 100%" :columns="columnsManagementrange" :table-data="tableDataManagementrange" row-hover-color="#eee" row-click-color="#edf7ff" :is-loading="lodingFlagManagementrange"></v-table>
        </div>
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
    import adresResultsTanbber from "@/components/adresResultstab/adresResultstab.vue";
    import chooseDepartment from "@/components/chooseDepartment.vue";
    import {
        findPayrollDept
    } from "@/views/PayLibrary/PayLibrary.js";
    import {
        findCadreReportWholeInfo,
        findCadreReportYearChangeInfo,
        findCadreRepotrRangeInfo,
    } from "@/views/adresResultts/adresResults.js";
    import adresNavbar from "@/components/adresResultstab/adresResultsNavbar.vue";
    export default {
        components: {
            adresResultsTanbber,
            chooseDepartment,
            adresNavbar
        },
        data() {
            return {
                deptData: [],
                columnsCadresChange: [{
                        field: "type",
                        title: "职级",
                        width: 120,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "gbbz",
                        title: "干部编制",
                        width: 80,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    // {
                    //   field: "one",
                    //   title: "1月",
                    //   width: 120,
                    //   titleAlign: "center",
                    //   columnAlign: "center",
                    //   isResize: true,
                    //   titleCellClassName: "titleclass",
                    // },
                    // {
                    //   field: "two",
                    //   title: "2月",
                    //   width: 120,
                    //   titleAlign: "center",
                    //   columnAlign: "center",
                    //   isResize: true,
                    //   titleCellClassName: "titleclass",
                    // },
                    // {
                    //   field: "three",
                    //   title: "3月",
                    //   width: 120,
                    //   titleAlign: "center",
                    //   columnAlign: "center",
                    //   isResize: true,
                    //   titleCellClassName: "titleclass",
                    // },
                    // {
                    //   field: "four",
                    //   title: "4月",
                    //   width: 120,
                    //   titleAlign: "center",
                    //   columnAlign: "center",
                    //   isResize: true,
                    //   titleCellClassName: "titleclass",
                    // },
                    // {
                    //   field: "five",
                    //   title: "5月",
                    //   width: 120,
                    //   titleAlign: "center",
                    //   columnAlign: "center",
                    //   isResize: true,
                    //   titleCellClassName: "titleclass",
                    // },
                    // {
                    //   field: "six",
                    //   title: "6月",
                    //   width: 120,
                    //   titleAlign: "center",
                    //   columnAlign: "center",
                    //   isResize: true,
                    //   titleCellClassName: "titleclass",
                    // },
                    // {
                    //   field: "seven",
                    //   title: "7月",
                    //   width: 120,
                    //   titleAlign: "center",
                    //   columnAlign: "center",
                    //   isResize: true,
                    //   titleCellClassName: "titleclass",
                    // },
                    // {
                    //   field: "eight",
                    //   title: "8月",
                    //   width: 120,
                    //   titleAlign: "center",
                    //   columnAlign: "center",
                    //   isResize: true,
                    //   titleCellClassName: "titleclass",
                    // },
                    // {
                    //   field: "nine",
                    //   title: "9月",
                    //   width: 120,
                    //   titleAlign: "center",
                    //   columnAlign: "center",
                    //   isResize: true,
                    //   titleCellClassName: "titleclass",
                    // },
                    // {
                    //   field: "ten",
                    //   title: "10月",
                    //   width: 120,
                    //   titleAlign: "center",
                    //   columnAlign: "center",
                    //   isResize: true,
                    //   titleCellClassName: "titleclass",
                    // },
                    // {
                    //   field: "eleven",
                    //   title: "11月",
                    //   width: 120,
                    //   titleAlign: "center",
                    //   columnAlign: "center",
                    //   isResize: true,
                    //   titleCellClassName: "titleclass",
                    // },
                    // {
                    //   field: "twelve",
                    //   title: "12月",
                    //   width: 120,
                    //   titleAlign: "center",
                    //   columnAlign: "center",
                    //   isResize: true,
                    //   titleCellClassName: "titleclass",
                    // },
                    {
                        field: "avg",
                        title: "平均在编",
                        width: 100,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "gqb",
                        title: "干群比",
                        width: 80,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                ],
                columnsManagementrange: [{
                        field: "type",
                        title: "职级",
                        width: 100,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "count",
                        title: "人数",
                        width: 80,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "magRange",
                        title: "管理幅度",
                        width: 80,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "wholeCompany",
                        title: "公司整体",
                        width: 80,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "compare",
                        title: "比较",
                        width: 80,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                ],
                lodingFlagcadresChange: false,
                lodingFlagManagementrange: false,
                tableData: [],
                ddJobNum: localStorage.getItem("jobNum"),
                selecYear: '',
                yearlist: [],
                tableDataManagementrange: [],
                selecMoth: "",
                mothlist: [],
                queryYear: '',
                queryObj: {
                    jobnumber: localStorage.getItem("jobNum"),
                    deptList: [],
                    isDown: "Y",
                    oneDeptList: [],
                    year: "",
                },
                queryYearChangeObj: {
                    jobnumber: localStorage.getItem("jobNum"),
                    deptList: [],
                    isDown: "Y",
                    oneDeptList: [],
                },
                queryYearManagementrange: {
                    jobnumber: localStorage.getItem("jobNum"),
                    deptList: [],
                    isDown: "Y",
                },
                readySelectDept: []
            };
        },
        created() {
            // debugger;
            this.init();
        },
        mounted() {
            this.$refs.adresResultsTanbber.changtab("cadresChange");
        },
        methods: {
            //数据初始化
            init() {
                this.readySelectDept = [JSON.parse(localStorage.getItem("adresResultDept")).deptId];
                //设定月份
                this.getMoth();
                //获取最新年份
                this.getNewYear();
                // this.queryfindPayrollDept();
                // this.queryFindCadreReportWholeInfo();
                this.queryFindCadreReportYearChangeInfo();
                this.queryfindCadreRepotrRangeInfo();
            },
            yearChange(year) {
                this.selecYear = year
                this.queryObj.year = this.selecYear + this.selecMoth;
                this.queryFindCadreReportWholeInfo(this.queryObj);
            },
            getMoth() {
                this.mothlist = [{
                        text: "1月",
                        field: "one",
                        commomIndex: 1,
                        value: "01"
                    },
                    {
                        text: "2月",
                        field: "two",
                        commomIndex: 2,
                        value: "02"
                    },
                    {
                        text: "3月",
                        field: "three",
                        commomIndex: 3,
                        value: "03"
                    },
                    {
                        text: "4月",
                        field: "four",
                        commomIndex: 4,
                        value: "04"
                    },
                    {
                        text: "5月",
                        field: "five",
                        commomIndex: 5,
                        value: "05"
                    },
                    {
                        text: "6月",
                        field: "six",
                        commomIndex: 6,
                        value: "06"
                    },
                    {
                        text: "7月",
                        field: "seven",
                        commomIndex: 7,
                        value: "07"
                    },
                    {
                        text: "8月",
                        field: "eight",
                        commomIndex: 8,
                        value: "08"
                    },
                    {
                        text: "9月",
                        field: "nine",
                        commomIndex: 9,
                        value: "09"
                    },
                    {
                        text: "10月",
                        field: "ten",
                        commomIndex: 10,
                        value: "10"
                    },
                    {
                        text: "11月",
                        field: "eleven",
                        commomIndex: 11,
                        value: "11"
                    },
                    {
                        text: "12月",
                        field: "twelve",
                        commomIndex: 12,
                        value: "12"
                    },
                ];
            },
            mothChange(value) {
                let selectObj = {};
                for (let i in this.mothlist) {
                    if (this.mothlist[i].value == value) {
                        selectObj = this.mothlist[i];
                        break;
                    }
                }
                // selectObj.field = selectObj.value;
                selectObj.title = selectObj.text;
                selectObj.width = 80;
                selectObj.titleAlign = "center";
                selectObj.columnAlign = "center";
                selectObj.titleCellClassName = "titleclass";
                if (this.columnsCadresChange.length == 5) {
                    this.columnsCadresChange.splice(2, 1);
                    this.columnsCadresChange.splice(2, 0, selectObj);
                } else {
                    this.columnsCadresChange.splice(2, 0, selectObj);
                }
                this.selecMoth = value
                this.queryObj.year = this.selecYear + this.selecMoth;
                this.queryFindCadreReportWholeInfo(this.queryObj);
            },
            //设定年月
            getNewYear() {
                let myDate = new Date();
                let tYear = myDate.getFullYear();
                let tmouth = myDate.getMonth() + 1;

                // this.yearlist.push(tYear+'年')
                for (let i = 0; i < 100; i++) {
                    if (tYear - i == 2018) {
                        this.selecYear = this.yearlist[0].value;
                        for (let k in this.mothlist) {
                            if (this.mothlist[k].commomIndex == tmouth) {
                                this.selecMoth = this.mothlist[k].value;
                                this.mothChange(this.mothlist[k].value);
                                break
                            }
                        }
                        return;
                    } else {
                        let obj = {};
                        obj.text = tYear - i + "年";
                        obj.value = tYear - i;
                        this.yearlist.push(obj);
                    }
                }
            },
            // 查询干部变化情况
            queryFindCadreReportWholeInfo(obj) {
                // debugger
                this.lodingFlagcadresChange = true;
                let queryData = {};
                if (obj) {
                    queryData = obj;
                } else {
                    queryData = {
                        jobnumber: this.ddJobNum,
                        deptList: [],
                        isDown: "Y",
                        oneDeptList: [],
                        year: this.selecYear + this.selecMoth,
                    };
                }
                queryData.deptList = this.readySelectDept
                findCadreReportWholeInfo(queryData).then((res) => {
                    if (res.code == "1000") {
                        this.lodingFlagcadresChange = false;
                        this.tableData = res.obj;
                    } else {
                        Toast.fail(res.msg);
                    }

                    // debugger;
                });
            },
            //查询部门
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
            // 选择部门回调
            selctdept(data, isDown, oneDeptList) {
                this.queryObj.deptList = data;
                this.queryObj.oneDeptList = oneDeptList;
                this.queryObj.isDown = isDown;
                this.queryFindCadreReportWholeInfo(this.queryObj);
            },
            cellMergeCadresChange(rowIndex, rowData, field) {},
            columnCellClassCadresChange(rowIndex, columnName, rowData) {
                if (rowData.type == "M1-M3") {
                    return "mClass";
                }
                if (rowData.type == "M4-M5") {
                    return "pClass";
                }
                if (rowData.type == "M6及以上") {
                    return "sClass";
                }
                if (rowData.type == "P4/S4-P5S5") {
                    return "oClass";
                }
                if (rowData.type == "P6/S6及以上") {
                    return "heClass";
                }
                if (rowData.type == "整体") {
                    return "oClass";
                }
            },
            queryFindCadreReportYearChangeInfo(obj) {
                let queryData = {};
                if (obj) {
                    queryData = obj;
                } else {
                    queryData = {
                        jobnumber: this.ddJobNum,
                        deptList: [],
                        isDown: "Y",
                        oneDeptList: [],
                    };
                }
                queryData.deptList = this.readySelectDept
                findCadreReportYearChangeInfo(queryData).then((res) => {
                    if (res.code == "1000") {
                        this.cadresChangeEchart(res.obj.yearChange);
                    } else {
                        Toast.fail(res.msg);
                    }

                });
            },
            YearChangeDepart(data, isDown, oneDeptList) {
                this.queryYearChangeObj.deptList = data;
                this.queryYearChangeObj.oneDeptList = oneDeptList;
                this.queryYearChangeObj.isDown = isDown;
                this.queryFindCadreReportYearChangeInfo(this.queryYearChangeObj);
            },
            cadresChangeEchart(list) {
                // debugger
                let yearlist = [];
                let avgList = [];
                let gbbzList = [];
                for (let i in list) {
                    if (list[i].gbbz != null) {
                        gbbzList.push(list[i].gbbz);
                    } else {
                        gbbzList.push("");
                    }
                    if (list[i].avg != null) {
                        avgList.push(list[i].avg);
                    } else {
                        avgList.push("");
                    }
                    yearlist.push(list[i].year);
                }
                var myChart = this.$echarts.init(this.$refs.cadresChange);
                myChart.setOption({
                    tooltip: {
                        trigger: "axis",
                    },
                    legend: {
                        data: ["平均在编", "干部编制"],
                    },
                    grid: {
                        left: "3%",
                        right: "6%",
                        bottom: "3%",
                        containLabel: true,
                    },
                    xAxis: {
                        type: "category",
                        boundaryGap: false,
                        data: yearlist,
                    },
                    yAxis: {
                        type: "value",
                    },
                    series: [{
                            name: "平均在编",
                            type: "line",
                            data: avgList,
                        },
                        {
                            name: "干部编制",
                            type: "line",
                            data: gbbzList,
                        },
                    ],
                });
            },
            queryfindCadreRepotrRangeInfo(obj) {
                this.lodingFlagManagementrange = true;
                this.queryYearManagementrange.deptList = this.readySelectDept
                findCadreRepotrRangeInfo(this.queryYearManagementrange).then((res) => {
                    if (res.code == "1000") {
                        this.tableDataManagementrange = res.obj;
                        this.lodingFlagManagementrange = false;
                    } else {
                        Toast.fail(res.msg);
                    }

                });
            },
            ManagementrangeDepart(data, isDown) {
                this.queryYearManagementrange.deptList = data;
                this.queryYearManagementrange.isDown = isDown;
                this.queryfindCadreRepotrRangeInfo();
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

    .colorFFF {
        color: #fff;
    }
</style>
