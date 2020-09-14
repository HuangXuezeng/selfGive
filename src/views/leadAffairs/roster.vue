<template>
    <div>
        <div class="header">
            <van-field v-model="form.deptName" label="部门" placeholder="请选择部门" />
            <van-field v-model="form.workNum" label="工号" placeholder="请输入工号" />
            <van-field v-model="form.perName" label="姓名" placeholder="请输入姓名" />
            <div class="btn">
                <van-button type="primary" size="small">查询</van-button>
                <van-button type="primary" size="small" @click="reset">重置</van-button>
                <van-button type="primary" size="small" @click="setMenu">设置</van-button>
            </div>
        </div>
        <div class="table" ref="table">
            <v-table is-horizontal-resize style="width:100%" 
            :columns="columns" 
            :table-data="tableData" 
            row-hover-color="#eee" 
            row-click-color="#edf7ff" 
            :cell-edit-done="cellEditDone"
            @sort-change="sortChange"
            :paging-index="(pageIndex-1)*pageSize"   	
            ></v-table>
            <div class="mt20 mb20 bold" style="margin-top:10px;">
                <v-pagination @page-change="pageChange" @page-size-change="pageSizeChange" :total="total" size='small' :page-size="pageSize" :layout="['prev', 'pager', 'next']"></v-pagination>
            </div>   	
        </div>
        <!-- 弹出框 -->
        <van-popup v-model="showPick" position="top" :style="{ height: '70%' }" get-container="body" closeable>
            <div class="pick">
                <van-checkbox-group v-model="result" ref="checkboxGroup">
                    <van-checkbox name="a">复选框 a</van-checkbox>
                    <van-checkbox name="b">复选框 b</van-checkbox>
                    <van-checkbox name="c">复选框 c</van-checkbox>
                </van-checkbox-group>
                <van-button type="primary" size="mini" @click="checkAll">全选</van-button>
                <van-button type="info" size="mini" @click="toggleAll">反选</van-button>
            </div>
        </van-popup>
    </div>
</template>
<script>
import { Popup,Checkbox,CheckboxGroup } from 'vant'
export default {
  data () {
    return {
        form:{
            deptName: '',
            workNum: '',
            perName: '',
        },
        showPick: false, //弹窗
        result: [], //多选框
        total:0,
        pageIndex:1,
        pageSize:10,
        tableData: [{
                RowId: 1,
                dt_Deadline: "2020-06-13T03:03:34.777Z",
                dt_OfficialDeadline: "2020-07-28",
                n_CaseID: 49218,
                n_EmployeeID: 1000288,
                s_CaseName: "移动电源（P521）",
                s_CaseSerial: "ZJM07",
                s_ClientName: "宁波狮球线缆有限公司",
                s_Name: "张三",
                s_Status: "未处理",
                s_TaskName: "受通转达"
            },
            {
                RowId: 2,
                dt_Deadline: "2020-07-27T16:00:00Z",
                dt_OfficialDeadline: "2020-07-28",
                n_CaseID: 86167,
                n_EmployeeID: 25,
                s_CaseName: "动态环境下基于多特征聚类匹配的目标跟踪方法",
                s_CaseSerial: "ZL17-3723-1",
                s_ClientName: "武汉工程大学",
                s_Name: "李四",
                s_Status: "未处理",
                s_TaskName: "交审查费"
            },
            {
                RowId: 3,
                dt_Deadline: "2020-07-27T16:00:00Z",
                dt_OfficialDeadline: "2020-07-28",
                n_CaseID: 86167,
                n_EmployeeID: 12,
                s_CaseName: "动态环境下基于多特征聚类匹配的目标跟踪方法",
                s_CaseSerial: "ZL17-3723-1",
                s_ClientName: "武汉工程大学  授权后通知客户自缴官费",
                s_Name: "王五",
                s_Status: "未处理",
                s_TaskName: "提实审"
            },
            {
                RowId: 4,
                dt_Deadline: "2020-07-27T16:00:00Z",
                dt_OfficialDeadline: "2020-07-28",
                n_CaseID: 86162,
                n_EmployeeID: 135,
                s_CaseName: "一种防静电保护膜及其制造方法",
                s_CaseSerial: "ZL17-3718-1",
                s_ClientName: "宁波启合新材料科技有限公司 有协议  （俞雄飞客户）",
                s_Name: "赵六",
                s_Status: "未处理",
                s_TaskName: "交审查费",
            }
        ],
        columns: [{
                    field: 's_CaseSerial',
                    title: '我方文号',
                    width: 150,
                    titleAlign: 'center',
                    columnAlign: 'center',
                    formatter: function(rowData, rowIndex, pagingIndex, field) {
                        return `<span style="color:#4078c0;">${rowData[field]}</span>`;
                    },
                    isResize: true,
                    isFrozen: true,
                },
                {
                    field: 'dt_OfficialDeadline',
                    title: '官方期限',
                    width: 150,
                    titleAlign: 'center',
                    columnAlign: 'center',
                    isResize: true
                },
                {
                    field: 's_TaskName',
                    title: '任务名称',
                    width: 150,
                    titleAlign: 'center',
                    columnAlign: 'center',
                    isResize: true
                },
                {
                    field: 's_CaseName',
                    title: '案件名称',
                    width: 150,
                    titleAlign: 'center',
                    columnAlign: 'center',
                    isResize: true
                },
                {
                    field: 's_ClientName',
                    title: '客户名称',
                    width: 150,
                    titleAlign: 'center',
                    columnAlign: 'center',
                    isResize: true
                },
                {
                    field: 's_Name',
                    title: '执行人',
                    width: 150,
                    titleAlign: 'center',
                    columnAlign: 'center',
                    isResize: true
                },					
                {
                    field: 's_Status',
                    title: '任务状态',
                    width: 150,
                    titleAlign: 'center',
                    columnAlign: 'center',
                    formatter: function(rowData, rowIndex, pagingIndex, field) {
                        if(rowData.s_Status == '未处理'){
                            return `<span class='cell-edit-color' style="color:#ED7D31">${rowData[field]}</span>`;
                        }else{
                            return `<span class='cell-edit-color' >${rowData[field]}</span>`;
                        }
                        
                    },					
                    isResize: true
                }
        ]
    };
  },
  created(){
    
  },
  methods:{
    //重置
    reset(){
        this.form = {
            deptName: '',
            workNum: '',
            perName: '',
        }
    },
    setMenu(){
        this.showPick = true
    },
    //全选
    checkAll() {
      this.$refs.checkboxGroup.toggleAll(true);
    },
    //反选
    toggleAll() {
      this.$refs.checkboxGroup.toggleAll();
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

    }
  },
  mounted(){
    // console.log(this.$refs)
  }
}
</script>
<style lang="stylus" scoped>
    .header{
        padding 10px
        box-shadow 0 0  10px #eee
        .btn{
            padding 10px
        }
    }
    .table{
        width 100%
    }
    .pick{
        padding 10px
        line-height 25px
    }
    .van-checkbox{
        padding 5px
    }
</style>