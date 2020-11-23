<template>
  <div>
    <div class="tiaojian">
      <van-field
        v-model="selectTime"
        label="选择年："
        placeholder="请选择"
        @click-input="showTime = true"
        readonly
      />
      <van-field
        v-model="selectPost"
        label="岗位分类一："
        placeholder="请选择"
        @click-input="showPost = true"
        readonly
      />
      <pickdeptmore
        ref="select"
        @confirmNode="selctdept"
        :Farequired="true"
        labelTitle="部门："
        :workingNum="true"
        :isSelctall="true"
        :isFromRost="true"
        :faDeptData="deptData"
      ></pickdeptmore>
      <div class="btns">
        <van-button
          type="primary"
          size="small"
          color="#fc5f10"
          @click="search"
          style="width:45%;font-size:15px"
          >查询</van-button
        >
        <van-button
          type="primary"
          size="small"
          color="#fc5f10"
          @click="reset"
          style="width:45%;font-size:15px"
          >重置</van-button
        >
        <!-- <van-button
          type="primary"
          size="small"
          color="#fc5f10"
          @click="ceshi"
          style="width:45%;font-size:15px"
          >测试</van-button
        > -->
      </div>
    </div>
    <!-- 一级单位编制情况 -->
    <div class="onedept">
      <p class="titlea"><span class="borleft"></span> 一级单位编制情况</p>
      <div class="table">
        <v-table
          ref="table"
          is-horizontal-resize
          :height="400"
          style="width:100%;font-size:14px"
          columns-width-drag
          title-bg-color="#e5ecf0"
          :columns="columns1"
          :table-data="tableData1"
          row-hover-color="#e5ecf0"
          row-click-color="#e5ecf0"
          :show-vertical-border="true"
          :row-click="rowClick1"
          :column-cell-class-name="columnCellClass"
        ></v-table>
      </div>
    </div>
    <!-- 编制情况 -->
    <div class="onedept" style="margin-top:10px">
      <p class="titlea"><span class="borleft"></span> 在编情况</p>
        <!-- <div>
          <van-dropdown-menu>
            <van-dropdown-item v-model="deptValue" :options="option" @change="handChange"/>
            <van-dropdown-item v-model="deptValue1" :options="option1" @change="handChange1"/>
          </van-dropdown-menu>
        </div> -->
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
      <div class="postrank" v-if="showecharts">
        <div class="pie" ref="chart1" id="chart1"></div>
      </div>
      <div class="postrank" style="margin-top:10px" v-if="showecharts">
        <div class="pie" ref="chart" id="chart"></div>
      </div>
    </div>
    <!-- 选择年的弹窗 -->
    <van-popup
      v-model="showTime"
      get-container="body"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-picker
        title="选择年份"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showTime = false"
      />
    </van-popup>
    <!-- 选择岗位分类一的弹窗 -->
    <van-popup
      v-model="showPost"
      get-container="body"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-picker
        title="请选择"
        show-toolbar
        :columns="columns2"
        @confirm="onConfirm1"
        value-key="content"
        @cancel="showPost = false"
      />
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
        :columns="columns3"
        @confirm="onConfirm2"
        value-key="content"
        @cancel="showPost1 = false"
      />
    </van-popup>
  </div>
</template>
<script>
import pickDeptMore from "@/components/pickDeptMore.vue";
import chooseDepartment from "@/components/pickerDeptOne.vue";
import { getSelector,selectBianzhi,getPostOne,selectDraw } from './api'
import { Toast } from 'vant'
export default {
  components: {
    pickdeptmore: pickDeptMore,
    choosedepartment: chooseDepartment
  },
  data() {
    return {
      showecharts: false,
      deptId: [],
      deptIdStr: '',
      deptData: [], //部门数据
      showTime: false, //选择年月弹窗
      showPost: false, //搜索选择岗位分类一弹窗
      showPost1: false, //图形选择岗位分类一弹窗
      selectPost: '', //岗位分类1
      selectPostId: '', //岗位分类1传给后台值
      selectPost1: '', //图形选择岗位分类1
      selectPostId1: '', //图形选择岗位分类1传给后台值
      selectTime: "", //选择年值
      minDate: new Date(1980, 0, 1),
      maxDate: new Date(2030, 10, 1),
      currentDate: new Date(),
      columns:[], //年份
      columns2:[], //岗位分类一
      columns3:[], //图形岗位分类一
      columns1: [
        {
          field: "custome",
          width: 50,
          titleAlign: "center",
          columnAlign: "center",
          title: "序号",
          formatter: function(rowData, index) {
            return index + 1;
          },
          isResize: true
        },
        {
          field: "deptName",
          title: "部门名称",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "postOne",
          title: "岗位分类一",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "dingbian",
          title: "全年定编",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "avgOnjob",
          title: "平均在编",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "cadreDingbian",
          title: "干部在编",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "cadreOnjob",
          title: "干部平均在编",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "more",
          title: "超缺编",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          // formatter: function(rowData, rowIndex, pagingIndex, field) {
          //   if(rowData[field] == '-3'){
          //     return `<div class="overauto">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈</div>`
          //   }
          // },
          isResize: true
        }
      ],
      tableData1: [], //一级单位编制情况表格
      echartData1: [],
      echartData2: [],
      echartData3: [],
      echartData4: [],
      monthData: [],
      monthData1: [],
      deptValue: '0', //图形选择部门名称
      deptValue1: '0', //图形选择岗位分类
    };
  },
  created(){
    this.initData()
  },
  methods: {
    //表格行点击事件
    rowClick1(rowIndex, rowData, column) {
      console.log(rowData);
    },
    //确认选择的时间
    onConfirm(val) {
      // console.log(val)
      this.selectTime = val;
      this.showTime = false;
    },
    //确认选择的岗位分类一
    onConfirm1(picker) {
        console.log(picker)
      this.selectPost = picker.content;
      this.selectPostId = picker.code;
      this.showPost = false;
    },
    //确认图形选择的岗位分类一
    onConfirm2(picker) {
      console.log(picker)
      this.selectPost1 = picker.content;
      this.selectPostId1 = picker.code;
      //岗位分类一的数据
      let selectData = {
        deptId: this.deptIdStr,
        year: this.selectTime,
        postOne: this.selectPostId1,
        sign: 'postOne'
      }
      selectDraw(selectData).then(res=>{
        let monthArr1 = []
        let echartArr3 = []
        let echartArr4 = []
        for(let i in res.obj){
          monthArr1.push(res.obj[i].time)
          echartArr3.push(res.obj[i].avgOnjob)
          echartArr4.push(res.obj[i].dingbian)
        }
        this.monthData1 = monthArr1
        this.echartData3 = echartArr3
        this.echartData4 = echartArr4
        this.initCharts1()
      })
      this.showPost1 = false;
    },
    //转换时间戳
    formatDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m;
    },
    //初始化数据
    initData(){
      const bianzhiOrganRes = JSON.parse(localStorage.getItem("bianzhiOrganRes"))
      // console.log(bianzhiOrganRes)
      this.deptData = bianzhiOrganRes
      //获取岗位分类一和年份
      getSelector().then(res=>{
        this.columns = res.obj.year
        this.columns2 = res.obj.postOne
      })
      //默认查询
      let queryData = {
        deptCode: JSON.parse(localStorage.getItem("bianzhiCodeRes")),
        year: '',
        postOne: '',
        ids: []
      }
      selectBianzhi(queryData).then(res=>{
        this.tableData1 = res.obj
      })
    },
    //给value加字段名方法
    newArr(e){
        let arr = []
        for(let [k,v] of Object.entries(e)){
            let map = {}
            map.text = v
            map.value = k
            arr.push(map)
        }
        return arr
    },
    //选择部门
    selctdept(data) {
      // console.log(data)
      this.deptId = data
      //数组转字符串
      // this.form.deptIdStr = data.toString();
      // console.log(this.form.deptIdStr);
      //   this.deptVal = data
    },
    //条件搜索
    search(){
      let queryData = {
        deptCode: JSON.parse(localStorage.getItem("bianzhiCodeRes")),
        year: this.selectTime,
        postOne: this.selectPostId,
        ids: this.deptId
      }
      selectBianzhi(queryData).then(res=>{
        if(res.code == 1000){
          this.tableData1 = res.obj
        }else{
          Toast.fail(res.msg)
        }
      })
    },
    //重置查询
    reset() {
      this.$refs.select.selectedDepartment = "";
      this.$refs.select.select = "";
      this.deptId = [] //清空部门值
      this.$refs.select.restFlag = true;
      this.selectPostId = ""; //岗位分类1
      this.selectPost = '' //岗位分类1
      this.selectTime = '' //选择年值
    },
    //在编情况
    initCharts() {
      let myChart = this.$echarts.init(this.$refs.chart);
      let seriesLabel = {
        normal: {
          show: true,
          position: "inside", //在上方显示
          textBorderWidth: 2,
          formatter: `{c}人`
        }
      };
      let seriesLabel1 = {
        normal: {
          show: true,
          position: "inside", //在上方显示
          textBorderWidth: 2,
          formatter: `{c}人`
        }
      }; // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          },
          // formatter: function(params) {
          //   // console.log(params);
          //   return params[0].name+'<br>'
          //   +'<div class="runoff" style="background-color:#c23531"></div>'+'流失人数：'+params[0].data+'<br>'
          //   +'<div class="runoff" style="background-color:#2f4554"></div>'+'干部流失人数：'+params[1].data+'<br>'
          //   +'<div class="runoff" style="background-color:#61a0a8"></div>'+'流失率：'+params[2].data+'%<br>'
          //   +'<div class="runoff" style="background-color:#d48265"></div>'+'干部流失率：'+params[3].data+'%<br>'
          // }
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 0,
            end: 50
          },
          {
            type: "inside",
            realtime: true,
            start: 0,
            end: 50
          }
        ],
        legend: {
          data: ["蒸发量", "降水量", "平均温度"]
        },
        xAxis: [
          {
            type: "category",
            data: this.monthData,
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "在编",
            axisLabel: {
              formatter: "{value}人"
            }
          },
          {
            type: "value",
            name: "定编",
            axisLabel: {
              formatter: "{value} 人"
            }
          }
        ],
        series: [
          {
            label: seriesLabel,
            name: "人数",
            type: "bar",
            data: this.echartData1
          },
          {
            label: seriesLabel1,
            name: "定编",
            type: "line",
            yAxisIndex: 1,
            data: this.echartData2
          },
        ]
      });
      window.onresize = myChart.resize;
      //点击事件
      // myChart.on("click", function(params) {});
    },
    initCharts1() {
      let myChart = this.$echarts.init(this.$refs.chart1);
      let seriesLabel = {
        normal: {
          show: true,
          position: "inside", //在上方显示
          textBorderWidth: 2,
          formatter: `{c}人`
        }
      };
      let seriesLabel1 = {
        normal: {
          show: true,
          position: "inside", //在上方显示
          textBorderWidth: 2,
          formatter: `{c}人`
        }
      }; // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          },
          // formatter: function(params) {
          //   // console.log(params);
          //   return params[0].name+'<br>'
          //   +'<div class="runoff" style="background-color:#c23531"></div>'+'流失人数：'+params[0].data+'<br>'
          //   +'<div class="runoff" style="background-color:#2f4554"></div>'+'干部流失人数：'+params[1].data+'<br>'
          //   +'<div class="runoff" style="background-color:#61a0a8"></div>'+'流失率：'+params[2].data+'%<br>'
          //   +'<div class="runoff" style="background-color:#d48265"></div>'+'干部流失率：'+params[3].data+'%<br>'
          // }
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 0,
            end: 50
          },
          {
            type: "inside",
            realtime: true,
            start: 0,
            end: 50
          }
        ],
        legend: {
          data: ["蒸发量", "降水量", "平均温度"]
        },
        xAxis: [
          {
            type: "category",
            data: this.monthData1,
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "人数",
            axisLabel: {
              formatter: "{value}人"
            }
          },
          {
            type: "value",
            name: "定编",
            axisLabel: {
              formatter: "{value} 人"
            }
          }
        ],
        series: [
          {
            label: seriesLabel,
            name: "人数",
            type: "bar",
            data: this.echartData3
          },
          {
            label: seriesLabel1,
            name: "定编",
            type: "line",
            yAxisIndex: 1,
            data: this.echartData4
          }
        ]
      });
      window.onresize = myChart.resize;
      //点击事件
      // myChart.on("click", function(params) {});
    },
    //选择单位
    selctdept1(data) {
      console.log(data)
      this.showecharts = true
      this.deptIdStr = data.deptId;
      // 根据部门查询岗位分类一
      let queryData = {
        deptId: data.deptId,
        year: this.selectTime
      }
      getPostOne(queryData).then(res=>{
        this.columns3 = res.obj
      })
      // 图形获取数据
      let selectData = {
        deptId: data.deptId,
        year: this.selectTime,
        postOne: this.selectPostId1,
        sign: 'cadre'
      }
      //干部的数据
      selectDraw(selectData).then(res=>{
        let monthArr = []
        let echartArr1 = []
        let echartArr2 = []
        for(let i in res.obj){
          monthArr.push(res.obj[i].time)
          echartArr1.push(res.obj[i].avgOnjob)
          echartArr2.push(res.obj[i].dingbian)
        }
        this.monthData = monthArr
        this.echartData1 = echartArr1
        this.echartData2 = echartArr2
        this.initCharts()
        this.initCharts1()
      })
      //岗位分类一的数据
      selectData.sign = 'postOne'
      selectDraw(selectData).then(res=>{
        let monthArr1 = []
        let echartArr3 = []
        let echartArr4 = []
        for(let i in res.obj){
          monthArr1.push(res.obj[i].time)
          echartArr3.push(res.obj[i].avgOnjob)
          echartArr4.push(res.obj[i].dingbian)
        }
        this.monthData1 = monthArr1
        this.echartData3 = echartArr3
        this.echartData4 = echartArr4
        this.initCharts1()
      })
    },
    //单元格样式
    columnCellClass(rowIndex, columnName, rowData) {
      if (rowIndex % 2 == 0) {
        return "column-cell-class-name-test";
      }
    },
  },
  mounted(){
    // this.initCharts1()
    // this.initCharts()
  }
};
</script>
<style>
    /* .icon-fanhui{
        color:red
    } */
    .overauto{
      width: 100%;
      overflow: auto;
    }
    .column-cell-class-name-test {
      background-color: #f6f6f8;
    }
</style>
<style lang="stylus" scoped>
.tiaojian {
  padding: 10px;
  .btns {
    padding: 10px;
    text-align: center;
  }
}

.onedept {
  .titlea {
    height: 40px;
    line-height: 40px;
    color: #f39f57;
    font-size: 15px;
    font-weight: 700;
    box-shadow: 0 2px 3px -1px #eee;
    margin-bottom: 8px;

    .borleft {
      border-left: 4px solid #f39f57;
      padding-right: 6px;
    }
  }

  .table {
    width: 100%;
    overflow-x: auto;
  }
  .postrank {
    // height: 400px;
    background-color: #f6f6f8;

    .pie {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
