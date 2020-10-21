<template>
    <div>
        <div class="header">
            <van-field v-model="form.department" @click="pickDept" readonly label="部门" placeholder="请选择部门(必填)" />
            <van-field v-model="form.jobnumber" label="工号" placeholder="请输入工号" />
            <van-field v-model="form.name" label="姓名" placeholder="请输入姓名" />
            <van-field v-model="form.startTime" label="开始时间" @click="startTimeClick" readonly placeholder="请选择(必填)" />
            <van-field v-model="form.endTime" label="结束时间" @click="endTimeClick" readonly placeholder="请选择(必填)" />
            <van-field v-model="form.classic" label="异动分类" placeholder="请选择" readonly/>
            <div class="btn">
                <van-button type="primary" color="#fc5f10" size="small" @click="search" style="width:45%">查询</van-button>
                <van-button type="primary" color="#fc5f10" size="small" @click="reset" style="width:45%">重置</van-button>
                <!-- <van-button type="primary" color="#fc5f10" size="small" @click="ceshi">测试</van-button> -->
            </div>
        </div>
        <!-- 选择部门弹出框 -->
        <van-popup v-model="showPickDept" position="top" :style="{ height: '70%' }" get-container="body" closeable>
            <el-tree 
            :data="deptData" 
            ref="tree"
            @check-change="handleCheckChange"
            node-key="deptId"
            :props="props" 
            show-checkbox></el-tree>
        </van-popup>
        <!-- 弹出选择时间 -->
        <van-popup
        get-container="body"
        v-model="showTime"
        close-icon="close"
        position="bottom"
        :style="{ height: '50%' }"
        >
            <van-datetime-picker
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="confirm"
            @cancel="cancel"
            />
        </van-popup>
        <!-- 人数表格 -->
        <div class="table">
            <v-table 
            ref="table" 
            columns-width-drag
            :height="400"
            title-bg-color="#e5ecf0"
            :columns="columns"
            :table-data="tableData" 
            row-hover-color="#eee" 
            row-click-color="#edf7ff" 
            :row-click="rowClick"
            :paging-index="(pageIndex-1)*pageSize"   	
            ></v-table>	
        </div>
        <div class="more">
            <van-tag type="warning">总条数：{{total}}</van-tag>
            <span style="float:right" @click="loadMore"><van-tag type="warning">下一页</van-tag></span>
        </div>
    </div>
</template>
<script>
import { Field,Button,DatetimePicker,Popup,Notify,Dialog } from 'vant'
import { mapMutations } from 'vuex'
import { queryChanges } from './api'
export default {
  data () {
    return {
        form:{
            department:'', //部门
            jobnumber:'', //工号
            name:'', //姓名
            startTime:'', //开始日期
            endTime:'', //结束日期
            classic:'', //异动分类
            deptIdStr:'', //选择的部门id集合
        },
        showPickDept: false, //选择部门弹出窗
        deptData: [], //部门数据
        props: {
          label: 'content',
          children: 'depts'
        },
        showTime: false,
        timeFlag: '', //选择时间的标识
        minDate: new Date(2010, 0, 1),
        maxDate: new Date(2025, 10, 1),
        currentDate: new Date(),
        total:0,
        pageIndex:1,
        pageSize:10,
        tableData: [],
        fenyeData: [],
        dataIndex: 0, //假分页默认显示
        columns: [
            {
                field: 'custome', width: 100, titleAlign: 'center', columnAlign: 'center',title: '序号',
                formatter: function (rowData, index) {
                    return index + 1
                }, isResize:true,
            },
            {
                field: 'jobnumber',
                title: '工号',
                width: 150,
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
                field: 'changeClassic',
                title: '异动分类',
                width: 150,
                titleAlign: 'center',
                columnAlign: 'center',
                isResize: true
            },
            {
                field: 'time',
                title: '异动生效日期',
                width: 150,
                titleAlign: 'center',
                columnAlign: 'center',
                isResize: true
            },
            {
                field: 'beforeDept',
                title: '异动前部门路径',
                width: 200,
                titleAlign: 'center',
                columnAlign: 'center',
                isResize: true
            },
            {
                field: 'beforePost',
                title: '异动前岗位',
                width: 150,
                titleAlign: 'center',
                columnAlign: 'center',
                isResize: true
            },									
            {
                field: 'beforePostone',
                title: '异动前岗位分类一',
                width: 150,
                titleAlign: 'center',
                columnAlign: 'center',
                isResize: true
            },									
            {
                field: 'beforePosttwo',
                title: '异动前岗位分类二',
                width: 150,
                titleAlign: 'center',
                columnAlign: 'center',
                isResize: true
            },									
            {
                field: 'beforeCategory',
                title: '异动前职类',
                width: 150,
                titleAlign: 'center',
                columnAlign: 'center',
                isResize: true
            },									
            {
                field: 'beforeRank',
                title: '异动前职级',
                width: 150,
                titleAlign: 'center',
                columnAlign: 'center',
                isResize: true
            },									
            {
                field: 'beforeZx',
                title: '异动前职衔',
                width: 150,
                titleAlign: 'center',
                columnAlign: 'center',
                isResize: true
            },									
            {
                field: 'afterDept',
                title: '异动后部门路径',
                width: 200,
                titleAlign: 'center',
                columnAlign: 'center',
                isResize: true
            },									
            {
                field: 'afterPost',
                title: '异动后岗位',
                width: 150,
                titleAlign: 'center',
                columnAlign: 'center',
                isResize: true
            },									
            {
                field: 'afterPostone',
                title: '异动后岗位分类一',
                width: 150,
                titleAlign: 'center',
                columnAlign: 'center',
                isResize: true
            },									
            {
                field: 'afterPosttwo',
                title: '异动后岗位分类二',
                width: 150,
                titleAlign: 'center',
                columnAlign: 'center',
                isResize: true
            },									
            {
                field: 'afterCategory',
                title: '异动后职类',
                width: 150,
                titleAlign: 'center',
                columnAlign: 'center',
                isResize: true
            },									
            {
                field: 'afterRank',
                title: '异动后职级',
                width: 150,
                titleAlign: 'center',
                columnAlign: 'center',
                isResize: true
            },									
            {
                field: 'afterZx',
                title: '异动后职衔',
                width: 150,
                titleAlign: 'center',
                columnAlign: 'center',
                isResize: true
            },									
            {
                field: 'personType',
                title: '异动后人员类别',
                width: 150,
                titleAlign: 'center',
                columnAlign: 'center',
                isResize: true
            },									
        ],
        defaultCheckedKeys:[], //选中的节点
    };
  },
  created(){
    this.initData()
  },
  methods:{
    //初始化数据
    initData(){
        //初始化部门数据
        const departRes =  JSON.parse(localStorage.getItem('departRes'))
        this.deptData.push(departRes.obj.departments)
    },
    //按条件查询
    search(){
        if(this.form.department == ''){
            Notify({ type: 'warning', message: '请选择部门！' })
        }else if(this.form.startTime == ''){
            Notify({ type: 'warning', message: '请选择开始时间！' })
        }else if(this.form.endTime == ''){
            Notify({ type: 'warning', message: '请选择结束时间！' })
        }else{
            let queryData = {}
            queryData = this.form
            queryChanges(queryData).then(res=>{
                this.tableData = res.obj
                this.pagePev() //分页方法
            })
        }
    },
    // 重置条件
    reset(){
        this.form = {
            department:'', //部门
            jobnumber:'', //工号
            name:'', //姓名
            startTime:'', //开始日期
            endTime:'', //结束日期
            classic:'', //异动分类
        }
        //清空tree
        this.$refs.tree.setCheckedKeys([]);
    },
    //选择部门
    pickDept(){
        this.showPickDept = true
    },
    //选择时触发
    handleCheckChange(data) {
        let res = this.$refs.tree.getCheckedNodes()
        this.defaultCheckedKeys = res
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
        this.form.deptIdStr = val
    },
    //打开时间选择器
    startTimeClick(){
        this.timeFlag = 0
        this.showTime = true
    },
    endTimeClick(){
        this.timeFlag = 1
        this.showTime = true
    },
    //确认选中时间
    confirm(val){
        if(this.timeFlag == 1){
            this.form.endTime = this.formatDate(val)
            let strStart = this.form.startTime.split('-').join('')
            let strEnd = this.form.endTime.split('-').join('')
            if(strStart>strEnd){
                Notify({ type: 'warning', message: '开始时间不得大于结束时间！' })
                this.form.endTime = ''
            }
        }else{
            this.form.startTime = this.formatDate(val)
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
    //表格行点击事件
    rowClick(rowIndex, rowData, column){
        // console.log(rowData)
        this.save_jobNum(rowData.jobnumber)
        this.from_page(1) //存标识，从哪个页面过来的
        this.scroll_top(document.getElementsByClassName("v-table-body")[0].scrollTop)
        this.$router.push({name:'basicMsg'})
    },
    //加载更多数据
    loadMore(){
        // debugger
        this.dataIndex++ //点击+1
        if(this.dataIndex >= this.fenyeData.length){
            Notify({ type: "warning", message: "没有更多数据了哦~" });
        }else{
            this.tableData = this.tableData.concat(this.fenyeData[this.dataIndex])
        }
    },
    //处理表格的分页方法
    pagePev(){
        this.total = this.tableData.length
        let result = []
        let chunk = 100 //100个一组
        for(var i = 0, j = this.tableData.length; i < j; i += chunk){
            result.push(this.tableData.slice(i,i + chunk))
        }
        // console.log(result)
        this.tableData = result[0] //默认显示100条
        this.fenyeData = result
    },
    ...mapMutations({
        save_jobNum:'save_jobNum',
        scroll_top:'scroll_top',
        from_page:'from_page',
    }),
  },
  watch:{
    //赋值离开页面时的表格滑动的高度
    '$store.state.scrollTop': function (newVal,oldVal) {
        // console.log('值来了哦')
        // console.log(this.$route.params.scrollTop)
        if(this.$route.params.scrollTop == undefined){
            return
        }else{
            document.getElementsByClassName("v-table-body")[0].scrollTop = this.$route.params.scrollTop
        }
    }
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
            line-height 35px
            text-align center
        }
    }
    .table{
        width 100%
        overflow-x auto
    }
    .more{
        font-size 14px
        padding 10px
    }
</style>