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
            queryfindCadreJGGinfo() {
                this.findCadreJGGinfoData.deptList = this.readySelectDept
                findCadreJGGinfo(this.findCadreJGGinfoData).then(res => {
                    let aa =  this.setRandomTree(1, 99,3)
                    this.initfindCadreJGGinfoEchart(res.obj)
                })
            },
            setRandomTree(minNum, maxNum,decimalNum) {
                debugger
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
                        showDelay: 0,
                        formatter: function(params) {
                            if (params.value.length > 1) {
                                return params.seriesName + ' :<br/>' +
                                    params.value[0] + 'cm ' +
                                    params.value[1] + 'kg ';
                            } else {
                                return params.seriesName + ' :<br/>' +
                                    params.name + ' : ' +
                                    params.value + 'kg ';
                            }
                        },
                        axisPointer: {
                            show: true,
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

                    // toolbox: {
                    //     feature: {
                    //         dataZoom: {},
                    //         brush: {
                    //             type: ['rect', 'polygon', 'clear']
                    //         }
                    //     }
                    // },
                    brush: {},
                    legend: {
                        data: ['第一象限', '第二象限', '第三象限', '第四象限', '第五象限', '第六象限', '第七象限', '第八象限', '第九象限'],
                        left: 'center'
                    },
                    xAxis: [{
                        type: 'value',
                        scale: true,
                        axisLabel: {
                            formatter: '{value} cm'
                        },
                        splitLine: {
                            show: false
                        }
                    }],
                    yAxis: [{
                        type: 'value',
                        scale: true,
                        axisLabel: {
                            formatter: '{value} kg'
                        },
                        splitLine: {
                            show: false
                        }
                    }],
                    series: [{
                            name: '第一象限',
                            type: 'scatter',
                            data: [],
                            markArea: {
                                silent: true,
                                itemStyle: {
                                    color: 'transparent',
                                    borderWidth: 1,
                                    borderType: 'dashed'
                                },
                                data: [
                                    [{
                                        name: '第一象限分布区间',
                                        xAxis: 'min',
                                        yAxis: 'min'
                                    }, {
                                        xAxis: 'max',
                                        yAxis: 'max'
                                    }]
                                ]
                            },
                            markPoint: {
                                data: [{
                                        type: 'max',
                                        name: '最大值'
                                    },
                                    {
                                        type: 'min',
                                        name: '最小值'
                                    }
                                ]
                            },
                            // markLine: {
                            //     lineStyle: {
                            //         type: 'solid'
                            //     },
                            //     data: [{
                            //             type: 'average',
                            //             name: '平均值'
                            //         },
                            //         {
                            //             xAxis: 160
                            //         }
                            //     ]
                            // }
                        },
                        {
                            name: '第二象限',
                            type: 'scatter',
                            data: [],
                            markArea: {
                                silent: true,
                                itemStyle: {
                                    color: 'transparent',
                                    borderWidth: 1,
                                    borderType: 'dashed'
                                },
                                data: [
                                    [{
                                        name: '第二象限分布区间',
                                        xAxis: 'min',
                                        yAxis: 'min'
                                    }, {
                                        xAxis: 'max',
                                        yAxis: 'max'
                                    }]
                                ]
                            },
                            markPoint: {
                                data: [{
                                        type: 'max',
                                        name: '最大值'
                                    },
                                    {
                                        type: 'min',
                                        name: '最小值'
                                    }
                                ]
                            },
                            // markLine: {
                            //     lineStyle: {
                            //         type: 'solid'
                            //     },
                            //     data: [{
                            //             type: 'average',
                            //             name: '平均值'
                            //         },
                            //         {
                            //             xAxis: 170
                            //         }
                            //     ]
                            // }
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
