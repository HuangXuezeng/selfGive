<!--  -->
<template>
    <div class=''>
        <adresNavbar></adresNavbar>
        <adresResultsTanbber ref="adresResultsTanbber" />
        <div>
            <van-row type="flex" justify="left" style="margin-bottom: 10px">
                <van-col>
                    <div class="titleRewards">
                        <span class="honghe"></span>
                        职业路径
                    </div>
                </van-col>
            </van-row>
            <van-search v-model="findCadreGrowInfoBySearchData.jobnumber" placeholder="请输入工号或姓名" show-action :clearable="true" @search="onSearch(1)" background="Chocolate" shape="round" @clear='clearMeth'>
                <template #action>
                    <span class="searchSty" @click="screen">
                        <van-icon name="filter-o" />
                        <span style="font-size:12px;">筛选</span>
                    </span>
                </template>
            </van-search>
            <transition name="van-slide-right">
                <div class="simpleSeach" v-show="refreshListFlag">
                    <span v-for="(item,index) in searchJobList" :key="index">
                        <span :class="item.check" @click='checkSearchJob(item)'>{{item.name}}</span>
                    </span>
                </div>
            </transition>
        </div>
        <div>
            <div ref="findCadreJGGinfoEchart" :style="{ width: '98%', height: '650px' }"></div>
        </div>
        <van-popup v-model="filtrateFlag" position="right" :style="{ height: '100%', width: '80%' }" :get-container="'body'" :closeable='true'>
            <div style="background-color: Chocolate;">
                <van-row type="flex" justify="center" style="margin-bottom:10px">
                    <van-col>
                        <div class="titleRewardSalary">
                            筛选条件
                        </div>
                    </van-col>
                </van-row>
            </div>
            <div>
                <chooseDepartment @confirmNode="selctdept" :Farequired="true" labelTitle="部门:" :workingNum="true" :isSelctall="true" :faDeptData="deptData" ref="scareerPathDep" :openKeyList='findCadreGrowInfoBySearchData.deptList' :isCareerPath='true'></chooseDepartment>
                <span class="cadreLine"></span>
                <van-field v-model="findCadreGrowInfoBySearchData.jobnumber" @keyup.enter="onSearch" label="姓名/工号:" placeholder="请输入用户名或工号" />
                <van-row type="flex" justify="space-around" style="margin-top:20px">
                    <van-col span="8">
                        <van-button type="primary" round size="small" style="width:15vh" @click="restSearch">重置</van-button>
                    </van-col>
                    <van-col span="8">
                        <van-button type="danger" round size="small" style="width:15vh" @click="onSearch">确定</van-button>
                    </van-col>
                </van-row>
            </div>
            <div>
                <transition name="van-slide-right">
                    <van-grid :column-num="2" :gutter="10" v-show="refreshListFlag">
                        <van-grid-item :class="item.checkRich" v-for="(item,index) in searchJobList" :key="index" @click="checkRichClick(item)">
                            <template #icon>
                                <div>{{item.name}}</div>
                            </template>
                            <template #text>
                                <div class="lineEllipsis">{{item.deptName}}</div>
                            </template>
                        </van-grid-item>
                    </van-grid>
                </transition>
            </div>
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
        Grid,
        GridItem
    } from "vant";
    import {
        findCadreGrowInfo,
        findThisDeptWorkerInfo,
        findCadreGrowInfoBySearch
    } from "@/views/adresResultts/adresResults.js";
    import {
        findPayrollDept,
    } from "@/views/PayLibrary/PayLibrary.js";
    import adresResultsTanbber from "@/components/adresResultstab/adresResultstab.vue";
    import adresNavbar from "@/components/adresResultstab/adresResultsNavbar.vue";
    import chooseDepartment from "@/components/chooseDepartment.vue";
    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {
            adresResultsTanbber,
            adresNavbar,
            findThisDeptWorkerInfo,
            chooseDepartment
        },
        data() {
            //这里存放数据
            return {
                findCadreGrowInfoData: {
                    deptList: [],
                    jobnumber: '',
                    bzType:'Y'

                },
                readySelectDept: [],
                findThisDeptWorkerInfoData: {
                    deptList: [],
                    a0188: '',
                    bzType:'Y'

                },
                findCadreGrowInfoBySearchData: {
                    jobnumber: '',
                    deptList: [],
                    isDown: 'Y',
                    jobnumber1: '',
                    bzType:'Y'

                },
                deptJobnum: [],
                choseName: '',
                joba0188obj: '',
                firstIn: 0,
                seachFlag: false,
                searchJobList: [],
                refreshListFlag: false,
                refreshSearch: 1,
                filtrateFlag: false,
                deptData: [],
                readySelectObj: {},
                bzType: ''
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
                this.readySelectObj = JSON.parse(localStorage.getItem("adresResultDept"))
                this.bzType = localStorage.getItem("bzType")
                this.findCadreGrowInfoData.bzType = this.bzType
                this.findThisDeptWorkerInfoData.bzType = this.bzType
                this.findCadreGrowInfoBySearchData.bzType = this.bzType
                // 职业路径数据
                this.queryfindCadreGrowInfo()
                // 查询部门右边弹窗部门信息
                this.queryfindPayrollDept()
                // 首次查询部门信息赋值
                this.findCadreGrowInfoBySearchData.deptList = this.readySelectDept
            },
            // 职业路径数据
            queryfindCadreGrowInfo() {
                this.findCadreGrowInfoData.deptList = this.readySelectDept
                findCadreGrowInfo(this.findCadreGrowInfoData).then(res => {
                    if (res.code == "1000") {
                        this.joba0188obj = res.obj[0]
                        if (this.refreshSearch) {
                            if (this.findCadreGrowInfoBySearchData.jobnumber == '') {
                                this.findCadreGrowInfoBySearchData.jobnumber1 = this.joba0188obj.a0188
                                this.queryfindCadreGrowInfoBySearch()
                            } else {
                                this.findCadreGrowInfoBySearchData.jobnumber1 = ''
                            }
                        }
                        this.initfindCadreGrowInfoEchart(res.obj)
                    } else {
                        Toast.fail(res.msg);
                    }
                })
            },
            // 职业路径echarts渲染
            initfindCadreGrowInfoEchart(list) {
                var myChart = this.$echarts.init(this.$refs.findCadreJGGinfoEchart);
                let timeList = []
                let normallist = []
                let promotionList = []
                let demotionList = []
                let departureList = []
                let level = 1
                for (let i in list) {
                    timeList.push(list[i].time + '(' + list[i].type + ')')
                    if (list[i].type == '入职' || list[i].type == "调转" || list[i].type == '调动' || list[i].type == '平调' || list[i].type == "转正" || list[i].type == "组织调整") {

                        normallist.push(level)
                        promotionList.push('')
                        demotionList.push('')
                        departureList.push('')
                    } else if (list[i].type == '晋升' || list[i].type == '管理任命') {
                        promotionList.splice(promotionList.length - 1, 1)
                        promotionList.push(level)
                        level++
                        normallist.push('')
                        promotionList.push(level)
                        demotionList.push('')
                        departureList.push('')
                        normallist.splice(normallist.length - 1, 1)
                        normallist.push(level)
                    } else if (list[i].type == '降职' || list[i].type == '降级') {
                        demotionList.splice(demotionList.length - 1, 1)
                        demotionList.push(level)
                        level--
                        if (level == 0) {
                            normallist = JSON.parse(JSON.stringify(normallist).replace(/1/g, 2))
                            promotionList = JSON.parse(JSON.stringify(promotionList).replace(/1/g, 2))
                            demotionList = JSON.parse(JSON.stringify(demotionList).replace(/1/g, 2))
                            departureList = JSON.parse(JSON.stringify(departureList).replace(/1/g, 2))
                            level = 1
                        }
                        normallist.push(level)
                        promotionList.push('')
                        demotionList.push(level)
                        departureList.push('')
                    } else if (list[i].type == '离职' || list[i].type == '离职重聘') {
                        normallist.push(level)
                        promotionList.push('')
                        demotionList.push('')
                        departureList.push(level)
                    } else {
                        normallist.push(level)
                        promotionList.push('')
                        demotionList.push('')
                        departureList.push('')
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
                        // extraCssText: 'transform: rotate(90deg)',
                        formatter: function(params, ticket) {
                            //
                            var str = ''
                            for (let item of list) {
                                if (item.time + '(' + item.type + ')' == params[0].name) {
                                    str = `姓名：${item.name}</br>日期：${item.time}</br>变动：${item.type}</br>部门：${item.deptName ?item.deptName:''}</br>职级：${item.zj ?item.zj:''}`
                                }
                            }
                            return str
                            // if(params[0].name){

                            // }
                        }
                    },
                    dataZoom: {
                        show: true,
                        // realtime: true,
                        // start: 30,
                        // end: 70,
                        yAxisIndex: 0,
                        // type: 'inside'
                    },
                    color: ['#00BFFF', '#32CD32', '#FFA500', '#A52A2A'],
                    legend: {
                        data: ['入职，调动，岗位变化', '晋升，管理任命', '降职', '离职']
                    },
                    toolbox: {
                        show: false
                        // feature: {
                        //     saveAsImage: {}
                        // }
                    },
                    grid: {
                        left: '3%',
                        right: '6%',
                        containLabel: true
                    },
                    xAxis: [{
                        show: false,
                        type: 'value',
                        position: 'top', //x 轴的位置【top bottom】
                        nameRotate: -90, //坐标轴名字旋转，角度值。
                        axisLabel: { //坐标轴刻度标签的相关设置。
                            rotate: 90 //刻度标签旋转的角度，
                        },
                        // scale: true, //是否是脱离 0 值比例
                        min: 0,
                        max: 10,
                        splitLine: {
                            show: false
                        },
                    }],
                    yAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        data: timeList,
                        inverse: 'true', //是否是反向坐标轴。
                        axisLabel: {
                            // rotate: -90

                        },
                    }],
                    series: [{
                            name: '入职，调动，岗位变化',
                            type: 'line',
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        color: '#00BFFF'
                                    },
                                }
                            },
                            areaStyle: {
                                color: 'rgba(135,206,250,0.5)'
                            },
                            data: normallist
                        },
                        {
                            name: '晋升，管理任命',
                            type: 'line',
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        color: '#32CD32'
                                    }
                                }
                            },
                            areaStyle: {
                                color: 'rgba(60,179,113,0.5)'
                            },
                            data: promotionList
                        },
                        {
                            name: '降职',
                            type: 'line',
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        color: '#FFA500'
                                    }
                                }
                            },
                            areaStyle: {
                                color: 'rgba(255,165,0,0.5)'
                            },
                            data: demotionList
                        },
                        {
                            name: '离职',
                            type: 'line',
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        color: '#A52A2A'
                                    }
                                }
                            },
                            areaStyle: {
                                color: 'rgba(240,128,128,0.5)'

                            },
                            data: departureList
                        },
                        // {
                        //     name: '搜索引擎',
                        //     type: 'line',

                        //     label: {
                        //         normal: {
                        //             show: true,
                        //             position: 'top'
                        //         }
                        //     },
                        //     areaStyle: {},
                        //     data: [820, 932, 901, 934, 1290, 1330, 1320]
                        // }
                    ]
                })
            },
            // 右边弹窗确认按钮事件
            onSearch(val) {
                this.queryfindCadreGrowInfoBySearch()
            },
            // 输入框清除事件
            clearMeth() {
                this.queryfindCadreGrowInfoBySearch()
            },
            // 查询数据
            queryfindCadreGrowInfoBySearch(type) {
                this.refreshListFlag = false
                findCadreGrowInfoBySearch(this.findCadreGrowInfoBySearchData).then(res => {
                    if (res.code == "1000") {
                        this.searchJobList = res.obj
                        for (let item of this.searchJobList) {
                            if (item.name == this.joba0188obj.name) {
                                item.check = 'check-simple-item'
                                item.checkRich = 'resetVantGridAct'
                            } else {
                                item.check = 'simple-item'
                                item.checkRich = 'resetVantGrid'
                            }
                        }
                        this.refreshListFlag = true
                    } else {
                        Toast.fail(res.msg);
                    }
                    //
                })
            },
            // 横条点击人员格点击事件
            checkSearchJob(obj) {
                this.refreshListFlag = false
                for (let item of this.searchJobList) {
                    if (item.name == obj.name) {
                        item.checkRich = 'resetVantGridAct'
                        item.check = 'check-simple-item'
                    } else {
                        item.checkRich = 'resetVantGrid'
                        item.check = 'simple-item'
                    }
                }
                this.$nextTick(() => {
                    this.refreshListFlag = true
                    this.refreshSearch = 0
                    this.findCadreGrowInfoData.jobnumber = obj.jobnumber
                    this.queryfindCadreGrowInfo()
                })
                //
            },
            // 点击筛选弹出事件
            screen() {
                this.filtrateFlag = true
            },
            // 查询部门右边弹窗部门信息
            queryfindPayrollDept() {
                const SalaryDeptRes = JSON.parse(localStorage.getItem("SalaryDeptRes"));
                this.deptData = SalaryDeptRes.obj.depts;
            },
            //选择部门回调函数
            selctdept(data, isDown, deptOne) {
                this.findCadreGrowInfoBySearchData.deptList = data
                this.queryfindCadreGrowInfoBySearch(1)
            },
            // 右边弹窗点击人员格点击事件
            checkRichClick(obj) {
                for (let item of this.searchJobList) {
                    if (item.name == obj.name) {
                        item.checkRich = 'resetVantGridAct'
                        item.check = 'check-simple-item'
                    } else {
                        item.checkRich = 'resetVantGrid'
                        item.check = 'simple-item'
                    }
                }
                this.$nextTick(() => {
                    this.refreshListFlag = true
                    this.refreshSearch = 0
                    this.findCadreGrowInfoData.jobnumber = obj.jobnumber
                    this.queryfindCadreGrowInfo()
                    this.filtrateFlag = false
                    // location.href = "#"+obj.jobnumber
                })
            },
            // 右边弹窗重置按钮事件
            restSearch() {
                this.findCadreGrowInfoBySearchData.deptList = this.readySelectDept
                this.findCadreGrowInfoBySearchData.jobnumber = ''
                this.$refs.scareerPathDep.restCareerPathName(this.readySelectObj.text)
                this.onSearch()
            }
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {
            this.init()
        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            this.$refs.adresResultsTanbber.changtab("careerPath");
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

    .searchSty {
        color: FloralWhite;
        display: inline-block;
        font-size: 15px;
        border: 1px solid #fff;
        padding: 2px;
        line-height: 12px;
        border-radius: 6px;
    }

    .simpleSeach {
        height 35px;
        max-width: 100%;
        overflow-x: auto;
        /*x轴超出后可滚动*/
        white-space: nowrap;
        /*实现子元素不换行*/
        overflow-y: hidden;
        line-height: 26px;
        border: 1px solid #ccc;
    }

    .simple-item {
        font-size: 13px;
        padding: 2px 13px;
        color: #fff;
        background-color: #FF8C00;
        margin: 0 6px;
        border-radius: 6px;
    }

    .check-simple-item {
        font-size: 13px;
        padding: 2px 13px;
        color: #fff;
        background-color: #00BFFF;
        margin: 0 6px;
        border-radius: 6px;
    }

    .titleRewardSalary {
        font-size: 18px;
        font-weight: 700;
        padding: 20px;
        color: #fff;
    }

    .lineEllipsis {
        padding-top: 3px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        font-size: 12px;
    }

    .cadreLine {
        width: 100%;
        border-bottom: 0.5px solid #ebedf0;
        display: inline-block;
    }
</style>
