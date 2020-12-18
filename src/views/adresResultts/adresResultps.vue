<template>
    <div>
        <adresNavbar></adresNavbar>
        <adresResultsTanbber ref="adresResultsTanbber" />
        <selctYearcurrent @yearChangeItem='yearChange'></selctYearcurrent>
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
                    <v-table ref="workAgeTable" is-horizontal-resize :is-loading="workAgeLoading" columns-width-drag :height="400" style="width: 100%; font-size: 14px" :columns="workAgeColumns" :column-cell-class-name="columnCellworkAge" :table-data="workAgeTableData"></v-table>
                </div>
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
                    <v-table is-horizontal-resize :is-loading="ageLoading" columns-width-drag :height="400" style="width: 100%; font-size: 14px" :columns="ageColumns" :column-cell-class-name="columnCellworkAge" :table-data="ageTableData"></v-table>
                </div>
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
                <van-row type="flex" justify="center">
                    <van-col>
                        <div style="font-size:14px;color:#DC143C;font-weight:700"> 整体情况:青苗占比:{{youngPct}}</div>
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
                <van-row type="flex" justify="center">
                    <van-col>
                        <div style="font-size:14px;color:#DC143C;font-weight:700"> 整体情况:本科及以上占比:{{eduPct}}</div>
                    </van-col>
                </van-row>
                <div>
                    <div style="width: 100%; height: 300px">
                        <div ref="educationDistribution" :style="{ width: '100%', height: '300px' }"></div>
                    </div>
                </div>
            </div>
            <div>
                <van-row type="flex" justify="left" style="margin-bottom: 10px">
                    <van-col>
                        <div class="titleRewards">
                            <span class="honghe"></span>
                            性别分布
                        </div>
                    </van-col>
                </van-row>
                <van-row type="flex" justify="center">
                    <van-col>
                        <div style="font-size:14px;color:#DC143C;font-weight:700"> 男女比例:{{sexProportion}}</div>
                    </van-col>
                </van-row>
                <div>
                    <div style="width: 100%; height: 300px">
                        <div ref="sexcationDistribution" :style="{ width: '100%', height: '300px' }"></div>
                    </div>
                </div>
            </div>
            <div>
                <van-popup v-model="showRightInfo" position="right" :style="{ height: '100%', width: '88%', }" get-container="body">
                    <van-row type="flex" justify="center" style="margin-bottom: 10px">
                        <van-col>
                            <div class="titleRightInfo">
                                {{ titleRight }}
                            </div>
                        </van-col>
                    </van-row>
                    <van-grid :column-num="3" :clickable='true' :gutter="2">
                        <van-grid-item v-for="(item, index) in titleTypelist" :key="index" :class="item.class" @click='titleTypeClick(item)'>
                            <template #default>
                                <div class="gridItemBgi van-ellipsis">
                                    {{ item.name }}
                                </div>
                            </template>
                        </van-grid-item>
                    </van-grid>

                    <div v-for="(items, index) in vancellList" :key="index">
                        <van-row type="flex" justify="space-around">
                            <van-col span="12" v-for="(item, index) in items" :key="index">
                                <van-cell :title="item.title" is-link :arrow-direction="item.direction" :value="item.value" @click="vancellListTouch(item)" />
                            </van-col>
                        </van-row>
                    </div>
                    <v-table ref="rightInfoTable" is-horizontal-resize :is-loading="isLoading" columns-width-drag :height="400" style="width: 100%; font-size: 14px" title-bg-color="#ccc" :columns="popupColumns" :table-data="rightInfoData" row-hover-color="#eee" row-click-color="#edf7ff"></v-table>

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
        Sticky,
        Grid,
        GridItem
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
                sexListRes: [],
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
                // 司龄分布表格数据
                workAgeTableData: [],
                // 司龄分布表格状态控制
                workAgeLoading: true,
                // 司龄分布表格表头数据
                workAgeColumns: [{
                        field: "siling",
                        title: "司龄",
                        width: 70,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "a3Pct",
                        title: "3年以内",
                        width: 70,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    }, {
                        field: "a3to5Pct",
                        title: "3-5年",
                        width: 70,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    }, {
                        field: "a5to10Pct",
                        title: "5-10年",
                        width: 70,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    }, {
                        field: "a10Pct",
                        title: "10年以上",
                        width: 70,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                ],
                // 年龄分布状态控制
                ageLoading: true,
                // 年龄分布表头数据
                ageColumns: [{
                        field: "siling",
                        title: "司龄",
                        width: 70,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "a30Pct",
                        title: "30以下",
                        width: 70,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    }, {
                        field: "a30to39Pct",
                        title: "30-39",
                        width: 70,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    }, {
                        field: "a40to49Pct",
                        title: "40-49",
                        width: 70,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    }, {
                        field: "a50Pct",
                        title: "50以上",
                        width: 70,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                ],
                ageTableData: [],
                // 请求的原始数据
                reportFbInfoData: {},
                // 青苗百分比
                youngPct: '',
                // 学历百分比
                eduPct: '',
                // 男女比例
                sexProportion: "",
                bzType: '',
                titleTypelist: []
            };
        },
        created() {
            debugger
            // 数据初始化
            this.init();
        },
        mounted() {
            // 页面头部标签兰切换
            this.$refs.adresResultsTanbber.changtab('adresResultps')
        },
        methods: {
            //初始化数据
            init() {
                // 从本地获取已选择的部门id
                this.readySelectDept = [JSON.parse(localStorage.getItem("adresResultDept")).deptId];
                // 获取年份
                this.getNewYear();
                this.bzType = localStorage.getItem("bzType")
                //查询司龄数据
                this.queryFindCadreReportFbInfo();
            },
            //设定年月
            getNewYear() {
                let myDate = new Date();
                let tYear = myDate.getFullYear();
                let tmouth = myDate.getMonth() + 1;
                for (let i = 0; i < 100; i++) {
                    if (tYear - i == 2018) {
                        this.selecYear = this.yearlist[0].value;
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
                        bzType: this.bzType
                    };
                }
                queryData.deptList = this.readySelectDept
                findCadreReportFbInfo(queryData).then((res) => {
                    if (res.code == "1000") {
                        this.reportFbInfoData = res.obj
                        this.distributionMethod(res.obj.jobAge);
                        this.AgeDistributionMeth(res.obj.age);
                        this.yongDistributionMeth(res.obj.young);
                        this.educationDistributionMeth(res.obj.edu);
                        this.sexDistributionMeth(res.obj.sex)
                        this.workAgeTable()
                        this.ageTable()
                        let {
                            youngPct,
                            eduPct,
                            sexProportion
                        } = res.obj
                        this.youngPct = youngPct
                        this.eduPct = eduPct
                        this.sexProportion = sexProportion
                    } else {
                        Toast.fail(res.msg);
                    }
                });
            },
            // 年份改变事件
            yearChange(item) {
                let queryData = {
                    jobnumber: this.ddJobNum,
                    deptList: [],
                    isDown: "Y",
                    year: item,
                    bzType: this.bzType
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
                    // ;
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
                    // ;
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
                    // ;
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
                    that.RightInfo(params, 3);
                });
            },
            //性别柱图
            sexDistributionMeth(list) {
                var that = this;
                this.sexListRes = list;
                var myChart = this.$echarts.init(this.$refs.sexcationDistribution);
                let echartData = []
                //
                for (let item of list) {
                    echartData.push({
                        value: item.sexCount,
                        name: item.type
                    })
                }
                // var data = genData(50);
                myChart.setOption({
                    color: ['#6495ED', '#FF8C00'],
                    // tooltip: {
                    //     trigger: 'item',
                    //     formatter: '{a} <br/>{b} : {c}人 ({d}%)'
                    // },
                    legend: {
                        data: ['男', '女'],
                        top: '3%'
                    },
                    series: [{
                        name: '性别',
                        type: 'pie',
                        radius: '65%',
                        center: ['50%', '50%'],
                        data: echartData,
                        label: {
                            formatter: '{b}:{d}% '
                        },
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                })
                myChart.on("click", function(params) {
                    // ;
                    that.RightInfo(params, 5);
                    // console.log(params);
                });
            },
            // 右弹窗展示详细人员数据
            RightInfo(obj, type) {

                // ;
                var that = this;
                this.$nextTick(() => {
                    setTimeout(() => {
                        that.showRightInfo = true;
                        this.vancellList = []
                        that.titleTypelist = []
                        if (type == 2) {
                            for (let item of this.jobAgeListRes) {
                                if (item.type == obj.name) {
                                    that.titleTypelist.push({
                                        name: item.type,
                                        class: 'resetVantAdresResulAct',
                                        type: 2
                                    })
                                    // ["3年以内", "3-5年", "5-10年", "10年以上"]
                                    this.titleRight = '司龄分布明细';
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
                                    this.vancellList = that.spArray(2, this.vancellList)
                                    this.vancellListTouch(this.vancellList[0][0]);
                                } else {
                                    that.titleTypelist.push({
                                        name: item.type,
                                        class: 'resetVantAdresResultps',
                                        type: 2
                                    })
                                }
                            }
                        } else if (type == 1) {
                            for (let item of that.ageListRes) {
                                if (item.type == obj.name) {
                                    that.titleTypelist.push({
                                        name: item.type,
                                        class: 'resetVantAdresResulAct',
                                        type: 1
                                    })
                                    // ["3年以内", "3-5年", "5-10年", "10年以上"]
                                    that.titleRight = '年龄分布明细';
                                    that.vancellList = [{
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
                                    that.vancellList = that.spArray(2, that.vancellList)
                                    that.vancellListTouch(that.vancellList[0][0]);
                                } else {
                                    that.titleTypelist.push({
                                        name: item.type,
                                        class: 'resetVantAdresResultps',
                                        type: 1
                                    })
                                }
                            }
                        } else if (type == 3) {
                            for (let item of this.yongListRes) {
                                if (item.type == obj.name) {
                                    that.titleTypelist.push({
                                        name: item.type,
                                        class: 'resetVantAdresResulAct',
                                        type: 3
                                    })
                                    // ["3年以内", "3-5年", "5-10年", "10年以上"]
                                    this.titleRight = '青苗分布明细';
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
                                    this.vancellList = that.spArray(2, this.vancellList)
                                    this.vancellListTouch(this.vancellList[0][0]);
                                } else {
                                    that.titleTypelist.push({
                                        name: item.type,
                                        class: 'resetVantAdresResultps',
                                        type: 3
                                    })
                                }
                            }
                        } else if (type == 4) {
                            for (let item of this.educationListRes) {
                                if (item.type == obj.name) {
                                    // data: ["高中及以下", "大专", "本科", "硕士及以上"],
                                    that.titleTypelist.push({
                                        name: item.type,
                                        class: 'resetVantAdresResulAct',
                                        type: 4
                                    })
                                    this.titleRight = '学历分布明细';
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
                                    this.vancellList = that.spArray(2, this.vancellList)
                                    this.vancellListTouch(this.vancellList[0][0]);
                                } else {
                                    that.titleTypelist.push({
                                        name: item.type,
                                        class: 'resetVantAdresResultps',
                                        type: 4
                                    })
                                }
                            }
                        } else if (type == 5) {
                            this.vancellList = []
                            for (let item of this.sexListRes) {
                                this.vancellList.push({
                                    title: item.type,
                                    value: item.sexCount,
                                    direction: "",
                                    jobList: item.jobnumbers
                                })
                                // if (item.type == obj.name) {
                                this.titleRight = '性别';
                                // }
                            }
                            this.vancellList[0].direction = 'down'
                            this.vancellListTouch(this.vancellList[0]);
                        }
                    }, 60);
                });
            },
            // 分割数组，两个一组
            spArray(n, arr) {
                var result = [];
                for (var i = 0; i < arr.length; i += n) {
                    result.push(arr.slice(i, i + n));
                }
                return result
            },
            // 右弹窗展示目录点击事件
            vancellListTouch(obj) {
                for (let item of this.vancellList) {
                    for (let i in item) {
                        if (item[i] == obj) {
                            obj.direction = "down";
                            this.querySelectEmployeeByJobnumber(obj.jobList);
                        } else {
                            item[i].direction = "";
                        }
                    }

                }
            },
            titleTypeClick(obj) {
                // debugger
                for (let item of this.titleTypelist) {
                    if (obj.type == item.type) {
                        item.class = 'resetVantAdresResulAct'
                    } else {
                        item.class = 'resetVantAdresResultps'
                    }
                }
                this.RightInfo(obj, obj.type)
            },
            // 右弹窗表格数据刷新
            querySelectEmployeeByJobnumber(list) {
                this.isLoading = true;
                selectEmployeeByJobnumber({
                    jobnumbers: list,
                    type: '2'
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
            // 司龄表格
            workAgeTable() {
                let {
                    a3Pct,
                    a3to5Pct,
                    a5to10Pct,
                    a10Pct
                } = this.reportFbInfoData
                this.workAgeTableData = [{
                    siling: '占比',
                    a3Pct,
                    a3to5Pct,
                    a5to10Pct,
                    a10Pct
                }]
                this.workAgeLoading = false
            },
            ageTable() {
                let {
                    a30Pct,
                    a30to39Pct,
                    a40to49Pct,
                    a50Pct
                } = this.reportFbInfoData
                this.ageTableData = [{
                    siling: '占比',
                    a30Pct,
                    a30to39Pct,
                    a40to49Pct,
                    a50Pct
                }]
                this.ageLoading = false
            },
            //司龄表格表体样式
            columnCellworkAge() {
                return "bodyStye"
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

    .titleclass {
        background-color: #dc7272;
        color: #ffffff;
        font-size 12px;
    }

    .bodyStye {
        background-color: #ffebcd;
        font-size 12px;
    }

    .gridItemBgi {
        color #fff;
        font-size: 16px;
        font-weight: 700;
        width: 12vh;
    }
</style>
