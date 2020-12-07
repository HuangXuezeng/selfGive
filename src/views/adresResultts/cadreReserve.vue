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
                <!-- <chooseDepartment @confirmNode="cadreReserveDepart" :Farequired="true" labelTitle="部门:" :workingNum="true" :isSelctall="true" :faDeptData="deptData"></chooseDepartment> -->
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
                <!-- <chooseDepartment @confirmNode="cadreReserveDepart" :Farequired="true" labelTitle="部门:" :workingNum="true" :isSelctall="true" :faDeptData="deptData"></chooseDepartment> -->
                <div v-show="!showNodatas">
                    <div style="width: 100%; height: 400px">
                        <div ref="findCadresLossInfoEchart" :style="{ width: '100%', height: '400px' }"></div>
                    </div>
                </div>
                <noData :showNodata="showNodatas"></noData>
            </div>

        </div>
        <!-- <div>
            <div>
                <van-row type="flex" justify="left" style="margin-bottom: 10px">
                    <van-col>
                        <div class="titleRewards">
                            <span class="honghe"></span>
                            干部雷达图
                        </div>
                    </van-col>
                </van-row>
                <selctYearcurrent @yearChangeItem='yearChange' :startYear='2019'></selctYearcurrent>
                <van-dropdown-menu>
                    <van-dropdown-item v-model="selectDownDept" :options="downDeptlist" @change='confirmDept' />
                </van-dropdown-menu>
                <div v-if="!showNodatas">
                    <div style="width: 100%; height: 400px">
                        <div ref="findCadreChartInfoEchart" :style="{ width: '100%', height: '400px' }"></div>
                    </div>
                </div>
                <noData :showNodata="showNodatas"></noData>
            </div>
        </div> -->
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
                }
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
                // debugger
                // this.queryfindPayrollDept();
                this.readySelectDept = [JSON.parse(localStorage.getItem("adresResultDept")).deptId];
                this.readySelectDeptObj = JSON.parse(localStorage.getItem("adresResultDept"))
                this.findCadreChartInfoUeryData.deptList = this.readySelectDept
                this.queryfindCadreReportReserveInfo()
                this.queryfindCadresLossInfo()
                // this.queryfindCadreChartInfo()
                // this.queryfindCadreChartDownDeptInfo()
            },
            //查询流失率
            queryfindCadresLossInfo() {
                this.findCadresLossInfoData.deptList = this.readySelectDept
                findCadresLossInfo(this.findCadresLossInfoData).then(res => {
                    if (res.code == "1000") {
                        this.initfindCadresLossInfoEchart(res.obj)
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
                        this.initcadreReserveEchart(res.obj)
                    } else {
                        Toast.fail(res.msg);
                    }

                    // debugger
                });
            },
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
                // debugger
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
                        formatter: " <br/>{b}:{c}%"
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
                        },

                    ]
                })
            },
            // 干部准备度统计图
            initcadreReserveEchart(list) {
                // debugger
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
                        axisPointer: {
                            type: "cross",
                            crossStyle: {
                                color: "#999",
                            },
                        },
                        formatter: function(params, ticket) {
                            let str = ''
                            params.forEach(item => {
                                // debugger
                                if (item.seriesName == '储备率') {
                                    // debugger
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
                    // toolbox: {
                    //   feature: {
                    //     dataView: { show: true, readOnly: false },
                    //     magicType: { show: true, type: ["line", "bar"] },
                    //     restore: { show: true },
                    //     saveAsImage: { show: true },
                    //   },
                    // },
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
                            // name: "人数",
                            // min: 0,
                            // max: 480,
                            interval: 80,
                            axisLabel: {
                                show: false,
                                formatter: "{value}",
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
            yearChange(item) {
                this.findCadresLossInfoData.year = item
                this.queryfindCadresLossInfo()
                // this.queryfindCadreChartInfo()
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
            queryfindCadreChartDownDeptInfo() {
                findCadreChartDownDeptInfo({
                    deptList: this.readySelectDept
                }).then(res => {
                    if (res.code == "1000") {
                        this.downDeptlist = JSON.parse(JSON.stringify(res.obj).replace(/deptId/g, 'value'))
                        this.downDeptlist = JSON.parse(JSON.stringify(this.downDeptlist).replace(/deptName/g, 'text'))
                        this.downDeptlist.unshift({
                            value: this.readySelectDeptObj.deptId,
                            text: this.readySelectDeptObj.text
                        })
                        this.selectDownDept = this.downDeptlist[0].value
                    } else {
                        this.downDeptlist.unshift({
                            value: this.readySelectDeptObj.deptId,
                            text: this.readySelectDeptObj.text
                        })
                        this.selectDownDept = this.downDeptlist[0].value
                        // Toast.fail(res.msg);
                        // this.showNodatas = true
                    }

                })
            },
            confirmDept(item) {
                // debugger
                this.findCadreChartInfoUeryData.deptList = [item]
                this.queryfindCadreChartInfo()
            }
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {
            this.init();
        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            this.$refs.adresResultsTanbber.changtab("cadreReserve");
            // this.initcadreReserveEchart();
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
</style>
