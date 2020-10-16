<template>
    <div>
        <div class="tiaojian">
          <van-field v-model="selectYear" label="选择年：" placeholder="请选择" @click-input="showyear=true" readonly/>
          <div class="btns">
              <van-button type="primary" size="small" color="#fc5f10" @click="search" style="width:45%;font-size:15px">查询</van-button>
              <!-- <van-button type="primary" size="small" color="#fc5f10" @click="reset" style="width:45%;font-size:15px">重置</van-button> -->
              <!-- <van-button type="primary" size="small" color="#fc5f10" @click="ceshi" style="font-size:15px">测试</van-button> -->
          </div>
          <div class="title">
              <p>
                <span>累计指标计划</span>
                <span>（<span style="color:red">单位：万</span>）</span>
              </p>
              <!-- 累计指标计划表格 -->
              <div class="table">
                <v-table 
                ref="table"
                :height="400" 
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
        {name:'北美事业部',danwei:'万元',zhibiao:'419990',quannian:'990',jihua:'3556',shiji:'4300'},
        {name:'北美事业部',danwei:'万元',zhibiao:'419990',quannian:'990',jihua:'3556',shiji:'4300'},
        {name:'北美事业部',danwei:'万元',zhibiao:'419990',quannian:'990',jihua:'3556',shiji:'4300'},
        {name:'北美事业部',danwei:'万元',zhibiao:'419990',quannian:'990',jihua:'3556',shiji:'4300'}
      ],
      columns1:[
        {field: 'name', title: '部门名称', width: 150, titleAlign: 'center',columnAlign:'center'},
        {field: 'danwei', title: '单位', width: 150, titleAlign: 'center',columnAlign:'center'},
        {field: 'zhibiao', title: '收入指标', width: 150, titleAlign: 'center',columnAlign:'center',
        formatter: function (rowData,rowIndex,pagingIndex,field) {
            return `<span class='cell-edit-color-a'>${rowData[field]}</span>`;
        },
        },
        {field: 'quannian', title: '全年定编', width: 150, titleAlign: 'center',columnAlign:'center',
        formatter: function (rowData,rowIndex,pagingIndex,field) {
            return `<span class='cell-edit-color-b'>${rowData[field]}</span>`;
        },
        },
        {field: 'jihua', title: '计划人数', width: 150, titleAlign: 'center',columnAlign:'center',
        formatter: function (rowData,rowIndex,pagingIndex,field) {
            return `<span class='cell-edit-color-c'>${rowData[field]}</span>`;
        },
        },
        {field: 'shiji', title: '实际人数', width: 150, titleAlign: 'center',columnAlign:'center',
        formatter: function (rowData,rowIndex,pagingIndex,field) {
            return `<span class='cell-edit-color-d'>${rowData[field]}</span>`;
        },
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
      if (rowIndex % 2 == 0){
          return 'column-cell-class-name-test';
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
    //重置查询
    reset(){},
    ...mapMutations({
      save_type:'save_type',
      arr_flag:'arr_flag'
    })
  },
  mounted(){
    // const departRes =  JSON.parse(localStorage.getItem('departRes'))
  },
  watch:{
    '$store.state.arrflag': function (newVal,oldVal) {
        // console.log(this.$store.state.arrflag)
        if(this.tableData == null){
          if(this.$store.state.arrflag == 1 || this.$store.state.arrflag == 2){
            const myChart = this.$echarts.init(document.getElementById('chart'))
            myChart.resize()
          }
        }else{
          if(this.$store.state.arrflag == 1 || this.$store.state.arrflag == 2){
            const myChart = this.$echarts.init(document.getElementById('chart'))
            const myChart1 = this.$echarts.init(document.getElementById('chart1'))
            myChart.resize()
            myChart1.resize()
          }
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
      color:#8cc8d5;
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
    .title{
        p{
            height 30px
            line-height 30px
            background-color #67bac9
            text-align center
            font-size 15px
        }
        span{
            font-weight 700
        }
        .table{
            width 100%
            overflow-x auto
        }
    }
  }
</style>