<template>
    <div>
        <div class="header">
            <van-field v-model="selectTime" label="选择时间：" placeholder="请选择" @click="timeClick=showTime=true" readonly/>
            <choosedepartment @transferFa="selctdept" :Farequired="true"></choosedepartment>
        </div>
        <div class="total">
            <p>{{gwObj.allCount}}人</p>
            <p>总人数</p>
        </div>
        <!-- 按岗位分类 -->
        <div class="post">
            <p class="titlea"><span class="borleft"></span> 按岗位分类</p>
            <div class="postfenlei">
                <div class="post_itema" @click="znClick">
                    <p>{{gwObj.gwzhinengCount}}人</p>
                    <p>职能类</p>
                </div>
                <div class="post_itemb" @click="jsClick">
                    <p>{{gwObj.gwjiShuCount}}人</p>
                    <p>技术类</p>
                </div>
                <div class="post_itemc" @click="yxClick">
                    <p>{{gwObj.gwyingXiaoCount}}人</p>
                    <p>营销类</p>
                </div>
                <div class="post_itemd" @click="zjClick">
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
        <!-- 按司龄 -->
        <div class="post">
            <p class="titlea"><span class="borleft"></span> 按司龄</p>
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
                @cancel="showTime = false"
                @confirm="confirmTime"
            />
        </van-popup>
    </div>
</template>
<script>
import { querySelectTime,queryGwfl,queryGwcj,queryXlTeam,queryAgeTeam,querySexTeam,queryJobAgeTeam,queryDeptDetailTeam } from './api'
import chooseDepartment from "@/components/pickerDeptOne.vue";
export default {
components: {
    choosedepartment: chooseDepartment
},
  data () {
    return {
        selectTime: '',
        selectChangeTime: '', //传给后台的时间值
        selectDeptContent: '', //传给后台的部门值
        selectDeptId: '', //传给后台的部门id
        selectDeptGrade: '', //传给后台的部门层级
        showTime: false, //选择时间弹窗
        columns1: [],
        gwObj: {}, //岗位分类
        gwcjObj: {}, //岗位层级
        xlTeam: {}, //按学历
        ageTeam: {}, //按年龄
        sexTeam: {}, //按性别
        jobAgeTeam: {}, //按性别
        // columns: [], //表格列
        // tableData: [], //表格数据
        tableData: [],
        deptName: '',
        columns:[]
    };
  },
  created(){
    this.initData()
  },
  methods:{
    //确认时间
    confirmTime(picker){
        this.selectTime = picker
        //选择好的时间去掉年月传给后台
        let str = this.selectTime.replace("年","")
        let newStr = str.replace("月","")
        // console.log(newStr)
        this.selectChangeTime = newStr
        //选择条件发送请求
        //获取岗位分类
        let queryData = {
            jobnumber:localStorage.getItem('jobNum'),
            flag:2,
            content:this.selectDeptContent,
            deptId:this.selectDeptId,
            grade:this.selectDeptGrade,
            time:newStr,
        }
        queryGwfl(queryData).then(res=>{
            this.gwObj = res.obj
        })
        //查询岗位层级
        queryGwcj(queryData).then(res=>{
            this.gwcjObj = res.obj
            this.initCharts()
        })
        //查询按学历
        queryXlTeam(queryData).then(res=>{
            this.xlTeam = res.obj
            this.initCharts1()
        })
        //查询按年龄
        queryAgeTeam(queryData).then(res=>{
            this.ageTeam = res.obj
            this.initCharts2()
        })
        //查询按性别
        querySexTeam(queryData).then(res=>{
            this.sexTeam = res.obj
            this.initCharts3()
        })
        //查询按性别
        queryJobAgeTeam(queryData).then(res=>{
            this.jobAgeTeam = res.obj
            this.initCharts4()
        })
        //查询部门详细
        queryDeptDetailTeam(queryData).then(res=>{
            this.deptName = res.obj
            this.tableData = res.obj.details
            this.columns = [
                {field: 'highDeptName', title:this.deptName.highDeptTitle, width: 150, titleAlign: 'center',columnAlign:'center', isFrozen: false},
                {field: 'deptName', title:this.deptName.lowDeptTitle, width: 150, titleAlign: 'center',columnAlign:'center', isFrozen: false},
                {field: 'deptCount', title: '在编人数', width: 100, titleAlign: 'center',columnAlign:'center', isFrozen: false},
            ]
        })
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
            this.selectDeptContent = res.obj.content
            this.selectDeptId = res.obj.deptId
            this.selectDeptGrade = res.obj.grade
            //获取的时间去掉年月传给后台
            let str = res.obj.time.replace("年","")
            let newStr = str.replace("月","")
            // console.log(newStr)
            this.selectChangeTime = newStr //获取转换好的时间格式传给后台（默认时间）
        })
        //查询岗位层级
        queryGwcj(queryData).then(res=>{
            this.gwcjObj = res.obj
            this.initCharts()
        })
        //查询按学历
        queryXlTeam(queryData).then(res=>{
            this.xlTeam = res.obj
            this.initCharts1()
        })
        //查询按年龄
        queryAgeTeam(queryData).then(res=>{
            this.ageTeam = res.obj
            this.initCharts2()
        })
        //查询按性别
        querySexTeam(queryData).then(res=>{
            this.sexTeam = res.obj
            this.initCharts3()
        })
        //查询按性别
        queryJobAgeTeam(queryData).then(res=>{
            this.jobAgeTeam = res.obj
            this.initCharts4()
        })
        //查询部门详细
        queryDeptDetailTeam(queryData).then(res=>{
            this.deptName = res.obj
            this.tableData = res.obj.details
            this.columns = [
                {field: 'highDeptName', title:this.deptName.highDeptTitle, width: 150, titleAlign: 'center',columnAlign:'center', isFrozen: false},
                {field: 'deptName', title:this.deptName.lowDeptTitle, width: 150, titleAlign: 'center',columnAlign:'center', isFrozen: false},
                {field: 'deptCount', title: '在编人数', width: 100, titleAlign: 'center',columnAlign:'center', isFrozen: false},
            ]
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
            switch (params.name) {
              case '直接类（O类）':
                console.log(params.name)
                break;
              case '员工（P1/S1-P4/S4）':
                console.log(params.name)
                break;
              case '技术干部（P4/S4（主任）及以上）':
                console.log(params.name)
                break;
              case '基层干部（M1-M3）':
                console.log(params.name)
                break;
              case '中层干部（M4-M5）':
                console.log(params.name)
                break;
              case '核心干部（M及以上）':
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
        let data1 = [
            {name:'博士',value:this.xlTeam.xlboShiCount},
            {name:'MBA',value:this.xlTeam.xlmbacount},
            {name:'硕士及以上',value:this.xlTeam.xlshuoShiCount},
            {name:'小学',value:this.xlTeam.xlxiaoXueCount},
            {name:'大专',value:this.xlTeam.xldaZhuanCount},
            {name:'本科',value:this.xlTeam.xlbenKeCount},
            {name:'高中中专',value:this.xlTeam.xlgaoZhongCount},
            {name:'初中',value:this.xlTeam.xlchuZhongCount},
        ];
        let seriesLabel = {
            normal: {
                show: true,
                // textBorderColor: '#333',
                offset: [10, 0],
                textBorderWidth: 2
            }
        }
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
                },
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
                data: ['博士','MBA','硕士及以上', '小学', '大专', '本科', '高中中专', '初中']
            },
            series: [
                {
                    label: seriesLabel,
                    // name: '2011年',
                    type: 'bar',
                    data: data1,
                    itemStyle: {
                        normal: {
                        color: function(params) {
                                //自定义颜色
                                var colorList = [
                                    '#f2902a', '#f2902a', '#f2902a','#f2902a','#f2902a','#f2902a','#f2902a','#f2902a'
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
              case '初中':
                console.log(data1[xIndex].name)
                break;
              case '高中中专':
                console.log(data1[xIndex].name)
                break;
              case '本科':
                console.log(data1[xIndex].name)
                break;
              case '大专':
                console.log(data1[xIndex].name)
                break;
              case '小学':
                console.log(data1[xIndex].name)
                break;
              case '硕士及以上':
                console.log(data1[xIndex].name)
                break;
              case 'MBA':
                console.log(data1[xIndex].name)
                break;
              case '博士':
                console.log(data1[xIndex].name)
                break;
            
              default:
                break;
            }
          }
        });
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
    //按年龄
    initCharts2 () {
    　　let myChart = this.$echarts.init(this.$refs.chart2);
        let seriesLabel = {
            normal: {
                show: true,
                // textBorderColor: '#333',
                textBorderWidth: 2
            }
        }
    　　// 绘制图表
    　　myChart.setOption({
            xAxis: {
                type: 'category',
                data: ['25岁以下', '25-35岁', '35-45岁', '45-50岁', '50岁以上']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                label: seriesLabel,
                data: [
                        {name:'25岁以下',value:this.ageTeam.age25Count},
                        {name:'25-35岁',value:this.ageTeam.age25to35Count},
                        {name:'35-45岁',value:this.ageTeam.age35to45Count},
                        {name:'45-50岁',value:this.ageTeam.age45to50Count},
                        {name:'50岁以上',value:this.ageTeam.age50Count},
                    ],
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
              case '25岁以下':
                console.log(params.name)
                break;
              case '25-35岁':
                console.log(params.name)
                break;
              case '35-45岁':
                console.log(params.name)
                break;
              case '45-50岁':
                console.log(params.name)
                break;
              case '50岁以上':
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
                        {value: this.sexTeam.manCount, name: '男'},
                        {value: this.sexTeam.womanCount, name: '女'},
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
              case '男':
                console.log(params.name)
                break;
              case '女':
                console.log(params.name)
                break;
            
              default:
                break;
            }
        })
　　},
    //按司龄
    initCharts4 () {
    　　let myChart = this.$echarts.init(this.$refs.chart4);
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
                {name:'6个月及以下',value:this.jobAgeTeam.jobAge6mCount},
                {name:'6个月至1年（含）',value:this.jobAgeTeam.jobAge6mTo1yCount},
                {name:'1年至3年（含）',value:this.jobAgeTeam.jobAge1yTo3yCount},
                {name:'3年以上',value:this.jobAgeTeam.jobAge3yCount},
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
            switch (params.name) {
              case '6个月及以下':
                console.log(params.name)
                break;
              case '6个月至1年（含）':
                console.log(params.name)
                break;
              case '1年至3年（含）':
                console.log(params.name)
                break;
              case '3年以上':
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
        if (field === 'highDeptName') {
            return {
                colSpan: 1,
                rowSpan: this.tableData.length,
                content: `<span>${this.deptName.highDeptName}</span>`,
                componentName: ''
            }

        }
    },
    //选择部门
    // deptClick() {
    //     console.log('选择部门')
    // },
    selctdept(data) {
        console.log(data)
        this.selectDeptContent = data.content
        this.selectDeptId = data.deptId
        this.selectDeptGrade = data.grade
        let queryData = {
            jobnumber:localStorage.getItem('jobNum'),
            flag:2,
            content:data.content,
            deptId:data.deptId,
            grade:data.grade,
            time:this.selectChangeTime,
        }
        queryGwfl(queryData).then(res=>{
            this.gwObj = res.obj
        })
        //查询岗位层级
        queryGwcj(queryData).then(res=>{
            this.gwcjObj = res.obj
            this.initCharts()
        })
        //查询按学历
        queryXlTeam(queryData).then(res=>{
            this.xlTeam = res.obj
            this.initCharts1()
        })
        //查询按年龄
        queryAgeTeam(queryData).then(res=>{
            this.ageTeam = res.obj
            this.initCharts2()
        })
        //查询按性别
        querySexTeam(queryData).then(res=>{
            this.sexTeam = res.obj
            this.initCharts3()
        })
        //查询按性别
        queryJobAgeTeam(queryData).then(res=>{
            this.jobAgeTeam = res.obj
            this.initCharts4()
        })
        //查询部门详细
        queryDeptDetailTeam(queryData).then(res=>{
            this.deptName = res.obj
            this.tableData = res.obj.details
            this.columns = [
                {field: 'highDeptName', title:this.deptName.highDeptTitle, width: 150, titleAlign: 'center',columnAlign:'center', isFrozen: false},
                {field: 'deptName', title:this.deptName.lowDeptTitle, width: 150, titleAlign: 'center',columnAlign:'center', isFrozen: false},
                {field: 'deptCount', title: '在编人数', width: 100, titleAlign: 'center',columnAlign:'center', isFrozen: false},
            ]
        })
    },
    // 岗位分类查看详情
    znClick(){
        console.log(this.gwObj.gwzhinengJobnumber)
    },
    jsClick(){
        console.log(this.gwObj.gwjiShuJobnumber)
    },
    yxClick(){
        console.log(this.gwObj.gwyingXiaoJobnumber)
    },
    zjClick(){
        console.log(this.gwObj.gwzhiJieJobnumber)
    },
  },
  mounted(){
      
　}
}
</script>
<style>
    td{
        vertical-align: bottom
    }
</style>
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