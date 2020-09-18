<template>
    <div>
        <div class="header">
            <van-field v-model="form.deptName" @click="pickDept" label="部门" placeholder="请选择部门" />
            <van-field v-model="form.workNum" label="工号" placeholder="请输入工号" />
            <van-field v-model="form.perName" label="姓名" placeholder="请输入姓名" />
            <!-- input -->
            <van-field v-for="item in formList" :key="item.label" v-model="item.value" :label="item.label" :placeholder="item.placeholder"/>
            <!-- 时间 -->
            <van-field v-for="item in timeList" :key="item.label" v-model="item.value" :label="item.label" :placeholder="item.placeholder" readonly @click="pickerTime(item)"/>
            <!-- 下拉选择是否 -->
            <van-field v-for="item in selectList" :key="item.label" v-model="item.value" :label="item.label" :placeholder="item.placeholder" readonly @click="selectVal(item)"/>
            <!-- 下拉选择男女 -->
            <van-field v-for="item in sexList" :key="item.label" v-model="item.value" :label="item.label" :placeholder="item.placeholder" readonly @click="selectSex(item)"/>
            <!-- 下拉选择编制类型 -->
            <van-field v-for="item in bianList" :key="item.label" v-model="item.value" :label="item.label" :placeholder="item.placeholder" readonly @click="selectBian(item)"/>
            <!-- 下拉选择院校性质 -->
            <van-field v-for="item in schoolList" :key="item.label" v-model="item.value" :label="item.label" :placeholder="item.placeholder" readonly @click="selectSchool(item)"/>
            <!-- 下拉选择专业线标签 -->
            <van-field v-for="item in zhuanyeList" :key="item.label" v-model="item.value" :label="item.label" :placeholder="item.placeholder" readonly @click="selectZhuanye(item)"/>
            <!-- 下拉选择当前状态 -->
            <van-field v-for="item in stateList" :key="item.label" v-model="item.value" :label="item.label" :placeholder="item.placeholder" readonly @click="selectState(item)"/>
            <!-- 下拉选择人员类别 -->
            <van-field v-for="item in personList" :key="item.label" v-model="item.value" :label="item.label" :placeholder="item.placeholder" readonly @click="selectPerson(item)"/>
            <div class="btn">
                <van-button type="primary" color="#fc5f10" size="small" @click="search">查询</van-button>
                <van-button type="primary" color="#fc5f10" size="small" @click="reset">重置</van-button>
                <van-button type="primary" color="#fc5f10" size="small" @click="moreSearch">更多</van-button>
                <van-button type="primary" color="#fc5f10" size="small" @click="setMenu">设置</van-button>
            </div>
        </div>
        <!-- 下拉加载 -->
        <van-list
        v-model="loading"
        :finished="finished"
        :offset="20"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onLoad"
        >
            <div class="table">
                <v-table 
                ref="table" 
                title-bg-color="#ccc"
                :columns="columns"
                :table-data="tableData" 
                row-hover-color="#eee" 
                row-click-color="#edf7ff" 
                :cell-edit-done="cellEditDone"
                :row-click="rowClick"
                @sort-change="sortChange"
                :paging-index="(pageIndex-1)*pageSize"   	
                ></v-table>	
            </div>
        </van-list>
        <!-- <div class="mt20 mb20 bold" style="margin-top:10px;">
            <v-pagination @page-change="pageChange" @page-size-change="pageSizeChange" :total="total" size='small' :page-size="pageSize" :layout="['prev', 'pager', 'next']"></v-pagination>
        </div>    -->
        <!-- 多选弹出框 -->
        <van-popup v-model="showPick" position="top" :style="{ height: '70%' }" get-container="body" closeable>
            <div class="pick">
                <van-field v-model="form.state" label="当前状态" placeholder="请选择" readonly @click-input="selectState"/>
                <van-field v-model="form.sex" label="性别" placeholder="请选择" readonly @click-input="selectSex"/>
                <van-field v-model="form.age" label="年龄" placeholder="请输入年龄" />
                <van-field v-model="form.edu" label="最高学历" placeholder="请选择" readonly @click-input="selectXueli"/>
                <van-field v-model="form.xingzhi" label="院校性质" placeholder="请选择" readonly @click-input="selectSchool"/>
                <van-field v-model="form.school" label="毕业院校" placeholder="请输入毕业院校" />
                <van-field v-model="form.zhuanye" label="专业" placeholder="请输入专业" />
                <van-field v-model="form.type" label="编制类型" placeholder="请选择" readonly @click-input="selectBian"/>
                <van-field v-model="form.post" label="岗位" placeholder="请输入岗位" />
                <van-field v-model="form.zhilei" label="职类" placeholder="请选择" />
                <van-field v-model="form.zhiji" label="职级" placeholder="请输入职级" />
                <van-field v-model="form.fenlei1" label="岗位分类一" placeholder="请输入岗位分类一" readonly @click-input="selectFl1"/>
                <van-field v-model="form.fenlei2" label="岗位分类二" placeholder="请输入岗位分类二" />
                <van-field v-model="form.entryTime" label="入司日期" placeholder="请选择" readonly @click-input="pickerTime"/>
                <van-field v-model="form.silin" label="司龄" placeholder="请输入司龄" />
                <van-field v-model="form.endTime" label="试用结束日期" placeholder="请选择" readonly @click-input="endTime"/>
                <van-field v-model="form.zzTime" label="试用转正日期" placeholder="请选择" readonly @click-input="startTime"/>
                <van-field v-model="form.biaoqian" label="专业线标签" placeholder="请选择" readonly @click-input="selectZhuanye"/>
                <van-field v-model="form.junren" label="是否为退伍军人" placeholder="请选择" readonly @click-input="selectVal"/>
                <van-field v-model="form.qinshu" label="是否在本公司有亲属关系" placeholder="请选择" readonly @click-input="selectQs"/>
                <van-field v-model="form.pxxieyi" label="是否签订培训协议" placeholder="请选择" readonly @click-input="selectPxxy"/>
                <van-field v-model="form.jyxieyi" label="是否签订竞业协议" placeholder="请选择" readonly @click-input="selectJyxy"/>
                <van-field v-model="form.danwei" label="工作单位" placeholder="请输入工作单位" />
                <van-field v-model="form.zjmingcheng" label="职级名称" placeholder="请输入职级名称" />
                <van-field v-model="form.perLb" label="人员类别" placeholder="请选择" readonly @click="selectPerson"/>
                <!-- <van-button type="primary" size="mini" @click="checkAll">全选</van-button> -->
                <van-button type="info" size="mini" color="#fc5f10" @click="searchMore">查询</van-button>
                <!-- <van-button type="info" size="mini" @click="confirmPick">确定</van-button> -->
            </div>
        </van-popup>
        <!-- 排序弹窗 -->
        <van-popup v-model="showPx" position="top" :style="{ height: '70%' }" get-container="body" closeable>
            <div class="pick">
                <van-checkbox-group v-model="results" ref="checkboxGroup">
                    <van-checkbox name="zt" :disabled="false1">当前状态</van-checkbox>
                    <van-checkbox name="xb" :disabled='false2'>性别</van-checkbox>
                    <van-checkbox name="nl" :disabled='false3'>年龄</van-checkbox>
                    <van-checkbox name="zgxl" :disabled='false4'>最高学历</van-checkbox>
                    <van-checkbox name="yxxz" :disabled='false5'>院校性质</van-checkbox>
                    <van-checkbox name="byyx" :disabled='false6'>毕业院校</van-checkbox>
                    <van-checkbox name="zy" :disabled='false7'>专业</van-checkbox>
                    <van-checkbox name="bzlx" :disabled='false8'>编制类型</van-checkbox>
                    <!-- <van-checkbox name="gw" :disabled='false9'>岗位</van-checkbox> -->
                    <van-checkbox name="gjzl" :disabled='false10'>职类</van-checkbox>
                    <!-- <van-checkbox name="gjzj" :disabled='false11'>职级</van-checkbox> -->
                    <van-checkbox name="gwfly" :disabled='false12'>岗位分类一</van-checkbox>
                    <van-checkbox name="gwfle" :disabled='false13'>岗位分类二</van-checkbox>
                    <!-- <van-checkbox name="rsrq" :disabled='false14'>入司日期</van-checkbox> -->
                    <van-checkbox name="sl" :disabled='false15'>司龄</van-checkbox>
                    <van-checkbox name="syjsrq" :disabled='false16'>试用结束日期</van-checkbox>
                    <van-checkbox name="syzzrq" :disabled='false17'>试用转正日期</van-checkbox>
                    <van-checkbox name="zyxbq" :disabled='false18'>专业线标签</van-checkbox>
                    <van-checkbox name="sfwtwjr" :disabled='false19'>是否为退伍军人</van-checkbox>
                    <van-checkbox name="sfyqsgx" :disabled='false20'>是否在本公司有亲属关系</van-checkbox>
                    <van-checkbox name="sfqdpxxy" :disabled='false21'>是否签订培训协议</van-checkbox>
                    <van-checkbox name="sfqdjyxy" :disabled='false22'>是否签订竞业协议</van-checkbox>
                    <van-checkbox name="gzdw" :disabled='false23'>工作单位</van-checkbox>
                    <van-checkbox name="zjmc" :disabled='false24'>职级名称</van-checkbox>
                    <van-checkbox name="rylb" :disabled='false25'>人员类别</van-checkbox>
                </van-checkbox-group>
                <!-- <van-button type="primary" size="mini" @click="checkAll">全选</van-button> -->
                <van-button type="info" size="mini" @click="confirmPick">确定</van-button>
            </div>
        </van-popup>
        <!-- 选择部门弹出框 -->
        <van-popup v-model="showPickDept" position="top" :style="{ height: '70%' }" get-container="body" closeable>
            <el-tree 
            :data="deptData" 
            :props="props" 
            @node-click="handleNodeClick" 
            @getCheckedKeys="getCheckedKeys(leafOnly)"
            show-checkbox></el-tree>
        </van-popup>
        <!-- 弹出时间选择框 -->
        <van-popup v-model="showTime" position="bottom" :style="{ height: '50%' }" >
            <van-datetime-picker
            v-model="currentDate"
            type="date"
            title="选择年月日"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="confirm"
            @cancel="cancel"
            />
        </van-popup>
        <!-- 弹出时下拉选择是否 -->
        <van-popup v-model="showSelect" position="bottom" :style="{ height: '50%' }" >
            <van-picker
            title="标题"
            show-toolbar
            :columns="column1"
            @confirm="onConfirm1"
            @cancel="onCancel1"
            />
        </van-popup>
        <!-- 弹出时下拉选择男女 -->
        <van-popup v-model="showSex" position="bottom" :style="{ height: '50%' }" >
            <van-picker
            title="标题"
            show-toolbar
            :columns="column2"
            @confirm="onConfirm2"
            @cancel="onCancel2"
            />
        </van-popup>
        <!-- 弹出时下拉选择编制类型 -->
        <van-popup v-model="showBianzhi" position="bottom" :style="{ height: '50%' }" >
            <van-picker
            title="标题"
            show-toolbar
            :columns="column3"
            @confirm="onConfirm3"
            @cancel="onCancel3"
            />
        </van-popup>
        <!-- 弹出时下拉选择院校性质 -->
        <van-popup v-model="showSchool" position="bottom" :style="{ height: '50%' }" >
            <van-picker
            title="标题"
            show-toolbar
            :columns="column4"
            value-key="content"
            @confirm="onConfirm4"
            @cancel="onCancel4"
            />
        </van-popup>
        <!-- 弹出时下拉选择学历 -->
        <van-popup v-model="showXueli" position="bottom" :style="{ height: '50%' }" >
            <van-picker
            title="标题"
            show-toolbar
            :columns="column8"
            value-key="content"
            @confirm="onConfirm8"
            @cancel="onCancel8"
            />
        </van-popup>
        <!-- 弹出时下拉选择专业线标管 -->
        <van-popup v-model="showZhuanye" position="bottom" :style="{ height: '50%' }" >
            <van-picker
            title="标题"
            show-toolbar
            :columns="column5"
            value-key="content"
            @confirm="onConfirm5"
            @cancel="onCancel5"
            />
        </van-popup>
        <!-- 弹出时下拉选择当前状态 -->
        <van-popup v-model="showState" position="bottom" :style="{ height: '50%' }" >
            <van-picker
            title="标题"
            show-toolbar
            :columns="column6"
            value-key="content"
            @confirm="onConfirm6"
            @cancel="onCancel6"
            />
        </van-popup>
        <!-- 弹出时下拉选择人员类别 -->
        <van-popup v-model="showLeibie" position="bottom" :style="{ height: '50%' }" >
            <van-picker
            title="标题"
            show-toolbar
            :columns="column7"
            value-key="content"
            @confirm="onConfirm7"
            @cancel="onCancel7"
            />
        </van-popup>
        <!-- 弹出时下拉选择岗位分类1 -->
        <van-popup v-model="showFenlei1" position="bottom" :style="{ height: '50%' }" >
            <van-picker
            title="标题"
            show-toolbar
            :columns="column9"
            value-key="content"
            @confirm="onConfirm9"
            @cancel="onCancel9"
            />
        </van-popup>
    </div>
</template>
<script>
import { Popup,Checkbox,CheckboxGroup,List } from 'vant'
import { queryDept,getSelectVal,getOrz,queryFen2,queryPerson } from './api'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
        loading: false,
        finished: false,
        form:{
            deptName: '',
            workNum: '',
            perName: '',
            state: '',
            sex: '',
            age: '',
            edu: '',
            xingzhi: '',
            school: '',
            zhuanye: '',
            type: '',
            post: '',
            zhilei: '',
            zhiji: '',
            fenlei1: '',
            fenlei2: '',
            entryTime: '',
            silin: '',
            endTime: '',
            zzTime: '',
            biaoqian: '',
            junren: '',
            qinshu: '',
            pxxieyi: '',
            jyxieyi: '',
            danwei: '',
            zjmingcheng: '',
            perLb: '',
        },
        deptData: [],
        showPick: false, //多选弹窗
        showSelect: false, //下拉选择
        showTime: false, //时间选择弹窗
        showPickDept: false, //选择部门弹窗
        showSex: false, //选择男女
        showBianzhi: false, //选择编制类型
        showSchool: false, //选择院校性质
        showZhuanye: false, //选择专业线
        showState: false, //当前状态
        showLeibie: false, //人员类别
        showXueli: false, //最高学历
        showFenlei1: false, //岗位分类1
        showPx: false, //排序弹窗
        result: [], //多选框
        results: [], //多选框
        false1:false,false2:false,false3:false,false4:false,false5:false,false6:false,false7:false,false8:false,false9:false,
        false10:false,false11:false,false12:false,false13:false,false14:false,false15:false,false16:false,false17:false,false18:false,
        false19:false,false20:false,false21:false,false22:false,false23:false,false24:false,false25:false,
        pickFalse: '',
        total:0,
        pageIndex:1,
        pageSize:10,
        tableData: [],
        columns: [
                {
                    field: 'custome', width: 50, titleAlign: 'center', columnAlign: 'center',title: '序号',
                    formatter: function (rowData, index) {
                        return index + 1
                    }, isResize:true,
                },
                {
                    field: 'jobnumber',
                    title: '工号',
                    width: 100,
                    titleAlign: 'center',
                    columnAlign: 'center',
                    formatter: function(rowData, rowIndex, pagingIndex, field) {
                        return `<span style="color:#4078c0;">${rowData[field]}</span>`;
                    },
                    isResize: true,
                    // isFrozen: true,
                },
                {
                    field: 'name',
                    title: '姓名',
                    width: 150,
                    titleAlign: 'center',
                    columnAlign: 'center',
                    isResize: true
                },
                {
                    field: 'department',
                    title: '部门',
                    width: 150,
                    titleAlign: 'center',
                    columnAlign: 'center',
                    isResize: true
                },
                {
                    field: 'post',
                    title: '岗位',
                    width: 150,
                    titleAlign: 'center',
                    columnAlign: 'center',
                    isResize: true
                },
                {
                    field: 'rank',
                    title: '职级',
                    width: 150,
                    titleAlign: 'center',
                    columnAlign: 'center',
                    isResize: true
                },
                {
                    field: 'rsrq',
                    title: '入司日期',
                    width: 150,
                    titleAlign: 'center',
                    columnAlign: 'center',
                    isResize: true
                },					
        ],
        props: {
          label: 'content',
          children: 'depts'
        },
        count: 1,
        formList: [], //input框组件
        timeList: [], //时间框组件
        selectList: [], //下拉选择是否
        sexList: [], //下拉选择男女
        bianList: [], //下拉选择编制类型
        schoolList: [], //下拉选择院校性质
        zhuanyeList: [], //下拉选择专业线
        stateList: [], //下拉选择当前状态
        personList: [], //下拉选择人员
        minDate: new Date(2020, 0, 1),
        maxDate: new Date(2025, 10, 1),
        currentDate: new Date(),
        column1:[
            {'keyId':'1','text':'是'},
            {'keyId':'2','text':'否'}
        ],
        column2:[
            {'keyId':'1','text':'男'},
            {'keyId':'2','text':'女'}
        ],
        column3:[
            {'keyId':'01','text':'编制内'},
            {'keyId':'02','text':'编制外'}
        ],
        column4:[], //院校性质
        column5:[], //专业线
        column6:[], //当前状态
        column7:[], //人员类别
        column8:[], //最高学历
        column9:[], //岗位分类1
        sex: '', //传后台性别值
        bianzhi: '', //传后台编制类型值
        schoolVal: '', //传后台院校性质值
        zhuanyeVal: '', //传后台专业线标签
        stateVal: '', //传后台当前状态
        leibieVal: '', //传后台当前状态
        junrenVal: '', //传后台是否退伍军人
        qinshuVal: '', //传后台是否有亲属关系
        peixunVal: '', //传后台是否签订培训协议
        jingyeVal: '', //传后台是否签订竞业协议
        xueliVal: '', //传后台是否最高学历值
        fenlei1Val: '', //传后台岗位分类1值
        selectFlag: '', //是否
        timeFlag: '', //时间选择标识
    };
  },
  created(){
    this.getState()
    // this._getOrz()
    this._queryPerson() //获取人员
  },
  methods:{
    //获取部门和表格数据
    // _queryDept(){
    //     let queryData = {
    //         jobnumber:9107021
    //     }
    //     queryDept(queryData).then(res=>{
    //         this.tableData = res.obj.employees
    //     })
    // },
    //获取当前状态的值 
    getState(){
        getSelectVal().then(res=>{
            this.column6 = res.obj.dqzt
            this.column4 = res.obj.yxxz
            this.column5 = res.obj.zyxbq
            this.column7 = res.obj.rylb
            this.column8 = res.obj.zgxl
            this.column9 = res.obj.gwfl
        })
    },
    //获取组织下的部门
    // _getOrz(){
    //     let queryData = {
    //         jobnumber: 6006212
    //         // jobnumber: 9107021
    //     }
    //     getOrz(queryData).then(res=>{
    //         this.deptData.push(res.obj.departments)
    //         this.tableData = res.obj.employees
    //     })
    // },
    _queryPerson(){
        let queryData = {
            isAll: 'Y',
            pageNum: 1
        }
        queryPerson(queryData).then(res=>{
            this.tableData = res.obj
        })
    },
    //重置
    reset(){
        this.form = {
            deptName: '',
            workNum: '',
            perName: '',
        }
    },
    //更多查询条件
    moreSearch(){
        this.showPick = true
    },
    //设置
    setMenu(){
        this.showPx = true
    },
    //查询添加表格
    search(){
        console.log(this.formList)
        // let obj = {
        //     field: 'a0144',
        //     title: '入司日期',
        //     width: 150,
        //     titleAlign: 'center',
        //     columnAlign: 'center',
        //     isResize: true
        // }
        // this.columns.push(obj)
    },
    //全选
    checkAll() {
      this.$refs.checkboxGroup.toggleAll(true);
    },
    //弹窗里条件的查询
    searchMore() {
        console.log(this.form)
        // console.log(this.result)
    },
    //确定
    confirmPick(){
        console.log(this.results)
        for (var i in this.results){
            // if(this.result[i] == 'zt'){
            //     let obj1 = {value:'',label:'当前状态'}
            //     this.formList.push(obj1)
            // }
            switch(this.results[i]){
                case 'zt':
                    let obj1 = {
                        field: 'currentState',title: '当前状态',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
                    }
                    this.columns.push(obj1)
                    this.false1 = true
                break;
                case 'xb':
                    let obj2 = {
                        field: 'sex',title: '性别',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
                    }
                    this.columns.push(obj2)
                    this.false2 = true
                break;
                case 'nl':
                    let obj3 = {
                        field: 'age',title: '年龄',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
                    }
                    this.columns.push(obj3)
                    this.false3 = true
                break;
                case 'zgxl':
                    let obj4 = {
                        field: 'education',title: '最高学历',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
                    }
                    this.columns.push(obj4)
                    this.false4 = true
                break;
                case 'yxxz':
                    let obj5 = {
                        field: 'schoolProp',title: '院校性质',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
                    }
                    this.columns.push(obj5)
                    this.false5 = true
                break;
                case 'byyx':
                    let obj6 = {
                        field: 'schoolName',title: '毕业院校',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
                    }
                    this.columns.push(obj6)
                    this.false6 = true
                break;
                case 'zy':
                    let obj7 = {
                        field: 'walk',title: '专业',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
                    }
                    this.columns.push(obj7)
                    this.false7 = true
                break;
                case 'bzlx':
                    let obj8 = {
                        field: 'bzlx',title: '编制类型',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
                    }
                    this.columns.push(obj8)
                    this.false8 = true
                break;
                case 'gw':
                    let obj9 = {
                        field: 'post',title: '岗位',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
                    }
                    this.columns.push(obj9)
                    this.false9 = true
                break;
                case 'gjzl':
                    let obj10 = {
                        field: 'category',title: '职类',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
                    }
                    this.columns.push(obj10)
                    this.false10 = true
                break;
                case 'gjzj':
                    let obj11 = {
                        field: 'rank',title: '职级',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
                    }
                    this.columns.push(obj11)
                    this.false11 = true
                break;
                case 'gwfly':
                    let obj12 = {
                        field: 'postOne',title: '岗位分类一',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
                    }
                    this.columns.push(obj12)
                    this.false12 = true
                break;
                case 'gwfle':
                    let obj13 = {
                        field: 'postTwo',title: '岗位分类二',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
                    }
                    this.columns.push(obj13)
                    this.false13 = true
                break;
                case 'rsrq':
                    let obj14 = {
                        field: 'rsrq',title: '入司日期',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
                    }
                    this.columns.push(obj14)
                    this.false14 = true
                break;
                case 'sl':
                    let obj15 = {
                        field: 'entryAge',title: '司龄',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
                    }
                    this.columns.push(obj15)
                    this.false15 = true
                break;
                case 'syjsrq':
                    let obj16 = {
                        field: 'syjsrq',title: '试用结束日期',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
                    }
                    this.columns.push(obj16)
                    this.false16 = true
                break;
                case 'syzzrq':
                    let obj17 = {
                        field: 'sjzzrq',title: '试用转正日期',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
                    }
                    this.columns.push(obj17)
                    this.false17 = true
                break;
                case 'zyxbq':
                    let obj18 = {
                        field: 'zyxbq',title: '专业线标签',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
                    }
                    this.columns.push(obj18)
                    this.false18 = true
                break;
                case 'sfwtwjr':
                    let obj19 = {
                        field: 'isVeteran',title: '是否为退伍军人',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
                    }
                    this.columns.push(obj19)
                    this.false19 = true
                break;
                case 'sfyqsgx':
                    let obj20 = {
                        field: 'isPerson',title: '是否在本公司有亲属关系',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
                    }
                    this.columns.push(obj20)
                    this.false20 = true
                break;
                case 'sfqdpxxy':
                    let obj21 = {
                        field: 'isTrain',title: '是否签订培训协议',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
                    }
                    this.columns.push(obj21)
                    this.false21 = true
                break;
                case 'sfqdjyxy':
                    let obj22 = {
                        field: 'isCompete',title: '是否签订竞业协议',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
                    }
                    this.columns.push(obj22)
                    this.false22 = true
                break;
                case 'gzdw':
                    let obj23 = {
                        field: 'company',title: '工作单位',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
                    }
                    this.columns.push(obj23)
                    this.false23 = true
                break;
                case 'zjmc':
                    let obj24 = {
                        field: 'zcName',title: '职级名称',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
                    }
                    this.columns.push(obj24)
                    this.false24 = true
                break;
                case 'rylb':
                    let obj25 = {
                        field: 'personType',title: '人员类别',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
                    }
                    this.columns.push(obj25)
                    this.false25 = true
                break;
            }
        }
        this.results = []
        this.showPx = false
    },
    //表格行点击事件
    rowClick(rowIndex, rowData, column){
        // console.log(rowData)
        // console.log(this.save_jobNum)
        this.save_jobNum(rowData.jobnumber)
        this.$router.push({name:'basicMsg'})
    },
    //表格编辑
    cellEditDone(){

    },
    //表格排序
    sortChange(){

    },
    //切换页码
    pageChange(){

    },
    //切换页码
    pageChange(){

    },
    pageSizeChange(){

    },
    //选择部门
    pickDept(){
        this.showPickDept = true
    },
    //选择时触发
    handleCheckChange(data, checked, indeterminate) {
    // console.log(data, checked, indeterminate);
    },
    //选择时触发
    handleNodeClick(data) {
        console.log(data);
    },
    //入司时间时间
    pickerTime(){
        this.timeFlag = 1
        this.showTime = true
    },
    //试用结束时间
    endTime(){
        this.timeFlag = 2
        this.showTime = true
    },
    //转正时间
    startTime(){
        this.timeFlag = 3
        this.showTime = true
    },
    //确认选择的时间
    confirm(val){
        // console.log(val)
        if(this.timeFlag == 1){
            this.form.entryTime = this.formatDate(val) 
        }else if(this.timeFlag == 2){
            this.form.endTime = this.formatDate(val) 
        }else if (this.timeFlag == 3){
            this.form.zzTime = this.formatDate(val) 
        }
        this.showTime = false
    },
    //取消选择
    cancel(){
        this.showTime = false
    },
    //转换时间戳
    formatDate(date) {    
        var y = date.getFullYear();    
        var m = date.getMonth() + 1;    m = m < 10 ? '0' + m : m;    
        var d = date.getDate();    d = d < 10 ? ('0' + d) : d;       
        return y + '-' + m + '-' + d 
    },
    //下拉选择是否
    selectVal(){
        this.selectFlag = 1
        this.showSelect = true
    },
    //下拉选择是否有亲属关系
    selectQs(){
        this.selectFlag = 2
        this.showSelect = true
    },
    //下拉选择是否有培训协议
    selectPxxy(){
        this.selectFlag = 3
        this.showSelect = true
    },
    //下拉选择是否有竞业协议
    selectJyxy(){
        this.selectFlag = 4
        this.showSelect = true
    },
    //下拉选择确认
    onConfirm1(picker){
        if(this.selectFlag == 1){
            this.form.junren = picker.text
            this.junrenVal = picker.keyId
        }else if(this.selectFlag == 2){
            this.form.qinshu = picker.text
            this.qinshuVal = picker.keyId
        }else if(this.selectFlag == 3){
            this.form.pxxieyi = picker.text
            this.peixunVal = picker.keyId
        }else if(this.selectFlag == 4){
            this.form.jyxieyi = picker.text
            this.jingyeVal = picker.keyId
        }
        this.showSelect = false
    },
    //取消选择
    onCancel1(){
        this.showSelect = false
    },
    //选择男女
    selectSex(){
        this.showSex = true
    },
    onConfirm2(picker){
        // console.log(picker)
        this.sex = picker.keyId
        this.form.sex = picker.text
        this.showSex = false
    },
    onCancel2(){
        this.showSex = false
    },
    //选择编制类型
    selectBian(){
        this.showBianzhi = true
    },
    onConfirm3(picker){
        // console.log(picker)
        this.bianzhi = picker.keyId
        this.form.type = picker.text
        this.showBianzhi = false
    },
    onCancel3(){
        this.showBianzhi = false
    },
    //选择院校性质
    selectSchool(){
        this.showSchool = true
    },
    onConfirm4(picker){
        // console.log(picker)
        this.schoolVal = picker.code
        this.form.xingzhi = picker.content
        this.showSchool = false
    },
    onCancel4(){
        this.showSchool = false
    },
    //选择专业线标签
    selectZhuanye(){
        this.showZhuanye = true
    },
    onConfirm5(picker){
        // console.log(picker)
        this.zhuanyeVal = picker.code
        this.form.biaoqian = picker.content
        this.showZhuanye = false
    },
    onCancel5(){
        this.showZhuanye = false
    },
    //选择当前状态
    selectState(){
        this.showState = true
    },
    onConfirm6(picker){
        console.log(picker)
        this.stateVal = picker.code
        this.form.state = picker.content
        this.showState = false
    },
    onCancel6(){
        this.showState = false
    },
    //选择人员类别
    selectPerson(){
        this.showLeibie = true
    },
    onConfirm7(picker){
        // console.log(picker)
        this.leibieVal = picker.code
        this.form.perLb = picker.content
        this.showLeibie = false
    },
    onCancel7(){
        this.showLeibie = false
    },
    //选择最高学历
    selectXueli(){
        this.showXueli = true
    },
    onConfirm8(picker){
        // console.log(picker)
        this.xueliVal = picker.code
        this.form.edu = picker.content
        this.showXueli = false
    },
    onCancel8(){
        this.showXueli = false
    },
    //选择岗位分类1
    selectFl1(){
        this.showFenlei1 = true
    },
    onConfirm9(picker){
        // console.log(picker)
        this.fenlei1Val = picker.code
        this.form.fenlei1 = picker.content
        this.showFenlei1 = false
        let queryData = {
            code:this.fenlei1Val
        }
        queryFen2(queryData).then(res=>{

        })
    },
    onCancel9(){
        this.showFenlei1 = false
    },
    //获取所选中的节点数组
    getCheckedKeys(leafOnly){
        console.log(leafOnly)
    },
    //下拉加载
    onLoad(){
        console.log('加载中')
        let queryData = {
            isAll: 'Y',
            pageNum: 2
        }
        queryPerson(queryData).then(res=>{
            this.tableData.push(res.obj)
        })
    },
    ...mapMutations({
        save_jobNum:'save_jobNum'
    }),
  },
  mounted(){
    // console.log(this.$refs.table.width)
    // this.$refs.table.width = 100 +'%'
  },
}
</script>
<style>
    td{
        vertical-align: bottom
    }
</style>
<style lang="stylus" scoped>
    .header{
        padding 10px
        box-shadow 0 0  10px #eee
        .btn{
            padding 5px
        }
    }
    .table{
        width 100%
        overflow-x auto
    }
    .pick{
        padding 10px
        line-height 25px
    }
    .van-checkbox{
        padding 5px
    }
    .eletable{
        overflow-y auto
    }
</style>