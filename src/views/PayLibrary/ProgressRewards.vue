<template>
  <div>
    <!-- <van-row type="flex" justify="center">
      <van-col >
        <h2>奖励发放进度</h2>
      </van-col>
     </van-row> -->
    <van-dropdown-menu>
      <van-dropdown-item v-model="years" :options="yearList" />
      <!-- <van-dropdown-item v-model="value2" :options="option2" /> -->
    </van-dropdown-menu>
    <van-row type="flex">
      <van-col span="24">
        <van-field
          readonly
          clickable
          label="部门/组织"
          :value="selectedOrg"
          placeholder="请选择部门/组织"
          @click="showPicker = true"/>
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          /> </van-popup
      ></van-col>
    </van-row>
    <div style="width:100%;height:400px">
      <div ref="ppt" :style="{ width: '100%', height: '400px' }"></div>
    </div>
    <payTab></payTab>
  </div>
</template>

<script>
import { Picker, Toast, DropdownMenu, DropdownItem } from "vant";
import payTab from "@/components/PayLibrary/pay-tab.vue";
import { findRewardInfo } from "@/views/PayLibrary/PayLibrary.js";
export default {
  components: {
    payTab
  },
  data() {
    return {
      selectedOrg: "",
      showPicker: false,
      columns: [],
      yearList: [],
      years: ""
    };
  },
  created() {
    this.queryfindRewardInfo();
  },
  mounted() {},
  methods: {
    onConfirm(value) {
      if (value[0]) {
        this.selectedOrg = value;
        this.showPicker = false;
      } else {
        this.selectedOrg = value.text;
        this.showPicker = false;
      }
    },
    queryfindRewardInfo() {
      // return
      findRewardInfo({ jobnumber: "6006212", flag: "1" }).then(res => {
        if (res.code == 1000) {
          this.setcolumns(res);
          this.setyearlist(res.obj.year);
          this.selectedOrg = res.obj.title;
          this.echatsMethod(res);
        } else {
          Toast.fail(res.msg);
        }
      });
    },
    setyearlist(arr) {
      for (let p in arr) {
        let obj = {
          text: arr[p] + "年",
          value: arr[p]
        };
        this.yearList.push(obj);
      }
      this.years = this.yearList[0].value;
    },
    setcolumns(res) {
      if (res.obj.title == "股份整体") {
        this.setdepts(res, 1);
        res.obj.depts.unshift({ text: "", children: [{ text: "" }] });
        let overall = [
          {
            text: "股份整体",
            children: res.obj.depts
          }
        ];
        this.columns = overall;
      } else {
        this.setdepts(res, 2);
        this.columns = res.obj.depts;
      }
    },
    setdepts(res, num) {
      let depts = res.obj.depts;
      for (let i in depts) {
        depts[i].text = depts[i].deptName;
        if (depts[i].downDept != null) {
          for (let k in depts[i].downDept) {
            depts[i].downDept[k].text = depts[i].downDept[k].downDeptName;
          }
          depts[i].children = depts[i].downDept;
        } else {
          if (num == 1) {
            depts[i].children = [{ text: "" }];
          }
        }
      }
    },
    echatsMethod(res) {
      var myChart = this.$echarts.init(this.$refs.ppt);
      let data = res.obj.send;
      // "one": 667691.53,
      //       "two": 1724617.86,
      //       "three": 891015.99,
      //       "four": 2376718.24,
      //       "five": 415108.37,
      //       "six": 2078741.99,
      //       "seven": 589721.68,
      //       "eight": null,
      //       "nine": null,
      //       "ten": null,
      //       "eleven": null,
      //       "twelve": null,
      let mouth = [
        data.one,
        data.two,
        data.two,
        data.three,
        data.four,
        data.five,
        data.six,
        data.seven,
        data.eight,
        data.nine,
        data.ten,
        data.eleven,
        data.twelve
      ];
      let mouthTotal = [
        data.oneTotal,
        data.twoTotal,
        data.threeTotal,
        data.fourTotal,
        data.fiveTotal,
        data.sixTotal,
        data.sevenTotal,
        data.eigthTotal,
        data.nineTotal,
        data.tenTotal,
        data.elevenTotal,
        data.twelveTotal
      ];
      myChart.setOption(
        //   {
        //   xAxis: {
        //     type: "category",
        //     data: [
        //       "一月",
        //       "二月",
        //       "三月",
        //       "四月",
        //       "五月",
        //       "六月",
        //       "七月",
        //       "八月",
        //       "九月",
        //       "十月",
        //       "十一月",
        //       "十二月",
        //     ]
        //   },
        //   yAxis: {
        //     type: "value"
        //   },
        //   series: [
        //     {
        //       data: mouth,
        //       type: "bar",
        //       showBackground: false,
        //       backgroundStyle: {
        //         color: "rgba(220, 220, 220, 0.8)"
        //       }
        //     },
        //     {
        //       data: mouthTotal,
        //       type: "bar",
        //       showBackground: false,
        //       backgroundStyle: {
        //         color: "rgba(220, 220, 220, 0.8)"
        //       }
        //     }
        //   ]
        // }
        {
          title: {
            text: "某地区蒸发量和降水量",
            subtext: "纯属虚构"
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: ["蒸发量", "降水量"]
          },
          toolbox: {
            show: true,
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ["line", "bar"] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          calculable: true,
          xAxis: [
            {
              type: "category",
              data: [
                "1月",
                "2月",
                "3月",
                "4月",
                "5月",
                "6月",
                "7月",
                "8月",
                "9月",
                "10月",
                "11月",
                "12月"
              ]
            }
          ],
          yAxis: [
            {
              type: "value",
              data:[500000,1000000,1500000,2000000,2500000]
            }
          ],
          series: [
            {
              name: "使用量",
              type: "bar",
              data: mouth,
              markPoint: {
                data: [
                  { type: "max", name: "最大值" },
                  { type: "min", name: "最小值" }
                ]
              },
              // markLine: {
              //   data: [{ type: "average", name: "平均值" }]
              // }
            },
            {
              name: "奖励总量",
              type: "bar",
              data: mouthTotal,
              // markPoint: {
              //   data: [
              //     { name: "年最高", value: 182.2, xAxis: 7, yAxis: 183 },
              //     { name: "年最低", value: 2.3, xAxis: 11, yAxis: 3 }
              //   ]
              // },
              // markLine: {
              //   data: [{ type: "average", name: "平均值" }]
              // }
            }
          ]
        }
      );
    }
  }
};
</script>

<style>
</style>
