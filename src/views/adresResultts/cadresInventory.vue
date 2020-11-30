<!--  -->
<template>
    <div class=''>
        <adresNavbar></adresNavbar>
        <adresResultsTanbber ref="adresResultsTanbber" />
        <div>
            <div>
                <van-row type="flex" justify="left" style="margin-bottom: 10px">
                    <van-col>
                        <div class="titleRewards">
                            <span class="honghe"></span>
                            干部雷达图
                        </div>
                    </van-col>
                </van-row>
                <selctYearcurrent @yearChangeItem='yearChange' :startYear='2019' :allPage='0'></selctYearcurrent>
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
        </div>
        <div>
            <van-row type="flex" justify="left" style="margin-bottom: 10px">
                <van-col>
                    <div class="titleRewards">
                        <span class="honghe"></span>
                        干部九宫格
                    </div>
                </van-col>
            </van-row>
            <div>
                <div style="width: 100%; height: 400px">
                    <div ref="findCadreJGGinfoEchart" :style="{ width: '100%', height: '400px' }"></div>
                </div>
            </div>
        </div>
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
    import adresNavbar from "@/components/adresResultstab/adresResultsNavbar.vue";
    import adresResultsTanbber from "@/components/adresResultstab/adresResultstab.vue";
    import selctYearcurrent from "@/components/adresResultstab/selctYearcurrent.vue";
    import noData from "@/components/noData.vue";
    import {
        findCadreChartInfo,
        findCadreChartDownDeptInfo,
        findCadreJGGinfo
    } from "@/views/adresResultts/adresResults.js";
    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {
            adresResultsTanbber,
            adresNavbar,
            selctYearcurrent,
            noData
        },
        data() {
            //这里存放数据
            return {
                selectDownDept: '',
                downDeptlist: [],
                showNodatas: false,
                findCadreChartInfoUeryData: {
                    deptList: [],
                    year: "",
                    isDown: 'Y'
                },
                readySelectDept: "",
                readySelectDeptObj: {},
                findCadreJGGinfoData: {
                    deptList: [],
                    isDown: 'Y',
                    year: '2018',
                    type: '1'
                }
            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            init() {
                this.readySelectDept = [JSON.parse(localStorage.getItem("adresResultDept")).deptId];
                this.readySelectDeptObj = JSON.parse(localStorage.getItem("adresResultDept"))
                this.findCadreChartInfoUeryData.deptList = this.readySelectDept
                this.queryfindCadreChartDownDeptInfo()
                this.queryfindCadreChartInfo()
                this.queryfindCadreJGGinfo()
            },
            yearChange(item) {
                this.findCadreChartInfoUeryData.year = item
                this.queryfindCadreChartInfo()
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
                                name: list[1].deptName,
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
                                name: list[0].deptName,
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
            queryfindCadreJGGinfo() {
                this.findCadreJGGinfoData.deptList = this.readySelectDept
                findCadreJGGinfo(this.findCadreJGGinfoData).then(res => {
                    // let aa = this.setRandomTree(1, 99, 3)
                    if (res.code == "1000") {
                        this.initfindCadreJGGinfoEchart(res.obj)
                    } else {
                        Toast.fail(res.msg);
                    }
                })
            },
            setRandomTree(minNum, maxNum, decimalNum) {
                var max = 0,
                    min = 0;
                minNum <= maxNum ? (min = minNum, max = maxNum) : (min = maxNum, max = minNum);
                switch (arguments.length) {
                    case 1:
                        return Math.floor(Math.random() * (max + 1));
                        break;
                    case 2:
                        return Math.floor(Math.random() * (max - min + 1) + min);
                        break;
                    case 3:
                        return (Math.random() * (max - min) + min).toFixed(decimalNum);
                        break;
                    default:
                        return Math.random();
                        break;
                }
            },
            initfindCadreJGGinfoEchart(obj) {
                var that = this
                var myChart = this.$echarts.init(this.$refs.findCadreJGGinfoEchart);
                let onelist = []
                let twolist = []
                let threelist = []
                let fourlist = []
                let fivelist = []
                let sixlist = []
                let sevenlist = []
                let eightlist = []
                let ninelist = []
                for (let key in obj) {
                    if (key == 'one') {
                        for (let i in obj[key]) {
                            obj[key][i].x = that.setRandomTree(0, 30, 3)
                            obj[key][i].y = that.setRandomTree(0, 30, 3)
                            onelist.push([obj[key][i].x, obj[key][i].y])
                        }
                    }
                    if (key == 'two') {
                        for (let i in obj[key]) {
                            obj[key][i].x = that.setRandomTree(30, 60, 3)
                            obj[key][i].y = that.setRandomTree(0, 30, 3)
                            twolist.push([obj[key][i].x, obj[key][i].y])

                        }
                    }
                    if (key == 'three') {
                        for (let i in obj[key]) {
                            obj[key][i].x = that.setRandomTree(0, 30, 3)
                            obj[key][i].y = that.setRandomTree(30, 60, 3)
                            threelist.push([obj[key][i].x, obj[key][i].y])

                        }
                    }
                    if (key == 'four') {
                        for (let i in obj[key]) {
                            obj[key][i].x = that.setRandomTree(60, 90, 3)
                            obj[key][i].y = that.setRandomTree(0, 30, 3)
                            fourlist.push([obj[key][i].x, obj[key][i].y])

                        }
                    }
                    if (key == 'five') {
                        for (let i in obj[key]) {
                            obj[key][i].x = that.setRandomTree(30, 60, 3)
                            obj[key][i].y = that.setRandomTree(30, 60, 3)
                            fivelist.push([obj[key][i].x, obj[key][i].y])

                        }
                    }
                    if (key == 'six') {
                        for (let i in obj[key]) {
                            obj[key][i].x = that.setRandomTree(0, 30, 3)
                            obj[key][i].y = that.setRandomTree(60, 90, 3)
                            sixlist.push([obj[key][i].x, obj[key][i].y])

                        }
                    }
                    if (key == 'seven') {
                        for (let i in obj[key]) {
                            obj[key][i].x = that.setRandomTree(60, 90, 3)
                            obj[key][i].y = that.setRandomTree(30, 60, 3)
                            sevenlist.push([obj[key][i].x, obj[key][i].y])

                        }
                    }
                    // if (key == 'seven') {
                    //   for(let i in obj[key]){
                    //     obj[key][i].x = that.setRandomTree(60,90,3)
                    //     obj[key][i].y = that.setRandomTree(30,60,3)
                    //     sevenlist.push([obj[key][i].x,obj[key][i].y])

                    //   }
                    // }
                    if (key == 'eight') {
                        for (let i in obj[key]) {
                            obj[key][i].x = that.setRandomTree(30, 60, 3)
                            obj[key][i].y = that.setRandomTree(60, 90, 3)
                            eightlist.push([obj[key][i].x, obj[key][i].y])
                        }
                    }
                    if (key == 'nine') {
                        for (let i in obj[key]) {
                            obj[key][i].x = that.setRandomTree(60, 90, 3)
                            obj[key][i].y = that.setRandomTree(60, 90, 3)
                            ninelist.push([obj[key][i].x, obj[key][i].y])
                        }
                    }
                }
                myChart.setOption({
                    // title: {
                    //     text: '男性女性身高体重分布',
                    //     subtext: '抽样调查来自: Heinz  2003'
                    // },
                    grid: {
                        left: '3%',
                        right: '7%',
                        bottom: '3%',
                        containLabel: true
                    },
                    tooltip: {
                        // trigger: 'axis',
                        // '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨'
                        showDelay: 0,
                        formatter: function(params, ticket) {
                            var str = ''
                            switch (params.seriesName) {
                                case '①':
                                    for (let i in obj.one) {
                                        if (obj.one[i].x == params.value[0] && obj.one[i].y == params.value[1]) {
                                            str = `姓名：${obj.one[i].name}<br/>年龄：${obj.one[i].age}<br/>职级：${obj.one[i].zj}<br/>`
                                            break
                                        }
                                    }
                                    break;
                                case '②':
                                    for (let i in obj.two) {
                                        if (obj.two[i].x == params.value[0] && obj.two[i].y == params.value[1]) {
                                            str = `姓名：${obj.two[i].name}<br/>年龄：${obj.two[i].age}<br/>职级：${obj.two[i].zj}<br/>`
                                            break
                                        }
                                    }
                                    break;
                                case '③':
                                    for (let i in obj.three) {
                                        if (obj.three[i].x == params.value[0] && obj.three[i].y == params.value[1]) {
                                            str = `姓名：${obj.three[i].name}<br/>年龄：${obj.three[i].age}<br/>职级：${obj.three[i].zj}<br/>`
                                            break
                                        }
                                    }
                                    break;
                                case '④':
                                    for (let i in obj.four) {
                                        if (obj.four[i].x == params.value[0] && obj.four[i].y == params.value[1]) {
                                            str = `姓名：${obj.four[i].name}<br/>年龄：${obj.four[i].age}<br/>职级：${obj.four[i].zj}<br/>`
                                            break
                                        }
                                    }
                                    break;
                                case '⑤':
                                    for (let i in obj.five) {
                                        if (obj.five[i].x == params.value[0] && obj.five[i].y == params.value[1]) {
                                            str = `姓名：${obj.five[i].name}<br/>年龄：${obj.five[i].age}<br/>职级：${obj.five[i].zj}<br/>`
                                            break
                                        }
                                    }
                                    break;
                                case '⑥':
                                    for (let i in obj.six) {
                                        if (obj.six[i].x == params.value[0] && obj.six[i].y == params.value[1]) {
                                            str = `姓名：${obj.six[i].name}<br/>年龄：${obj.six[i].age}<br/>职级：${obj.six[i].zj}<br/>`
                                            break
                                        }
                                    }
                                    break;
                                case '⑦':
                                    for (let i in obj.seven) {
                                        if (obj.seven[i].x == params.value[0] && obj.seven[i].y == params.value[1]) {
                                            str = `姓名：${obj.seven[i].name}<br/>年龄：${obj.seven[i].age}<br/>职级：${obj.seven[i].zj}<br/>`
                                            break
                                        }
                                    }
                                    break;
                                case '⑧':
                                    for (let i in obj.eight) {
                                        if (obj.eight[i].x == params.value[0] && obj.eight[i].y == params.value[1]) {
                                            str = `姓名：${obj.eight[i].name}<br/>年龄：${obj.eight[i].age}<br/>职级：${obj.eight[i].zj}<br/>`
                                            break
                                        }
                                    }
                                    break;
                                case '⑨':
                                    for (let i in obj.nine) {
                                        if (obj.nine[i].x == params.value[0] && obj.nine[i].y == params.value[1]) {
                                            str = `姓名：${obj.nine[i].name}<br/>年龄：${obj.nine[i].age}<br/>职级：${obj.nine[i].zj}<br/>`
                                            break
                                        }
                                    }
                                    break;
                                default:
                                    break;
                            }
                            return str
                        },
                        axisPointer: {
                            show: false,
                            type: 'cross',
                            lineStyle: {
                                type: 'dashed',
                                width: 1
                            }
                        }
                    },
                    dataZoom: {
                        type: 'inside'
                    },

                    toolbox: {
                        show: false,
                        // feature: {
                        //     dataZoom: {},
                        //     brush: {
                        //         type: ['rect', 'polygon', 'clear']
                        //     }
                        // }
                    },
                    brush: {},
                    legend: {
                        data: ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨'],
                        left: 'center'
                    },
                    xAxis: [{
                        type: 'value',
                        max: 90,
                        min: 0,
                        splitNumber: 3,
                        axisLabel: {
                            // formatter: '{value} cm'
                            formatter: function(value) {
                                var texts = [];
                                if (value <= 30) {
                                    texts.push('低能力(后10%)');
                                } else if (value <= 60) {
                                    texts.push('中能力(中70%)');
                                } else if (value <= 90) {
                                    texts.push('高能力(前20%)');
                                }
                                return texts;

                            }
                        },
                    }],
                    yAxis: [{
                        type: 'value',
                        splitNumber: 3,
                        max: 90,
                        min: 0,
                        axisLabel: {
                            // formatter: '{value} kg'
                            formatter: function(value) {
                                var texts = [];
                                if (value <= 30) {
                                    texts.push('低绩效C/D');
                                } else if (value <= 60) {
                                    texts.push('中绩效B+/B');
                                } else if (value <= 90) {
                                    texts.push('高绩效S/A');
                                }
                                return texts;

                            }
                        },

                    }],
                    series: [{
                            name: '①',
                            type: 'scatter',
                            data: onelist,
                            markArea: {
                                silent: true,
                                itemStyle: {
                                    color: 'transparent',
                                    borderWidth: 1,
                                    borderType: 'dashed'
                                },
                                data: [
                                    [{
                                        name: '①',
                                        xAxis: 'min',
                                        yAxis: 'min'
                                    }, {
                                        xAxis: 'max',
                                        yAxis: 'max'
                                    }]
                                ]
                            },

                        },
                        {
                            name: '②',
                            type: 'scatter',
                            data: twolist,
                            markArea: {
                                silent: true,
                                itemStyle: {
                                    color: 'transparent',
                                    borderWidth: 1,
                                    borderType: 'dashed'
                                },
                                data: [
                                    [{
                                        name: '②',
                                        xAxis: 'min',
                                        yAxis: 'min'
                                    }, {
                                        xAxis: 'max',
                                        yAxis: 'max'
                                    }]
                                ]
                            },
                            // markPoint: {
                            //     data: [{
                            //             type: 'max',
                            //             name: '最大值'
                            //         },
                            //         {
                            //             type: 'min',
                            //             name: '最小值'
                            //         }
                            //     ]
                            // },
                        },
                        {
                            name: '③',
                            type: 'scatter',
                            data: threelist,
                            markArea: {
                                silent: true,
                                itemStyle: {
                                    color: 'transparent',
                                    borderWidth: 1,
                                    borderType: 'dashed'
                                },
                                data: [
                                    [{
                                        name: '③',
                                        xAxis: 'min',
                                        yAxis: 'min'
                                    }, {
                                        xAxis: 'max',
                                        yAxis: 'max'
                                    }]
                                ]
                            },
                            // markPoint: {
                            //     data: [{
                            //             type: 'max',
                            //             name: '最大值'
                            //         },
                            //         {
                            //             type: 'min',
                            //             name: '最小值'
                            //         }
                            //     ]
                            // },
                        },
                        {
                            name: '④',
                            type: 'scatter',
                            data: fourlist,
                            markArea: {
                                silent: true,
                                itemStyle: {
                                    color: 'transparent',
                                    borderWidth: 1,
                                    borderType: 'dashed'
                                },
                                data: [
                                    [{
                                        name: '④',
                                        xAxis: 'min',
                                        yAxis: 'min'
                                    }, {
                                        xAxis: 'max',
                                        yAxis: 'max'
                                    }]
                                ]
                            },
                            // markPoint: {
                            //     data: [{
                            //             type: 'max',
                            //             name: '最大值'
                            //         },
                            //         {
                            //             type: 'min',
                            //             name: '最小值'
                            //         }
                            //     ]
                            // },
                        },
                        {
                            name: '⑤',
                            type: 'scatter',
                            data: fivelist,
                            markArea: {
                                silent: true,
                                itemStyle: {
                                    color: 'transparent',
                                    borderWidth: 1,
                                    borderType: 'dashed'
                                },
                                data: [
                                    [{
                                        name: '⑤',
                                        xAxis: 'min',
                                        yAxis: 'min'
                                    }, {
                                        xAxis: 'max',
                                        yAxis: 'max'
                                    }]
                                ]
                            },
                            // markPoint: {
                            //     data: [{
                            //             type: 'max',
                            //             name: '最大值'
                            //         },
                            //         {
                            //             type: 'min',
                            //             name: '最小值'
                            //         }
                            //     ]
                            // },
                        },
                        {
                            name: '⑥',
                            type: 'scatter',
                            data: sixlist,
                            markArea: {
                                silent: true,
                                itemStyle: {
                                    color: 'transparent',
                                    borderWidth: 1,
                                    borderType: 'dashed'
                                },
                                data: [
                                    [{
                                        name: '⑥',
                                        xAxis: 'min',
                                        yAxis: 'min'
                                    }, {
                                        xAxis: 'max',
                                        yAxis: 'max'
                                    }]
                                ]
                            },
                            // markPoint: {
                            //     data: [{
                            //             type: 'max',
                            //             name: '最大值'
                            //         },
                            //         {
                            //             type: 'min',
                            //             name: '最小值'
                            //         }
                            //     ]
                            // },
                        },
                        {
                            name: '⑦',
                            type: 'scatter',
                            data: sevenlist,
                            markArea: {
                                silent: true,
                                itemStyle: {
                                    color: 'transparent',
                                    borderWidth: 1,
                                    borderType: 'dashed'
                                },
                                data: [
                                    [{
                                        name: '⑦',
                                        xAxis: 'min',
                                        yAxis: 'min'
                                    }, {
                                        xAxis: 'max',
                                        yAxis: 'max'
                                    }]
                                ]
                            },
                            // markPoint: {
                            //     data: [{
                            //             type: 'max',
                            //             name: '最大值'
                            //         },
                            //         {
                            //             type: 'min',
                            //             name: '最小值'
                            //         }
                            //     ]
                            // },
                        },
                        {
                            name: '⑧',
                            type: 'scatter',
                            data: eightlist,
                            markArea: {
                                silent: true,
                                itemStyle: {
                                    color: 'transparent',
                                    borderWidth: 1,
                                    borderType: 'dashed'
                                },
                                data: [
                                    [{
                                        name: '⑧',
                                        xAxis: 'min',
                                        yAxis: 'min'
                                    }, {
                                        xAxis: 'max',
                                        yAxis: 'max'
                                    }]
                                ]
                            },
                            // markPoint: {
                            //     data: [{
                            //             type: 'max',
                            //             name: '最大值'
                            //         },
                            //         {
                            //             type: 'min',
                            //             name: '最小值'
                            //         }
                            //     ]
                            // },
                        },
                        {
                            name: '⑨',
                            type: 'scatter',
                            data: ninelist,
                            markArea: {
                                silent: true,
                                itemStyle: {
                                    color: 'transparent',
                                    borderWidth: 1,
                                    borderType: 'dashed'
                                },
                                data: [
                                    [{
                                        name: '⑨',
                                        xAxis: 'min',
                                        yAxis: 'min'
                                    }, {
                                        xAxis: 'max',
                                        yAxis: 'max'
                                    }]
                                ]
                            },
                            // markPoint: {
                            //     data: [{
                            //             type: 'max',
                            //             name: '最大值'
                            //         },
                            //         {
                            //             type: 'min',
                            //             name: '最小值'
                            //         }
                            //     ]
                            // },
                        },



                    ]
                })

            }
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {
            this.init();
        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            this.$refs.adresResultsTanbber.changtab("cadresInventory");
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
