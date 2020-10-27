<template>
    <div>
        <div class="tiaojian">
          <van-field v-model="selectYear" label="选择年：" placeholder="请选择" @click-input="showyear=true" readonly/>
          <div class="btns">
              <van-button type="primary" size="small" color="#fc5f10" @click="search" style="width:100%;font-size:15px">查询</van-button>
              <!-- <van-button type="primary" size="small" color="#fc5f10" @click="reset" style="width:45%;font-size:15px">重置</van-button> -->
              <!-- <van-button type="primary" size="small" color="#fc5f10" @click="ceshi" style="font-size:15px">测试</van-button> -->
          </div>
        </div>
        <div class="title">
          <p class="titlea">
            <span class="borleft">累计指标计划</span>
            <span>（<span style="color:#ee0a24;font-weight:700">单位：万</span>）</span>
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
          <p class="titlea">
            <span class="borleft">每月收入</span>
            <span>（<span style="color:#ee0a24;font-weight:700">单位：万</span>）</span>
          </p>
          <div class="charts">
            <div class="pie" ref="chart" id="chart"></div>
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
    </div>
</template>
<script>
import { Notify } from 'vant';
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      selectYear: '', //选择年
      showyear: false, //年弹窗
      minDate: new Date(2010, 0,0),
      maxDate: new Date(2025, 0,0),
      currentDate: new Date(),
      columnTime: [], //年
      tableData:[
        {name:'北美事业部',danwei:'一部门',fenlei:'分类一',target:'目标111',yuerenxiao:'20%',tongbi:'35%',counts:'4300',leiji:'20%',jindu:'10%',chayi:-0.2},
        {name:'北美事业部',danwei:'二部门',fenlei:'分类二',target:'目标111',yuerenxiao:'20%',tongbi:'35%',counts:'5600',leiji:'20%',jindu:'10%',chayi:0.22},
        {name:'北美事业部',danwei:'三部门',fenlei:'分类三',target:'目标111',yuerenxiao:'20%',tongbi:'35%',counts:'300',leiji:'20%',jindu:'10%',chayi:3.3},
        {name:'北美事业部',danwei:'四部门',fenlei:'分类四',target:'目标111',yuerenxiao:'20%',tongbi:'35%',counts:'400',leiji:'20%',jindu:'10%',chayi:-3.3}
      ],
      columns1:[
        {field: 'name', title: '一级单位', width: 150, titleAlign: 'center',columnAlign:'center'},
        {field: 'danwei', title: '二级部门', width: 150, titleAlign: 'center',columnAlign:'center'},
        {field: 'fenlei', title: '岗位分类', width: 150, titleAlign: 'center',columnAlign:'center',},
        {field: 'target', title: '年度人效目标', width: 150, titleAlign: 'center',columnAlign:'center',},
        {field: 'yuerenxiao', title: '月度人效', width: 150, titleAlign: 'center',columnAlign:'center',},
        {field: 'tongbi', title: '同比', width: 150, titleAlign: 'center',columnAlign:'center',},
        {field: 'counts', title: '累计人效', width: 150, titleAlign: 'center',columnAlign:'center',},
        {field: 'leiji', title: '累计同比', width: 150, titleAlign: 'center',columnAlign:'center',},
        {field: 'jindu', title: '人效进度', width: 150, titleAlign: 'center',columnAlign:'center',},
        {field: 'chayi', title: '进度差异', width: 150, titleAlign: 'center',columnAlign:'center',
          // formatter: function (rowData,rowIndex,pagingIndex,field) {
          //   // console.log(rowData[field]<0)
          //   // if(rowData.chayi < 0){
          //   //   return `<span class='cell-edit-color-a'>${rowData[field]}</span>`;
          //   // }
          // },
        },
      ]
    };
  },
  created(){
    this.pickerYear() //初始化选择年
    this.$store.state.arrflag = '' //清空标识
    console.log(this.tableData)
  },
  methods:{
      //表格行点击事件
    rowClick(rowIndex, rowData, column){
        console.log(rowData)
    },
    //单元格样式
    columnCellClass(rowIndex,columnName,rowData){
      // if (rowIndex % 2 == 0){
      //     return 'column-cell-class-name-test';
      // }
      if (rowData.chayi < 0 && columnName==='chayi'){
          return 'cell-edit-color-a';
      }
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
    //查询
    search(){
      
    },
    initCharts () {
    　　let myChart = this.$echarts.init(this.$refs.chart);
        let data1 = [6.8,8.3,13.7,17.5,22.5,28.6,34.1,41.0,0,0,0];
        let data2 = [1.5,5.4,3.8,4.9,6.1,5.6,6.9,7.0,7.6,8.0,8.5,0];
        let data3 = [30];
        let seriesLabel = {
            normal: {
                show: true,
                // textBorderColor: 'red',
                position: 'insideLeft',
                offset: [10, 0],
                textBorderWidth: 2,
                // formatter: '{c}人 {b}'
                formatter: '{c}'
            }
        }
    　　// 绘制图表
    　　myChart.setOption({
              xAxis: {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月','11月','12月']
              },
              yAxis: {
                  type: 'value'
              },
            series: [
                {
                    label: seriesLabel,
                    name: '累计人数',
                    type: 'line',
                    data: data1,
                },
                {
                    label: seriesLabel,
                    name: '月度人数',
                    type: 'line',
                    data: data2,
                },
                {
                  label: seriesLabel,
                  name: '年度人效目标',
                  type: 'line',
                  data: data3,
                  markLine: {
                      data: [{
                          type: 'average'
                      }]
                  },
                },
            ],
            dataZoom: [
              {
                  show: true,
                  realtime: true,
                  start: 0,
                  end: 60
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
            data: ['累计人数', '月度人数','年度人效目标']
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
    reset(){},
    ...mapMutations({
      save_type:'save_type',
      arr_flag:'arr_flag'
    })
  },
  mounted(){
    // const departRes =  JSON.parse(localStorage.getItem('departRes'))
    this.initCharts()
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
</style>