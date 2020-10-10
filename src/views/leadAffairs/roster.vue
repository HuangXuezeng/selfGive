<template>
    <div>
        <div class="header">
            <van-field v-model="form.department" @click="pickDept" readonly label="部门" placeholder="请选择部门" />
            <van-field v-model="form.jobnumber" label="工号" placeholder="请输入工号" />
            <van-field v-model="form.name" label="姓名" placeholder="请输入姓名" />
            <div class="btn">
                <van-button type="primary" color="#fc5f10" size="small" @click="search">查询</van-button>
                <van-button type="primary" color="#fc5f10" size="small" @click="reset">重置</van-button>
                <van-button type="primary" color="#fc5f10" size="small" @click="moreSearch">更多</van-button>
                <van-button type="primary" color="#fc5f10" size="small" @click="setMenu">排序</van-button>
            </div>
        </div>
        <!-- 下拉加载 -->
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
        <!-- <div class="mt20 mb20 bold" style="margin-top:10px;">
            <v-pagination @page-change="pageChange" @page-size-change="pageSizeChange" :total="total" size='small' :page-size="pageSize" :layout="['prev', 'pager', 'next']"></v-pagination>
        </div>    -->
        <!-- 更多查询条件弹出框 -->
        <van-popup v-model="showPick" position="top" :style="{ height: '70%' }" get-container="body" closeable>
            <div class="pick">
                <van-field v-model="form.currentState" label="当前状态" placeholder="请选择" readonly @click-input="selectState"/>
                <van-field v-model="form.sex" label="性别" placeholder="请选择" readonly @click-input="selectSex"/>
                <van-field v-model="form.age" label="年龄" placeholder="请输入年龄" />
                <van-field v-model="form.education" label="最高学历" placeholder="请选择" readonly @click-input="selectXueli"/>
                <van-field v-model="form.schoolProp" label="院校性质" placeholder="请选择" readonly @click-input="selectSchool"/>
                <van-field v-model="form.schoolName" label="毕业院校" placeholder="请输入毕业院校" />
                <van-field v-model="form.walk" label="专业" placeholder="请输入专业" />
                <van-field v-model="form.bzlx" label="编制类型" placeholder="请选择" readonly @click-input="selectBian"/>
                <van-field v-model="form.post" label="岗位" placeholder="请输入岗位" />
                <van-field v-model="form.category" label="职类" placeholder="请选择" readonly @click-input="selectzl"/>
                <van-field v-model="form.rank" label="职级" placeholder="请输入职级" readonly @click-input="selectzj"/>
                <van-field v-model="form.postOne" label="岗位分类一" placeholder="请输入岗位分类一" readonly @click-input="selectFl1"/>
                <van-field v-model="form.postTwo" label="岗位分类二" placeholder="请输入岗位分类二" readonly @click-input="selectFl2"/>
                <van-field v-model="form.entryStartTime" label="入司开始日期" placeholder="请选择" readonly @click-input="entryStartTime"/>
                <van-field v-model="form.entryEndTime" label="入司结束日期" placeholder="请选择" readonly @click-input="entryEndTime"/>
                <van-field v-model="form.entryAge" label="司龄" placeholder="请输入司龄" />
                <van-field v-model="form.syjsStartTime" label="试用开始日期" placeholder="请选择" readonly @click-input="syjsStartTime"/>
                <van-field v-model="form.syjsEndTime" label="试用结束日期" placeholder="请选择" readonly @click-input="endTime"/>
                <van-field v-model="form.sjzzStartTime" label="实际转正开始日期" placeholder="请选择" readonly @click-input="startTime"/>
                <van-field v-model="form.sjzzEndTime" label="实际转正结束日期" placeholder="请选择" readonly @click-input="sjzzEndTime"/>
                <van-field v-model="form.zyxbq" label="专业线标签" placeholder="请选择" readonly @click-input="selectZhuanye"/>
                <van-field v-model="form.isVeteran" label="是否为退伍军人" placeholder="请选择" readonly @click-input="selectVal"/>
                <van-field v-model="form.isPerson" label="是否在本公司有亲属关系" placeholder="请选择" readonly @click-input="selectQs"/>
                <van-field v-model="form.isTrain" label="是否签订培训协议" placeholder="请选择" readonly @click-input="selectPxxy"/>
                <van-field v-model="form.isCompete" label="是否签订竞业协议" placeholder="请选择" readonly @click-input="selectJyxy"/>
                <van-field v-model="form.company" label="工作单位" placeholder="请输入工作单位" />
                <van-field v-model="form.zcName" label="职称名称" placeholder="请输入职称名称" />
                <van-field v-model="form.personType" label="人员类别" placeholder="请选择" readonly @click="selectPerson"/>
                <van-button type="primary" size="mini" color="#fc5f10" @click="moreReset">重置</van-button>
                <van-button type="info" size="mini" color="#fc5f10" @click="searchMore">查询</van-button>
                <!-- <van-button type="info" size="mini" @click="confirmPick">确定</van-button> -->
            </div>
        </van-popup>
        <!-- 排序弹窗 -->
        <van-popup v-model="showPx" position="top" :style="{ height: '70%' }" get-container="body" closeable close-icon-position="bottom-right">
            <div class="pick">
                <!-- <van-checkbox-group v-model="results" ref="checkboxGroup"> -->
                    <!-- <van-checkbox name="zt" :disabled="false1">当前状态</van-checkbox>
                    <van-checkbox name="xb" :disabled='false2'>性别</van-checkbox>
                    <van-checkbox name="nl" :disabled='false3'>年龄</van-checkbox>
                    <van-checkbox name="zgxl" :disabled='false4'>最高学历</van-checkbox>
                    <van-checkbox name="yxxz" :disabled='false5'>院校性质</van-checkbox>
                    <van-checkbox name="byyx" :disabled='false6'>毕业院校</van-checkbox>
                    <van-checkbox name="zy" :disabled='false7'>专业</van-checkbox>
                    <van-checkbox name="bzlx" :disabled='false8'>编制类型</van-checkbox>
                    <van-checkbox name="gjzl" :disabled='false10'>职类</van-checkbox>
                    <van-checkbox name="gwfly" :disabled='false12'>岗位分类一</van-checkbox>
                    <van-checkbox name="gwfle" :disabled='false13'>岗位分类二</van-checkbox>
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
                    <van-checkbox name="rylb" :disabled='false25'>人员类别</van-checkbox> -->
                    
                    <!-- <van-checkbox name="rsrq" :disabled='false14'>入司日期</van-checkbox> -->
                    <!-- <van-checkbox name="gjzj" :disabled='false11'>职级</van-checkbox> -->
                    <!-- <van-checkbox name="gw" :disabled='false9'>岗位</van-checkbox> -->
                <!-- </van-checkbox-group> -->

                <!-- 排序 -->
                <transition-group 
                type="transition" 
                class="infoitems"
                :name="!drag ? 'flip-list' : null">
                    <div
                        class="infoitem"
                        v-for="item in columns" v-dragging="{ item: item, list: columns, group: 'columns' }"
                        :key="item.title"
                    >
                    <div :name="item.title">{{item.title}}</div>
                    </div>
                </transition-group>
                <!-- <van-button type="primary" size="mini" @click="checkAll">全选</van-button> -->
                <!-- <van-button type="info" size="mini" @click="confirmPick">确定</van-button> -->
            </div>
        </van-popup>
        <!-- 选择部门弹出框 -->
        <van-popup v-model="showPickDept" position="top" :style="{ height: '70%' }" get-container="body" closeable>
            <van-checkbox v-model="checked" @change="changeDept">是否包含下级部门</van-checkbox>
            <el-tree 
            :data="deptData" 
            ref="tree"
            @check-change="handleCheckChange"
            node-key="deptId"
            :props="props" 
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
        <van-popup v-model="showSelect" position="bottom" :style="{ height: '50%' }" get-container="body">
            <van-picker
            title="标题"
            show-toolbar
            :columns="column1"
            @confirm="onConfirm1"
            @cancel="onCancel1"
            />
        </van-popup>
        <!-- 弹出时下拉选择男女 -->
        <van-popup v-model="showSex" position="bottom" :style="{ height: '50%' }" get-container="body">
            <van-picker
            title="标题"
            show-toolbar
            :columns="column2"
            @confirm="onConfirm2"
            @cancel="onCancel2"
            />
        </van-popup>
        <!-- 弹出时下拉选择编制类型 -->
        <van-popup v-model="showBianzhi" position="bottom" :style="{ height: '50%' }" get-container="body">
            <van-picker
            title="标题"
            show-toolbar
            :columns="column3"
            @confirm="onConfirm3"
            @cancel="onCancel3"
            />
        </van-popup>
        <!-- 弹出时下拉选择院校性质 -->
        <van-popup v-model="showSchool" position="bottom" :style="{ height: '50%' }" get-container="body">
            <van-checkbox-group v-model="result3" ref="checkboxGroup">
                <van-checkbox v-for="item in column4" :key="item.code" :name="item">{{item.content}}</van-checkbox>
            </van-checkbox-group>
            <van-button type="info" size="mini" @click="onConfirm4">确定</van-button>
        </van-popup>
        <!-- 弹出时下拉选择学历 -->
        <van-popup v-model="showXueli" position="bottom" :style="{ height: '50%' }" get-container="body">
            <van-checkbox-group v-model="result4" ref="checkboxGroup">
                <van-checkbox v-for="item in column8" :key="item.code" :name="item">{{item.content}}</van-checkbox>
            </van-checkbox-group>
            <van-button type="info" size="mini" @click="onConfirm8">确定</van-button>
        </van-popup>
        <!-- 弹出时下拉选择专业线标签 -->
        <van-popup v-model="showZhuanye" position="bottom" :style="{ height: '50%' }" get-container="body">
            <van-checkbox-group v-model="result5" ref="checkboxGroup">
                <van-checkbox v-for="item in column5" :key="item.code" :name="item">{{item.content}}</van-checkbox>
            </van-checkbox-group>
            <van-button type="info" size="mini" @click="onConfirm5">确定</van-button>
        </van-popup>
        <!-- 弹出时下拉选择当前状态 -->
        <van-popup v-model="showState" position="bottom" :style="{ height: '50%' }" get-container="body">
            <van-checkbox-group v-model="result6" ref="checkboxGroup">
                <van-checkbox v-for="item in column6" :key="item.code" :name="item">{{item.content}}</van-checkbox>
            </van-checkbox-group>
            <van-button type="info" size="mini" @click="onConfirm6">确定</van-button>
        </van-popup>
        <!-- 弹出时下拉选择人员类别 -->
        <van-popup v-model="showLeibie" position="bottom" :style="{ height: '50%' }" get-container="body">
            <van-checkbox-group v-model="result7" ref="checkboxGroup">
                <van-checkbox v-for="item in column7" :key="item.code" :name="item">{{item.content}}</van-checkbox>
            </van-checkbox-group>
            <van-button type="info" size="mini" @click="onConfirm7">确定</van-button>
        </van-popup>
        <!-- 弹出时下拉选择岗位分类1 -->
        <van-popup v-model="showFenlei1" position="bottom" :style="{ height: '50%' }" get-container="body">
            <van-checkbox-group v-model="result2" ref="checkboxGroup">
                <van-checkbox v-for="item in column9" :key="item.code" :name="item">{{item.content}}</van-checkbox>
            </van-checkbox-group>
            <van-button type="info" size="mini" @click="onConfirm9">确定</van-button>
        </van-popup>
        <!-- 弹出时下拉选择岗位分类2 -->
        <van-popup v-model="showFenlei2" position="bottom" :style="{ height: '50%' }" get-container="body">
            <van-checkbox-group v-model="result1" ref="checkboxGroup">
                <van-checkbox v-model="checkFl1" v-for="item in column10" :key="item.code" :name="item">{{item.content}}</van-checkbox>
            </van-checkbox-group>
            <van-button type="info" size="mini" @click="confirmFl2">确定</van-button>
        </van-popup>
        <!-- 职类 -->
        <van-popup v-model="showZl" position="bottom" :style="{ height: '50%' }" get-container="body">
            <van-checkbox-group v-model="result8" ref="checkboxGroup">
                <van-checkbox v-for="item in column11" :key="item.code" :name="item">{{item.content}}</van-checkbox>
            </van-checkbox-group>
            <van-button type="info" size="mini" @click="onConfirm10">确定</van-button>
        </van-popup>
        <!-- 职级 -->
        <van-popup v-model="showZj" position="bottom" :style="{ height: '50%' }" get-container="body">
            <van-checkbox-group v-model="result9" ref="checkboxGroup">
                <van-checkbox v-for="item in column12" :key="item.code" :name="item">{{item.content}}</van-checkbox>
            </van-checkbox-group>
            <van-button type="info" size="mini" @click="onConfirm11">确定</van-button>
        </van-popup>
    </div>
</template>
<script>
import { Popup,Checkbox,CheckboxGroup,List } from 'vant'
import { queryDept,getSelectVal,getOrz,queryFen2,queryPerson,queryRank,queryDeptIdName,querySome } from './api'
import { mapMutations } from 'vuex'
import draggable from 'vuedraggable'
export default {
  data () {
    return {
        checked: true, //是否包含下级部门
        dataList: [],
        loading: false,
        finished: false,
        form:{
            department: '',
            jobnumber: '',
            name: '',
            currentState: '',
            sex: '',
            age: '',
            education: '',
            schoolProp: '',
            schoolName: '',
            walk: '',
            bzlx: '',
            post: '',
            category: '',
            rank: '',
            postOne: '',
            postTwo: '',
            entryStartTime: '',
            entryEndTime: '',
            entryAge: '',
            syjsEndTime: '',
            syjsStartTime: '',
            sjzzStartTime: '',
            sjzzEndTime: '',
            zyxbq: '',
            isVeteran: '',
            isPerson: '',
            isTrain: '',
            isCompete: '',
            company: '',
            zcName: '',
            personType: '',
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
        showFenlei2: false, //岗位分类2
        showZl: false, //职类
        showZj: false, //职级
        showPx: false, //排序弹窗
        result: [], //多选框
        results: [], //多选框
        result1: [], //岗位分类1
        result2: [], //岗位分类2
        result3: [], //院校性质
        result4: [], //学历
        result5: [], //专业线标签
        result6: [], //当前状态
        result7: [], //人员类别
        result8: [], //职类
        result9: [], //职级
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
                        return `<span>${rowData[field]}</span>`;
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
        column10:[], //岗位分类2
        column11:[], //职类
        column12:[], //职级
        sex: '', //传后台性别值
        bianzhi: '', //传后台编制类型值
        schoolVal: '', //传后台院校性质值
        zhuanyeVal: '', //传后台专业线标签
        stateVal: '', //传后台当前状态
        leibieVal: '', //传后台leibie
        junrenVal: '', //传后台是否退伍军人
        qinshuVal: '', //传后台是否有亲属关系
        peixunVal: '', //传后台是否签订培训协议
        jingyeVal: '', //传后台是否签订竞业协议
        xueliVal: '', //传后台是否最高学历值
        fenlei1Val: '', //传后台岗位分类1值
        fenlei2Val: '', //传后台岗位分类2值
        zhileiVal: '', //传后台职类值
        zhijiVal: '', //传后台职级值
        deptVal: '', //传后台选择部门的值
        selectFlag: '', //是否
        timeFlag: '', //时间选择标识
        checkFl1: [], //选中分类2的值
        gerenLists: [
            {id:1,name:'zt',dis:this.false1,val:'当前状态'},
            {id:2,name:'xb',dis:this.false2,val:'性别'},
            {id:3,name:'nl',dis:this.false3,val:'年龄'},
            {id:4,name:'zgxl',dis:this.false4,val:'最高学历'},
        ], //排序数组
        drag: false,
        currentDept: [], //页面进来时获取的部门名
        deptIds: [], //页面进来时获取的部门id
        defaultCheckedKeys: []
    };
  },
  created(){
    this.getState()
    this._queryDeptIdName() //获取部门名字和部门id
  },
  methods:{
    //获取当前状态的值 
    getState(){
        getSelectVal().then(res=>{
            this.column6 = res.obj.dqzt
            this.column4 = res.obj.yxxz
            this.column5 = res.obj.zyxbq
            this.column7 = res.obj.rylb
            this.column8 = res.obj.zgxl
            this.column9 = res.obj.gwfl
            this.column11 = res.obj.zl
        })
    },
    //获取部门和部门id
    _queryDeptIdName(){
        let isAll = 'Y'
        if(isAll == 'Y'){
            this._getOrz() //获取部门
            this._queryPerson() //获取人员
        }else{
            let queryData = {
                jobnumber: 6006212
            }
            queryDeptIdName(queryData).then(res=>{
                this.currentDept = res.obj.currentDepartment
                this.deptIds = res.obj.deptIds
                this.deptData.push(res.obj.departments)
                this.tableData = res.obj.employees
            })
        }
    },
    //获取组织下的部门
    _getOrz(){
        const departRes =  JSON.parse(localStorage.getItem('departRes'))
        this.deptData.push(departRes.obj.departments)
        this.currentDept = departRes.obj.currentDepartment
        this.deptIds = departRes.obj.deptIds
    },
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
            department: '',
            jobnumber: '',
            name: '',
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
        this.form.department = this.deptVal
        this.form.pageNum = 1
        this.form.currentDept = this.currentDept
        this.form.deptIds = this.deptIds
        this.form.idStr = this.form.department
        let queryData = this.form
        querySome(queryData).then(res=>{
            this.tableData =  res.obj
            this.form.department = this.deptVal = ''
            this.form.jobnumber = ''
            this.form.name = ''
        })
        // console.log(this.form)
    },
    //全选
    checkAll() {
      this.$refs.checkboxGroup.toggleAll(true);
    },
    //重置更多选择条件
    moreReset(){
        this.form.currentState = '',
        this.form.sex = '',
        this.form.age = '',
        this.form.education = '',
        this.form.schoolProp = '',
        this.form.schoolName = '',
        this.form.walk = '',
        this.form.bzlx = '',
        this.form.post = '',
        this.form.category = '',
        this.form.rank = '',
        this.form.postOne = '',
        this.form.postTwo = '',
        this.form.entryStartTime = '',
        this.form.entryEndTime = '',
        this.form.entryAge = '',
        this.form.syjsEndTime = '',
        this.form.syjsStartTime = '',
        this.form.sjzzStartTime = '',
        this.form.sjzzEndTime = '',
        this.form.zyxbq = '',
        this.form.isVeteran = '',
        this.form.isPerson = '',
        this.form.isTrain = '',
        this.form.isCompete = '',
        this.form.company = '',
        this.form.zcName = '',
        this.form.personType = ''
    },
    //弹窗里条件的查询
    searchMore() {
        this.form.currentState = this.stateVal
        this.form.sex = this.sex
        this.form.education = this.xueliVal
        this.form.schoolProp = this.schoolVal
        this.form.bzlx = this.bianzhi
        this.form.category = this.zhileiVal
        this.form.rank = this.zhijiVal
        this.form.postOne = this.fenlei1Val
        this.form.postTwo = this.fenlei2Val
        this.form.zyxbq = this.zhuanyeVal
        this.form.isVeteran = this.junrenVal
        this.form.isPerson = this.qinshuVal
        this.form.isTrain = this.peixunVal
        this.form.isCompete = this.jingyeVal
        this.form.personType = this.leibieVal
        // console.log(this.form)
        if(this.form.currentState !== ''){
            let obj1 = {
                field: 'currentState',title: '当前状态',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
            }
            this.columns.push(obj1)
        }
        if(this.form.sex !== ''){
            let obj2 = {
                field: 'sex',title: '性别',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true,
                formatter: function(rowData, rowIndex, pagingIndex, field) {
                    return `<span>${rowData[field] == 1 ? '男' : '女' }</span>`;
                },
            }
            this.columns.push(obj2)
        }
        if(this.form.age !== ''){
            let obj3 = {
                field: 'age',title: '年龄',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
            }
            this.columns.push(obj3)
        }
        if(this.form.education !== ''){
            let obj4 = {
                field: 'education',title: '最高学历',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
            }
            this.columns.push(obj4)
        }
        if(this.form.schoolProp !== ''){
            let obj5 = {
                field: 'schoolProp',title: '院校性质',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
            }
            this.columns.push(obj5)
        }
        if(this.form.schoolName !== ''){
            let obj6 = {
                field: 'schoolName',title: '毕业院校',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
            }
            this.columns.push(obj6)
        }
        if(this.form.walk !== ''){
            let obj7 = {
                field: 'walk',title: '专业',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
            }
            this.columns.push(obj7)
        }
        if(this.form.bzlx !== ''){
            let obj8 = {
                field: 'bzlx',title: '编制类型',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
            }
            this.columns.push(obj8)
        }
        if(this.form.post !== ''){
            let obj9 = {
                field: 'post',title: '岗位',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
            }
            this.columns.push(obj9)
        }
        if(this.form.category !== ''){
            let obj10 = {
                field: 'category',title: '职类',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
            }
            this.columns.push(obj10)
        }
        if(this.form.rank !== ''){
            let obj11 = {
                field: 'rank',title: '职级',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
            }
            this.columns.push(obj11)
        }
        if(this.form.postOne !== ''){
            let obj12 = {
                field: 'postOne',title: '岗位分类一',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
            }
            this.columns.push(obj12)
        }
        if(this.form.postTwo !== ''){
            let obj13 = {
                field: 'postTwo',title: '岗位分类二',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
            }
            this.columns.push(obj13)
        }
        if(this.form.entryAge !== ''){
            let obj15 = {
                field: 'entryAge',title: '司龄',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
            }
            this.columns.push(obj15)
        }
        if(this.form.syjsStartTime !== ''){
            let obj16 = {
                field: 'syjsrq',title: '试用结束日期',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
            }
            this.columns.push(obj16)
        }
        if(this.form.syjsEndTime !== ''){
            let obj16 = {
                field: 'syjsrq',title: '试用结束日期',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
            }
            this.columns.push(obj16)
        }
        if(this.form.sjzzStartTime !== ''){
            let obj17 = {
                field: 'sjzzrq',title: '实际转正日期',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
            }
            this.columns.push(obj17)
        }
        if(this.form.sjzzEndTime !== ''){
            let obj17 = {
                field: 'sjzzrq',title: '实际转正日期',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
            }
            this.columns.push(obj17)
        }
        if(this.form.zyxbq !== ''){
            let obj18 = {
                field: 'zyxbq',title: '专业线标签',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
            }
            this.columns.push(obj18)
        }
        if(this.form.isVeteran !== ''){
            let obj19 = {
                field: 'isVeteran',title: '是否为退伍军人',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true,
                formatter: function(rowData, rowIndex, pagingIndex, field) {
                    return `<span>${rowData[field] == 1 ? '是' : '否' }</span>`;
                },
            }
            this.columns.push(obj19)
        }
        if(this.form.isPerson !== ''){
            let obj20 = {
                field: 'isPerson',title: '是否在本公司有亲属关系',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true,
                formatter: function(rowData, rowIndex, pagingIndex, field) {
                    return `<span>${rowData[field] == 1 ? '是' : '否' }</span>`;
                },
            }
            this.columns.push(obj20)
        }
        if(this.form.isTrain !== ''){
            let obj21 = {
                field: 'isTrain',title: '是否签订培训协议',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true,
                formatter: function(rowData, rowIndex, pagingIndex, field) {
                    return `<span>${rowData[field] == 1 ? '是' : '否' }</span>`;
                },
            }
            this.columns.push(obj21)
        }
        if(this.form.isCompete !== ''){
            let obj22 = {
                field: 'isCompete',title: '是否签订竞业协议',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true,
                formatter: function(rowData, rowIndex, pagingIndex, field) {
                    return `<span>${rowData[field] == 1 ? '是' : '否' }</span>`;
                },
            }
            this.columns.push(obj22)
        }
        if(this.form.company !== ''){
            let obj23 = {
                field: 'company',title: '工作单位',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
            }
            this.columns.push(obj23)
        }
        if(this.form.zcName !== ''){
            let obj24 = {
                field: 'zcName',title: '职级名称',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
            }
            this.columns.push(obj24)
        }
        if(this.form.personType !== ''){
            let obj25 = {
                field: 'personType',title: '人员类别',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
            }
            this.columns.push(obj25)
        }
        //查询请求
        this.form.department = this.deptVal
        this.form.pageNum = 1
        this.form.currentDept = this.currentDept
        this.form.deptIds = this.deptIds
        this.form.idStr = this.form.department
        let queryData = this.form
        querySome(queryData).then(res=>{
            //接受数据
            this.tableData = res.obj
            //清空搜索框
            this.form.currentState = this.stateVal = ''
            this.form.sex = this.sex = ''
            this.form.education = this.xueliVal = ''
            this.form.schoolProp = this.schoolVal = ''
            this.form.bzlx = this.bianzhi = ''
            this.form.category = this.zhileiVal = ''
            this.form.rank = this.zhijiVal = ''
            this.form.postOne = this.fenlei1Val = ''
            this.form.postTwo = this.fenlei2Val = ''
            this.form.zyxbq = this.zhuanyeVal = ''
            this.form.isVeteran = this.junrenVal = ''
            this.form.isPerson = this.qinshuVal = ''
            this.form.isTrain = this.peixunVal = ''
            this.form.isCompete = this.jingyeVal = ''
            this.form.personType = this.leibieVal = ''
            this.form.age  = ''
            this.form.schoolName  = ''
            this.form.walk  = ''
            this.form.post  = ''
            this.form.entryStartTime  = ''
            this.form.entryEndTime  = ''
            this.form.entryAge  = ''
            this.form.syjsEndTime  = ''
            this.form.syjsStartTime  = ''
            this.form.sjzzStartTime  = ''
            this.form.sjzzEndTime  = ''
            this.form.company  = ''
            this.form.zcName  = ''
        })
        //数组去重
        this.columns = this.unique(this.columns)
        this.showPick = false
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
                case 'entryStartTime':
                    let obj14 = {
                        field: 'entryStartTime',title: '入司开始日期',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
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
    handleCheckChange(data) {
        let res = this.$refs.tree.getCheckedNodes()
        this.defaultCheckedKeys = res
        // this.$refs.tree.setCheckedKeys(this.defaultCheckedKeys)
        // this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
        let str = ''
        let val = ''
        for(let i in res){
            str += res[i].content+','
            val += res[i].deptId+','
        }
        if(str.length > 0){
            str = str.substr(0,str.length - 1)
            val = val.substr(0,str.length - 1)
        }
        // console.log(res)
        // console.log(val)
        this.form.department = str
        this.deptVal = val
    },
    //入司时间时间
    entryStartTime(){
        this.timeFlag = 1
        this.showTime = true
    },
    //入司结束时间
    entryEndTime(){
        this.timeFlag = 4
        this.showTime = true
    },
    //试用开始时间
    syjsStartTime(){
        this.timeFlag = 5
        this.showTime = true
    },
    //试用结束时间
    endTime(){
        this.timeFlag = 2
        this.showTime = true
    },
    //转正开始时间
    startTime(){
        this.timeFlag = 3
        this.showTime = true
    },
    //转正结束时间
    sjzzEndTime(){
        this.timeFlag = 6
        this.showTime = true
    },
    //确认选择的时间
    confirm(val){
        // console.log(val)
        if(this.timeFlag == 1){
            this.form.entryStartTime = this.formatDate(val) 
        }else if(this.timeFlag == 2){
            this.form.syjsEndTime = this.formatDate(val) 
        }else if (this.timeFlag == 3){
            this.form.sjzzStartTime = this.formatDate(val) 
        }else if (this.timeFlag == 4){
            this.form.entryEndTime = this.formatDate(val) 
        }else if (this.timeFlag == 5){
            this.form.syjsStartTime = this.formatDate(val) 
        }else if (this.timeFlag == 6){
            this.form.sjzzEndTime = this.formatDate(val) 
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
            this.form.isVeteran = picker.text
            this.junrenVal = picker.keyId
        }else if(this.selectFlag == 2){
            this.form.isPerson = picker.text
            this.qinshuVal = picker.keyId
        }else if(this.selectFlag == 3){
            this.form.isTrain = picker.text
            this.peixunVal = picker.keyId
        }else if(this.selectFlag == 4){
            this.form.isCompete = picker.text
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
        this.form.bzlx = picker.text
        this.showBianzhi = false
    },
    onCancel3(){
        this.showBianzhi = false
    },
    //选择院校性质
    selectSchool(){
        this.showSchool = true
    },
    onConfirm4(){
        let str = ''
        let val = ''
        for(let i in this.result3){
            str += this.result3[i].content+','
            val += this.result3[i].code+','
        }
        if(str.length > 0){
            str = str.substr(0,str.length - 1)
            val = val.substr(0,val.length - 1)
        }
        // console.log(str)
        // console.log(val)
        this.schoolVal = val
        this.form.schoolProp = str
        this.showSchool = false
        this.result3 = []
    },
    onCancel4(){
        this.showSchool = false
    },
    //选择专业线标签
    selectZhuanye(){
        this.showZhuanye = true
    },
    onConfirm5(){
        let str = ''
        let val = ''
        for(let i in this.result5){
            str += this.result5[i].content+','
            val += this.result5[i].code+','
        }
        if(str.length > 0){
            str = str.substr(0,str.length - 1)
            val = val.substr(0,val.length - 1)
        }
        this.zhuanyeVal = val
        this.form.zyxbq = str
        this.showZhuanye = false
        this.result5 = []
    },
    onCancel5(){
        this.showZhuanye = false
    },
    //选择当前状态
    selectState(){
        this.showState = true
    },
    onConfirm6(){
        let str = ''
        let val = ''
        for(let i in this.result6){
            str += this.result6[i].content+','
            val += this.result6[i].code+','
        }
        if(str.length > 0){
            str = str.substr(0,str.length - 1)
            val = val.substr(0,val.length - 1)
        }
        this.stateVal = val
        this.form.currentState = str
        this.showState = false
        this.result6 = []
    },
    onCancel6(){
        this.showState = false
    },
    //选择人员类别
    selectPerson(){
        this.showLeibie = true
    },
    onConfirm7(){
        let str = ''
        let val = ''
        for(let i in this.result7){
            str += this.result7[i].content+','
            val += this.result7[i].code+','
        }
        if(str.length > 0){
            str = str.substr(0,str.length - 1)
            val = val.substr(0,val.length - 1)
        }
        this.leibieVal = val
        this.form.personType = str
        this.showLeibie = false
        this.result7 = []
    },
    onCancel7(){
        this.showLeibie = false
    },
    //选择最高学历
    selectXueli(){
        this.showXueli = true
    },
    onConfirm8(){
        let str = ''
        let val = ''
        for(let i in this.result4){
            str += this.result4[i].content+','
            val += this.result4[i].code+','
        }
        if(str.length > 0){
            str = str.substr(0,str.length - 1)
            val = val.substr(0,val.length - 1)
        }
        this.xueliVal = val
        this.form.education = str
        this.showXueli = false
        this.result4 = []
    },
    onCancel8(){
        this.showXueli = false
    },
    //选择岗位分类1
    selectFl1(){
        this.showFenlei1 = true
    },
    onConfirm9(){
        let str = ''
        let val = ''
        for(let i in this.result2){
            str += this.result2[i].content+','
            val += this.result2[i].code+','
        }
        if(str.length > 0){
            str = str.substr(0,str.length - 1)
            val = val.substr(0,val.length - 1)
        }
        // console.log(str)
        // console.log(val)
        this.fenlei1Val = val
        this.form.postOne = str
        this.showFenlei1 = false
        let queryData = {
            code:this.fenlei1Val
        }
        queryFen2(queryData).then(res=>{
            this.column10 = res.obj
        })
        this.result2 = []
    },
    onCancel9(){
        this.showFenlei1 = false
    },
    //选择岗位分类2
    selectFl2(){
        this.showFenlei2 = true
    },
    //确定选择岗位分类2
    confirmFl2(){
        // console.log(this.result1)
        let str = ''
        let val = ''
        for(let i in this.result1){
            str += this.result1[i].content+','
            val += this.result1[i].code+','
        }
        if(str.length > 0){
            str = str.substr(0,str.length - 1)
            val = val.substr(0,val.length - 1)
        }
        // console.log(str)
        // console.log(val)
        this.form.postTwo = str
        this.fenlei2Val = val
        this.showFenlei2 = false
        this.result1 = []
    },
    //职类
    selectzl(){
        this.showZl = true
    },
    onConfirm10(){
        let str = ''
        let val = ''
        for(let i in this.result8){
            str += this.result8[i].content+','
            val += this.result8[i].code+','
        }
        if(str.length > 0){
            str = str.substr(0,str.length - 1)
            val = val.substr(0,val.length - 1)
        }
        this.zhileiVal = val
        this.form.category = str
        this.showZl = false
        //查询职级
        let queryData = {
            code:this.zhileiVal
        }
        queryRank(queryData).then(res=>{
            this.column12 = res.obj
        })
        this.result8 = []
    },
    //选择职级
    selectzj(){
        this.showZj = true
    },
    onConfirm11(){
        let str = ''
        let val = ''
        for(let i in this.result9){
            str += this.result9[i].content+','
            val += this.result9[i].code+','
        }
        if(str.length > 0){
            str = str.substr(0,str.length - 1)
            val = val.substr(0,val.length - 1)
        }
        this.zhijiVal = val
        this.form.rank = str
        this.showZj = false
        this.result9 = []
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
    //是否包含下级部门
    changeDept(checked){
        // debugger
        // console.log(this.defaultCheckedKeys)
        if(!checked){
            this.dataList = []

            for(let k in this.defaultCheckedKeys){
                if(this.defaultCheckedKeys[k].depts){
                    this.dataList.push(this.defaultCheckedKeys[k]) 
                    for(let i in this.defaultCheckedKeys[k].depts){
                        this.$refs.tree.setChecked(this.defaultCheckedKeys[k].depts[i],false)
                        this.$refs.tree.setChecked(this.defaultCheckedKeys[k],true)

                    }
                }
            }
           
        }else{
             for(let m in this.dataList){
                 for(let n in  this.dataList[m].depts){
                     this.$refs.tree.setChecked(this.dataList[m].depts[n],true)
                 }
                
            }
        }
        // this.$refs.tree.setChecked(this.deptData, false)
        // console.log(checked)
    },
    //数组去重
    unique(arr){
        var newArr= [];
        var arrId = [];
        for(var item of arr){
            if(arrId.indexOf(item['title']) == -1){
                arrId.push(item['title']);
                newArr.push(item);
            }
        }
        return newArr
    },
    ...mapMutations({
        save_jobNum:'save_jobNum'
    }),
  },
  mounted() {
　　  this.$dragging.$on('dragged', ({ value }) => {
        // console.log(value.item)
        console.log(value.list)
        this.newList = value.list
        // console.log(value.otherData)
      })
      this.$dragging.$on('dragend', () => {
  
      })
　　},
  components: {
      draggable
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
    .infoitems{
      padding 10px 10px 10px 0 
      flex-direction: row
      flex-wrap wrap
      .infoitem{
        cursor: move
        line-height 35px
        margin 5px
        border-radius 6px
        background-color orange
        padding 5px
        color #fff
        font-weight 700
        img{
          display block
          width 50px
          height 50px
          margin 0 auto
        }
        span{
          font-size 14px
        }
      }
    }
</style>