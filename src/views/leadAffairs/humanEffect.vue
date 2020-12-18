<template>
    <div>
        <div class="tiaojian">
          <van-field v-model="selectYear" label="选择年：" placeholder="请选择" @click-input="showyear=true" readonly/>
          <!-- <choosedepartment 
          ref="dept_content" 
          @transferFa="selctdept" 
          :Farequired="true">
          </choosedepartment> -->
          <pickdeptmore
          ref="select"
          @confirmNode="selctdept"
          @getAllVal="getAllVal"
          :Farequired="true"
          labelTitle="部门："
          :workingNum="true"
          :isSelctall="true"
          :isFromRost="true"
          :isShowDown="false"
          :faDeptData="deptData"
        ></pickdeptmore>
        <van-field
            v-model="selectPost"
            label="岗位分类一："
            placeholder="请选择"
            @click-input="showPost = true"
            readonly
          />
          <div class="btns">
              <van-button type="primary" size="small" color="#fc5f10" @click="search" style="width:45%;font-size:15px">查询</van-button>
              <van-button type="primary" size="small" color="#fc5f10" @click="reset" style="width:45%;font-size:15px">重置</van-button>
              <!-- <van-button type="primary" size="small" color="#fc5f10" @click="ceshi" style="font-size:15px">测试</van-button> -->
          </div>
        </div>
        <div class="title">
          <div class="remark">
            <p>默认展示当前负责单位人员效率</p>
          </div>
          <p class="titlea">
            <span class="borleft">人效情况</span>
            <!-- <span>（<span style="color:#ee0a24;font-weight:700">单位：万</span>）</span> -->
          </p>
          <!-- 累计指标计划表格 -->
          <div class="table">
              <v-table 
              ref="table"
              :height="400" 
              style="font-size:14px"
              title-bg-color="#e5ecf0"
              :columns="columns1"
              :table-data="tableData" 
              row-hover-color="#e5ecf0" 
              row-click-color="#f4f5f5"
              :show-vertical-border="false" 
              :row-click="rowClick"	
              :column-cell-class-name="columnCellClass"
              ></v-table>	
          </div>
          <div class="more">
            <van-tag type="warning">总条数：{{ total }}</van-tag>
            <span style="float:right" @click="loadMore"
              ><van-tag type="warning">下一页</van-tag></span
            >
          </div>
        </div>
        <!-- 累计完成情况 -->
        <!-- <div class="title">
          <p class="titlea">
            <span class="borleft">累计完成情况</span>
          </p>
          <div class="complete">
            <div class="itema">
              全<br>年<br>情<br>况
            </div>
            <div class="itemb">
              <div class="itemb_a">实际收入</div>
              <div class="itemb_b">626266万元</div>
            </div>
            <div class="itemc">
              <div class="itemb_a">平均在编</div>
              <div class="itemc_b">12902人</div>
            </div>
            <div class="itemd">
              <div class="itemb_a">人员效率</div>
              <div class="itemd_b">52万元/人</div>
            </div>
          </div>
        </div> -->
        <!-- 每月收入 -->
        <div class="title">
          <!-- 选择年 -->
          <van-field v-model="selectDrawYear" label="选择年：" placeholder="请选择" @click-input="showDrawYear=true" readonly/>
          <!-- 单选单位 -->
          <choosedepartment
            ref="resetForm"
            @transferFa="selctdept1"
            :workingNum="true"
            :faDeptData="deptData"
            :Farequired="true"
          ></choosedepartment>
          <!-- 选择岗位分类 -->
          <van-field
            v-model="selectPost1"
            label="岗位分类一："
            placeholder="请选择"
            @click-input="showPost1 = true"
            readonly
          />
          <p class="titlea">
            <span class="borleft">累计完成人效</span>
            <!-- <span>（<span style="color:#ee0a24;font-weight:700">单位：万</span>）</span> -->
          </p>
          <div class="charts">
            <div class="pie" ref="chart" id="chart"></div>
          </div>
          <div class="remark">
            <p>因组织架构调整，历史在编情况供参考</p>
          </div>
        </div>
        <!-- 选择年弹窗 -->
        <van-popup
        v-model="showyear" 
        get-container="body"
        position="bottom" 
        :style="{ height: '50%' }">
          <van-picker
            title="选择年份"
            show-toolbar
            :columns="columnTime"
            @confirm="onConfirm"
            @cancel="onCancel"
            :default-index="50"
          />
        </van-popup> 
        <!-- 选择图形年弹窗 -->
        <van-popup
        v-model="showDrawYear" 
        get-container="body"
        position="bottom" 
        :style="{ height: '50%' }">
          <van-picker
            title="选择年份"
            show-toolbar
            :columns="columnTime"
            @confirm="onConfirmDrawYear"
            @cancel="showDrawYear = false"
            :default-index="50"
          />
        </van-popup> 
        <!-- 选择岗位分类一的弹窗 -->
      <van-popup
        v-model="showPost"
        get-container="body"
        position="bottom"
        :style="{ height: '50%' }"
      >
        <div class="fenlei">
          <van-checkbox-group v-model="result1" ref="checkboxGroup">
          <van-checkbox v-for="item in columns" :key="item.code" :name="item" style="padding:10px;text-align:center">{{
            item.content
            }}</van-checkbox>
          </van-checkbox-group>
          <van-button type="info" size="mini" @click="onConfirm1" style="width:100%" color="#fc5f10">确定</van-button>
        </div>
      </van-popup>
      <!-- 选择岗位分类一的弹窗二 -->
      <van-popup
        v-model="showPost1"
        get-container="body"
        position="bottom"
        :style="{ height: '50%' }"
      >
        <van-picker
          title="请选择"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm2"
          value-key="content"
          @cancel="showPost1 = false"
        />
      </van-popup>
    </div>
</template>
<script>
import { Notify,Toast } from 'vant';
import { mapMutations } from 'vuex'
import { querySelectVal,selectAnalysisCondition,nextPage,selectDrawInfo } from './api'
import chooseDepartment from "@/components/pickerDeptOne.vue";
import pickDeptMore from "@/components/pickDeptMore.vue";
export default {
  components: {
    choosedepartment: chooseDepartment,
    pickdeptmore: pickDeptMore
  },
  data () {
    return {
      isDownYn: '', //全选的标识传给后台
      renxiaoCode: [], //保存的人效code
      selectDrawYear: '', //图形选择年
      showDrawYear: false, //图形选择年弹窗
      // isLoading: true, //表格数据加载
      // showecharts: false, //显示异常图形
      deptCodeStr: '', //单选的部门值
      showPost1: false, //图形选择岗位分类一弹窗
      selectPost1: '', //图形选择岗位分类1
      selectPostId1: '', //图形选择岗位分类1传给后台值
      dataIndex: 1, //分页页码
      total: '', //总条数
      deptData: [], //部门数据
      depts: [], //部门选择值
      result1: [], //选择岗位分类的checkbox
      selectYear: '', //选择年
      selectPost: '', //选择岗位分类一
      selectPostId: [], //传给后台岗位分类一的值
      showyear: false, //年弹窗
      showPost: false, //年弹窗
      minDate: new Date(2010, 0,0),
      maxDate: new Date(2025, 0,0),
      currentDate: new Date(),
      columnTime: [], //年
      results: '', //部门截取过后
      columns: [], //岗位分类
      tableData:[],
      columns1:[
        {
          field: 'custome', width: 50, titleAlign: 'center', columnAlign: 'center',title: '序号',
          formatter: function (rowData, index) {
              return index + 1
          }, isResize:true,
        },
        {field: 'time', title: '时间', width: 150, titleAlign: 'center',columnAlign:'center'},
        {field: 'deptOne', title: '一级单位', width: 150, titleAlign: 'center',columnAlign:'center'},
        {field: 'deptTwo', title: '二级部门', width: 150, titleAlign: 'center',columnAlign:'center'},
        {field: 'postOne', title: '岗位分类一', width: 150, titleAlign: 'center',columnAlign:'center'},
        {field: 'rxUnit', title: '人效单位', width: 150, titleAlign: 'center',columnAlign:'center',},
        {field: 'rxTarget', title: '年度人效目标', width: 150, titleAlign: 'center',columnAlign:'center',
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            if(rowData[field] == 0){
              return `<span>/</span>`;
            }
            return `<span>${rowData[field]}</span>`;
          }
        },
        {field: 'monthRx', title: '月度人效', width: 150, titleAlign: 'center',columnAlign:'center',},
        {field: 'diff', title: '月度人效同比', width: 150, titleAlign: 'center',columnAlign:'center',},
        {field: 'cumulRx', title: '累计人效', width: 150, titleAlign: 'center',columnAlign:'center',},
        {field: 'cumulDiff', title: '累计人效同比', width: 150, titleAlign: 'center',columnAlign:'center',},
        {field: 'rxProgress', title: '人效进度', width: 150, titleAlign: 'center',columnAlign:'center',},
        {field: 'progressDiff', title: '对比销售收入的进度差异', width: 170, titleAlign: 'center',columnAlign:'center',
          // formatter: function (rowData,rowIndex,pagingIndex,field) {
          //   // console.log(rowData[field]<0)
          //   if(rowData.chayi < 0){
          //     return `<span class='cell-edit-color-a'>${rowData[field]}</span>`;
          //   }else if(rowData.chayi >= 0){
          //     return `<span>${rowData[field]}</span>`;
          //   }
          // },
        },
      ],
      timeData: [],
      monthData: [],
      ljData: [],
      targetData: [],
    };
  },
  created(){
    this.initData() //初始化选择年
  },
  methods:{
      //表格行点击事件
    rowClick(rowIndex, rowData, column){
        console.log(rowData)
    },
    //单元格样式
    columnCellClass(rowIndex,columnName,rowData){
      // if (rowIndex % 2 == 0){
      //   return 'column-cell-class-name-test';
      // }
      if (rowData.postOne == null){
         return 'column-cell-class-name-test-a';
      }
      // if (rowData.chayi < 0 && columnName==='chayi'){
      //     return 'cell-edit-color-a';select
      // }
    },
    //选择年
    onConfirm(value, index) {
      // console.log(`当前值：${value}, 当前索引：${index}`);
      this.selectYear = value
      this.selectDrawYear = value
      this.showyear = false
    },
    onCancel() {
      this.showyear = false
    },
    //图形选择年
    onConfirmDrawYear(value){
      // console.log(value)
      this.selectDrawYear = value
      this.showDrawYear = false
      //清空图形的数据
      this.timeData = []
      this.monthData = []
      this.ljData = []
      this.targetData = []
      // 图形获取数据
      let queryData = {
        code: this.deptCodeStr,
        deptCode: this.renxiaoCode,
        year: this.selectDrawYear,
        postOne: this.selectPostId1,
      }
      selectDrawInfo(queryData).then(res=>{
        if(res.obj == ''){
          Notify({ type: "warning", message: "没有该数据" })
          return
        }else{
          for(let i in res.obj){
            this.timeData.push(res.obj[i].time)
            this.monthData.push(res.obj[i].monthRx)
            this.ljData.push(res.obj[i].cumulRx)
            this.targetData.push(res.obj[i].rxTarget)
          }
          this.initCharts()
        }
      })
    },
    MySort() {
      return this.sort((a, b) => a - b)
    },
    pickerYear(){
      let myDate = new Date();
      let tYear = myDate.getFullYear()
      this.columnTime.push(tYear)
      for(let i=1;i<=50;i++){
        this.columnTime.push(tYear+i)
        this.columnTime.push(tYear-i)
      }
      this.columnTime.sort(function(a, b) { //callback
      if (a > b) { // a b 分别是Arr中的 56 21
          return 1  //返回正数 ，b排列在a之前
      } else {
          return -1 //返回负数 ，a排列在b之前
      }
      })
    },
    initData(){
      const renxiaoOrganRes = JSON.parse(localStorage.getItem("renxiaoOrganRes"))
      this.renxiaoCode = JSON.parse(localStorage.getItem("renxiaoCodeRes"))
      this.selectDrawYear = this.formatDate(new Date())
      this.selectYear = this.formatDate(new Date())
      // console.log(renxiaoCode)
      this.deptData = renxiaoOrganRes
      // this.pickerYear() //初始化选择年
      this.$store.state.arrflag = '' //清空标识
      //加载中
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '数据加载中',
      })
      //获取下拉选择值
      querySelectVal().then(res=>{
        this.columnTime = res.obj.year
        this.columns = res.obj.postOne
      })
      //默认查询的人效
      let selectData = {
        year: this.selectYear,
        ids: this.depts,
        postOne: this.selectPostId,
        deptCode: this.renxiaoCode,
        jobnumber: localStorage.getItem("jobNum")
      }
      selectAnalysisCondition(selectData).then(res=>{
        this.total = res.totalSize
        this.tableData = res.obj
        //请求到数据之后停止加载
        // this.isLoading = false;
        //停止转圈
        Toast.clear()
      })
      // 图形获取数据
      let queryData = {
        code: '',
        year: this.selectYear,
        postOne: '',
        deptCode: this.renxiaoCode
      }
      selectDrawInfo(queryData).then(res=>{
        this.$refs.resetForm.selectedDepartment = res.name
        this.deptCodeStr = res.msg
        for(let i in res.obj){
          this.timeData.push(res.obj[i].time)
          this.monthData.push(res.obj[i].monthRx)
          this.ljData.push(res.obj[i].cumulRx)
          this.targetData.push(res.obj[i].rxTarget)
        }
        this.initCharts()
      })
    },
    //转换时间戳
    formatDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y;
    },
    //查询
    search(){
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '数据加载中',
      })
      let selectData = {
        year: this.selectYear,
        ids: this.depts,
        postOne: this.selectPostId,
        deptCode: this.renxiaoCode,
        jobnumber: localStorage.getItem('jobNum'),
        isDown: this.isDownYn
      }
      selectAnalysisCondition(selectData).then(res=>{
        this.tableData = res.obj
        this.total = res.totalSize
        //请求到数据之后停止加载
        // this.isLoading = false;
        this.isDownYn = '' //清空全选标识
        //停止转圈
        Toast.clear()
      })
    },
    //选择部门
    selctdept(data) {
      console.log(data)
      this.depts = data
    },
    // 是否包含下级部门的事件
    getAllVal(val){
      console.log(val)
      this.isDownYn = val //全选的标识 
    },
    //选择单位
    selctdept1(data) {
      // console.log(data)
      //清空图形的数据
      this.timeData = []
      this.monthData = []
      this.ljData = []
      this.targetData = []
      this.deptCodeStr = data.deptCode
      // 图形获取数据
      let queryData = {
        code: this.deptCodeStr,
        deptCode: this.renxiaoCode,
        year: this.selectDrawYear,
        postOne: this.selectPostId1,
      }
      selectDrawInfo(queryData).then(res=>{
        if(res.obj == ''){
          Notify({ type: "warning", message: "没有该数据" })
          return
        }else{
          for(let i in res.obj){
            this.timeData.push(res.obj[i].time)
            this.monthData.push(res.obj[i].monthRx)
            this.ljData.push(res.obj[i].cumulRx)
            this.targetData.push(res.obj[i].rxTarget)
          }
          this.initCharts()
        }
      })
    },
    //下一页
    loadMore() {
      this.dataIndex++; //点击+1
      let queryData = {
        jobnumber: localStorage.getItem('jobNum'),
        page: this.dataIndex
      }
      nextPage(queryData).then(res=>{
        if(res.obj == ''){
          Notify({ type: "warning", message: "没有更多数据了哦~" })
        }else{
          this.tableData = this.tableData.concat(res.obj)
          Toast('加载成功，请滑动表格查看')
        }
      })
    },
    //确认图形选择的岗位分类一
    onConfirm2(picker) {
      // console.log(picker)
      //清空图形的数据
      this.timeData = []
      this.monthData = []
      this.ljData = []
      this.targetData = []
      if(this.deptCodeStr == ''){
        Notify({ type: "warning", message: "请选择部门！" })
        this.showPost1 = false;
        return
      }
      
      this.selectPost1 = picker.content;
      this.selectPostId1 = picker.code;

      // 图形获取数据
      let queryData = {
        code: this.deptCodeStr,
        deptCode: this.renxiaoCode,
        year: this.selectDrawYear,
        postOne: this.selectPostId1,
      }
      selectDrawInfo(queryData).then(res=>{
        if(res.obj == ''){
          Notify({ type: "warning", message: "没有该数据" })
          return
        }else{
          for(let i in res.obj){
            this.timeData.push(res.obj[i].time)
            this.monthData.push(res.obj[i].monthRx)
            this.ljData.push(res.obj[i].cumulRx)
            this.targetData.push(res.obj[i].rxTarget)
          }
          this.initCharts()
        }
      })
      this.showPost1 = false;
    },
    initCharts () {
    　　let myChart = this.$echarts.init(this.$refs.chart);
        let data1 = this.ljData
        let data2 = this.monthData
        let data3 = this.targetData
        let seriesLabel = {
            normal: {
                show: true,
                // textBorderColor: 'red',
                position: 'inside',
                // offset: [10, 0],
                textBorderWidth: 2,
                // formatter: '{c}人 {b}'
                formatter: '{c}'
            }
        }
        let seriesLabel1 = {
            normal: {
                show: true,
                // textBorderColor: 'red',
                position: 'top',
                // offset: [10, 0],
                textBorderWidth: 2,
                // formatter: '{c}人 {b}'
                formatter: '{c}'
            }
        }
    　　// 绘制图表
    　　myChart.setOption({
            tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "cross",
                  crossStyle: {
                    color: "#999"
                  }
                },
              },
              xAxis: {
                type: 'category',
                data: this.timeData
              },
              yAxis: {
                  type: 'value',
                  name:'单位（人）',
                  nameTextStyle: {
                    // align: 'verticalAlign',
                    padding: [0, 0, 0, 30]
                  }
              },
              grid: {
                left: '1%',
                containLabel: true
              },
            series: [
                {
                  label: seriesLabel1,
                  name: '累计人效',
                  type: 'line',
                  data: data1,
                  itemStyle: {
                    normal: {
                      color: '#4875c5'
                    }
                  }
                },
                {
                    label: seriesLabel,
                    name: '月度人效',
                    type: 'bar',
                    data: data2,
                    itemStyle: {
                      normal: {
                        color: '#bf0000'
                      }
                  }
                },
                {
                  // label: seriesLabel,
                  name: '年度人效目标',
                  type: 'line',
                  data: [data3[0]],
                  markLine: {
                      // data: [{
                      //   type: 'average'
                      // }],
                      // label:{
                      //     position:"middle",         //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
                      //     formatter: data3[0]+'人'
                      // },
                      // symbol: "none", //是否显示基准线的箭头
                      silent: true, // 鼠标移上是否有响应（线变粗）
                      data: [
                        {
                          yAxis: data3[0],
                          //type: "min/max/average" // 特殊的标注类型，用于标注最大值最小值等。
                          lineStyle: { // 线的样式
                            color: "#fc5f10",
                            width: 1,
                            opacity: 0.8
                          },
                          label: { // 文字的样式，默认是白色，有时候文字不显示，可能是颜色的问题
                            color: "#fc5f10"
                          }
                        },
                      ],
                      label: { // 样式也可以统一设置
                        padding: [-13, -40, 0, 0],
                        position:"middle",
                        formatter: function (params) {
                          return `${'年度人效目标 '+params.value}`
                        }
                      }
                  },
                },
            ],
            dataZoom: [
              {
                  show: true,
                  realtime: true,
                  start: 0,
                  end: 100
              },
              {
                  type: 'inside',
                  realtime: true,
                  start: 0,
                  end: 60
              }
          ],
           legend: {
            // left: 'left',
            data: ['累计人效', '月度人效','年度人效目标']
          },
    　　});
        window.onresize = myChart.resize
        //点击事件
        // myChart.getZr().off('click');
        // let that = this
        // myChart.getZr().on('click',function (params) {
        //   var pointInPixel= [params.offsetX, params.offsetY];
        //   if (myChart.containPixel('grid',pointInPixel)) {
        //     /*单击图标X轴数据，打开详情*/
        //       var xIndex = myChart.convertFromPixel({seriesIndex:0},pointInPixel)[1];
        //       // console.log(data1[xIndex])
        //     switch (data2[xIndex].name) {
        //       case '初中':
        //         console.log(data2[xIndex].name)
        //         var queryData = {}
        //         that.showTable = true
        //         queryData.jobnumbers = that.xlTeam.xlchuZhongJobnumber
        //         queryRoster(queryData).then(res=>{
        //             that.popupTableData = res.obj
        //             that.pagePev() //获取的表格数据分组
        //         })
        //         break;
            
        //       default:
        //         break;
        //     }
        //   }
        // });
　　},
    //重置查询
    reset(){
      this.selectPost = ''
      this.selectYear = ''
      this.$refs.select.restFlag = true
      this.$refs.select.selectedDepartment = ''
      this.selectPostId = []
    },
    //确认选择岗位分类一
    onConfirm1(){
      // console.log(picker)
      let str = "";
      let val = "";
      for (let i in this.result1) {
        str += this.result1[i].content + ",";
        // val += this.result1[i].code + ",";
        this.selectPostId.push(this.result1[i].code)
      }
      if (str.length > 0) {
        str = str.substr(0, str.length - 1);
        // val = val.substr(0, val.length - 1);
      }
      this.selectPost = str
      this.result1 = [];
      this.showPost = false;
    },
    ...mapMutations({
      save_type:'save_type',
      arr_flag:'arr_flag'
    })
  },
  mounted(){
    // const departRes =  JSON.parse(localStorage.getItem('departRes'))
  },
  watch:{
    '$store.state.arrflag': function (newVal,oldVal) {
        // console.log(this.$store.state.arrflag)
          if(this.$store.state.arrflag == 1 || this.$store.state.arrflag == 2){
            const myChart = this.$echarts.init(document.getElementById('chart'))
            myChart.resize()
          }
      },
  }
}
</script>
<style>
    td{
      vertical-align: bottom
    }
    .column-cell-class-name-test{
      background-color: #f5f5f5;
    }
    .column-cell-class-name-test-a{
      background-color: #f7c7a7;
    }
    .cell-edit-color-a{
      color:#dd001b;
    }
    .cell-edit-color-b{
      color:#f6a763;
    }
    .cell-edit-color-c{
      color:#6b9daf;
    }
    .cell-edit-color-d{
      color:#f1b2d3;
    }
</style>
<style lang="stylus" scoped>
  .tiaojian{
    padding 10px
    .btns{
      padding 10px
      text-align center
    }
  }
  .title{
    .titlea{
        height 35px
        line-height 40px
        color #f39f57
        font-size 15px
        box-shadow 0 2px 3px -1px #eee
        margin-bottom 8px
        .borleft{ 
          font-weight 700
          border-left 4px solid #f39f57
          padding-left 6px
        }
      }
    .table{
        width 100%
        overflow-x auto
    }
    .complete{
      display flex
      overflow-x auto
      height 100px
      font-size 14px
      text-align center
      .itema{
        flex 1
        line-height 24px
        font-weight 700
        background-color #eee
        border-right 2px solid #fff
      }
      .itemb{
        flex 2
        line-height 30px
        text-align center
        border-right 2px solid #fff
        .itemb_b{
          width 100%
          height 50%
          line-height 50px
          font-weight 700
          float left
          background-color #67bac9
        }
      }
      .itemb_a{
        width 100%
        height 50%
        line-height 50px
        float left
        color #6296a9
        font-weight 700
        background-color #f5e9d6
      }
      .itemc{
        flex 2
        border-right 2px solid #fff
        .itemc_b{
          width 100%
          height 50%
          line-height 50px
          font-weight 700
          float left
          background-color #178277
        }
      }
      .itemd{
        flex 2
        .itemd_b{
          width 100%
          height 50%
          line-height 50px
          font-weight 700
          float left
          background-color #7ffe16
        }
      }
    }
    .charts{
      height 500px
      background-color #f6f6f8
      .pie{
          width 100%
          height 100%
      }
    }
  }
  .fenlei{
    padding 10px
    text-align center
  }
  .more {
    font-size: 14px;
    padding: 10px;
  }
  .remark{
    font-size 14px
    text-align center
    color #ee6471
    p{
      font-weight 700
      padding 10px
    }
  }
</style>