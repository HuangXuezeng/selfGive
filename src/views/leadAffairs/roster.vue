<template>
  <div>
    <div class="header">
      <!-- <van-field v-model="form.department" @click="pickDept" readonly label="部门" placeholder="请选择部门" /> -->
      <!-- 选择部门 -->
      <div style="border-bottom:1px solid #ebedf0">
        <pickdeptmore
          ref="select"
          @confirmNode="selctdept"
          :Farequired="true"
          labelTitle="部门"
          :workingNum="true"
          :isSelctall="true"
          :isFromRost="true"
          :faDeptData="deptData"
        ></pickdeptmore>
      </div>
      <van-field
        v-model="form.jobnumber"
        label="工号"
        placeholder="请输入工号"
      />
      <van-field v-model="form.name" label="姓名" placeholder="请输入姓名" />
      <div class="btn">
        <van-button type="primary" color="#fc5f10" size="mini" @click="search" style="width:16%"
          >查询</van-button
        >
        <van-button type="primary" color="#fc5f10" size="mini" @click="reset" style="width:16%"
          >重置</van-button
        >
        <van-button type="primary" color="#fc5f10" size="mini" @click="setMenu" style="width:16%"
          >排序</van-button
        >
        <van-button type="primary" color="#fc5f10" size="mini" @click="_exportExl" style="width:16%"
          >导出</van-button
        >
        <van-button
          type="primary"
          color="#fc5f10"
          size="mini"
          style="width:23.333%"
          @click="moreSearch"
          >更多条件</van-button
        >
        <!-- <van-button type="primary" color="#fc5f10" size="small" @click="ceshi">测试</van-button> -->
      </div>
    </div>
    <!-- 人数表格 -->
    <div class="table">
      <v-table
        ref="table"
        :is-loading="isLoading"
        :height="400"
        is-horizontal-resize
        column-width-drag
        style="font-size:14px;width:100%"
        title-bg-color="#e5ecf0"
        :columns="columns"
        :table-data="tableData"
        row-hover-color="#eee"
        row-click-color="#edf7ff"
        :row-click="rowClick"
        :column-cell-class-name="columnCellClass"
      ></v-table>
      <!-- <div style="padding:10px 10px 10px 0"><van-tag type="warning">总条数：{{total}}</van-tag></div> -->
    </div>
    <div class="more">
      <van-tag type="warning">总条数：{{ total }}</van-tag>
      <span style="float:right" @click="loadMore"
        ><van-tag type="warning">下一页</van-tag></span
      >
    </div>
    <!-- <div class="mt20 mb20 bold" style="margin-top:10px;">
            <v-pagination @page-change="pageChange" @page-size-change="pageSizeChange" :total="total" size='small' :page-size="pageSize" :layout="['total', 'prev', 'pager', 'next']" :showPagingCount="2"></v-pagination>
        </div>    -->
    <!-- 更多查询条件弹出框 -->
    <van-popup
      v-model="showPick"
      position="top"
      :style="{ height: '70%' }"
      get-container="body"
    >
      <div class="pick">
        <div>
          <el-tag type="warning">是否在报表内展示</el-tag>
          <el-tag type="warning">查询条件</el-tag>
          <el-tag type="warning">查询结果</el-tag>
        </div>
         <van-checkbox-group v-model="resultMore" ref="checkboxGroupMore">
            <van-checkbox name="当前状态">
              <van-field
              v-model="form.currentState"
              label="当前状态"
              placeholder="请选择"
              readonly
              @click-input="selectState"
            />
            </van-checkbox>
            <van-checkbox name="性别">
              <van-field
              v-model="form.sex"
              label="性别"
              placeholder="请选择"
              readonly
              @click-input="selectSex"
            />
            </van-checkbox>
            <van-checkbox name="最高学历">
              <van-field
                v-model="form.education"
                label="最高学历"
                placeholder="请选择"
                readonly
                @click-input="selectXueli"
              />
            </van-checkbox>
            <van-checkbox name="院校性质">
              <van-field
                v-model="form.schoolProp"
                label="院校性质"
                placeholder="请选择"
                readonly
                @click-input="selectSchool"
              />
            </van-checkbox>
            <van-checkbox name="毕业院校">
              <van-field
                v-model="form.schoolName"
                label="毕业院校"
                placeholder="请输入毕业院校"
              />
            </van-checkbox>
            <van-checkbox name="专业">
              <van-field v-model="form.walk" label="专业" placeholder="请输入专业" />
            </van-checkbox>
            <van-checkbox name="编制类型">
              <van-field
                v-model="form.bzlx"
                label="编制类型"
                placeholder="请选择"
                readonly
                @click-input="selectBian"
              />
            </van-checkbox>
            <van-checkbox name="职类">
              <van-field
                v-model="form.category"
                label="职类"
                placeholder="请选择"
                readonly
                @click-input="selectzl"
              />
            </van-checkbox>
            <van-checkbox name="职级">
              <van-field
                v-model="form.rank"
                label="职级"
                placeholder="请选择"
                readonly
                @click-input="selectzj"
              />
            </van-checkbox>
            <van-checkbox name="岗位分类一">
              <van-field
                v-model="form.postOne"
                label="岗位分类一"
                placeholder="请选择"
                readonly
                @click-input="selectFl1"
              />
            </van-checkbox>
            <van-checkbox name="岗位分类二">
              <van-field
                v-model="form.postTwo"
                label="岗位分类二"
                placeholder="请选择"
                readonly
                @click-input="selectFl2"
              />
            </van-checkbox>
            <van-checkbox name="入司开始日期">
              <van-field
                v-model="form.entryStartTime"
                label="入司开始日期"
                placeholder="请选择"
                readonly
                @click-input="entryStartTime"
              />
            </van-checkbox>
            <van-checkbox name="入司结束日期">
              <van-field
                v-model="form.entryEndTime"
                label="入司结束日期"
                placeholder="请选择"
                readonly
                @click-input="entryEndTime"
              />
            </van-checkbox>
            <van-checkbox name="试用开始日期">
              <van-field
                v-model="form.syjsStartTime"
                label="试用开始日期"
                placeholder="请选择"
                readonly
                @click-input="syjsStartTime"
              />
            </van-checkbox>
            <van-checkbox name="试用结束日期">
              <van-field
                v-model="form.syjsEndTime"
                label="试用结束日期"
                placeholder="请选择"
                readonly
                @click-input="endTime"
              />
            </van-checkbox>
            <van-checkbox name="实际转正开始日期">
              <van-field
                v-model="form.sjzzStartTime"
                label="实际转正开始日期"
                placeholder="请选择"
                readonly
                @click-input="startTime"
              />
            </van-checkbox>
            <van-checkbox name="实际转正结束日期">
              <van-field
                v-model="form.sjzzEndTime"
                label="实际转正结束日期"
                placeholder="请选择"
                readonly
                @click-input="sjzzEndTime"
              />
            </van-checkbox>
            <van-checkbox name="专业线标签">
              <van-field
                v-model="form.zyxbq"
                label="专业线标签"
                placeholder="请选择"
                readonly
                @click-input="selectZhuanye"
              />
            </van-checkbox>
            <van-checkbox name="是否为退伍军人">
              <van-field
                v-model="form.isVeteran"
                label="是否为退伍军人"
                placeholder="请选择"
                readonly
                @click-input="selectVal"
              />
            </van-checkbox>
            <van-checkbox name="是否在本公司有亲属关系">
              <van-field
                v-model="form.isPerson"
                label="是否在本公司有亲属关系"
                placeholder="请选择"
                readonly
                @click-input="selectQs"
              />
            </van-checkbox>
            <van-checkbox name="是否签订培训协议">
              <van-field
                v-model="form.isTrain"
                label="是否签订培训协议"
                placeholder="请选择"
                readonly
                @click-input="selectPxxy"
              />
            </van-checkbox>
            <van-checkbox name="是否签订竞业协议">
              <van-field
                v-model="form.isCompete"
                label="是否签订竞业协议"
                placeholder="请选择"
                readonly
                @click-input="selectJyxy"
              />
            </van-checkbox>
            <van-checkbox name="工作单位">
              <van-field
                v-model="form.company"
                label="工作单位"
                placeholder="请输入工作单位"
              />
            </van-checkbox>
            <van-checkbox name="职称名称">
              <van-field
                v-model="form.zcName"
                label="职称名称"
                placeholder="请输入职称名称"
              />
            </van-checkbox>
            <van-checkbox name="人员类别">
              <van-field
                v-model="form.personType"
                label="人员类别"
                placeholder="请选择"
                readonly
                @click="selectPerson"
              />
            </van-checkbox>
            <van-checkbox name="职务类型">
              <van-field
                v-model="form.jobType"
                label="职务类型"
                placeholder="请选择"
                readonly
                @click="selectJobType"
              />
            </van-checkbox>
            <van-checkbox name="年龄">
              <van-field v-model="form.age" label="年龄" disabled />
            </van-checkbox>
            <van-checkbox name="岗位">
              <van-field v-model="form.post" label="岗位" disabled />
            </van-checkbox>
            <van-checkbox name="司龄">
              <van-field
                v-model="form.entryAge"
                label="司龄"
                disabled 
              />
            </van-checkbox>
          </van-checkbox-group>
        
        <!-- <van-button type="info" size="mini" @click="confirmPick">确定</van-button> -->
      </div>
      <div class="close">
        <van-button
          type="primary"
          size="mini"
          color="#fc5f10"
          @click="moreReset"
          style="width:21.5%"
          >重置</van-button
        >
        <van-button
          type="primary"
          size="mini"
          color="#fc5f10"
          @click="checkAll"
          style="width:21.5%"
          >全选</van-button
        >
        <van-button
          type="primary"
          size="mini"
          color="#fc5f10"
          @click="searchMore"
          style="width:21.5%"
          >查询</van-button
        >
        <!-- <van-button
          type="primary"
          color="#fc5f10"
          size="mini"
          @click="handClickItem"
          style="width:22%"
          >确认多选</van-button
        > -->
        <van-button
          type="danger"
          size="mini"
          @click="closeSearch"
          style="width:21.5%"
          >关闭</van-button
        >
      </div>
    </van-popup>
    <!-- 排序弹窗 -->
    <van-popup
      v-model="showPx"
      position="top"
      :style="{ height: '70%' }"
      get-container="body"
    >
      <div class="pick">
        <!-- 排序 -->
        <transition-group
          type="transition"
          class="infoitems"
          :name="!drag ? 'flip-list' : null"
        >
          <div
            class="infoitem"
            v-for="item in columns"
            v-dragging="{ item: item, list: columns, group: 'columns' }"
            :key="item.title"
          >
            <div :name="item.title" class="paixu">{{ item.title }}</div>
          </div>
        </transition-group>
      </div>
      <div class="close">
        <van-button
          type="primary"
          size="small"
          style="width:100%;background-color:#fc5f10;border:#fc5f10 "
          @click="closePop"
          >关闭</van-button
        >
      </div>
    </van-popup>
    <!-- 选择部门弹出框 -->
    <!-- <van-popup v-model="showPickDept" position="top" :style="{ height: '70%' }" get-container="body" closeable>
            <van-checkbox v-model="checked" @change="changeDept">是否包含下级部门</van-checkbox>
            <el-tree 
            :data="deptData" 
            ref="tree"
            @check-change="handleCheckChange"
            node-key="deptId"
            :props="props" 
            show-checkbox></el-tree>
        </van-popup> -->
    <!-- 弹出时间选择框 -->
    <van-popup v-model="showTime" position="bottom" :style="{ height: '50%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirm"
        @cancel="cancel"
      />
    </van-popup>
    <!-- 弹出时下拉选择是否 -->
    <van-popup
      v-model="showSelect"
      position="bottom"
      :style="{ height: '50%' }"
      get-container="body"
    >
      <van-picker
        title="标题"
        show-toolbar
        :columns="column1"
        @confirm="onConfirm1"
        @cancel="onCancel1"
      />
    </van-popup>
    <!-- 弹出时下拉选择男女 -->
    <van-popup
      v-model="showSex"
      position="bottom"
      :style="{ height: '50%' }"
      get-container="body"
    >
      <van-picker
        title="标题"
        show-toolbar
        :columns="column2"
        @confirm="onConfirm2"
        @cancel="onCancel2"
      />
    </van-popup>
    <!-- 弹出时下拉选择职位类型 -->
    <van-popup
      v-model="showJobType"
      position="bottom"
      :style="{ height: '50%' }"
      get-container="body"
    >
      <van-picker
        title="标题"
        show-toolbar
        :columns="column13"
        @confirm="onConfirm13"
        @cancel="onCancel13"
      />
    </van-popup>
    <!-- 弹出时下拉选择编制类型 -->
    <van-popup
      v-model="showBianzhi"
      position="bottom"
      :style="{ height: '50%' }"
      get-container="body"
    >
      <van-picker
        title="标题"
        show-toolbar
        :columns="column3"
        @confirm="onConfirm3"
        @cancel="onCancel3"
      />
    </van-popup>
    <!-- 弹出时下拉选择院校性质 -->
    <van-popup
      v-model="showSchool"
      position="bottom"
      :style="{ height: '50%' }"
      get-container="body"
    >
      <van-checkbox-group v-model="result3" ref="checkboxGroup">
        <van-checkbox v-for="item in column4" :key="item.code" :name="item">{{
          item.content
        }}</van-checkbox>
      </van-checkbox-group>
      <van-button type="info" size="mini" @click="onConfirm4">确定</van-button>
    </van-popup>
    <!-- 弹出时下拉选择学历 -->
    <van-popup
      v-model="showXueli"
      position="bottom"
      :style="{ height: '50%' }"
      get-container="body"
    >
      <van-checkbox-group v-model="result4" ref="checkboxGroup">
        <van-checkbox v-for="item in column8" :key="item.code" :name="item">{{
          item.content
        }}</van-checkbox>
      </van-checkbox-group>
      <van-button type="info" size="mini" @click="onConfirm8">确定</van-button>
    </van-popup>
    <!-- 弹出时下拉选择专业线标签 -->
    <van-popup
      v-model="showZhuanye"
      position="bottom"
      :style="{ height: '50%' }"
      get-container="body"
    >
      <van-checkbox-group v-model="result5" ref="checkboxGroup">
        <van-checkbox v-for="item in column5" :key="item.code" :name="item">{{
          item.content
        }}</van-checkbox>
      </van-checkbox-group>
      <van-button type="info" size="mini" @click="onConfirm5">确定</van-button>
    </van-popup>
    <!-- 弹出时下拉选择当前状态 -->
    <van-popup
      v-model="showState"
      position="bottom"
      :style="{ height: '50%' }"
      get-container="body"
    >
      <van-checkbox-group v-model="result6" ref="checkboxGroup">
        <van-checkbox v-for="item in column6" :key="item.code" :name="item">{{
          item.content
        }}</van-checkbox>
      </van-checkbox-group>
      <van-button type="info" size="mini" @click="onConfirm6">确定</van-button>
    </van-popup>
    <!-- 弹出时下拉选择人员类别 -->
    <van-popup
      v-model="showLeibie"
      position="bottom"
      :style="{ height: '50%' }"
      get-container="body"
    >
      <van-checkbox-group v-model="result7" ref="checkboxGroup">
        <van-checkbox v-for="item in column7" :key="item.code" :name="item">{{
          item.content
        }}</van-checkbox>
      </van-checkbox-group>
      <van-button type="info" size="mini" @click="onConfirm7">确定</van-button>
    </van-popup>
    <!-- 弹出时下拉选择岗位分类1 -->
    <van-popup
      v-model="showFenlei1"
      position="bottom"
      :style="{ height: '50%' }"
      get-container="body"
    >
      <van-checkbox-group v-model="result2" ref="checkboxGroup">
        <van-checkbox v-for="item in column9" :key="item.code" :name="item">{{
          item.content
        }}</van-checkbox>
      </van-checkbox-group>
      <van-button type="info" size="mini" @click="onConfirm9">确定</van-button>
    </van-popup>
    <!-- 弹出时下拉选择岗位分类2 -->
    <van-popup
      v-model="showFenlei2"
      position="bottom"
      :style="{ height: '50%' }"
      get-container="body"
    >
      <van-checkbox-group v-model="result1" ref="checkboxGroup">
        <van-checkbox
          v-model="checkFl1"
          v-for="item in column10"
          :key="item.code"
          :name="item"
          >{{ item.content }}</van-checkbox
        >
      </van-checkbox-group>
      <van-button type="info" size="mini" @click="confirmFl2">确定</van-button>
    </van-popup>
    <!-- 职类 -->
    <van-popup
      v-model="showZl"
      position="bottom"
      :style="{ height: '50%' }"
      get-container="body"
    >
      <van-checkbox-group v-model="result8" ref="checkboxGroup">
        <van-checkbox v-for="item in column11" :key="item.code" :name="item">{{
          item.content
        }}</van-checkbox>
      </van-checkbox-group>
      <van-button type="info" size="mini" @click="onConfirm10">确定</van-button>
    </van-popup>
    <!-- 职级 -->
    <van-popup
      v-model="showZj"
      position="bottom"
      :style="{ height: '50%' }"
      get-container="body"
    >
      <van-checkbox-group v-model="result9" ref="checkboxGroup">
        <van-checkbox v-for="item in column12" :key="item.code" :name="item">{{
          item.content
        }}</van-checkbox>
      </van-checkbox-group>
      <van-button type="info" size="mini" @click="onConfirm11">确定</van-button>
    </van-popup>
    <!-- 遮罩层（导出表格等待） -->
    <loadingSpin ref="loadingSpin"></loadingSpin>
  </div>
</template>
<script>
import { Popup, Checkbox, CheckboxGroup, List, Notify } from "vant";
import {
  queryDept,
  getSelectVal,
  queryFen2,
  queryPerson,
  queryRank,
  querySome,
  queryRoster,
  exportExl,
  selectEmployeeLimit
} from "./api";
import { mapMutations } from "vuex";
import pickDeptMore from "@/components/pickDeptMore.vue";
import loadingSpin from "@/components/waitLoading.vue";
import draggable from "vuedraggable";
export default {
  data() {
    return {
      resultMore: [], //直接选择条件查询的多选
      download: 1, //传给后台，导出的是否是默认的数据
      deptData: [],
      isLoading: true,
      intertimer: null, //定时器
      checked: true, //是否包含下级部门
      dataList: [],
      loading: false,
      finished: false,
      form: {
        department: "",
        jobnumber: "",
        name: "",
        currentState: "",
        sex: "",
        age: "",
        education: "",
        schoolProp: "",
        schoolName: "",
        walk: "",
        bzlx: "",
        post: "",
        category: "",
        rank: "",
        postOne: "",
        postTwo: "",
        entryStartTime: "",
        entryEndTime: "",
        entryAge: "",
        syjsEndTime: "",
        syjsStartTime: "",
        sjzzStartTime: "",
        sjzzEndTime: "",
        zyxbq: "",
        isVeteran: "",
        isPerson: "",
        isTrain: "",
        isCompete: "",
        company: "",
        zcName: "",
        personType: "",
        jobType: ""
      },
      deptData: [],
      showPick: false, //多选弹窗
      showSelect: false, //下拉选择
      showTime: false, //时间选择弹窗
      showPickDept: false, //选择部门弹窗
      showSex: false, //选择男女
      showBianzhi: false, //选择编制类型
      showSchool: false, //选择院校性质
      showZhuanye: false, //选择专业线
      showState: false, //当前状态
      showLeibie: false, //人员类别
      showXueli: false, //最高学历
      showFenlei1: false, //岗位分类1
      showFenlei2: false, //岗位分类2
      showZl: false, //职类
      showZj: false, //职级
      showJobType: false, //职位类型
      showPx: false, //排序弹窗
      result: [], //多选框
      results: [], //多选框
      result1: [], //岗位分类1
      result2: [], //岗位分类2
      result3: [], //院校性质
      result4: [], //学历
      result5: [], //专业线标签
      result6: [], //当前状态
      result7: [], //人员类别
      result8: [], //职类
      result9: [], //职级
      pickFalse: "",
      total: 0,
      pageIndex: 1,
      pageSize: 10,
      tableData: [],
      fenyeData: [],
      dataIndex: 1, //分页页码
      columns: [
        {
          field: "custome",
          width: 50,
          titleAlign: "center",
          columnAlign: "center",
          title: "序号",
          formatter: function(rowData, index) {
            return index + 1;
          },
          isResize: true
        },
        {
          field: "jobnumber",
          title: "工号",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            return `<span>${rowData[field]}</span>`;
          },
          isResize: true
          // isFrozen: true,
        },
        {
          field: "name",
          title: "姓名",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          // isFrozen: true
        },
        {
          field: "department",
          title: "部门",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "post",
          title: "岗位",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "rank",
          title: "职级",
          width: 50,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "rsrq",
          title: "入司日期",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "currentState",
          title: "当前状态",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        }
      ],
      props: {
        label: "content",
        children: "depts"
      },
      count: 1,
      formList: [], //input框组件
      timeList: [], //时间框组件
      selectList: [], //下拉选择是否
      sexList: [], //下拉选择男女
      bianList: [], //下拉选择编制类型
      schoolList: [], //下拉选择院校性质
      zhuanyeList: [], //下拉选择专业线
      stateList: [], //下拉选择当前状态
      personList: [], //下拉选择人员
      minDate: new Date(1980, 0, 1),
      maxDate: new Date(2030, 10, 1),
      currentDate: new Date(),
      column1: [
        { keyId: "1", text: "是" },
        { keyId: "2", text: "否" }
      ],
      column2: [
        { keyId: "1", text: "男" },
        { keyId: "2", text: "女" }
      ],
      column3: [
        { keyId: "01", text: "编制内" },
        { keyId: "02", text: "编制外" }
      ],
      column4: [], //院校性质
      column5: [], //专业线
      column6: [], //当前状态
      column7: [], //人员类别
      column8: [], //最高学历
      column9: [], //岗位分类1
      column10: [], //岗位分类2
      column11: [], //职类
      column12: [], //职级
      column13: [
        { keyId: "01", text: "主职" },
        { keyId: "02", text: "兼职" }
      ],
      sex: "", //传后台性别值
      jobType: "", //传后台职位类型值
      bianzhi: "", //传后台编制类型值
      schoolVal: "", //传后台院校性质值
      zhuanyeVal: "", //传后台专业线标签
      stateVal: "", //传后台当前状态
      leibieVal: "", //传后台leibie
      junrenVal: "", //传后台是否退伍军人
      qinshuVal: "", //传后台是否有亲属关系
      peixunVal: "", //传后台是否签订培训协议
      jingyeVal: "", //传后台是否签订竞业协议
      xueliVal: "", //传后台是否最高学历值
      fenlei1Val: "", //传后台岗位分类1值
      fenlei2Val: "", //传后台岗位分类2值
      zhileiVal: "", //传后台职类值
      zhijiVal: "", //传后台职级值
      deptVal: [], //传后台选择部门的值
      selectFlag: "", //是否
      timeFlag: "", //时间选择标识
      checkFl1: [], //选中分类2的值
      gerenLists: [
        { id: 1, name: "zt", dis: this.false1, val: "当前状态" },
        { id: 2, name: "xb", dis: this.false2, val: "性别" },
        { id: 3, name: "nl", dis: this.false3, val: "年龄" },
        { id: 4, name: "zgxl", dis: this.false4, val: "最高学历" }
      ], //排序数组
      drag: false,
      currentDept: [], //页面进来时获取的部门名
      deptIds: [], //页面进来时获取的部门id
      defaultCheckedKeys: [],
      //多选的条件
      itemCheck: {
        jobnumberAll: '',  //工号
        nameAll: '',   //姓名
        departmentAll: '',  //部门
        postAll: '',   //岗位
        rankAll: '',  //职级
        currentStateAll: '',   //当前状态
        personTypeAll: '',   //人员类别
        sexAll: '',   //性别
        ageAll: '',   //年龄
        educationAll: '',   //最高学历
        schoolPropAll: '',   //院校性质
        schoolNameAll: '',   //毕业院校
        walkAll: '',   //专业
        bzlxAll: '',   //编制类型
        categoryAll: '',   //职类
        postOneAll: '',   //岗位分类一
        postTwoAll: '',   //岗位分类二
        entryAgeAll: '',   //司龄
        zyxbqAll: '',   //专业线标签
        isVeteranAll: '',   //是否为退伍军人
        isPersonAll: '',   //是否在本公司有亲属关系
        isTrainAll: '',   //是否签订培训协议
        isCompeteAll: '',   //是否签订竞业协议
        companyAll: '',   //工作单位
        zcNameAll: '',   //职称名称
        jobTypeAll: '',   //职务类型
        entryStartTimeAll: '',   //入司开始日期
        entryEndTimeAll: '',   //入司结束日期
        syjsStartTimeAll: '',   //试用开始日期
        syjsEndTimeAll: '',   //试用结束日期
        sjzzStartTimeAll: '',   //实际转正开始日期
        sjzzEndTimeAll: '',   //实际转正结束日期
      }
    };
  },
  created() {
    this.getState();
    this._queryDeptIdName(); //获取部门名字和部门id
  },
  methods: {
    //处理表格的分页方法
    pagePev() {
      this.total = this.tableData.length;
      let result = [];
      let chunk = 100; //100个一组
      for (var i = 0, j = this.tableData.length; i < j; i += chunk) {
        result.push(this.tableData.slice(i, i + chunk));
      }
      // console.log(result)
      this.tableData = result[0]; //默认显示100条
      this.fenyeData = result;
    },
    //下一页
    loadMore() {
      this.dataIndex++; //点击+1
      // if (this.dataIndex >= this.fenyeData.length) {
      //   Notify({ type: "warning", message: "没有更多数据了哦~" });
      // } else {
      //   this.tableData = this.tableData.concat(this.fenyeData[this.dataIndex]);
      // }
      let queryData = {
        jobnumber: localStorage.getItem('jobNum'),
        page: this.dataIndex
      }
      selectEmployeeLimit(queryData).then(res=>{
        if(res.obj == ''){
          Notify({ type: "warning", message: "没有更多数据了哦~" })
        }else{
          this.tableData = this.tableData.concat(res.obj)
        }
      })
    },
    //获取当前状态的值
    getState() {
      getSelectVal().then(res => {
        this.column6 = res.obj.dqzt;
        this.column4 = res.obj.yxxz;
        this.column5 = res.obj.zyxbq;
        this.column7 = res.obj.rylb;
        this.column8 = res.obj.zgxl;
        this.column9 = res.obj.gwfl;
        this.column11 = res.obj.zl;
      });
    },
    //获取部门和部门id
    _queryDeptIdName() {
      this._getOrz(); //获取部门
      this._queryPerson(); //获取人员
    },
    //获取组织下的部门
    _getOrz() {
      const departRes = JSON.parse(localStorage.getItem("departRes"));
      console.log(departRes)
      this.deptData.push(departRes);
      console.log(this.deptData)
      this.currentDept = departRes.currentDepartment;
      this.deptIds = departRes.deptIds;
    },
    //默认展示IDE人
    _queryPerson() {
        const currentDeptsRes = JSON.parse(localStorage.getItem('currentDeptsRes'))
        const deptIdsRes = JSON.parse(localStorage.getItem('deptIdsRes'))
        this.currentDept = currentDeptsRes
        this.deptIds = deptIdsRes
        let queryData = {
          currentDepts: this.currentDept,
          deptIds: this.deptIds,
          jobnumber: localStorage.getItem('jobNum')
        }
      queryPerson(queryData).then(res => {
        this.tableData = res.obj;
        //请求到数据之后停止加载
        this.isLoading = false;
        this.total = res.totalSize
        // this.pagePev(); //获取的表格数据分组
      });
    },
    //重置
    reset() {
      this.form.department = ""
      this.form.jobnumber = ""
      this.form.name = ""
      //清空选择的部门
      this.deptVal = [];
      this.$refs.select.selectedDepartment = "";
      this.$refs.select.restFlag = true;

      //更多条件置空
      this.form.currentState = "",
      this.form.sex = "",
      this.form.age = "",
      this.form.education = "",
      this.form.schoolProp = "",
      this.form.schoolName = "",
      this.form.walk = "",
      this.form.bzlx = "",
      this.form.post = "",
      this.form.category = "",
      this.form.rank = "",
      this.form.postOne = "",
      this.form.postTwo = "",
      this.form.entryStartTime = "",
      this.form.entryEndTime = "",
      this.form.entryAge = "",
      this.form.syjsEndTime = "",
      this.form.syjsStartTime = "",
      this.form.sjzzStartTime = "",
      this.form.sjzzEndTime = "",
      this.form.zyxbq = "",
      this.form.isVeteran = "",
      this.form.isPerson = "",
      this.form.isTrain = "",
      this.form.isCompete = "",
      this.form.company = "",
      this.form.zcName = "",
      this.form.personType = "";
      //清空传给后台的值
      this.stateVal = "",
      this.sex = "",
      this.jobType = "",
      this.xueliVal = "",
      this.schoolVal = "",
      this.bianzhi = "",
      this.zhileiVal = "",
      this.zhijiVal = "",
      this.fenlei1Val = "",
      this.fenlei2Val = "",
      this.zhuanyeVal = "",
      this.junrenVal = "",
      this.qinshuVal = "",
      this.peixunVal = "",
      this.jingyeVal = "",
      this.leibieVal = "",
      // this.currentDept = "",
      // this.deptIds = "",
      // this.deptVal = [],
      //清空多选
      this.resultMore = []
      this.itemCheck = []
      this.$refs.checkboxGroupMore.toggleAll(false)
    },
    //更多查询条件
    moreSearch() {
      this.showPick = true;
    },
    //设置
    setMenu() {
      this.showPx = true;
    },
    //查询添加表格
    search() {
      let queryData = {
        // jobnumber: this.form.jobnumber,
        // name: this.form.name,
        // currentDept: this.currentDept,
        // deptIds: this.deptIds,
        // ids: this.deptVal,
        // worknumber: localStorage.getItem('jobNum'),
        //更多选择的条件
        //输入选择的条件
        currentState: this.stateVal,
        sex: this.sex,
        jobType: this.jobType,
        education: this.xueliVal,
        schoolProp: this.schoolVal,
        bzlx: this.bianzhi,
        category: this.zhileiVal,
        rank: this.zhijiVal,
        postOne: this.fenlei1Val,
        postTwo: this.fenlei2Val,
        zyxbq: this.zhuanyeVal,
        isVeteran: this.junrenVal,
        isPerson: this.qinshuVal,
        isTrain: this.peixunVal,
        isCompete: this.jingyeVal,
        personType: this.leibieVal,
        currentDept: this.currentDept,
        deptIds: this.deptIds,
        ids: this.deptVal,
        jobnumber: this.form.jobnumber,
        name: this.form.name,
        age: this.form.age,
        schoolName: this.form.schoolName,
        walk: this.form.walk,
        post: this.form.post,
        entryStartTime: this.form.entryStartTime,
        entryEndTime: this.form.entryEndTime,
        entryAge: this.form.entryAge,
        syjsEndTime: this.form.syjsEndTime,
        syjsStartTime: this.form.syjsStartTime,
        sjzzStartTime: this.form.sjzzStartTime,
        sjzzEndTime: this.form.sjzzEndTime,
        company: this.form.company,
        zcName: this.form.zcName,
        worknumber: localStorage.getItem('jobNum'),
        //多选的条件
        jobnumberAll: this.itemCheck.jobnumberAll, //工号
        nameAll: this.itemCheck.nameAll,   //姓名
        departmentAll: this.itemCheck.departmentAll,   //部门
        postAll: this.itemCheck.postAll,   //岗位
        rankAll: this.itemCheck.rankAll,   //职级
        currentStateAll: this.itemCheck.currentStateAll,   //当前状态
        personTypeAll: this.itemCheck.personTypeAll,   //人员类别
        sexAll: this.itemCheck.sexAll,   //性别
        ageAll: this.itemCheck.ageAll,   //年龄
        educationAll: this.itemCheck.educationAll,   //最高学历
        schoolPropAll: this.itemCheck.schoolPropAll,   //院校性质
        schoolNameAll: this.itemCheck.schoolNameAll,   //毕业院校
        walkAll: this.itemCheck.walkAll,   //专业
        bzlxAll: this.itemCheck.bzlxAll,   //编制类型
        categoryAll: this.itemCheck.categoryAll,   //职类
        postOneAll: this.itemCheck.postOneAll,   //岗位分类一
        postTwoAll: this.itemCheck.postTwoAll,   //岗位分类二
        entryAgeAll: this.itemCheck.entryAgeAll,   //司龄
        zyxbqAll: this.itemCheck.zyxbqAll,   //专业线标签
        isVeteranAll: this.itemCheck.isVeteranAll,   //是否为退伍军人
        isPersonAll: this.itemCheck.isPersonAll,   //是否在本公司有亲属关系
        isTrainAll: this.itemCheck.isTrainAll,   //是否签订培训协议
        isCompeteAll: this.itemCheck.isCompeteAll,   //是否签订竞业协议
        companyAll: this.itemCheck.companyAll,   //工作单位
        zcNameAll: this.itemCheck.zcNameAll,   //职称名称
        jobTypeAll: this.itemCheck.jobTypeAll,   //职务类型
        entryStartTimeAll: this.itemCheck.entryStartTimeAll,   //入司开始日期
        entryEndTimeAll: this.itemCheck.entryEndTimeAll,   //入司结束日期
        syjsStartTimeAll: this.itemCheck.syjsStartTimeAll,   //试用开始日期
        syjsEndTimeAll: this.itemCheck.syjsEndTimeAll,   //试用结束日期
        sjzzStartTimeAll: this.itemCheck.sjzzStartTimeAll,   //实际转正开始日期
        sjzzEndTimeAll: this.itemCheck.sjzzEndTimeAll   //实际转正结束日期
      };
      querySome(queryData).then(res => {
        if(res.code == 1000){
          this.download = 2
          this.tableData = res.obj;
          this.total = res.totalSize
          // this.pagePev(); //获取的表格数据分组
        }else{
          Notify({ type: "warning", message: res.msg });
        }
      });
      // console.log(this.form)
    },
    //全选
    checkAll() {
      this.$refs.checkboxGroupMore.toggleAll(true);
    },
    //重置更多选择条件
    moreReset() {
      this.form.currentState = "",
      this.form.sex = "",
      this.form.age = "",
      this.form.education = "",
      this.form.schoolProp = "",
      this.form.schoolName = "",
      this.form.walk = "",
      this.form.bzlx = "",
      this.form.post = "",
      this.form.category = "",
      this.form.rank = "",
      this.form.postOne = "",
      this.form.postTwo = "",
      this.form.entryStartTime = "",
      this.form.entryEndTime = "",
      this.form.entryAge = "",
      this.form.syjsEndTime = "",
      this.form.syjsStartTime = "",
      this.form.sjzzStartTime = "",
      this.form.sjzzEndTime = "",
      this.form.zyxbq = "",
      this.form.isVeteran = "",
      this.form.isPerson = "",
      this.form.isTrain = "",
      this.form.isCompete = "",
      this.form.company = "",
      this.form.zcName = "",
      this.form.personType = "";
      //清空传给后台的值
      this.stateVal = "",
      this.sex = "",
      this.jobType = "",
      this.xueliVal = "",
      this.schoolVal = "",
      this.bianzhi = "",
      this.zhileiVal = "",
      this.zhijiVal = "",
      this.fenlei1Val = "",
      this.fenlei2Val = "",
      this.zhuanyeVal = "",
      this.junrenVal = "",
      this.qinshuVal = "",
      this.peixunVal = "",
      this.jingyeVal = "",
      this.leibieVal = "",
      // this.currentDept = "",
      // this.deptIds = "",
      // this.deptVal = [],
      //清空多选
      this.resultMore = []
      this.itemCheck = []
      this.$refs.checkboxGroupMore.toggleAll(false)
    },
    //弹窗里条件的查询
    searchMore() {
      //初始化表格显示的数据
      // this.initTableData()
      // console.log(this.form.post)
      // if(this.form.post !== ""){
      //     let obj26 = {
      //         field: 'post',title: '岗位',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
      //     }
      //     this.columns.push(obj26)
      // }
      // if(this.form.rank !== ""){
      //     let obj27 = {
      //         field: 'rank',title: '职级',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
      //     }
      //     this.columns.push(obj27)
      // }
      // if(this.form.entryStartTime !== "" || this.form.entryEndTime !== ""){
      //     let obj28 = {
      //         field: 'rsrq',title: '入司日期',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
      //     }
      //     this.columns.push(obj28)
      // }
      // if(this.form.currentState !== ""){
      //     let obj1 = {
      //         field: 'currentState',title: '当前状态',width: 150,titleAlign: 'center',columnAlign: 'center',isResize: true
      //     }
      //     this.columns.push(obj1)
      // }
      if (this.form.sex !== "") {
        let obj2 = {
          field: "sex",
          title: "性别",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          // formatter: function(rowData, rowIndex, pagingIndex, field) {
          //   return `<span>${rowData[field] == 1 ? "男" : "女"}</span>`;
          // }
        };
        this.columns.push(obj2);
      }
      if (this.form.age !== "") {
        let obj3 = {
          field: "age",
          title: "年龄",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        };
        this.columns.push(obj3);
      }
      if (this.form.education !== "") {
        let obj4 = {
          field: "education",
          title: "最高学历",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        };
        this.columns.push(obj4);
      }
      if (this.form.schoolProp !== "") {
        let obj5 = {
          field: "schoolProp",
          title: "院校性质",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        };
        this.columns.push(obj5);
      }
      if (this.form.schoolName !== "") {
        let obj6 = {
          field: "schoolName",
          title: "毕业院校",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        };
        this.columns.push(obj6);
      }
      if (this.form.walk !== "") {
        let obj7 = {
          field: "walk",
          title: "专业",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        };
        this.columns.push(obj7);
      }
      if (this.form.bzlx !== "") {
        let obj8 = {
          field: "bzlx",
          title: "编制类型",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        };
        this.columns.push(obj8);
      }
      if (this.form.post !== "") {
        let obj9 = {
          field: "post",
          title: "岗位",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        };
        this.columns.push(obj9);
      }
      if (this.form.category !== "") {
        let obj10 = {
          field: "category",
          title: "职类",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        };
        this.columns.push(obj10);
      }
      if (this.form.rank !== "") {
        let obj11 = {
          field: "rank",
          title: "职级",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        };
        this.columns.push(obj11);
      }
      if (this.form.postOne !== "") {
        let obj12 = {
          field: "postOne",
          title: "岗位分类一",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        };
        this.columns.push(obj12);
      }
      if (this.form.postTwo !== "") {
        let obj13 = {
          field: "postTwo",
          title: "岗位分类二",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        };
        this.columns.push(obj13);
      }
      if (this.form.entryAge !== "") {
        let obj15 = {
          field: "entryAge",
          title: "司龄",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        };
        this.columns.push(obj15);
      }
      if (this.form.syjsStartTime !== "") {
        let obj16 = {
          field: "syjsrq",
          title: "试用结束日期",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        };
        this.columns.push(obj16);
      }
      if (this.form.syjsEndTime !== "") {
        let obj16 = {
          field: "syjsrq",
          title: "试用结束日期",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        };
        this.columns.push(obj16);
      }
      if (this.form.sjzzStartTime !== "") {
        let obj17 = {
          field: "sjzzrq",
          title: "实际转正日期",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        };
        this.columns.push(obj17);
      }
      if (this.form.sjzzEndTime !== "") {
        let obj17 = {
          field: "sjzzrq",
          title: "实际转正日期",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        };
        this.columns.push(obj17);
      }
      if (this.form.zyxbq !== "") {
        let obj18 = {
          field: "zyxbq",
          title: "专业线标签",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        };
        this.columns.push(obj18);
      }
      if (this.form.isVeteran !== "") {
        let obj19 = {
          field: "isVeteran",
          title: "是否为退伍军人",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          // formatter: function(rowData, rowIndex, pagingIndex, field) {
          //   return `<span>${rowData[field] == 1 ? "是" : "否"}</span>`;
          // }
        };
        this.columns.push(obj19);
      }
      if (this.form.isPerson !== "") {
        let obj20 = {
          field: "isPerson",
          title: "是否在本公司有亲属关系",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          // formatter: function(rowData, rowIndex, pagingIndex, field) {
          //   return `<span>${rowData[field] == 1 ? "是" : "否"}</span>`;
          // }
        };
        this.columns.push(obj20);
      }
      if (this.form.isTrain !== "") {
        let obj21 = {
          field: "isTrain",
          title: "是否签订培训协议",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          // formatter: function(rowData, rowIndex, pagingIndex, field) {
          //   return `<span>${rowData[field] == 1 ? "是" : "否"}</span>`;
          // }
        };
        this.columns.push(obj21);
      }
      if (this.form.isCompete !== "") {
        let obj22 = {
          field: "isCompete",
          title: "是否签订竞业协议",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
        };
        this.columns.push(obj22);
      }
      if (this.form.company !== "") {
        let obj23 = {
          field: "company",
          title: "工作单位",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            return `<div class="overauto">${rowData[field]}</div>`
          },
          isResize: true
        };
        this.columns.push(obj23);
      }
      if (this.form.zcName !== "") {
        let obj24 = {
          field: "zcName",
          title: "职称名称",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            return `<div class="overauto">${rowData[field]}</div>`
          },
          isResize: true
        };
        this.columns.push(obj24);
      }
      if (this.form.personType !== "") {
        let obj25 = {
          field: "personType",
          title: "人员类别",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        };
        this.columns.push(obj25);
      }
      if (this.form.jobType !== "") {
        let obj26 = {
          field: "jobType",
          title: "职务类型",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        };
        this.columns.push(obj26);
      }
      //多选条件查询
      for (var i in this.resultMore) {
        // debugger
        switch (this.resultMore[i]) {
          case '当前状态':
            this.itemCheck.currentStateAll = '当前状态'
          break;
          case '岗位':
            this.itemCheck.postAll = '岗位'
          break;
          case '职级':
            this.itemCheck.rankAll = '职级'
          break;
          case '人员类别':
            this.itemCheck.personTypeAll = '人员类别'
            let obj25 = {
              field: "personType",
              title: "人员类别",
              width: 150,
              titleAlign: "center",
              columnAlign: "center",
              isResize: true
            };
            this.columns.push(obj25);
          break;
          case '性别':
            this.itemCheck.sexAll = '性别'
            let obj2 = {
              field: "sex",
              title: "性别",
              width: 150,
              titleAlign: "center",
              columnAlign: "center",
              isResize: true,
            };
            this.columns.push(obj2);
          break;
          case '年龄':
            this.itemCheck.ageAll = '年龄'
            let obj3 = {
              field: "age",
              title: "年龄",
              width: 150,
              titleAlign: "center",
              columnAlign: "center",
              isResize: true
            };
            this.columns.push(obj3);
          break;
          case '最高学历':
            this.itemCheck.educationAll = '最高学历'
            let obj4 = {
              field: "education",
              title: "最高学历",
              width: 150,
              titleAlign: "center",
              columnAlign: "center",
              isResize: true
            };
            this.columns.push(obj4);
          break;
          case '院校性质':
            this.itemCheck.schoolPropAll = '院校性质'
            let obj5 = {
              field: "schoolProp",
              title: "院校性质",
              width: 150,
              titleAlign: "center",
              columnAlign: "center",
              isResize: true
            };
            this.columns.push(obj5);
          break;
          case '毕业院校':
            this.itemCheck.schoolNameAll = '毕业院校'
            let obj6 = {
              field: "schoolName",
              title: "毕业院校",
              width: 150,
              titleAlign: "center",
              columnAlign: "center",
              isResize: true
            };
            this.columns.push(obj6);
          break;
          case '专业':
            this.itemCheck.walkAll = '专业'
            let obj7 = {
              field: "walk",
              title: "专业",
              width: 150,
              titleAlign: "center",
              columnAlign: "center",
              isResize: true
            };
            this.columns.push(obj7);
          break;
          case '编制类型':
            this.itemCheck.bzlxAll = '编制类型'
            let obj8 = {
              field: "bzlx",
              title: "编制类型",
              width: 150,
              titleAlign: "center",
              columnAlign: "center",
              isResize: true
            };
            this.columns.push(obj8);
          break;
          case '职类':
            this.itemCheck.categoryAll = '职类'
            let obj10 = {
              field: "category",
              title: "职类",
              width: 150,
              titleAlign: "center",
              columnAlign: "center",
              isResize: true
            };
            this.columns.push(obj10);
          break;
          case '岗位分类一':
            this.itemCheck.postOneAll = '岗位分类一'
            let obj12 = {
              field: "postOne",
              title: "岗位分类一",
              width: 150,
              titleAlign: "center",
              columnAlign: "center",
              isResize: true
            };
            this.columns.push(obj12);
          break;
          case '岗位分类二':
            this.itemCheck.postTwoAll = '岗位分类二'
            let obj13 = {
              field: "postTwo",
              title: "岗位分类二",
              width: 150,
              titleAlign: "center",
              columnAlign: "center",
              isResize: true
            };
            this.columns.push(obj13);
          break;
          case '司龄':
            this.itemCheck.entryAgeAll = '司龄'
            let obj15 = {
              field: "entryAge",
              title: "司龄",
              width: 150,
              titleAlign: "center",
              columnAlign: "center",
              isResize: true
            };
            this.columns.push(obj15);
          break;
          case '专业线标签':
            this.itemCheck.zyxbqAll = '专业线标签'
            let obj18 = {
              field: "zyxbq",
              title: "专业线标签",
              width: 150,
              titleAlign: "center",
              columnAlign: "center",
              isResize: true
            };
            this.columns.push(obj18);
          break;
          case '是否为退伍军人':
            this.itemCheck.isVeteranAll = '是否为退伍军人'
            let obj19 = {
              field: "isVeteran",
              title: "是否为退伍军人",
              width: 150,
              titleAlign: "center",
              columnAlign: "center",
              isResize: true,
            };
            this.columns.push(obj19);
          break;
          case '是否在本公司有亲属关系':
            this.itemCheck.isPersonAll = '是否在本公司有亲属关系'
            let obj20 = {
              field: "isPerson",
              title: "是否在本公司有亲属关系",
              width: 150,
              titleAlign: "center",
              columnAlign: "center",
              isResize: true,
            };
            this.columns.push(obj20);
          break;
          case '是否签订培训协议':
            this.itemCheck.isTrainAll = '是否签订培训协议'
            let obj21 = {
              field: "isTrain",
              title: "是否签订培训协议",
              width: 150,
              titleAlign: "center",
              columnAlign: "center",
              isResize: true,
            };
            this.columns.push(obj21);
          break;
          case '是否签订竞业协议':
            this.itemCheck.isCompeteAll = '是否签订竞业协议'
            let obj22 = {
              field: "isCompete",
              title: "是否签订竞业协议",
              width: 150,
              titleAlign: "center",
              columnAlign: "center",
              isResize: true,
            };
            this.columns.push(obj22);
          break;
          case '工作单位':
            this.itemCheck.companyAll = '工作单位'
            let obj23 = {
              field: "company",
              title: "工作单位",
              width: 150,
              titleAlign: "center",
              columnAlign: "center",
              formatter: function(rowData, rowIndex, pagingIndex, field) {
                return `<div class="overauto">${rowData[field]}</div>`
              },
              isResize: true
            };
            this.columns.push(obj23);
          break;
          case '职称名称':
            this.itemCheck.zcNameAll = '职称名称'
            let obj24 = {
              field: "zcName",
              title: "职称名称",
              width: 150,
              titleAlign: "center",
              columnAlign: "center",
              formatter: function(rowData, rowIndex, pagingIndex, field) {
                return `<div class="overauto">${rowData[field]}</div>`
              },
              isResize: true
            };
            this.columns.push(obj24);
          break;
          case '职务类型':
            this.itemCheck.jobTypeAll = '职务类型'
            let obj26 = {
              field: "jobType",
              title: "职务类型",
              width: 150,
              titleAlign: "center",
              columnAlign: "center",
              isResize: true
            };
        this.columns.push(obj26);
          break;
          case '入司开始日期':
            this.itemCheck.entryStartTimeAll = '入司开始日期'
          break;
          case '入司结束日期':
            this.itemCheck.entryEndTimeAll = '入司结束日期'
          break;
          case '试用开始日期':
            this.itemCheck.syjsStartTimeAll = '试用开始日期'
            let obj16 = {
              field: "syjsrq",
              title: "试用结束日期",
              width: 150,
              titleAlign: "center",
              columnAlign: "center",
              isResize: true
            };
            this.columns.push(obj16);
          break;
          case '试用结束日期':
            this.itemCheck.syjsEndTimeAll = '试用结束日期'
            let obj30 = {
              field: "syjsrq",
              title: "试用结束日期",
              width: 150,
              titleAlign: "center",
              columnAlign: "center",
              isResize: true
            };
            this.columns.push(obj30);
          break;
          case '实际转正开始日期':
            this.itemCheck.sjzzStartTimeAll = '实际转正开始日期'
            let obj17 = {
              field: "sjzzrq",
              title: "实际转正日期",
              width: 150,
              titleAlign: "center",
              columnAlign: "center",
              isResize: true
            };
            this.columns.push(obj17);
          break;
          case '实际转正结束日期':
            this.itemCheck.sjzzEndTimeAll = '实际转正结束日期'
            let obj31 = {
              field: "sjzzrq",
              title: "实际转正日期",
              width: 150,
              titleAlign: "center",
              columnAlign: "center",
              isResize: true
            };
            this.columns.push(obj31);
          break;
        }
      }
      //查询请求
      let queryData = {
        //输入选择的条件
        currentState: this.stateVal,
        sex: this.sex,
        jobType: this.jobType,
        education: this.xueliVal,
        schoolProp: this.schoolVal,
        bzlx: this.bianzhi,
        category: this.zhileiVal,
        rank: this.zhijiVal,
        postOne: this.fenlei1Val,
        postTwo: this.fenlei2Val,
        zyxbq: this.zhuanyeVal,
        isVeteran: this.junrenVal,
        isPerson: this.qinshuVal,
        isTrain: this.peixunVal,
        isCompete: this.jingyeVal,
        personType: this.leibieVal,
        currentDept: this.currentDept,
        deptIds: this.deptIds,
        ids: this.deptVal,
        jobnumber: this.form.jobnumber,
        name: this.form.name,
        age: this.form.age,
        schoolName: this.form.schoolName,
        walk: this.form.walk,
        post: this.form.post,
        entryStartTime: this.form.entryStartTime,
        entryEndTime: this.form.entryEndTime,
        entryAge: this.form.entryAge,
        syjsEndTime: this.form.syjsEndTime,
        syjsStartTime: this.form.syjsStartTime,
        sjzzStartTime: this.form.sjzzStartTime,
        sjzzEndTime: this.form.sjzzEndTime,
        company: this.form.company,
        zcName: this.form.zcName,
        worknumber: localStorage.getItem('jobNum'),
        //多选的条件
        jobnumberAll: this.itemCheck.jobnumberAll, //工号
        nameAll: this.itemCheck.nameAll,   //姓名
        departmentAll: this.itemCheck.departmentAll,   //部门
        postAll: this.itemCheck.postAll,   //岗位
        rankAll: this.itemCheck.rankAll,   //职级
        currentStateAll: this.itemCheck.currentStateAll,   //当前状态
        personTypeAll: this.itemCheck.personTypeAll,   //人员类别
        sexAll: this.itemCheck.sexAll,   //性别
        ageAll: this.itemCheck.ageAll,   //年龄
        educationAll: this.itemCheck.educationAll,   //最高学历
        schoolPropAll: this.itemCheck.schoolPropAll,   //院校性质
        schoolNameAll: this.itemCheck.schoolNameAll,   //毕业院校
        walkAll: this.itemCheck.walkAll,   //专业
        bzlxAll: this.itemCheck.bzlxAll,   //编制类型
        categoryAll: this.itemCheck.categoryAll,   //职类
        postOneAll: this.itemCheck.postOneAll,   //岗位分类一
        postTwoAll: this.itemCheck.postTwoAll,   //岗位分类二
        entryAgeAll: this.itemCheck.entryAgeAll,   //司龄
        zyxbqAll: this.itemCheck.zyxbqAll,   //专业线标签
        isVeteranAll: this.itemCheck.isVeteranAll,   //是否为退伍军人
        isPersonAll: this.itemCheck.isPersonAll,   //是否在本公司有亲属关系
        isTrainAll: this.itemCheck.isTrainAll,   //是否签订培训协议
        isCompeteAll: this.itemCheck.isCompeteAll,   //是否签订竞业协议
        companyAll: this.itemCheck.companyAll,   //工作单位
        zcNameAll: this.itemCheck.zcNameAll,   //职称名称
        jobTypeAll: this.itemCheck.jobTypeAll,   //职务类型
        entryStartTimeAll: this.itemCheck.entryStartTimeAll,   //入司开始日期
        entryEndTimeAll: this.itemCheck.entryEndTimeAll,   //入司结束日期
        syjsStartTimeAll: this.itemCheck.syjsStartTimeAll,   //试用开始日期
        syjsEndTimeAll: this.itemCheck.syjsEndTimeAll,   //试用结束日期
        sjzzStartTimeAll: this.itemCheck.sjzzStartTimeAll,   //实际转正开始日期
        sjzzEndTimeAll: this.itemCheck.sjzzEndTimeAll   //实际转正结束日期
      };
      // let queryData = this.form
      querySome(queryData).then(res => {
        if(res.code == 1000){
          //接受数据
          this.tableData = res.obj;
          this.download = 2
          this.total = res.totalSize
          // this.pagePev(); //获��的表格数据分组
        }else{
          Notify({ type: "warning", message: res.msg });
        }
      });
      //数组去重
      this.columns = this.unique(this.columns);
      this.showPick = false;
    },
    //确定
    // confirmPick() {
    //   console.log(this.results);
    // },
    //表格行点击事件
    rowClick(rowIndex, rowData, column) {
      // console.log(rowData)
      // console.log(this.save_jobNum)
      this.save_jobNum(rowData.jobnumber);
      this.from_page(0); //存标识，从哪个页面过来的
      this.scroll_top(
        document.getElementsByClassName("v-table-body")[0].scrollTop
      );
      this.$router.push({ name: "basicMsg" });
    },
    //切换页码
    pageChange() {},
    pageSizeChange() {},
    //选择部门
    pickDept() {
      this.showPickDept = true;
    },
    //选择时触发
    handleCheckChange(data) {
      // this.deptIds.indexOf(data.deptId)
      let res = this.$refs.tree.getCheckedNodes();
      // console.log(res)
      this.defaultCheckedKeys = res;
      // this.$refs.tree.setCheckedKeys(this.defaultCheckedKeys)
      // this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
      let str = "";
      let val = "";
      for (let i in res) {
        str += res[i].content + ",";
        val += res[i].deptId + ",";
      }
      if (str.length > 0) {
        str = str.substr(0, str.length - 1);
        val = val.substr(0, str.length - 1);
      }
      this.form.department = str;
      this.deptVal = val;
    },
    //入司时间时间
    entryStartTime() {
      this.timeFlag = 1;
      this.showTime = true;
    },
    //入司结束时间
    entryEndTime() {
      this.timeFlag = 4;
      this.showTime = true;
    },
    //试用开始时间
    syjsStartTime() {
      this.timeFlag = 5;
      this.showTime = true;
    },
    //试用结束时间
    endTime() {
      this.timeFlag = 2;
      this.showTime = true;
    },
    //转正开始时间
    startTime() {
      this.timeFlag = 3;
      this.showTime = true;
    },
    //转正结束时间
    sjzzEndTime() {
      this.timeFlag = 6;
      this.showTime = true;
    },
    //确认选择的时间
    confirm(val) {
      // console.log(val)
      if (this.timeFlag == 1) {
        this.form.entryStartTime = this.formatDate(val);
      } else if (this.timeFlag == 2) {
        this.form.syjsEndTime = this.formatDate(val);
      } else if (this.timeFlag == 3) {
        this.form.sjzzStartTime = this.formatDate(val);
      } else if (this.timeFlag == 4) {
        this.form.entryEndTime = this.formatDate(val);
      } else if (this.timeFlag == 5) {
        this.form.syjsStartTime = this.formatDate(val);
      } else if (this.timeFlag == 6) {
        this.form.sjzzEndTime = this.formatDate(val);
      }
      this.showTime = false;
    },
    //取消选择
    cancel() {
      this.showTime = false;
    },
    //转换时间戳
    formatDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
    //下拉选择是否
    selectVal() {
      this.selectFlag = 1;
      this.showSelect = true;
    },
    //下拉选择是否有亲属关系
    selectQs() {
      this.selectFlag = 2;
      this.showSelect = true;
    },
    //下拉选择是否有培训协议
    selectPxxy() {
      this.selectFlag = 3;
      this.showSelect = true;
    },
    //下拉选择是否有竞业协议
    selectJyxy() {
      this.selectFlag = 4;
      this.showSelect = true;
    },
    //下拉选择确认
    onConfirm1(picker) {
      if (this.selectFlag == 1) {
        this.form.isVeteran = picker.text;
        this.junrenVal = picker.keyId;
      } else if (this.selectFlag == 2) {
        this.form.isPerson = picker.text;
        this.qinshuVal = picker.keyId;
      } else if (this.selectFlag == 3) {
        this.form.isTrain = picker.text;
        this.peixunVal = picker.keyId;
      } else if (this.selectFlag == 4) {
        this.form.isCompete = picker.text;
        this.jingyeVal = picker.keyId;
      }
      this.showSelect = false;
    },
    //取消选择
    onCancel1() {
      this.showSelect = false;
    },
    //选择男女
    selectSex() {
      this.showSex = true;
    },
    onConfirm2(picker) {
      // console.log(picker)
      this.sex = picker.keyId;
      this.form.sex = picker.text;
      this.showSex = false;
    },
    onCancel2() {
      this.showSex = false;
    },
    //选择职位类型的下拉框选择
    selectJobType(){
      this.showJobType = true
    },
    onConfirm13(picker) {
      // console.log(picker)
      this.jobType = picker.keyId;
      this.form.jobType = picker.text;
      this.showJobType = false;
    },
    onCancel13() {
      this.showJobType = false;
    },
    //选择编制类型
    selectBian() {
      this.showBianzhi = true;
    },
    onConfirm3(picker) {
      // console.log(picker)
      this.bianzhi = picker.keyId;
      this.form.bzlx = picker.text;
      this.showBianzhi = false;
    },
    onCancel3() {
      this.showBianzhi = false;
    },
    //选择院校性质
    selectSchool() {
      this.showSchool = true;
    },
    onConfirm4() {
      let str = "";
      let val = "";
      for (let i in this.result3) {
        str += this.result3[i].content + ",";
        val += this.result3[i].code + ",";
      }
      if (str.length > 0) {
        str = str.substr(0, str.length - 1);
        val = val.substr(0, val.length - 1);
      }
      // console.log(str)
      // console.log(val)
      this.schoolVal = val;
      this.form.schoolProp = str;
      this.showSchool = false;
      this.result3 = [];
    },
    onCancel4() {
      this.showSchool = false;
    },
    //选择专业线标签
    selectZhuanye() {
      this.showZhuanye = true;
    },
    onConfirm5() {
      let str = "";
      let val = "";
      for (let i in this.result5) {
        str += this.result5[i].content + ",";
        val += this.result5[i].code + ",";
      }
      if (str.length > 0) {
        str = str.substr(0, str.length - 1);
        val = val.substr(0, val.length - 1);
      }
      this.zhuanyeVal = val;
      this.form.zyxbq = str;
      this.showZhuanye = false;
      this.result5 = [];
    },
    onCancel5() {
      this.showZhuanye = false;
    },
    //选择当前状态
    selectState() {
      this.showState = true;
    },
    onConfirm6() {
      let str = "";
      let val = "";
      for (let i in this.result6) {
        str += this.result6[i].content + ",";
        val += this.result6[i].code + ",";
      }
      if (str.length > 0) {
        str = str.substr(0, str.length - 1);
        val = val.substr(0, val.length - 1);
      }
      this.stateVal = val;
      this.form.currentState = str;
      this.showState = false;
      this.result6 = [];
    },
    onCancel6() {
      this.showState = false;
    },
    //选择人员类别
    selectPerson() {
      this.showLeibie = true;
    },
    onConfirm7() {
      let str = "";
      let val = "";
      for (let i in this.result7) {
        str += this.result7[i].content + ",";
        val += this.result7[i].code + ",";
      }
      if (str.length > 0) {
        str = str.substr(0, str.length - 1);
        val = val.substr(0, val.length - 1);
      }
      this.leibieVal = val;
      this.form.personType = str;
      this.showLeibie = false;
      this.result7 = [];
    },
    onCancel7() {
      this.showLeibie = false;
    },
    //选择最高学历
    selectXueli() {
      this.showXueli = true;
    },
    onConfirm8() {
      let str = "";
      let val = "";
      for (let i in this.result4) {
        str += this.result4[i].content + ",";
        val += this.result4[i].code + ",";
      }
      if (str.length > 0) {
        str = str.substr(0, str.length - 1);
        val = val.substr(0, val.length - 1);
      }
      this.xueliVal = val;
      this.form.education = str;
      this.showXueli = false;
      this.result4 = [];
    },
    onCancel8() {
      this.showXueli = false;
    },
    //选择岗位分类1
    selectFl1() {
      this.showFenlei1 = true;
    },
    onConfirm9() {
      let str = "";
      let val = "";
      for (let i in this.result2) {
        str += this.result2[i].content + ",";
        val += this.result2[i].code + ",";
      }
      if (str.length > 0) {
        str = str.substr(0, str.length - 1);
        val = val.substr(0, val.length - 1);
      }
      // console.log(str)
      // console.log(val)
      this.fenlei1Val = val;
      this.form.postOne = str;
      this.showFenlei1 = false;
      let queryData = {
        code: this.fenlei1Val
      };
      queryFen2(queryData).then(res => {
        this.column10 = res.obj;
      });
      this.result2 = [];
    },
    onCancel9() {
      this.showFenlei1 = false;
    },
    //选择岗位分类2
    selectFl2() {
      this.showFenlei2 = true;
    },
    //确定选择岗位分类2
    confirmFl2() {
      // console.log(this.result1)
      let str = "";
      let val = "";
      for (let i in this.result1) {
        str += this.result1[i].content + ",";
        val += this.result1[i].code + ",";
      }
      if (str.length > 0) {
        str = str.substr(0, str.length - 1);
        val = val.substr(0, val.length - 1);
      }
      // console.log(str)
      // console.log(val)
      this.form.postTwo = str;
      this.fenlei2Val = val;
      this.showFenlei2 = false;
      this.result1 = [];
    },
    //职类
    selectzl() {
      this.showZl = true;
    },
    onConfirm10() {
      let str = "";
      let val = "";
      for (let i in this.result8) {
        str += this.result8[i].content + ",";
        val += this.result8[i].code + ",";
      }
      if (str.length > 0) {
        str = str.substr(0, str.length - 1);
        val = val.substr(0, val.length - 1);
      }
      this.zhileiVal = val;
      this.form.category = str;
      this.showZl = false;
      //查询职级
      let queryData = {
        code: this.zhileiVal
      };
      queryRank(queryData).then(res => {
        this.column12 = res.obj;
      });
      this.result8 = [];
    },
    //选择职级
    selectzj() {
      this.showZj = true;
    },
    onConfirm11() {
      let str = "";
      let val = "";
      for (let i in this.result9) {
        str += this.result9[i].content + ",";
        val += this.result9[i].code + ",";
      }
      if (str.length > 0) {
        str = str.substr(0, str.length - 1);
        val = val.substr(0, val.length - 1);
      }
      this.zhijiVal = val;
      this.form.rank = str;
      this.showZj = false;
      this.result9 = [];
    },
    //下拉加载
    onLoad() {
      console.log("加载中");
      let queryData = {
        isAll: "Y"
      };
      queryPerson(queryData).then(res => {
        this.tableData.push(res.obj);
      });
    },
    //是否包含下级部门
    changeDept(checked) {
      // debugger
      // console.log(this.defaultCheckedKeys)
      if (!checked) {
        this.dataList = [];
        for (let k in this.defaultCheckedKeys) {
          if (this.defaultCheckedKeys[k].depts) {
            this.dataList.push(this.defaultCheckedKeys[k]);
            for (let i in this.defaultCheckedKeys[k].depts) {
              this.$refs.tree.setChecked(
                this.defaultCheckedKeys[k].depts[i],
                false
              );
              this.$refs.tree.setChecked(this.defaultCheckedKeys[0], true);
            }
          }
        }
      } else {
        // alert('111')
        for (let m in this.dataList) {
          for (let n in this.dataList[m].depts) {
            this.$refs.tree.setChecked(this.dataList[m].depts[n], true);
          }
        }
      }
      // this.$refs.tree.setChecked(this.deptData, false)
      // console.log(checked)
    },
    //数组去重
    unique(arr) {
      var newArr = [];
      var arrId = [];
      for (var item of arr) {
        if (arrId.indexOf(item["title"]) == -1) {
          arrId.push(item["title"]);
          newArr.push(item);
        }
      }
      return newArr;
    },
    //表格中盒子的滚动事件
    scrool() {
      let scrollHeight = document.getElementsByClassName("v-table-body")[0]
        .scrollHeight;
      let clientHeight = document.getElementsByClassName("v-table-body")[0]
        .clientHeight;
      let scrollTop = document.getElementsByClassName("v-table-body")[0]
        .scrollTop;
      if (scrollHeight - clientHeight == scrollTop) {
        //滚动条滚到最底部
        console.log("滚到了最底部");
        this.dataIndex++; //点击+1
        if (this.dataIndex >= this.fenyeData.length) {
          Notify({ type: "warning", message: "没有更多数据了哦~" });
        } else {
          this.tableData = this.tableData.concat(
            this.fenyeData[this.dataIndex]
          );
        }
      }
    },
    //选择部门
    selctdept(data) {
      //   console.log(data)
      this.deptVal = data;
    },
    // ceshi() {
    //   this.download = 2
    // },
    // ceshi2() {
    //   console.log(this.download)
    // },
    //关闭排序的弹窗
    closePop() {
      this.showPx = false;
    },
    //关闭查询的弹窗
    closeSearch() {
      this.showPick = false;
    },
    //导出表格
    _exportExl(){
      // console.log(this.columns)
      let arr = []
      for(let i in this.columns){
        arr.push(this.columns[i].field)
      }
      // console.log(arr)
      let queryData = {
        jobnumber: localStorage.getItem('jobNum'),
        nameArr: arr
      }
      this.$refs.loadingSpin.showUp();
      exportExl(queryData).then(res=>{
        if(res.code == 1000){
          this.$refs.loadingSpin.shutdown();
          Notify({ type: "success", message: res.msg });
        }else{
          this.$refs.loadingSpin.shutdown();
          Notify({ type: "warning", message: res.msg });
        }
      })
    },
    //点击条件查询
    handClickItem(){
      console.log(this.resultMore)
    },
    //单元格样式
    columnCellClass(rowIndex, columnName, rowData) {
      if (rowIndex % 2 == 0) {
        return "column-cell-class-name-test";
      }
    },
    ...mapMutations({
      save_jobNum: "save_jobNum",
      scroll_top: "scroll_top",
      from_page: "from_page",
      arr_flag:'arr_flag'
    })
  },
  mounted() {
    this.$dragging.$on("dragged", ({ value }) => {
      // console.log(value.item)
      console.log(value.list);
      this.newList = value.list;
    });
    this.$dragging.$on("dragend", () => {});
    // console.log(this.$refs.table)
    // document.getElementsByClassName("v-table-body")[0].addEventListener('scroll', this.scrool)
  },
  watch: {
    //赋值离开页面时的表格滑动的高度
    "$store.state.scrollTop": function(newVal, oldVal) {
      // console.log('值来了哦')
      // console.log(this.$route.params.scrollTop)
      if (this.$route.params.scrollTop == undefined) {
        return;
      } else {
        document.getElementsByClassName(
          "v-table-body"
        )[0].scrollTop = this.$route.params.scrollTop;
      }
    },
    // '$store.state.arrflag': function (newVal,oldVal) {
    //   // console.log(newVal+'-----新')
    //   if(newVal == 1){
    //     // console.log('折起来了')
    //     this.columns[0].width = 99
    //   }
    // }
  },
  components: {
    draggable,
    pickdeptmore: pickDeptMore,
    loadingSpin
  }
};
</script>
<style>
  td {
    vertical-align: bottom;
  }
  .overauto{
    width: 100%;
    overflow: auto;
  }
  .van-button--mini{
    min-width: 40px;
  }
  .column-cell-class-name-test {
    background-color: #f6f6f8;
  }
</style>
<style lang="stylus" scoped>
.header {
  padding: 10px;
  box-shadow: 0 0 10px #eee;

  .btn {
    padding: 5px;
    line-height: 35px;
  }
}

.table {
  width: 100%;
  overflow-x: auto;
}

.more {
  font-size: 14px;
  padding: 10px;
}

.pick {
  padding: 10px 10px 35px 10px;
  line-height: 25px;
  .paixu{
    font-weight 700
    text-align center
    color orange
  }
}

.van-checkbox {
  padding: 5px;
}

.infoitems {
  padding: 10px 10px 10px 0;
  flex-direction: row;
  flex-wrap: wrap;

  .infoitem {
    cursor: move;
    line-height: 35px;
    margin: 5px;
    border-radius: 6px;
    padding: 5px;
    font-weight: 700;
    border: 1px solid #eee;

    img {
      display: block;
      width: 50px;
      height: 50px;
      margin: 0 auto;
    }

    span {
      font-size: 14px;
    }
  }
}

.van-tag--warning {
  line-height: 19px;
}

.close {
  position: fixed;
  bottom: 30%;
  width: 100%;
  background-color: #fff;
  padding: 5px;
  line-height 35px
  // text-align: center;
}
</style>