<template>
    <div>
        <div class="tiaojian">
          <van-field v-model="selectYear" label="选择年：" placeholder="请选择" @click="showyear=true" readonly/>
          <van-field v-model="selectMonth" label="选择月：" placeholder="请选择" @click="pickmonth" readonly/>
          <choosedepartment @transferFa="selctdept" :Farequired="true"></choosedepartment>
          <div class="btns">
              <van-button type="primary" size="small" color="#fc5f10" @click="search" style="width:100%;font-size:16px">查询</van-button>
          </div>
        </div>
        <div class="header">
          <div class="title">
            <div class="title_one">
              <p>平均在编</p>
              <p>{{totalData.avgOnjob}}</p>
            </div>
            <div class="title_two">
              <p>实际在编</p>
              <p>{{totalData.realOnjob}}</p>
            </div>
          </div>
          <div class="count">
            <div class="count_left">
              <p>流失人数</p>
              <p>{{totalData.runoffSum}}</p>
              <p>干部流失人数</p>
              <p>{{totalData.cadreRunoffSum}}</p>
            </div>
            <div class="count_right">
              <p>流失率</p>
              <p>{{totalData.runoffRate}}</p>
              <p>干部流失率</p>
              <p>{{totalData.cadreRunoffRate}}</p>
            </div>
          </div>
          <div class="flex">
            <div class="flexone">
              <p>主动</p>
              <p>{{totalData.activeSum}}</p>
            </div>
            <div class="flextwo">
              <p>主动流失率</p>
              <p>{{totalData.activeRunoffRate}}</p>
            </div>
            <div class="flexthree">
              <p>被动</p>
              <p>{{totalData.passiveSum}}</p>
            </div>
            <div class="flexfore">
              <p>被动流失率</p>
              <p>{{totalData.passiveRunoffRate}}</p>
            </div>
          </div>
        </div>
        <!-- 按一级单位查看 -->
        <div class="onedept">
          <p class="detail">按一级单位查看</p>
          <p class="titlea"><span class="borleft"></span> 每月明细</p>
          <div class="table">
              <v-table 
              ref="table" 
              title-bg-color="#e5ecf0"
              :columns="columns"
              :table-data="tableData" 
              row-hover-color="#e5ecf0" 
              row-click-color="#e5ecf0"
              :show-vertical-border="false" 
              :row-click="rowClick"	
              :column-cell-class-name="columnCellClass"
              ></v-table>	
          </div>
        </div>
        <!-- 按岗位分类一 -->
        <div class="onedept">
          <p class="titlea"><span class="borleft"></span> 按岗位分类一</p>
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
              title-bg-color="#e5ecf0"
              :columns="columns1"
              :table-data="tableData1" 
              row-hover-color="#e5ecf0" 
              row-click-color="#e5ecf0"
              :show-vertical-border="false" 
              :row-click="rowClick"	
              :column-cell-class-name="columnCellClass"
              ></v-table>	
          </div>
        </div>
        <!-- 按每月情况 -->
        <div class="onedept" v-if="showchart">
          <p class="titlea"><span class="borleft"></span> 按每月情况</p>
          <div class="postrank">
              <div class="pie" ref="chart1" id="chart1"></div>
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
        <!-- 选择月弹窗 -->
        <van-popup
        v-model="showmonth" 
        get-container="body"
        position="bottom" 
        :style="{ height: '50%' }">
          <van-picker
            title="选择月份"
            show-toolbar
            :columns="columnTime1"
            @confirm="onConfirm1"
            @cancel="showmonth=false"
            :default-index="50"
          />
        </van-popup> 
    </div>
</template>
<script>
import { Notify } from 'vant';
import { queryRunoff } from './api';
import chooseDepartment from "@/components/pickerDeptOne.vue";
import { mapMutations } from 'vuex'
export default {
  components: {
      choosedepartment: chooseDepartment
  },
  data () {
    return {
      showchart: true,
      selectYear: '', //选择年
      selectMonth: '', //选择月
      showyear: false, //年弹窗
      showmonth: false, //月弹窗
      minDate: new Date(2010, 0,0),
      maxDate: new Date(2025, 0,0),
      currentDate: new Date(),
      columnTime: [], //年
      deptId: '', //选择单位，传给后台的id
      deptIds: [], //传给后台的id
      totalData: {}, //查询出来所有的数据
      columnTime1: [
        '1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月',
      ], //月
      tableData: [], //每月明细
      tableData1: [], //按职级
      runArr: [], //流失人数
      runLvArr: [], //流失率
      runGbArr: [], //干部流失人数
      runGblvArr: [], //干部流失率
      columns: [
          {field: 'time', title:'月份', width: 100, titleAlign: 'center',columnAlign:'center'},
          {field: 'avgOnjob', title: '平均在编', width: 150, titleAlign: 'center',columnAlign:'center',
            formatter: function (rowData,rowIndex,pagingIndex,field) {
              return `<span class='cell-edit-color-a'>${rowData[field]}</span>`;
            },
          },
          {field: 'realOnjob', title: '实际在编', width: 100, titleAlign: 'center',columnAlign:'center',
            formatter: function (rowData,rowIndex,pagingIndex,field) {
              return `<span class='cell-edit-color-b'>${rowData[field]}</span>`;
            },
          },
          {field: 'runoffSum', title: '流失人数',width: 100, titleAlign: 'center',columnAlign:'center',
            formatter: function (rowData,rowIndex,pagingIndex,field) {
              return `<span class='cell-edit-color-c'>${rowData[field]}</span>`;
            },
          },
          {field: 'runoffRate', title: '流失率',width: 100, titleAlign: 'center',columnAlign:'center',
            formatter: function (rowData,rowIndex,pagingIndex,field) {
              return `<span class='cell-edit-color-d'>${rowData[field]}</span>`;
            },
          },
          {field: 'activeSum', title: '主动',width: 100, titleAlign: 'center',columnAlign:'center',
            formatter: function (rowData,rowIndex,pagingIndex,field) {
              return `<span class='cell-edit-color-e'>${rowData[field]}</span>`;
            },
          },
          {field: 'passiveSum', title: '被动',width: 100, titleAlign: 'center',columnAlign:'center',
            formatter: function (rowData,rowIndex,pagingIndex,field) {
              return `<span class='cell-edit-color-f'>${rowData[field]}</span>`;
            },
          }
      ],
      columns1: [
          {field: 'name', title:'职级', width: 100, titleAlign: 'center',columnAlign:'center'},
          {field: 'avgOnjob', title: '平均在编', width: 150, titleAlign: 'center',columnAlign:'center',
            formatter: function (rowData,rowIndex,pagingIndex,field) {
              return `<span class='cell-edit-color-a'>${rowData[field]}</span>`;
            },
          },
          {field: 'runoffSum', title: '流失人数',width: 100, titleAlign: 'center',columnAlign:'center',
            formatter: function (rowData,rowIndex,pagingIndex,field) {
              return `<span class='cell-edit-color-c'>${rowData[field]}</span>`;
            },
          },
          {field: 'runoffRate', title: '流失率',width: 100, titleAlign: 'center',columnAlign:'center',
            formatter: function (rowData,rowIndex,pagingIndex,field) {
              return `<span class='cell-edit-color-c'>${rowData[field]}</span>`;
            },
          },
          {field: 'activeSum', title: '主动',width: 100, titleAlign: 'center',columnAlign:'center',
            formatter: function (rowData,rowIndex,pagingIndex,field) {
              return `<span class='cell-edit-color-e'>${rowData[field]}</span>`;
            },
          },
          {field: 'passiveSum', title: '被动',width: 100, titleAlign: 'center',columnAlign:'center',
            formatter: function (rowData,rowIndex,pagingIndex,field) {
              return `<span class='cell-edit-color-f'>${rowData[field]}</span>`;
            },
          }
      ]
    };
  },
  created(){
    this.pickerYear() //初始化选择年
    this.$store.state.arrflag = '' //清空标识
  },
  methods:{
    //表格行点击事件
    rowClick(rowIndex, rowData, column){
        console.log(rowData)
    },
    //单元格样式
    columnCellClass(rowIndex,columnName,rowData){
      if (rowIndex % 2 == 0){
          return 'column-cell-class-name-test';
      }
    },
    //按岗位分类一
    initCharts () {
    　　let myChart = this.$echarts.init(this.$refs.chart);
        let data1 = [
              {name:'股东',value:this.totalData.postMap.gd.avgOnjob},
              {name:'直接类',value:this.totalData.postMap.zjl.avgOnjob},
              {name:'营销类',value:this.totalData.postMap.yxl.avgOnjob},
              {name:'技术类',value:this.totalData.postMap.jsl.avgOnjob},
              {name:'职能类',value:this.totalData.postMap.znl.avgOnjob},
          ];
    　　// 绘制图表
    　　myChart.setOption({
            title: {
                // text: '标题',
                // subtext: '数据来自网络'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                // data: ['2011年', '2012年']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: ['股东','直接类','营销类', '技术类', '职能类']
            },
            series: [
                {
                    // label: seriesLabel,
                    // name: '2011年',
                    type: 'bar',
                    data: data1,
                    itemStyle: {
                        normal: {
                        color: function(params) {
                                //自定义颜色
                                var colorList = [
                                '#eb8b51','#ad1c3a','#ccd2c1','#61a455','#61a455'
                                ];
                                return colorList[params.dataIndex]
                            }
                        }
                    }
                },
            ]
    　　});
        window.onresize = myChart.resize
        //点击事件
        myChart.getZr().off('click');
        myChart.getZr().on('click',function (params) {
          var pointInPixel= [params.offsetX, params.offsetY];
          if (myChart.containPixel('grid',pointInPixel)) {
            /*单击图标X轴数据，打开详情*/
              var xIndex = myChart.convertFromPixel({seriesIndex:0},pointInPixel)[1];
              // console.log(data1[xIndex])
              switch (data1[xIndex].name) {
              case '股东':
                console.log(data1[xIndex].name)
                break;
              case '直接类':
                console.log(data1[xIndex].name)
                break;
              case '营销类':
                console.log(data1[xIndex].name)
                break;
              case '技术类':
                console.log(data1[xIndex].name)
                break;
              case '职能类':
                console.log(data1[xIndex].name)
                break;
            
              default:
                break;
            }
          }
        });
        // myChart.on('click', function (params) {
        //    console.log(params)
            
        // })
　　},
    //每月情况
    initCharts1 () {
    　　let myChart = this.$echarts.init(this.$refs.chart1);
    　　// 绘制图表
    　　myChart.setOption({
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross',
                  crossStyle: {
                      color: '#999'
                  }
              }
          },
          dataZoom: [
            {
                show: true,
                realtime: true,
                start: 0,
                end: 50
            },
            {
                type: 'inside',
                realtime: true,
                start: 0,
                end: 50
            }
        ],
          toolbox: {
            // 下载编辑等
              // feature: {
              //     dataView: {show: true, readOnly: false},
              //     magicType: {show: true, type: ['line', 'bar']},
              //     restore: {show: true},
              //     saveAsImage: {show: true}
              // }
          },
          legend: {
              data: ['蒸发量', '降水量', '平均温度']
          },
          xAxis: [
              {
                  type: 'category',
                  data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
                  axisPointer: {
                      type: 'shadow'
                  }
              }
          ],
          yAxis: [
              {
                  type: 'value',
                  name: '流失人数',
                  // min: 0,
                  // max: 250,
                  // interval: 50,
                  // axisLabel: {
                  //     formatter: '{value} ml'
                  // }
              },
              {
                  type: 'value',
                  name: '流失率',
                  // min: 0,
                  // max: 25,
                  // interval: 5,
                  axisLabel: {
                      formatter: '{value} %'
                  }
              }
          ],
          series: [
              {
                  name: '流失人数',
                  type: 'bar',
                  data: [6,20,14,26,16,30,29]
                  // data: this.runArr
              },
              {
                  name: '干部流失人数',
                  type: 'bar',
                  data: [16,6,21,26,19,30,35]
                  // data: this.runGbArr
              },
              {
                  name: '流失率',
                  type: 'line',
                  yAxisIndex: 1,
                  // data: this.runLvArr
                  data: [3,12,10,29,22,32,19]
              },
              {
                  name: '干部流失率',
                  type: 'line',
                  yAxisIndex: 1,
                  // data: this.runGblvArr
                  data: [17,20,14,10,13,28,39]
              }
          ]
    　　});
        window.onresize = myChart.resize
        //点击事件
        myChart.on('click', function (params) {
            switch (params.name) {
              case '初中':
                console.log(params.name)
                break;
              case '高中中专':
                console.log(params.name)
                break;
              case '本科':
                console.log(params.name)
                break;
              case '大专':
                console.log(params.name)
                break;
              case '小学':
                console.log(params.name)
                break;
              case '硕士及以上':
                console.log(params.name)
                break;
              case 'MBA':
                console.log(params.name)
                break;
              case '博士':
                console.log(params.name)
                break;
            
              default:
                break;
            }
        })
　　},
    //选择年
    onConfirm(value, index) {
      // console.log(`当前值：${value}, 当前索引：${index}`);
      this.selectYear = value
      this.showyear = false
    },
    onCancel() {
      this.showyear = false
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
    //选择月
    pickmonth(){
      if(this.selectYear == ''){
        Notify({ type: "warning", message: "需要先选择年份！" });
      }else{
        this.showmonth = true
      }
    },
    onConfirm1(value){
      // console.log(value)
      this.selectMonth = value
      this.showmonth = false
    },
    //选择单位
    selctdept(data) {
      // console.log(data)
      this.deptId = data.deptId
    },
    //查询
    search(){
      let queryData = {
        year:this.selectYear,
        month:this.selectMonth,
        deptId:this.deptId,
        deptIds:this.deptIds
      }
      queryRunoff(queryData).then(res=>{
        this.totalData = res.obj
        this.tableData = res.obj.detail
        this.tableData1 = res.obj.category
        // 按每月情况取值
        for(let i in res.obj.detail){
          this.runArr.push(res.obj.detail[i].runoffSum)
          this.runLvArr.push(res.obj.detail[i].runoffRate)
          this.runGbArr.push(res.obj.detail[i].cadreRunoffSum)
          this.runGblvArr.push(res.obj.detail[i].cadreRunoffRate)
        }
        this.initCharts()
        // this.initCharts1()
      })
    },
    ...mapMutations({
      save_type:'save_type',
      arr_flag:'arr_flag'
    })
  },
  mounted(){
    this.initCharts1()
    const departRes =  JSON.parse(localStorage.getItem('departRes'))
    this.deptIds = departRes.obj.deptIds
      // console.log(this.deptIds)
  },
  watch:{
    '$store.state.arrflag': function (newVal,oldVal) {
        // console.log(this.$store.state.arrflag)
        if(this.$store.state.arrflag == 1 || this.$store.state.arrflag == 2){
          const myChart = this.$echarts.init(document.getElementById('chart'))
          const myChart1 = this.$echarts.init(document.getElementById('chart1'))
          myChart.resize()
          myChart1.resize()
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
      background-color: #f9e9e0;
    }
    .cell-edit-color-a{
      color:#ed4f5d;
    }
    .cell-edit-color-b{
      color:#7fb475;
    }
    .cell-edit-color-c{
      color:#f7af72;
    }
    .cell-edit-color-d{
      color:#f29598;
    }
    .cell-edit-color-e{
      color:#eb8a50;
    }
    .cell-edit-color-f{
      color:#45afca;
    }
</style>
<style lang="stylus" scoped>
  .tiaojian{
    padding 10px
    .btns{
      padding 10px
    }
  }
  .header{
    padding 10px
    background-color #e5ecf0
    .title{
      display flex
      text-align center
      line-height 30px
      .title_one{
        flex 1
        p:nth-child(1){
          font-weight 700
        }
        p:nth-child(2){
          font-weight 700
          font-size 25px
          color #488b96
        }
      }
      .title_two{
        flex 1
        p:nth-child(1){
          font-weight 700
        }
        p:nth-child(2){
          font-weight 700
          font-size 25px
          color #488b96
        }
      }
    }
    .count{
      display flex
      padding 5px
      line-height 30px
      text-align center
      .count_left{
        flex 1
        p:nth-child(1){
          font-weight 700
          font-size 14px
        }
        p:nth-child(2){
          font-weight 700
          font-size 20px
          color #f8a654
        }
        p:nth-child(3){
          font-weight 700
          font-size 14px
        }
        p:nth-child(4){
          font-weight 700
          font-size 20px
          color #f8a654
        }
      }
      .count_right{
        flex 1
        p:nth-child(1){
          font-weight 700
          font-size 14px
        }
        p:nth-child(2){
          font-weight 700
          font-size 20px
          color #ee6471
        }
        p:nth-child(3){
          font-weight 700
          font-size 14px
        }
        p:nth-child(4){
          font-weight 700
          font-size 20px
          color #ee6471
        }
      }
    }
    .flex{
      display flex
      text-align center
      line-height 30px
      .flexone{
        flex 1
        p:nth-child(1){
          font-weight 700
          font-size 12px
        }
        p:nth-child(2){
          font-weight 700
          font-size 20px
          color #f8a654
        }
      }
      .flextwo{
        flex 1
        p:nth-child(1){
          font-weight 700
          font-size 12px
        }
        p:nth-child(2){
          font-weight 700
          font-size 20px
          color #ee6471
        }
      }
      .flexthree{
        flex 1
        p:nth-child(1){
          font-weight 700
          font-size 12px
        }
        p:nth-child(2){
          font-weight 700
          font-size 20px
          color #91c4c9
        }
      }
      .flexfore{
        flex 1
        p:nth-child(1){
          font-weight 700
          font-size 12px
        }
        p:nth-child(2){
          font-weight 700
          font-size 20px
          color #7ba6a8
        }
      }
    }
  }
  .onedept{
    .titlea{
        height 40px
        line-height 40px
        color #f39f57
        font-size 15px
        font-weight 700
        .borleft{
            border-left 4px solid #f39f57
            padding-right 6px
        }
    }
    .detail{
      height 30px
      line-height 30px
      background-color #67bac9
      font-weight 700
      color #fff
      text-align center
    }
    .table{
        width 100%
        overflow-x auto
    }
    .postrank{
      height 400px
      background-color #f4e9d6
      .pie{
          width 100%
          height 100%
      }
    }
  }
</style>