<template>
    <div>
        <adresNavbar></adresNavbar>
        <adresResultsTanbber ref="adresResultsTanbber" />

        <!-- <van-sticky offset-top='29.6px'>
            <div class="resetVantfixed resetVantfixcader">
                <van-dropdown-menu>
                    <van-dropdown-item v-model="selecYear" :options="yearlist" @change="yearChange" title-class="colorFFF" />
                </van-dropdown-menu>
            </div>
        </van-sticky> -->
        <selctYearcurrent @yearChangeItem='yearChange'></selctYearcurrent>
        <!-- </div> -->
        <div>
            <div>
                <van-row type="flex" justify="left" style="margin-bottom: 10px;">
                    <van-col>
                        <div class="titleRewards">
                            <span class="honghe"></span>
                            司龄分布
                        </div>
                    </van-col>
                </van-row>
                <div>
                    <div style="width: 100%; height: 300px">
                        <div ref="distribution" :style="{ width: '100%', height: '300px' }"></div>
                    </div>
                </div>
            </div>
            <div>
                <van-row type="flex" justify="left" style="margin-bottom: 10px">
                    <van-col>
                        <div class="titleRewards">
                            <span class="honghe"></span>
                            年龄分布
                        </div>
                    </van-col>
                </van-row>
                <div>
                    <div style="width: 100%; height: 300px">
                        <div ref="AgeDistribution" :style="{ width: '100%', height: '300px' }"></div>
                    </div>
                </div>
            </div>
            <div>
                <van-row type="flex" justify="left" style="margin-bottom: 10px">
                    <van-col>
                        <div class="titleRewards">
                            <span class="honghe"></span>
                            青苗干部任职分布
                        </div>
                    </van-col>
                </van-row>
                <div>
                    <div style="width: 100%; height: 300px">
                        <div ref="yongDistribution" :style="{ width: '100%', height: '300px' }"></div>
                    </div>
                </div>
            </div>
            <div>
                <van-row type="flex" justify="left" style="margin-bottom: 10px">
                    <van-col>
                        <div class="titleRewards">
                            <span class="honghe"></span>
                            学历分布
                        </div>
                    </van-col>
                </van-row>
                <div>
                    <div style="width: 100%; height: 300px">
                        <div ref="educationDistribution" :style="{ width: '100%', height: '300px' }"></div>
                    </div>
                </div>
            </div>
            <!-- <div>
                <van-row type="flex" justify="left" style="margin-bottom: 10px">
                    <van-col>
                        <div class="titleRewards">
                            <span class="honghe"></span>
                            职级分布
                        </div>
                    </van-col>
                </van-row>
                <div>
                    <div style="width: 100%; height: 500px">
                        <div ref="countDistribution" :style="{ width: '100%', height: '500px' }"></div>
                    </div>
                </div>
            </div> -->
            <!-- 左边弹出详情页 -->
            <div>
                <van-popup v-model="showRightInfo" position="right" :style="{ height: '100%', width: '80%' }" get-container="body">
                    <van-row type="flex" justify="center" style="margin-bottom: 10px">
                        <van-col>
                            <div class="titleRightInfo">
                                <!-- <span class="honghe"></span> -->
                                <!-- 司龄分布 -->
                                {{ titleRight }}
                            </div>
                        </van-col>
                    </van-row>
                    <div v-for="(item, index) in vancellList" :key="index">
                        <van-cell :title="item.title" is-link :arrow-direction="item.direction" :value="item.value" @click="vancellListTouch(item)" />
                    </div>
                    <v-table ref="rightInfoTable" is-horizontal-resize :is-loading="isLoading" columns-width-drag :height="400" style="width: 100%; font-size: 14px" title-bg-color="#ccc" :columns="popupColumns" :table-data="rightInfoData" row-hover-color="#eee" row-click-color="#edf7ff"></v-table>
                    <!-- <van-cell title="M1-M4" is-link arrow-direction="" value="10" /> -->
                </van-popup>
            </div>
        </div>
        <div>
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
        Row,
        DatetimePicker,
        Popup,
        Checkbox,
        CheckboxGroup,
        Notify,
        Overlay,
        Tab,
        Tabs,
        Sticky
    } from "vant";
    import adresResultsTanbber from "@/components/adresResultstab/adresResultstab.vue";
    //
    import {
        findDateList,
        findCadreReportFbInfo,
        selectEmployeeByJobnumber,
    } from "@/views/adresResultts/adresResults.js";
    import adresNavbar from "@/components/adresResultstab/adresResultsNavbar.vue";
    import selctYearcurrent from "@/components/adresResultstab/selctYearcurrent.vue";

    export default {
        components: {
            adresResultsTanbber,
            adresNavbar,
            selctYearcurrent
        },
        data() {
            return {
                selecYear: "",
                yearlist: [],
                showRightInfo: false,
                ddJobNum: localStorage.getItem("jobNum"),
                rightInfoTop: [],
                titleRight: "",
                vancellList: [],
                jobAgeListRes: [],
                ageListRes: [],
                yongListRes: [],
                educationListRes: [],
                countListRes: [],
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
                        isFrozen: true,
                    },
                    {
                        field: "jobnumber",
                        title: "工号",
                        width: 80,
                        titleAlign: "center",
                        columnAlign: "center",
                        formatter: function(rowData, rowIndex, pagingIndex, field) {
                            return `<span>${rowData[field]}</span>`;
                        },
                        isResize: true,
                    },
                    {
                        field: "name",
                        title: "姓名",
                        width: 60,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        isFrozen: true,
                    },
                    {
                        field: "department",
                        title: "部门",
                        width: 150,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                    },
                    {
                        field: "post",
                        title: "岗位",
                        width: 150,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                    },
                    {
                        field: "rank",
                        title: "职级",
                        width: 50,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                    },
                    {
                        field: "rsrq",
                        title: "入司日期",
                        width: 100,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                    },
                    {
                        field: "currentState",
                        title: "当前状态",
                        width: 70,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                    },
                ],
                isLoading: false,
                rightInfoData: [],
                readySelectDept: [],

            };
        },
        created() {
            // debugger;
            this.init();
        },
        mounted() {
            this.$refs.adresResultsTanbber.changtab('adresResultps')
        },
        methods: {
            //初始化数据
            init() {
                this.readySelectDept = [JSON.parse(localStorage.getItem("adresResultDept")).deptId];
                this.getNewYear();
                this.queryFindCadreReportFbInfo();
            },
            // //查询年份
            // queryFindDateList() {
            //     let queryData = {};
            //     findDateList(queryData).then((res) => {
            //         if (res.code == "1000") {
            //             this.yearlist = this.ProcessingDate(res.obj);
            //         } else {
            //             Toast.fail(res.msg);
            //         }
            //     });
            // },
            // //查询年份处理数据
            // ProcessingDate(list) {
            //     let processYearList = [];
            //     for (let i in list) {
            //         let processObj = {};
            //         processObj.text = list[i];
            //         processObj.value = list[i].replace("年", "");
            //         processObj.value = processObj.value.replace("月", "");
            //         processYearList.push(processObj);
            //     }
            //     // debugger
            //     this.selecYear = processYearList[0].value;
            //     return processYearList;
            // },
            //设定年月
            getNewYear() {
                let myDate = new Date();
                let tYear = myDate.getFullYear();
                let tmouth = myDate.getMonth() + 1;

                // this.yearlist.push(tYear+'年')
                for (let i = 0; i < 100; i++) {
                    if (tYear - i == 2018) {
                        this.selecYear = this.yearlist[0].value;
                        // for (let k in this.mothlist) {
                        //     if (this.mothlist[k].commomIndex == tmouth) {
                        //         this.selecMoth = this.mothlist[k].value;
                        //         this.mothChange(this.mothlist[k].value);
                        //         break
                        //     }
                        // }
                        return;
                    } else {
                        let obj = {};
                        obj.text = tYear - i + "年";
                        obj.value = tYear - i;
                        this.yearlist.push(obj);
                    }
                }
            },
            //查询司龄数据
            queryFindCadreReportFbInfo(obj) {
                let queryData = {};
                if (obj) {
                    queryData = obj;
                } else {
                    queryData = {
                        jobnumber: this.ddJobNum,
                        deptList: [],
                        isDown: "Y",
                        year: "",
                    };
                }
                queryData.deptList = this.readySelectDept
                findCadreReportFbInfo(queryData).then((res) => {
                    if (res.code == "1000") {
                        this.distributionMethod(res.obj.jobAge);
                        this.AgeDistributionMeth(res.obj.age);
                        this.yongDistributionMeth(res.obj.young);
                        this.educationDistributionMeth(res.obj.edu);
                        // this.countDistributionMeth(res.obj.count);

                    } else {
                        Toast.fail(res.msg);
                    }
                });
            },
            yearChange(item) {
                let queryData = {
                    jobnumber: this.ddJobNum,
                    deptList: [],
                    isDown: "Y",
                    year: item,
                };
                queryData.deptList = this.readySelectDept
                this.queryFindCadreReportFbInfo(queryData);
            },
            //司龄柱图
            distributionMethod(list) {
                var that = this;
                this.jobAgeListRes = list;
                var myChart = this.$echarts.init(this.$refs.distribution);
                let zlList = [];
                let a3to5yearCountList = [];
                let a3yearCountList = [];
                let a5to10yearCountList = [];
                let a10yearCountList = [];
                for (let i in list) {
                    zlList.push(list[i].type);
                    a3to5yearCountList.push(list[i].a3to5yearCount || '');
                    a3yearCountList.push(list[i].a3yearCount || '');
                    a5to10yearCountList.push(list[i].a5to10yearCount || '');
                    a10yearCountList.push(list[i].a10yearCount || '');
                }

                myChart.setOption({
                    legend: {
                        data: ["3年以内", "3-5年", "5-10年", "10年以上"],
                        top: '3%'
                    },
                    color: ['#6495ED', '#FF8C00', '#A9A9A9', '#FFD700'],
                    grid: {
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: true,
                    },
                    xAxis: [{
                        type: "category",
                        data: zlList,
                        axisLabel: {
                            interval: 0,
                            // rotate: 10,
                            fontSize: 8,

                        },
                    }, ],
                    yAxis: [{
                        type: "value",
                    }, ],
                    series: [{
                            name: "3年以内",
                            type: "bar",
                            stack: "司龄",
                            barWidth: 25,
                            data: a3yearCountList,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: "inside", //在上方显示
                                        textStyle: {
                                            //数值样式
                                            color: "#000",
                                            fontSize: 10,
                                        },
                                    },
                                },
                            },
                        },
                        {
                            name: "3-5年",
                            type: "bar",
                            stack: "司龄",
                            data: a3to5yearCountList,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: "inside", //在上方显示
                                        textStyle: {
                                            //数值样式
                                            color: "#000",
                                            fontSize: 10,
                                        },
                                    },
                                },
                            },
                        },
                        {
                            name: "5-10年",
                            type: "bar",
                            stack: "司龄",
                            data: a5to10yearCountList,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: "inside", //在上方显示
                                        textStyle: {
                                            //数值样式
                                            color: "#000",
                                            fontSize: 10,
                                        },
                                    },
                                },
                            },
                        },
                        {
                            name: "10年以上",
                            type: "bar",
                            stack: "司龄",
                            data: a10yearCountList,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: "inside", //在上方显示
                                        textStyle: {
                                            //数值样式
                                            color: "#000",
                                            fontSize: 10,
                                        },
                                    },
                                },
                            },
                        },
                    ],
                });
                myChart.on("click", function(params) {
                    // debugger;
                    that.RightInfo(params, 1);
                });
            },
            //学历柱图
            educationDistributionMeth(list) {
                var that = this;
                this.educationListRes = list;
                var myChart = this.$echarts.init(this.$refs.educationDistribution);
                let zlList = [];
                let gaozhongCountList = [];
                let dazhuangCountList = [];
                let benkeCountList = [];
                let shuoshiCountList = [];
                for (let i in list) {
                    zlList.push(list[i].type);
                    gaozhongCountList.push(list[i].gaozhongCount || '');
                    dazhuangCountList.push(list[i].dazhuangCount || '');
                    benkeCountList.push(list[i].benkeCount || '');
                    shuoshiCountList.push(list[i].shuoshiCount || '');
                }

                myChart.setOption({
                    legend: {
                        data: ["高中及以下", "大专", "本科", "硕士及以上"],
                        top: '3%'
                    },
                    color: ['#6495ED', '#FF8C00', '#A9A9A9', '#FFD700'],
                    grid: {
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: true,
                    },
                    xAxis: [{
                        type: "category",
                        data: zlList,
                        axisLabel: {
                            interval: 0,
                            // rotate: 40
                            fontSize: 8,

                        },
                    }, ],
                    yAxis: [{
                        type: "value",
                    }, ],
                    series: [{
                            name: "高中及以下",
                            type: "bar",
                            stack: "学历",
                            barWidth: 25,
                            data: gaozhongCountList,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: "inside", //在上方显示
                                        textStyle: {
                                            //数值样式
                                            color: "#000",
                                            fontSize: 10,
                                        },
                                    },
                                },
                            },
                        },
                        {
                            name: "大专",
                            type: "bar",
                            stack: "学历",
                            data: dazhuangCountList,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: "inside", //在上方显示
                                        textStyle: {
                                            //数值样式
                                            color: "#000",
                                            fontSize: 10,
                                        },
                                    },
                                },
                            },
                        },
                        {
                            name: "本科",
                            type: "bar",
                            stack: "学历",
                            data: benkeCountList,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: "inside", //在上方显示
                                        textStyle: {
                                            //数值样式
                                            color: "#000",
                                            fontSize: 10,
                                        },
                                    },
                                },
                            },
                        },
                        {
                            name: "硕士及以上",
                            type: "bar",
                            stack: "学历",
                            data: shuoshiCountList,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: "inside", //在上方显示
                                        textStyle: {
                                            //数值样式
                                            color: "#000",
                                            fontSize: 10,
                                        },
                                    },
                                },
                            },
                        },
                    ],
                });
                myChart.on("click", function(params) {
                    // debugger;
                    that.RightInfo(params, 4);
                    // console.log(params);
                });
            },
            //年龄柱图
            AgeDistributionMeth(list) {
                var that = this;
                this.ageListRes = list;
                var myChart = this.$echarts.init(this.$refs.AgeDistribution);
                let zlList = [];
                let a30countList = [];
                let a30to39countList = [];
                let a40to49countList = [];
                let a50countList = [];
                for (let i in list) {
                    zlList.push(list[i].type);
                    a30countList.push(list[i].a30count || '');
                    a30to39countList.push(list[i].a30to39count || '');
                    a40to49countList.push(list[i].a40to49count || '');
                    a50countList.push(list[i].a50count || '');
                }

                myChart.setOption({
                    legend: {
                        data: ["30以下", "30-39", "40-49", "50以上"],
                        top: '3%'
                    },
                    color: ['#6495ED', '#FF8C00', '#A9A9A9', '#FFD700'],
                    grid: {
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: true,
                    },
                    xAxis: [{
                        type: "category",
                        data: zlList,
                        axisLabel: {
                            interval: 0,
                            // rotate: 40
                            fontSize: 8,

                        },
                    }, ],
                    yAxis: [{
                        type: "value",
                    }, ],
                    series: [{
                            name: "30以下",
                            type: "bar",
                            stack: "年龄",
                            barWidth: 25,
                            data: a30countList,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: "inside", //在上方显示
                                        textStyle: {
                                            //数值样式
                                            color: "#000",
                                            fontSize: 10,
                                        },
                                    },
                                },
                            },
                        },
                        {
                            name: "30-39",
                            type: "bar",
                            stack: "年龄",
                            data: a30to39countList,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: "inside", //在上方显示
                                        textStyle: {
                                            //数值样式
                                            color: "#000",
                                            fontSize: 10,
                                        },
                                    },
                                },
                            },
                        },
                        {
                            name: "40-49",
                            type: "bar",
                            stack: "年龄",
                            data: a40to49countList,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: "inside", //在上方显示
                                        textStyle: {
                                            //数值样式
                                            color: "#000",
                                            fontSize: 10,
                                        },
                                    },
                                },
                            },
                        },
                        {
                            name: "50以上",
                            type: "bar",
                            stack: "年龄",
                            data: a50countList,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: "inside", //在上方显示
                                        textStyle: {
                                            //数值样式
                                            color: "#000",
                                            fontSize: 10,
                                        },
                                    },
                                },
                            },
                        },
                    ],
                });
                myChart.on("click", function(params) {
                    // debugger;
                    that.RightInfo(params, 2);
                    // console.log(params);
                });
            },
            //青苗干部任职分布柱图
            yongDistributionMeth(list) {
                var that = this;
                this.yongListRes = list;
                var myChart = this.$echarts.init(this.$refs.yongDistribution);
                let zlList = [];
                let isYoungCountList = [];
                let notYoungCountList = [];
                for (let i in list) {
                    zlList.push(list[i].type);
                    isYoungCountList.push(list[i].isYoungCount || '');
                    notYoungCountList.push(list[i].notYoungCount || '');
                }
                myChart.setOption({
                    legend: {
                        data: ["青苗干部人数", "非青苗干部人数"],
                        top: '3%'
                    },
                    color: ['#6495ED', '#FF8C00'],
                    grid: {
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: true,
                    },
                    xAxis: [{
                        type: "category",
                        data: zlList,
                        axisLabel: {
                            interval: 0,
                            // rotate: 40
                            fontSize: 8,

                        },
                    }, ],
                    yAxis: [{
                        type: "value",
                    }, ],
                    series: [{
                            name: "青苗干部人数",
                            type: "bar",
                            stack: "青苗",
                            barWidth: 25,
                            data: isYoungCountList,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: "inside", //在上方显示
                                        textStyle: {
                                            //数值样式
                                            color: "#000",
                                            fontSize: 10,
                                        },
                                    },
                                },
                            },
                        },
                        {
                            name: "非青苗干部人数",
                            type: "bar",
                            stack: "青苗",
                            data: notYoungCountList,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: "inside", //在上方显示
                                        textStyle: {
                                            //数值样式
                                            color: "#000",
                                            fontSize: 10,
                                        },
                                    },
                                },
                            },
                        },
                    ],
                });
                myChart.on("click", function(params) {
                    // debugger;
                    that.RightInfo(params, 3);
                    // console.log(params);
                });
            },
            //职级柱图
            // countDistributionMeth(list) {
            //     var that = this;
            //     this.countListRes = list;
            //     var myChart = this.$echarts.init(this.$refs.countDistribution);
            //     let zlList = [];
            //     let echartsData = []
            //     for (let i in list) {
            //         zlList.push(list[i].type);
            //         echartsData.push(list[i].count || '')
            //     }

            //     myChart.setOption({
            //         color: '#FFD700',
            //         grid: {
            //             left: "3%",
            //             right: "4%",
            //             // bottom: "3%",
            //             containLabel: true,
            //         },
            //         xAxis: [{
            //             type: "value",
            //             position: 'top', //x 轴的位置【top bottom】
            //             nameRotate: -90, //坐标轴名字旋转，角度值。
            //             axisLabel: { //坐标轴刻度标签的相关设置。
            //                 // rotate: 90 //刻度标签旋转的角度，
            //             },
            //         }, ],
            //         yAxis: [{
            //             type: "category",
            //             data: zlList,
            //             // axisLabel: {
            //             //     interval: 0,
            //             //     rotate: 40
            //             // },
            //             inverse: 'true', //是否是反向坐标轴。
            //             // axisLabel: {
            //             //     rotate: -90
            //             // },
            //         }, ],


            //         series: [{
            //                 type: "bar",
            //                 barWidth: 25,
            //                 data: echartsData,
            //                 itemStyle: {
            //                     normal: {
            //                         label: {
            //                             show: true, //开启显示
            //                             position: "inside", //在上方显示
            //                             textStyle: {
            //                                 //数值样式
            //                                 color: "#000",
            //                                 fontSize: 10,
            //                             },
            //                         },
            //                     },
            //                 },
            //             },

            //         ],
            //     });
            //     myChart.on("click", function(params) {
            //         // debugger;
            //         that.RightInfo(params, 5);
            //         // console.log(params);
            //     });
            // },
            RightInfo(obj, type) {
                // debugger;
                var that = this;
                this.$nextTick(() => {
                    setTimeout(() => {
                        // debugger
                        that.showRightInfo = true;
                        if (type == 1) {
                            for (let item of this.jobAgeListRes) {
                                if (item.type == obj.name) {
                                    // ["3年以内", "3-5年", "5-10年", "10年以上"]
                                    this.titleRight = obj.name;
                                    this.vancellList = [{
                                            title: "3年以内",
                                            value: item.a3yearCount,
                                            direction: "down",
                                            jobList: item.a3yearJobmumbers,
                                        },
                                        {
                                            title: "30-39",
                                            value: item.a3to5yearCount,
                                            direction: "",
                                            jobList: item.a3to5yearJobmumbers,
                                        },
                                        {
                                            title: "40-49",
                                            value: item.a5to10yearCount,
                                            direction: "",
                                            jobList: item.a5to10yearJobmumbers,
                                        },
                                        {
                                            title: "10年以上",
                                            value: item.a10yearCount,
                                            direction: "",
                                            jobList: item.a10yearJobmumbers,
                                        },
                                    ];
                                    this.vancellListTouch(this.vancellList[0]);
                                }
                            }
                        } else if (type == 2) {
                            for (let item of this.ageListRes) {
                                if (item.type == obj.name) {
                                    // ["3年以内", "3-5年", "5-10年", "10年以上"]
                                    this.titleRight = obj.name;
                                    this.vancellList = [{
                                            title: "30以下",
                                            value: item.a30count,
                                            direction: "down",
                                            jobList: item.a30Jobumbers,
                                        },
                                        {
                                            title: "3-5年",
                                            value: item.a30to39count,
                                            direction: "",
                                            jobList: item.a30to39Jobumbers,
                                        },
                                        {
                                            title: "5-10年",
                                            value: item.a40to49count,
                                            direction: "",
                                            jobList: item.a40to49Jobumbers,
                                        },
                                        {
                                            title: "50以上",
                                            value: item.a50count,
                                            direction: "",
                                            jobList: item.a50Jobumbers,
                                        },
                                    ];
                                    this.vancellListTouch(this.vancellList[0]);
                                }
                            }
                        } else if (type == 3) {
                            for (let item of this.yongListRes) {
                                if (item.type == obj.name) {
                                    // ["3年以内", "3-5年", "5-10年", "10年以上"]
                                    this.titleRight = obj.name;
                                    this.vancellList = [{
                                            title: "青苗干部人数",
                                            value: item.isYoungCount,
                                            direction: "down",
                                            jobList: item.isYoungJobnumbers,
                                        },
                                        {
                                            title: "非青苗干部人数",
                                            value: item.notYoungCount,
                                            direction: "",
                                            jobList: item.notYoungJobnumbers,
                                        },
                                    ];
                                    this.vancellListTouch(this.vancellList[0]);
                                }
                            }
                        } else if (type == 4) {
                            for (let item of this.educationListRes) {
                                if (item.type == obj.name) {
                                    // data: ["高中及以下", "大专", "本科", "硕士及以上"],

                                    this.titleRight = obj.name;
                                    this.vancellList = [{
                                            title: "高中及以下",
                                            value: item.gaozhongCount,
                                            direction: "down",
                                            jobList: item.gaozhongJobumbers,
                                        },
                                        {
                                            title: "大专",
                                            value: item.dazhuangCount,
                                            direction: "",
                                            jobList: item.dazhuangJobumbers,
                                        },
                                        {
                                            title: "本科",
                                            value: item.benkeCount,
                                            direction: "",
                                            jobList: item.benkeJobumbers,
                                        },
                                        {
                                            title: "硕士及以上",
                                            value: item.shuoshiCount,
                                            direction: "",
                                            jobList: item.shuoshiJobumbers,
                                        },
                                    ];
                                    this.vancellListTouch(this.vancellList[0]);
                                }
                            }
                        } else if (type == 5) {
                            this.vancellList = []
                            for (let item of this.countListRes) {
                                this.vancellList.push({
                                    title: item.type,
                                    value: item.count,
                                    direction: "",
                                    jobList: item.countJobnumber
                                })
                                if (item.type == obj.name) {
                                    this.titleRight = obj.name;
                                }
                            }
                            this.vancellList[0].direction = 'down'
                            this.vancellListTouch(this.vancellList[0]);
                        }
                    }, 60);
                });
            },
            vancellListTouch(obj) {
                for (let item of this.vancellList) {
                    if (item == obj) {
                        obj.direction = "down";
                        this.querySelectEmployeeByJobnumber(obj.jobList);
                    } else {
                        item.direction = "";
                    }
                }
            },
            querySelectEmployeeByJobnumber(list) {
                this.isLoading = true;
                selectEmployeeByJobnumber({
                    jobnumbers: list,
                    type:'2'
                }).then((res) => {
                    if (res.code == "1000") {
                        this.rightInfoData = res.obj;
                        this.isLoading = false;
                        this.$refs.rightInfoTable.scrollToTop();
                    } else {
                        Toast.fail(res.msg);
                    }

                });
            },
        },
    };
</script>

<style lang="stylus">
    .honghe {
        width: 10px;
        height: 15px;
        display: inline-block;
        background-color: red;
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

    .colorFFF {
        color: #fff;
    }

    .fixedcontol {
        position: fixed;
        // max-width: 400px;
        right: 0;
        left: 0;
        z-index: 10;
        margin: auto;
    }
</style>
