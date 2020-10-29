<template>
    <div>
        <div class="header">
            <van-field v-model="selectTime" label="选择时间：" placeholder="请选择" @click="timeClick=showTime=true" readonly/>
            <choosedepartment 
            ref="dept_content" 
            @transferFa="selctdept" 
            :Farequired="true">
            </choosedepartment>
            <div class="btn">
                <van-button type="primary" color="#fc5f10" size="small" @click="search" style="width:45%">查询</van-button>
                <van-button type="primary" color="#fc5f10" size="small" @click="reset" style="width:45%">重置</van-button>
                <!-- <van-button type="primary" color="#fc5f10" size="small" @click="ceshi">测试</van-button> -->
            </div>
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
                <div class="pie" ref="chart" id="chart"></div>
            </div>
        </div>
        <!-- 按学历 -->
        <div class="post">
            <p class="titlea"><span class="borleft"></span> 按学历</p>
            <div class="ages">
                <div class="pie" ref="chart1" id="chart1"></div>
            </div>
        </div>
        <!-- 按年龄 -->
        <div class="post">
            <p class="titlea"><span class="borleft"></span> 按年龄</p>
            <div class="ages">
                <div class="pie" ref="chart2" id="chart2"></div>
            </div>
        </div>
        <!-- 按性别 -->
        <div class="post">
            <p class="titlea"><span class="borleft"></span> 按性别</p>
            <div class="ages">
                <div class="pie" ref="chart3" id="chart3"></div>
            </div>
        </div>
        <!-- 按司龄 -->
        <div class="post">
            <p class="titlea"><span class="borleft"></span> 按司龄</p>
            <div class="ages">
                <div class="pie" ref="chart4" id="chart4"></div>
            </div>
        </div>
        <!-- 查看详细 -->
        <div class="post">
            <p class="titlea"><span class="borleft"></span> 查看详细</p>
            <div class="table">
                <v-table 
                ref="table" 
                is-horizontal-resize
                style="width:100%;font-size:14px"
                columns-width-drag
                title-bg-color="#e5ecf0"
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
        <!-- 表格弹窗 -->
        <van-popup
        v-model="showTable" 
        closeable
        close-icon-position="bottom-right"
        get-container="body"
        position="top" 
        :style="{ height: '80%' }">
          <div class="table">
              <v-table 
              ref="pop_table"
              is-horizontal-resize
              :is-loading="isLoading"
              columns-width-drag
              :height="400"
              style="width:100%;font-size:14px"
              title-bg-color="#ccc"
              :columns="popupColumns"
              :table-data="popupTableData" 
              row-hover-color="#eee" 
              row-click-color="#edf7ff" 
              :row-click="rowClick3"	
              ></v-table>	
          </div>
          <div class="more">
              <van-tag type="warning">总条数：{{total}}</van-tag>
              <span style="float:right" @click="loadMore"><van-tag type="warning">下一页</van-tag></span>
          </div>
        </van-popup> 
    </div>
</template>
<script>
import { Notify } from 'vant';
import { querySelectTime,queryGwfl,queryGwcj,queryXlTeam,queryAgeTeam,querySexTeam,queryJobAgeTeam,queryDeptDetailTeam,queryRoster } from './api'
import chooseDepartment from "@/components/pickerDeptOne.vue";
import { mapMutations } from 'vuex'
export default {
components: {
    choosedepartment: chooseDepartment
},
  data () {
    return {
        isLoading: true,
        showTable: false, //表格弹窗
        selectTime: '',
        selectChangeTime: '', //传给后台的时间值
        selectDeptContent: '', //传给后台的部门值
        selectDeptId: '', //传给后台的部门id
        selectDeptGrade: '', //传给后台的部门层级
        results: '',
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
        columns:[],
        popupColumns:[
            {
                field: 'custome', width: 50, titleAlign: 'center', columnAlign: 'center',title: '序号',
                formatter: function (rowData, index) {
                    return index + 1
                }, isResize:true,
            },
            {
                field: 'jobnumber',title: '工号',width: 100,titleAlign: 'center',columnAlign: 'center',
                formatter: function(rowData, rowIndex, pagingIndex, field) {
                    return `<span>${rowData[field]}</span>`;
                },isResize: true,
            },
            {field: 'name',title: '姓名',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true},
            {field: 'department',title: '部门',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true},
            {field: 'post',title: '岗位',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true},
            {field: 'rank',title: '职级',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true},
            {field: 'rsrq',title: '入司日期',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true},									
            {field: 'currentState',title: '当前状态',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true},	
        ],
        popupTableData:[], //弹窗表格
        fenyeData:[], //处理好的分页数据
        total: 0, //总条数
        dataIndex: 0, //假分页默认显示

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
        this.showTime = false
    },
    //弹窗表格中的行点击
    rowClick3(rowIndex, rowData, column){
        // console.log(rowData)
        this.save_jobNum(rowData.jobnumber)
        this.from_page(2) //存标识，从哪个页面过来的
        // this.scroll_top(document.getElementsByClassName("v-table-body")[0].scrollTop)
        this.$router.push({name:'basicMsg'})
    },
    //加载更多数据
    loadMore(){
        // debugger
        this.dataIndex++ //点击+1
        if(this.dataIndex >= this.fenyeData.length){
            Notify({ type: "warning", message: "没有更多数据了哦~" });
        }else{
            this.popupTableData = this.popupTableData.concat(this.fenyeData[this.dataIndex])
        }
    },
    //处理表格的分页方法
    pagePev(){
        this.total = this.popupTableData.length
        let result = []
        let chunk = 100 //100个一组
        for(var i = 0, j = this.popupTableData.length; i < j; i += chunk){
            result.push(this.popupTableData.slice(i,i + chunk))
        }
        // console.log(result)
        this.popupTableData = result[0] //默认显示100条
        this.fenyeData = result
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
        //查询按司龄
        queryJobAgeTeam(queryData).then(res=>{
            this.jobAgeTeam = res.obj
            this.initCharts4()
        })
        //查询部门详细
        queryDeptDetailTeam(queryData).then(res=>{
            this.deptName = res.obj
            this.tableData = res.obj.details
            this.columns = [
                {field: 'highDeptName', title:this.deptName.highDeptTitle, width: 150, titleAlign: 'center',columnAlign:'center', isFrozen: false,isResize:true},
                {field: 'deptName', title:this.deptName.lowDeptTitle, width: 150, titleAlign: 'center',columnAlign:'center', isFrozen: false,isResize:true},
                {field: 'deptCount', title: '在编人数', width: 100, titleAlign: 'center',columnAlign:'center', isFrozen: false,isResize:true},
            ]
        })
    },
    //按岗位层级
    initCharts () {
    　　let myChart = this.$echarts.init(this.$refs.chart);
    　　// 绘制图表
    　　myChart.setOption({
        // 　　title: { text: '分析报表' },
        // 　　tooltip: {},
            legend:{
              // textStyle:{color:'#f00'},
            //   orient: 'vertical',
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
                    position:'outer',
                    alignTo:'edge',
                    margin:10,
                    formatter: '{c}人 {d}% \n\n',
                    padding: [0,50],
                    textStyle: {
                        color: "#f64971",
                        fontWeight: "700"
                    }
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
        let that = this //改变this指向
        myChart.on('click', function (params) {
            switch (params.name) {
              case '直接类（O类）':
                that.dataIndex = 0
                var queryData = {}
                setTimeout(() => {
                  that.showTable = true
                }, 500);
                queryData.jobnumbers = that.gwcjObj.gwcjzhijieJobnumber
                queryRoster(queryData).then(res=>{
                    that.popupTableData = res.obj
                    that.isLoading = false
                    that.pagePev() //获取的表格数据分组
                })
                break;
              case '员工（P1/S1-P4/S4）':
                that.dataIndex = 0
                var queryData = {}
                setTimeout(() => {
                  that.showTable = true
                }, 500);
                queryData.jobnumbers = that.gwcjObj.gwcjyuangongJobnumber
                queryRoster(queryData).then(res=>{
                    that.popupTableData = res.obj
                    that.isLoading = false
                    that.pagePev() //获取的表格数据分组
                })
                break;
              case '技术干部（P4/S4（主任）及以上）':
                that.dataIndex = 0
                var queryData = {}
                setTimeout(() => {
                  that.showTable = true
                }, 500);
                queryData.jobnumbers = that.gwcjObj.gwcjjishuJobnumber
                queryRoster(queryData).then(res=>{
                    that.popupTableData = res.obj
                    that.isLoading = false
                    that.pagePev() //获取的表格数据分组
                })
                break;
              case '基层干部（M1-M3）':
                that.dataIndex = 0
                var queryData = {}
                setTimeout(() => {
                  that.showTable = true
                }, 500);
                queryData.jobnumbers = that.gwcjObj.gwcjjicengJobnumber
                queryRoster(queryData).then(res=>{
                    that.popupTableData = res.obj
                    that.isLoading = false
                    that.pagePev() //获取的表格数据分组
                })
                break;
              case '中层干部（M4-M5）':
                that.dataIndex = 0
                var queryData = {}
                setTimeout(() => {
                  that.showTable = true
                }, 500);
                queryData.jobnumbers = that.gwcjObj.gwcjzhongcengJobnumber
                queryRoster(queryData).then(res=>{
                    that.popupTableData = res.obj
                    that.isLoading = false
                    that.pagePev() //获取的表格数据分组
                })
                break;
              case '核心干部（M及以上）':
                that.dataIndex = 0
                var queryData = {}
                setTimeout(() => {
                  that.showTable = true
                }, 500);
                queryData.jobnumbers = that.gwcjObj.gwcjhexinJobnumber
                queryRoster(queryData).then(res=>{
                    that.popupTableData = res.obj
                    that.isLoading = false
                    that.pagePev() //获取的表格数据分组
                })
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
            {name:this.xlTeam.xlxiaoXuePct,value:this.xlTeam.xlxiaoXueCount},
            {name:this.xlTeam.xlchuZhongPct,value:this.xlTeam.xlchuZhongCount},
            {name:this.xlTeam.xlgaoZhongPct,value:this.xlTeam.xlgaoZhongCount},
            {name:this.xlTeam.xldaZhuanPct,value:this.xlTeam.xldaZhuanCount},
            {name:this.xlTeam.xlbenKePct,value:this.xlTeam.xlbenKeCount},
            {name:this.xlTeam.xlshuoShiPct,value:this.xlTeam.xlshuoShiCount},
            {name:this.xlTeam.xlmbapct,value:this.xlTeam.xlmbacount},
            {name:this.xlTeam.xlboShiPct,value:this.xlTeam.xlboShiCount},
        ];
        let data2 = [
            {name:'小学'},
            {name:'小初中学'},
            {name:'高中中专'},
            {name:'大专'},
            {name:'本科'},
            {name:'硕士及以上'},
            {name:'MBA'},
            {name:'博士'},
        ];
        let seriesLabel = {
            normal: {
                show: true,
                // textBorderColor: 'red',
                position: 'insideLeft',
                offset: [10, 0],
                textBorderWidth: 2,
                formatter: '{c}人 {b}'
            }
        }
    　　// 绘制图表
    　　myChart.setOption({
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
                data: ['小学','初中','高中中专','大专','本科','硕士及以上','MBA','博士']
                // data: ['博士', 'MBA', '硕士及以上', '本科', '大专','高中中专','初中','小学']
            },
            series: [
                {
                    label: seriesLabel,
                    // name: '2011年',
                    barWidth: 25,
                    type: 'bar',
                    data: data1,
                    itemStyle: {
                        normal: {
                        color: function(params) {
                                //自定义颜色
                                var colorList = [
                                    '#f2902a', '#f2902b', '#f2902c','#f2902d','#f2902e','#f2902f','#f29022','#f29023'
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
        let that = this
        myChart.getZr().on('click',function (params) {
          var pointInPixel= [params.offsetX, params.offsetY];
          if (myChart.containPixel('grid',pointInPixel)) {
            /*单击图标X轴数据，打开详情*/
              var xIndex = myChart.convertFromPixel({seriesIndex:0},pointInPixel)[1];
              // console.log(data1[xIndex])
            switch (data2[xIndex].name) {
              case '初中':
                that.dataIndex = 0
                // console.log(data2[xIndex].name)
                var queryData = {}
                setTimeout(() => {
                  that.showTable = true
                }, 500);
                queryData.jobnumbers = that.xlTeam.xlchuZhongJobnumber
                queryRoster(queryData).then(res=>{
                    that.popupTableData = res.obj
                    that.isLoading = false
                    that.pagePev() //获取的表格数据分组
                })
                break;
              case '高中中专':
                that.dataIndex = 0
                var queryData = {}
                setTimeout(() => {
                  that.showTable = true
                }, 500);
                queryData.jobnumbers = that.xlTeam.xlgaoZhongJobnumber
                queryRoster(queryData).then(res=>{
                    that.popupTableData = res.obj
                    that.isLoading = false
                    that.pagePev() //获取的表格数据分组
                })
                break;
              case '本科':
                that.dataIndex = 0
                var queryData = {}
                setTimeout(() => {
                  that.showTable = true
                }, 500);
                queryData.jobnumbers = that.xlTeam.xlbenKeJobnumber
                queryRoster(queryData).then(res=>{
                    that.popupTableData = res.obj
                    that.isLoading = false
                    that.pagePev() //获取的表格数据分组
                })
                break;
              case '大专':
                that.dataIndex = 0
                var queryData = {}
                setTimeout(() => {
                  that.showTable = true
                }, 500);
                queryData.jobnumbers = that.xlTeam.xldaZhuanJobnumber
                queryRoster(queryData).then(res=>{
                    that.popupTableData = res.obj
                    that.isLoading = false
                    that.pagePev() //获取的表格数据分组
                })
                break;
              case '小学':
                that.dataIndex = 0
                var queryData = {}
                setTimeout(() => {
                  that.showTable = true
                }, 500);
                queryData.jobnumbers = that.xlTeam.xlxiaoxueJobnumber
                queryRoster(queryData).then(res=>{
                    that.popupTableData = res.obj
                    that.isLoading = false
                    that.pagePev() //获取的表格数据分组
                })
                break;
              case '硕士及以上':
                that.dataIndex = 0
                var queryData = {}
                setTimeout(() => {
                  that.showTable = true
                }, 500);
                queryData.jobnumbers = that.xlTeam.xlshuoShiJobnumber
                queryRoster(queryData).then(res=>{
                    that.popupTableData = res.obj
                    that.isLoading = false
                    that.pagePev() //获取的表格数据分组
                })
                break;
              case 'MBA':
                that.dataIndex = 0
                var queryData = {}
                setTimeout(() => {
                  that.showTable = true
                }, 500);
                queryData.jobnumbers = that.xlTeam.xlmbajobnumber
                queryRoster(queryData).then(res=>{
                    that.popupTableData = res.obj
                    that.isLoading = false
                    that.pagePev() //获取的表格数据分组
                })
                break;
              case '博士':
                that.dataIndex = 0
                var queryData = {}
                setTimeout(() => {
                  that.showTable = true
                }, 500);
                queryData.jobnumbers = that.xlTeam.xlboShiJobnumber
                queryRoster(queryData).then(res=>{
                    that.popupTableData = res.obj
                    that.isLoading = false
                    that.pagePev() //获取的表格数据分组
                })
                break;
            
              default:
                break;
            }
          }
        });
　　},
    //按年龄
    initCharts2 () {
    　　let myChart = this.$echarts.init(this.$refs.chart2);
        let seriesLabel = {
            normal: {
                show: true,
                textBorderWidth: 2,
                position:'insideBottom',
                // formatter: `{c}人 {b}%`
                formatter:function(param){
                     return param.name+'\n'+'\n'+param.value
                }
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
                barWidth: 25,
                data: [
                        {name:this.ageTeam.age25Pct,value:this.ageTeam.age25Count,title:'25岁以下'},
                        {name:this.ageTeam.age25to35Pct,value:this.ageTeam.age25to35Count,title:'25-35岁'},
                        {name:this.ageTeam.age35to45Pct,value:this.ageTeam.age35to45Count,title:'35-45岁'},
                        {name:this.ageTeam.age45to50Pct,value:this.ageTeam.age45to50Count,title:'45-50岁'},
                        {name:this.ageTeam.age50Pct,value:this.ageTeam.age50Count,title:'50岁以上'},
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
        let that = this //改变this指向
        //点击事件
        myChart.on('click', function (params) {
            // console.log(params)
            switch (params.data.title) {
              case '25岁以下':
                that.dataIndex = 0
                var queryData = {}
                setTimeout(() => {
                  that.showTable = true
                }, 500);
                queryData.jobnumbers = that.ageTeam.age25Jobnumber
                queryRoster(queryData).then(res=>{
                    that.popupTableData = res.obj
                    that.isLoading = false
                    that.pagePev() //获取的表格数据分组
                })
                break;
              case '25-35岁':
                that.dataIndex = 0
                var queryData = {}
                setTimeout(() => {
                  that.showTable = true
                }, 500);
                queryData.jobnumbers = that.ageTeam.age25to35Jobnumber
                queryRoster(queryData).then(res=>{
                    that.popupTableData = res.obj
                    that.isLoading = false
                    that.pagePev() //获取的表格数据分组
                })
                break;
              case '35-45岁':
                that.dataIndex = 0
                var queryData = {}
                setTimeout(() => {
                  that.showTable = true
                }, 500);
                queryData.jobnumbers = that.ageTeam.age35to45Jobnumber
                queryRoster(queryData).then(res=>{
                    that.popupTableData = res.obj
                    that.isLoading = false
                    that.pagePev() //获取的表格数据分组
                })
                break;
              case '45-50岁':
                that.dataIndex = 0
                var queryData = {}
                setTimeout(() => {
                  that.showTable = true
                }, 500);
                queryData.jobnumbers = that.ageTeam.age45to50Jobnumber
                queryRoster(queryData).then(res=>{
                    that.popupTableData = res.obj
                    that.isLoading = false
                    that.pagePev() //获取的表格数据分组
                })
                break;
              case '50岁以上':
                that.dataIndex = 0
                var queryData = {}
                setTimeout(() => {
                  that.showTable = true
                }, 500);
                queryData.jobnumbers = that.ageTeam.age50Jobnumber
                queryRoster(queryData).then(res=>{
                    that.popupTableData = res.obj
                    that.isLoading = false
                    that.pagePev() //获取的表格数据分组
                })
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
            // tooltip: {
            //     trigger: 'item',
            //     formatter: '{a} <br/>{b}: {c} ({d}%)'
            // },
            legend: {
                orient: 'vertical',
                left: 10,
                data: ['男', '女']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '60%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: true,
                        position: 'inside',
                        formatter: '{b}：{d}%'
                        // formatter:function(param){
                        //     return param.name+'\n'+'\n'+param.value+'%'
                        // }
                    },
                    labelLine: {
                        show: true
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
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
        let that = this //改变this指向
        //点击事件
        myChart.on('click', function (params) {
            // window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
            switch (params.name) {
              case '男':
                that.dataIndex = 0
                var queryData = {}
                setTimeout(() => {
                  that.showTable = true
                }, 500);
                queryData.jobnumbers = that.sexTeam.manJobnumber
                queryRoster(queryData).then(res=>{
                    that.popupTableData = res.obj
                    that.isLoading = false
                    that.pagePev() //获取的表格数据分组
                })
                break;
              case '女':
                that.dataIndex = 0
                var queryData = {}
                setTimeout(() => {
                  that.showTable = true
                }, 500);
                queryData.jobnumbers = that.sexTeam.womanJobnumber
                queryRoster(queryData).then(res=>{
                    that.popupTableData = res.obj
                    that.isLoading = false
                    that.pagePev() //获取的表格数据分组
                })
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
        // 　　tooltip: {},
            legend:{
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
                    position:'outer',
                    alignTo:'edge',
                    margin:10,
                    formatter: '{c}人 {d}% \n\n',
                    padding: [0,0],
                    textStyle: {
                        color: "#f64971",
                        fontWeight: "700"
                    }
                  }
                },
                labelLine: {   //引导线设置
                    normal: {
                        show:true,       //引导线不显示
                        length:5 ,
                    },
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
        let that = this //改变this指向
        //点击事件
        myChart.on('click', function (params) {
            switch (params.name) {
              case '6个月及以下':
                that.dataIndex = 0
                var queryData = {}
                setTimeout(() => {
                  that.showTable = true
                }, 500);
                queryData.jobnumbers = that.jobAgeTeam.jobAge6mJobnumber
                queryRoster(queryData).then(res=>{
                    that.popupTableData = res.obj
                    that.isLoading = false
                    that.pagePev() //获取的表格数据分组
                })
                break;
              case '6个月至1年（含）':
                that.dataIndex = 0
                var queryData = {}
                setTimeout(() => {
                  that.showTable = true
                }, 500);
                queryData.jobnumbers = that.jobAgeTeam.jobAge6mTo1yJobnumber
                queryRoster(queryData).then(res=>{
                    that.popupTableData = res.obj
                    that.isLoading = false
                    that.pagePev() //获取的表格数据分组
                })
                break;
              case '1年至3年（含）':
                that.dataIndex = 0
                var queryData = {}
                setTimeout(() => {
                  that.showTable = true
                }, 500);
                queryData.jobnumbers = that.jobAgeTeam.jobAge1yTo3yJobnumber
                queryRoster(queryData).then(res=>{
                    that.popupTableData = res.obj
                    that.isLoading = false
                    that.pagePev() //获取的表格数据分组
                })
                break;
              case '3年以上':
                that.dataIndex = 0
                var queryData = {}
                setTimeout(() => {
                  that.showTable = true
                }, 500);
                queryData.jobnumbers = that.jobAgeTeam.jobAge3yJobnumber
                queryRoster(queryData).then(res=>{
                    that.popupTableData = res.obj
                    that.isLoading = false
                    that.pagePev() //获取的表格数据分组
                })
                break;
            
              default:
                break;
            }
        })
　　},
    //表格行点击事件
    rowClick(rowIndex, rowData, column){
        // console.log(rowData)
        //通过cloumn来判断点击的是哪个
        if(column.field=='deptCount'){
            this.dataIndex = 0
            this.showTable = true
            let queryData = {}
            queryData.jobnumbers = rowData.jobnumbers
            queryRoster(queryData).then(res=>{
                this.popupTableData = res.obj
                this.isLoading = false
                this.pagePev() //获取的表格数据分组
            })
        }
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
    selctdept(data) {
        // console.log(data)
        //截取部门
        let result = data.content.split( "-" )
        this.results = result[1]
        // console.log(result1)
        this.selectDeptContent = this.results
        this.selectDeptId = data.deptId
        this.selectDeptGrade = data.grade
    },
    // 岗位分类查看详情
    znClick(){
        this.showTable = true
        this.dataIndex = 0
        let queryData = {}
        queryData.jobnumbers = this.gwObj.gwzhinengJobnumber
        queryRoster(queryData).then(res=>{
            this.popupTableData = res.obj
            this.isLoading = false
            this.pagePev() //获取的表格数据分组
        })
    },
    jsClick(){
        this.showTable = true
        this.dataIndex = 0
        let queryData = {}
        queryData.jobnumbers = this.gwObj.gwjiShuJobnumber
        queryRoster(queryData).then(res=>{
            this.popupTableData = res.obj
            this.isLoading = false
            this.pagePev() //获取的表格数据分组
        })
    },
    yxClick(){
        this.showTable = true
        this.dataIndex = 0
        let queryData = {}
        queryData.jobnumbers = this.gwObj.gwyingXiaoJobnumber
        queryRoster(queryData).then(res=>{
            this.popupTableData = res.obj
            this.isLoading = false
            this.pagePev() //获取的表格数据分组
            // console.log(this.$refs.pop_table)
        })
    },
    zjClick(){
        this.showTable = true
        this.dataIndex = 0
        let queryData = {}
        queryData.jobnumbers = this.gwObj.gwzhiJieJobnumber
        queryRoster(queryData).then(res=>{
            this.popupTableData = res.obj
            this.isLoading = false
            this.pagePev() //获取的表格数据分组
        })
    },
    //查询
    search(){
        let queryData = {
            jobnumber:localStorage.getItem('jobNum'),
            flag:2,
            content:this.results,
            deptId:this.selectDeptId,
            grade:this.selectDeptGrade,
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
        //查询按司龄
        queryJobAgeTeam(queryData).then(res=>{
            this.jobAgeTeam = res.obj
            this.initCharts4()
        })
        //查询部门详细
        queryDeptDetailTeam(queryData).then(res=>{
            this.deptName = res.obj
            this.tableData = res.obj.details
            this.columns = [
                {field: 'highDeptName', title:this.deptName.highDeptTitle, width: 150, titleAlign: 'center',columnAlign:'center', isFrozen: false,isResize:true},
                {field: 'deptName', title:this.deptName.lowDeptTitle, width: 150, titleAlign: 'center',columnAlign:'center', isFrozen: false,isResize:true},
                {field: 'deptCount', title: '在编人数', width: 100, titleAlign: 'center',columnAlign:'center', isFrozen: false,isResize:true},
            ]
        })
    },
    //重置
    reset(){
        this.selectTime = ''
        this.$refs.dept_content.restFlag = true
        this.$refs.dept_content.selectedDepartment = ''
    },
    //表格中盒子的滚动事件
    scrool(){
        let scrollHeight = this.$refs.pop_table.$el.children[0].children[1].scrollHeight
        let clientHeight = this.$refs.pop_table.$el.children[0].children[1].clientHeight
        let scrollTop = this.$refs.pop_table.$el.children[0].children[1].scrollTop
        if (scrollHeight - clientHeight == scrollTop) {
            //滚动条滚到最底部
            console.log("滚到了最底部");
            // this.dataIndex++ //点击+1
            // if(this.dataIndex >= this.fenyeData.length){
            //     Notify({ type: "warning", message: "没有更多数据了哦~" });
            // }else{
            //     this.tableData = this.tableData.concat(this.fenyeData[this.dataIndex])
            // }
        }
    },
    ceshi(){
        // console.log(this.$refs.pop_table)
        // console.log(this.$refs.pop_table.$el.children[0].children[1].scrollTop)
        // console.log(this.$refs.pop_table.$el.children[0].children[1].scrollHeight)
    },
    //vuex
    ...mapMutations({
        arr_flag:'arr_flag',
        save_jobNum:'save_jobNum',
        from_page:'from_page',
    }),
  },
  mounted(){
    // this.$refs.pop_table.$el.children[0].children[1].addEventListener('scroll', this.scrool)
　},
watch:{
    '$store.state.arrflag': function (newVal,oldVal) {
    // console.log(this.$store.state.arrflag)
        if(this.$store.state.arrflag == 1 || this.$store.state.arrflag == 2){
            const myChart = this.$echarts.init(document.getElementById('chart'))
            const myChart1 = this.$echarts.init(document.getElementById('chart1'))
            const myChart2 = this.$echarts.init(document.getElementById('chart2'))
            const myChart3 = this.$echarts.init(document.getElementById('chart3'))
            const myChart4 = this.$echarts.init(document.getElementById('chart4'))
            myChart.resize()
            myChart1.resize()
            myChart2.resize()
            myChart3.resize()
            myChart4.resize()
            //查询部门详细
            this.columns = [
                {field: 'highDeptName', title:this.deptName.highDeptTitle, width: 150, titleAlign: 'center',columnAlign:'center', isFrozen: false,isResize:true},
                {field: 'deptName', title:this.deptName.lowDeptTitle, width: 150, titleAlign: 'center',columnAlign:'center', isFrozen: false,isResize:true},
                {field: 'deptCount', title: '在编人数', width: 100, titleAlign: 'center',columnAlign:'center', isFrozen: false,isResize:true},
            ]
        }
    },
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
        .btn{
            padding 5px
            line-height 35px
            text-align center
        }
    }
    .total{
        // margin 0 10px 0 10px
        // border-radius 8px
        height 60px
        line-height 30px
        background-color #dfe6e7
        text-align center
        p:nth-child(1){
            font-weight 700
            color #4f8fa0
            font-size 16px
        }
        p:nth-child(2){
            font-weight 700
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
            box-shadow 0 2px 3px -1px #eee
            margin-bottom 8px
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
            height 500px
            background-color #f6f6f8
            .pie{
                width 100%
                height 100%
            }
        }
        .ages{
            height 350px
            background-color #f6f6f8
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
    .table{
        width 100%
        overflow-x auto
    }
    .more{
        font-size 14px
        padding 10px
    }
</style>