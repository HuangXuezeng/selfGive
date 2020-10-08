<template>
    <div>
        <div class="header">
          <div class="title">
            <div class="title_one">
              <p>平均在编</p>
              <p>13745</p>
            </div>
            <div class="title_two">
              <p>实际在编</p>
              <p>11745</p>
            </div>
          </div>
          <div class="count">
            <div class="count_left">
              <p>流失人数</p>
              <p>8727</p>
              <p>干部流失人数</p>
              <p>8727</p>
            </div>
            <div class="count_right">
              <p>流失率</p>
              <p>63.9%</p>
              <p>干部流失率</p>
              <p>63.9%</p>
            </div>
          </div>
          <div class="flex">
            <div class="flexone">
              <p>主动</p>
              <p>7766</p>
            </div>
            <div class="flextwo">
              <p>主动流失率</p>
              <p>56.50%</p>
            </div>
            <div class="flexthree">
              <p>被动</p>
              <p>961</p>
            </div>
            <div class="flexfore">
              <p>被动流失率</p>
              <p>6.99%</p>
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
              <div class="pie" ref="chart"></div>
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
        <div class="onedept">
          <p class="titlea"><span class="borleft"></span> 按每月情况</p>
          <div class="postrank">
              <div class="pie" ref="chart1"></div>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [
            {"month":"2020.5","pjun":"1987","fact":"13951","liushi":"1717","liushilv":"6.66%","zdong":"888","bdong":"66"},
            {"month":"2020.5","pjun":"1987","fact":"13951","liushi":"1717","liushilv":"6.66%","zdong":"888","bdong":"66"},
            {"month":"2020.5","pjun":"1987","fact":"13951","liushi":"1717","liushilv":"6.66%","zdong":"888","bdong":"66"},
            {"month":"2020.5","pjun":"1987","fact":"13951","liushi":"1717","liushilv":"6.66%","zdong":"888","bdong":"66"},
            {"month":"2020.5","pjun":"1987","fact":"13951","liushi":"1717","liushilv":"6.66%","zdong":"888","bdong":"66"},
        ],
      tableData1: [
            {"zji":"总监级","pjun":"1987","fact":"13951","liushi":"1717","liushilv":"6.66%","zdong":"888","bdong":"66"},
            {"zji":"总监级","pjun":"1987","fact":"13951","liushi":"1717","liushilv":"6.66%","zdong":"888","bdong":"66"},
            {"zji":"总监级","pjun":"1987","fact":"13951","liushi":"1717","liushilv":"6.66%","zdong":"888","bdong":"66"},
            {"zji":"总监级","pjun":"1987","fact":"13951","liushi":"1717","liushilv":"6.66%","zdong":"888","bdong":"66"},
            {"zji":"总监级","pjun":"1987","fact":"13951","liushi":"1717","liushilv":"6.66%","zdong":"888","bdong":"66"},
        ],
      columns: [
          {field: 'zji', title:'月份', width: 100, titleAlign: 'center',columnAlign:'center'},
          {field: 'pjun', title: '平均在编', width: 150, titleAlign: 'center',columnAlign:'center',
            formatter: function (rowData,rowIndex,pagingIndex,field) {
              return `<span class='cell-edit-color-a'>${rowData[field]}</span>`;
            },
          },
          {field: 'fact', title: '实际在编', width: 100, titleAlign: 'center',columnAlign:'center',
            formatter: function (rowData,rowIndex,pagingIndex,field) {
              return `<span class='cell-edit-color-b'>${rowData[field]}</span>`;
            },
          },
          {field: 'liushi', title: '流失人数',width: 100, titleAlign: 'center',columnAlign:'center',
            formatter: function (rowData,rowIndex,pagingIndex,field) {
              return `<span class='cell-edit-color-c'>${rowData[field]}</span>`;
            },
          },
          {field: 'liushilv', title: '流失率',width: 100, titleAlign: 'center',columnAlign:'center',
            formatter: function (rowData,rowIndex,pagingIndex,field) {
              return `<span class='cell-edit-color-d'>${rowData[field]}</span>`;
            },
          },
          {field: 'zdong', title: '主动',width: 100, titleAlign: 'center',columnAlign:'center',
            formatter: function (rowData,rowIndex,pagingIndex,field) {
              return `<span class='cell-edit-color-e'>${rowData[field]}</span>`;
            },
          },
          {field: 'bdong', title: '被动',width: 100, titleAlign: 'center',columnAlign:'center',
            formatter: function (rowData,rowIndex,pagingIndex,field) {
              return `<span class='cell-edit-color-f'>${rowData[field]}</span>`;
            },
          }
      ],
      columns1: [
          {field: 'zji', title:'职级', width: 100, titleAlign: 'center',columnAlign:'center'},
          {field: 'pjun', title: '平均在编', width: 150, titleAlign: 'center',columnAlign:'center',
            formatter: function (rowData,rowIndex,pagingIndex,field) {
              return `<span class='cell-edit-color-a'>${rowData[field]}</span>`;
            },
          },
          {field: 'liushi', title: '流失人数',width: 100, titleAlign: 'center',columnAlign:'center',
            formatter: function (rowData,rowIndex,pagingIndex,field) {
              return `<span class='cell-edit-color-c'>${rowData[field]}</span>`;
            },
          },
          {field: 'zdong', title: '主动',width: 100, titleAlign: 'center',columnAlign:'center',
            formatter: function (rowData,rowIndex,pagingIndex,field) {
              return `<span class='cell-edit-color-e'>${rowData[field]}</span>`;
            },
          },
          {field: 'bdong', title: '被动',width: 100, titleAlign: 'center',columnAlign:'center',
            formatter: function (rowData,rowIndex,pagingIndex,field) {
              return `<span class='cell-edit-color-f'>${rowData[field]}</span>`;
            },
          }
      ]
    };
  },
  created(){},
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
              {name:'股东',value:6},
              {name:'直接类',value:9431},
              {name:'营销类',value:1790},
              {name:'技术类',value:1047},
              {name:'职能类',value:1477},
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
                  name: '水量',
                  min: 0,
                  max: 250,
                  interval: 50,
                  axisLabel: {
                      formatter: '{value} ml'
                  }
              },
              {
                  type: 'value',
                  name: '温度',
                  min: 0,
                  max: 25,
                  interval: 5,
                  axisLabel: {
                      formatter: '{value} °C'
                  }
              }
          ],
          series: [
              {
                  name: '蒸发量',
                  type: 'bar',
                  data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6]
              },
              {
                  name: '降水量',
                  type: 'bar',
                  data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6]
              },
              {
                  name: '平均温度',
                  type: 'line',
                  yAxisIndex: 1,
                  data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3]
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
  },
  mounted(){
    this.initCharts()
    this.initCharts1()
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