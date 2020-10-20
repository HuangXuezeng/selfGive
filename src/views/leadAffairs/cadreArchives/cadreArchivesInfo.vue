<template>
  <div>
    <div>
      <van-tabs v-model="active" scrollspy sticky type="card">
        <van-tab title="基本信息">
          <van-card
            :desc="basicInfo.deptName ? basicInfo.deptName : ''"
            :thumb="basicInfo.photo != null ? basicInfo.photo : defaultAvatar"
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
                  :value="basicInfo.a0122 ? basicInfo.a0122 + '年' : '无'"
                  center
                />
                <van-cell
                  title="社会工龄:"
                  :value="basicInfo.a01122 ? basicInfo.a01122 + '年' : '无'"
                  center
                />
                <van-cell
                  title="当前岗位工龄:"
                  :value="basicInfo.a01140 ? basicInfo.a01140 + '年' : '无'"
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
        <van-tab title="工作经历">
          <div>
            <van-row type="flex" justify="center">
              <van-col>
                <div style="font-size: 20px;font-weight: 700;;margin-top:20px">
                  顾家工作履历
                </div></van-col
              >
            </van-row>
            <!-- <div v-if="KukaWorkList.length == 0">
              <van-empty
                class="custom-image"
                image="https://img.yzcdn.cn/vant/custom-empty-image.png"
                description="暂无数据"
              />
            </div> -->
             <noData :showNodata='KukaWorkList.length == 0'></noData>
            <div class="contentbox" v-if="KukaWorkList.length != 0">
              <van-collapse
                v-model="KukaWorkListActname"
                v-for="(item, index) in KukaWorkList"
                :key="item.id"
              >
                <van-collapse-item :name="index">
                  <template #title>
                    <div class="fontweig">
                      <van-tag mark type="primary" color="#fc5f10"
                        >顾家履历{{ index + 1 }}</van-tag
                      >
                    </div>
                  </template>
                  <p>
                    <span>组织机构：{{ item.organ }}</span>
                  </p>
                  <p>
                    <span>岗位：{{ item.station }}</span>
                  </p>
                  <p>
                    <span>异动类型：{{ item.type }}</span>
                  </p>
                  <p>
                    <span>起止年月：{{ item.startTime }}</span>
                  </p>
                  <p>
                    <span>主要职责：{{ item.mainWork }}</span>
                  </p>
                </van-collapse-item>
              </van-collapse>
            </div>
          </div>
          <div>
            <van-row type="flex" justify="center">
              <van-col>
                <div style="font-size: 20px;font-weight: 700;;margin-top:20px">
                  社会主要工作履历
                </div></van-col
              >
            </van-row>
            <!-- <div v-if="socialList.length == 0">
              <van-empty
                class="custom-image"
                image="https://img.yzcdn.cn/vant/custom-empty-image.png"
                description="暂无数据"
              />
            </div> -->
             <noData :showNodata='socialList.length == 0'></noData>
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
                    <span>公司：{{ item.workUnit }}</span>
                  </p>
                  <p>
                    <span>任职岗位：{{ item.station }}</span>
                  </p>
                  <p>
                    <span>开始日期：{{ item.startTime }}</span>
                  </p>
                  <p>
                    <span>截止日期：{{ item.endTime }}</span>
                  </p>
                  <!-- <p>
                    <span>任职部门：{{ item.department }}</span>
                  </p>

                  <p>
                    <span>证明人及联系方式：{{ item.witness }}</span>
                  </p>
                  <p>
                    <span>备注：{{ item.remarks }}</span>
                  </p> -->
                  <p>
                    <span>主要描述：{{ item.description }}</span>
                  </p>
                  <!-- <p><span>离职证明：<a :href="item.filePath">离职证明</a></span></p> -->
                  <!-- <p>
                    <span
                      >离职证明：<span
                        style="border-bottom:1px solid #ccc;padding:2px"
                        >{{ item.pathName }}</span
                      ></span
                    >
                  </p> -->
                </van-collapse-item>
              </van-collapse>
            </div>
          </div>
        </van-tab>
        <van-tab title="绩效">
          <van-row type="flex" justify="center">
            <van-col>
              <div style="font-size: 20px;font-weight: 700;;margin-top:20px">
                绩效
              </div></van-col
            >
          </van-row>
          <!-- <div>
            <van-empty
              class="custom-image"
              image="https://img.yzcdn.cn/vant/custom-empty-image.png"
              description="暂无数据"
            />
          </div> -->
          <noData :showNodata='true'></noData>
        </van-tab>
        <van-tab title="关键事件">
          <van-row type="flex" justify="center">
            <van-col>
              <div style="font-size: 20px;font-weight: 700;margin-top:20px">
                关键事件
              </div></van-col
            >
          </van-row>
          <!-- <div v-if="KeyEvents.length == 0">
            <van-empty
              class="custom-image"
              image="https://img.yzcdn.cn/vant/custom-empty-image.png"
              description="暂无数据"
            />
          </div> -->
          <noData :showNodata='KeyEvents.length == 0'></noData>
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
        <van-tab title="能力">
          <van-row type="flex" justify="center">
            <van-col>
              <div style="font-size: 20px;font-weight: 700;margin-top:20px">
                个人能力
              </div></van-col
            >
          </van-row>
           <!-- <div v-if="ability == null">
            <van-empty
              class="custom-image"
              image="https://img.yzcdn.cn/vant/custom-empty-image.png"
              description="暂无数据"
            />
          </div> -->
          <noData :showNodata='ability == null'></noData>
          <div class="contentbox" v-if="ability != null">
            <van-collapse v-model="abilityactname">
              <van-collapse-item name="0" title="能力">
                <p>
                  <span>日期:{{ ability.A8SRLMX005 }}</span>
                </p>
                <p>
                  <span>排名:{{ ability.a8SRLMX006 }}</span>
                </p>
                <p>
                  <span>素质测评得分:{{ ability.a8SRLMX009 }}</span>
                </p>
                <p>
                  <span>360得分:{{ ability.qualityNum }}</span>
                </p>
                <p>
                  <span>BEI/案例分析得分:{{ ability.BEINum }}</span>
                </p>
                <p>
                  <span>加权总分:{{ ability.a8SRLMX011 }}</span>
                </p>
                <p>
                  <span>九宫格位置:{{ ability.jiuGZ }}</span>
                </p>
                <p>
                  <span>评估人:{{ ability.a8SRLMX012 }}</span>
                </p>
                <p>
                  <span>待提升项:{{ ability.promote }}</span>
                </p>
              </van-collapse-item>
            </van-collapse>
          </div>

          <div style="width:100%;height:400px" v-if="ability != null">
            <div ref="ppt" :style="{ width: '100%', height: '400px' }"></div>
          </div>
        </van-tab>
        <van-tab title="个人发展">
          <van-row type="flex" justify="center">
            <van-col>
              <div style="font-size: 20px;font-weight: 700;margin-top:20px">
                培训信息
              </div></van-col
            >
          </van-row>
          <!-- <div>
            <van-empty
              class="custom-image"
              image="https://img.yzcdn.cn/vant/custom-empty-image.png"
              description="暂无数据"
            />
          </div> -->
          <noData :showNodata='true'></noData>

          <van-row type="flex" justify="center">
            <van-col>
              <div style="font-size: 20px;font-weight: 700;margin-top:20px">
                项目经历
              </div></van-col
            >
          </van-row>
          <!-- <div v-if="listProject.length == 0">
            <van-empty
              class="custom-image"
              image="https://img.yzcdn.cn/vant/custom-empty-image.png"
              description="暂无数据"
            />
          </div> -->
          <noData :showNodata='listProject.length == 0'></noData>
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
                  <span>项目时间:{{ item.startTime }}</span>
                </p>
                <p>
                  <span>项目名称:{{ item.projectName }}</span>
                </p>
                 <p>
                  <span>项目性质:{{ item.projectProp }}</span>
                </p>
                <p>
                  <span>项目角色:{{ item.projectRole }}</span>
                </p>
                <p>
                  <span>投入精力占比:{{ item.trjlzb }}</span>
                </p>
                <p>
                  <span>任职类型:{{ item.jobType }}</span>
                </p>
                <p>
                  <span>项目成果:{{ item.projectResult }}</span>
                </p>
              </van-collapse-item>
            </van-collapse>
          </div>
        </van-tab>
        <van-tab title="团队培育">
          <van-row type="flex" justify="center">
            <van-col>
              <div style="font-size: 20px;font-weight: 700;margin-top:20px">
                团队培育
              </div></van-col
            >
          </van-row>
          <!-- <div v-if="teamlist.length == 0">
            <van-empty
              class="custom-image"
              image="https://img.yzcdn.cn/vant/custom-empty-image.png"
              description="暂无数据"
            />
          </div> -->
          <noData :showNodata='teamlist.length == 0'></noData>
          <div class="contentbox" v-if="teamlist.length != 0">
            <van-collapse
              v-model="teamlistactname"
              v-for="(item, index) in teamlist"
              :key="item.recordid"
            >
              <van-collapse-item :name="index">
                <template #title>
                  <div class="fontweig">
                    <van-tag mark type="primary" color="#fc5f10"
                      >团队{{ index + 1 }}</van-tag
                    >
                  </div>
                </template>
                 <p>
                  <span
                    >团队所在架构：{{
                      item.a8TDPYXX013Name ? item.a8TDPYXX013Name : "无"
                    }}</span
                  >
                </p>
                <p>

                  <span
                    >团队规模：{{
                      item.a8TDPYXX014 ? item.a8TDPYXX014 : "无"
                    }}</span
                  >
                </p>

                <p>
                  <span
                    >继任者1：{{
                      item.a8TDPYXX015 ? item.a8TDPYXX015 : "无"
                    }}</span
                  >
                </p>
                <p>
                  <span
                    >继任者1成熟度：{{
                      item.a8TDPYXX016 ? item.a8TDPYXX016name : "无"
                    }}</span
                  >
                </p>
                <p>
                  <span
                    >继任者2：{{
                      item.a8TDPYXX017 ? item.a8TDPYXX017 : "无"
                    }}</span
                  >
                </p>
                <p>
                  <span
                    >继任者2成熟度：{{
                      item.a8TDPYXX018 ? item.a8TDPYXX018name : "无"
                    }}</span
                  >
                </p>
                <p>
                  <span
                    >继任者3：{{
                      item.a8TDPYXX019 ? item.a8TDPYXX019 : "无"
                    }}</span
                  >
                </p>
                <p>
                  <span
                    >继任者3成熟度：{{
                      item.a8TDPYXX020 ? item.a8TDPYXX020name : "无"
                    }}</span
                  >
                </p>
              </van-collapse-item>
            </van-collapse>
          </div>
        </van-tab>
        <van-tab title="其他补充信息">
          <van-row type="flex" justify="center">
            <van-col>
              <div style="font-size: 20px;font-weight: 700;margin-top:20px">
                职业倾向
              </div>
            </van-col>
          </van-row>
          <van-cell
            v-if="basicInfo.a01230"
            title="职业倾向:"
            :value="basicInfo.a01230"
            center
          />
          <!-- <div v-if="!basicInfo.a01230">
            <van-empty
              class="custom-image"
              image="https://img.yzcdn.cn/vant/custom-empty-image.png"
              description="暂无数据"
            />
          </div> -->
          <noData :showNodata='basicInfo.a01230 == null '></noData>
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
  Tabs,
  Empty
} from "vant";
import {
  findCadreBasicInfo,
  lsitWorkInfoByJobnumber,
  findCadreKeyEvents,
  listProjectByJobnumber,
  listKukaWorkByJobnumber,
  findCadreAbility
} from "@/views/leadAffairs/cadreArchives/cadreArchivesApi.js";
//src/components/noData.vue
import { findTeamBuildingInfo } from "@/views/personAffairs/teamFoster/teamFosterApi.js";
import  noData  from "@/components/noData.vue";

export default {
  components: {noData},
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
      manageitem: {},
      itemjobnumber: "",
      KukaWorkList: [],
      KukaWorkListActname: [],
      teamlist: [],
      teamlistactname: [],
      ability: {},
      abilityactname: ["0"]
    };
  },
  created() {
    // debugger
    this.manageitem = this.$route.params.managerInfo;
    if(!this.manageitem ){
      this.itemjobnumber = localStorage.getItem('jobNum')
    }else{
      this.itemjobnumber = this.manageitem.a0190;
    }
    this.querylsitWorkInfoByJobnumber();
    this.queryfindCadreKeyEvents();
    this.queryProjectByJobnumber();
    this.queryFindCadreBasicInfo();
    this.querylistKukaWorkByJobnumber();
    this.findTeam();
    this.queryfindCadreAbility();
  },
  mounted() {
    // this.echatsMethod();
  },
  methods: {
    //项目经历
    querylsitWorkInfoByJobnumber(data) {
      lsitWorkInfoByJobnumber({ jobnumber: this.itemjobnumber }).then(res => {
        this.socialList = res.obj;
        for (let i = 0; i <= this.socialList.length; i++) {
          this.activeNames.push(i);
        }
      });
    },
    //关键事件
    queryfindCadreKeyEvents(data) {
      findCadreKeyEvents({ jobnumber: this.itemjobnumber }).then(res => {
        this.KeyEvents = res.obj;
        for (let i = 0; i <= this.KeyEvents.length; i++) {
          this.KeyEventsActiveNames.push(i);
        }
      });
    },
    //社会经历
    queryProjectByJobnumber() {
      listProjectByJobnumber({ jobnumber: this.itemjobnumber }).then(res => {
        this.listProject = res.obj;
        for (let i = 0; i <= this.listProject.length; i++) {
          this.listProjectActiveNames.push(i);
        }
      });
    },
    //顾家经历
    querylistKukaWorkByJobnumber() {
      listKukaWorkByJobnumber({ jobnumber: this.itemjobnumber }).then(res => {
        this.KukaWorkList = res.obj;
        for (let i = 0; i <= this.KukaWorkList.length; i++) {
          this.KukaWorkListActname.push(i);
        }
      });
    },
    //团队培育
    findTeam() {
      let queryData = { jobnumber: this.itemjobnumber };
      findTeamBuildingInfo(queryData).then(res => {
        if (res.code == "1000") {
          this.teamlist = res.obj;
          for (let i = 0; i <= this.teamlist.length; i++) {
            this.teamlistactname.push(i);
          }
        } else {
          Toast.fail(res.msg);
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
            if (key == "a0111") {
              this.basicInfo[key] = this.basicInfo.A0111;
            } else if (key == "a0144") {
              this.basicInfo[key] = this.basicInfo.A0144;
            } else if (key == "a01519") {
              this.basicInfo[key] = this.basicInfo.A01519;
            } else if (key == "a01518") {
              this.basicInfo[key] = this.basicInfo.A01518;
            }
          }
        }
      });
    },
    queryfindCadreAbility() {
      findCadreAbility({ jobnumber: this.itemjobnumber }).then(res => {
        this.ability = res.obj;
        if( this.ability != null){
          this.echatsMethod()
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
              { text: "业绩导向", max: 100 }
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
                value: [60, 73, 85, 40, 30, 30, 20, 80],
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
