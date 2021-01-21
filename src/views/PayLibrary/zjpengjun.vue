<!--  -->
<template>
    <div class=''>
        <div>
            <van-row type="flex" justify="left" style="margin-bottom:10px">
                <van-col>
                    <div class="titleRewards">
                        <span class="honghe"></span>
                        各职类平均工资
                    </div>
                </van-col>
            </van-row>
            <van-row type="flex">
                <van-col span="24">
                    <div class="resetVantArewards">
                        <choosedepartment @confirmNode="selctdept" :Farequired="true" labelTitle="部门:" :workingNum="true" :isSelctall="true" :faDeptData="deptData"></choosedepartment>
                        <van-field readonly clickable label="年/月:" label-class="labelStyle" v-model="selectedyear" placeholder="请选择年月" @click="vanDateShow = true" />
                    </div>
                    <van-action-sheet v-model="vanDateShow">
                        <van-datetime-picker v-model="currentDate" type="year-month" title="选择年月" :min-date="minDate" :max-date="maxDate" :formatter="formatter" @confirm="confirmYear" />
                    </van-action-sheet>
                </van-col>
            </van-row>
        </div>
        <div class="resetVant">
            <v-table is-horizontal-resize style="width:100%" :columns="columns" :table-data="tableData" row-hover-color="#eee" row-click-color="#edf7ff" :cell-merge="cellMerge" :is-loading="lodingFlag" :column-cell-class-name="columnCellClass"></v-table>
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
        Search,
        Stepper,
        Field,
        Button,
        Pagination
    } from "vant";
    import {
        findPayrollDept,
        findPayrollInfo,
        findPayrollInfoBySearch,
        findPerGetInfo,
        findFwValueInfo,
        findZjListInfo,
        findFwDeatilsInfo
    } from "@/views/PayLibrary/PayLibrary.js";
    import chooseDepartment from "@/components/chooseDepartment.vue";
    export default {
        name:'zjpengjun',
        //import引入的组件需要注入到对象中才能使用
        components: {
            choosedepartment: chooseDepartment,
        },
        data() {
            //这里存放数据
            return {
                deptData: [], //部门数据
                selectedyear: "",
                vanDateShow: false,
                currentDate: "",
                minDate: new Date(2020, 0, 1),
                columns: [{
                        field: "zl",
                        title: "职类",
                        width: 60,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                        isFrozen: true
                    },
                    {
                        field: "zj",
                        title: "职级",
                        width: 60,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                        isFrozen: true
                    },
                    {
                        field: "month",
                        title: "本月",
                        width: 120,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass"
                    },
                    {
                        field: "lastMonth",
                        title: "上月",
                        width: 120,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass"
                    },
                    {
                        field: "hb",
                        title: "环比",
                        width: 120,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass"
                    },
                    {
                        field: "tb",
                        title: "同比",
                        width: 120,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass"
                    },
                    {
                        field: "tq",
                        title: "同期",
                        width: 120,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass"
                    }
                ],
                tableData: [],
                lodingFlag: true,
                ddJobNum: localStorage.getItem("jobNum"),
                mlength: 0,
                plength: 0,
                slength: 0,
                olength: 0,
                maxDate: null,
                yearVal: '', //月+年
                lastYearVal: '', //月+年
                deptIds: [],//选择的部门值

            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            confirmYear(value) {
                // debugger
                let valueTime = new Date(value);
                let y = valueTime.getFullYear();
                let m = (valueTime.getMonth() + 1).toString().padStart(2, "0");
                let lastm = valueTime
                    .getMonth()
                    .toString()
                    .padStart(2, "0");
                let lasty = y;
                this.selectedyear = y + "年" + m + "月";
                if (m == "01") {
                    lasty = y - 1;
                    lastm = "12";
                }
                let queryObj = {
                    jobnumber: this.ddJobNum,
                    year: y + m,
                    lastYear: lasty + lastm,
                    deptList: this.deptIds
                };
                this.yearVal = queryObj.year
                this.lastYearVal = queryObj.lastYear
                this.queryfindPerGetInfo(queryObj);
                this.lodingFlag = true;
                this.vanDateShow = false;
            },
            queryfindPerGetInfo(queryObj) {
                let queryData = {};
                if (queryObj) {
                    queryData = queryObj;
                } else {
                    queryData = {
                        jobnumber: this.ddJobNum
                    };
                }
                findPerGetInfo(queryData).then(res => {
                    if (res.code == 1000) {
                        //先初始化
                        this.tableData = [];
                        for (let key in res.obj) {
                            if (key == "m" && res.obj[key]) {
                                this.mlength = res.obj[key].length;
                                for (let m in res.obj[key]) {
                                    res.obj[key][m].zl = "M类";
                                    this.tableData.push(res.obj[key][m]);
                                }
                            } else if (key == "p" && res.obj[key]) {
                                this.plength = res.obj[key].length;
                                for (let p in res.obj[key]) {
                                    res.obj[key][p].zl = "P类";
                                    this.tableData.push(res.obj[key][p]);
                                }
                            } else if (key == "s" && res.obj[key]) {
                                this.slength = res.obj[key].length;
                                for (let s in res.obj[key]) {
                                    res.obj[key][s].zl = "S类";
                                    this.tableData.push(res.obj[key][s]);
                                }
                            } else if (key == "o" && res.obj[key]) {
                                this.olength = res.obj[key].length;
                                for (let o in res.obj[key]) {
                                    res.obj[key][o].zl = "O类";
                                    this.tableData.push(res.obj[key][o]);
                                }
                            }
                        }
                        let totalObj = {
                            zl: "合计",
                            zj: "",
                            hb: res.obj.hbTotal,
                            lastMonth: res.obj.lastMonthTotal,
                            month: res.obj.monthTotal,
                            tb: res.obj.tbTotal,
                            tq: res.obj.tqTotal
                        };
                        this.tableData.push(totalObj);
                        if (res.obj.year != null) {
                            let resTime = res.obj.year.replace(/^(\d{4})(\d{2})$/, "$1-$2");
                            let newTime = new Date(resTime);
                            let y = newTime.getFullYear();
                            let m = newTime.getMonth();
                            this.maxDate = new Date(y, m, 1);
                            m = (newTime.getMonth() + 1).toString().padStart(2, "0");
                            this.selectedyear = y + "年" + m + "月";
                        }
                    } else {
                        Toast.fail(res.msg);
                    }
                    this.lodingFlag = false;
                });
            },
            formatter(type, val) {
                if (type === "year") {
                    return `${val}年`;
                } else if (type === "month") {
                    return `${val}月`;
                }
                return val;
            },
            cellMerge(rowIndex, rowData, field) {
                if (field === "zl" && rowData[field] === "M类") {
                    return {
                        colSpan: 1,
                        rowSpan: this.mlength,
                        content: '<span style="color:red">M类</span>',
                        componentName: ""
                    };
                }
                if (field === "zl" && rowData[field] === "P类") {
                    return {
                        colSpan: 1,
                        rowSpan: this.plength,
                        content: '<span style="color:red">P类</span>',
                        componentName: ""
                    };
                }
                if (field === "zl" && rowData[field] === "S类") {
                    return {
                        colSpan: 1,
                        rowSpan: this.slength,
                        content: '<span style="color:red">S类</span>',
                        componentName: ""
                    };
                }
                if (field === "zl" && rowData[field] === "O类") {
                    return {
                        colSpan: 1,
                        rowSpan: this.olength,
                        content: '<span style="color:red">O类</span>',
                        componentName: ""
                    };
                }
                if (field === "zl" && rowData[field] === "合计") {
                    return {
                        colSpan: 2,
                        rowSpan: 1,
                        content: '<span style="color:red">合计</span>',
                        componentName: ""
                    };
                }
            },
            columnCellClass(rowIndex, columnName, rowData) {
                if (rowIndex < this.mlength) {
                    return "mClass";
                }
                if (this.mlength <= rowIndex && rowData.zl == "P类") {
                    return "pClass";
                }
                if (this.plength <= rowIndex && rowData.zl == "S类") {
                    return "sClass";
                }
                if (this.slength <= rowIndex && rowData.zl == "O类") {
                    return "oClass";
                }
                if (rowData.zl == "合计") {
                    return "heClass";
                }
            },
            // 部门选择
            selctdept(data){
                // console.log(data)
                this.deptIds = data
                let queryObj = {
                    jobnumber: this.ddJobNum,
                    year: this.yearVal,
                    lastYear: this.lastYearVal,
                    deptList: data
                };
                this.queryfindPerGetInfo(queryObj);
            },
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
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {
            let nowData = new Date();
            let y = nowData.getFullYear();
            let m = nowData.getMonth() - 1;
            this.maxDate = new Date(y, m, 1);
            this.queryfindPerGetInfo()
            this.queryfindPayrollDept()
        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {

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
    .mClass {
        background-color: #FFEBCD;
    }

    .pClass {
        background-color: #FFDEAD;
    }

    .sClass {
        background-color: #FFEBCD;
    }

    .oClass {
        background-color: #FFDEAD;
    }

    .heClass {
        background-color: #FFEBCD;
    }
</style>
