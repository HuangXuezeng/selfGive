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
            <van-dropdown-menu>
                <van-dropdown-item v-model="choseName" :options="deptJobnum" @change="confirmJobnum" />
            </van-dropdown-menu>
        </div>
        <div>
            <div ref="findCadreJGGinfoEchart" :style="{ width: '98%', height: '650px' }"></div>
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
    import {
        findCadreGrowInfo,
        findThisDeptWorkerInfo
    } from "@/views/adresResultts/adresResults.js";
    import adresResultsTanbber from "@/components/adresResultstab/adresResultstab.vue";
    import adresNavbar from "@/components/adresResultstab/adresResultsNavbar.vue";
    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {
            adresResultsTanbber,
            adresNavbar,
            findThisDeptWorkerInfo
        },
        data() {
            //这里存放数据
            return {
                findCadreGrowInfoData: {
                    deptList: [],
                    jobnumber: ''

                },
                readySelectDept: [],
                findThisDeptWorkerInfoData: {
                    deptList: [],
                    a0188: ''
                },
                deptJobnum: [],
                choseName: '',
                joba0188obj: '',
                firstIn:0
            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            async init() {
                this.readySelectDept = [JSON.parse(localStorage.getItem("adresResultDept")).deptId];
                this.queryfindCadreGrowInfo()

            },
            queryfindCadreGrowInfo() {
                this.findCadreGrowInfoData.deptList = this.readySelectDept
                findCadreGrowInfo(this.findCadreGrowInfoData).then(res => {
                    if (res.code == "1000") {
                        this.joba0188obj = res.obj[0]
                        if(!this.firstIn){
                          this.queryfindThisDeptWorkerInfo()
                          this.firstIn++
                        }
                        this.initfindCadreGrowInfoEchart(res.obj)
                    } else {
                        Toast.fail(res.msg);
                    }
                })
            },
            queryfindThisDeptWorkerInfo() {
                this.findThisDeptWorkerInfoData.deptList = this.readySelectDept
                this.findThisDeptWorkerInfoData.a0188 = this.joba0188obj.a0188
                findThisDeptWorkerInfo(this.findThisDeptWorkerInfoData).then(res => {
                    this.deptJobnum = JSON.parse(JSON.stringify(res.obj).replace(/jobnumber/g, 'value'))
                    this.deptJobnum = JSON.parse(JSON.stringify(this.deptJobnum).replace(/name/g, 'text'))
                    for (let i in this.deptJobnum) {
                        if (this.deptJobnum[i].text == this.joba0188obj.name) {
                            this.choseName = this.deptJobnum[i].value
                            break
                        }
                    }
                    console.log(this.deptJobnum)
                })
            },
            confirmJobnum(value) {
                this.findCadreGrowInfoData.jobnumber = value
                this.queryfindCadreGrowInfo()
            },
            initfindCadreGrowInfoEchart(list) {
                var myChart = this.$echarts.init(this.$refs.findCadreJGGinfoEchart);
                let timeList = []
                let normallist = []
                let promotionList = []
                let demotionList = []
                let departureList = []
                let level = 1
                for (let i in list) {
                    timeList.push(list[i].time+'('+list[i].type+')')
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
                          // debugger
                            var str = ''
                            for (let item of list) {
                                if (item.time+'('+item.type+')' == params[0].name) {
                                    str = `${item.name}</br>${item.time}</br>${item.type}</br>${item.zj ?item.zj:''}`
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
</style>
