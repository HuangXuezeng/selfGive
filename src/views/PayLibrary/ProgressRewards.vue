<template>
    <div style="padding-bottom: 10%;">
        <payTab ref="payTab"></payTab>
        <div>
            <div class="shodowRewards">
                <van-row type="flex" justify="left" style="margin-bottom:10px">
                    <van-col>
                        <div class="titleRewards">
                            <span class="honghe"></span>
                            整体进度
                        </div>
                    </van-col>
                </van-row>
                <van-dropdown-menu class="resetVantfixed resetVantArewards">
                    <van-dropdown-item v-model="years" :options="yearList" />
                </van-dropdown-menu>
                <van-row type="flex">
                    <van-col span="24">
                        <div class="resetVantArewards">
                            <van-field readonly clickable label="部门/组织:" label-class="labelStyle" v-model="selectedOrg" placeholder="请选择部门/组织" @click="showPicker1 = true" />
                        </div>

                        <van-popup v-model="showPicker1" round position="bottom">
                            <van-picker show-toolbar :columns="columns" @cancel="showPicker1 = false" @confirm="(value, index) => {onConfirm(value, index, '1');}" />
                        </van-popup>
                    </van-col>
                </van-row>
            </div>
            <div style="width:100%;height:600px">
                <div ref="ppt" :style="{ width: '100%', height: '600px' }"></div>
            </div>
        </div>
        <div>
            <div class="shodowRewards">
                <van-row type="flex" justify="left" style="margin-bottom:10px">
                    <van-col>
                        <div class="titleRewards">
                            <span class="honghe"></span>
                            奖励项目发放进度
                        </div>
                    </van-col>
                </van-row>
                <van-dropdown-menu class="resetVantfixed resetVantArewards">
                    <van-dropdown-item v-model="years" :options="yearList" />
                </van-dropdown-menu>
                <van-row type="flex">
                    <van-col span="24">
                        <div class="resetVantArewards">
                            <van-field readonly clickable label="部门/组织:" label-class="labelStyle" v-model="selectRewardName" placeholder="请选择部门/组织" @click="showPicker2 = true" />
                        </div>
                        <van-popup v-model="showPicker2" round position="bottom">
                            <van-picker show-toolbar :columns="columns" @cancel="showPicker2 = false" @confirm="(value, index) => {onConfirm(value, index, '2');}" />
                        </van-popup>
                    </van-col>
                </van-row>
                <van-row type="flex">
                    <van-col span="24">
                        <div class="resetVantArewards">
                            <van-field readonly clickable label="奖励类型:" label-class="labelStyle" v-model="RewardTypeName" placeholder="请选择奖励类型" @click="showPicker = true" />
                        </div>
                        <van-popup v-model="showPicker" round position="bottom">
                            <van-picker show-toolbar :columns="DetailsList" @cancel="showPicker = false" @confirm="RewardTypeConfirm" />
                        </van-popup>
                    </van-col>
                </van-row>
            </div>

            <div style="width:100%" v-if="!showNodata">
                <div ref="pptv" :style="{ width: '100%', height: calcHight }"></div>
            </div>
            <noData :showNodata="showNodata"></noData>
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
        Row
    } from "vant";
    import payTab from "@/components/PayLibrary/pay-tab.vue";
    import noData from "@/components/noData.vue";
    import {
        findRewardInfo,
        findRewardDetailsInfo
    } from "@/views/PayLibrary/PayLibrary.js";
    export default {
        components: {
            payTab,
            noData
        },
        data() {
            return {
                selectedOrg: "",
                columns: [],
                yearList: [],
                years: "",
                showPicker1: false,
                showPicker2: false,
                //第二张表
                showPicker: false,
                RewardTypeName: "",
                DetailsRes: {},
                DetailsList: [],
                selectRewardName: "",
                calcHight: "400px",
                showNodata: false,
                ddJobNum: localStorage.getItem("jobNum"),
                updateRewardData: {}
            };
        },
        created() {
            this.queryfindRewardInfo();
        },
        mounted() {
            this.$refs.payTab.changtab('ProgressRewards')
        },
        methods: {
            onConfirm(value, index, type) {
                // debugger
                let queryobj = {};
                this.showPicker1 = false;
                this.showPicker2 = false;
                if (value[2] && value[2] != '无') {
                    queryobj.downDeptName = value[2];
                    queryobj.deptId = this.columns[index[0]].children[index[1]].children[index[2]].deptId
                    queryobj.grade = this.columns[index[0]].children[index[1]].children[index[2]].grade
                } else if (value[1] && value[1] != '无') {
                    queryobj.downDeptName = value[1];
                    queryobj.deptId = this.columns[index[0]].children[index[1]].deptId
                    queryobj.grade = this.columns[index[0]].children[index[1]].grade
                } else if (value[0] && value[0] != '无') {
                    queryobj.downDeptName = value[0];
                    queryobj.deptId = this.columns[index[0]].deptId
                    queryobj.grade = this.columns[index[0]].grade
                }
                queryobj.time = "2020";
                queryobj.flag = "2";
                if (type == 1) {
                    //更新第一张表
                    this.updateRewardInfo(queryobj);
                    this.selectedOrg = queryobj.downDeptName;
                } else {
                    //更新第二张表
                    this.RewardTypeName = "";
                    this.selectRewardName = queryobj.downDeptName;
                    if (this.selectRewardName == "股份整体") {
                        if (this.showNodata) {
                            Toast.fail("暂无数据");
                            return
                        } else {
                            var myCharts = this.$echarts.init(this.$refs.pptv);
                            myCharts.clear();
                            this.showNodata = true;
                            Toast.fail("暂无数据");
                            return;
                        }

                    }
                    this.showNodata = false;
                    let DetailsInfoQuery = this.findDetail(queryobj.downDeptName)
                    DetailsInfoQuery.detailsName = this.deleteAllStr(DetailsInfoQuery.detailsName)
                    this.updateFindRewardDetailsInfo(DetailsInfoQuery);
                    this.RewardTypeName = "";
                }
            },
            deleteAllStr(list) {
                let DetailsListSet = new Set(list)
                DetailsListSet.delete('全部')
                return Array.from(DetailsListSet);
            },
            RewardTypeConfirm(value) {
                if (!value) {
                    Toast.fail("暂无数据");
                    this.showPicker = false;
                    return;
                }
                if (value == '全部') {
                    this.updateRewardData.detailsName = this.deleteAllStr(this.DetailsList)
                } else {
                    this.updateRewardData.detailsName = [value];
                }
                this.updateFindRewardDetailsInfo(this.updateRewardData);
                this.RewardTypeName = value;
                this.showPicker = false;
            },
            updateRewardInfo(queryobj) {
                findRewardInfo(queryobj).then(res => {
                    if (res.code == 1000) {
                        if (res.obj.title != null) {
                            this.selectedOrg = res.obj.title;
                        }
                        this.echatsMethod(res);
                    } else {
                        Toast.fail(res.msg);
                    }
                });
            },
            updateFindRewardDetailsInfo(queryobj) {
                findRewardDetailsInfo(queryobj).then(res => {
                    if (res.code == 1000) {
                        if (res.obj.title != "股份整体") {
                            this.RewardsInfo(res);
                            this.showNodata = false;
                        } else {
                            this.showNodata = true;
                        }
                    } else {
                        Toast.fail(res.msg);
                    }
                });
            },
            //查找选择的部门
            findDetail(deptname) {
                var queryData = {};
                let deptsList = this.DetailsRes.obj.depts;
                for (let i in deptsList) {
                    if (
                        deptsList[i].downDept != null &&
                        deptsList[i].downDept.length != 0
                    ) {
                        for (let k in deptsList[i].downDept) {
                            if (deptsList[i].downDept[k].downDeptName == deptname) {
                                queryData.detailsName = deptsList[i].downDept[k].detais;
                                queryData.grade = deptsList[i].downDept[k].grade;
                                queryData.deptId = deptsList[i].downDept[k].deptId;
                                this.DetailsList = deptsList[i].downDept[k].detais;
                                this.DetailsList.unshift('全部')
                                break;
                            }
                        }
                    } else {
                        if (deptsList[i].deptName == deptname) {
                            queryData.detailsName = deptsList[i].detais;
                            queryData.grade = deptsList[i].grade;
                            queryData.deptId = deptsList[i].deptId;
                            this.DetailsList = deptsList[i].detais;
                            this.DetailsList.unshift('全部')
                            break;
                        }
                    }
                }
                queryData.downDeptName = deptname;
                queryData.flag = "2";
                queryData.time = "2020";
                this.updateRewardData = queryData
                return queryData;
            },
            queryfindRewardDetailsInfo(queryobj) {
                findRewardDetailsInfo({
                    jobnumber: this.ddJobNum,
                    flag: "1"
                }).then(res => {
                    if (res.code == 1000) {
                        //
                        if (res.obj.title != "股份整体") {
                            this.RewardsInfo(res);
                            this.showNodata = false;
                        } else {
                            this.showNodata = true;
                        }
                        this.DetailsRes = res;
                        this.selectRewardName = res.obj.title;
                        this.findDetail(res.obj.title);
                        this.RewardTypeName = '全部'
                    } else {
                        Toast.fail(res.msg);
                    }
                });
            },
            queryfindRewardInfo(queryobj) {
                let queryData = {};
                queryData = {
                    jobnumber: this.ddJobNum,
                    flag: "1"
                };
                findRewardInfo(queryData).then(res => {
                    if (res.code == 1000) {
                        this.setcolumns(res);
                        this.setyearlist(res.obj.year);
                        if (res.obj.title != null) {
                            this.selectedOrg = res.obj.title;
                        }
                        this.echatsMethod(res);
                    } else {
                        Toast.fail(res.msg);
                    }
                });
                this.queryfindRewardDetailsInfo(queryData);
            },
            setyearlist(arr) {
                for (let p in arr) {
                    let obj = {
                        text: arr[p] + "年",
                        value: arr[p]
                    };
                    this.yearList.push(obj);
                }
                this.years = this.yearList[0].value;
            },
            //设置三列或两列选项
            setcolumns(res) {
                if (res.obj.title == "股份整体") {
                    // 三列设置
                    let Twosetdepts = this.setdepts(res)
                    let all = [{
                        text: "股份整体",
                        children: Twosetdepts,
                        grade: '',
                        deptId: '1'
                    }]
                    all[0].children.unshift({
                        text: '无',
                        children: [{
                            text: '无'
                        }]
                    })
                    this.columns = all
                } else {
                    //两列设置
                    this.columns = this.setdepts(res)
                }
            },
            //设置三列或两列选项
            setdepts(res) {
                // let
                let depts = res.obj.depts;
                for (let item of depts) {
                    item.text = item.deptName
                    if (item.downDept != null) {
                        for (let i in item.downDept) {
                            item.downDept[i].text = item.downDept[i].downDeptName
                        }
                        item.downDept.unshift({
                            text: '无'
                        })
                        item.children = item.downDept
                    } else {
                        item.children = [{
                            text: '无'
                        }]
                    }
                }
                return depts
            },
            echatsMethod(res) {
                // debugger
                var myChart = this.$echarts.init(this.$refs.ppt);
                let data = res.obj.send;
                let mouth = [];
                let mouthTotal = [];
                if (res.obj.send == null) {
                    for (let p = 0; p <= 12; p++) {
                        mouth.push(0);
                    }
                    for (let p = 0; p <= 12; p++) {
                        mouthTotal.push(0);
                    }
                } else {
                    mouth = [
                        -data.one,
                        -data.two,
                        -data.three,
                        -data.four,
                        -data.five,
                        -data.six,
                        -data.seven,
                        -data.eight,
                        -data.nine,
                        -data.ten,
                        -data.eleven,
                        -data.twelve
                    ];
                    mouthTotal = [
                        data.oneTotal,
                        data.twoTotal,
                        data.threeTotal,
                        data.fourTotal,
                        data.fiveTotal,
                        data.sixTotal,
                        data.sevenTotal,
                        data.eigthTotal,
                        data.nineTotal,
                        data.tenTotal,
                        data.elevenTotal,
                        data.twelveTotal
                    ];
                }

                function isInteger(obj) {
                    return obj % 1 === 0;
                }
                myChart.setOption({
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            // 坐标轴指示器，坐标轴触发有效
                            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ["累计发放", "当月发放", "年初预算"]
                    },
                    grid: {
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: true
                    },
                    xAxis: [{
                        type: "value",
                        max: function(value) {
                            return Number(res.obj.budget) * 1.2;
                        },
                        axisLabel: {
                            show: true,
                            formatter: function(value, index) {
                                let text = "";
                                if (Math.abs(value) >= 10000000) {
                                    let divisionNum = value / 10000000;
                                    if (!isInteger(divisionNum)) {
                                        return (text = divisionNum.toFixed(2) + "千万");
                                    } else {
                                        return (text = divisionNum + "千万");
                                    }
                                } else if (Math.abs(value) > 10000) {
                                    let divisionNum = value / 10000;
                                    if (!isInteger(divisionNum)) {
                                        return (text = divisionNum.toFixed(2) + "万");
                                    } else {
                                        return (text = divisionNum + "万");
                                    }
                                } else {
                                    return value;
                                }
                            }
                        }
                    }],
                    yAxis: [{
                        type: "category",
                        axisTick: {
                            show: false
                        },
                        data: [
                            "1月",
                            "2月",
                            "3月",
                            "4月",
                            "5月",
                            "6月",
                            "7月",
                            "8月",
                            "9月",
                            "10月",
                            "11月",
                            "12月"
                        ]
                    }],
                    series: [{
                            name: "累计发放",
                            type: "bar",
                            stack: "总量",
                            // label: {
                            //   show: true,
                            //   position: "right"
                            // },
                            data: mouthTotal,
                            markLine: {
                                data: [{
                                    name: '年初预算',
                                    xAxis: res.obj.budget
                                }, ],
                                label: {
                                    show: true,
                                    position: 'end',
                                    formatter: '{b}:\n{c}'
                                },
                                silent: true,
                                animation: true,

                            }
                            // barMaxWidth:60
                        },
                        {
                            name: "当月发放",
                            type: "bar",
                            stack: "总量",
                            // label: {
                            //   show: true,
                            //   position: "left"
                            // },
                            data: mouth,
                            barMinHeight: 1
                        }
                    ]
                });
            },

            RewardsInfo(res) {
                var myCharts = this.$echarts.init(this.$refs.pptv);
                let chartData = res.obj.allDetais;
                let yAxisData = [];
                let grantData = [];
                let surplusData = [];
                for (let k in chartData) {
                    yAxisData.push(chartData[k].name);
                    grantData.push(chartData[k].grant);
                    surplusData.push(chartData[k].surplus);
                }
                let labelFlag = "";
                if (yAxisData.length >= 2) {
                    labelFlag = false;
                } else {
                    labelFlag = true;
                }
                if (Number(yAxisData.length) >= 6) {
                    let calcNum = (yAxisData.length - 6) * 20;
                    this.calcHight = 400 + calcNum + "px";
                } else {
                    this.calcHight = "400px";
                }
                myCharts.getDom().style.height = this.calcHight;
                myCharts.resize();

                function isInteger(obj) {
                    return obj % 1 === 0;
                }
                myCharts.setOption({
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            // 坐标轴指示器，坐标轴触发有效
                            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ["年初预算", "剩余可用", "已发"]
                    },
                    grid: {
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: true
                    },
                    xAxis: {
                        type: "value",
                        axisLabel: {
                            show: true,
                            formatter: function(value, index) {
                                let text = "";
                                if (Math.abs(value) >= 10000) {
                                    let divisionNum = value / 10000;
                                    if (!isInteger(divisionNum)) {
                                        return (text = divisionNum.toFixed(2) + "万");
                                    } else {
                                        return (text = divisionNum + "万");
                                    }
                                } else {
                                    return value;
                                }
                            }
                        }
                    },
                    yAxis: {
                        type: "category",
                        data: yAxisData,
                        axisLabel: {
                            show: true,
                            formatter: function(value, index) {
                                let text = "";
                                if (value.length > 6) {
                                    return value.substring(0, 6) + "..";
                                } else {
                                    return value;
                                }
                            }
                        }
                    },
                    series: [{
                            name: "已发",
                            type: "bar",
                            stack: "可用",
                            label: {
                                show: labelFlag,
                                position: "insideRight"
                            },
                            data: grantData,
                            barMaxWidth: 20
                        },
                        {
                            name: "剩余可用",
                            type: "bar",
                            stack: "可用",
                            label: {
                                show: labelFlag,
                                position: "insideRight"
                            },
                            data: surplusData,
                            barMaxWidth: 20
                        }
                    ]
                });
            }
        }
    };
</script>

<style lang="stylus">
    .honghe {
        width: 10px;
        height: 15px;
        display: inline-block;
        background-color: red;
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
</style>
