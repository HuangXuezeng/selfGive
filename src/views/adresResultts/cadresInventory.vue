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
            <selctYearcurrent @yearChangeItem='JGGyearChange' :startYear='2017' :allPage='0'></selctYearcurrent>
            <van-dropdown-menu>
                <van-dropdown-item v-model="selectJGGtype" :options="selectJGGtypelist" @change='confirmJGG' />
            </van-dropdown-menu>
            <div>
                <div style="width: 100%; height: 400px">
                    <div ref="findCadreJGGinfoEchart" :style="{ width: '100%', height: '400px' }"></div>
                </div>
            </div>
        </div>
        <div>
            <van-popup v-model="showRightInfo" position="right" :style="{ height: '100%', width: '80%' }" get-container="body" :closeable='true'>
                <van-row type="flex" justify="center" style="margin-bottom: 10px">
                    <van-col>
                        <div class="titleRightInfo">
                            {{ titleRight }}
                        </div>
                    </van-col>
                </van-row>
                <!-- <div v-for="(items, index) in vancellList" :key="index">
                        <van-row type="flex" justify="space-around" v-show="items[0].sexFlag != 1">
                            <van-col span="12" v-for="(item, index) in items" :key="index">
                                <van-cell :title="item.title" is-link :arrow-direction="item.direction" :value="item.value" @click="vancellListTouch(item)" />
                            </van-col>
                        </van-row>
                    </div> -->
                <div v-for="(items, index) in vancellList" :key="index">
                    <van-row type="flex" justify="space-around">
                        <van-col span="12" v-for="(item, index) in items" :key="index">
                            <van-cell is-link :arrow-direction="item.direction" :value="item.value" @click="vancellListTouch(item)" v-show="!item.show">
                                <template #title>
                                    <span style="font-size: 18 px;color: red;">{{item.title}}</span>
                                </template>
                                <template #default>
                                    <van-icon name="friends-o" />
                                    <span>{{item.value}}</span>
                                </template>
                            </van-cell>
                        </van-col>
                    </van-row>
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
                selectJGGtype: '',
                selectJGGtypelist: [{
                    text: '全部',
                    value: ''
                }, {
                    text: '经理',
                    value: '1'
                }, {
                    text: '总监',
                    value: '2'
                }],
                downDeptlist: [],
                showNodatas: false,
                findCadreChartInfoUeryData: {
                    deptList: [],
                    year: "",
                    isDown: 'Y',
                    bzType: 'Y'
                },
                readySelectDept: "",
                readySelectDeptObj: {},
                findCadreJGGinfoData: {
                    deptList: [],
                    isDown: 'Y',
                    year: '',
                    type: '',
                    bzType: 'Y'
                },
                //坐标x值，y值
                normX: 0,
                normY: 0,
                bzType: '',
                showRightInfo: false,
                vancellList: [],
                isLoading: true,
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
                        field: "name",
                        title: "姓名",
                        width: 80,
                        titleAlign: "center",
                        columnAlign: "center",
                        formatter: function(rowData, rowIndex, pagingIndex, field) {
                            return `<span>${rowData[field]}</span>`;
                        },
                        isResize: true,
                    },
                    {
                        field: "age",
                        title: "年龄",
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
                    }
                ],
                rightInfoData: [],
                JGGinfoRes: {},
                titleRight: ''
            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            // 数据初始化
            init() {
                // 获取本地存储的部门id
                this.readySelectDept = [JSON.parse(localStorage.getItem("adresResultDept")).deptId];
                //获取本地存储的部门对象
                this.readySelectDeptObj = JSON.parse(localStorage.getItem("adresResultDept"))
                // 查询赋值部门信息
                this.findCadreChartInfoUeryData.deptList = this.readySelectDept
                this.bzType = localStorage.getItem("bzType")
                this.findCadreChartInfoUeryData.bzType = this.bzType
                this.findCadreJGGinfoData.bzType = this.bzType
                // 干部雷达图下拉部门数据初始化
                this.queryfindCadreChartDownDeptInfo()
                //干部雷达图数据初始化
                this.queryfindCadreChartInfo()
                // 九宫格数据初始化
                this.queryfindCadreJGGinfo()
            },
            // 年份改变事件
            yearChange(item) {
                this.findCadreChartInfoUeryData.year = item
                this.queryfindCadreChartInfo()
            },
            //干部雷达图下拉部门数据
            queryfindCadreChartDownDeptInfo() {
                findCadreChartDownDeptInfo({
                    deptList: this.readySelectDept,
                    bzType: this.bzType
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
                    }

                })
            },
            // 点击下拉部门事件
            confirmDept(item) {
                //
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
            // 干部雷达图echarts渲染
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
            // 九宫格数据
            queryfindCadreJGGinfo() {
                this.findCadreJGGinfoData.deptList = this.readySelectDept
                findCadreJGGinfo(this.findCadreJGGinfoData).then(res => {
                    // let aa = this.setRandomTree(1, 99, 3)
                    if (res.code == "1000") {
                        this.initfindCadreJGGinfoEchart(res.obj)
                        this.JGGinfoRes = res.obj
                    } else {
                        Toast.fail(res.msg);
                    }
                })
            },
            //九宫格散点图位置处理
            setRandomTree(minNum, maxNum, len, site) {
                let max = 0;
                let min = 0;
                minNum <= maxNum ? (min = minNum, max = maxNum) : (min = maxNum, max = minNum);
                return (Math.random() * (max - min) + min).toFixed(2);
            },
            //九宫格散点图姓名标注处理
            PointlistSet(listitem) {
                let obj = {}
                obj.name = `姓名：${ listitem.name}<br/>年龄：${listitem.age}<br/>职级：${listitem.zj}<br/>象限：${listitem.jgg}<br/>`
                obj.value = listitem.name
                obj.xAxis = listitem.x
                obj.yAxis = listitem.y
                return obj
            },
            //九宫格散点图渲染图
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
                let onePointlist = []
                let twoPointlist = []
                let threePointlist = []
                let fourPointlist = []
                let fivePointlist = []
                let sixPointlist = []
                let sevenPointlist = []
                let eightPointlist = []
                let ninePointlist = []

                // 显示模式切换
                let briefFlag = false
                for (let ksy in obj) {
                    if (ksy == 'oneCount' || ksy == 'twoCount' || ksy == 'threeCount' || ksy == 'fourCount' || ksy == 'fiveCount' || ksy == 'sixCount' || ksy == 'sevenCount' || ksy == 'eightCount' || ksy == 'nineCount') {
                        if (Number(obj[ksy]) > 5) {
                            briefFlag = true
                            break
                        }
                    }
                }
                Object.keys(obj).forEach((key) => {
                    console.log(key, obj[key]);
                    //
                    if (key == 'one') {
                        that.normX = 0
                        that.normY = 30
                        let oneobjList = obj[key]
                        if (!briefFlag) {
                            for (let i in oneobjList) {
                                oneobjList[i].x = that.setRandomTree(0, 30, oneobjList.length, i)
                                oneobjList[i].y = that.setRandomTree(0, 30, oneobjList.length, i)
                                onelist.push([oneobjList[i].x, oneobjList[i].y])
                                onePointlist.push(that.PointlistSet(oneobjList[i]))
                            }
                        } else {
                            let x = {
                                xrange: 0,
                                yrange: 0,

                            }
                            let y = {
                                xrange: 30,
                                yrange: 30,

                            }
                            if (obj[key].length != undefined && obj[key].length != 0) {
                                onePointlist.push({
                                    name: 'one',
                                    xAxis: x.xrange + 15 + '',
                                    yAxis: x.yrange + 15 + '',
                                    value: obj.onePct,
                                })
                                onelist = [
                                    [x.xrange, y.yrange],
                                    [x.xrange + 15, x.yrange + 15]
                                ]
                            } else {
                                onelist = [
                                    [x.xrange, y.yrange]
                                ]
                            }
                        }

                    }
                    if (key == 'two') {
                        that.normX = 30
                        that.normY = 30
                        let twoobjList = obj[key]
                        if (!briefFlag) {
                            for (let i in twoobjList) {
                                twoobjList[i].y = that.setRandomTree(0, 30, twoobjList.length, i)
                                twoobjList[i].x = that.setRandomTree(30, 60, twoobjList.length, i)

                                twolist.push([twoobjList[i].x, twoobjList[i].y])
                                twoPointlist.push(that.PointlistSet(twoobjList[i]))
                            }
                        } else {
                            let x = {
                                xrange: 0,
                                yrange: 30,

                            }
                            let y = {
                                xrange: 30,
                                yrange: 60,

                            }
                            if (obj[key].length != undefined && obj[key].length != 0) {
                                twoPointlist.push({
                                    name: 'two',
                                    xAxis: x.xrange + 15 + '',
                                    yAxis: x.yrange + 15 + '',
                                    value: obj.twoPct,

                                })
                                twolist = [
                                    [x.xrange, y.yrange],
                                    [x.xrange + 15, x.yrange + 15]
                                ]
                            } else {
                                twolist = [
                                    [x.xrange, y.yrange]
                                ]
                            }
                        }

                    }
                    if (key == 'three') {
                        that.normX = 0
                        that.normY = 60
                        let threeobjList = obj[key]
                        if (!briefFlag) {
                            for (let i in threeobjList) {
                                threeobjList[i].y = that.setRandomTree(30, 60, threeobjList.length, i)
                                threeobjList[i].x = that.setRandomTree(0, 30, threeobjList.length, i)

                                threelist.push([threeobjList[i].x, threeobjList[i].y])
                                threePointlist.push(that.PointlistSet(threeobjList[i]))
                            }
                        } else {
                            let x = {
                                xrange: 30,
                                yrange: 0,

                            }
                            let y = {
                                xrange: 60,
                                yrange: 30,

                            }
                            if (obj[key].length != undefined && obj[key].length != 0) {
                                threePointlist.push({
                                    name: 'three',
                                    xAxis: x.xrange + 15 + '',
                                    yAxis: x.yrange + 15 + '',
                                    value: obj.threePct,

                                })
                                threelist = [
                                    [x.xrange, y.yrange],
                                    [x.xrange + 15, x.yrange + 15]
                                ]
                            } else {
                                threelist = [
                                    [x.xrange, y.yrange]
                                ]
                            }
                        }

                    }
                    if (key == 'four') {
                        that.normX = 60
                        that.normY = 30
                        let fourobjList = obj[key]
                        if (!briefFlag) {
                            for (let i in fourobjList) {
                                fourobjList[i].y = that.setRandomTree(0, 30, fourobjList.length, i)
                                fourobjList[i].x = that.setRandomTree(60, 90, fourobjList.length, i)

                                fourlist.push([fourobjList[i].x, fourobjList[i].y])
                                fourPointlist.push(that.PointlistSet(fourobjList[i]))
                            }
                        } else {
                            let x = {
                                xrange: 0,
                                yrange: 60,

                            }
                            let y = {
                                xrange: 30,
                                yrange: 90,

                            }
                            if (obj[key].length != undefined && obj[key].length != 0) {
                                fourPointlist.push({
                                    name: 'four',
                                    xAxis: x.xrange + 15 + '',
                                    yAxis: x.yrange + 15 + '',
                                    value: obj.fourPct,

                                })
                                fourlist = [
                                    [x.xrange, y.yrange],
                                    [x.xrange + 15, x.yrange + 15]
                                ]
                            } else {
                                fourlist = [
                                    [x.xrange, y.yrange]
                                ]
                            }
                        }

                    }
                    if (key == 'five') {
                        that.normX = 30
                        that.normY = 60
                        //
                        let fiveobjList = obj[key]
                        if (!briefFlag) {
                            for (let i in fiveobjList) {
                                fiveobjList[i].y = that.setRandomTree(30, 60, fiveobjList.length, i)
                                fiveobjList[i].x = that.setRandomTree(30, 60, fiveobjList.length, i)

                                fivelist.push([fiveobjList[i].x, fiveobjList[i].y])
                                fivePointlist.push(that.PointlistSet(fiveobjList[i]))
                            }
                        } else {
                            let x = {
                                xrange: 30,
                                yrange: 30,

                            }
                            let y = {
                                xrange: 60,
                                yrange: 60,

                            }
                            if (obj[key].length != undefined && obj[key].length != 0) {
                                fivePointlist.push({
                                    name: 'five',
                                    value: obj.fivePct,

                                    xAxis: x.xrange + 15 + '',
                                    yAxis: x.yrange + 15 + ''
                                })
                                fivelist = [
                                    [x.xrange, y.yrange],
                                    [x.xrange + 15, x.yrange + 15]
                                ]
                            } else {
                                fivelist = [
                                    [x.xrange, y.yrange]
                                ]
                            }
                        }

                    }
                    if (key == 'six') {
                        that.normX = 0
                        that.normY = 90
                        let sixobjList = obj[key]
                        if (!briefFlag) {
                            for (let i in sixobjList) {
                                sixobjList[i].y = that.setRandomTree(60, 90, sixobjList.length, i)
                                sixobjList[i].x = that.setRandomTree(0, 30, sixobjList.length, i)

                                sixlist.push([sixobjList[i].x, sixobjList[i].y])
                                sixPointlist.push(that.PointlistSet(sixobjList[i]))
                            }
                        } else {
                            let x = {
                                xrange: 60,
                                yrange: 0,

                            }
                            let y = {
                                xrange: 90,
                                yrange: 30,

                            }
                            if (obj[key].length != undefined && obj[key].length != 0) {
                                sixPointlist.push({
                                    name: 'six',
                                    value: obj.sixPct,

                                    xAxis: x.xrange + 15 + '',
                                    yAxis: x.yrange + 15 + ''
                                })
                                sixlist = [
                                    [x.xrange, y.yrange],
                                    [x.xrange + 15, x.yrange + 15]
                                ]
                            } else {
                                sixlist = [
                                    [x.xrange, y.yrange]
                                ]
                            }
                        }

                    }
                    if (key == 'seven') {
                        that.normX = 60
                        that.normY = 60
                        let sevenobjList = obj[key]
                        if (!briefFlag) {
                            for (let i in sevenobjList) {
                                sevenobjList[i].y = that.setRandomTree(30, 60, sevenobjList.length, i)
                                sevenobjList[i].x = that.setRandomTree(60, 90, sevenobjList.length, i)

                                sevenlist.push([sevenobjList[i].x, sevenobjList[i].y])
                                sevenPointlist.push(that.PointlistSet(sevenobjList[i]))
                            }
                        } else {
                            let x = {
                                xrange: 30,
                                yrange: 60,

                            }
                            let y = {
                                xrange: 60,
                                yrange: 90,

                            }
                            if (obj[key].length != undefined && obj[key].length != 0) {
                                sevenPointlist.push({
                                    name: 'seven',
                                    value: obj.sevenPct,
                                    xAxis: x.xrange + 15 + '',
                                    yAxis: x.yrange + 15 + ''
                                })
                                sevenlist = [
                                    [x.xrange, y.yrange],
                                    [x.xrange + 15, x.yrange + 15]
                                ]
                            } else {
                                sevenlist = [
                                    [x.xrange, y.yrange]
                                ]
                            }
                        }

                    }
                    if (key == 'eight') {
                        that.normX = 30
                        that.normY = 90
                        let eightobjList = obj[key]
                        if (!briefFlag) {
                            for (let i in eightobjList) {
                                eightobjList[i].y = that.setRandomTree(60, 90, eightobjList.length, i)
                                eightobjList[i].x = that.setRandomTree(30, 60, eightobjList.length, i)

                                eightlist.push([eightobjList[i].x, eightobjList[i].y])
                                eightPointlist.push(that.PointlistSet(eightobjList[i]))
                            }
                        } else {
                            let x = {
                                xrange: 60,
                                yrange: 30,

                            }
                            let y = {
                                xrange: 90,
                                yrange: 60,

                            }
                            if (obj[key].length != undefined && obj[key].length != 0) {
                                eightPointlist.push({
                                    name: 'eight',
                                    value: obj.eightPct,
                                    xAxis: x.xrange + 15 + '',
                                    yAxis: x.yrange + 15 + ''
                                })
                                eightlist = [
                                    [x.xrange, y.yrange],
                                    [x.xrange + 15, x.yrange + 15]
                                ]
                            } else {
                                eightlist = [
                                    [x.xrange, y.yrange]
                                ]
                            }
                        }

                    }
                    if (key == 'nine') {
                        that.normX = 60
                        that.normY = 90
                        let nineobjList = obj[key]
                        if (!briefFlag) {
                            for (let i in nineobjList) {
                                nineobjList[i].y = that.setRandomTree(60, 90, nineobjList.length, i)
                                nineobjList[i].x = that.setRandomTree(60, 90, nineobjList.length, i)

                                ninelist.push([nineobjList[i].x, nineobjList[i].y])
                                ninePointlist.push(that.PointlistSet(nineobjList[i]))
                            }
                        } else {
                            let x = {
                                xrange: 60,
                                yrange: 60,

                            }
                            let y = {
                                xrange: 90,
                                yrange: 90,

                            }
                            if (obj[key].length != undefined && obj[key].length != 0) {
                                ninePointlist.push({
                                    name: 'nine',
                                    value: obj.ninePct,
                                    xAxis: x.xrange + 15 + '',
                                    yAxis: x.yrange + 15 + ''
                                })
                                ninelist = [
                                    [x.xrange, y.yrange],
                                    [x.xrange + 15, x.yrange + 15]
                                ]
                            } else {
                                ninelist = [
                                    [x.xrange, y.yrange]
                                ]
                            }
                        }

                    }

                })
                myChart.setOption({
                    grid: {
                        left: '3%',
                        right: '7%',
                        bottom: '3%',
                        containLabel: true
                    },
                    tooltip: {
                        showDelay: 0,
                        formatter: function(params, ticket) {
                            var str = ''
                            switch (params.seriesName) {
                                case '①':
                                    for (let i in obj.one) {
                                        if (obj.one[i].x == params.value[0] && obj.one[i].y == params.value[1]) {
                                            str = `姓名：${obj.one[i].name}<br/>年龄：${obj.one[i].age}<br/>职级：${obj.one[i].zj}<br/>象限：${obj.one[i].jgg}<br/>`
                                            break
                                        }
                                    }
                                    break;
                                case '②':
                                    for (let i in obj.two) {
                                        if (obj.two[i].x == params.value[0] && obj.two[i].y == params.value[1]) {
                                            str = `姓名：${obj.two[i].name}<br/>年龄：${obj.two[i].age}<br/>职级：${obj.two[i].zj}<br/>象限：${obj.one[i].jgg}<br/>`
                                            break
                                        }
                                    }
                                    break;
                                case '③':
                                    for (let i in obj.three) {
                                        if (obj.three[i].x == params.value[0] && obj.three[i].y == params.value[1]) {
                                            str = `姓名：${obj.three[i].name}<br/>年龄：${obj.three[i].age}<br/>职级：${obj.three[i].zj}<br/>象限：${obj.one[i].jgg}<br/>`
                                            break
                                        }
                                    }
                                    break;
                                case '④':
                                    for (let i in obj.four) {
                                        if (obj.four[i].x == params.value[0] && obj.four[i].y == params.value[1]) {
                                            str = `姓名：${obj.four[i].name}<br/>年龄：${obj.four[i].age}<br/>职级：${obj.four[i].zj}<br/>象限：${obj.one[i].jgg}<br/>`
                                            break
                                        }
                                    }
                                    break;
                                case '⑤':
                                    for (let i in obj.five) {
                                        if (obj.five[i].x == params.value[0] && obj.five[i].y == params.value[1]) {
                                            str = `姓名：${obj.five[i].name}<br/>年龄：${obj.five[i].age}<br/>职级：${obj.five[i].zj}<br/>象限：${obj.one[i].jgg}<br/>`
                                            break
                                        }
                                    }
                                    break;
                                case '⑥':
                                    for (let i in obj.six) {
                                        if (obj.six[i].x == params.value[0] && obj.six[i].y == params.value[1]) {
                                            str = `姓名：${obj.six[i].name}<br/>年龄：${obj.six[i].age}<br/>职级：${obj.six[i].zj}<br/>象限：${obj.one[i].jgg}<br/>`
                                            break
                                        }
                                    }
                                    break;
                                case '⑦':
                                    for (let i in obj.seven) {
                                        if (obj.seven[i].x == params.value[0] && obj.seven[i].y == params.value[1]) {
                                            str = `姓名：${obj.seven[i].name}<br/>年龄：${obj.seven[i].age}<br/>职级：${obj.seven[i].zj}<br/>象限：${obj.one[i].jgg}<br/>`
                                            break
                                        }
                                    }
                                    break;
                                case '⑧':
                                    for (let i in obj.eight) {
                                        if (obj.eight[i].x == params.value[0] && obj.eight[i].y == params.value[1]) {
                                            str = `姓名：${obj.eight[i].name}<br/>年龄：${obj.eight[i].age}<br/>职级：${obj.eight[i].zj}<br/>象限：${obj.one[i].jgg}<br/>`
                                            break
                                        }
                                    }
                                    break;
                                case '⑨':
                                    for (let i in obj.nine) {
                                        if (obj.nine[i].x == params.value[0] && obj.nine[i].y == params.value[1]) {
                                            str = `姓名：${obj.nine[i].name}<br/>年龄：${obj.nine[i].age}<br/>职级：${obj.nine[i].zj}<br/>象限：${obj.one[i].jgg}<br/>`
                                            break
                                        }
                                    }
                                    break;
                                default:
                                    break;
                            }
                            return str
                        },
                    },
                    dataZoom: {
                        type: 'inside',
                        // xAxisIndex: [0]
                    },

                    toolbox: {
                        show: false,
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
                            formatter: function(value) {
                                var texts = [];
                                if (value == 0) {
                                    texts.push("");
                                } else if (value <= 30) {
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
                            formatter: function(value) {
                                var texts = [];
                                if (value == 0) {
                                    texts.push("");
                                } else if (value <= 30) {
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
                            markPoint: { // markLine 也是同理
                                data: onePointlist,
                                tooltip: {
                                    trigger: 'item',
                                    position: 'top',
                                    formatter: function(param) {
                                        if (!briefFlag) {
                                            return param.name;
                                        } else {
                                            that.RightInfo(param)
                                        }
                                    }
                                }
                            },
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
                            markPoint: { // markLine 也是同理
                                data: twoPointlist,
                                tooltip: {
                                    trigger: 'item',
                                    position: 'top',
                                    formatter: function(param) {
                                        if (!briefFlag) {
                                            return param.name;
                                        } else {
                                            that.RightInfo(param)
                                        }
                                    }
                                }
                            },
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
                        },
                        {
                            name: '③',
                            type: 'scatter',
                            data: threelist,
                            markPoint: { // markLine 也是同理
                                data: threePointlist,
                                tooltip: {
                                    trigger: 'item',
                                    position: 'top',
                                    formatter: function(param) {
                                        if (!briefFlag) {
                                            return param.name;
                                        } else {
                                            that.RightInfo(param)
                                        }
                                    }
                                }
                            },
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
                        },
                        {
                            name: '④',
                            type: 'scatter',
                            data: fourlist,
                            markPoint: { // markLine 也是同理
                                data: fourPointlist,
                                tooltip: {
                                    trigger: 'item',
                                    position: 'top',
                                    formatter: function(param) {
                                        if (!briefFlag) {
                                            return param.name;
                                        } else {
                                            that.RightInfo(param)
                                        }
                                    }
                                }
                            },
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
                        },
                        {
                            name: '⑤',
                            type: 'scatter',
                            data: fivelist,
                            markPoint: { // markLine 也是同理
                                data: fivePointlist,
                                tooltip: {
                                    trigger: 'item',
                                    position: 'top',
                                    formatter: function(param) {
                                        if (!briefFlag) {
                                            return param.name;
                                        } else {
                                            that.RightInfo(param)
                                        }
                                    }
                                }
                            },
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
                        },
                        {
                            name: '⑥',
                            type: 'scatter',
                            data: sixlist,
                            markPoint: { // markLine 也是同理
                                data: sixPointlist,
                                tooltip: {
                                    trigger: 'item',
                                    position: 'top',
                                    formatter: function(param) {
                                        if (!briefFlag) {
                                            return param.name;
                                        } else {
                                            that.RightInfo(param)
                                        }
                                    }
                                }
                            },
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
                        },
                        {
                            name: '⑦',
                            type: 'scatter',
                            data: sevenlist,
                            markPoint: { // markLine 也是同理
                                data: sevenPointlist,
                                tooltip: {
                                    trigger: 'item',
                                    position: 'top',
                                    formatter: function(param) {
                                        if (!briefFlag) {
                                            return param.name;
                                        } else {
                                            that.RightInfo(param)
                                        }
                                    }
                                }
                            },
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
                        },
                        {
                            name: '⑧',
                            type: 'scatter',
                            data: eightlist,
                            markPoint: { // markLine 也是同理
                                data: eightPointlist,
                                tooltip: {
                                    trigger: 'item',
                                    position: 'top',
                                    formatter: function(param) {
                                        if (!briefFlag) {
                                            return param.name;
                                        } else {
                                            that.RightInfo(param)
                                        }
                                    }
                                }
                            },
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
                        },
                        {
                            name: '⑨',
                            type: 'scatter',
                            data: ninelist,
                            markPoint: { // markLine 也是同理
                                data: ninePointlist,
                                tooltip: {
                                    trigger: 'item',
                                    position: 'top',
                                    formatter: function(param) {
                                        if (!briefFlag) {
                                            return param.name;
                                        } else {
                                            that.RightInfo(param)
                                        }
                                    }
                                }
                            },
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
                        },
                    ]
                })

            },
            RightInfo(obj, type) {
                // debugger
                var that = this;
                this.$nextTick(() => {
                    setTimeout(() => {
                        that.showRightInfo = true
                        that.titleRight = '九宫格明细'
                        that.vancellList = []
                        let xiangxian = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨']
                        Object.keys(that.JGGinfoRes).forEach((key) => {
                            if (Array.isArray(that.JGGinfoRes[key])) {
                                if (key == 'all') {
                                    that.vancellList.unshift({
                                        title: '全部',
                                        value: that.JGGinfoRes[key].length,
                                        direction: "",
                                        jobList: that.JGGinfoRes[key],
                                    }, )
                                } else if (that.JGGinfoRes[key].length != 0) {
                                    that.vancellList.push({
                                        title: that.JGGinfoRes[key][0].jgg,
                                        value: that.JGGinfoRes[key].length,
                                        direction: "",
                                        jobList: that.JGGinfoRes[key],
                                    }, )
                                }
                            }
                        })
                        if (Number(that.vancellList.length) & 1 == 0) {

                        } else {
                            that.vancellList.push({
                                show: 1
                            })
                        }
                        that.vancellList = that.spArray(2, that.vancellList)
                        that.vancellList[0][0].direction = 'down'
                        that.rightInfoData = that.vancellList[0][0].jobList
                        that.isLoading = false
                    }, 60)
                })
            },
            // 分割数组，两个一组
            spArray(n, arr) {
                var result = [];
                for (var i = 0; i < arr.length; i += n) {
                    result.push(arr.slice(i, i + n));
                }
                return result
            },
            vancellListTouch(obj) {
                this.isLoading = true
                for (let item of this.vancellList) {
                    for (let i in item) {
                        if (item[i].title == obj.title) {
                            item[i].direction = "down"
                        } else {
                            item[i].direction = ""
                        }
                    }
                }
                this.rightInfoData = obj.jobList
                setTimeout(() => {
                    this.isLoading = false
                }, 500);
            },
            //九宫格年份改变事件
            JGGyearChange(item) {
                this.findCadreJGGinfoData.year = item
                this.queryfindCadreJGGinfo()
            },
            //九宫格职位改变事件
            confirmJGG(item) {
                this.findCadreJGGinfoData.type = item
                this.queryfindCadreJGGinfo()
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

    .titleRightInfo {
        font-size: 18px;
        font-weight: 700;
        margin-top: 20px;
        color: red;
    }
</style>
