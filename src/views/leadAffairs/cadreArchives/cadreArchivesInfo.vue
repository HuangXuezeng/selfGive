<template>
  <div>
    <div>
      <van-tabs v-model="active" scrollspy sticky type="card">
        <van-tab title="个人信息">
          <van-card
            :desc="basicInfo.deptName ? basicInfo.deptName : '' "
            :thumb="basicInfo.photo ? basicInfo.photo : defaultAvatar"
          >
            <template #tags>
              <van-tag plain type="danger" v-if="basicInfo.a01136">{{
                basicInfo.a01136
              }}</van-tag>
              <van-tag plain type="danger">{{ basicInfo.a01504 }}</van-tag>
              <van-tag plain type="danger">{{ basicInfo.a01516 }}</van-tag>
              <van-tag plain type="danger">{{ basicInfo.nowPost }}</van-tag>
            </template>
            <template #title>
              <!-- <van-tag plain type="danger">青苗</van-tag> -->
              <div style="font-size: 20px;font-weight: 700;">
                {{ basicInfo.a0101 }}
              </div>
            </template>
          </van-card>
          <van-row type="flex" justify="center">
            <van-col span="12">
              <van-cell-group class="resetVant">
                <van-cell
                  title="员工工号:"
                  :value="basicInfo.a0190 ? basicInfo.a0190 : '无'"
                  center
                />
                <van-cell
                  title="籍贯:"
                  :value="basicInfo.a01740 ? basicInfo.a01740 : '无'"
                  center
                />
                <van-cell
                  title="性别:"
                  :value="basicInfo.a0107 ? basicInfo.a0107 : '无'"
                  center
                />
                <van-cell
                  title="出生日期:"
                  :value="basicInfo.a0111 ? basicInfo.a0111 : '无'"
                  center
                />
                <van-cell
                  title="政治面貌:"
                  :value="basicInfo.a01577 ? basicInfo.a01577 : '无'"
                  center
                />
                <van-cell
                  title="婚姻状况:"
                  :value="basicInfo.a0127 ? basicInfo.a0127 : '无'"
                  center
                />
                <van-cell
                  title="毕业院校:"
                  :value="basicInfo.a011901 ? basicInfo.a011901 : '无'"
                  center
                />
                <van-cell
                  title="专业:"
                  :value="basicInfo.a011971 ? basicInfo.a011971 : '无'"
                  center
                />
                <van-cell
                  title="最高学历:"
                  :value="basicInfo.a01504 ? basicInfo.a01504 : '无'"
                  center
                />
                <van-cell
                  title="现岗位:"
                  :value="basicInfo.nowPost ? basicInfo.nowPost : '无'"
                  center
                />
                <van-cell
                  title="职级:"
                  :value="basicInfo.a01516 ? basicInfo.a01516 : '无'"
                  center
                />
                <van-cell
                  title="入司日期:"
                  :value="basicInfo.a0144 ? basicInfo.a0144 : '无'"
                  center
                />
                <van-cell
                  title="司龄:"
                  :value="basicInfo.a0122 ? basicInfo.a0122+'年' : '无'"
                  center
                />
                <van-cell
                  title="社会工龄:"
                  :value="basicInfo.a01122 ? basicInfo.a01122+'年' : '无'"
                  center
                />
                <van-cell
                  title="当前岗位工龄:"
                  :value="basicInfo.a01140 ? basicInfo.a01140+'年' : '无'"
                  center
                />
                <van-cell
                  title="晋升经理时间:"
                  :value="basicInfo.a01519 ? basicInfo.a01519 : '无'"
                  center
                />
                <van-cell
                  title="晋升总监时间:"
                  :value="basicInfo.a01518 ? basicInfo.a01518 : '无'"
                  center
                />
              </van-cell-group>
            </van-col>
            <van-col span="12">
              <van-cell-group class="resetVant">
                <van-cell
                  title="首次晋升经理红文编号:"
                  :value="basicInfo.a01226 ? basicInfo.a01226 : '无'"
                  center
                />
                <van-cell
                  title="首次晋升总监红文编号:"
                  :value="basicInfo.a01225 ? basicInfo.a01225 : '无'"
                  center
                />

                <van-cell
                  title="成熟度:"
                  :value="basicInfo.a01224 ? basicInfo.a01224 : '无'"
                  center
                />
                <van-cell
                  title="高潜人才池:"
                  :value="basicInfo.a01223 ? basicInfo.a01223 : '无'"
                  center
                />
                <van-cell
                  title="英语是否可做工作语言:"
                  :value="basicInfo.a01003 ? basicInfo.a01003 : '无'"
                  center
                />
                <van-cell
                  title="参与变革项目:"
                  :value="basicInfo.a01138 ? basicInfo.a01138 : '无'"
                  center
                />
                <van-cell
                  title="参与经营稽查:"
                  :value="basicInfo.a01139 ? basicInfo.a01139 : '无'"
                  center
                />
                <van-cell
                  title="机构路径:"
                  :value="basicInfo.jglj ? basicInfo.jglj : '无'"
                  center
                />
                <van-cell
                  title="几年陈:"
                  :value="basicInfo.jnc ? basicInfo.jnc : '无'"
                  center
                />
                <van-cell
                  title="90后干部:"
                  :value="basicInfo.a01141 ? basicInfo.a01141 : '无'"
                  center
                />
                <van-cell
                  title="九宫格位置:"
                  :value="basicInfo.jiuGZ ? basicInfo.jiuGZ : '无'"
                  center
                />

                <van-cell
                  title="综合评价（绩效）:"
                  :value="basicInfo.jx ? basicInfo.jx : '无'"
                  center
                />
                <van-cell
                  title="综合评价（能力）:"
                  :value="basicInfo.nl ? basicInfo.nl : '无'"
                  center
                />
              </van-cell-group>
            </van-col> </van-row
        ></van-tab>
        <van-tab title="社会履历">
          <div>
            <van-row type="flex" justify="center">
              <van-col span="12">
                <div style="font-size: 20px;font-weight: 700;;margin-top:20px">
                  社会主要工作履历
                </div></van-col
              >
            </van-row>
             <div v-if="socialList.length == 0">
            <van-empty
              class="custom-image"
              image="https://img.yzcdn.cn/vant/custom-empty-image.png"
              description="暂无数据"
            />
          </div>
            <div class="contentbox" v-if="socialList.length != 0">
              <van-collapse
                v-model="activeNames"
                v-for="(item, index) in socialList"
                :key="item.recordid"
              >
                <van-collapse-item :name="index">
                  <template #title>
                    <div class="fontweig">
                      <van-tag mark type="primary" color="#fc5f10"
                        >社会履历{{ index + 1 }}</van-tag
                      >
                    </div>
                  </template>
                  <p>
                    <span>开始时间：{{ item.startTime }}</span>
                  </p>
                  <p>
                    <span>结束时间：{{ item.endTime }}</span>
                  </p>
                  <p>
                    <span>工作单位：{{ item.workUnit }}</span>
                  </p>
                  <p>
                    <span>任职部门：{{ item.department }}</span>
                  </p>
                  <p>
                    <span>任职岗位：{{ item.station }}</span>
                  </p>
                  <p>
                    <span>证明人及联系方式：{{ item.witness }}</span>
                  </p>
                  <p>
                    <span>备注：{{ item.remarks }}</span>
                  </p>
                  <p>
                    <span>工作描述：{{ item.description }}</span>
                  </p>
                  <!-- <p><span>离职证明：<a :href="item.filePath">离职证明</a></span></p> -->
                  <p>
                    <span
                      >离职证明：<span
                        style="border-bottom:1px solid #ccc;padding:2px"
                        >{{ item.pathName }}</span
                      ></span
                    >
                  </p>
                </van-collapse-item>
              </van-collapse>
            </div>
          </div>
        </van-tab>
        <van-tab title="关键事件">
          <van-row type="flex" justify="center">
            <van-col span="6">
              <div style="font-size: 20px;font-weight: 700;margin-top:20px">
                关键事件
              </div></van-col
            >
          </van-row>
          <div v-if="KeyEvents.length == 0">
            <van-empty
              class="custom-image"
              image="https://img.yzcdn.cn/vant/custom-empty-image.png"
              description="暂无数据"
            />
          </div>
          <div class="contentbox" v-if="KeyEvents.length != 0">
            <van-collapse
              v-model="KeyEventsActiveNames"
              v-for="(item, index) in KeyEvents"
              :key="item.recordid"
            >
              <van-collapse-item :name="index">
                <template #title>
                  <div class="fontweig">
                    <van-tag mark type="primary" color="#fc5f10"
                      >关键事件{{ index + 1 }}</van-tag
                    >
                  </div>
                </template>
                <p>
                  <span>日期：{{ item.A813005 }}</span>
                </p>
                <p>
                  <span>事件类型：{{ item.a813006 }}</span>
                </p>
                <p>
                  <span>事件内涵：{{ item.a813007 }}</span>
                </p>
                <p>
                  <span>事件描述：{{ item.a813008 }}</span>
                </p>
                <p>
                  <span>事件评价：{{ item.a813009 }}</span>
                </p>
                <p>
                  <span>奖惩结果：{{ item.a813010 }}</span>
                </p>
                <p>
                  <span>红头文件：{{ item.a813011 }}</span>
                </p>
              </van-collapse-item>
            </van-collapse>
          </div>
        </van-tab>
        <van-tab title="个人能力">
          <van-row type="flex" justify="center">
            <van-col span="6">
              <div style="font-size: 20px;font-weight: 700;margin-top:20px">
                个人能力
              </div></van-col
            >
          </van-row>
          <div style="width:100%;height:400px">
            <div ref="ppt" :style="{ width: '100%', height: '400px' }"></div>
          </div>
        </van-tab>
        <van-tab title="项目经历">
          <van-row type="flex" justify="center">
            <van-col span="6">
              <div style="font-size: 20px;font-weight: 700;margin-top:20px">
                项目经历
              </div></van-col
            >
          </van-row>
          <div v-if="listProject.length == 0">
            <van-empty
              class="custom-image"
              image="https://img.yzcdn.cn/vant/custom-empty-image.png"
              description="暂无数据"
            />
          </div>
          <div class="contentbox" v-if="listProject.length != 0">
            <van-collapse
              v-model="listProjectActiveNames"
              v-for="(item, index) in listProject"
              :key="item.recordid"
            >
              <van-collapse-item :name="index">
                <template #title>
                  <div class="fontweig">
                    <van-tag mark type="primary" color="#fc5f10"
                      >项目经历{{ index + 1 }}</van-tag
                    >
                  </div>
                </template>
                <p>
                  <span>项目名称:{{ item.projectName }}</span>
                </p>
                <p>
                  <span>进入项目时间:{{ item.startTime }}</span>
                </p>
                <p>
                  <span>退出项目时间:{{ item.endTime }}</span>
                </p>
                <p>
                  <span>投入精力占比:{{ item.trjlzb }}</span>
                </p>
                <p>
                  <span>任职类型:{{ item.jobType }}</span>
                </p>
                <p>
                  <span>项目角色:{{ item.projectRole }}</span>
                </p>
                <p>
                  <span>项目性质:{{ item.projectProp }}</span>
                </p>
                <p>
                  <span>项目成果:{{ item.projectResult }}</span>
                </p>
              </van-collapse-item>
            </van-collapse>
          </div>
        </van-tab>
        <van-tab title="职业倾向">
          <van-row type="flex" justify="center">
            <van-col span="6">
              <div style="font-size: 20px;font-weight: 700;margin-top:20px">
                职业倾向
              </div>
            </van-col>
          </van-row>
          <van-cell
            v-if="basicInfo.a01230"
            title="职业倾向:"
            :value="basicInfo.a01230 "
            center
          />
           <div v-if="!basicInfo.a01230">
            <van-empty
              class="custom-image"
              image="https://img.yzcdn.cn/vant/custom-empty-image.png"
              description="暂无数据"
            />
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
// import cadArcTanbber from "@/components/cadArcComponents/cadArcTanbber.vue";
import {
  Toast,
  Cell,
  CellGroup,
  Col,
  Row,
  Card,
  Collapse,
  CollapseItem,
  Tag,
  Tab,
  Tabs
} from "vant";
import {
  findCadreBasicInfo,
  lsitWorkInfoByJobnumber,
  findCadreKeyEvents,
  listProjectByJobnumber
} from "@/views/leadAffairs/cadreArchives/cadreArchivesApi.js";
export default {
  components: {},
  data() {
    return {
      socialList: [],
      activeNames: [],
      active: 0,
      KeyEvents: [],
      KeyEventsActiveNames: [],
      listProject: [],
      listProjectActiveNames: [],
      basicInfo: {},
      defaultAvatar: "src/assets/timg.jpg",
      manageitem:{},
      itemjobnumber:''
    };
  },
  created() {
    this.manageitem = this.$route.params.managerInfo
    this.itemjobnumber = this.manageitem.a0190
    this.querylsitWorkInfoByJobnumber();
    this.queryfindCadreKeyEvents();
    this.queryProjectByJobnumber();
    this.queryFindCadreBasicInfo();

  },
  mounted() {
    this.echatsMethod();
  },
  methods: {
    //项目经历
    querylsitWorkInfoByJobnumber(data) {
      lsitWorkInfoByJobnumber({ jobnumber: this.itemjobnumber }).then(res => {
        this.socialList = res.obj;
        for( let i =0;i<= this.socialList.length; i++){
          this.activeNames.push(i)
        }
      });
    },
    //关键事件
    queryfindCadreKeyEvents(data) {
      findCadreKeyEvents({ jobnumber: this.itemjobnumber }).then(res => {
        this.KeyEvents = res.obj;
        for( let i =0;i<= this.KeyEvents.length; i++){
          this.KeyEventsActiveNames.push(i)
        }
      });
    },
    //社会经历
    queryProjectByJobnumber() {
      listProjectByJobnumber({ jobnumber: this.itemjobnumber }).then(res => {
        this.listProject = res.obj;
        for(let i =0;i<= this.listProject.length; i++){
          this.listProjectActiveNames.push(i)
        }
      });
    },
    //查询个人明细
    queryFindCadreBasicInfo() {
      findCadreBasicInfo({ jobnumber: this.itemjobnumber }).then(res => {
        this.basicInfo = res.obj;
        for (let key in this.basicInfo) {
          if (
            key == "a0111" ||
            key == "a0144" ||
            key == "a01519" ||
            key == "a01518"
          ) {
            if (this.basicInfo[key] && this.basicInfo[key] != "null") {
              this.basicInfo[key] = this.formatTime(this.basicInfo[key]);
            }
          }
        }
      });
    },
    echatsMethod() {
      var myChart = this.$echarts.init(this.$refs.ppt);
      myChart.setOption({
        tooltip: {
          trigger: "axis"
        },
        radar: [
          {
            indicator: [
              { text: "坦诚正直", max: 100 },
              { text: "事业激情", max: 100 },
              { text: "团队领导", max: 100 },
              { text: "团结协作", max: 100 },
              { text: "战略决策", max: 100 },
              { text: "推动变革", max: 100 },
              { text: "用户中心", max: 100 },
              { text: "业绩导向", max: 100 },
            ],
            center: ["50%", "50%"],
            radius: 80
          }
        ],
        series: [
          {
            type: "radar",
            tooltip: {
              trigger: "item"
            },
            areaStyle: {},
            data: [
              {
                value: [60, 73, 85, 40, 30,30,20,80],
                name: "个人能力"
              }
            ]
          }
        ]
      });
    },
    //时间格式转化
    formatTime(time) {
      var date = new Date(time);
      let string = "";
      let year = date.getFullYear();
      let mouth = date.getMonth() + 1;
      let day = date.getDate();
      return (string = year + "-" + mouth + "-" + day);
    }
  }
};
</script>

<style lang="stylus" scoped>
.contentbox {
  line-height: 27px;
  width: 90%;
  margin: 10px auto 0 auto;
  padding: 5px 0 5px 0;
  padding-left: 5px;
  box-shadow: 0px 8px 10px #eee;
  border-radius: 6px;

  .van-tag--mark {
    padding-right: 1.7em;
    line-height: 15px;
  }

  p {
    padding: 5px 0 5px 5px;
    border-bottom: 1px solid #eee;
  }

  .iconfont {
    color: #ee0a24;
  }

  .btn {
    padding: 10px;
  }
}

.anchor {
  position: fixed;
  top: 50%;
  right: 0;
  color: red;
  width: 50px;
  background-color: #ccc;
  line-height: 40px;
  border-radius: 5px;
}
</style>
