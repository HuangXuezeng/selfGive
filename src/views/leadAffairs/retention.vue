<template>
  <div>
    <div class="tiaojian">
      <van-field
        v-model="selectYear"
        label="选择年："
        placeholder="请选择"
        @click-input="showyear = true"
        readonly
      />
      <!-- <van-field
        v-model="selectMonth"
        label="选择月："
        placeholder="请选择"
        @click-input="pickmonth"
        readonly
      /> -->
      <choosedepartment
        ref="resetForm"
        @transferFa="selctdept"
        @getIsdownVal="getIsdownVal"
        :Farequired="true"
        :showSwitchFlag="true"
      ></choosedepartment>
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
        <!-- <van-button type="primary" size="small" color="#fc5f10" @click="ceshi" style="font-size:15px">测试</van-button> -->
      </div>
      <div class="remark">
        <p>默认展示当前负责部门编制内人员流失</p>
      </div>
    </div>
    <div class="header">
      <div class="title">
        <div class="title_one">
          <p>平均在编</p>
          <p>{{ totalData.avgOnjob }}</p>
        </div>
        <div class="title_two">
          <p>实际在编</p>
          <p>{{ totalData.realOnjob }}</p>
        </div>
      </div>
       <div class="count">
        <div class="count_left">
          <p>流失人数</p>
          <p @click="runoffClick">{{ totalData.runoffSum }}</p>
          <!-- <p>干部流失人数</p>
          <p @click="cadreClick">{{ totalData.cadreRunoffSum }}</p> -->
        </div>
        <div class="count_right">
          <p>月均流失率</p>
          <p>{{ totalData.runoffRate }}</p>
          <!-- <p>干部流失率</p>
          <p>{{ totalData.cadreRunoffRate }}</p> -->
        </div>
      </div>
      <div class="flex">
        <div class="flexone">
          <p>主动</p>
          <p @click="zhuClick">{{ totalData.activeSum }}</p>
        </div>
        <div class="flextwo">
          <p>主动月均流失率</p>
          <p>{{ totalData.activeRunoffRate }}</p>
        </div>
        <div class="flexthree">
          <p>被动</p>
          <p @click="beiClick">{{ totalData.passiveSum }}</p>
        </div>
        <div class="flexfore">
          <p>被动月均流失率</p>
          <p>{{ totalData.passiveRunoffRate }}</p>
        </div>
      </div>
      <div class="count">
        <div class="count_left">
          <p>干部流失人数</p>
          <p @click="cadreClick">{{ totalData.cadreRunoffSum }}</p>
        </div>
        <div class="count_right">
          <p>干部月均流失率</p>
          <p>{{ totalData.cadreRunoffRate }}</p>
        </div>
      </div>
      <!-- <div class="remark">
        <p>默认展示当前负责部门数据</p>
      </div> -->
    </div>
    <!-- 按一级单位查看 -->
    <div class="onedept">
      <!-- <p class="detail">按一级单位查看</p> -->
      <p class="titlea"><span class="borleft"></span> 每月流失情况</p>
      <div class="table">
        <v-table
          ref="table"
          is-horizontal-resize
          style="width:100%;font-size:14px"
          columns-width-drag
          title-bg-color="#e5ecf0"
          :columns="columns"
          :table-data="tableData"
          row-hover-color="#e5ecf0"
          row-click-color="#e5ecf0"
          :show-vertical-border="false"
          :row-click="rowClick1"
          :column-cell-class-name="columnCellClass"
        ></v-table>
      </div>
    </div>
    <!-- 按岗位分类一 -->
    <div class="onedept">
      <p class="titlea"><span class="borleft"></span> 按岗位分类一（流失人数/月均流失率）</p>
      <div class="postrank">
        <div class="pie" ref="chart" id="chart"></div>
      </div>
    </div>
    <!-- 按职级 -->
    <div class="onedept">
      <p class="titlea"><span class="borleft"></span> 按职级</p>
      <div class="table">
        <v-table
          ref="table"
          is-horizontal-resize
          style="width:100%;font-size:14px"
          columns-width-drag
          title-bg-color="#e5ecf0"
          :columns="columns1"
          :table-data="tableData1"
          row-hover-color="#e5ecf0"
          row-click-color="#e5ecf0"
          :show-vertical-border="false"
          :row-click="rowClick2"
          :column-cell-class-name="columnCellClass"
        ></v-table>
      </div>
    </div>
    <!-- 按每月情况 -->
    <div class="onedept">
      <p class="titlea"><span class="borleft"></span> 全员流失情况</p>
      <div class="postrank">
        <div class="pie" ref="chart1" id="chart1"></div>
      </div>
    </div>
    <div class="onedept">
      <p class="titlea"><span class="borleft"></span> 干部流失情况</p>
      <div class="postrank">
        <div class="pie" ref="chart2" id="chart2"></div>
      </div>
    </div>
    <div class="remark">
      <p>因组织架构调整，历史在编情况供参考</p>
    </div>
    <!-- 选择年弹窗 -->
    <van-popup
      v-model="showyear"
      get-container="body"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-picker
        title="选择年份"
        show-toolbar
        :columns="columnTime"
        @confirm="onConfirm"
        @cancel="onCancel"
        :default-index="50"
      />
    </van-popup>
    <!-- 选择月弹窗 -->
    <van-popup
      v-model="showmonth"
      get-container="body"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-picker
        title="选择月份"
        show-toolbar
        :columns="columnTime1"
        @confirm="onConfirm1"
        @cancel="showmonth = false"
        :default-index="50"
      />
    </van-popup>
    <!-- 表格弹窗 -->
    <van-popup
      v-model="showTable"
      get-container="body"
      position="top">
      <div class="table">
        <v-table
          ref="table"
          is-horizontal-resize
          style="width:100%;font-size:14px"
          columns-width-drag
          :height="400"
          title-bg-color="#ccc"
          :columns="popupColumns"
          :table-data="popupTableData"
          row-hover-color="#eee"
          row-click-color="#edf7ff"
          :row-click="rowClick3"
        ></v-table>
      </div>
      <div class="more">
        <van-tag type="warning">总条数：{{ total }}</van-tag>
        <span style="float:right" @click="closePop"><van-tag type="danger">关闭</van-tag></span>
        <span style="float:right;margin-right:10px" @click="loadMore"><van-tag type="warning">下一页</van-tag></span
        >
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Notify, Toast } from "vant";
import { queryRunoff,selectPerson } from "./api";
import chooseDepartment from "@/components/pickerDeptOne.vue";
import { mapMutations } from "vuex";
export default {
  components: {
    choosedepartment: chooseDepartment
  },
  data() {
    return {
      currentDeptsRes: [], //获取首页本地保存的当前部门
      isDown: 'Y', //默认传给后台的（自动包含下级）值
      isLoading: true, //弹窗表格的加载
      // isLoading1: true, //每月明细表格的加载
      // isLoading2: true, //按职级表格的加载
      aa: "20%",
      showTable: false, //表格弹窗
      selectYear: "", //选择年
      selectMonth: "", //选择月
      showyear: false, //年弹窗
      showmonth: false, //月弹窗
      minDate: new Date(2010, 0, 0),
      maxDate: new Date(2025, 0, 0),
      currentDate: new Date(),
      columnTime: [], //年
      deptId: "", //选择单位，传给后台的id
      deptIds: [], //传给后台的id
      totalData: {}, //查询出来所有的数据
      columnTime1: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12"
      ], //月
      tableData: [], //每月明细
      tableData1: [], //按职级
      runArr: [], //流失人数
      runLvArr: [], //流失率
      runGbArr: [], //干部流失人数
      runGblvArr: [], //干部流失率
      runTime: [], //时间值
      baseLine: '', //月均基准线
      cadreBaseLine: '', //干部月均基准线
      columns: [
        {
          field: "time",
          title: "月份",
          width: 100,
          titleAlign: "center",
          columnAlign: "center"
        },
        {
          field: "avgOnjob",
          title: "平均在编",
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
          title: "实际在编",
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
          field: "runoffSum",
          title: "流失人数",
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
          field: "runoffRate",
          title: "流失率",
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
          field: "activeSum",
          title: "主动",
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
          field: "passiveSum",
          title: "被动",
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
          field: "cadreAvgOnjob",
          title: "干部平均在编",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            if(rowData[field] == null){
              rowData[field] = ''
            }
            return `<span class='cell-edit-color-c'>${rowData[field]}</span>`;
          }
        },
        {
          field: "cadreRealOnjob",
          title: "干部实际在编",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            if(rowData[field] == null){
              rowData[field] = ''
            }
            return `<span class='cell-edit-color-c'>${rowData[field]}</span>`;
          }
        },
        {
          field: "cadreRunoffSum",
          title: "干部流失人数",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            if(rowData[field] == null){
              rowData[field] = ''
            }
            return `<span class='cell-edit-color-c'>${rowData[field]}</span>`;
          }
        },
        {
          field: "cadreRunoffRate",
          title: "干部流失率",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            if(rowData[field] == null){
              rowData[field] = ''
            }
            return `<span class='cell-edit-color-c'>${rowData[field]}</span>`;
          }
        }
      ],
      columns1: [
        {
          field: "name",
          title: "职级",
          width: 60,
          titleAlign: "center",
          columnAlign: "center"
        },
        {
          field: "avgOnjob",
          title: "平均在编",
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
          field: "runoffSum",
          title: "流失人数",
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
          field: "runoffRate",
          title: "月均流失率",
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
          field: "activeSum",
          title: "主动",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            if(rowData[field] == null){
              rowData[field] = ''
            }
            return `<span class='cell-edit-color-c'>${rowData[field]}</span>`;
          }
        },
        {
          field: "passiveSum",
          title: "被动",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            if(rowData[field] == null){
              rowData[field] = ''
            }
            return `<span class='cell-edit-color-c'>${rowData[field]}</span>`;
          }
        }
      ],
      popupTableData: [], //弹窗表格数据
      fenyeData: [], //处理好的分页数据
      total: 0, //总条数
      dataIndex: 0, //假分页默认显示
      popupColumns: [
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
          field: "jobnumber",
          title: "工号",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "name",
          title: "姓名",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "department",
          title: "部门",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "post",
          title: "岗位",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "rank",
          title: "职级",
          width: 60,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "outTime",
          title: "离职时间",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        }
      ]
    };
  },
  created() {
    this.pickerYear(); //初始化选择年
    this.$store.state.arrflag = ""; //清空标识
    this.initData();
  },
  methods: {
    //表格行点击事件
    rowClick1(rowIndex, rowData, column) {
      //通过cloumn来判断点击的是哪个
      this.dataIndex = 0
      if (column.field == "runoffSum") {
        let queryData = {
          key: rowData.runoffPerson,
          jobnumber: localStorage.getItem('jobNum')
        }
        this.showTable = true;
        selectPerson(queryData).then(res=>{
          this.popupTableData = res.obj;
          // this.isLoading = false
          this.pagePev(); //分页处理
        })
      } else if (column.field == "cadreRunoffSum") {
        let queryData = {
          key: rowData.cadrePerson,
          jobnumber: localStorage.getItem('jobNum')
        }
        this.showTable = true;
        selectPerson(queryData).then(res=>{
          this.popupTableData = res.obj;
          // this.isLoading = false
          this.pagePev(); //分页处理
        })
      } else if (column.field == "activeSum") {
        let queryData = {
          key: rowData.activePerson,
          jobnumber: localStorage.getItem('jobNum')
        }
        this.showTable = true;
        selectPerson(queryData).then(res=>{
          this.popupTableData = res.obj;
          // this.isLoading = false
          this.pagePev(); //分页处理
        })
      } else if (column.field == "passiveSum") {
        let queryData = {
          key: rowData.passivePerson,
          jobnumber: localStorage.getItem('jobNum')
        }
        this.showTable = true;
        selectPerson(queryData).then(res=>{
          this.popupTableData = res.obj;
          // this.isLoading = false
          this.pagePev(); //分页处理
        })
      }
    },
    rowClick2(rowIndex, rowData, column) {
      // console.log(rowData)
      this.dataIndex = 0
      if (column.field == "runoffSum") {
        let queryData = {
          key: rowData.runoffPerson,
          jobnumber: localStorage.getItem('jobNum')
        }
        this.showTable = true;
        selectPerson(queryData).then(res=>{
          this.popupTableData = res.obj;
          // this.isLoading = false
          this.pagePev(); //分页处理
        })
      } else if (column.field == "cadreRunoffSum") {
        let queryData = {
          key: rowData.cadrePerson,
          jobnumber: localStorage.getItem('jobNum')
        }
        this.showTable = true;
        selectPerson(queryData).then(res=>{
          this.popupTableData = res.obj;
          // this.isLoading = false
          this.pagePev(); //分页处理
        })
      } else if (column.field == "activeSum") {
        let queryData = {
          key: rowData.activePerson,
          jobnumber: localStorage.getItem('jobNum')
        }
        this.showTable = true;
        selectPerson(queryData).then(res=>{
          this.popupTableData = res.obj;
          // this.isLoading = false
          this.pagePev(); //分页处理
        })
      } else if (column.field == "passiveSum") {
        let queryData = {
          key: rowData.passivePerson,
          jobnumber: localStorage.getItem('jobNum')
        }
        this.showTable = true;
        selectPerson(queryData).then(res=>{
          this.popupTableData = res.obj;
          // this.isLoading = false
          this.pagePev(); //分页处理
        })
      }
    },
    //弹窗表格中的行点击
    rowClick3(rowIndex, rowData, column) {
      // console.log(rowData)
      this.save_jobNum(rowData.jobnumber);
      this.from_page(3); //存标识，从哪个页面过来的
      this.$router.push({ name: "basicMsg" });
    },
    //单元格样式
    columnCellClass(rowIndex, columnName, rowData) {
      if (rowIndex % 2 == 0) {
        return "column-cell-class-name-test";
      }
    },
    //按岗位分类一
    initCharts() {
      // console.log(this.totalData.postMap.yxl.runoffRate);
      let myChart = this.$echarts.init(this.$refs.chart);
      let seriesLabel = {
        normal: {
          show: true,
          position: "insideLeft", //在上方显示
          textBorderWidth: 2,
          formatter: `{c} / {b}`
        }
      };
      let data1 = [
        // {
        //   name: this.totalData.postMap.gd.runoffRate,
        //   value: this.totalData.postMap.gd.runoffSum
        // },
        {
          name: this.totalData.postMap.zjl.runoffRate,
          value: this.totalData.postMap.zjl.runoffSum
        },
        {
          name: this.totalData.postMap.yxl.runoffRate,
          value: this.totalData.postMap.yxl.runoffSum
        },
        {
          name: this.totalData.postMap.jsl.runoffRate,
          value: this.totalData.postMap.jsl.runoffSum
        },
        {
          name: this.totalData.postMap.znl.runoffRate,
          value: this.totalData.postMap.znl.runoffSum
        }
      ];
      let data2 = [
        // { name: "股东" },
        { name: "直接类" },
        { name: "营销类" },
        { name: "技术类" },
        { name: "职能类" }
      ]; // 绘制图表
      myChart.setOption({
        title: {
          // text: '标题',
          // subtext: '数据来自网络'
        },
        // tooltip: {
        //     trigger: 'axis',
        //     axisPointer: {
        //         type: 'shadow'
        //     },
        // },
        legend: {
          // data: ['2011年', '2012年']
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          name: '单位（人）',
          axisLabel: {
              interval:0,
              rotate:20
          },
　　　　　　 nameTextStyle:{         //关键代码
　　　　　　　  padding:[70,0,0,-70],
          },
          boundaryGap: false, // 将此属性设置为false即可让其在两侧显示
          axisTick: {show:false},
        },
        yAxis: {
          type: "category",
          data: ["直接类", "营销类", "技术类", "职能类"],
        },
        series: [
          {
            label: seriesLabel,
            barWidth: 25,
            // name: '2011年',
            type: "bar",
            data: data1,
            itemStyle: {
              normal: {
                label: {
                  show: true
                },
                color: '#fc5f10'
              }
            }
          }
        ]
      });
      window.onresize = myChart.resize;
      var that = this;
      //点击事件
      myChart.getZr().off("click");
      myChart.getZr().on("click", function(params) {
        var pointInPixel = [params.offsetX, params.offsetY];
        if (myChart.containPixel("grid", pointInPixel)) {
          /*单击图标X轴数据，打开详情*/
          var xIndex = myChart.convertFromPixel(
            { seriesIndex: 0 },
            pointInPixel
          )[1];
          // console.log(data1[xIndex])
          switch (data2[xIndex].name) {
            // case "股东":
            //   that.dataIndex = 0
            //   setTimeout(() => {
            //     that.showTable = true;
            //   }, 500);
            //   // console.log(data2[xIndex].name);
            //   var queryData = {
            //     key: that.totalData.postMap.gd.runoffPerson,
            //     jobnumber: localStorage.getItem('jobNum')
            //   }
            //   selectPerson(queryData).then(res=>{
            //     that.popupTableData = res.obj;
            //     that.isLoading = false
            //     that.pagePev(); //分页处理
            //   })
            //   break;
            case "直接类":
              that.dataIndex = 0
              setTimeout(() => {
                that.showTable = true;
              }, 500);
              var queryData = {
                key: that.totalData.postMap.zjl.runoffPerson,
                jobnumber: localStorage.getItem('jobNum')
              }
              selectPerson(queryData).then(res=>{
                that.popupTableData = res.obj;
                // that.isLoading = false
                that.pagePev(); //分页处理
              })
              break;
            case "营销类":
              that.dataIndex = 0
              setTimeout(() => {
                that.showTable = true;
              }, 500);
              var queryData = {
                key: that.totalData.postMap.yxl.runoffPerson,
                jobnumber: localStorage.getItem('jobNum')
              }
              selectPerson(queryData).then(res=>{
                that.popupTableData = res.obj;
                // that.isLoading = false
                that.pagePev(); //分页处理
              })
              break;
            case "技术类":
              that.dataIndex = 0
              setTimeout(() => {
                that.showTable = true;
              }, 500);
              var queryData = {
                key: that.totalData.postMap.jsl.runoffPerson,
                jobnumber: localStorage.getItem('jobNum')
              }
              selectPerson(queryData).then(res=>{
                that.popupTableData = res.obj;
                // that.isLoading = false
                that.pagePev(); //分页处理
              })
              break;
            case "职能类":
              that.dataIndex = 0
              setTimeout(() => {
                that.showTable = true;
              }, 500);
              var queryData = {
                key: that.totalData.postMap.znl.runoffPerson,
                jobnumber: localStorage.getItem('jobNum')
              }
              selectPerson(queryData).then(res=>{
                that.popupTableData = res.obj;
                // that.isLoading = false
                that.pagePev(); //分页处理
              })
              break;

            default:
              break;
          }
        }
      });
    },
    //人员每月情况
    initCharts1() {
      let myChart = this.$echarts.init(this.$refs.chart1);
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
            return param.value+'%'
          }
          // formatter: `{c}%`
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
            +'<div class="runoff" style="background-color:#bf0000"></div>'+'流失人数：'+params[0].data+'<br>'
            +'<div class="runoff" style="background-color:#4875c5"></div>'+'流失率：'+params[1].data+'%<br>'
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
        grid: {
            left: '3%',
            right: '3%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: [
          {
            type: "category",
            // data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
            data: this.runTime,
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "流失人数（单位：人）",
            axisLabel: {
              formatter: "{value}"
            },
            nameTextStyle: {
              // align: 'verticalAlign',
              padding: [0, 0, 0, 40]
            }
          },
          {
            type: "value",
            name: "流失率（单位：%）",
            axisLabel: {
              formatter: "{value}"
            },
            nameTextStyle: {
              padding: [0, 70, 0, 0]
            }
          }
        ],
        series: [
          {
            label: seriesLabel,
            name: "流失人数",
            type: "bar",
            data: this.runArr,
            itemStyle: {
              normal: {
                color: '#bf0000'
              }
            }
          },
          {
            label: seriesLabel1,
            // symbol: "none",
            name: "流失率",
            type: "line",
            yAxisIndex: 1,
            data: this.runLvArr,
            itemStyle: {
              normal: {
                color: '#4875c5',
              }
            }
          },
          {
            label: seriesLabel1,
            name: "流失率",
            type: "line",
            yAxisIndex: 1,
            data: this.baseLine,
            markLine: {
                // symbol: "none", //是否显示基准线的箭头
                silent: true, // 鼠标移上是否有响应（线变粗）
                data: [
                  {
                    yAxis: this.baseLine,
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
                    // console.log(params)
                    return `${'月均流失率'+params.value}`
                  }
                }
            },
          }
        ]
      });
      window.onresize = myChart.resize;
      //点击事件
      // myChart.on("click", function(params) {});
    },
    //干部每月情况
    initCharts2() {
      let myChart = this.$echarts.init(this.$refs.chart2);
      let seriesLabel = {
        normal: {
          show: true,
          position: "inside", //在上方显示
          textBorderWidth: 2,
          formatter: `{c}`
        }
      };
      let seriesLabel2 = {
        normal: {
          show: true,
          position: "top", //在上方显示
          textBorderWidth: 2,
          formatter: function(param){
            if(!/\./.test(param.value)){
              param.value += '.0';
            }
            return param.value+'%'
          }
          // formatter: `{c}%`
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
            +'<div class="runoff" style="background-color:#bdd7ee"></div>'+'干部流失人数：'+params[0].data+'<br>'
            +'<div class="runoff" style="background-color:#4472c4"></div>'+'干部流失率：'+params[1].data+'%<br>'
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
        grid: {
            left: '3%',
            right: '3%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: [
          {
            type: "category",
            // data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
            data: this.runTime,
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "干部流失人数（单位：人）",
            axisLabel: {
              formatter: "{value}"
            },
            nameTextStyle: {
              // align: 'verticalAlign',
              padding: [0, 0, 0, 110]
            },
          },
          {
            type: "value",
            name: "干部流失率（单位：%）",
            axisLabel: {
              formatter: "{value}"
            },
            nameTextStyle: {
              padding: [0, 80, 0, 0]
            }
          }
        ],
        series: [
          {
            label: seriesLabel,
            name: "干部流失人数",
            type: "bar",
            data: this.runGbArr,
            itemStyle: {
              normal: {
                color: '#bdd7ee'
              }
            }
          },
          {
            label: seriesLabel2,
            name: "干部流失率",
            type: "line",
            yAxisIndex: 1,
            data: this.runGblvArr,
            itemStyle: {
              normal: {
                color: '#4472c4',
                lineStyle:{
                  fontWeight: '700'
                }
              }
            }
          },
          {
            label: seriesLabel2,
            name: "干部月均流失率",
            type: "line",
            yAxisIndex: 1,
            data: this.cadreBaseLine,
            markLine: {
                // symbol: "none", //是否显示基准线的箭头
                silent: true, // 鼠标移上是否有响应（线变粗）
                data: [
                  {
                    yAxis: this.cadreBaseLine,
                    //type: "min/max/average" // 特殊的标注类型，用于标注最大值最小值等。
                    lineStyle: { // 线的样式
                      color: "#fc5f10",
                      width: 1,
                      opacity: 0.8
                    },
                    label: { // 文字的样式，默认是白色，有时候文字不显示，可能是颜色的问题
                      color: "#f39f57"
                    }
                  },
                ],
                label: { // 样式也可以统一设置
                  padding: [-13, -40, 0, 0],
                  position:"middle",
                  formatter: function (params) {
                    // console.log(params)
                    return `${'干部月均流失率'+params.value}`
                  }
                }
            },
          }
        ]
      });
      window.onresize = myChart.resize;
      //点击事件
      // myChart.on("click", function(params) {});
    },
    //选择年
    onConfirm(value, index) {
      // console.log(`当前值：${value}, 当前索引：${index}`);
      this.selectYear = value;
      this.showyear = false;
    },
    onCancel() {
      this.showyear = false;
    },
    MySort() {
      return this.sort((a, b) => a - b);
    },
    pickerYear() {
      let myDate = new Date();
      let tYear = myDate.getFullYear();
      this.columnTime.push(tYear);
      for (let i = 1; i <= 50; i++) {
        this.columnTime.push(tYear + i);
        this.columnTime.push(tYear - i);
      }
      //只能选择2019年之后的
      let arrNum = []
      let arrNum1 = []
      for(let i in this.columnTime){
        if(this.columnTime[i] > 2018){
          arrNum.push(this.columnTime[i])
        }
      }
      for(let k in arrNum){
        if(arrNum[k] < tYear+1){
          arrNum1.push(arrNum[k])
        }
      }
      this.columnTime = arrNum1
      this.columnTime.sort(function(a, b) {
        //callback
        if (a > b) {
          // a b 分别是Arr中的 56 21
          return 1; //返回正数 ，b排列在a之前
          // console.log(this.columnTime)
        } else {
          return -1; //返回负数 ，a排列在b之前
        }
      });
      this.columnTime.reverse()
      // console.log(this.columnTime)
    },
    //选择月
    pickmonth() {
      this.showmonth = true;
    },
    onConfirm1(value) {
      // console.log(value)
      this.selectMonth = value;
      this.showmonth = false;
    },
    //选择单位
    selctdept(data) {
      // console.log(data)
      this.deptId = data.deptId;
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
    //查询
    search() {
      this.currentDeptsRes = JSON.parse(localStorage.getItem('currentDeptsRes')) //保存当前部门
      // console.log(currentDeptsRes)
      this.runArr = []
      this.runLvArr = []
      this.runGbArr = []
      this.runGblvArr = []
      this.runTime = [] //时间置空，防止图表中的时间重复
      if (this.selectYear == "") {
        Notify({ type: "warning", message: "需要先选择年份才能进行查询！" });
      } else {
        Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: '数据加载中',
        })
        let queryData = {
          year: this.selectYear,
          month: this.selectMonth,
          deptId: this.deptId,
          deptIds: this.deptIds,
          isDown: this.isDown,
          currentDept: this.currentDeptsRes, //当前部门
          jobnumber: localStorage.getItem('jobNum')
        };
        queryRunoff(queryData).then(res => {
          this.totalData = res.obj;
          this.tableData = res.obj.detail
          this.tableData1 = res.obj.category
          this.baseLine = res.obj.detail[0].avgBaseline
          this.cadreBaseLine = res.obj.detail[0].cadreAvgBaseline
          // 按每月情况取值
          for (let i in res.obj.detail) {
            this.runArr.push(res.obj.detail[i].runoffSum);
            this.runLvArr.push(res.obj.detail[i].runoffRate0);
            this.runGbArr.push(res.obj.detail[i].cadreRunoffSum);
            this.runGblvArr.push(res.obj.detail[i].cadreRunoffRate0);
            this.runTime.push(res.obj.detail[i].time);
          }
          //图形月份倒序（正序）
          this.runArr.reverse()
          this.runLvArr.reverse()
          this.runGbArr.reverse()
          this.runGblvArr.reverse()
          this.runTime.reverse()
          this.initCharts();
          this.initCharts1();
          this.initCharts2();
          //停止转圈
          Toast.clear()
        });
      }
    },
    //默认展示最新年份
    initData() {
      //加载状态
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '数据加载中',
      })
      const deptIdsRes = JSON.parse(localStorage.getItem('deptIdsRes'))
      this.currentDeptsRes = JSON.parse(localStorage.getItem('currentDeptsRes')) //保存当前部门
      this.deptIds = deptIdsRes;
      this.selectYear = this.formatDate(new Date())
      let queryData = {
        year: this.selectYear,
        month: this.selectMonth,
        deptId: this.deptId,
        deptIds: this.deptIds,
        isDown: this.isDown,
        currentDept: this.currentDeptsRes, //当前部门
        jobnumber: localStorage.getItem('jobNum')
      };
      queryRunoff(queryData).then(res => {
        this.totalData = res.obj;
        //请求到数据后表格加载结束
        // this.isLoading1 = false
        // this.isLoading2 = false
        this.tableData = res.obj.detail;
        this.tableData1 = res.obj.category;
        this.baseLine = res.obj.detail[0].avgBaseline
        this.cadreBaseLine = res.obj.detail[0].cadreAvgBaseline
        // 按每月情况取值
        for (let i in res.obj.detail) {
          this.runArr.push(res.obj.detail[i].runoffSum);
          this.runLvArr.push(res.obj.detail[i].runoffRate0);
          this.runGbArr.push(res.obj.detail[i].cadreRunoffSum);
          this.runGblvArr.push(res.obj.detail[i].cadreRunoffRate0);
          this.runTime.push(res.obj.detail[i].time);
        }
        // for(let j in runLvArr)
        //图形月份倒序（正序）
        this.runArr.reverse()
        this.runLvArr.reverse()
        this.runGbArr.reverse()
        this.runGblvArr.reverse()
        this.runTime.reverse()
        this.initCharts();
        this.initCharts1();
        this.initCharts2();
        //停止转圈
        Toast.clear()
      });
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
    //重置查询
    reset() {
      this.$refs.resetForm.selectedDepartment = "";
      this.$refs.resetForm.restFlag = true
      this.deptId = "";
      this.selectYear = "";
      this.selectMonth = "";
    },
    //打开弹窗看数据
    //流失人数
    runoffClick() {
      let queryData = {
        key: this.totalData.runoffPerson,
        jobnumber: localStorage.getItem('jobNum')
      }
      this.dataIndex = 0
      this.showTable = true;
      selectPerson(queryData).then(res=>{
        this.popupTableData = res.obj;
        this.pagePev(); //分页处理
      })
    },
    //干部流失人数
    cadreClick() {
      let queryData = {
        key: this.totalData.cadrePerson,
        jobnumber: localStorage.getItem('jobNum')
      }
      this.dataIndex = 0
      this.showTable = true;
      selectPerson(queryData).then(res=>{
        this.popupTableData = res.obj;
        this.pagePev(); //分页处理
      })
    },
    //主动
    zhuClick() {
      let queryData = {
        key: this.totalData.activePerson,
        jobnumber: localStorage.getItem('jobNum')
      }
      this.dataIndex = 0
      this.showTable = true;
      selectPerson(queryData).then(res=>{
        this.popupTableData = res.obj;
        this.pagePev(); //分页处理
      })
    },
    //被动
    beiClick() {
      let queryData = {
        key: this.totalData.passivePerson,
        jobnumber: localStorage.getItem('jobNum')
      }
      this.dataIndex = 0
      this.showTable = true;
      selectPerson(queryData).then(res=>{
        this.popupTableData = res.obj;
        this.pagePev(); //分页处理
      })
    },
    //加载更多数据
    loadMore() {
      // debugger
      this.dataIndex++; //点击+1
      if (this.dataIndex >= this.fenyeData.length) {
        Notify({ type: "warning", message: "没有更多数据了哦~" });
      } else {
        this.popupTableData = this.popupTableData.concat(
          this.fenyeData[this.dataIndex]
        );
        Toast('加载成功，请滑动表格查看')
      }
    },
    //关闭弹窗
    closePop(){
      this.showTable = false
    },
    //处理表格的分页方法
    pagePev() {
      this.total = this.popupTableData.length;
      let result = [];
      let chunk = 100; //100个一组
      for (var i = 0, j = this.popupTableData.length; i < j; i += chunk) {
        result.push(this.popupTableData.slice(i, i + chunk));
      }
      console.log(result)
      this.popupTableData = result[0]; //默认显示100条
      this.fenyeData = result;
    },
    // ceshi(){

    // },
    ...mapMutations({
      save_type: "save_type",
      // arr_flag: "arr_flag",
      save_jobNum: "save_jobNum",
      from_page: "from_page"
    })
  },
  mounted() {},
  watch: {
    // "$store.state.arrflag": function(newVal, oldVal) {
    //   // console.log(this.$store.state.arrflag)
    //   if (this.tableData == null) {
    //     if (this.$store.state.arrflag == 1 || this.$store.state.arrflag == 2) {
    //       const myChart = this.$echarts.init(document.getElementById("chart"));
    //       myChart.resize();
    //     }
    //   } else {
    //   }
    // }
  }
};
</script>
<style>
td {
  vertical-align: bottom;
}
.column-cell-class-name-test {
  background-color: #f6f6f8;
}
.cell-edit-color-a {
  color: #ed4f5d;
}
.cell-edit-color-b {
  color: #7fb475;
}
.cell-edit-color-c {
  color: #3e6dc2;
}
.cell-edit-color-d {
  color: #f29598;
}
.cell-edit-color-e {
  color: #eb8a50;
}
.cell-edit-color-f {
  color: #45afca;
}
.runoff{
  float: left;
  height: 12px;
  width: 12px;
  margin: 4px 4px 0 0;
  border-radius: 50%;
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

.header {
  padding: 10px;
  background-color: #e5ecf0;

  .title {
    display: flex;
    text-align: center;
    line-height: 30px;

    .title_one {
      flex: 1;

      p:nth-child(1) {
        font-weight: 700;
      }

      p:nth-child(2) {
        font-weight: 700;
        font-size: 25px;
        color: #488b96;
      }
    }

    .title_two {
      flex: 1;

      p:nth-child(1) {
        font-weight: 700;
      }

      p:nth-child(2) {
        font-weight: 700;
        font-size: 25px;
        color: #488b96;
      }
    }
  }

  .count {
    display: flex;
    padding: 5px;
    line-height: 30px;
    text-align: center;

    .count_left {
      flex: 1;

      p:nth-child(1) {
        font-weight: 700;
        font-size: 14px;
      }

      p:nth-child(2) {
        font-weight: 700;
        font-size: 20px;
        color: #f8a654;
      }

      p:nth-child(3) {
        font-weight: 700;
        font-size: 14px;
      }

      p:nth-child(4) {
        font-weight: 700;
        font-size: 20px;
        color: #f8a654;
      }
    }

    .count_right {
      flex: 1;

      p:nth-child(1) {
        font-weight: 700;
        font-size: 14px;
      }

      p:nth-child(2) {
        font-weight: 700;
        font-size: 20px;
        color: #ee6471;
      }

      p:nth-child(3) {
        font-weight: 700;
        font-size: 14px;
      }

      p:nth-child(4) {
        font-weight: 700;
        font-size: 20px;
        color: #ee6471;
      }
    }
  }

  .flex {
    display: flex;
    text-align: center;
    line-height: 30px;

    .flexone {
      flex: 1;

      p:nth-child(1) {
        font-weight: 700;
        font-size: 12px;
      }

      p:nth-child(2) {
        font-weight: 700;
        font-size: 20px;
        color: #f8a654;
      }
    }

    .flextwo {
      flex: 1;

      p:nth-child(1) {
        font-weight: 700;
        font-size: 12px;
      }

      p:nth-child(2) {
        font-weight: 700;
        font-size: 20px;
        color: #ee6471;
      }
    }

    .flexthree {
      flex: 1;

      p:nth-child(1) {
        font-weight: 700;
        font-size: 12px;
      }

      p:nth-child(2) {
        font-weight: 700;
        font-size: 20px;
        color: #91c4c9;
      }
    }

    .flexfore {
      flex: 1;

      p:nth-child(1) {
        font-weight: 700;
        font-size: 12px;
      }

      p:nth-child(2) {
        font-weight: 700;
        font-size: 20px;
        color: #7ba6a8;
      }
    }
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

  .detail {
    height: 30px;
    line-height: 30px;
    background-color: #67bac9;
    font-weight: 700;
    color: #fff;
    text-align: center;
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

.table {
  width: 100%;
  overflow-x: auto;
}

.more {
  font-size: 14px;
  padding: 10px;
}
</style>