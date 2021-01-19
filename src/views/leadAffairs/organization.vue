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
        @getIsdownVal="getIsdownVal"
      ></pickdeptmore>
      <van-field
        v-model="selectPost"
        label="岗位分类一："
        placeholder="请选择"
        @click-input="showPost = true"
        readonly
      />
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
      <div class="remark">
        <p>默认展示当前负责单位编制内人员编制</p>
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
        <!-- 选择年 -->
        <van-field v-model="selectDrawYear" label="选择年：" placeholder="请选择" @click-input="showDrawYear=true" readonly/>
        <!-- 单选单位 -->
        <choosedepartment
        ref="resetForm1"
        @transferFa="selctdept1"
        :workingNum="true"
        :labelTitleFlag="true"
        :faDeptData="deptData"
        :Farequired="true"
      ></choosedepartment>
      <!-- 选择岗位分类 -->
      <van-field
        v-model="selectPost1"
        label="岗位分类一："
        placeholder="请选择"
        @click-input="showPostClick"
        readonly
      />
      <div class="titlechart">全员在编情况</div>
      <div class="postrank">
        <div class="pie" ref="chart1" id="chart1"></div>
      </div>
      <div class="titlechart">干部在编情况</div>
      <!-- 选择年 -->
        <van-field v-model="selectDrawYear1" label="选择年：" placeholder="请选择" @click-input="showDrawYear1=true" readonly/>
      <!-- 单选单位 -->
        <div style="padding:5px 0 5px 0">
          <choosedepartment
            ref="resetForm"
            @transferFa="selctdept2"
            :workingNum="true"
            :labelTitleFlag="true"
            :faDeptData="deptData"
            :Farequired="true"
          ></choosedepartment>
        </div>
      <div class="postrank">
        <div class="pie" ref="chart" id="chart"></div>
      </div>
      <div class="remark">
        <p>因组织架构调整，历史在编情况供参考</p>
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
    <!-- 选择图形1年弹窗 -->
    <van-popup
    v-model="showDrawYear" 
    get-container="body"
    position="bottom" 
    :style="{ height: '50%' }">
      <van-picker
        title="选择年份"
        show-toolbar
        :columns="columns"
        @confirm="onConfirmDrawYear"
        @cancel="showDrawYear = false"
        :default-index="50"
      />
    </van-popup> 
    <!-- 选择图形2年弹窗 -->
    <van-popup
    v-model="showDrawYear1" 
    get-container="body"
    position="bottom" 
    :style="{ height: '50%' }">
      <van-picker
        title="选择年份"
        show-toolbar
        :columns="columns"
        @confirm="onConfirmDrawYear1"
        @cancel="showDrawYear1 = false"
        :default-index="50"
      />
    </van-popup> 
    <!-- 选择岗位分类一的弹窗 -->
    <van-popup
      v-model="showPost"
      position="bottom"
      :style="{ height: '50%' }"
      get-container="body"
    >
      <div class="fenlei">
        <van-checkbox-group v-model="result1" ref="checkboxGroup">
        <van-checkbox v-for="item in columns2" :key="item.code" :name="item" style="padding:10px;text-align:center">{{
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
import { Notify, Toast } from 'vant'
export default {
  components: {
    pickdeptmore: pickDeptMore,
    choosedepartment: chooseDepartment
  },
  data() {
    return {
      isDownYn: '', //全选的标识传给后台
      isDown: 'Y', //是否包含下级部门
      bianzhiCodeRes: [], //保存的编制code
      selectDrawYear: '', //图形1选择年
      selectDrawYear1: '', //图形2选择年
      showDrawYear: false, //图形1选择年弹窗
      showDrawYear1: false, //图形2选择年弹窗
      // isLoading: true, //表格数据加载
      result1: [],//岗位分类一
      result2: [],//岗位分类一（二）
      // showecharts: false,
      deptId: [],
      deptIdStr: '',
      deptData: [], //部门数据
      showTime: false, //选择年月弹窗
      showPost: false, //搜索选择岗位分类一弹窗
      showPost1: false, //图形选择岗位分类一弹窗
      selectPost: '', //岗位分类1
      selectPostId: [], //岗位分类1传给后台值
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
          width: 80,
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
          isResize: true,
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            if(rowData[field] == null){
              rowData[field] = ''
            }
            return `<span>${rowData[field]}</span>`;
          }
        },
        {
          field: "realOnjob",
          title: "当前在编",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            if(rowData[field] == null){
              rowData[field] = ''
            }
            return `<span>${rowData[field]}</span>`;
          }
        },
        {
          field: "avgOnjob",
          title: "平均在编",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            if(rowData[field] == null){
              rowData[field] = ''
            }
            return `<span>${rowData[field]}</span>`;
          }
        },
        {
          field: "more",
          title: "超编",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          // formatter: function(rowData, rowIndex, pagingIndex, field) {
          //   if(rowData[field] == '-3'){
          //     return `<div class="overauto">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈</div>`
          //   }
          // },
          isResize: true
        },
        {
          field: "cadreDingbian",
          title: "干部定编",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            if(rowData[field] == null){
              rowData[field] = ''
            }
            return `<span class='cell-edit-color-b'>${rowData[field]}</span>`;
          }
        },
        {
          field: "cadreRealOnjob",
          title: "当前干部在编",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            if(rowData[field] == null){
              rowData[field] = ''
            }
            return `<span class='cell-edit-color-b'>${rowData[field]}</span>`;
          }
        },
        {
          field: "cadreOnjob",
          title: "干部平均在编",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            if(rowData[field] == null){
              rowData[field] = ''
            }
            return `<span class='cell-edit-color-b'>${rowData[field]}</span>`;
          }
        },
      ], 
      tableData1: [], //一级单位编制情况表格
      echartData1: [],
      echartData2: [],
      echartData3: [],
      echartData4: [],
      echartData5: [],
      echartData6: [],
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
      this.selectDrawYear = val
      this.selectDrawYear1 = val
      this.showTime = false;
    },
    // 是否包含下级部门的事件
    getIsdownVal(data){
      // console.log(data)
      if(data){
        this.isDown = 'Y'
      }else{
        this.isDown = 'N'
      }
    },
    //图形1选择年
    onConfirmDrawYear(value){
      // console.log(value)
      this.selectDrawYear = value
      this.showDrawYear = false
      //清空图形的数据
      this.monthData = []
      this.echartData1 = []
      this.echartData2 = []
      this.echartData5 = []
      this.monthData1 = []
      this.echartData3 = []
      this.echartData4 = []
      this.echartData6 = []
      // 图形获取数据
      let selectData = {
        deptId: this.deptIdStr,
        year: this.selectDrawYear,
        postOne: this.selectPostId1,
        deptCode: this.bianzhiCodeRes
      }
      //干部的数据
      selectDraw(selectData).then(res=>{
        if(res.obj == null){
          Notify({ type: "warning", message: "没有该数据" })
          return
        }else{
          let monthArr = []
          let echartArr1 = []
          let echartArr2 = []
          let monthArr1 = []
          let echartArr3 = []
          let echartArr4 = []
          let echartArr5 = []
          let echartArr6 = []
          for(let i in res.obj.cadre){
            monthArr.push(res.obj.cadre[i].time)
            echartArr1.push(res.obj.cadre[i].avgOnjob)
            echartArr2.push(res.obj.cadre[i].dingbian)
            echartArr5.push(res.obj.cadre[i].realOnjob)
          }
          this.monthData = monthArr
          this.echartData1 = echartArr1
          this.echartData2 = echartArr2
          this.echartData5 = echartArr5
          for(let i in res.obj.postOne){
            monthArr1.push(res.obj.postOne[i].time)
            echartArr3.push(res.obj.postOne[i].avgOnjob)
            echartArr4.push(res.obj.postOne[i].dingbian)
            echartArr6.push(res.obj.postOne[i].realOnjob)
          }
          this.monthData1 = monthArr1
          this.echartData3 = echartArr3
          this.echartData4 = echartArr4
          this.echartData6 = echartArr6
          this.initCharts()
          this.initCharts1()
        }
      })
    },
    //图形2选择年
    onConfirmDrawYear1(value){
      // console.log(value)
      this.selectDrawYear1 = value
      this.showDrawYear1 = false
      //清空图形的数据
      this.monthData = []
      this.echartData1 = []
      this.echartData2 = []
      this.echartData5 = []
      this.monthData1 = []
      this.echartData3 = []
      this.echartData4 = []
      this.echartData6 = []
      // 图形获取数据
      let selectData = {
        deptId: this.deptIdStr,
        year: this.selectDrawYear1,
        postOne: this.selectPostId1,
        deptCode: this.bianzhiCodeRes
      }
      //干部的数据
      selectDraw(selectData).then(res=>{
        if(res.obj == null){
          Notify({ type: "warning", message: "没有该数据" })
          return
        }else{
          let monthArr = []
          let echartArr1 = []
          let echartArr2 = []
          let monthArr1 = []
          let echartArr3 = []
          let echartArr4 = []
          let echartArr5 = []
          let echartArr6 = []
          for(let i in res.obj.cadre){
            monthArr.push(res.obj.cadre[i].time)
            echartArr1.push(res.obj.cadre[i].avgOnjob)
            echartArr2.push(res.obj.cadre[i].dingbian)
            echartArr5.push(res.obj.cadre[i].realOnjob)
          }
          this.monthData = monthArr
          this.echartData1 = echartArr1
          this.echartData2 = echartArr2
          this.echartData5 = echartArr5
          for(let i in res.obj.postOne){
            monthArr1.push(res.obj.postOne[i].time)
            echartArr3.push(res.obj.postOne[i].avgOnjob)
            echartArr4.push(res.obj.postOne[i].dingbian)
            echartArr6.push(res.obj.postOne[i].realOnjob)
          }
          this.monthData1 = monthArr1
          this.echartData3 = echartArr3
          this.echartData4 = echartArr4
          this.echartData6 = echartArr6
          this.initCharts()
          this.initCharts1()
        }
      })
    },
    //确认选择的岗位分类一
    onConfirm1() {
      // console.log(this.result1)
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
    //确认图形选择的岗位分类一
    onConfirm2(picker) {
      // console.log(picker)
      this.selectPost1 = picker.content;
      this.selectPostId1 = picker.code;
      //清空图形数据
      this.monthData1 = []
      this.echartData3 = []
      this.echartData4 = []
      this.echartData6 = []
      //岗位分类一的数据
      let selectData = {
        deptId: this.deptIdStr,
        year: this.selectDrawYear,
        postOne: this.selectPostId1,
        deptCode: this.bianzhiCodeRes
      }
      selectDraw(selectData).then(res=>{
        if(res.obj == null){
          Notify({ type: "warning", message: "没有该数据" })
          return
        }else{
          let monthArr1 = []
          let echartArr3 = []
          let echartArr4 = []
          let echartArr6 = []
          for(let i in res.obj.postOne){
            monthArr1.push(res.obj.postOne[i].time)
            echartArr3.push(res.obj.postOne[i].avgOnjob)
            echartArr4.push(res.obj.postOne[i].dingbian)
            echartArr6.push(res.obj.postOne[i].realOnjob)
          }
          this.monthData1 = monthArr1
          this.echartData3 = echartArr3
          this.echartData4 = echartArr4
          this.echartData6 = echartArr6
          this.initCharts1()
        }
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
      return y;
    },
    //初始化数据
    initData(){
      const bianzhiOrganRes = JSON.parse(localStorage.getItem("bianzhiOrganRes"))
      this.bianzhiCodeRes = JSON.parse(localStorage.getItem("bianzhiCodeRes"))
      this.selectTime = this.formatDate(new Date())
      this.selectDrawYear = this.formatDate(new Date())
      this.selectDrawYear1 = this.formatDate(new Date())
      // console.log(bianzhiOrganRes)
      this.deptData = bianzhiOrganRes
      //数据加载中
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '数据加载中',
      })
      //获取岗位分类一和年份
      getSelector().then(res=>{
        this.columns = res.obj.year
        this.columns2 = res.obj.postOne
        this.columns3 = res.obj.postOne
      })
      //默认查询
      let queryData = {
        deptCode: this.bianzhiCodeRes,
        year: '',
        postOne: [],
        ids: []
      }
      selectBianzhi(queryData).then(res=>{
        this.tableData1 = res.obj
        //请求到数据之后停止加载
        // this.isLoading = false;
      })
      //获取默认图形数据
      let selectData = {
        deptCode: this.bianzhiCodeRes,
        year: this.selectTime,
        postOne: '',
        deptIdStr: ''
      }
      selectDraw(selectData).then(res=>{
        this.$refs.resetForm.selectedDepartment = res.name
        this.$refs.resetForm1.selectedDepartment = res.name
        this.deptIdStr = res.msg
        let monthArr = []
        let echartArr1 = []
        let echartArr2 = []
        let monthArr1 = []
        let echartArr3 = []
        let echartArr4 = []
        let echartArr5 = []
        let echartArr6 = []
        for(let i in res.obj.cadre){
          monthArr.push(res.obj.cadre[i].time)
          echartArr1.push(res.obj.cadre[i].avgOnjob)
          echartArr2.push(res.obj.cadre[i].dingbian)
          echartArr5.push(res.obj.cadre[i].realOnjob)
        }
        this.monthData = monthArr
        this.echartData1 = echartArr1
        this.echartData2 = echartArr2
        this.echartData5 = echartArr5
        for(let i in res.obj.postOne){
          monthArr1.push(res.obj.postOne[i].time)
          echartArr3.push(res.obj.postOne[i].avgOnjob)
          echartArr4.push(res.obj.postOne[i].dingbian)
          echartArr6.push(res.obj.postOne[i].realOnjob)
        }
        this.monthData1 = monthArr1
        this.echartData3 = echartArr3
        this.echartData4 = echartArr4
        this.echartData6 = echartArr6
        this.initCharts()
        this.initCharts1()
      })
      //停止转圈
      Toast.clear()
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
    // 是否包含下级部门的事件
    getAllVal(val){
      console.log(val)
      this.isDownYn = val //全选的标识 
    },
    //条件搜索
    search(){
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '数据加载中',
      })
      let queryData = {
        deptCode: this.bianzhiCodeRes,
        year: this.selectTime,
        postOne: this.selectPostId,
        ids: this.deptId,
        isDown: this.isDownYn
      }
      selectBianzhi(queryData).then(res=>{
        if(res.code == 1000){
          this.tableData1 = res.obj
          //请求到数据之后停止加载
          // this.isLoading = false;
        }else{
          Toast.fail(res.msg)
        }
        this.isDownYn = ''
        //停止转圈
        Toast.clear()
      })
    },
    //重置查询
    reset() {
      this.$refs.select.selectedDepartment = "";
      this.$refs.select.select = "";
      this.deptId = [] //清空部门值
      this.$refs.select.restFlag = true;
      this.selectPostId = []; //岗位分类1
      this.selectPost = '' //岗位分类1
      this.selectTime = '' //选择年值
    },
    //在编情况
    initCharts() {
      let myChart = this.$echarts.init(this.$refs.chart);
      let data3 = [this.echartData2[0]]
      let seriesLabel = {
        normal: {
          show: true,
          position: "inside", //在上方显示
          textBorderWidth: 2,
          formatter: `{c}`
        }
      };
      let seriesLabel1 = {
        normal: {
          show: true,
          position: "top", //在上方显示
          textBorderWidth: 2,
          formatter: function(param){
            if(!/\./.test(param.value)){
              param.value += '.0';
            }
            return param.value
          }
          // formatter: `{c}`
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
          formatter: function(params) {
            // console.log(params);
            return params[0].name+'<br>'
            +'<div class="runoff" style="background-color:#4875c5"></div>'+'干部平均在编：'+params[0].data+'<br>'
            +'<div class="runoff" style="background-color:#bdd7ee"></div>'+'干部月末在编人数：'+params[1].data+'<br>'
            +'<div class="runoff" style="background-color:#fc5f10"></div>'+'干部全年定编：'+data3+'<br>'
          }
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 0,
            end: 100
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
            name: "干部全年定编（单位：人）",
            axisLabel: {
              formatter: "{value}"
            },
            nameTextStyle: {
              padding: [0, 0, 0, 90]
            }
          },
          {
            show:false,
            type: "value",
            name: "干部全年定编",
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        series: [
          {
            label: seriesLabel1,
            name: "平均在编",
            type: "line",
            data: this.echartData1,
            itemStyle : {  
                normal : {  
                    lineStyle:{  
                        color:'#4875c5'  
                    },
                    color: '#4875c5'
                }  
            },
          },
          {
            label: seriesLabel,
            name: "干部月末在编人数",
            type: "bar",
            data: this.echartData5,
            itemStyle: {
              normal: {
                color: '#bdd7ee'
              }
            }
          },
          {
            // label: seriesLabel,
            name: '干部全年定编',
            type: 'line',
            data: data3,
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
                  return `${'干部全年定编'+params.value}`
                }
              }
            },
          },
        ]
      });
      window.onresize = myChart.resize;
      //点击事件
      // myChart.on("click", function(params) {});
    },
    initCharts1() {
      let myChart = this.$echarts.init(this.$refs.chart1);
      let data3 = [this.echartData4[0]]
      let seriesLabel = {
        normal: {
          show: true,
          position: "inside", //在上方显示
          textBorderWidth: 2,
          formatter: `{c}`
        }
      };
      let seriesLabel1 = {
        normal: {
          show: true,
          position: "top", //在上方显示
          textBorderWidth: 2,
          formatter: function(param){
            if(!/\./.test(param.value)){
              param.value += '.0';
            }
            return param.value
          }
          // formatter: `{c}`
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
          formatter: function(params) {
            // console.log(params);
            return params[0].name+'<br>'
            +'<div class="runoff" style="background-color:#4472c4"></div>'+'平均在编：'+params[0].data+'<br>'
            +'<div class="runoff" style="background-color:#c02d2d"></div>'+'月末在编人数：'+params[1].data+'<br>'
            +'<div class="runoff" style="background-color:#fc5f10"></div>'+'全年定编：'+data3+'<br>'
          }
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 0,
            end: 100
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
            name: "全年定编（单位：人）",
            axisLabel: {
              formatter: "{value}"
            },
            nameTextStyle: {
              padding: [0, 0, 0, 70]
            }
          },
          {
            show:false,
            type: "value",
            name: "全年定编",
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        series: [
          {
            label: seriesLabel1,
            name: "平均在编",
            type: "line",
            data: this.echartData3,
            itemStyle: {
              normal: {
                color: '#4472c4'
              }
            }
          },
          {
            label: seriesLabel,
            name: "月末在编人数",
            type: "bar",
            data: this.echartData6,
            itemStyle: {
              normal: {
                color: '#bf0000'
              }
            }
          },
          {
            // label: seriesLabel,
            name: '全年定编',
            type: 'line',
            data: data3,
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
                    return `${'全年定编'+params.value}`
                  }
                }
            },
          },
        ]
      });
      window.onresize = myChart.resize;
      //点击事件
      // myChart.on("click", function(params) {});
    },
    //选择单位
    selctdept1(data) {
      // console.log(data)
      this.$refs.resetForm.selectedDepartment = data.content
      this.deptIdStr = data.deptId;
      // 根据部门查询岗位分类一
      // let queryData = {
      //   deptId: data.deptId,
      //   year: this.selectTime
      // }
      // getPostOne(queryData).then(res=>{
      //   this.columns3 = res.obj
      // })
      //清空图形的数据
      this.monthData = []
      this.echartData1 = []
      this.echartData2 = []
      this.echartData5 = []
      this.monthData1 = []
      this.echartData3 = []
      this.echartData4 = []
      this.echartData6 = []
      // 图形获取数据
      let selectData = {
        deptId: data.deptId,
        year: this.selectDrawYear,
        postOne: this.selectPostId1,
        deptCode: this.bianzhiCodeRes
      }
      //干部的数据
      selectDraw(selectData).then(res=>{
        if(res.obj == null){
          Notify({ type: "warning", message: "没有该数据" })
          return
        }else{
          let monthArr = []
          let echartArr1 = []
          let echartArr2 = []
          let monthArr1 = []
          let echartArr3 = []
          let echartArr4 = []
          let echartArr5 = []
          let echartArr6 = []
          for(let i in res.obj.cadre){
            monthArr.push(res.obj.cadre[i].time)
            echartArr1.push(res.obj.cadre[i].avgOnjob)
            echartArr2.push(res.obj.cadre[i].dingbian)
            echartArr5.push(res.obj.cadre[i].realOnjob)
          }
          this.monthData = monthArr
          this.echartData1 = echartArr1
          this.echartData2 = echartArr2
          this.echartData5 = echartArr5
          for(let i in res.obj.postOne){
            monthArr1.push(res.obj.postOne[i].time)
            echartArr3.push(res.obj.postOne[i].avgOnjob)
            echartArr4.push(res.obj.postOne[i].dingbian)
            echartArr6.push(res.obj.postOne[i].realOnjob)
          }
          this.monthData1 = monthArr1
          this.echartData3 = echartArr3
          this.echartData4 = echartArr4
          this.echartData6 = echartArr6
          this.initCharts()
          this.initCharts1()
        }
      })
    },
    //选择单位(单独)
    selctdept2(data) {
      // console.log(data)
      this.deptIdStr = data.deptId;
      // 图形获取数据
      let selectData = {
        deptId: data.deptId,
        year: this.selectDrawYear,
        postOne: this.selectPostId1,
        deptCode: this.bianzhiCodeRes
      }
      //干部的数据
      selectDraw(selectData).then(res=>{
        if(res.obj == null){
          Notify({ type: "warning", message: "没有该数据" })
          return
        }else{
          let monthArr = []
          let echartArr1 = []
          let echartArr2 = []
          let monthArr1 = []
          let echartArr3 = []
          let echartArr4 = []
          let echartArr5 = []
          let echartArr6 = []
          for(let i in res.obj.cadre){
            monthArr.push(res.obj.cadre[i].time)
            echartArr1.push(res.obj.cadre[i].avgOnjob)
            echartArr2.push(res.obj.cadre[i].dingbian)
            echartArr5.push(res.obj.cadre[i].realOnjob)
          }
          this.monthData = monthArr
          this.echartData1 = echartArr1
          this.echartData2 = echartArr2
          this.echartData5 = echartArr5
          this.initCharts()
        }
      })
    },
    //图形岗位分类一判断是否选择了部门
    showPostClick(){
      if(this.deptIdStr == ''){
        Notify({ type: "warning", message: "请先选择部门！" });
      }else{
        this.showPost1 = true
      }
    },
    //单元格样式
    columnCellClass(rowIndex, columnName, rowData) {
      // if (rowIndex % 2 == 0) {
      //   return "column-cell-class-name-test";
      // }
      if (rowData.postOne == null){
         return 'column-cell-class-name-test-a';
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
    .cell-edit-color-a {
      color: #ed4f5d;
    }
    .cell-edit-color-b {
      color: #3e6dc2;
    }
    .runoff{
      float: left;
      height: 12px;
      width: 12px;
      margin: 4px 4px 0 0;
      border-radius: 50%;
    }
    .column-cell-class-name-test-a{
      background-color: #f7c7a7;
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

.remark{
  font-size 14px
  text-align center
  color #ee6471
  p{
    font-weight 700
    padding 10px
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
    height: 400px;
    background-color: #f6f6f8;

    .pie {
      width: 100%;
      height: 100%;
    }
  }
  .titlechart{
    padding 10px 10px 10px 10px
    text-align center
    font-weight 700
    color #f39f57
    background-color: #ffdab9;
  }
}
.fenlei{
  padding 10px
  text-align center
}
</style>