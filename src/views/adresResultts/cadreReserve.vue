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
                            干部储备准备度
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
        </div>
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
                <selctYearcurrent @yearChangeItem='yearChange'></selctYearcurrent>

            </div>
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
        findCadreChartInfo
    } from "@/views/adresResultts/adresResults.js";
    import selctYearcurrent from "@/components/adresResultstab/selctYearcurrent.vue";

    //例如：import 《组件名称》 from '《组件路径》';findCadreReportReserveInfo
    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {
            adresResultsTanbber,
            chooseDepartment,
            adresNavbar,
            selctYearcurrent
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
                findCadreChartInfoUeryData:{
                  deptList:[],
                  year:"",
                  isDown:'Y'
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
                // this.queryfindPayrollDept();
                this.readySelectDept = [JSON.parse(localStorage.getItem("adresResultDept")).deptId];
                this.queryfindCadreReportReserveInfo()
                this.queryfindCadreChartInfo()
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
                    if (list[i].cbl != null) {
                        cblList.push(list[i].cbl.split('%')[0])
                    }
                    oneYearList.push(list[i].oneYear)
                    threeYearList.push(list[i].threeYear)
                    twoYearList.push(list[i].twoYear)
                }
                myChart.setOption({
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
                                formatter: "{value}",
                            },
                        },
                        {
                            type: "value",
                            // name: "百分比",
                            min: 0,
                            max: 120,
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
                                            color: "cyan",
                                            fontSize: 16,
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
                                            color: "cyan",
                                            fontSize: 16,
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
                                            color: "cyan",
                                            fontSize: 16,
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
                                            color: "cyan",
                                            fontSize: 16,
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
            queryfindCadreChartInfo(){
              this.findCadreChartInfoUeryData.deptList = this.readySelectDept
              findCadreChartInfo(this.findCadreChartInfoUeryData).then(res =>{
                debugger
              })
            },
            yearChange(){
              this.findCadreChartInfoUeryData.year = item
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
