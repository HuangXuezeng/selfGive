<!--  -->
<template>
    <div class=''>
        <adresNavbar></adresNavbar>
        <adresResultsTanbber ref="adresResultsTanbber" />
        <selctYearcurrent @yearChangeItem='yearChange' :startYear='2017' :allPage='0'></selctYearcurrent>
        <div>
            <van-row type="flex" justify="left" style="margin-bottom: 10px">
                <van-col>
                    <div class="titleRewards">
                        <span class="honghe"></span>
                        团队氛围
                    </div>
                </van-col>
            </van-row>
            <div>
                <div style="width: 100%; height: 400px" v-if='!showNodatas'>
                    <div ref="teamAtmosphereEchart" :style="{ width: '100%', height: '400px' }"></div>
                </div>
            </div>
            <noData :showNodata="showNodatas"></noData>
        </div>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
    import {
        Picker,
        Toast,
        Col,
        Row,
        Popup,
        Notify,
        Overlay,
    } from "vant";
    import {
        findCadreTeamFwInfo
    } from "@/views/adresResultts/adresResults.js";
    import noData from "@/components/noData.vue";
    import adresNavbar from "@/components/adresResultstab/adresResultsNavbar.vue";
    import adresResultsTanbber from "@/components/adresResultstab/adresResultstab.vue";
    import selctYearcurrent from "@/components/adresResultstab/selctYearcurrent.vue";

    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {
            noData,
            adresNavbar,
            adresResultsTanbber,
            selctYearcurrent
        },
        data() {
            //这里存放数据
            return {
                showNodatas: false,
                readySelectDept: [],
                findCadreTeamFwInfoData: {
                    deptList: [],
                    year: '',
                    bzType:'Y'
                },
                bzType:''
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
                this.bzType = localStorage.getItem("bzType")
                this.findCadreTeamFwInfoData.bzType = this.bzType
                // 查询氛围数据
                this.queryfindCadreTeamFwInfo()
            },
            // 查询氛围数据
            queryfindCadreTeamFwInfo() {
                this.findCadreTeamFwInfoData.deptList = this.readySelectDept
                findCadreTeamFwInfo(this.findCadreTeamFwInfoData).then(res => {
                    if (res.code == "1000") {
                        this.showNodatas = false
                        this.$nextTick(() => {
                            this.initteamAtmosphereEchart(res.obj)
                        })
                    } else {
                        Toast.fail(res.msg);
                        this.showNodatas = true
                    }
                })
            },
            // 氛围数据echarts渲染
            initteamAtmosphereEchart(obj) {
                var myChart = this.$echarts.init(this.$refs.teamAtmosphereEchart);
                let chartData = []
                let changeColor = ''
                if (obj == '雷雨') {
                    let objt = {
                        value: 10,
                        name: obj
                    }
                    chartData.push(objt)
                    changeColor = "#DC143C"
                } else if (obj == '雨天') {
                    let objt = {
                        value: 30,
                        name: obj
                    }
                    chartData.push(objt)
                    changeColor = "#FF8C00"

                } else if (obj == '阴天') {
                    let objt = {
                        value: 50,
                        name: obj
                    }
                    chartData.push(objt)
                    changeColor = "#DDA0DD"

                } else if (obj == '多云') {
                    let objt = {
                        value: 70,
                        name: obj
                    }
                    chartData.push(objt)
                    changeColor = "#87CEFA"

                } else if (obj == '晴天') {
                    let objt = {
                        value: 90,
                        name: obj
                    }
                    chartData.push(objt)
                    changeColor = "#32CD32"
                }
                myChart.setOption({
                    tooltip: {
                        formatter: '{a} <br/>{b} : {c}%'
                    },

                    series: [{
                        // name: '团队氛围',
                        type: 'gauge',
                        startAngle: 200, //开始角度
                        endAngle: -20, //结束角度
                        radius: "95%", //仪表大小
                        axisLine: {
                            show: true,
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: [ //表盘颜色
                                    [0.2, "#DC143C"], //0-50%处的颜色
                                    [0.4, "#FF8C00"], //51%-70%处的颜色
                                    [0.6, "#DDA0DD"], //70%-90%处的颜色
                                    [0.8, "#87CEFA"], //90%-100%处的颜色
                                    [1, "#32CD32"] //90%-100%处的颜色

                                ],
                                width: 8 //表盘宽度
                            }
                        },
                        axisTick: { // 坐标轴小标记
                            show: false
                        },
                        axisLabel: {
                            formatter: function(v) {
                                if (v == 0) {
                                    return '';
                                } else if (v < 20) {
                                    return '雷雨';
                                } else if (v > 20 && v < 40) {
                                    return '雨天';
                                } else if (v > 40 && v < 60) {
                                    return '阴天';
                                } else if (v > 60 && v < 80) {
                                    return '多云';
                                } else if (v > 80 && v < 100) {
                                    return '晴天';
                                }
                            }
                        },
                        title: {
                            color: changeColor,
                            offsetCenter: [0, '28%'], // x, y，单位px
                            label: {
                                formatter: function(v) {
                                }
                            }

                        },
                        pointer: { //指针样式
                            //  length: '45%'
                            width: 3,
                            // color: changeColor,
                            shadowBlur: 5
                        },
                        detail: {
                            show: false
                        },
                        data: chartData
                    }]
                })

            },
            // 年份改变事件
            yearChange(item) {
                this.findCadreTeamFwInfoData.year = item
                this.queryfindCadreTeamFwInfo()
            }
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {
            this.init()
        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            this.$refs.adresResultsTanbber.changtab("teamAtmosphere");

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

    .titleclass {
        background-color: #dc7272;
        color: #ffffff;
        font-size 12px;
    }
</style>
