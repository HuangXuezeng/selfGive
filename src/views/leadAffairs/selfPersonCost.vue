<template>
    <div class="sidebox">
      <div class="totalPerson">
        <span>总共（516）人,</span>
        <span>正式员工（445）人，</span>
        <span>实习（44）人</span>
      </div>
      <div class="pie" ref="chart"></div>
      <div>主体信息分析***</div>
      <div class="pie" ref="chart1"></div>
      <div>**信息分析***</div>
      <div class="pie" ref="chart2"></div>
      <div>**信息分析***</div>
    </div>
</template>
<script>
export default {
  data () {
    return {
    };
  },
  methods: {
　　initCharts () {
    　　let myChart = this.$echarts.init(this.$refs.chart);
    // 　　console.log(this.$refs.chart)
    　　// 绘制图表
    　　myChart.setOption({
        // 　　title: { text: '分析报表' },
        　　tooltip: {},
            legend:{
              // textStyle:{color:'#f00'},
              padding: 20
            },
        　　xAxis: {
        // 　　data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
              show:false,//不显示坐标轴线、坐标轴刻度线和坐标轴上的文字
        　　},
        　　yAxis: {
              show:false,
            },
        　　series: [{
        　　name: '人数',
        　　type: 'pie',
            label: {
                normal:{
                    show: true,
                    position: 'inside',
                    formatter:function(params){ //标签内容
                      return  params.name+':'+params.value
                    },
                  }
                },
        　　data: [
                {name:'M',value:18},
                {name:'S',value:29},
                {name:'P',value:12},
                {name:'O',value:20},
              ],
              itemStyle: {
                  normal: {
                  color: function(params) {
                          //自定义颜色
                          var colorList = [
                          'skyblue', 'lightgreen', 'orange','pink','#f66bbf'
                          ];
                          return colorList[params.dataIndex]
                      }
                  }
              }
        　　}]
    　　});
        window.onresize = myChart.resize
        myChart.on('click', function (params) {
            // window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
            switch (params.name) {
              case '衬衫':
                console.log(params.name)
                break;
              case '羊毛衫':
                console.log(params.name)
                break;
            
              default:
                break;
            }
        })
　　},
　　initCharts1 () {
    　　let myChart = this.$echarts.init(this.$refs.chart1);
    // 　　console.log(this.$refs.chart)
    　　// 绘制图表
    　　myChart.setOption({
        // 　　title: { text: '分析报表' },
        　　tooltip: {},
        　　xAxis: {
        　　data: ["衬衫","羊毛衫","雪纺衫","裤子"]
              // show:false,//不显示坐标轴线、坐标轴刻度线和坐标轴上的文字
        　　},
        　　yAxis: {},
        　　series: [{
        　　name: '人数',
        　　type: 'line',
        　　data: [
                {name:'M',value:8},
                {name:'S',value:29},
                {name:'P',value:12},
                {name:'O',value:20},
              ]
        　　}]
    　　});
        window.onresize = myChart.resize
        myChart.on('click', function (params) {
            // window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
            switch (params.name) {
              case '衬衫':
                console.log(params.name)
                break;
              case '羊毛衫':
                console.log(params.name)
                break;
            
              default:
                break;
            }
        })
　　},
　　initCharts2 () {
    　　let myChart = this.$echarts.init(this.$refs.chart2);
    // 　　console.log(this.$refs.chart)
    　　// 绘制图表
    　　myChart.setOption({
        // 　　title: { text: '分析报表' },
        　　tooltip: {},
        　　xAxis: {
        // 　　data: ["衬衫","羊毛衫","雪纺衫","裤子",'内衣','羽绒服']
              // show:false,//不显示坐标轴线、坐标轴刻度线和坐标轴上的文字
        　　},
        　　yAxis: {},
        　　series: [{
        　　name: '人数',
        　　type: 'bar',
        　　data: [
                {name:'M',value:8},
                {name:'S',value:29},
                {name:'P',value:12},
                {name:'O',value:20},
                {name:'k',value:6},
                {name:'j',value:2},
              ],
              itemStyle: {
                  normal: {
                  color: function(params) {
                          //自定义颜色
                          var colorList = [
                          'skyblue', 'lightgreen', 'orange','pink','#f66bbf','yellow','#ccc'
                          ];
                          return colorList[params.dataIndex]
                      }
                  }
              }
        　　}]
    　　});
        window.onresize = myChart.resize
        myChart.on('click', function (params) {
            // window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
            switch (params.name) {
              case 'M':
                console.log('选择了'+params.name)
                break;
              case 'S':
                console.log(params.name)
                break;
            
              default:
                break;
            }
        })
　　},
　},
　mounted () {
　　this.initCharts();
    this.initCharts1()
    this.initCharts2()
　}
}
</script>
<style lang="stylus" scoped>
  .sidebox{
    text-align -webkit-center
    .totalPerson{
      padding 10px
    }
    .pie{
      width 80vw 
      height 50vh
    }
  }
  .canvas{
    width 100px
  }
</style>