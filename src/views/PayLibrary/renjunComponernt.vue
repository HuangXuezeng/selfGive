<!-- 人均工资 -->
<template>
    <div class=''>
        <div class="shodowRewards">
            <van-row type="flex" justify="left" style="margin-bottom: 10px">
                <van-col>
                    <div class="titleRewards">
                        <span class="honghe"></span>
                        人均年薪
                    </div>
                </van-col>
            </van-row>
            <chooseDepartment @confirmNode="selctdept" :Farequired="true" labelTitle="部门:" :workingNum="true" :isSelctall="true" :faDeptData="deptData"></chooseDepartment>
            <van-field v-model="monthVal" label="月份" placeholder="请选择月份" @click-input="showMonth = true" readonly/>
        </div>
        <div class="resetVant">
            <v-table is-horizontal-resize style="width: 100%" :columns="columnsAnnualSalary" :table-data="tableDataAnnualSalary" row-hover-color="#eee" row-click-color="#edf7ff" :cell-merge="cellMergeAnnualSalary" :is-loading="lodingFlagAnnualSalary" :column-cell-class-name="columnCellClassAnnualSalary" :row-click="lineChart"></v-table>
        </div>
        <van-overlay :show="lineChartShow" @click="lineChartShow = false">
            <div class="lineChartWrapper">
                <div class="lineChartBox" @click.stop>
                    <div ref="lineChart" :style="{ width: '300px', height: '300px' }"></div>
                </div>
            </div>
        </van-overlay>
        <!-- 选择月份 -->
        <van-popup v-model="showMonth" round position="bottom" get-container="body">
            <van-picker
                show-toolbar
                :columns="monthColumns"
                value-key="text"
                @cancel="showMonth = false"
                @confirm="confirmMonthClick"
            />
        </van-popup>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
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
    import chooseDepartment from "@/components/chooseDepartment.vue";
    import {
        findPerGetInfo,
        findPerGetDetailsInfo,
        findPerYearInfo,
        findPayrollDept,
    } from "@/views/PayLibrary/PayLibrary.js";
    export default {
        name: 'renjunComponernt',
        //import引入的组件需要注入到对象中才能使用
        components: {
            chooseDepartment
        },
        data() {
            //这里存放数据
            return {
                monthVal: '', //月份
                showMonth: false,
                monthColumns: [
                    {'keyId':'1','text':"1月"},
                    {'keyId':'2','text':"2月"},
                    {'keyId':'3','text':"3月"},
                    {'keyId':'4','text':"4月"},
                    {'keyId':'5','text':"5月"},
                    {'keyId':'6','text':"6月"},
                    {'keyId':'7','text':"7月"},
                    {'keyId':'8','text':"8月"},
                    {'keyId':'9','text':"9月"},
                    {'keyId':'10','text':"10月"},
                    {'keyId':'11','text':"11月"},
                    {'keyId':'12','text':"12月"},
                ],
                deptData: [],
                columnsAnnualSalary: [{
                        field: "zl",
                        title: "职类",
                        width: 60,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        isFrozen: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "zj",
                        title: "职级",
                        width: 60,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        isFrozen: true,
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
                    // {
                    //     field: "one",
                    //     title: "1月",
                    //     width: 120,
                    //     titleAlign: "center",
                    //     columnAlign: "center",
                    //     isResize: true,
                    //     titleCellClassName: "titleclass",
                    // },
                    // {
                    //     field: "two",
                    //     title: "2月",
                    //     width: 120,
                    //     titleAlign: "center",
                    //     columnAlign: "center",
                    //     isResize: true,
                    //     titleCellClassName: "titleclass",
                    // },
                    // {
                    //     field: "three",
                    //     title: "3月",
                    //     width: 120,
                    //     titleAlign: "center",
                    //     columnAlign: "center",
                    //     isResize: true,
                    //     titleCellClassName: "titleclass",
                    // },
                    // {
                    //     field: "four",
                    //     title: "4月",
                    //     width: 120,
                    //     titleAlign: "center",
                    //     columnAlign: "center",
                    //     isResize: true,
                    //     titleCellClassName: "titleclass",
                    // },
                    // {
                    //     field: "five",
                    //     title: "5月",
                    //     width: 120,
                    //     titleAlign: "center",
                    //     columnAlign: "center",
                    //     isResize: true,
                    //     titleCellClassName: "titleclass",
                    // },
                    // {
                    //     field: "six",
                    //     title: "6月",
                    //     width: 120,
                    //     titleAlign: "center",
                    //     columnAlign: "center",
                    //     isResize: true,
                    //     titleCellClassName: "titleclass",
                    // },
                    // {
                    //     field: "seven",
                    //     title: "7月",
                    //     width: 120,
                    //     titleAlign: "center",
                    //     columnAlign: "center",
                    //     isResize: true,
                    //     titleCellClassName: "titleclass",
                    // },
                    // {
                    //     field: "eight",
                    //     title: "8月",
                    //     width: 120,
                    //     titleAlign: "center",
                    //     columnAlign: "center",
                    //     isResize: true,
                    //     titleCellClassName: "titleclass",
                    // },
                    // {
                    //     field: "nine",
                    //     title: "9月",
                    //     width: 120,
                    //     titleAlign: "center",
                    //     columnAlign: "center",
                    //     isResize: true,
                    //     titleCellClassName: "titleclass",
                    // },
                    // {
                    //     field: "ten",
                    //     title: "10月",
                    //     width: 120,
                    //     titleAlign: "center",
                    //     columnAlign: "center",
                    //     isResize: true,
                    //     titleCellClassName: "titleclass",
                    // },
                    // {
                    //     field: "eleven",
                    //     title: "11月",
                    //     width: 120,
                    //     titleAlign: "center",
                    //     columnAlign: "center",
                    //     isResize: true,
                    //     titleCellClassName: "titleclass",
                    // },
                    // {
                    //     field: "twelve",
                    //     title: "12月",
                    //     width: 120,
                    //     titleAlign: "center",
                    //     columnAlign: "center",
                    //     isResize: true,
                    //     titleCellClassName: "titleclass",
                    // },
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
                ddJobNum: localStorage.getItem("jobNum"),
                mAnnualSalary: 1,
                pAnnualSalary: 1,
                sAnnualSalary: 1,
                oAnnualSalary: 1,
                lineChartShow: false,
            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
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
            queryfindPerYearInfo(queryObj) {
                let queryData = {};
                let mon = this.formatDate(new Date()).toString()
                mon = mon.replace(/^0/, '')
                if (queryObj) {
                    queryData = queryObj;
                } else {
                    queryData = {
                        jobnumber: this.ddJobNum,
                        deptList: [],
                        month: mon
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
                        if(queryData.month == '1'){
                            this.columnsAnnualSalary.splice(3, 0,
                                {
                                    field: "one",
                                    title: "1月",
                                    width: 120,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                },
                            )
                        }else if(queryData.month == '2'){
                            this.columnsAnnualSalary.splice(3, 0,
                                {
                                    field: "two",
                                    title: "2月",
                                    width: 120,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                },
                            )
                        }else if(queryData.month == '3'){
                            this.columnsAnnualSalary.splice(3, 0,
                                {
                                    field: "three",
                                    title: "3月",
                                    width: 120,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                },
                            )
                        }else if(queryData.month == '4'){
                            this.columnsAnnualSalary.splice(3, 0,
                                {
                                    field: "four",
                                    title: "4月",
                                    width: 120,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                },
                            )
                        }else if(queryData.month == '5'){
                            this.columnsAnnualSalary.splice(3, 0,
                                {
                                    field: "five",
                                    title: "5月",
                                    width: 120,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                },
                            )
                        }else if(queryData.month == '6'){
                            this.columnsAnnualSalary.splice(3, 0,
                                {
                                    field: "six",
                                    title: "6月",
                                    width: 120,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                },
                            )
                        }else if(queryData.month == '7'){
                            this.columnsAnnualSalary.splice(3, 0,
                                {
                                    field: "seven",
                                    title: "7月",
                                    width: 120,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                },
                            )
                        }else if(queryData.month == '8'){
                            this.columnsAnnualSalary.splice(3, 0,
                                {
                                    field: "eight",
                                    title: "8月",
                                    width: 120,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                },
                            )
                        }else if(queryData.month == '9'){
                            this.columnsAnnualSalary.splice(3, 0,
                                {
                                    field: "nine",
                                    title: "9月",
                                    width: 120,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                },
                            )
                        }else if(queryData.month == '10'){
                            this.columnsAnnualSalary.splice(3, 0,
                                {
                                    field: "ten",
                                    title: "10月",
                                    width: 120,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                },
                            )
                        }else if(queryData.month == '11'){
                            this.columnsAnnualSalary.splice(3, 0,
                                {
                                    field: "eleven",
                                    title: "11月",
                                    width: 120,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                },
                            )
                        }else if(queryData.month == '12'){
                            this.columnsAnnualSalary.splice(3, 0,
                                {
                                    field: "twelve",
                                    title: "12月",
                                    width: 120,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                },
                            )
                        }
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
            //按顺序装填数组
            orderPush(list) {
                if (list) {
                    for (let i in list) {
                        this.tableDataAnnualSalary.push(list[i]);
                    }
                }
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
             //转换时间戳
            formatDate(date) {    
                var y = date.getFullYear();    
                var m = date.getMonth() + 1;    m = m < 10 ? '0' + m : m;    
                var d = date.getDate();    d = d < 10 ? ('0' + d) : d;       
                return m
            },
            confirmMonthClick(val){
                // console.log(val)
                this. columnsAnnualSalary = [{
                    field: "zl",
                    title: "职类",
                    width: 60,
                    titleAlign: "center",
                    columnAlign: "center",
                    isResize: true,
                    isFrozen: true,
                    titleCellClassName: "titleclass",
                },
                {
                    field: "zj",
                    title: "职级",
                    width: 60,
                    titleAlign: "center",
                    columnAlign: "center",
                    isResize: true,
                    isFrozen: true,
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
                    field: "zf",
                    title: "较上年12月增幅",
                    width: 120,
                    titleAlign: "center",
                    columnAlign: "center",
                    isResize: true,
                    titleCellClassName: "titleclass",
                },]
                this.monthVal = val.text
                this.showMonth = false
                let queryData = {};
                let mon = val.keyId
                queryData = {
                    jobnumber: this.ddJobNum,
                    deptList: [],
                    month: mon
                };
                findPerYearInfo(queryData).then((res) => {
                    if (res.code == 1000) {
                        //先初始化
                        this.tableDataAnnualSalary = [];
                        let mlist = [];
                        let plist = [];
                        let slist = [];
                        let olist = [];
                        if(queryData.month == '1'){
                            this.columnsAnnualSalary.splice(3, 0,
                                {
                                    field: "one",
                                    title: "1月",
                                    width: 120,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                },
                            )
                        }else if(queryData.month == '2'){
                            this.columnsAnnualSalary.splice(3, 0,
                                {
                                    field: "two",
                                    title: "2月",
                                    width: 120,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                },
                            )
                        }else if(queryData.month == '3'){
                            this.columnsAnnualSalary.splice(3, 0,
                                {
                                    field: "three",
                                    title: "3月",
                                    width: 120,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                },
                            )
                        }else if(queryData.month == '4'){
                            this.columnsAnnualSalary.splice(3, 0,
                                {
                                    field: "four",
                                    title: "4月",
                                    width: 120,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                },
                            )
                        }else if(queryData.month == '5'){
                            this.columnsAnnualSalary.splice(3, 0,
                                {
                                    field: "five",
                                    title: "5月",
                                    width: 120,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                },
                            )
                        }else if(queryData.month == '6'){
                            this.columnsAnnualSalary.splice(3, 0,
                                {
                                    field: "six",
                                    title: "6月",
                                    width: 120,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                },
                            )
                        }else if(queryData.month == '7'){
                            this.columnsAnnualSalary.splice(3, 0,
                                {
                                    field: "seven",
                                    title: "7月",
                                    width: 120,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                },
                            )
                        }else if(queryData.month == '8'){
                            this.columnsAnnualSalary.splice(3, 0,
                                {
                                    field: "eight",
                                    title: "8月",
                                    width: 120,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                },
                            )
                        }else if(queryData.month == '9'){
                            this.columnsAnnualSalary.splice(3, 0,
                                {
                                    field: "nine",
                                    title: "9月",
                                    width: 120,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                },
                            )
                        }else if(queryData.month == '10'){
                            this.columnsAnnualSalary.splice(3, 0,
                                {
                                    field: "ten",
                                    title: "10月",
                                    width: 120,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                },
                            )
                        }else if(queryData.month == '11'){
                            this.columnsAnnualSalary.splice(3, 0,
                                {
                                    field: "eleven",
                                    title: "11月",
                                    width: 120,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                },
                            )
                        }else if(queryData.month == '12'){
                            this.columnsAnnualSalary.splice(3, 0,
                                {
                                    field: "twelve",
                                    title: "12月",
                                    width: 120,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                },
                            )
                        }
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
            }
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {
          this.queryfindPerYearInfo()
          this.queryfindPayrollDept()
        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {

        },
        beforeCreate() {}, //生命周期 - 创建之前
        beforeMount() {}, //生命周期 - 挂载之前
        beforeUpdate() {}, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        beforeDestroy() {}, //生命周期 - 销毁之前
        destroyed() {}, //生命周期 - 销毁完成
        activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>
<style lang='stylus' scoped>
    //@import url(); 引入公共css类
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

    .honghe {
        width: 10px;
        height: 15px;
        display: inline-block;
        background-color: red;
    }
</style>
<style>
    .van-field__label{
        color:red
    }
</style>
