<!-- 人才池 -->
<template>
    <div style="padding-bottom: 10%" class='' >
        <adresNavbar v-if="reFredText"></adresNavbar>
        <adresResultsTanbber ref="adresResultsTanbber" v-if="reFredText" />
        <div style="width:1px;height:10vh" v-if="!reFredText"></div>
        <div>
            <div>
                <div>
                    <div class="titleTop">
                        <van-row type="flex" justify="space-between">
                            <van-col span="21">
                                <div>
                                    人才结构
                                </div>
                            </van-col>
                            <van-col span="3">
                                <div @click="jiegouTopClick">
                                    <van-icon :name="jiegouTop ? 'ascending' :'wap-nav'" />
                                </div>
                            </van-col>
                        </van-row>
                        <!-- <van-icon name="descending" /> -->
                    </div>
                </div>
                <transition name="van-fade">
                    <div v-show="jiegouTop">
                        <div>
                            <van-row type="flex" justify="space-around">
                                <van-col span="8">
                                    <div class="titleSecond">入职一年内:</div>
                                </van-col>
                                <van-col span="16">
                                    <span :class="showData.isOneYearWorker.styAct ? 'seltcetitemAct' :'seltcetitem'" @click="seltcetitemClick(showData.isOneYearWorker)">{{showData.isOneYearWorker.text}}</span>
                                </van-col>
                            </van-row>
                        </div>
                        <div>
                            <div>
                                <van-row type="flex" justify="space-around">
                                    <van-col span="8">
                                        <div class="titleSecond">年轻化:</div>
                                    </van-col>
                                    <van-col span="16">
                                        <div class="simpleSwipe">
                                            <span :class="item.styAct ? 'seltcetitemAct' :'seltcetitem'" @click="seltcetitemClick(item)" v-for="(item,index) in showData.beYounger" :key="index">{{item.text}}</span>
                                        </div>
                                    </van-col>
                                </van-row>
                            </div>
                            <div>
                                <van-row type="flex" justify="space-around">
                                    <van-col span="8">
                                        <div class="titleSecond">学历:</div>
                                    </van-col>
                                    <van-col span="16">
                                        <div class="simpleSwipe">
                                            <span :class="item.styAct ? 'seltcetitemAct' :'seltcetitem'" @click="seltcetitemClick(item)" v-for="(item,index) in showData.xl" :key="index">{{item.text}}</span></div>
                                    </van-col>
                                </van-row>
                            </div>
                            <div>
                                <van-row type="flex" justify="space-around">
                                    <van-col span="8">
                                        <div class="titleSecond">青苗干部:</div>
                                    </van-col>
                                    <van-col span="16">
                                        <span :class="item.styAct ? (item.styDisabled ? 'seltcetitemDis' :'seltcetitemAct') : 'seltcetitem'" @click="seltcetitemClick(item)" v-for="(item,index) in showData.isYoung" :key="index">{{item.text}}</span>
                                    </van-col>
                                </van-row>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <div>
                <div class="titleTop">
                    <van-row type="flex" justify="space-between">
                        <van-col span="21">
                            <div>
                                团队培育
                            </div>
                        </van-col>
                        <van-col span="3">
                            <div>
                                <div @click="tuanduiTopClick">
                                    <van-icon :name="tuanduiTop ? 'ascending' :'wap-nav'" />
                                </div>
                            </div>
                        </van-col>
                    </van-row>

                </div>
                <transition name="van-fade">
                    <div v-show="tuanduiTop">
                        <div>
                            <van-row type="flex" justify="space-around">
                                <van-col span="8">
                                    <div class="titleSecond">团队规模:</div>
                                </van-col>
                                <van-col span="16">
                                    <div class="simpleSwipe">
                                        <span :class="item.styAct ? 'seltcetitemAct' :'seltcetitem'" @click="seltcetitemClick(item)" v-for="(item,index) in showData.teamNums" :key="index">{{item.text}}</span>
                                    </div>
                                </van-col>
                            </van-row>
                        </div>
                        <div>
                            <van-row type="flex" justify="space-around">
                                <van-col span="8">
                                    <div class="titleSecond">有无后备:</div>
                                </van-col>
                                <!-- seltcetitemDis -->
                                <van-col span="16"><span :class="item.styAct ? (item.styDisabled ? 'seltcetitemDis' :'seltcetitemAct') : 'seltcetitem'" @click="seltcetitemClick(item)" v-for="(item,index) in showData.isHaveReserve" :key="index">{{item.text}}</span></van-col>
                            </van-row>
                        </div>
                        <transition name="van-slide-right">
                            <div v-show="searchQuery.isHaveReserve == 'Y' ">
                                <van-row type="flex" justify="space-around">
                                    <van-col span="8">
                                        <div class="titleSecond">成熟度:</div>
                                    </van-col>
                                    <van-col span="16">
                                        <div class="simpleSwipe">
                                            <span :class="item.styAct ? 'seltcetitemAct' :'seltcetitem'" @click="seltcetitemClick(item)" v-for="(item,index) in showData.csd" :key="index">{{item.text}}</span>
                                        </div>
                                    </van-col>
                                </van-row>
                            </div>
                        </transition>
                        <div>
                            <van-row type="flex" justify="space-around">
                                <van-col span="8">
                                    <div class="titleSecond"> 组织氛围:</div>
                                </van-col>
                                <van-col span="16">
                                    <div class="simpleSwipe">
                                        <span :class="item.styAct ? 'seltcetitemAct' :'seltcetitem'" @click="seltcetitemClick(item)" v-for="(item,index) in showData.teamFW" :key="index">{{item.text}}</span>
                                    </div>
                                </van-col>
                            </van-row>
                        </div>
                    </div>
                </transition>
            </div>
            <div>
                <div class="titleTop">
                    <van-row type="flex" justify="space-between">
                        <van-col span="21">
                            <div>
                                人才发展
                            </div>
                        </van-col>
                        <van-col span="3">
                            <div>
                                <div @click="rencaiTopClick">
                                    <van-icon :name="rencaiTop ? 'ascending' :'wap-nav'" />
                                </div>
                            </div>
                        </van-col>
                    </van-row>
                </div>
                <transition name="van-fade">
                    <div v-show="rencaiTop">
                        <div>
                            <van-row type="flex" justify="space-around">
                                <van-col span="8">
                                    <div class="titleSecond">三年内未晋升:</div>
                                </van-col>
                                <van-col span="16"><span :class="showData.threeYearNoPromotion.styAct ? 'seltcetitemAct' :'seltcetitem'" @click="seltcetitemClick(showData.threeYearNoPromotion)">{{showData.threeYearNoPromotion.text}}</span></van-col>
                            </van-row>
                        </div>
                        <div>
                            <van-row type="flex" justify="space-around">
                                <van-col span="8">
                                    <div class="titleSecond">九宫格位置:</div>
                                </van-col>
                                <van-col span="16">
                                    <div class="simpleSwipe">
                                        <span :class="item.styAct ? 'seltcetitemAct' :'seltcetitem'" @click="seltcetitemClick(item)" v-for="(item,index) in showData.jgg" :key="index">{{item.text}}</span>
                                    </div>
                                </van-col>
                            </van-row>
                        </div>
                        <div>
                            <van-row type="flex" justify="space-around">
                                <van-col span="8">
                                    <div class="titleSecond">个人荣誉：</div>
                                </van-col>
                                <van-col span="16"><span :class="showData.honor.styAct ? 'seltcetitemAct' :'seltcetitem'" @click="seltcetitemClick(showData.honor)">{{showData.honor.text}}</span></van-col>
                            </van-row>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        <div>
            <div>
                <div class="butntalentPool">
                    <div class="talentchoseBtn" style="background-color:MediumAquamarine" @click="restSearchQuery">
                        重置
                    </div>
                    <div class="talentchoseBtn" style="background-color:DeepSkyBlue" @click="queryFindCadrePoolBySearch">
                        确认
                    </div>
                </div>
            </div>
        </div>
        <div>
            <!-- <van-row type="flex" justify="center">
                <van-col span="9"> -->
            <div class="totalNumberSty"> 》》》共{{totalNumber}}条《《《</div>
            <!-- </van-col>

            </van-row> -->
        </div>
        <div>
            <div class="bodyStye">
                <v-table ref="workAgeTable" is-horizontal-resize :is-loading="talentPoolLoading" columns-width-drag :height="400" style="width: 100%; font-size: 14px" :columns="talentPoolColumns" :column-cell-class-name="columnCellworkAge" :table-data="talentPoolTableData" :row-click="rowClick"></v-table>
            </div>
        </div>
        <!-- <span>123</span> -->
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
    } from "vant";
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
    import adresResultsTanbber from "@/components/adresResultstab/adresResultstab.vue";
    import adresNavbar from "@/components/adresResultstab/adresResultsNavbar.vue";
    import {
        findCadrePoolBySearch
    } from "@/views/adresResultts/adresResults.js";
    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {
            adresResultsTanbber,
            adresNavbar
        },
        data() {
            //这里存放数据
            return {
                jiegouTop: true,
                tuanduiTop: true,
                rencaiTop: true,
                reFredText: true,
                showData: {
                    isOneYearWorker: {
                        text: '司龄一年以内',
                        value: '',
                        styAct: false,
                        objType: 'isOneYearWorker'
                    },
                    beYounger: [{
                        text: '经理级90后干部(M1-M3,P4/S4-P5/S5)',
                        value: '1',
                        styAct: false,
                        objType: 'beYounger'
                    }, {
                        text: '总监级85后干部(M4-M5,P6/S6-P7/S7)',
                        value: '2',
                        styAct: false,
                        objType: 'beYounger'

                    }],
                    xl: [{
                        text: '本科以下',
                        value: ['01', '02', '03', '04', '05'],
                        styAct: false,
                        objType: 'xl'

                    }, {
                        text: '本科',
                        value: ['06'],
                        styAct: false,
                        objType: 'xl'

                    }, {
                        text: '本科以上',
                        value: ['07', '08', '09'],
                        styAct: false,
                        objType: 'xl'

                    }],
                    isYoung: [{
                        text: '青苗干部',
                        value: 'Y',
                        styAct: false,
                        objType: 'isYoung',
                        styDisabled: false

                    }, {
                        text: '非青苗干部',
                        value: 'N',
                        styAct: false,
                        objType: 'isYoung',
                        styDisabled: false

                    }],
                    teamNums: [{
                        text: '1-8人',
                        value: {
                            down: 1,
                            high: 8
                        },
                        styAct: false,
                        objType: 'teamNums'

                    }, {
                        text: '9-20人',
                        value: {
                            down: 9,
                            high: 20
                        },
                        styAct: false,
                        objType: 'teamNums'

                    }, {
                        text: '21-50人',
                        value: {
                            down: 21,
                            high: 50
                        },
                        styAct: false,
                        objType: 'teamNums'

                    }, {
                        text: '51-100人',
                        value: {
                            down: 51,
                            high: 100
                        },
                        styAct: false,
                        objType: 'teamNums'

                    }, {
                        text: '100人以上',
                        value: {
                            down: 100,
                            high: 10000
                        },
                        styAct: false,
                        objType: 'teamNums'

                    }, ],
                    isHaveReserve: [{
                        text: '有后备',
                        value: 'Y',
                        styAct: false,
                        objType: 'isHaveReserve',
                        styDisabled: false

                    }, {
                        text: '无后备',
                        value: 'N',
                        styAct: false,
                        objType: 'isHaveReserve',
                        styDisabled: false
                    }, ],
                    teamFW: [{
                        text: '晴天',
                        value: '晴天',
                        styAct: false,
                        objType: 'teamFW'

                    }, {
                        text: '雨天',
                        value: '雨天',
                        styAct: false,
                        objType: 'teamFW'

                    }, {
                        text: '多云',
                        value: '多云',
                        styAct: false,
                        objType: 'teamFW'

                    }, {
                        text: '阴天',
                        value: '阴天',
                        styAct: false,
                        objType: 'teamFW'

                    }, {
                        text: '雷雨',
                        value: '雷雨',
                        styAct: false,
                        objType: 'teamFW'

                    }, ],
                    threeYearNoPromotion: {
                        text: '职级工龄大于3年',
                        value: '',
                        styAct: false,
                        objType: 'threeYearNoPromotion'
                    },
                    jgg: [{
                        text: '象限①',
                        value: '①',
                        styAct: false,
                        objType: 'jgg'
                    }, {
                        text: '象限②',
                        value: '②',
                        styAct: false,
                        objType: 'jgg'

                    }, {
                        text: '象限③',
                        value: '③',
                        styAct: false,
                        objType: 'jgg'

                    }, {
                        text: '象限④',
                        value: '④',
                        styAct: false,
                        objType: 'jgg'

                    }, {
                        text: '象限⑤',
                        value: '⑤',
                        styAct: false,
                        objType: 'jgg'

                    }, {
                        text: '象限⑥',
                        value: '⑥',
                        styAct: false,
                        objType: 'jgg'

                    }, {
                        text: '象限⑦',
                        value: '⑦',
                        styAct: false,
                        objType: 'jgg'

                    }, {
                        text: '象限⑧',
                        value: '⑧',
                        styAct: false,
                        objType: 'jgg'

                    }, {
                        text: '象限⑨',
                        value: '⑨',
                        styAct: false,
                        objType: 'jgg'

                    }, ],
                    honor: {
                        text: '有红色事件记录',
                        value: '',
                        styAct: false,
                        objType: 'honor'
                    },
                    csd: [{
                            text: '立即可用',
                            value: '01',
                            styAct: false,
                            objType: 'csd'

                        },
                        {
                            text: '一年可用',
                            value: '02',
                            styAct: false,
                            objType: 'csd'

                        }, {
                            text: '两年可用',
                            value: '03',
                            styAct: false,
                            objType: 'csd'

                        }, {
                            text: '三年可用',
                            value: '04',
                            styAct: false,
                            objType: 'csd'

                        },
                    ]
                },
                talentPoolLoading: false,
                talentPoolColumns: [],
                talentPoolTableData: [],
                searchQuery: {
                    jobnumber: localStorage.getItem("jobNum"),
                    deptList: [],
                    isDown: 'Y',
                    bzType: 'Y',
                    isOneYearWorker: '',
                    threeYearNoPromotion: '',
                    teamFW: [],
                    honor: '',
                    xl: [],
                    teamNums: [],
                    jgg: [],
                    isHaveReserve: '',
                    csd: [],
                    isYoung: '',
                    beYounger: []
                },
                readySelectDept: [],
                bzType: '',
                totalNumber: 0
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
                this.bzType = localStorage.getItem("bzType")
            },
            //表格表体样式
            columnCellworkAge() {
                return "bodyStye"
            },
            jiegouTopClick() {
                this.jiegouTop = !this.jiegouTop
            },
            tuanduiTopClick() {
                this.tuanduiTop = !this.tuanduiTop
            },
            rencaiTopClick() {
                this.rencaiTop = !this.rencaiTop
            },
            seltcetitemClick(obj) {
                obj.styAct = !obj.styAct
                let stopQuery = false
                for (let key in this.searchQuery) {
                    if (obj.objType == key) {
                        switch (key) {
                            case 'isOneYearWorker':
                                if (!this.searchQuery[key]) {
                                    this.searchQuery[key] = 'Y'
                                } else {
                                    this.searchQuery[key] = ''
                                }
                                break;
                            case 'threeYearNoPromotion':
                                if (!this.searchQuery[key]) {
                                    this.searchQuery[key] = 'Y'
                                } else {
                                    this.searchQuery[key] = ''
                                }
                                break;
                            case 'beYounger':
                                let younset = new Set(this.searchQuery[key]);
                                if (younset.has(obj.value)) {
                                    younset.delete(obj.value);
                                } else {
                                    younset.add(obj.value);
                                }
                                this.searchQuery[key] = Array.from(younset)
                                break;
                            case 'csd':
                                let csdset = new Set(this.searchQuery[key]);
                                if (csdset.has(obj.value)) {
                                    csdset.delete(obj.value);
                                } else {
                                    csdset.add(obj.value);
                                }
                                this.searchQuery[key] = Array.from(csdset)
                                break;
                            case 'xl':
                                let xlset = new Set(this.searchQuery[key]);
                                if (xlset.has(obj.value[0])) {
                                    for (let i in obj.value) {
                                        xlset.delete(obj.value[i]);
                                    }
                                } else {
                                    for (let i in obj.value) {
                                        xlset.add(obj.value[i]);
                                    }
                                }
                                this.searchQuery[key] = Array.from(xlset)
                                break;
                            case 'isYoung':
                                if (!this.searchQuery[key]) {
                                    this.searchQuery[key] = obj.value
                                    if (obj.value == 'Y') {
                                        this.showData.isYoung[1].styAct = true
                                        this.showData.isYoung[1].styDisabled = true
                                    } else {
                                        this.showData.isYoung[0].styAct = true
                                        this.showData.isYoung[0].styDisabled = true
                                    }
                                } else {
                                    if (this.searchQuery[key] != obj.value) {
                                        obj.styAct = !obj.styAct
                                        stopQuery = true
                                        return
                                    }
                                    if (obj.value == 'Y') {
                                        this.showData.isYoung[1].styAct = false
                                        this.showData.isYoung[1].styDisabled = false
                                    } else {
                                        this.showData.isYoung[0].styAct = false
                                        this.showData.isYoung[0].styDisabled = false
                                    }
                                    this.searchQuery[key] = ''
                                }
                                break;
                            case 'isHaveReserve':
                                if (!this.searchQuery[key]) {
                                    this.searchQuery[key] = obj.value
                                    if (obj.value == 'Y') {
                                        this.showData.isHaveReserve[1].styAct = true
                                        this.showData.isHaveReserve[1].styDisabled = true
                                    } else {
                                        this.showData.isHaveReserve[0].styAct = true
                                        this.showData.isHaveReserve[0].styDisabled = true
                                    }
                                } else {
                                    if (this.searchQuery[key] != obj.value) {
                                        obj.styAct = !obj.styAct
                                        stopQuery = true
                                        return
                                    }
                                    if (obj.value == 'Y') {
                                        this.showData.isHaveReserve[1].styAct = false
                                        this.showData.isHaveReserve[1].styDisabled = false
                                    } else {
                                        this.showData.isHaveReserve[0].styAct = false
                                        this.showData.isHaveReserve[0].styDisabled = false
                                    }
                                    this.searchQuery[key] = ''

                                }
                                break;
                            case 'teamNums':
                                if (!this.searchQuery[key].length) {
                                    this.searchQuery[key].push(obj.value)
                                } else {
                                    let deleteFlag = false
                                    for (let i in this.searchQuery[key]) {
                                        if (this.searchQuery[key][i].down == obj.value.down) {
                                            deleteFlag = true
                                            this.searchQuery[key].splice(i, 1)
                                            break
                                        }
                                    }
                                    if (!deleteFlag) {
                                        this.searchQuery[key].push(obj.value)
                                    }
                                }
                                break;
                            case 'jgg':
                                let jggset = new Set(this.searchQuery[key]);
                                if (jggset.has(obj.value[0])) {
                                    for (let i in obj.value) {
                                        jggset.delete(obj.value[i]);
                                    }
                                } else {
                                    for (let i in obj.value) {
                                        jggset.add(obj.value[i]);
                                    }
                                }
                                this.searchQuery[key] = Array.from(jggset)
                                break;
                            case 'teamFW':
                                let teamFWset = new Set(this.searchQuery[key]);
                                if (teamFWset.has(obj.value)) {
                                    teamFWset.delete(obj.value);
                                } else {
                                    teamFWset.add(obj.value);
                                }
                                this.searchQuery[key] = Array.from(teamFWset)
                                break;
                            case 'honor':
                                if (!this.searchQuery[key]) {
                                    this.searchQuery[key] = 'Y'
                                } else {
                                    this.searchQuery[key] = ''
                                }
                                break;
                            default:
                                break;
                        }
                    }
                }
                if (!stopQuery) {
                    // this.queryFindCadrePoolBySearch()
                }
            },
            //处理表头字段显示与隐藏
            tableHeaderSet(obj) {
                this.talentPoolColumns = [{
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
                        titleCellClassName: "titleclass",
                    },
                    {
                        field: "name",
                        title: "姓名",
                        width: 70,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                        isFrozen: true,
                        formatter: function(rowData, rowIndex, pagingIndex, field) {
                            return `<span class='bluejunpColor'>${rowData[field]}</span>`;
                        },
                    },
                    {
                        field: "jobnumber",
                        title: "工号",
                        width: 70,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    }, {
                        field: "dept",
                        title: "部门",
                        width: 150,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    }, {
                        field: "post",
                        title: "岗位",
                        width: 70,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    }, {
                        field: "zj",
                        title: "职级",
                        width: 70,
                        titleAlign: "center",
                        columnAlign: "center",
                        isResize: true,
                        titleCellClassName: "titleclass",
                    },
                ]
                for (let key in obj) {
                    switch (key) {
                        case 'jobAge':
                            if (obj[key]) {
                                this.talentPoolColumns.push({
                                    field: "jobAge",
                                    title: "司龄",
                                    width: 70,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                })
                            }
                            break;
                        case 'zjAge':
                            if (obj[key]) {
                                this.talentPoolColumns.push({
                                    field: "zjAge",
                                    title: "职级工龄",
                                    width: 70,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                })
                            }
                            break;
                        case 'teamFw':
                            if (obj[key]) {
                                this.talentPoolColumns.push({
                                    field: "teamFw",
                                    title: "团队氛围",
                                    width: 70,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                })
                            }
                            break;
                        case 'honor':
                            if (obj[key]) {
                                this.talentPoolColumns.push({
                                    field: "honor",
                                    title: "个人荣誉",
                                    width: 70,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                })
                            }
                            break;
                        case 'xl':
                            if (obj[key]) {
                                this.talentPoolColumns.push({
                                    field: "xl",
                                    title: "学历",
                                    width: 70,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                })
                            }
                            break;
                        case 'teamNums':
                            if (obj[key]) {
                                this.talentPoolColumns.push({
                                    field: "teamNums",
                                    title: "团队规模",
                                    width: 70,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                })
                            }
                            break;
                        case 'jrzName':
                            if (obj[key]) {
                                this.talentPoolColumns.push({
                                    field: "jrzName",
                                    title: "继任者1姓名",
                                    width: 120,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                })
                            }
                            break;
                        case 'csd':
                            if (obj[key]) {
                                this.talentPoolColumns.push({
                                    field: "csd",
                                    title: "继任者1成熟度",
                                    width: 120,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                }, )
                            }
                            break;
                        case 'young':
                            if (obj[key]) {
                                this.talentPoolColumns.push({
                                    field: "young",
                                    title: "青苗",
                                    width: 70,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                })
                            }
                            break;
                        case 'birth':
                            if (obj[key]) {
                                this.talentPoolColumns.push({
                                    field: "birth",
                                    title: "出生日期",
                                    width: 70,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                })
                            }
                            break;
                        case 'jgg':
                            if (obj[key]) {
                                this.talentPoolColumns.push({
                                    field: "jgg",
                                    title: "九宫格",
                                    width: 70,
                                    titleAlign: "center",
                                    columnAlign: "center",
                                    isResize: true,
                                    titleCellClassName: "titleclass",
                                })
                            }
                            break;
                        default:
                            break;
                    }
                }
            },
            queryFindCadrePoolBySearch() {
                this.talentPoolLoading = true
                this.searchQuery.deptList = this.readySelectDept
                this.searchQuery.bzType = this.bzType
                findCadrePoolBySearch(this.searchQuery).then(res => {
                    if (res.code == "1000") {
                        this.tableHeaderSet(res.obj[0])
                        this.talentPoolTableData = res.obj
                        this.totalNumber = res.obj.length
                    } else {
                        Toast.fail(res.msg);
                    }
                    this.talentPoolLoading = false
                })
            },
            rowClick(rowIndex, rowData, column) {
                rowData.a0190 = rowData.jobnumber
                this.$router.push({
                    name: 'cadreArchivesInfo',
                    params: {
                        managerInfo: rowData
                    }
                })
            },
            // 重置搜索
            restSearchQuery() {
                for (let key in this.searchQuery) {
                    if (key == 'jobnumber' || key == 'deptList' || key == 'isDown' || key == 'bzType') {} else {
                        if (Array.isArray(this.searchQuery[key])) {
                            this.searchQuery[key] = []
                        } else {
                            this.searchQuery[key] = ''
                        }
                    }
                }
                for (let keyin in this.showData) {
                    if (Array.isArray(this.showData[keyin])) {
                        let arr = this.showData[keyin]
                        arr.forEach(item => {
                            if (keyin == 'isHaveReserve' || keyin == 'isYoung') {
                                item.styDisabled = false
                            }
                            item.styAct = false
                        })
                    } else {
                        this.showData[keyin].styAct = false
                    }
                }
                this.jiegouTop = true
                this.tuanduiTop = true
                this.rencaiTop = true
            }
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {
            this.init()
        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            this.$refs.adresResultsTanbber.changtab("talentPool");
            this.queryFindCadrePoolBySearch()
        },
        beforeCreate() {}, //生命周期 - 创建之前
        beforeMount() {}, //生命周期 - 挂载之前
        beforeUpdate() {}, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        beforeDestroy() {}, //生命周期 - 销毁之前
        destroyed() {}, //生命周期 - 销毁完成
        activated() {
            let refrashFlag = this.$route.params.refrashFlag;
            if (refrashFlag) {
                this.init()
                this.queryFindCadrePoolBySearch()
            }
            this.reFredText = false
            setTimeout(() => {
                this.reFredText = true
                this.$nextTick(() => {
                    this.$refs.adresResultsTanbber.changtab("talentPool");
                })
            }, 200);
        }, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>
<style lang='stylus'>
    .titleTop {
        font-size: 14px;
        border: 1px solid #ccc;
        background-color: #D2691E;
        color: #fff;
        padding: 5px;
        font-weight: 700;
    }

    .titleSecond {
        font-size: 12px;
        padding: 3px 8px;
        background-color: #008080;
        color: #fff;
        margin: 3px;
        text-align: center;
    }

    .simpleSwipe {
        max-width: 100%;
        overflow-x: auto;
        /*x轴超出后可滚动*/
        white-space: nowrap;
        /*实现子元素不换行*/
        overflow-y: hidden;
    }

    .seltcetitem {
        font-size: 11px;
        display: inline-block;
        padding: 5px 12px;
        background-color: #87CEFA;
        margin-left: 9px;
        margin-top: 4px;
        margin-bottom: 6px;

        color: #0000CD;
        border-radius: 11px;
    }

    .seltcetitemAct {
        font-size: 11px;
        display: inline-block;
        padding: 5px 12px;
        background-color: #FFA500;
        margin-left: 9px;
        margin-top: 4px;
        margin-bottom: 6px;
        color: #fff;
        border-radius: 11px;
    }

    .seltcetitemDis {
        font-size: 11px;
        display: inline-block;
        padding: 5px 12px;
        background-color: #C0C0C0;
        margin-left: 9px;
        margin-top: 4px;
        margin-bottom: 6px;
        color: #696969;
        border-radius: 11px;
    }

    .bodyStye {
        background-color: #ffebcd;
        font-size 12px;
    }

    .titleclass {
        background-color: #dc7272;
        color: #ffffff;
        font-size 12px;
    }

    .butntalentPool {
        padding: 10px;
        display: flex;
        justify-content: space-between;
    }

    .talentchoseBtn {
        display: inline-block;
        width: 23vh;
        height: 4vh;
        text-align: center;
        border: 1px solid #ccc;
        line-height: 4vh;
        color: #fff;
        border-radius: 12px;
    }

    .bluejunpColor {
        color: blue;
    }

    .totalNumberSty {
        font-size: 13px;
        color: #808080;
        margin: auto;
        display: table;
    }

    //@import url(); 引入公共css类
</style>
