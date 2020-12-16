<!--  -->
<template>
    <div class="">
        <adresNavbar></adresNavbar>
        <adresResultsTanbber ref="adresResultsTanbber"></adresResultsTanbber>
        <div>
            <div>
                <van-row type="flex" justify="left" style="margin-bottom: 10px">
                    <van-col>
                        <div class="titleRewards">
                            <span class="honghe"></span>
                            干部储备
                        </div>
                    </van-col>
                </van-row>
                <van-row type="flex" justify="center">
                    <van-col>
                        <div style="font-size:14px;color:#DC143C;font-weight:700"> 整体情况：储备率：{{cblPct}}；成熟度：{{csdPct}}</div>
                    </van-col>
                </van-row>
                <div>
                    <div style="width: 100%; height: 400px">
                        <div ref="cadreReserveEchart" :style="{ width: '100%', height: '400px' }"></div>
                    </div>
                </div>
            </div>
            <div>
                <van-row type="flex" justify="left" style="margin-bottom: 10px">
                    <van-col>
                        <div class="titleRewards">
                            <span class="honghe"></span>
                            干部流失率
                        </div>
                    </van-col>
                </van-row>
                <selctYearcurrent @yearChangeItem='yearChange' :startYear='2018' :allPage='0'></selctYearcurrent>
                <van-row type="flex" justify="center">
                    <van-col>
                        <div style="font-size:14px;color:#DC143C;font-weight:700;padding-top: 2vh;"> 整体情况：平均干部流失率：{{lossAvgPct}}</div>
                    </van-col>
                </van-row>
                <div v-show="!showNodatas">
                    <div style="width: 100%; height: 400px">
                        <div ref="findCadresLossInfoEchart" :style="{ width: '100%', height: '400px' }"></div>
                    </div>
                </div>
                <noData :showNodata="showNodatas"></noData>
            </div>
        </div>
        <div>
            <van-popup v-model="showRightInfo" position="right" :style="{ height: '100%', width: '80%' }" get-container="body">
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
                <div style="padding-bottom:100px">
                    <v-table ref="rightInfoTable" is-horizontal-resize :is-loading="isLoading" columns-width-drag :height="400" style="width: 100%; font-size: 14px" title-bg-color="#ccc" :columns="popupColumns" :table-data="rightInfoData" row-hover-color="#eee" row-click-color="#edf7ff"></v-table>
                </div>
            </van-popup>
        </div>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
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
    import adresNavbar from "@/components/adresResultstab/adresResultsNavbar.vue";
    import {
        findPayrollDept
    } from "@/views/PayLibrary/PayLibrary.js";
    import {
        findCadreReportReserveInfo,
        findCadreChartInfo,
        findCadreChartDownDeptInfo,
        findCadresLossInfo
    } from "@/views/adresResultts/adresResults.js";
    import selctYearcurrent from "@/components/adresResultstab/selctYearcurrent.vue";
    import noData from "@/components/noData.vue";
    //例如：import 《组件名称》 from '《组件路径》';findCadreReportReserveInfo
    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {
            adresResultsTanbber,
            chooseDepartment,
            adresNavbar,
            selctYearcurrent,
            noData
        },
        data() {
            //这里存放数据
            return {
                deptData: [],

                querycadreReserve: {
                    jobnumber: localStorage.getItem("jobNum"),
                    deptList: [],
                    isDown: "Y",
                },
                readySelectDept: [],
                readySelectDeptObj: {},
                findCadreChartInfoUeryData: {
                    deptList: [],
                    year: "",
                    isDown: 'Y'
                },
                showNodatas: false,
                downDeptlist: [],
                selectDownDept: '',
                findCadresLossInfoData: {
                    jobnumber: '',
                    deptList: [],
                    isDown: 'Y',
                    year: ''
                },
                // 右弹窗显示控制
                showRightInfo: false,
                // 目录展示
                vancellList: [],
                // 储备度原始数据
                reserveInfoData: [],
                // 右边弹窗标题
                titleRight: '',
                // 右弹窗更新控制
                isLoading: true,
                //人员信息
                rightInfoData: [],
                // 右弹窗人员详情
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
                    },
                    {
                        field: "cadreName",
                        title: "现领导",
                        width: 80,
                        titleAlign: "center",
                        columnAlign: "center",
                        formatter: function(rowData, rowIndex, pagingIndex, field) {
                            return `<span>${rowData[field]}</span>`;
                        },
                        isResize: true,
                    },
                    {
                        field: "staffName",
                        title: "继任者",
                        width: 80,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                    },
                    {
                        field: "year",
                        title: "成熟度",
                        width: 80,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                    },
                    {
                        field: "dept",
                        title: "部门",
                        width: 80,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                    },
                    {
                        field: "name",
                        title: "姓名",
                        width: 80,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                    },
                    {
                        field: "post",
                        title: "职位",
                        width: 80,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                    },
                    {
                        field: "zj",
                        title: "职级",
                        width: 80,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                    },
                ],
                cblPct: '',
                csdPct: '',
                lossAvgPct: "",
                LossInfoRes: [],
            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            //数据初始化
            init() {
                // 获取本地存储的部门id
                this.readySelectDept = [JSON.parse(localStorage.getItem("adresResultDept")).deptId];
                //获取本地存储的部门对象
                this.readySelectDeptObj = JSON.parse(localStorage.getItem("adresResultDept"))
                // 查询赋值部门信息
                this.findCadreChartInfoUeryData.deptList = this.readySelectDept
                //查询干部储备情况
                this.queryfindCadreReportReserveInfo()
                //查询流失率
                this.queryfindCadresLossInfo()
            },
            //查询流失率
            queryfindCadresLossInfo() {
                this.findCadresLossInfoData.deptList = this.readySelectDept
                findCadresLossInfo(this.findCadresLossInfoData).then(res => {
                    if (res.code == "1000") {
                        this.initfindCadresLossInfoEchart(res.obj.list)
                        this.lossAvgPct = res.obj.lossAvgPct
                        this.LossInfoRes = res.obj.list
                    } else {
                        Toast.fail(res.msg);
                    }
                })
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
            cadreReserveDepart() {},
            //查询干部储备情况
            queryfindCadreReportReserveInfo() {
                this.querycadreReserve.deptList = this.readySelectDept
                findCadreReportReserveInfo(this.querycadreReserve).then((res) => {
                    if (res.code == "1000") {
                        this.reserveInfoData = res.obj.list
                        this.csdPct = res.obj.csdPct
                        this.cblPct = res.obj.cblPct
                        this.initcadreReserveEchart(res.obj.list)
                    } else {
                        Toast.fail(res.msg);
                    }
                });
            },
            // 流失率echarts渲染
            initfindCadresLossInfoEchart(list) {
                var that = this
                var myChart = this.$echarts.init(this.$refs.findCadresLossInfoEchart);
                let monthMap = new Map();
                let monthData = []
                let monthList = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
                for (let i in monthList) {
                    monthMap.set(monthList[i], '')
                }
                for (let item of list) {
                    monthMap.set(item.month, item.loss.split('%')[0])
                }
                const arr = [...monthMap];
                for (let item of arr) {
                    let [a, b] = item
                    monthData.push(b)
                }
                let labelflag = false
                //
                // this.showNodatas = true
                // 判断要不要显示折线图
                for (let item of monthData) {
                    if (item != 0.00 && item != 0.0 && item != 0) {
                        labelflag = true
                        break
                    }
                }
                myChart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'line',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        },
                        formatter: function(params) {
                            if (labelflag) {
                                that.RightInfo(params, 2);
                            }
                        }
                    },
                    legend: {
                        data: [that.readySelectDeptObj.text]
                    },
                    toolbox: {
                        // feature: {
                        //     saveAsImage: {}
                        // }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        data: monthList
                    }],
                    yAxis: [{
                        type: 'value',

                        axisLabel: {
                            formatter: '{value}%'
                        },

                    }],
                    series: [{
                        name: that.readySelectDeptObj.text,
                        type: 'line',
                        data: monthData,
                        label: {
                            normal: {
                                show: labelflag,
                                position: 'top',
                                formatter: "{c}%"
                            }
                        },
                    }, ],
                });


            },
            // 干部准备度统计图
            initcadreReserveEchart(list) {
                var that = this
                var myChart = this.$echarts.init(this.$refs.cadreReserveEchart);
                let xAxisList = []
                let nowList = []
                let cblList = []
                let oneYearList = []
                let threeYearList = []
                let twoYearList = []
                // let str = list[0].cbl.split('%')
                for (let i in list) {
                    xAxisList.push(list[i].type)
                    nowList.push(list[i].now)
                    // console.log(list[i].cbl.spilt('%'))
                    if (list[i].cbl != null && list[i].cbl != 0 && list[i].cbl != 0.0 && list[i].cbl != 0.00) {
                        cblList.push(list[i].cbl.split('%')[0])
                    } else {
                        cblList.push('')
                    }
                    oneYearList.push(list[i].oneYear)
                    threeYearList.push(list[i].threeYear)
                    twoYearList.push(list[i].twoYear)
                }
                myChart.setOption({
                    color: ['#6495ED', '#FF8C00', '#A9A9A9', '#FFD700'],
                    tooltip: {
                        trigger: "axis",
                        extraCssText: 'z-index:99',
                        axisPointer: {
                            type: "cross",
                            crossStyle: {
                                color: "#999",
                            },
                        },
                        formatter: function(params, ticket) {
                            let str = ''
                            params.forEach(item => {
                                //
                                if (item.seriesName == '储备率') {
                                    //
                                    str = str + "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" +
                                        item["color"] +
                                        "'></span>" +
                                        item["seriesName"] +
                                        "：" +
                                        item["value"] + "%" +
                                        "<br/>";
                                } else {
                                    str +=
                                        "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" +
                                        item["color"] +
                                        "'></span>" +
                                        item["seriesName"] +
                                        "：" +
                                        item["value"] + "人" +
                                        "<br/>";
                                }

                            })
                            return str
                        }
                    },
                    grid: {
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: true,
                    },
                    legend: {
                        data: ["立即可用", "一年可用", "两年可用", "三年可用", "储备率"],
                    },
                    xAxis: [{
                        type: "category",
                        data: xAxisList,
                        axisPointer: {
                            type: "shadow",
                        },
                    }, ],
                    yAxis: [{
                            type: "value",
                            axisLabel: {
                                formatter: "{value}人",
                            },
                        },
                        {
                            type: "value",
                            // name: "百分比",
                            min: 0,
                            max: 100,
                            interval: 20,
                            axisLabel: {
                                formatter: "{value} %",
                            },
                        },
                    ],
                    series: [{
                            name: "立即可用",
                            type: "bar",
                            barWidth: 25,
                            stack: "总数",
                            data: nowList,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: "inside", //在上方显示
                                        textStyle: {
                                            //数值样式
                                            color: "#000",
                                            fontSize: 8,
                                        },
                                    },
                                },
                            },
                        },
                        {
                            name: "一年可用",
                            type: "bar",
                            stack: "总数",
                            data: oneYearList,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: "inside", //在上方显示
                                        textStyle: {
                                            //数值样式
                                            color: "#000",
                                            fontSize: 8,
                                        },
                                    },
                                },
                            },
                        }, {
                            name: "两年可用",
                            type: "bar",
                            stack: "总数",
                            data: twoYearList,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: "inside", //在上方显示
                                        textStyle: {
                                            //数值样式
                                            color: "#000",
                                            fontSize: 8,
                                        },
                                    },
                                },
                            },
                        }, {
                            name: "三年可用",
                            type: "bar",
                            stack: "总数",
                            data: threeYearList,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: "inside", //在上方显示
                                        textStyle: {
                                            //数值样式
                                            color: "#000",
                                            fontSize: 8,
                                        },
                                    },
                                },
                            },
                        },
                        {
                            name: "储备率",
                            type: "line",
                            yAxisIndex: 1,
                            data: cblList,
                        },
                    ],
                });
                myChart.on("click", function(params) {
                    that.RightInfo(params);
                });
            },
            // 干部雷达图
            queryfindCadreChartInfo() {
                findCadreChartInfo(this.findCadreChartInfoUeryData).then(res => {
                    if (res.code == "1000") {
                        this.showNodatas = false
                        this.$nextTick(() => {
                            this.initfindCadreChartInfoEchart(res.obj)
                        })
                    } else {
                        Toast.fail(res.msg);
                        this.showNodatas = true
                    }
                })
            },
            // 年份改变事件
            yearChange(item) {
                this.findCadresLossInfoData.year = item
                this.queryfindCadresLossInfo()
            },
            // 干部准备雷达图
            initfindCadreChartInfoEchart(list) {
                var myChart = this.$echarts.init(this.$refs.findCadreChartInfoEchart);
                let upLevelList = [];
                let LevelList = [];
                let maxNum = 10;
                let minNum = 0;
                for (let i in list) {
                    if (!list[i].deptName && i == 0) {
                        upLevelList = [0, 0, 0, 0, 0, 0, 0, 0]
                        continue
                    }
                    if (!list[i].deptName && i == 1) {
                        LevelList = [0, 0, 0, 0, 0, 0, 0, 0]
                        continue
                    }
                    if (i == 0) {
                        upLevelList = [Number(list[i].a8SRLMX015AVG),
                            Number(list[i].a8SRLMX016AVG),
                            Number(list[i].a8SRLMX017AVG),
                            Number(list[i].a8SRLMX018AVG),
                            Number(list[i].a8SRLMX019AVG),
                            Number(list[i].a8SRLMX020AVG),
                            Number(list[i].a8SRLMX021AVG),
                            Number(list[i].a8SRLMX022AVG),
                        ]
                    } else {
                        LevelList = [Number(list[i].a8SRLMX015AVG),
                            Number(list[i].a8SRLMX016AVG),
                            Number(list[i].a8SRLMX017AVG),
                            Number(list[i].a8SRLMX018AVG),
                            Number(list[i].a8SRLMX019AVG),
                            Number(list[i].a8SRLMX020AVG),
                            Number(list[i].a8SRLMX021AVG),
                            Number(list[i].a8SRLMX022AVG),
                        ]

                    }
                }
                let numlist = [...upLevelList, ...LevelList];
                maxNum = Math.max.apply(Math, numlist);
                minNum = Math.min.apply(Math, numlist);
                minNum = Math.trunc(minNum);
                maxNum = Math.ceil(maxNum);
                myChart.setOption({
                    legend: {
                        data: [list[0].deptName, list[1].deptName]
                    },
                    tooltip: {
                        trigger: "axis",
                    },
                    axisTick: {
                        show: true,
                    },
                    grid: {
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: true,
                    },
                    radar: [{
                            radius: 120,
                            startAngle: 90,
                            splitNumber: 5,
                            shape: 'circle',
                        },
                        {
                            indicator: [{
                                    text: "坦诚正直",
                                    max: maxNum,
                                    min: minNum
                                },
                                {
                                    text: "事业激情",
                                    max: maxNum,
                                    min: minNum
                                },
                                {
                                    text: "团队领导",
                                    max: maxNum,
                                    min: minNum
                                },
                                {
                                    text: "团结协作",
                                    max: maxNum,
                                    min: minNum
                                },
                                {
                                    text: "战略决策",
                                    max: maxNum,
                                    min: minNum
                                },
                                {
                                    text: "推动变革",
                                    max: maxNum,
                                    min: minNum
                                },
                                {
                                    text: "用户中心",
                                    max: maxNum,
                                    min: minNum
                                },
                                {
                                    text: "业绩导向",
                                    max: maxNum,
                                    min: minNum
                                },
                            ],
                            radius: 120
                        }
                    ],
                    series: [{
                        type: 'radar',
                        tooltip: {
                            trigger: 'item'
                        },
                        radarIndex: 1,
                        data: [{
                                value: LevelList,
                                name: list[0].deptName,
                                label: {
                                    show: true,
                                    formatter: function(params) {
                                        return params.value;
                                    }
                                },
                                lineStyle: {
                                    type: "dashed",
                                },
                                areaStyle: {
                                    color: "#B94342",
                                },
                            },
                            {
                                value: upLevelList,
                                name: list[1].deptName,
                                label: {
                                    show: true,
                                    formatter: function(params) {
                                        return params.value;
                                    }
                                },
                                areaStyle: {
                                    color: "rgba(255, 255, 255, 0.5)",
                                },
                            }
                        ]
                    }]
                })
            },
            /**
             * 1从findCadreReportReserveInfo接口获取右边弹窗人员信息
             * 2echarts有点击事件，通过传参，获取点击的位置
             * 3点击后，右弹窗显示
             */

            // 右弹窗展示目录点击事件
            RightInfo(obj, type) {
                // debugger
                var that = this;
                this.$nextTick(() => {
                    setTimeout(() => {
                        if (type == 2) {
                            this.popupColumns = [{
                                        field: "custome",
                                        width: 50,
                                        titleAlign: "center",
                                        columnAlign: "center",
                                        title: "序号",
                                        formatter: function(rowData, index) {
                                            return index + 1;
                                        },
                                        isResize: true,
                                    }, {
                                        field: "dept",
                                        title: "部门",
                                        width: 120,
                                        titleAlign: "center",
                                        columnAlign: "center",
                                        isResize: true,
                                    },
                                    {
                                        field: "name",
                                        title: "姓名",
                                        width: 80,
                                        titleAlign: "center",
                                        columnAlign: "center",
                                        isResize: true,
                                    },
                                    {
                                        field: "post",
                                        title: "职位",
                                        width: 100,
                                        titleAlign: "center",
                                        columnAlign: "center",
                                        isResize: true,
                                    },
                                    {
                                        field: "zj",
                                        title: "职级",
                                        width: 80,
                                        titleAlign: "center",
                                        columnAlign: "center",
                                        isResize: true,
                                    },
                                ],
                                that.showRightInfo = true
                            that.titleRight = '干部流失'
                            that.vancellList = []
                            for (let item of that.LossInfoRes) {
                                if (item.info) {
                                    that.vancellList.push({
                                        title: item.month,
                                        value: item.info ? item.info.length : 0,
                                        direction: "",
                                        jobList: item.info,
                                    })
                                }
                            }
                            that.rightInfoData = that.vancellList[0].jobList
                            that.vancellList[0].direction = "down"
                            that.isLoading = false
                        } else {
                            that.showRightInfo = true
                            that.titleRight = obj.name
                            that.vancellList = []
                            for (let item of that.reserveInfoData) {
                                if (item.type == that.titleRight) {
                                    this.vancellList.push({
                                        title: "立即可用",
                                        value: item.now,
                                        direction: "down",
                                        jobList: item.nowList,
                                    }, {
                                        title: "一年可用",
                                        value: item.oneYear,
                                        direction: "",
                                        jobList: item.oneYearList,
                                    }, {
                                        title: "两年可用",
                                        value: item.twoYear,
                                        direction: "",
                                        jobList: item.twoYearList,
                                    }, {
                                        title: "三年可用",
                                        value: item.threeYear,
                                        direction: "",
                                        jobList: item.threeYearList,
                                    }, )
                                }
                            }
                            that.rightInfoData = that.vancellList[0].jobList
                            that.isLoading = false
                        }

                    }, 60)
                })
            },
            // 右弹窗展示目录点击事件
            vancellListTouch(obj) {
                this.isLoading = true
                for (let item of this.vancellList) {
                    if (item.title == obj.title) {
                        item.direction = "down"
                    } else {
                        item.direction = ""
                    }
                }
                this.rightInfoData = obj.jobList
                setTimeout(() => {
                    this.isLoading = false
                }, 500);
            },
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {
            this.init();
        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            this.$refs.adresResultsTanbber.changtab("cadreReserve");
            this.initcadreReserveEchart();
        },
        beforeCreate() {}, //生命周期 - 创建之前
        beforeMount() {}, //生命周期 - 挂载之前
        beforeUpdate() {}, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        beforeDestroy() {}, //生命周期 - 销毁之前
        destroyed() {}, //生命周期 - 销毁完成
        activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    };
</script>
<style lang='stylus' scoped>
    //@import url(); 引入公共css类
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

    .titleRewards {
        font-size: 18px;
        font-weight: 700;
        margin-top: 20px;
        color: red;
    }

    .titleRightInfo {
        font-size: 18px;
        font-weight: 700;
        margin-top: 20px;
        color: red;
    }

    .lineEllipsis {
        padding-top: 3px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        font-size: 13px;
    }
</style>
