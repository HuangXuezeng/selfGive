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
        </div>
        <div class="resetVant">
            <v-table is-horizontal-resize style="width: 100%" :columns="columnsCadresChange" :table-data="tableData" row-hover-color="#eee" row-click-color="#edf7ff" :cell-merge="cellMergeCadresChange" :is-loading="lodingFlagcadresChange" :column-cell-class-name="columnCellClassCadresChange"></v-table>
        </div>
        <div>
            <van-row type="flex" justify="left" style="margin-bottom: 10px">
                <van-col>
                    <div class="titleRewards">
                        <span class="honghe"></span>
                        职级分布
                    </div>
                </van-col>
            </van-row>
            <div class="resetVantfixed resetVantfixcader">
                <van-dropdown-menu>
                    <van-dropdown-item v-model="zjselecYear" :options="yearlist" @change="zjyearChange" title-class="colorFFF" />
                    <van-dropdown-item v-model="zjselecMoth" :options="mothlist" @change="zjmothChange" title-class="colorFFF" />
                </van-dropdown-menu>
            </div>
            <div>
                <div style="width: 100%; height: 450px">
                    <div ref="countDistribution" :style="{ width: '100%', height: '500px' }"></div>
                </div>
            </div>
        </div>
        <div>
            <van-row type="flex" justify="left" style="margin-bottom: 10px">
                <van-col>
                    <div class="titleRewards">
                        <span class="honghe"></span>
                        干部编制变化图
                    </div>
                </van-col>
            </van-row>
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
            <v-table is-horizontal-resize style="width: 100%" :columns="columnsManagementrange" :table-data="tableDataManagementrange" row-hover-color="#eee" row-click-color="#edf7ff" :is-loading="lodingFlagManagementrange" :column-cell-class-name="columnCellClassTrangeChange"></v-table>
        </div>
        <div>
            <van-popup v-model="showRightInfo" position="right" :style="{ height: '100%', width: '80%' }" get-container="body">
                <div style="padding-bottom: 30px;">
                    <van-row type="flex" justify="center" style="margin-bottom: 10px">
                        <van-col>
                            <div class="titleRightInfo">
                                {{ titleRight }}
                            </div>
                        </van-col>
                    </van-row>
                    <div v-for="(item, index) in vancellList" :key="index">
                        <van-cell :title="item.title" is-link :arrow-direction="item.direction" :value="item.value" @click="vancellListTouch(item)" />
                    </div>
                    <v-table ref="rightInfoTable" is-horizontal-resize :is-loading="isLoading" columns-width-drag :height="400" style="width: 100%; font-size: 14px" title-bg-color="#ccc" :columns="popupColumns" :table-data="rightInfoData" row-hover-color="#eee" row-click-color="#edf7ff"></v-table>
                </div>
            </van-popup>
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
        findCadreTeamFwInfo,
        findCadreReportZJFbInfo,
        selectEmployeeByJobnumber
    } from "@/views/adresResultts/adresResults.js";
    import adresNavbar from "@/components/adresResultstab/adresResultsNavbar.vue";
    import noData from "@/components/noData.vue";
    import selctYearcurrent from "@/components/adresResultstab/selctYearcurrent.vue";
    export default {
        components: {
            adresResultsTanbber,
            chooseDepartment,
            adresNavbar,
            noData,
            selctYearcurrent
        },
        data() {
            return {
                showNodatas: false,
                deptData: [],
                //干部人数月度变化情况干部管理幅度
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
                        width: 60,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "avg",
                        title: "平均在编",
                        width: 80,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "gqb",
                        title: "管理幅度",
                        width: 80,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                ],
                // 干部管理幅度干部管理幅度
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
                        width: 40,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "magRange",
                        title: "干群比",
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
                ],
                lodingFlagcadresChange: false,
                lodingFlagManagementrange: false,
                tableData: [],
                ddJobNum: localStorage.getItem("jobNum"),
                selecYear: '',
                yearlist: [],
                tableDataManagementrange: [],
                selecMoth: "",
                zjselecYear: "",
                zjselecMoth: "",
                mothlist: [],
                queryYear: '',
                queryObj: {
                    jobnumber: localStorage.getItem("jobNum"),
                    deptList: [],
                    isDown: "Y",
                    oneDeptList: [],
                    year: "",
                    bzType: 'Y',

                },
                queryYearChangeObj: {
                    jobnumber: localStorage.getItem("jobNum"),
                    deptList: [],
                    isDown: "Y",
                    oneDeptList: [],
                    bzType: 'Y',

                },
                queryYearManagementrange: {
                    jobnumber: localStorage.getItem("jobNum"),
                    deptList: [],
                    isDown: "Y",
                    bzType: 'Y',

                },
                readySelectDept: [],
                findCadreTeamFwInfoData: {
                    deptList: []
                },
                readyOneSelectDept: [],
                findCadreReportZJFbInfoData: {
                    deptList: [],
                    isDown: 'Y',
                    year: '',
                    bzType: 'Y',

                },
                showRightInfo: false,
                vancellList: [],
                rightSList: [],
                rightPList: [],
                rightMList: [],
                titleRight: '',
                rightInfoData: [],
                isLoading: false,
                // 右边弹窗表格表头设置
                popupColumns: [{
                        field: "custome",
                        width: 50,
                        titleAlign: "center",
                        columnAlign: "center",
                        title: "序号",
                        formatter: function(rowData, index) {
                            return index + 1;
                        },
                        isResize: true,
                        isFrozen: true,
                    },
                    {
                        field: "jobnumber",
                        title: "工号",
                        width: 80,
                        titleAlign: "center",
                        columnAlign: "center",
                        formatter: function(rowData, rowIndex, pagingIndex, field) {
                            return `<span>${rowData[field]}</span>`;
                        },
                        isResize: true,
                    },
                    {
                        field: "name",
                        title: "姓名",
                        width: 60,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        isFrozen: true,
                    },
                    {
                        field: "department",
                        title: "部门",
                        width: 150,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                    },
                    {
                        field: "post",
                        title: "岗位",
                        width: 150,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                    },
                    {
                        field: "rank",
                        title: "职级",
                        width: 50,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                    },
                    {
                        field: "rsrq",
                        title: "入司日期",
                        width: 100,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                    },
                    {
                        field: "currentState",
                        title: "当前状态",
                        width: 70,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                    },
                ],
                bzType:''
            };
        },
        created() {
            // 数据初始化
            this.init();
        },
        mounted() {
            // 页面头部标签兰切换
            this.$refs.adresResultsTanbber.changtab("cadresChange");
        },
        methods: {
            //数据初始化
            init() {

                // 从本地存储数据中获取权限部门信息
                this.readySelectDept = [JSON.parse(localStorage.getItem("adresResultDept")).deptId];
                // 接口需要传一级或二级部门的deptid
                if (this.readySelectDept.length != 0) {
                    let adresResultDeptobj = JSON.parse(localStorage.getItem("adresResultDept"))
                    if (adresResultDeptobj.grade == 2 || adresResultDeptobj.grade == 1) {
                        this.readyOneSelectDept = this.readySelectDept
                    }
                }
                this.bzType =  localStorage.getItem("bzType")
                this.queryObj.bzType = this.bzType
                this.queryYearChangeObj.bzType = this.bzType
                this.queryYearManagementrange.bzType = this.bzType
                this.findCadreReportZJFbInfoData.bzType = this.bzType
                //设定月份
                this.getMoth();
                //获取最新年份
                this.getNewYear();
                // 干部人数月度变化情况数据初始化
                this.queryFindCadreReportYearChangeInfo();
                // 干部编制变化图数据初始化
                this.queryfindCadreRepotrRangeInfo();
                // 职级分布数据初始化
                this.queryfindCadreReportZJFbInfo()

            },
            // 年份变化事件
            yearChange(year) {
                this.selecYear = year
                this.queryObj.year = this.selecYear + this.selecMoth;
                this.queryFindCadreReportWholeInfo(this.queryObj);
            },
            // 职级年份变化事件
            zjyearChange(year) {
                this.zjselecYear = year
                this.findCadreReportZJFbInfoData.year = this.zjselecYear + this.zjselecMoth;
                this.queryfindCadreReportZJFbInfo(this.findCadreReportZJFbInfoData);
            },
            //设定月份
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
            //月份改变事件
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
                selectObj.width = 40;
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
            //职级月份改变事件
            zjmothChange(value) {
                this.zjselecMoth = value
                this.findCadreReportZJFbInfoData.year = this.zjselecYear + this.zjselecMoth;
                this.queryfindCadreReportZJFbInfo(this.findCadreReportZJFbInfoData);
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
                        this.zjselecYear = this.yearlist[0].value;
                        for (let k in this.mothlist) {
                            if (this.mothlist[k].commomIndex == tmouth) {
                                this.selecMoth = this.mothlist[k].value;
                                this.zjselecMoth = this.mothlist[k].value;
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
                        bzType: this.bzType,
                        year: this.selecYear + this.selecMoth,
                    };
                }
                queryData.deptList = this.readySelectDept
                queryData.oneDeptList = this.readyOneSelectDept
                findCadreReportWholeInfo(queryData).then((res) => {
                    if (res.code == "1000") {
                        this.lodingFlagcadresChange = false;
                        res.obj[0].gbbz = res.obj[res.obj.length - 1].gbbz
                        for (let i in res.obj) {
                            if (i > 0) {
                                delete res.obj[i].gbbz
                            }
                        }
                        this.tableData = res.obj;
                    } else {
                        Toast.fail(res.msg);
                    }
                });
            },
            // 干部编制合并单元格
            cellMergeCadresChange(rowIndex, rowData, field) {
                if (field === "gbbz") {
                    return {
                        colSpan: 1,
                        rowSpan: 6,
                        content: `<span style='color:red'>${rowData.gbbz}</span>`,
                        componentName: ""
                    };
                }
            },
            // 行颜色变更
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
                if (rowData.type == "P4/S4-P5/S5") {
                    return "mClass";
                }
                if (rowData.type == "P6/S6及以上") {
                    return "pClass";
                }
                if (rowData.type == "整体") {
                    return "oClass";
                }
            },
            // 干部管理幅度行颜色变更
            columnCellClassTrangeChange(rowIndex, columnName, rowData) {
                if (rowData.type == "M1-M3") {
                    return "mClass";
                }
                if (rowData.type == "M4及以上") {
                    return "pClass";
                }
            },
            // 干部人数月度变化情况数据
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
                        bzType: this.bzType,

                    };
                }
                queryData.deptList = this.readySelectDept
                queryData.oneDeptList = this.readyOneSelectDept
                findCadreReportYearChangeInfo(queryData).then((res) => {
                    if (res.code == "1000") {
                        this.cadresChangeEchart(res.obj.yearChange);
                    } else {
                        Toast.fail(res.msg);
                    }

                });
            },
            // echarts数据渲染
            cadresChangeEchart(list) {
                //数据处理合乎格式要求
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
                        scale: true
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
            // 干部编制变化图数据
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
            // 职级分布数据
            queryfindCadreReportZJFbInfo() {
                this.findCadreReportZJFbInfoData.deptList = this.readySelectDept
                findCadreReportZJFbInfo(this.findCadreReportZJFbInfoData).then(res => {
                    this.countDistributionMeth(res.obj)

                })
            },
            //职级柱图
            countDistributionMeth(list) {
                var that = this;
                var myChart = this.$echarts.init(this.$refs.countDistribution);
                let SList = [];
                let PList = [];
                let MList = [];
                let zlList = [];
                let echartsData = []
                this.rightSList = []
                this.rightPList = []
                this.rightMList = []
                for (let i in list) {
                    zlList.push(list[i].type)
                    if (list[i].zl == "S类") {
                        SList.push(list[i].count || "")
                        PList.push('')
                        MList.push('')
                        if (list[i].count) {
                            this.rightSList.push(list[i])
                        }
                    } else if (list[i].zl == "P类") {
                        PList.push(list[i].count || "")
                        SList.push('')
                        MList.push('')
                        if (list[i].count) {
                            this.rightPList.push(list[i])
                        }
                    } else if (list[i].zl == "M类") {
                        MList.push(list[i].count || "")
                        SList.push('')
                        PList.push('')
                        if (list[i].count) {
                            this.rightMList.push(list[i])
                        }
                    }
                }
                myChart.setOption({
                    color: ['#6495ED', '#A9A9A9', '#FFD700'],
                    legend: {
                        data: ["S类", "P类", "M类", ],
                        // height:'10'
                        top: '3%'
                    },
                    grid: {
                        left: "3%",
                        right: "4%",
                        // bottom: "3%",
                        containLabel: true,
                    },
                    xAxis: [{
                        type: "value",
                        position: 'top', //x 轴的位置【top bottom】
                        nameRotate: -90, //坐标轴名字旋转，角度值。
                        // axisLabel: { //坐标轴刻度标签的相关设置。
                        //     // rotate: 90 //刻度标签旋转的角度，
                        // },
                        // scale: true,
                        interval: 10,

                    }, ],
                    yAxis: [{
                        type: "category",
                        data: zlList,
                        // axisLabel: {
                        //     interval: 0,
                        //     rotate: 40
                        // },
                        // scale : true,
                        // max: "100%",
                        inverse: 'true', //是否是反向坐标轴。
                        // axisLabel: {
                        //     rotate: -90
                        // },
                    }, ],


                    series: [{
                            name: "S类",
                            type: "bar",
                            barWidth: 15,
                            stack: '人数',
                            data: SList,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: "inside", //在上方显示
                                        textStyle: {
                                            //数值样式
                                            color: "#000",
                                            fontSize: 10,
                                        },
                                    },
                                },
                            },
                        },
                        {
                            name: "P类",
                            type: "bar",
                            barWidth: 15,
                            stack: '人数',

                            data: PList,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: "inside", //在上方显示
                                        textStyle: {
                                            //数值样式
                                            color: "#000",
                                            fontSize: 10,
                                        },
                                    },
                                },
                            },
                        },
                        {
                            name: "M类",
                            type: "bar",
                            barWidth: 15,
                            data: MList,
                            stack: '人数',

                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: "inside", //在上方显示
                                        textStyle: {
                                            //数值样式
                                            color: "#000",
                                            fontSize: 10,
                                        },
                                    },
                                },
                            },
                        },
                    ],
                });
                myChart.on("click", function(params) {
                    // ;
                    that.RightInfo(params);
                    // console.log(params);
                });
            },
            // 职级年份改变事件
            zjYearChange(item) {
                this.findCadreReportZJFbInfoData.year = item
                this.queryfindCadreReportZJFbInfo()
            },
            // 右边弹窗数据渲染
            RightInfo(obj) {
                // ;
                var that = this;
                this.$nextTick(() => {
                    setTimeout(() => {
                        that.showRightInfo = true;
                        that.titleRight = obj.seriesName;
                        if (obj.seriesName == "S类") {
                            for (let item of that.rightSList) {
                                item.title = item.type
                                item.value = item.count
                                item.direction = ''
                                item.jobList = item.countJobnumber
                            }
                            that.vancellList = that.rightSList
                        } else if (obj.seriesName == "P类") {
                            for (let item of that.rightPList) {
                                item.title = item.type
                                item.value = item.count
                                item.direction = ''
                                item.jobList = item.countJobnumber
                            }
                            that.vancellList = that.rightPList
                        } else if (obj.seriesName == "M类") {
                            for (let item of that.rightMList) {
                                item.title = item.type
                                item.value = item.count
                                item.direction = ''
                                item.jobList = item.countJobnumber
                            }
                            that.vancellList = that.rightMList
                        }
                        that.vancellListTouch(that.vancellList[0]);
                    }, 60);
                });
            },
            // 右边弹窗点击行事件
            vancellListTouch(obj) {
                for (let item of this.vancellList) {
                    if (item == obj) {
                        obj.direction = "down";
                        this.querySelectEmployeeByJobnumber(obj.jobList);
                    } else {
                        item.direction = "";
                    }
                }
            },
            // 右边弹窗点击行事件，底部表格刷新
            querySelectEmployeeByJobnumber(list) {
                this.isLoading = true;
                selectEmployeeByJobnumber({
                    jobnumbers: list,
                    type: '2'
                }).then((res) => {
                    if (res.code == "1000") {
                        this.rightInfoData = res.obj;
                        this.isLoading = false;
                        this.$refs.rightInfoTable.scrollToTop();
                    } else {
                        Toast.fail(res.msg);
                    }

                });
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
        font-size 12px;
    }

    .mClass {
        background-color: #FFEBCD;
        font-size 12px;
    }

    .pClass {
        background-color: #FFDEAD;
        font-size 12px;
    }

    .sClass {
        background-color: #FFEBCD;
        font-size 12px;
    }

    .oClass {
        background-color: #FFDEAD;
        font-size 12px;
    }

    .heClass {
        background-color: #FFEBCD;
        font-size 12px;
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

    .titleRightInfo {
        font-size: 18px;
        font-weight: 700;
        margin-top: 20px;
        color: red;
    }
</style>
