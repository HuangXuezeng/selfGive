<template>
  <div>
    <div>
      <van-tabs v-model="active" scrollspy sticky type="card">
        <van-tab title="基本信息">
          <van-card
            :desc="basicInfo.deptName ? basicInfo.deptName : ''"
            :thumb="basicInfo.photo"
            @click="imageClick"
          >
            <template #tags>
              <van-tag plain type="danger" v-if="basicInfo.a01136">{{
                basicInfo.a01136
              }}</van-tag>
              <van-tag plain type="danger">{{ basicInfo.a01504 }}</van-tag>
              <van-tag plain type="danger">{{ basicInfo.a01516 }}</van-tag>
              <van-tag plain type="danger">{{ basicInfo.nowPost }}</van-tag>
              <van-tag plain type="danger">{{ basicInfo.a01740 }}</van-tag>
              <van-tag plain type="danger">{{ basicInfo.a0107 }}</van-tag>
            </template>
            <template #title>
              <!-- <van-tag plain type="danger">青苗</van-tag> -->
              <div style="font-size: 20px;font-weight: 700;display: flex;">
                {{ basicInfo.a0101 }}
                <div @click="imageClick">
                  <van-image
                    v-if="seedlings"
                    round
                    width="1rem"
                    height="1rem"
                    :src="seedlings"
                  />
                  <van-image
                    round
                    width="1rem"
                    height="1rem"
                    :src="oldWine"
                    v-if="oldWine"
                  />
                </div>
              </div>
            </template>
          </van-card>
          <van-row type="flex" justify="center">
            <van-col span="12">
              <van-cell-group class="resetVant">
                <van-cell
                  title="出生日期:"
                  :value="basicInfo.a0111 ? basicInfo.a0111 : '无'"
                  center
                />

                <van-cell
                  title="婚姻状况:"
                  :value="basicInfo.a0127 ? basicInfo.a0127 : '无'"
                  center
                />

                <van-cell
                  title="专业:"
                  :value="basicInfo.a011971 ? basicInfo.a011971 : '无'"
                  center
                />

                <van-cell
                  title="现岗位:"
                  :value="basicInfo.nowPost ? basicInfo.nowPost : '无'"
                  center
                />

                <van-cell
                  title="入司日期:"
                  :value="basicInfo.a0144 ? basicInfo.a0144 : '无'"
                  center
                />

                <van-cell
                  title="社会工龄:"
                  :value="basicInfo.a01122 ? basicInfo.a01122 + '年' : '无'"
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
                <van-cell
                  title="成熟度:"
                  :value="basicInfo.a01224 ? basicInfo.a01224 : '无'"
                  center
                />
                <van-cell
                  title="英语是否可做工作语言:"
                  :value="basicInfo.a01003 ? basicInfo.a01003 : '无'"
                  center
                />
                <van-cell
                  title="90后干部:"
                  :value="basicInfo.a01141 ? basicInfo.a01141 : '无'"
                  center
                />
              </van-cell-group>
            </van-col>
            <van-col span="12">
              <van-cell-group class="resetVant">
                <van-cell
                  title="政治面貌:"
                  :value="basicInfo.a01577 ? basicInfo.a01577 : '无'"
                  center
                />
                <van-cell
                  title="毕业院校:"
                  :value="basicInfo.a011901 ? basicInfo.a011901 : '无'"
                  center
                />
                <van-cell
                  title="最高学历:"
                  :value="basicInfo.a01504 ? basicInfo.a01504 : '无'"
                  center
                />
                <van-cell
                  title="职级:"
                  :value="basicInfo.a01516 ? basicInfo.a01516 : '无'"
                  center
                />
                <van-cell
                  title="司龄:"
                  :value="basicInfo.a0122 ? basicInfo.a0122 + '年' : '无'"
                  center
                />
                <van-cell
                  title="当前岗位工龄:"
                  :value="basicInfo.a01140 ? basicInfo.a01140 + '年' : '无'"
                  center
                />
                <van-cell
                  class=" strClamp"
                  @click="docClick"
                  title="首次晋升经理红文编号:"
                  center
                >
                  <template #default>
                    <div class=" strClamp">
                      {{ basicInfo.a01226 ? basicInfo.a01226 : "无" }}
                    </div>
                  </template>
                </van-cell>
                <van-cell
                  class=" strClamp"
                  @click="docClick"
                  title="首次晋升总监红文编号:"
                  center
                >
                  <template #default>
                    <div class="strClamp">
                      {{ basicInfo.a01225 ? basicInfo.a01225 : "无" }}
                    </div>
                  </template>
                </van-cell>

                <van-cell
                  title="高潜人才池:"
                  :value="basicInfo.a01223 ? basicInfo.a01223 : '无'"
                  center
                />
                <van-cell
                  title="几年陈:"
                  :value="basicInfo.jnc ? basicInfo.jnc : '无'"
                  center
                />
                <van-cell
                  title="青苗:"
                  :value="basicInfo.a01136 ? basicInfo.a01136 : '无'"
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
            <!-- <noData :showNodata="KukaWorkList.length == 0"></noData> -->
            <div class="contentbox">
              <van-collapse
                v-model="KukaWorkListActname"
                v-for="(item, index) in KukaWorkList"
                :key="item.id"
                @change="KukaWorkListClick"
              >
                <van-collapse-item :name="index">
                  <template #title>
                    <div class="fontweig">
                      <van-tag mark type="primary" color="#fc5f10">{{
                        item.startTime + " " + item.type
                      }}</van-tag>
                    </div>
                  </template>
                  <p>
                    <span>组织机构：</span>
                    <span class="floatRight">{{ item.organ }}</span>
                  </p>
                  <p>
                    <span>岗位：</span>
                    <span class="floatRight">{{ item.station }}</span>
                  </p>
                  <p>
                    <span>异动类型：</span>
                    <span class="floatRight">{{ item.type }}</span>
                  </p>
                  <p>
                    <span>起止年月：</span>
                    <span class="floatRight">{{ item.startTime }}</span>
                  </p>
                  <p>
                    <span>主要职责：</span>
                    <span class="floatRight strClamp" @click="strClampClick">{{
                      item.mainWork
                    }}</span>
                  </p>
                </van-collapse-item>
                <van-collapse-item
                  v-if="index == KukaWorkList.length - 1"
                  v-show="showKukaWorkFlag"
                  name="000"
                >
                  <template #title>
                    <div class="fontweig">
                      <van-tag mark type="primary" color="#fc5f10"
                        >...更多顾家工作履历</van-tag
                      >
                    </div>
                  </template>
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
            <!-- <noData :showNodata="socialList.length == 0"></noData> -->
            <div class="contentbox">
              <div
                v-if="showSocialListFlag"
                style="font-size: 16px;font-weight: 700;color: red;text-align:center"
              >
                青苗无社会工作履历
              </div>
              <div v-if="!showSocialListFlag">
                <van-collapse
                  v-model="activeNames"
                  v-for="(item, index) in socialList"
                  :key="item.recordid"
                  @change="SocialListClick"
                >
                  <van-collapse-item :name="index">
                    <template #title>
                      <div class="fontweig">
                        <van-tag mark type="primary" color="#fc5f10">{{
                          item.workUnit
                        }}</van-tag>
                      </div>
                    </template>
                    <p>
                      <span>公司：</span>
                      <span class="floatRight">{{ item.workUnit }}</span>
                    </p>
                    <p>
                      <span>任职岗位：</span>
                      <span class="floatRight">{{ item.station }}</span>
                    </p>
                    <p>
                      <span>开始日期：</span>
                      <span class="floatRight">{{ item.startTime }}</span>
                    </p>
                    <p>
                      <span>截止日期：</span>
                      <span class="floatRight">{{ item.endTime }}</span>
                    </p>
                    <p>
                      <span>主要描述：</span>
                      <span
                        class="floatRight strClamp"
                        @click="strClampClick"
                        >{{ item.description }}</span
                      >
                    </p>
                  </van-collapse-item>
                  <van-collapse-item
                    v-if="index == socialList.length - 1"
                    v-show="showSocialListMore"
                    name="000"
                  >
                    <template #title>
                      <div class="fontweig">
                        <van-tag mark type="primary" color="#fc5f10"
                          >...更多顾家社会履历</van-tag
                        >
                      </div>
                    </template>
                  </van-collapse-item>
                </van-collapse>
              </div>
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
          <div class="contentbox">
            <van-collapse
              v-model="cadreAchieveInfoActiveNames"
              v-for="(item, index) in cadreAchieveInfoList"
              :key="item.recordid"
              @change="cadreAchieveInfoListClick"
            >
              <van-collapse-item :name="index">
                <template #title>
                  <div class="fontweig">
                    <van-tag mark type="primary" color="#fc5f10">{{
                      item.a812005 + " " + item.a812006
                    }}</van-tag>
                  </div>
                </template>
                <p>
                  <span>年份:</span>
                  <span class="floatRight">{{ item.a812005 }}</span>
                </p>
                <p>
                  <span>季度</span>
                  <span class="floatRight">{{ item.a812006 }}</span>
                </p>
                <p>
                  <span>等级</span>
                  <span class="floatRight">{{ item.a812012 }}</span>
                </p>
              </van-collapse-item>
              <van-collapse-item
                v-if="index == cadreAchieveInfoList.length - 1"
                v-show="showcadreAchieveInfoListMore"
                name="000"
              >
                <template #title>
                  <div class="fontweig">
                    <van-tag mark type="primary" color="#fc5f10"
                      >...更多近3年绩效</van-tag
                    >
                  </div>
                </template>
              </van-collapse-item>
            </van-collapse>
          </div>
          <div class="contentbox">
            <van-row type="flex" justify="center">
              <van-col>
                <div style="font-size: 20px;font-weight: 700;;margin-top:20px">
                  pbc详情
                </div></van-col
              >
            </van-row>
            <van-collapse
              v-model="pbcListActiveNames"
              v-for="(item, index) in pbcList"
              :key="item.recordid"
            >
              <van-collapse-item :name="index">
                <template #title>
                  <div class="fontweig">
                    <van-tag mark type="primary" color="#fc5f10">{{
                      item.a832005
                    }}</van-tag>
                  </div>
                </template>
                <p>
                  <span>年份:</span>
                  <span class="floatRight">{{ item.a832005 }}</span>
                </p>
                <p>
                  <span>一级单位</span>
                  <span class="floatRight">{{ item.contentone }}</span>
                </p>
                <p>
                  <span>岗位</span>
                  <span class="floatRight">{{ item.a832019 }}</span>
                </p>
                <p>
                  <span>分数</span>
                  <span class="floatRight">{{ item.a832009 }}</span>
                </p>
                <p>
                  <span>pbc链接</span>
                  <a
                    class="floatRight"
                    :href="item.a832htmURL"
                    style="color:blue"
                    >{{ item.a832005 + " " + item.contentone }}</a
                  >
                </p>
              </van-collapse-item>
            </van-collapse>
          </div>
        </van-tab>
        <van-tab title="关键事件">
          <van-row type="flex" justify="center">
            <van-col>
              <div style="font-size: 20px;font-weight: 700;margin-top:20px">
                关键事件
              </div></van-col
            >
          </van-row>
          <!-- <noData :showNodata="KeyEvents.length == 0"></noData> -->
          <div class="contentbox">
            <van-collapse
              v-model="KeyEventsActiveNames"
              v-for="(item, index) in KeyEvents"
              :key="item.recordid"
              @change="KeyEventsClick"
            >
              <van-collapse-item :name="index">
                <template #title>
                  <div class="fontweig">
                    <van-tag mark type="primary" color="#fc5f10">{{
                      item.a813006
                    }}</van-tag>
                  </div>
                </template>
                <p>
                  <span>日期：</span>
                  <span class="floatRight">{{ item.A813005 }}</span>
                </p>
                <p>
                  <span>事件类型：</span>
                  <span class="floatRight">{{ item.a813006 }}</span>
                </p>
                <p>
                  <span>事件内涵：</span>
                  <span class="floatRight">{{ item.a813007 }}</span>
                </p>
                <p>
                  <span>事件描述：</span>
                  <span class="floatRight">{{ item.a813008 }}</span>
                </p>
                <p>
                  <span>事件评价：</span>
                  <span class="floatRight">{{ item.a813009 }}</span>
                </p>
                <p>
                  <span>奖惩结果：</span>
                  <span class="floatRight">{{ item.a813010 }}</span>
                </p>
                <p>
                  <span>红头文件：</span>
                  <span class="floatRight">{{ item.a813011 }}</span>
                </p>
              </van-collapse-item>
              <van-collapse-item
                v-if="index == KeyEvents.length - 1"
                v-show="showKeyEventsMore"
                name="000"
              >
                <template #title>
                  <div class="fontweig">
                    <van-tag mark type="primary" color="#fc5f10"
                      >...更多关键事件</van-tag
                    >
                  </div>
                </template>
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
          <!-- <noData :showNodata="ability == null"></noData> -->
          <div class="contentbox">
            <van-collapse
              v-model="listAbilityNames"
              v-for="(item, index) in listAbility"
              :key="item.recordid"
              @change="abilityClick(item)"
              accordion
            >
              <van-collapse-item :name="index">
                <template #title>
                  <div class="fontweig">
                    <van-tag mark type="primary" color="#fc5f10">{{
                      item.A8SRLMX005
                    }}</van-tag>
                  </div>
                </template>
                <p>
                  <span>日期:</span>
                  <span class="floatRight">{{ item.A8SRLMX005 }}</span>
                </p>
                <p>
                  <span>排名:</span>
                  <span class="floatRight">{{ item.a8SRLMX006 }}</span>
                </p>
                <p>
                  <span>素质测评得分:</span>
                  <span class="floatRight">{{ item.qualityNum }}</span>
                </p>
                <p>
                  <span>360得分:</span>
                  <span class="floatRight">{{ item.s360Num }}</span>
                </p>
                <p>
                  <span>BEI/案例分析得分:</span>
                  <span class="floatRight">{{ item.beinum }}</span>
                </p>
                <p>
                  <span>加权总分:</span>
                  <span class="floatRight">{{ item.a8SRLMX011 }}</span>
                </p>
                <p>
                  <span>九宫格位置:</span>
                  <span class="floatRight">{{ item.jiuGZ }}</span>
                </p>
                <p>
                  <span>评估人:</span>
                  <span class="floatRight"> {{ item.a8SRLMX012 }}</span>
                </p>
                <p>
                  <span>待提升项:</span>
                  <span class="floatRight">{{ item.promote }}</span>
                </p>
                <p>
                  <span>团队氛围:</span>
                  <span class="floatRight">{{ item.teamFw }}</span>
                </p>
              </van-collapse-item>
            </van-collapse>
          </div>
          <van-row type="flex" justify="center">
            <van-col>
              <div style="font-size: 20px;font-weight: 700;margin-top:20px">
                360度评价雷达图
              </div></van-col
            >
          </van-row>
          <div style="width:100%;height:400px">
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
          <!-- <noData :showNodata="trainedExperienceList.length == 0"></noData> -->
          <div class="contentbox">
            <van-collapse
              v-model="trainedExperienceActiveNames"
              v-for="(item, index) in trainedExperienceList"
              :key="item.recordid"
            >
              <van-collapse-item :name="index">
                <template #title>
                  <div class="fontweig">
                    <van-tag mark type="primary" color="#fc5f10">{{
                      item.a836008
                    }}</van-tag>
                  </div>
                </template>
                <p>
                  <span>培训时间:</span>
                  <span class="floatRight">{{ item.time }}</span>
                </p>
                <p>
                  <span>培训组织部门:</span>
                  <span class="floatRight">{{ item.a836007 }}</span>
                </p>
                <p>
                  <span>培训项目:</span>
                  <span class="floatRight">{{ item.a836008 }}</span>
                </p>
                <p>
                  <span>培训类别:</span>
                  <span class="floatRight">{{ item.a836009 }}</span>
                </p>
                <p>
                  <span>培训成绩:</span>
                  <span class="floatRight">{{ item.a836010 }}</span>
                </p>
                <p>
                  <span>奖项:</span>
                  <span class="floatRight">{{ item.a836011 }}</span>
                </p>
                <p>
                  <span>班级职务:</span>
                  <span class="floatRight">{{ item.a836012 }}</span>
                </p>
              </van-collapse-item>
            </van-collapse>
          </div>
          <van-row type="flex" justify="center">
            <van-col>
              <div style="font-size: 20px;font-weight: 700;margin-top:20px">
                项目经历
              </div></van-col
            >
          </van-row>
          <div class="contentbox">
            <van-collapse
              v-model="listProjectActiveNames"
              v-for="(item, index) in listProject"
              :key="item.recordid"
              @change="listProjectClick"
            >
              <van-collapse-item :name="index">
                <template #title>
                  <div class="fontweig">
                    <van-tag mark type="primary" color="#fc5f10">{{
                      item.projectName
                    }}</van-tag>
                  </div>
                </template>
                <p>
                  <span>项目时间:</span>
                  <span class="floatRight">{{ item.startTime }}</span>
                </p>
                <p>
                  <span>项目名称:</span>
                  <span class="floatRight">{{ item.projectName }}</span>
                </p>
                <p>
                  <span>项目性质:</span>
                  <span class="floatRight">{{ item.projectProp }}</span>
                </p>
                <p>
                  <span>项目角色:</span>
                  <span class="floatRight">{{ item.projectRole }}</span>
                </p>
                <p>
                  <span>投入精力占比:</span>
                  <span class="floatRight">{{ item.trjlzb }}</span>
                </p>
                <p>
                  <span>任职类型:</span>
                  <span class="floatRight">{{ item.jobType }}</span>
                </p>
                <p>
                  <span>项目成果:</span>
                  <span class="floatRight strClamp" @click="strClampClick">{{
                    item.projectResult
                  }}</span>
                </p>
              </van-collapse-item>
              <van-collapse-item
                v-if="index == listProject.length - 1"
                v-show="showlistProjectMore"
                name="000"
              >
                <template #title>
                  <div class="fontweig">
                    <van-tag mark type="primary" color="#fc5f10"
                      >...更多项目经历</van-tag
                    >
                  </div>
                </template>
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
          <!-- <noData :showNodata="teamlist.length == 0"></noData> -->
          <div class="contentbox">
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
                  <span>团队所在架构：</span>
                  <span class="floatRight">{{ item.a8TDPYXX013Name }}</span>
                </p>
                <p>
                  <span>团队规模：</span>
                  <span class="floatRight">{{ item.a8TDPYXX014 }}</span>
                </p>
                <div style="position:relative;">
                  <div class="successorFull">
                    <div
                      style="display: flex;flex-direction: column-reverse;justify-content:space-around;"
                    >
                      <div style="padding:1px;">
                        <div>
                          继任者成熟度：
                        </div>
                      </div>

                      <div style="padding:1px">
                        <div>
                          继任者：
                        </div>
                      </div>
                    </div>
                    <div
                      style="justify-content: space-between;flex-direction: row;display: flex;"
                    >
                      <div class="cellclass">
                        <div>
                          {{ item.a8TDPYXX015 }}
                        </div>
                        <div>
                          {{ item.a8TDPYXX016name }}
                        </div>
                      </div>
                      <div class="cellclass">
                        <div>
                          {{ item.a8TDPYXX017 }}
                        </div>
                        <div>
                          {{ item.a8TDPYXX018name }}
                        </div>
                      </div>
                      <div class="cellclass">
                        <div>
                          {{ item.a8TDPYXX019 }}
                        </div>
                        <div>
                          {{ item.a8TDPYXX020name }}
                        </div>
                      </div>
                    </div>
                    <span class="lineCCC"></span>
                  </div>
                </div>

                <!-- <p>
                  <span>继任者：</span>
                  <span class="floatRight">
                    <div class="teamJr">
                      {{ item.a8TDPYXX015 }}
                    </div>
                    <div class="teamJr">
                      {{ item.a8TDPYXX017 }}
                    </div>
                    <div class="teamJr">
                      {{ item.a8TDPYXX019 }}
                    </div></span
                  >
                </p>
                <p>
                  <span>继任者成熟度：</span>
                  <span class="floatRight">
                    <div class="teamJr">
                      {{ item.a8TDPYXX016name }}
                    </div>
                    <div class="teamJr">
                      {{ item.a8TDPYXX018name }}
                    </div>
                    <div class="teamJr">
                      {{ item.a8TDPYXX020name }}
                    </div>
                  </span>
                </p> -->
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
          <div style="padding:0 10px">
            <van-cell
              title="职业倾向:"
              :value="basicInfo.a01230"
              :center="true"
            />
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
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
  Empty,
  Image,
  ImagePreview
} from "vant";
import {
  findCadreBasicInfo,
  lsitWorkInfoByJobnumber,
  findCadreKeyEvents,
  listProjectByJobnumber,
  listKukaWorkByJobnumber,
  findCadreAbility,
  findCadreTrainInfo,
  findCadreTeamBuilding,
  findCadreAchieveInfo
} from "@/views/leadAffairs/cadreArchives/cadreArchivesApi.js";
//src/components/noData.vue
import { findTeamBuildingInfo } from "@/views/personAffairs/teamFoster/teamFosterApi.js";
import noData from "@/components/noData.vue";

export default {
  components: { noData },
  data() {
    return {
      socialList: [],
      activeNames: [0],
      socialListMore: [],
      active: 0,
      KeyEvents: [],
      KeyEventsActiveNames: [0],
      KeyEventsMore: [],
      listProject: [],
      listProjectActiveNames: [0],
      listProjectMore: [],
      basicInfo: {},
      manageitem: {},
      itemjobnumber: "",
      KukaWorkList: [],
      KukaWorkListMore: [],
      KukaWorkListActname: [0],
      teamlist: [],
      teamlistactname: [0],
      ability: {},
      abilityactname: ["0"],
      trainedExperienceActiveNames: [0],
      trainedExperienceList: [],
      listAbilityNames: 0,
      listAbility: [],
      cadreAchieveInfoActiveNames: [0],
      cadreAchieveInfoList: [],
      cadreAchieveInfoListMore: [],
      pbcListActiveNames: [0],
      pbcList: [],
      seedlings: "",
      oldWine: "",
      showKukaWorkFlag: true,
      showSocialListFlag: false,
      showSocialListMore: true,
      showKeyEventsMore: true,
      showlistProjectMore: true,
      showcadreAchieveInfoListMore: true
    };
  },
  created() {
    // debugger;
    this.manageitem = this.$route.params.managerInfo;
    if (!this.manageitem) {
      this.itemjobnumber = localStorage.getItem("jobNum");
    } else {
      this.itemjobnumber = this.manageitem.a0190;
    }
    this.querylsitWorkInfoByJobnumber();
    this.queryfindCadreKeyEvents();
    this.queryProjectByJobnumber();
    this.queryFindCadreBasicInfo();
    this.querylistKukaWorkByJobnumber();
    this.findTeam();
    this.queryfindCadreAbility();
    this.queryfindCadreTrainInfo();
    this.queryfindCadreAchieveInfo();
  },
  mounted() {
    // this.echatsMethod();
  },
  methods: {
    //项目经历
    querylsitWorkInfoByJobnumber(data) {
      lsitWorkInfoByJobnumber({ jobnumber: this.itemjobnumber }).then(res => {
        // debugger;
        if (res.obj.workList.length == 0 && res.obj.isCrops == "N") {
          this.socialList.push({
            workUnit: "无",
            station: "无",
            startTime: "无",
            endTime: "无",
            description: "无"
          });
          this.showSocialListMore = false;
        } else {
          if (res.obj.isCrops == "Y" && res.obj.workList.length == 0) {
            this.showSocialListFlag = true;
          } else {
            for (let i in res.obj.workList) {
              if (i <= 0) {
                this.socialList.push(res.obj.workList[i]);
              } else {
                this.socialListMore.push(res.obj.workList[i]);
              }
            }
            if (this.socialListMore.length == 0) {
              this.showSocialListMore = false;
            } else {
              this.showSocialListMore = true;
            }
          }
        }
      });
    },
    //关键事件
    queryfindCadreKeyEvents(data) {
      findCadreKeyEvents({ jobnumber: this.itemjobnumber }).then(res => {
        if (res.obj == 0) {
          this.KeyEvents.push({
            A813005: "无",
            a813006: "无",
            a813007: "无",
            a813008: "无",
            a813009: "无",
            a813010: "无",
            a813011: "无"
          });
          this.showKeyEventsMore = false;
        } else {
          for (let i in res.obj) {
            if (i <= 0) {
              this.KeyEvents.push(res.obj[i]);
            } else {
              this.KeyEventsMore.push(res.obj[i]);
            }
          }
          // debugger
          if (this.KeyEventsMore.length == 0) {
            this.showKeyEventsMore = false;
          } else {
            this.showKeyEventsMore = true;
          }
          // this.KeyEvents = res.obj;
        }
      });
    },
    //社会经历
    queryProjectByJobnumber() {
      listProjectByJobnumber({ jobnumber: this.itemjobnumber }).then(res => {
        // debugger;
        if (res.obj.length == 0) {
          this.listProject.push({
            startTime: "无",
            projectName: "无",
            projectProp: "无",
            projectRole: "无",
            trjlzb: "无",
            jobType: "无",
            projectResult: "无"
          });
          this.showlistProjectMore = false;
        } else {
          for (let i in res.obj) {
            if (i <= 0) {
              this.listProject.push(res.obj[i]);
            } else {
              this.listProjectMore.push(res.obj[i]);
            }
          }
          if (this.listProjectMore.length == 0) {
            this.showlistProjectMore = false;
          } else {
            this.showlistProjectMore = true;
          }

          // this.listProject = res.obj;
        }
      });
    },
    //顾家经历
    querylistKukaWorkByJobnumber() {
      listKukaWorkByJobnumber({ jobnumber: this.itemjobnumber }).then(res => {
        if (res.obj == 0) {
          this.KukaWorkList.push({
            organ: "无",
            station: "无",
            type: "无",
            startTime: "无",
            mainWork: "无"
          });
          this.showKukaWorkFlag = false;
        } else {
          for (let item of res.obj) {
            if (item.mainWork != null) {
              if (this.KukaWorkList.length <= 0) {
                this.KukaWorkList.push(item);
              } else {
                this.KukaWorkListMore.push(item);
              }
            }
          }
          if (this.KukaWorkList.length == 0) {
            this.KukaWorkList.push({
              organ: "无",
              station: "无",
              type: "无",
              startTime: "无",
              mainWork: "无"
            });
            this.showKukaWorkFlag = false;
          } else {
            this.showKukaWorkFlag = true;
          }
        }
      });
    },
    KukaWorkListClick(data) {
      let dataset = new Set(data);
      if (dataset.has("000")) {
        this.KukaWorkList = this.KukaWorkList.concat(this.KukaWorkListMore);
        this.showKukaWorkFlag = false;
        this.KukaWorkListMore = [];
      }
    },
    SocialListClick(data) {
      let dataset = new Set(data);
      if (dataset.has("000")) {
        this.socialList = this.socialList.concat(this.socialListMore);
        this.showSocialListMore = false;
        this.socialListMore = [];
      }
    },
    KeyEventsClick(data) {
      let dataset = new Set(data);
      if (dataset.has("000")) {
        this.KeyEvents = this.KeyEvents.concat(this.KeyEventsMore);
        this.showKeyEventsMore = false;
        this.KeyEventsMore = [];
      }
    },
    listProjectClick(data) {
      let dataset = new Set(data);
      if (dataset.has("000")) {
        this.listProject = this.listProject.concat(this.listProjectMore);
        this.showlistProjectMore = false;
        this.listProjectMore = [];
      }
    },
    cadreAchieveInfoListClick(data) {
      let dataset = new Set(data);
      if (dataset.has("000")) {
        this.cadreAchieveInfoList = this.cadreAchieveInfoList.concat(
          this.cadreAchieveInfoListMore
        );
        this.showcadreAchieveInfoListMore = false;
        this.cadreAchieveInfoListMore = [];
      }
    },
    //培训信息
    queryfindCadreTrainInfo() {
      findCadreTrainInfo({ jobnumber: this.itemjobnumber }).then(res => {
        // debugger
        if (res.obj == 0) {
          this.trainedExperienceList.push({
            time: "无",
            a836007: "无",
            a836008: "无",
            a836009: "无",
            a836010: "无",
            a836011: "无",
            a836012: "无"
          });
        } else {
          this.trainedExperienceList = res.obj;
        }
      });
    },
    //团队培育
    findTeam() {
      let queryData = { jobnumber: this.itemjobnumber };
      findCadreTeamBuilding(queryData).then(res => {
        // debugger;
        if (res.code == "1000") {
          if (res.obj == 0) {
            this.teamlist.push({
              a8TDPYXX013Name: "无",
              a8TDPYXX014: "无",
              a8TDPYXX015: "无",
              a8TDPYXX016name: "无",
              a8TDPYXX017: "无",
              a8TDPYXX018name: "无",
              a8TDPYXX019: "无",
              a8TDPYXX020name: "无",
              a8TDPYXX020: "无"
            });
          } else {
            this.teamlist = res.obj;
            for (let key in this.teamlist[0]) {
              if (
                this.teamlist[0][key] == "" ||
                this.teamlist[0][key] == null
              ) {
                this.teamlist[0][key] = "无";
              }
            }
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
            key == "a01518" ||
            key == "photo" ||
            key == "a01230" ||
            key == "a01136" ||
            key == "jnc"
          ) {
            if (key == "a0111") {
              this.basicInfo[key] = this.basicInfo.A0111;
            } else if (key == "a0144") {
              this.basicInfo[key] = this.basicInfo.A0144;
            } else if (key == "a01519") {
              this.basicInfo[key] = this.basicInfo.A01519;
            } else if (key == "a01518") {
              this.basicInfo[key] = this.basicInfo.A01518;
            } else if (key == "photo") {
              if (
                this.basicInfo[key] != null &&
                this.basicInfo[key] != "" &&
                this.basicInfo[key] != undefined
              ) {
              } else {
                this.basicInfo[key] = require("@/assets/timg.jpg");
              }
            } else if (key == "a01230") {
              // debugger;
              if (!this.basicInfo[key]) {
                this.basicInfo[key] = "无";
              }
            } else if (key == "a01136") {
              if (this.basicInfo[key]) {
                this.seedlings = require("@/assets/EF8DB818-6CA2-4d8f-AD69-DB7FF7AF22A8.png");
              } else {
              }
            } else if (key == "jnc") {
              if (this.basicInfo[key]) {
                this.oldWine = require("@/assets/timg[5].jpg");
              } else {
              }
            }
          }
        }
      });
    },
    queryfindCadreAbility() {
      findCadreAbility({ jobnumber: this.itemjobnumber }).then(res => {
        // debugger;
        this.listAbility = res.obj;
        if (res.obj.length == 0) {
          this.listAbility.push({
            A8SRLMX005: "无",
            a8SRLMX006: "无",
            a8SRLMX009: "无",
            qualityNum: "无",
            BEINum: "无",
            a8SRLMX011: "无",
            jiuGZ: "无",
            a8SRLMX012: "无",
            promote: "无"
          });
          this.echatsMethod("");
        } else {
          this.listAbility = res.obj;
          this.echatsMethod(res.obj[0]);
        }
      });
    },
    queryfindCadreAchieveInfo() {
      findCadreAchieveInfo({ jobnumber: this.itemjobnumber }).then(res => {
        for (let i in res.obj.jxList) {
          if (i <= 3) {
            this.cadreAchieveInfoList.push(res.obj.jxList[i]);
          } else {
            this.cadreAchieveInfoListMore.push(res.obj.jxList[i]);
          }
        }
        if (res.obj.jxList.length == 0) {
          this.cadreAchieveInfoList.push({
            a812005: "无",
            a812006: "无",
            a812012: "无"
          });
        }
        if (this.cadreAchieveInfoListMore.length == 0) {
          this.showcadreAchieveInfoListMore = false;
        } else {
          this.showcadreAchieveInfoListMore = true;
        }
        if (res.obj.pbcList.length == 0) {
          this.pbcList.push({
            a832005: "无",
            contentone: "无",
            a832019: "无",
            a832009: "无",
            a832htmURL: "javascript:void(0);"
          });
        } else {
          this.pbcList = res.obj.pbcList;
        }
        //  <p>
        //           <span>年份:</span>
        //           <span class="floatRight">{{ item.a832005 }}</span>
        //         </p>
        //         <p>
        //           <span>一级单位</span>
        //           <span class="floatRight">{{ item.contentone }}</span>
        //         </p>
        //         <p>
        //           <span>岗位</span>
        //           <span class="floatRight">{{ item.a832019 }}</span>
        //         </p>
        //         <p>
        //           <span>分数</span>
        //           <span class="floatRight">{{ item.a832009 }}</span>
        //         </p>
        //         <p>
        //           <span>pbc链接</span>
        //           <a class="floatRight" :href="item.a832URL" style="color:blue" >{{ item.a832005 +' '+ item.contentone}}</a>
        //         </p>
      });
    },
    echatsMethod(expanditem) {
      var myChart = this.$echarts.init(this.$refs.ppt);
      let ecartsData = [];
      if (expanditem == "" || expanditem.a8SRLMX015 == null) {
        ecartsData = [0, 0, 0, 0, 0, 0, 0, 0];
      } else {
        ecartsData = [
          expanditem.a8SRLMX015,
          expanditem.a8SRLMX016,
          expanditem.a8SRLMX017,
          expanditem.a8SRLMX018,
          expanditem.a8SRLMX019,
          expanditem.a8SRLMX020,
          expanditem.a8SRLMX021,
          expanditem.a8SRLMX022
        ];
      }

      myChart.setOption({
        tooltip: {
          trigger: "axis"
        },
        radar: [
          {
            indicator: [
              { text: "坦诚正直", max: 10 },
              { text: "事业激情", max: 10 },
              { text: "团队领导", max: 10 },
              { text: "团结协作", max: 10 },
              { text: "战略决策", max: 10 },
              { text: "推动变革", max: 10 },
              { text: "用户中心", max: 10 },
              { text: "业绩导向", max: 10 }
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
                value: ecartsData,
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
    },
    strClampClick(e) {
      if (e.target.className == "floatRight strClampAll") {
        e.target.className = "floatRight strClamp";
      } else {
        e.target.className = "floatRight strClampAll";
      }
    },
    docClick(e) {
      // debugger;
      if (e.target.className == "strClampAll") {
        e.target.className = " strClamp";
      } else {
        e.target.className = "strClampAll";
      }
    },
    imageClick() {
      let ImagePreviewList = [this.basicInfo.photo];
      if (this.seedlings) {
        ImagePreviewList.push(this.seedlings);
      }
      if (this.oldWine) {
        ImagePreviewList.push(this.oldWine);
      }
      ImagePreview(ImagePreviewList);
    },
    abilityClick(item) {
      this.echatsMethod(item);
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

.floatRight {
  float: right;
  margin-top: 3px;
}

.strClamp {
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.strClampAll {
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 100;
  -webkit-box-orient: vertical;
}

.teamJr {
  display: inline-block;
  width: 60px;
  border: 1px solid #ccc;
  text-align: center;
}

.cellclass {
  width: 9vh;
  border-left: 1px solid #ccc;
  text-align: center;
  padding: 2px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.lineCCC {
  position: absolute;
  top: 50%;
  left: 0px;
  width: 100%;
  border-bottom: 1px solid #ccc;
}

.successorFull {
  display: flex;
  justify-content: space-between;
  border: 1px solid #ccc;
}
</style>
