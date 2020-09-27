<template>
    <div>
        <div class="header">
            <van-field v-model="selectTime" label="选择时间：" placeholder="请选择" @click="timeClick=showTime=true" readonly/>
            <van-field v-model="selectDept" label="选择单位：" placeholder="请选择" @click="deptClick" readonly/>
        </div>
        <div class="total">
            <p>13951人</p>
            <p>总人数</p>
        </div>
        <!-- 按岗位分类 -->
        <div class="post">
            <p class="titlea"><span class="borleft"></span> 按岗位分类</p>
            <div class="postfenlei">
                <div class="post_itema">
                    <p>{{gwObj.gwzhinengCount}}人</p>
                    <p>职能类</p>
                </div>
                <div class="post_itemb">
                    <p>{{gwObj.gwjiShuCount}}人</p>
                    <p>技术类</p>
                </div>
                <div class="post_itemc">
                    <p>{{gwObj.gwyingXiaoCount}}人</p>
                    <p>营销类</p>
                </div>
                <div class="post_itemd">
                    <p>{{gwObj.gwzhiJieCount}}人</p>
                    <p>直接类</p>
                </div>
            </div>
        </div>
        <!-- 按岗位层级 -->
        <div class="post">
            <p class="titlea"><span class="borleft"></span> 按岗位层级</p>
            <div class="postrank">
                <div class="pie" ref="chart"></div>
            </div>
        </div>
        <!-- 按学历 -->
        <div class="post">
            <p class="titlea"><span class="borleft"></span> 按学历</p>
            <div class="postrank">
                <div class="pie" ref="chart1"></div>
            </div>
        </div>
        <!-- 按年龄 -->
        <div class="post">
            <p class="titlea"><span class="borleft"></span> 按年龄</p>
            <div class="postrank">
                <div class="pie" ref="chart2"></div>
            </div>
        </div>
        <!-- 按性别 -->
        <div class="post">
            <p class="titlea"><span class="borleft"></span> 按性别</p>
            <div class="postrank">
                <div class="pie" ref="chart3"></div>
            </div>
        </div>
        <!-- 按来源 -->
        <div class="post">
            <p class="titlea"><span class="borleft"></span> 按来源</p>
            <div class="postrank">
                <div class="pie" ref="chart4"></div>
            </div>
        </div>
        <!-- 查看详细 -->
        <div class="post">
            <p class="titlea"><span class="borleft"></span> 查看详细</p>
            <div class="table">
                <v-table 
                ref="table" 
                title-bg-color="#ccc"
                :columns="columns"
                :table-data="tableData" 
                row-hover-color="#eee" 
                row-click-color="#edf7ff" 
                :row-click="rowClick"	
                :cell-merge="cellMerge"
                ></v-table>	
            </div>
        </div>
        <!-- 选择时间 -->
        <van-popup v-model="showTime" round position="bottom" get-container="body">
            <van-picker
                show-toolbar
                :columns="columns1"
                @cancel="selectTime = false"
                @confirm="confirmTime"
            />
        </van-popup>
    </div>
</template>
<script>
import { querySelectTime,queryGwfl,queryGwcj } from './api'
export default {
  data () {
    return {
        selectTime: '',
        selectChangeTime: '', //传给后台的时间值
        selectDept: '',
        showTime: false, //选择时间弹窗
        columns1: [],
        gwObj: {}, //岗位分类
        gwcjObj: {
            gwcjhexinCount: '',
            gwcjjicengCount: '',
            gwcjjishuCount: '',
            gwcjyuangongCount: '',
            gwcjzhijieCount: '',
            gwcjzhongcengCount: '',
        }, //岗位层级
        // columns: [], //表格列
        // tableData: [], //表格数据
        tableData: [
                    {"name":"顾家家居股份有限公司","gender":"男","birthday":'2003-12-7',"height":"166","email":"li@gmail.com","tel":"182*****1538","hobby":"钢琴、书法、唱歌","address":"上海市奉贤区南桥镇立新路12号2楼"},
                    {"name":"变革管理与组织发展中心","gender":"女","birthday":'1993-12-7',"height":"186","email":"sun@gmail.com","tel":"161*****0097","hobby":"钢琴、书法、唱歌","address":"上海市崇明县城桥镇八一路739号"},
                    {"name":"人力资源管理中心","gender":"女","birthday":'1993-12-7',"height":"188","email":"zhou@gmail.com","tel":"197*****1123","hobby":"钢琴、书法、唱歌","address":"上海市青浦区青浦镇章浜路24号"},
                   ],
        columns:[
                    {field: 'name', title:'一级单位', width: 300, titleAlign: 'center',columnAlign:'center', isFrozen: false},
                    {field: 'gender', title:'二级单位', width: 300, titleAlign: 'center',columnAlign:'center', isFrozen: false},
                    {field: 'tel', title: '在编人数', width: 180, titleAlign: 'center',columnAlign:'center', isFrozen: false},
                ]
    };
  },
  created(){
    this.initData()
  },
  methods:{
    //确认时间
    confirmTime(picker){
        this.selectTime = picker
        let arr1 = []
        let newArr = []
        for( let i in this.columns1){
            arr1.push(this.columns1[i].replace("年",""))
        }
        for( let i in arr1){
            newArr.push(arr1[i].replace("月",""))
        }
        console.log(newArr)
        this.showTime = false
    },
    //页面初始化数据
    initData(){
        //获取选择的时间
        querySelectTime().then(res=>{
            this.columns1 = res.obj
        })
        //获取岗位分类
        let queryData = {
            jobnumber:localStorage.getItem('jobNum'),
            flag:1
        }
        queryGwfl(queryData).then(res=>{
            this.gwObj = res.obj
        })
        //查询岗位层级
        queryGwcj(queryData).then(res=>{
            this.gwcjObj = res.obj
            this.initCharts()
            this.initCharts1()
            this.initCharts2()
            this.initCharts3()
            this.initCharts4()
        })
    },
    //按岗位层级
    initCharts () {
    　　let myChart = this.$echarts.init(this.$refs.chart);
    　　// 绘制图表
    　　myChart.setOption({
        // 　　title: { text: '分析报表' },
        　　tooltip: {},
            legend:{
              // textStyle:{color:'#f00'},
              orient: 'vertical',
              left: 'left',
              padding: 20
            },
        　　xAxis: {
        // 　　data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"],
              show:false,//不显示坐标轴线、坐标轴刻度线和坐标轴上的文字
        　　},
        　　yAxis: {
              show:false,
            },
        　　series: [{
        　　name: '人数',
        　　type: 'pie',
            radius: '60%',
            center: ['50%', '70%'],
            label: {
                normal:{
                    show: true,
                    // position: 'inside',
                    formatter: '{c}%',
                    formatter:function(params){ //标签内容
                    //   return  params.name+':'+params.value
                      return params.value
                    },
                  }
                },
        　　data: [
                {name:'直接类（O类）',value:this.gwcjObj.gwcjzhijieCount},
                {name:'员工（P1/S1-P4/S4）',value:this.gwcjObj.gwcjyuangongCount},
                {name:'技术干部（P4/S4（主任）及以上）',value:this.gwcjObj.gwcjjishuCount},
                {name:'基层干部（M1-M3）',value:this.gwcjObj.gwcjjicengCount},
                {name:'中层干部（M4-M5）',value:this.gwcjObj.gwcjzhongcengCount},
                {name:'核心干部（M及以上）',value:this.gwcjObj.gwcjhexinCount},
              ],
              itemStyle: {
                  normal: {
                  color: function(params) {
                          //自定义颜色
                          var colorList = [
                          'skyblue', 'lightgreen', 'orange','pink','#f66bbf','#e02c28'
                          ];
                          return colorList[params.dataIndex]
                      }
                  }
              }
        　　}]
    　　});
        window.onresize = myChart.resize
        //点击事件
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
    //按学历
    initCharts1 () {
    　　let myChart = this.$echarts.init(this.$refs.chart1);
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
                data: ['其他','硕士及以上', '小学', '大专', '本科', '高中中专', '初中']
            },
            series: [
                {
                    // label: seriesLabel,
                    // name: '2011年',
                    type: 'bar',
                    data: [
                        {value:8000},
                        {value:6000},
                        {value:5000},
                        {value:4000},
                        {value:3000},
                        {value:2000},
                        {value:1000},
                    ],
                    itemStyle: {
                        normal: {
                        color: function(params) {
                                //自定义颜色
                                var colorList = [
                                '#f2902a', '#f2902a', '#f2902a','#f2902a','##f2902a','#f2902a','#f2902a'
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
    //按年龄
    initCharts2 () {
    　　let myChart = this.$echarts.init(this.$refs.chart2);
    　　// 绘制图表
    　　myChart.setOption({
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, 200, 150, 80, 70],
                type: 'bar',
                itemStyle: {
                    normal: {
                    color: function(params) {
                            //自定义颜色
                            var colorList = [
                                '#adbd38', '#f06615', '#e972b1','#24ac83','#1ba1c3'
                            ];
                            return colorList[params.dataIndex]
                        }
                    }
                }
            }]
    　　});
        window.onresize = myChart.resize
        //点击事件
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
    //按性别
    initCharts3 () {
    　　let myChart = this.$echarts.init(this.$refs.chart3);
    　　// 绘制图表
    　　myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 10,
                data: ['男', '女']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {value: 335, name: '男'},
                        {value: 310, name: '女'},
                    ],
                    itemStyle: {
                        normal: {
                        color: function(params) {
                                //自定义颜色
                                var colorList = [
                                    '#56a336','#f64971'
                                ];
                                return colorList[params.dataIndex]
                            }
                        }
                    }
                }
            ]
    　　});
        window.onresize = myChart.resize
        //点击事件
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
    //按来源
    initCharts4 () {
    　　let myChart = this.$echarts.init(this.$refs.chart4);
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
                data: ['编外人员','中介招聘','派遣公司', '其他', '校园招聘', '内部推荐', '外包公司', '自主招聘']
            },
            series: [
                {
                    // name: '2011年',
                    type: 'bar',
                    data: [300,800,1003, 1289, 1534, 1970, 2004, 3000],
                    itemStyle: {
                        normal: {
                        color: function(params) {
                                //自定义颜色
                                var colorList = [
                                    '#ee7b77','#ee7b77','#ee7b77','#ee7b77','#ee7b77','#ee7b77','#ee7b77','#ee7b77',
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
    //表格行点击事件
    rowClick(rowIndex, rowData, column){
        console.log(rowData)
    },
    cellMerge(rowIndex,rowData,field){
        if (field === 'name' && rowData[field] === '顾家家居股份有限公司') {
            return {
                colSpan: 1,
                rowSpan: 2,
                content: '<span style="color:red">顾家家居股份有限公司</span>',
                componentName: ''

            }
        } else if (rowIndex === 1 && field === 'gender') {

            return {
                colSpan: 1,
                rowSpan: 4,
                content: '<span style="color:red">变革管理与组织发展中心</span>',
                componentName: ''
            }

        }else if (rowIndex === 1 && field === 'tel') {

                return {
                    colSpan: 1,
                    rowSpan: 3,
                    content:'',
                    componentName:'table-cell-merge',
                }
        }
    },
    deptClick(){
        
    }
  },
  mounted(){
　　
　}
}
</script>
<style lang="stylus" scoped>
    .header{
        padding 10px
    }
    .total{
        height 60px
        line-height 30px
        background-color #dfe6e7
        text-align center
        p:nth-child(1){
            font-weight 700
            color #4f8fa0
        }
        p:nth-child(2){
            font-size 14px
        }
    }
    .post{
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
        .postfenlei{
            height 80px
            display flex
            p{
                color #fff
                font-weight 700
                line-height 35px
                text-align center
            }
            .post_itema{
                flex 1
                background-color #0f6b83
            }
            .post_itemb{
                flex 1
                background-color #53958c
            }
            .post_itemc{
                flex 1
                background-color #fda677
            }
            .post_itemd{
                flex 1
                background-color #d45348
            }
            
        }
        .postrank{
            height 400px
            background-color #dfe6e7
            .pie{
                width 100%
                height 100%
            }
        }
        .table{
            width 100%
            overflow-x auto
        }
    }
</style>